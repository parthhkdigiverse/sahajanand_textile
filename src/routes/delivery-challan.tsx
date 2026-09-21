import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { CHALLANS } from "@/lib/erp/data";
import { inr, inrCompact, num, shortDate } from "@/lib/erp/format";
import { FileText, Truck, MapPin, Timer, Plus } from "lucide-react";

export const Route = createFileRoute("/delivery-challan")({
  head: () => ({ meta: [{ title: "Delivery Challan — Vastra ERP" }] }),
  component: () => {
    const cols: Column<(typeof CHALLANS)[number]>[] = [
      { key: "id", header: "Challan No.", render: (r) => <Link to="/delivery-challan/$id" params={{ id: r.id }} className="font-mono text-brand hover:underline">{r.id}</Link> },
      { key: "d", header: "Date", render: (r) => shortDate(r.date) },
      { key: "c", header: "Customer", render: (r) => (<div><div className="font-medium">{r.customer}</div><div className="text-[11px] text-muted-foreground">{r.city}</div></div>) },
      { key: "t", header: "Transport", render: (r) => (<div><div>{r.transport}</div><div className="font-mono text-[11px] text-muted-foreground">{r.vehicle}</div></div>) },
      { key: "dr", header: "Driver", render: (r) => r.driver },
      { key: "i", header: "Items", align: "right", render: (r) => r.items },
      { key: "q", header: "Qty", align: "right", render: (r) => <span className="font-mono">{num(r.qty)} m</span> },
      { key: "a", header: "Amount", align: "right", render: (r) => <span className="font-mono">{inr(r.amount)}</span> },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    const totalAmt = CHALLANS.reduce((s, c) => s + c.amount, 0);
    return (
      <ModuleShell title="Delivery Challans" subtitle="All outward challans with transport & GPS status."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Challan</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Challans (MTD)" value={CHALLANS.length} icon={FileText} tone="brand" />
          <StatCard label="In Transit" value={CHALLANS.filter(c => c.status === "processing").length} icon={Truck} tone="info" />
          <StatCard label="Delivered" value={CHALLANS.filter(c => c.status === "completed").length} icon={MapPin} tone="success" />
          <StatCard label="Value Dispatched" value={inrCompact(totalAmt)} icon={Timer} tone="warning" delta={8.4} />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={CHALLANS} addLabel="New Challan" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});