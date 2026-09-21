import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { RAW_MATERIAL } from "@/lib/erp/data";
import { inr, num, inrCompact } from "@/lib/erp/format";
import { Plus, Boxes, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/raw-material")({
  head: () => ({ meta: [{ title: "Raw Material — Vastra ERP" }] }),
  component: RMPage,
});

function RMPage() {
  const cols: Column<(typeof RAW_MATERIAL)[number]>[] = [
    { key: "n", header: "Material", render: (r) => (<div><div className="font-medium">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.id}</div></div>) },
    { key: "sup", header: "Supplier", render: (r) => r.supplier },
    { key: "loc", header: "Location", render: (r) => <span className="text-[12px]">{r.location}</span> },
    { key: "stk", header: "Stock", align: "right", render: (r) => <span className={`font-mono ${r.stock < r.min ? "text-danger" : ""}`}>{num(r.stock)} {r.unit}</span> },
    { key: "min", header: "Min", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{num(r.min)}</span> },
    { key: "in", header: "Incoming", align: "right", render: (r) => r.incoming > 0 ? <span className="font-mono text-success">+{num(r.incoming)}</span> : "—" },
    { key: "rt", header: "Rate", align: "right", render: (r) => <span className="font-mono">{inr(r.rate)}</span> },
    { key: "val", header: "Value", align: "right", render: (r) => <span className="font-mono font-medium">{inrCompact(r.stock * r.rate)}</span> },
  ];
  const totalVal = RAW_MATERIAL.reduce((s, r) => s + r.stock * r.rate, 0);
  return (
    <ModuleShell title="Raw Material" subtitle="Yarn, zari, dyes & filaments — incoming and current stock."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Purchase</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="SKUs" value={RAW_MATERIAL.length} icon={Boxes} tone="brand" />
        <StatCard label="Stock Value" value={inrCompact(totalVal)} tone="success" delta={3.4} icon={TrendingUp} />
        <StatCard label="Low Stock" value={RAW_MATERIAL.filter((r) => r.stock < r.min).length} tone="danger" icon={AlertTriangle} />
        <StatCard label="MTD Consumption" value={inrCompact(28_40_000)} tone="warning" delta={-2.1} icon={TrendingDown} />
      </div>
      <div className="mt-4"><DataTable columns={cols} rows={RAW_MATERIAL} addLabel="Add Material" onAdd={() => {}} /></div>
    </ModuleShell>
  );
}