import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { QC_INSPECTIONS } from "@/lib/erp/data";
import { num, shortDate } from "@/lib/erp/format";
import { BadgeCheck, ThumbsUp, ThumbsDown, Recycle, Plus } from "lucide-react";

export const Route = createFileRoute("/quality-check")({
  head: () => ({ meta: [{ title: "Quality Check — Vastra ERP" }] }),
  component: () => {
    const cols: Column<(typeof QC_INSPECTIONS)[number]>[] = [
      { key: "id", header: "Inspection", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "p", header: "Product", render: (r) => <span className="font-medium">{r.product}</span> },
      { key: "lot", header: "Lot", render: (r) => <span className="font-mono text-[12px]">{r.lot}</span> },
      { key: "insp", header: "Inspected", align: "right", render: (r) => <span className="font-mono">{num(r.inspected)}</span> },
      { key: "pass", header: "Passed", align: "right", render: (r) => <span className="font-mono text-success">{num(r.passed)}</span> },
      { key: "rej", header: "Rejected", align: "right", render: (r) => <span className="font-mono text-danger">{num(r.rejected)}</span> },
      { key: "rew", header: "Rework", align: "right", render: (r) => <span className="font-mono text-warning-foreground">{num(r.rework)}</span> },
      { key: "ins", header: "Inspector", render: (r) => r.inspector },
      { key: "d", header: "Date", render: (r) => shortDate(r.date) },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    return (
      <ModuleShell title="Quality Check" subtitle="Inspection log with pass, reject & rework metrics."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Inspection</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Inspections (Today)" value={QC_INSPECTIONS.length} icon={BadgeCheck} tone="brand" />
          <StatCard label="Pass Rate" value="97.6%" icon={ThumbsUp} tone="success" delta={0.8} />
          <StatCard label="Rejection Rate" value="1.5%" icon={ThumbsDown} tone="danger" />
          <StatCard label="Rework %" value="0.9%" icon={Recycle} tone="warning" />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={QC_INSPECTIONS} addLabel="New Inspection" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});