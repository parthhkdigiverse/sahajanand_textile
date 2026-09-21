import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { CHALLANS } from "@/lib/erp/data";
import { Truck, MapPin, Timer, Fuel, Plus } from "lucide-react";

export const Route = createFileRoute("/transport")({
  head: () => ({ meta: [{ title: "Transport — Vastra ERP" }] }),
  component: () => {
    const rows = CHALLANS.map((c, i) => ({ ...c, distance: [640, 285, 1120, 895, 640, 1650][i % 6], eta: c.eta }));
    const cols: Column<(typeof rows)[number]>[] = [
      { key: "id", header: "LR / DC", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "cust", header: "Consignee", render: (r) => (<div><div className="font-medium">{r.customer}</div><div className="text-[11px] text-muted-foreground">{r.city}</div></div>) },
      { key: "t", header: "Transporter", render: (r) => r.transport },
      { key: "v", header: "Vehicle", render: (r) => <span className="font-mono text-[12px]">{r.vehicle}</span> },
      { key: "d", header: "Driver", render: (r) => r.driver },
      { key: "dist", header: "Distance", align: "right", render: (r) => <span className="font-mono">{r.distance} km</span> },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    return (
      <ModuleShell title="Transport" subtitle="LR tracking, vehicles, drivers and distances."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Assign Vehicle</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Vehicles Assigned" value={rows.length} icon={Truck} tone="brand" />
          <StatCard label="In Transit" value={rows.filter(r => r.status === "processing").length} icon={MapPin} tone="info" />
          <StatCard label="Avg Transit" value="34 hrs" icon={Timer} tone="warning" />
          <StatCard label="Fuel Cost MTD" value="₹4.2 L" icon={Fuel} tone="success" delta={-3.4} />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={rows} addLabel="Assign" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});