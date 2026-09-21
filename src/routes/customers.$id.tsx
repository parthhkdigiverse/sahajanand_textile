import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { CUSTOMERS, INVOICES, PAYMENTS } from "@/lib/erp/data";
import { inr, inrCompact, shortDate } from "@/lib/erp/format";
import { Mail, Phone, MapPin, FileText, Download, Printer, IndianRupee, Users, Receipt } from "lucide-react";

export const Route = createFileRoute("/customers/$id")({
  component: CustomerDetail,
});

function CustomerDetail() {
  const { id } = Route.useParams();
  const c = CUSTOMERS.find((x) => x.id === id) ?? CUSTOMERS[0];
  const invoices = INVOICES.filter((i) => i.customer === c.name);
  const payments = PAYMENTS.filter((p) => p.party === c.name);

  return (
    <ModuleShell
      title={c.name}
      subtitle={`${c.id} · ${c.city} · ${c.category}`}
      actions={
        <>
          <Btn variant="outline"><Printer className="h-4 w-4" /> Print Ledger</Btn>
          <Btn variant="outline"><Download className="h-4 w-4" /> Statement</Btn>
          <Btn variant="brand"><Receipt className="h-4 w-4" /> New Invoice</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title="Customer Profile">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1 md:col-span-3">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-secondary/20 text-lg font-semibold text-brand">
                  {c.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className="text-lg font-semibold">{c.name}</div>
                  <div className="text-[12px] text-muted-foreground">Contact: {c.contact}</div>
                  <div className="mt-1"><StatusBadge status={c.status} /></div>
                </div>
              </div>
            </div>
            <Field label="GSTIN" value={<span className="font-mono">{c.gstin}</span>} icon={<FileText className="h-3.5 w-3.5" />} />
            <Field label="Phone" value={c.phone} icon={<Phone className="h-3.5 w-3.5" />} />
            <Field label="Email" value={`sales@${c.name.toLowerCase().replace(/[^a-z]+/g, "")}.in`} icon={<Mail className="h-3.5 w-3.5" />} />
            <Field label="Billing Address" value={`Shop 12, ${c.city} Textile Market, ${c.city}`} icon={<MapPin className="h-3.5 w-3.5" />} />
            <Field label="Delivery Address" value={`Godown 4, Ring Road, ${c.city}`} icon={<MapPin className="h-3.5 w-3.5" />} />
            <Field label="Payment Terms" value={c.terms} />
          </div>
        </SectionCard>

        <div className="space-y-4">
          <StatCard label="Outstanding" value={inr(c.outstanding)} icon={IndianRupee} tone={c.outstanding > 0 ? "warning" : "success"} />
          <StatCard label="Credit Limit" value={inrCompact(c.credit)} icon={Users} tone="brand" hint={`Utilised ${Math.round((c.outstanding / c.credit) * 100)}%`} />
          <StatCard label="Lifetime Sales" value={inrCompact(c.credit * 4.2)} tone="info" delta={8.2} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title="Recent Invoices" padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Invoice</th>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
                <th className="px-4 py-2 text-right font-semibold">Total</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {(invoices.length ? invoices : INVOICES.slice(0, 4)).map((inv) => (
                <tr key={inv.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-mono text-brand">{inv.id}</td>
                  <td className="px-4 py-2.5">{shortDate(inv.date)}</td>
                  <td className="px-4 py-2.5 text-right font-mono">{inr(inv.total)}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={inv.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Payment History" padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Ref</th>
                <th className="px-4 py-2 text-left font-semibold">Mode</th>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
                <th className="px-4 py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(payments.length ? payments : PAYMENTS.filter((p) => p.type === "Received").slice(0, 4)).map((p) => (
                <tr key={p.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-mono text-[12px]">{p.ref}</td>
                  <td className="px-4 py-2.5">{p.mode}</td>
                  <td className="px-4 py-2.5">{shortDate(p.date)}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-success">{inr(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>

      <div className="mt-4">
        <Link to="/customers" className="text-[12px] font-medium text-brand hover:underline">
          ← Back to Customers
        </Link>
      </div>
    </ModuleShell>
  );
}

function Field({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
      <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-[13px] font-medium text-foreground">{value}</div>
    </div>
  );
}