import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { CUTTING_JOBS } from "@/lib/erp/data";
import { num } from "@/lib/erp/format";
import { Scissors, TrendingDown, Plus, Cog } from "lucide-react";

export const Route = createFileRoute("/cutting-process")({
  head: () => ({ meta: [{ title: "Cutting Process — Vastra ERP" }] }),
  component: () => {
    const cols: Column<(typeof CUTTING_JOBS)[number]>[] = [
      { key: "id", header: "Job", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "p", header: "Product", render: (r) => <span className="font-medium">{r.product}</span> },
      { key: "op", header: "Operator", render: (r) => r.operator },
      { key: "mac", header: "Machine", render: (r) => <span className="inline-flex items-center gap-1 text-[12px]"><Cog className="h-3 w-3 text-muted-foreground" /> {r.machine}</span> },
      { key: "recv", header: "Received", align: "right", render: (r) => <span className="font-mono">{num(r.received)} m</span> },
      { key: "cut", header: "Cut", align: "right", render: (r) => <span className="font-mono text-success">{num(r.cut)} m</span> },
      { key: "wst", header: "Waste", align: "right", render: (r) => <span className="font-mono text-danger">{num(r.waste)} m</span> },
      { key: "rem", header: "Remaining", align: "right", render: (r) => <span className="font-mono">{num(r.remaining)} m</span> },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    return (
      <ModuleShell title="Cutting Process" subtitle="Machine, operator and waste tracking per job."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Assign Job</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Active Jobs" value={CUTTING_JOBS.filter(j => j.status === "processing").length} icon={Scissors} tone="brand" />
          <StatCard label="Cut Today" value={`${num(CUTTING_JOBS.reduce((s, j) => s + j.cut, 0))} m`} tone="success" delta={4.4} />
          <StatCard label="Waste %" value="1.6%" icon={TrendingDown} tone="warning" delta={-0.4} />
          <StatCard label="Operators" value={4} tone="info" />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={CUTTING_JOBS} addLabel="New Job" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});