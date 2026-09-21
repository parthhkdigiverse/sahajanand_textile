import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { PRODUCTS } from "@/lib/erp/data";
import { inr, num, inrCompact } from "@/lib/erp/format";
import { Layers, Plus } from "lucide-react";

export const Route = createFileRoute("/less-inventory")({
  head: () => ({ meta: [{ title: "Less Inventory — Vastra ERP" }] }),
  component: () => <CatInv category="Less" title="Less Inventory" subtitle="All Less variants — cutwork, embroidered, zari" />,
});

function CatInv({ category, title, subtitle }: { category: string; title: string; subtitle: string }) {
  const rows = PRODUCTS.filter((p) => p.category === category);
  const cols: Column<(typeof rows)[number]>[] = [
    { key: "n", header: "Product", render: (r) => (<div><div className="font-medium">{r.name}</div><div className="font-mono text-[11px] text-muted-foreground">{r.code}</div></div>) },
    { key: "w", header: "Width", render: (r) => r.width },
    { key: "mat", header: "Material", render: (r) => r.material },
    { key: "clr", header: "Color", render: (r) => r.color },
    { key: "mfr", header: "Manufacturer", render: (r) => r.mfr },
    { key: "stk", header: "Available", align: "right", render: (r) => <span className={`font-mono ${r.stock < r.min ? "text-danger" : "text-success"}`}>{num(r.stock)} m</span> },
    { key: "rt", header: "Rate", align: "right", render: (r) => <span className="font-mono">{inr(r.rate)}</span> },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.stock < r.min ? "delayed" : "active"} /> },
  ];
  return (
    <ModuleShell title={title} subtitle={subtitle}
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Add Variant</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label={`${category} SKUs`} value={rows.length} icon={Layers} tone="brand" />
        <StatCard label="Total Meters" value={num(rows.reduce((s, r) => s + r.stock, 0))} tone="info" />
        <StatCard label="Stock Value" value={inrCompact(rows.reduce((s, r) => s + r.stock * r.rate, 0))} tone="success" delta={4.8} />
        <StatCard label="Low Stock" value={rows.filter((r) => r.stock < r.min).length} tone="danger" />
      </div>
      <div className="mt-4"><DataTable columns={cols} rows={rows} addLabel="Add SKU" onAdd={() => {}} /></div>
    </ModuleShell>
  );
}

export { CatInv };