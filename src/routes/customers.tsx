import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { CUSTOMERS } from "@/lib/erp/data";
import { inr, inrCompact } from "@/lib/erp/format";
import { Download, Plus, Users, IndianRupee, ShieldAlert, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customers — Vastra ERP" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  const total = CUSTOMERS.length;
  const outstanding = CUSTOMERS.reduce((s, c) => s + c.outstanding, 0);
  const active = CUSTOMERS.filter((c) => c.status === "active").length;
  const overdue = CUSTOMERS.filter((c) => c.status === "delayed").length;

  const cols: Column<(typeof CUSTOMERS)[number]>[] = [
    {
      key: "party",
      header: "Customer",
      render: (r) => (
        <Link to="/customers/$id" params={{ id: r.id }} className="group flex items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand/20 to-secondary/20 text-[11px] font-semibold text-brand">
            {r.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium text-foreground group-hover:text-brand">{r.name}</div>
            <div className="truncate text-[11px] text-muted-foreground">{r.id} · {r.city}</div>
          </div>
        </Link>
      ),
    },
    { key: "gstin", header: "GSTIN", render: (r) => <span className="font-mono text-[12px]">{r.gstin}</span> },
    { key: "contact", header: "Contact", render: (r) => (<div><div>{r.contact}</div><div className="text-[11px] text-muted-foreground">{r.phone}</div></div>) },
    { key: "cat", header: "Category", render: (r) => <span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">{r.category}</span> },
    { key: "terms", header: "Terms", render: (r) => r.terms },
    { key: "credit", header: "Credit Limit", align: "right", render: (r) => <span className="font-mono">{inr(r.credit)}</span> },
    { key: "os", header: "Outstanding", align: "right", render: (r) => (<span className={`font-mono font-medium ${r.outstanding > 0 ? "text-danger" : "text-success"}`}>{inr(r.outstanding)}</span>) },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <ModuleShell
      title="Customers"
      subtitle="Directory, ledgers, credit limits and outstanding."
      actions={
        <>
          <Btn variant="outline"><Download className="h-4 w-4" /> Export</Btn>
          <Btn variant="brand"><Plus className="h-4 w-4" /> New Customer</Btn>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total Customers" value={total} icon={Users} tone="brand" hint={`${active} active`} />
        <StatCard label="Outstanding" value={inrCompact(outstanding)} icon={IndianRupee} tone="warning" delta={6.4} />
        <StatCard label="Overdue Accounts" value={overdue} icon={ShieldAlert} tone="danger" hint="Follow-up required" />
        <StatCard label="MTD Sales" value={inrCompact(8_74_65_000)} icon={TrendingUp} tone="success" delta={12.4} />
      </div>
      <div className="mt-4">
        <DataTable columns={cols} rows={CUSTOMERS} addLabel="Add Customer" onAdd={() => {}} />
      </div>
    </ModuleShell>
  );
}