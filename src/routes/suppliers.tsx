import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { SUPPLIERS } from "@/lib/erp/data";
import { inr, inrCompact } from "@/lib/erp/format";
import { Plus, Truck, IndianRupee, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers — Vastra ERP" }] }),
  component: SuppliersPage,
});

function SuppliersPage() {
  const cols: Column<(typeof SUPPLIERS)[number]>[] = [
    { key: "name", header: "Supplier", render: (r) => (<div><div className="font-medium">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.id} · {r.city}</div></div>) },
    { key: "gst", header: "GSTIN", render: (r) => <span className="font-mono text-[12px]">{r.gstin}</span> },
    { key: "mat", header: "Materials", render: (r) => <span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">{r.material}</span> },
    { key: "ph", header: "Phone", render: (r) => r.phone },
    { key: "os", header: "Outstanding", align: "right", render: (r) => <span className={`font-mono ${r.outstanding > 0 ? "text-warning-foreground" : "text-success"}`}>{inr(r.outstanding)}</span> },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];
  const outstanding = SUPPLIERS.reduce((s, c) => s + c.outstanding, 0);
  return (
    <ModuleShell title="Suppliers" subtitle="Raw material vendors, purchase history and payables."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Supplier</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total Suppliers" value={SUPPLIERS.length} icon={Truck} tone="brand" />
        <StatCard label="Payable" value={inrCompact(outstanding)} icon={IndianRupee} tone="warning" />
        <StatCard label="Purchase (MTD)" value={inrCompact(61200000)} icon={PackageCheck} tone="info" delta={4.2} />
        <StatCard label="Avg Lead Time" value="6.4 days" hint="From PO to GRN" tone="success" />
      </div>
      <div className="mt-4"><DataTable columns={cols} rows={SUPPLIERS} addLabel="Add Supplier" onAdd={() => {}} /></div>
    </ModuleShell>
  );
}