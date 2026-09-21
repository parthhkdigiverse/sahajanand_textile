import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { CHALLANS, COMPANY } from "@/lib/erp/data";
import { inr, num, shortDate } from "@/lib/erp/format";
import { Printer, Download, Camera, CheckCircle2, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/delivery-challan/$id")({
  component: DCDetail,
});

const ITEMS = [
  { code: "LES-BNR-42", name: "Zari Border Less 3\" - Gold/Maroon", qty: 800, unit: "m", rate: 42, gst: 5 },
  { code: "PAT-SLK-95", name: "Banarasi Silk Patta 6\" - Rani Pink", qty: 900, unit: "m", rate: 95, gst: 5 },
  { code: "PAT-JAC-120", name: "Jacquard Patta 8\" - Firozi", qty: 800, unit: "m", rate: 120, gst: 12 },
];

function DCDetail() {
  const { id } = Route.useParams();
  const c = CHALLANS.find((x) => x.id === id) ?? CHALLANS[0];
  const subtotal = ITEMS.reduce((s, i) => s + i.qty * i.rate, 0);
  const gst = ITEMS.reduce((s, i) => s + (i.qty * i.rate * i.gst) / 100, 0);
  return (
    <ModuleShell title={`Delivery Challan ${c.id}`} subtitle={`Issued ${shortDate(c.date)} · To ${c.customer}`}
      actions={<>
        <Btn variant="outline"><Download className="h-4 w-4" /> PDF</Btn>
        <Btn variant="outline"><Printer className="h-4 w-4" /> Print</Btn>
        <Btn variant="brand"><Send className="h-4 w-4" /> Send to Customer</Btn>
      </>}>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title="Challan Preview" padded={false}>
          <div className="bg-surface p-6 text-[13px]">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <div className="text-lg font-bold tracking-tight">{COMPANY.name}</div>
                <div className="text-[11.5px] text-muted-foreground">{COMPANY.address}</div>
                <div className="mt-1 font-mono text-[11.5px]">GSTIN: {COMPANY.gstin}</div>
              </div>
              <div className="text-right">
                <div className="rounded-md bg-brand/10 px-3 py-1 text-brand">
                  <div className="text-[10px] font-semibold uppercase tracking-wider">Delivery Challan</div>
                  <div className="font-mono text-[14px] font-semibold">{c.id}</div>
                </div>
                <div className="mt-2 text-[11.5px] text-muted-foreground">Date: {shortDate(c.date)}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Bill To</div>
                <div className="mt-1 font-semibold">{c.customer}</div>
                <div className="text-[11.5px] text-muted-foreground">Shop 42, {c.city} Textile Market, {c.city}</div>
                <div className="mt-1 font-mono text-[11px]">GSTIN: 24AAGCK4521B1Z9</div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Ship To</div>
                <div className="mt-1 font-semibold">{c.customer} — Godown</div>
                <div className="text-[11.5px] text-muted-foreground">Godown 4, Ring Road, {c.city}</div>
              </div>
            </div>

            <table className="mt-4 w-full border border-border text-[12px]">
              <thead className="bg-muted/60 text-[10.5px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="border border-border px-2 py-1.5 text-left">Code</th>
                  <th className="border border-border px-2 py-1.5 text-left">Description</th>
                  <th className="border border-border px-2 py-1.5 text-right">Qty</th>
                  <th className="border border-border px-2 py-1.5 text-right">Rate</th>
                  <th className="border border-border px-2 py-1.5 text-right">GST</th>
                  <th className="border border-border px-2 py-1.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {ITEMS.map((i) => (
                  <tr key={i.code}>
                    <td className="border border-border px-2 py-1.5">{i.code}</td>
                    <td className="border border-border px-2 py-1.5 font-sans">{i.name}</td>
                    <td className="border border-border px-2 py-1.5 text-right">{num(i.qty)} m</td>
                    <td className="border border-border px-2 py-1.5 text-right">{inr(i.rate)}</td>
                    <td className="border border-border px-2 py-1.5 text-right">{i.gst}%</td>
                    <td className="border border-border px-2 py-1.5 text-right">{inr(i.qty * i.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3 grid grid-cols-2 gap-6">
              <div className="text-[11.5px] text-muted-foreground">
                <div className="font-semibold text-foreground">Remarks</div>
                <p>Deliver only during business hours (10 AM – 7 PM). Handle rolls with care — silk fabric.</p>
              </div>
              <div className="ml-auto w-full max-w-xs space-y-1 font-mono text-[12px]">
                <Row label="Subtotal" value={inr(subtotal)} />
                <Row label="GST" value={inr(gst)} />
                <Row label="Round Off" value="₹0" />
                <div className="my-1 h-px bg-border" />
                <Row label="Grand Total" value={inr(subtotal + gst)} bold />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-[11px] text-muted-foreground">
              <div className="border-t border-border pt-2 text-center">Prepared by</div>
              <div className="border-t border-border pt-2 text-center">Approved by</div>
              <div className="border-t border-border pt-2 text-center">Received (Customer Signature)</div>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Dispatch Status">
            <div className="mb-3 flex items-center justify-between">
              <StatusBadge status={c.status} />
              <span className="text-[11px] text-muted-foreground">ETA {shortDate(c.eta)}</span>
            </div>
            <ol className="relative space-y-3 border-l border-border pl-4">
              {["Challan created","Loaded on vehicle","In transit","Out for delivery","Delivered"].map((s, i) => (
                <li key={s} className="relative">
                  <span className={`absolute -left-[21px] top-0.5 grid h-4 w-4 place-items-center rounded-full ring-4 ring-background ${i < 3 ? "bg-success text-success-foreground" : i === 3 ? "bg-brand text-brand-foreground" : "bg-muted"}`}>{i < 3 && <CheckCircle2 className="h-3 w-3" />}</span>
                  <div className="text-[12.5px] font-medium">{s}</div>
                  <div className="text-[11px] text-muted-foreground">{i < 3 ? "Completed" : i === 3 ? "In progress" : "Pending"}</div>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard title="Transport Details">
            <div className="space-y-1.5 text-[13px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Transporter</span><span className="font-medium">{c.transport}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Vehicle No.</span><span className="font-mono">{c.vehicle}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Driver</span><span>{c.driver}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span className="font-mono">+91 98240 55123</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">E-Way Bill</span><span className="font-mono">EWB-2609-871-4412</span></div>
            </div>
            <div className="mt-3 grid h-32 place-items-center rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground">
              <div className="text-center">
                <MapPin className="mx-auto h-5 w-5" />
                <div className="mt-1 text-[11px]">Live GPS location placeholder</div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Product Images">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg border border-border bg-gradient-to-br from-brand/10 to-secondary/10">
                  <div className="grid h-full place-items-center text-muted-foreground"><Camera className="h-4 w-4" /></div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/delivery-challan" className="text-[12px] font-medium text-brand hover:underline">← Back to Challans</Link>
      </div>
    </ModuleShell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-[14px] font-semibold" : ""}`}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}