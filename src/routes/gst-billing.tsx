import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { COMPANY, INVOICES } from "@/lib/erp/data";
import { inr, inrCompact, num, shortDate } from "@/lib/erp/format";
import { Receipt, IndianRupee, FileText, Printer, Download, Send, FileSpreadsheet } from "lucide-react";

export const Route = createFileRoute("/gst-billing")({
  head: () => ({ meta: [{ title: "Billing & Invoices — Vastra ERP" }] }),
  component: GstBillingPage,
});

const ITEMS = [
  { code: "LES-BNR-42", desc: "Zari Border Less 3\"", hsn: "5808", qty: 800, rate: 42, gst: 5 },
  { code: "PAT-SLK-95", desc: "Banarasi Silk Patta 6\"", hsn: "5407", qty: 900, rate: 95, gst: 5 },
  { code: "PAT-JAC-120", desc: "Jacquard Patta 8\"", hsn: "5407", qty: 800, rate: 120, gst: 12 },
  { code: "BRD-VLV-62", desc: "Velvet Border 2\"", hsn: "5810", qty: 400, rate: 62, gst: 12 },
];

function GstBillingPage() {
  const [invoiceType, setInvoiceType] = useState<"GST" | "Non-GST">("GST");

  const isGst = invoiceType === "GST";
  const sub = ITEMS.reduce((s, i) => s + i.qty * i.rate, 0);
  const cgst = isGst ? ITEMS.reduce((s, i) => s + (i.qty * i.rate * i.gst) / 200, 0) : 0;
  const sgst = cgst;
  const total = Math.round(sub + cgst + sgst);

  return (
    <ModuleShell
      title="Billing & Invoicing"
      subtitle="Generate GST Tax Invoices or Non-GST Bills & Cash Memos instantly."
      actions={
        <>
          <Btn variant="outline">
            <Download className="h-4 w-4" /> PDF
          </Btn>
          <Btn variant="outline">
            <Printer className="h-4 w-4" /> Print
          </Btn>
          <Btn variant="brand">
            <Send className="h-4 w-4" /> Save & Send
          </Btn>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Invoices (MTD)" value={INVOICES.length} icon={Receipt} tone="brand" />
        <StatCard label="Total Sales (MTD)" value={inrCompact(INVOICES.reduce((s, i) => s + i.total, 0))} icon={IndianRupee} tone="success" delta={11.4} />
        <StatCard label="GST Output" value={inrCompact(INVOICES.filter((i) => i.type === "GST").reduce((s, i) => s + i.gst, 0))} icon={FileText} tone="info" />
        <StatCard label="Overdue Invoices" value={INVOICES.filter((i) => i.status === "overdue").length} tone="danger" />
      </div>

      {/* Invoice Mode Selector */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border/80 bg-surface p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold">Select Billing Type:</span>
          <div className="flex items-center gap-2 rounded-lg bg-muted p-1">
            <button
              onClick={() => setInvoiceType("GST")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-[12px] font-semibold transition-all ${
                isGst ? "bg-brand text-brand-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Receipt className="h-3.5 w-3.5" /> GST Tax Invoice
            </button>
            <button
              onClick={() => setInvoiceType("Non-GST")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-[12px] font-semibold transition-all ${
                !isGst ? "bg-amber-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" /> Non-GST Bill / Estimate
            </button>
          </div>
        </div>
        <span className="text-[12px] text-muted-foreground">
          {isGst ? "Includes CGST + SGST tax breakdown & GSTIN format" : "Direct billing without GST calculation (Cash Memo / Estimate)"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title={isGst ? "Tax Invoice" : "Non-GST Bill / Estimate"} subtitle={isGst ? "INV/26-27/2208 · Draft" : "EST/26-27/0404 · Draft"}>
          <div className="rounded-xl bg-surface p-5 text-[13px]">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="text-lg font-bold">{COMPANY.name}</div>
                <div className="text-[11.5px] text-muted-foreground">{COMPANY.address}</div>
                {isGst ? (
                  <div className="mt-1 font-mono text-[11.5px]">GSTIN: {COMPANY.gstin}</div>
                ) : (
                  <div className="mt-1 font-mono text-[11.5px] text-amber-600 dark:text-amber-400">Bill Type: Non-GST Cash Memo</div>
                )}
              </div>
              <div className="text-right">
                <div className={`rounded-md px-3 py-1 ${isGst ? "bg-brand/10 text-brand" : "bg-amber-500/10 text-amber-700 dark:text-amber-400"}`}>
                  <div className="text-[10px] font-semibold uppercase tracking-wider">{isGst ? "Tax Invoice" : "Non-GST Bill"}</div>
                  <div className="font-mono text-[14px]">{isGst ? "INV/26-27/2208" : "EST/26-27/0404"}</div>
                </div>
                <div className="mt-2 text-[11.5px] text-muted-foreground">Date: {shortDate(new Date())}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Bill To</div>
                <div className="mt-1 font-semibold">{isGst ? "Krishna Silk House" : "Local Retail Counter"}</div>
                <div className="text-[11.5px] text-muted-foreground">Shop 42, Surat Textile Market, Surat 395002</div>
                {isGst ? (
                  <>
                    <div className="mt-1 font-mono text-[11px]">GSTIN: 24AAGCK4521B1Z9</div>
                    <div className="mt-1 font-mono text-[11px]">Place of Supply: Gujarat (24)</div>
                  </>
                ) : (
                  <div className="mt-1 font-mono text-[11px] text-muted-foreground">Customer Type: Unregistered / Retail</div>
                )}
              </div>
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">Transport & Terms</div>
                <div className="mt-1 text-[12px]">VRL Logistics · GJ-05-AB-4421</div>
                {isGst && <div className="text-[11px] text-muted-foreground">E-Way EWB-2609-871-4412 · 6 km</div>}
                <div className="text-[11px] text-muted-foreground">Terms: {isGst ? "45 days" : "Immediate Cash / 15 days"} · Due: {shortDate(new Date(Date.now() + (isGst ? 45 : 15) * 864e5))}</div>
              </div>
            </div>

            <table className="mt-4 w-full border border-border text-[12px]">
              <thead className="bg-muted/60 text-[10.5px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="border border-border px-2 py-1.5 text-left">Code</th>
                  <th className="border border-border px-2 py-1.5 text-left">Description</th>
                  <th className="border border-border px-2 py-1.5 text-left">HSN</th>
                  <th className="border border-border px-2 py-1.5 text-right">Qty</th>
                  <th className="border border-border px-2 py-1.5 text-right">Rate</th>
                  {isGst && <th className="border border-border px-2 py-1.5 text-right">GST %</th>}
                  <th className="border border-border px-2 py-1.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {ITEMS.map((i) => (
                  <tr key={i.code}>
                    <td className="border border-border px-2 py-1.5">{i.code}</td>
                    <td className="border border-border px-2 py-1.5 font-sans">{i.desc}</td>
                    <td className="border border-border px-2 py-1.5">{i.hsn}</td>
                    <td className="border border-border px-2 py-1.5 text-right">{num(i.qty)} m</td>
                    <td className="border border-border px-2 py-1.5 text-right">{inr(i.rate)}</td>
                    {isGst && <td className="border border-border px-2 py-1.5 text-right">{i.gst}%</td>}
                    <td className="border border-border px-2 py-1.5 text-right">{inr(i.qty * i.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="text-[11.5px] text-muted-foreground">
                <div className="font-semibold text-foreground">Bank Details</div>
                <div>HDFC Bank · Ring Road, Surat</div>
                <div className="font-mono">A/c 50200 0424 12345 · IFSC HDFC0000042</div>
                <div className="mt-3 font-semibold text-foreground">Notes</div>
                <div>Goods once sold will not be taken back. E&OE.</div>
              </div>
              <div className="ml-auto w-full max-w-xs space-y-1 font-mono text-[12.5px]">
                <TotRow label={isGst ? "Taxable Value" : "Subtotal Amount"} value={inr(sub)} />
                {isGst ? (
                  <>
                    <TotRow label="CGST" value={inr(cgst)} />
                    <TotRow label="SGST" value={inr(sgst)} />
                    <TotRow label="Round Off" value={`₹${(total - (sub + cgst + sgst)).toFixed(2)}`} />
                  </>
                ) : (
                  <TotRow label="GST (Non-GST)" value="₹0" />
                )}
                <div className="my-1 h-px bg-border" />
                <TotRow label="Grand Total" value={inr(total)} bold />
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Invoice Settings">
            <div className="space-y-2 text-[13px]">
              <Field label="Invoice Category" value={isGst ? "GST Tax Invoice (B2B)" : "Non-GST Bill / Cash Memo"} />
              <Field label="Payment Terms" value={isGst ? "45 Days" : "15 Days / Cash"} />
              {isGst ? (
                <>
                  <Field label="Place of Supply" value="Gujarat (24)" />
                  <Field label="Reverse Charge" value="No" />
                  <Field label="E-Invoice IRN" value={<span className="font-mono text-[11px]">a1f2b8c7d4e5…</span>} />
                </>
              ) : (
                <Field label="Tax Liability" value="Exempt / Non-GST" />
              )}
              <Field label="Round Off" value="Nearest Rupee" />
            </div>
          </SectionCard>
          <SectionCard title="Amount Summary">
            <ul className="space-y-1.5 text-[13px]">
              <li className="flex justify-between">
                <span className="text-muted-foreground">{isGst ? "Taxable Subtotal" : "Item Subtotal"}</span>
                <span className="font-mono">{inr(sub)}</span>
              </li>
              {isGst && (
                <>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">CGST @ mix</span>
                    <span className="font-mono">{inr(cgst)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">SGST @ mix</span>
                    <span className="font-mono">{inr(sgst)}</span>
                  </li>
                </>
              )}
              {!isGst && (
                <li className="flex justify-between text-muted-foreground">
                  <span>GST Tax</span>
                  <span className="font-mono">₹0</span>
                </li>
              )}
              <li className="mt-1 flex justify-between border-t border-border pt-2 text-[15px] font-semibold">
                <span>Total Amount</span>
                <span className="font-mono text-brand">{inr(total)}</span>
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </ModuleShell>
  );
}

function TotRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-[14px] font-semibold" : ""}`}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (<div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>);
}