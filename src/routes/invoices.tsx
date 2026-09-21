import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { INVOICES } from "@/lib/erp/data";
import { inr, inrCompact, shortDate } from "@/lib/erp/format";
import { Plus, FileText, IndianRupee, ShieldAlert, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/invoices")({
  head: () => ({ meta: [{ title: "Invoices — Vastra ERP" }] }),
  component: () => {
    const cols: Column<(typeof INVOICES)[number]>[] = [
      { key: "id", header: "Invoice", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "d", header: "Date", render: (r) => shortDate(r.date) },
      { key: "c", header: "Customer", render: (r) => <span className="font-medium">{r.customer}</span> },
      { key: "a", header: "Taxable", align: "right", render: (r) => <span className="font-mono">{inr(r.amount)}</span> },
      { key: "g", header: "GST", align: "right", render: (r) => <span className="font-mono">{inr(r.gst)}</span> },
      { key: "t", header: "Total", align: "right", render: (r) => <span className="font-mono font-semibold">{inr(r.total)}</span> },
      { key: "du", header: "Terms", render: (r) => `${r.dueDays} days` },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    const overdue = INVOICES.filter(i => i.status === "overdue").length;
    return (
      <ModuleShell title="Invoices" subtitle="Tax invoices, receipts and outstanding tracker."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Invoice</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Invoices (MTD)" value={INVOICES.length} icon={FileText} tone="brand" />
          <StatCard label="Collected" value={inrCompact(INVOICES.filter(i => i.status === "paid").reduce((s, i) => s + i.total, 0))} icon={CheckCircle2} tone="success" />
          <StatCard label="Outstanding" value={inrCompact(INVOICES.filter(i => i.status !== "paid").reduce((s, i) => s + i.total, 0))} icon={IndianRupee} tone="warning" />
          <StatCard label="Overdue" value={overdue} icon={ShieldAlert} tone="danger" />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={INVOICES} addLabel="New Invoice" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});