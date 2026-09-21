import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { MANUFACTURERS } from "@/lib/erp/data";
import { inr, inrCompact } from "@/lib/erp/format";
import { Plus, Factory, Star, TrendingUp, Clock } from "lucide-react";

export const Route = createFileRoute("/manufacturers")({
  head: () => ({ meta: [{ title: "Manufacturers — Vastra ERP" }] }),
  component: MfrPage,
});

function MfrPage() {
  const cols: Column<(typeof MANUFACTURERS)[number]>[] = [
    { key: "n", header: "Manufacturer", render: (r) => (<div><div className="font-medium">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.id} · {r.city}</div></div>) },
    { key: "rate", header: "Rate / m", align: "right", render: (r) => <span className="font-mono">{inr(r.ratePerMeter)}</span> },
    { key: "run", header: "Running", align: "right", render: (r) => r.running },
    { key: "pen", header: "Pending", align: "right", render: (r) => r.pending },
    { key: "done", header: "Completed", align: "right", render: (r) => r.completed },
    { key: "rate2", header: "Quality", render: (r) => <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-medium text-warning-foreground"><Star className="h-3 w-3 fill-current" /> {r.rating}</span> },
    { key: "del", header: "Delivery %", align: "right", render: (r) => (<div className="inline-flex flex-col items-end"><span className="font-mono text-[12px]">{r.delivery}%</span><div className="mt-0.5 h-1 w-16 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand" style={{ width: `${r.delivery}%` }} /></div></div>) },
    { key: "os", header: "Outstanding", align: "right", render: (r) => <span className="font-mono">{inr(r.outstanding)}</span> },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <ModuleShell title="Manufacturers" subtitle="Weaving units, rates and current orders."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Manufacturer</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Manufacturers" value={MANUFACTURERS.length} icon={Factory} tone="brand" />
        <StatCard label="Running Orders" value={MANUFACTURERS.reduce((s, m) => s + m.running, 0)} icon={Clock} tone="info" />
        <StatCard label="Avg Rating" value="4.7 ★" icon={Star} tone="warning" />
        <StatCard label="Avg Delivery" value="94%" icon={TrendingUp} tone="success" delta={2.1} />
      </div>
      <div className="mt-4"><DataTable columns={cols} rows={MANUFACTURERS} addLabel="Add Manufacturer" onAdd={() => {}} /></div>
    </ModuleShell>
  );
}