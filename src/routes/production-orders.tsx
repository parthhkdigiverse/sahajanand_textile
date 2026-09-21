import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { PRODUCTION_ORDERS } from "@/lib/erp/data";
import { inr, num, shortDate } from "@/lib/erp/format";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/production-orders")({
  head: () => ({ meta: [{ title: "Production Orders — Vastra ERP" }] }),
  component: () => {
    const cols: Column<(typeof PRODUCTION_ORDERS)[number]>[] = [
      { key: "id", header: "Order", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "p", header: "Product", render: (r) => <span className="font-medium">{r.product}</span> },
      { key: "mfr", header: "Manufacturer", render: (r) => r.mfr },
      { key: "qty", header: "Qty", align: "right", render: (r) => <span className="font-mono">{num(r.qty)} m</span> },
      { key: "done", header: "Done", align: "right", render: (r) => <span className="font-mono text-success">{num(r.done)} m</span> },
      { key: "pct", header: "Progress", render: (r) => { const p = Math.round((r.done / r.qty) * 100); return <div className="flex items-center gap-2"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted"><div className={`h-full ${r.status === "delayed" ? "bg-danger" : p === 100 ? "bg-success" : "bg-brand"}`} style={{ width: `${p}%` }} /></div><span className="font-mono text-[11px]">{p}%</span></div>; } },
      { key: "eta", header: "ETA", render: (r) => shortDate(r.eta) },
      { key: "cost", header: "Cost", align: "right", render: (r) => <span className="font-mono">{inr(r.cost)}</span> },
      { key: "pr", header: "Priority", render: (r) => <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ring-1 ring-inset ${r.priority === "High" ? "bg-danger/10 text-danger ring-danger/20" : r.priority === "Medium" ? "bg-warning/10 text-warning-foreground ring-warning/30" : "bg-muted text-muted-foreground ring-border"}`}>{r.priority}</span> },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    return (
      <ModuleShell title="Production Orders" subtitle="All orders across manufacturers & priorities."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Order</Btn>}>
        <DataTable columns={cols} rows={PRODUCTION_ORDERS} addLabel="New Order" onAdd={() => {}} />
      </ModuleShell>
    );
  },
});