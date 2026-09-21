import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { INVOICES, CUSTOMERS } from "@/lib/erp/data";
import { inr, inrCompact, shortDate } from "@/lib/erp/format";
import { Plus, TrendingUp } from "lucide-react";

const QUOTES = [
  { id: "QTN-2361", date: "2026-07-03", customer: "Krishna Silk House", amount: 148500, status: "approved" as const },
  { id: "QTN-2362", date: "2026-07-03", customer: "Radhe Fashion Fabrics", amount: 486200, status: "pending" as const },
  { id: "QTN-2363", date: "2026-07-02", customer: "Nakoda Sarees", amount: 92300, status: "approved" as const },
  { id: "QTN-2364", date: "2026-07-02", customer: "Sanskruti Weaves", amount: 322400, status: "draft" as const },
  { id: "QTN-2365", date: "2026-07-01", customer: "Vardhman Sarees", amount: 218400, status: "approved" as const },
];

export const Route = createFileRoute("/sales")({
  head: () => ({ meta: [{ title: "Sales — Vastra ERP" }] }),
  component: () => (
    <ModuleShell title="Sales" subtitle="Quotations → Orders → Invoices → Payments"
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Quotation</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="MTD Sales" value={inrCompact(INVOICES.reduce((s, i) => s + i.total, 0))} tone="brand" delta={12.4} icon={TrendingUp} />
        <StatCard label="Quotations" value={QUOTES.length} tone="info" />
        <StatCard label="Active Customers" value={CUSTOMERS.filter(c => c.status === "active").length} tone="success" />
        <StatCard label="Avg Order Value" value={inrCompact(INVOICES.reduce((s, i) => s + i.total, 0) / INVOICES.length)} tone="warning" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Quotations" padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-2 text-left">Quote</th><th className="px-4 py-2 text-left">Customer</th><th className="px-4 py-2 text-right">Amount</th><th className="px-4 py-2 text-left">Status</th></tr>
            </thead>
            <tbody>
              {QUOTES.map(q => (
                <tr key={q.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-mono text-brand">{q.id}</td>
                  <td className="px-4 py-2.5">{q.customer}<div className="text-[11px] text-muted-foreground">{shortDate(q.date)}</div></td>
                  <td className="px-4 py-2.5 text-right font-mono">{inr(q.amount)}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={q.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Recent Invoices" padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-2 text-left">Invoice</th><th className="px-4 py-2 text-left">Customer</th><th className="px-4 py-2 text-right">Total</th><th className="px-4 py-2 text-left">Status</th></tr>
            </thead>
            <tbody>
              {INVOICES.slice(0, 6).map(i => (
                <tr key={i.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-mono text-brand">{i.id}</td>
                  <td className="px-4 py-2.5">{i.customer}</td>
                  <td className="px-4 py-2.5 text-right font-mono">{inr(i.total)}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </ModuleShell>
  ),
});