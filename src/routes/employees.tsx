import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { EMPLOYEES } from "@/lib/erp/data";
import { Plus, UserCog, Users, Award, Clock } from "lucide-react";

export const Route = createFileRoute("/employees")({
  head: () => ({ meta: [{ title: "Employees — Vastra ERP" }] }),
  component: () => {
    const cols: Column<(typeof EMPLOYEES)[number]>[] = [
      { key: "n", header: "Employee", render: (r) => (
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand/20 to-secondary/20 text-[11px] font-semibold text-brand">{r.name.split(" ").slice(0, 2).map(w => w[0]).join("")}</div>
          <div><div className="font-medium">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.id}</div></div>
        </div>
      ) },
      { key: "r", header: "Role", render: (r) => r.role },
      { key: "d", header: "Department", render: (r) => <span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">{r.dept}</span> },
      { key: "p", header: "Phone", render: (r) => <span className="font-mono text-[12px]">{r.phone}</span> },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    return (
      <ModuleShell title="Employees" subtitle="Team directory across sales, ops, finance & production."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Add Employee</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Employees" value={EMPLOYEES.length} icon={Users} tone="brand" />
          <StatCard label="Departments" value={new Set(EMPLOYEES.map(e => e.dept)).size} icon={UserCog} tone="info" />
          <StatCard label="Active Today" value={EMPLOYEES.length} icon={Clock} tone="success" />
          <StatCard label="On Leave" value={0} icon={Award} tone="warning" />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={EMPLOYEES} addLabel="Add Employee" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});