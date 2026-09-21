import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { STOCK_TRANSFERS, WAREHOUSES } from "@/lib/erp/data";
import { num, shortDate } from "@/lib/erp/format";
import { Plus, ArrowLeftRight, Warehouse, Timer } from "lucide-react";

export const Route = createFileRoute("/stock-transfer")({
  head: () => ({ meta: [{ title: "Stock Transfer — Vastra ERP" }] }),
  component: () => {
    const whName = (id: string) => WAREHOUSES.find(w => w.id === id)?.name ?? id;
    const cols: Column<(typeof STOCK_TRANSFERS)[number]>[] = [
      { key: "id", header: "Ref", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "d", header: "Date", render: (r) => shortDate(r.date) },
      { key: "fr", header: "From", render: (r) => whName(r.from) },
      { key: "to", header: "To", render: (r) => whName(r.to) },
      { key: "i", header: "Items", align: "right", render: (r) => r.items },
      { key: "q", header: "Qty", align: "right", render: (r) => <span className="font-mono">{num(r.qty)} m</span> },
      { key: "rf", header: "Ref", render: (r) => r.ref },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    return (
      <ModuleShell title="Stock Transfer" subtitle="Inter-warehouse movement across Surat & Ahmedabad."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Transfer</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Transfers (MTD)" value={STOCK_TRANSFERS.length} icon={ArrowLeftRight} tone="brand" />
          <StatCard label="Warehouses" value={WAREHOUSES.length} icon={Warehouse} tone="info" />
          <StatCard label="In Progress" value={STOCK_TRANSFERS.filter(s => s.status === "processing").length} icon={Timer} tone="warning" />
          <StatCard label="Meters Moved" value={num(STOCK_TRANSFERS.reduce((s, t) => s + t.qty, 0))} tone="success" />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={STOCK_TRANSFERS} addLabel="New Transfer" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});