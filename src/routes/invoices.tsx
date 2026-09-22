import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { INVOICES, type InvoiceType } from "@/lib/erp/data";
import { inr, inrCompact, shortDate } from "@/lib/erp/format";
import { Plus, FileText, ShieldAlert, Receipt, FileSpreadsheet } from "lucide-react";

export const Route = createFileRoute("/invoices")({
  head: () => ({ meta: [{ title: "Invoices — Vastra ERP" }] }),
  component: InvoicesPage,
});

function InvoicesPage() {
  const [filterType, setFilterType] = useState<"all" | "GST" | "Non-GST">("all");

  const filteredInvoices = INVOICES.filter((inv) => {
    if (filterType === "all") return true;
    return inv.type === filterType;
  });

  const gstCount = INVOICES.filter((i) => i.type === "GST").length;
  const nonGstCount = INVOICES.filter((i) => i.type === "Non-GST").length;
  const gstTotal = INVOICES.filter((i) => i.type === "GST").reduce((s, i) => s + i.total, 0);
  const nonGstTotal = INVOICES.filter((i) => i.type === "Non-GST").reduce((s, i) => s + i.total, 0);
  const overdue = INVOICES.filter((i) => i.status === "overdue").length;

  const cols: Column<(typeof INVOICES)[number]>[] = [
    { key: "id", header: "Invoice #", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
    {
      key: "type",
      header: "Type",
      render: (r) =>
        r.type === "GST" ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">
            <Receipt className="h-3 w-3" /> GST
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
            <FileSpreadsheet className="h-3 w-3" /> Non-GST
          </span>
        ),
    },
    { key: "d", header: "Date", render: (r) => shortDate(r.date) },
    { key: "c", header: "Customer", render: (r) => <span className="font-medium">{r.customer}</span> },
    { key: "a", header: "Subtotal", align: "right", render: (r) => <span className="font-mono">{inr(r.amount)}</span> },
    { key: "g", header: "GST Amount", align: "right", render: (r) => <span className="font-mono">{r.type === "GST" ? inr(r.gst) : "₹0"}</span> },
    { key: "t", header: "Total Amount", align: "right", render: (r) => <span className="font-mono font-semibold">{inr(r.total)}</span> },
    { key: "du", header: "Terms", render: (r) => `${r.dueDays} days` },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <ModuleShell
      title="Invoices"
      subtitle="Manage GST Tax Invoices and Non-GST Bills & Cash Memos."
      actions={
        <div className="flex items-center gap-2">
          <Btn variant="outline">
            <Plus className="h-4 w-4" /> New Non-GST Bill
          </Btn>
          <Btn variant="brand">
            <Plus className="h-4 w-4" /> New GST Invoice
          </Btn>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total Invoices (MTD)" value={INVOICES.length} icon={FileText} tone="brand" />
        <StatCard label="GST Invoices" value={`${gstCount} (${inrCompact(gstTotal)})`} icon={Receipt} tone="info" />
        <StatCard label="Non-GST Invoices" value={`${nonGstCount} (${inrCompact(nonGstTotal)})`} icon={FileSpreadsheet} tone="warning" />
        <StatCard label="Overdue Invoices" value={overdue} icon={ShieldAlert} tone="danger" />
      </div>

      <div className="mt-4 flex items-center gap-2 border-b border-border pb-2">
        <button
          onClick={() => setFilterType("all")}
          className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
            filterType === "all" ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          All Invoices ({INVOICES.length})
        </button>
        <button
          onClick={() => setFilterType("GST")}
          className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
            filterType === "GST" ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          GST Tax Invoices ({gstCount})
        </button>
        <button
          onClick={() => setFilterType("Non-GST")}
          className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
            filterType === "Non-GST" ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Non-GST Bills ({nonGstCount})
        </button>
      <div className="mt-4">
        <DataTable columns={cols} rows={filteredInvoices} addLabel="New Invoice" onAdd={() => {}} />
      </div>
    </ModuleShell>
  );
}