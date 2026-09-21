import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { inr, inrCompact, shortDate } from "@/lib/erp/format";
import { Plus, ShoppingCart, PackageCheck, IndianRupee, Truck } from "lucide-react";

const POs = [
  { id: "PO-YRN-1181", date: "2026-07-02", supplier: "Ganesh Yarn Traders", material: "Polyester Yarn 150D", qty: "1,200 Kg", total: 178000, status: "processing" as const },
  { id: "PO-ZRI-1182", date: "2026-07-02", supplier: "Shree Ram Zari", material: "Gold Zari 1200", qty: "50 Kg", total: 192500, status: "pending" as const },
  { id: "PO-DYE-1183", date: "2026-07-01", supplier: "Kalpataru Dyes & Chem", material: "Reactive Dye Red", qty: "60 Kg", total: 75000, status: "completed" as const },
  { id: "PO-VIS-1184", date: "2026-06-30", supplier: "Modi Silk Suppliers", material: "Viscose Filament", qty: "400 Kg", total: 114000, status: "completed" as const },
  { id: "PO-LCE-1185", date: "2026-06-29", supplier: "New Style Lace House", material: "Nylon Filament 40D", qty: "200 Kg", total: 64000, status: "processing" as const },
];

export const Route = createFileRoute("/purchase")({
  head: () => ({ meta: [{ title: "Purchase — Vastra ERP" }] }),
  component: () => {
    const cols: Column<(typeof POs)[number]>[] = [
      { key: "id", header: "PO", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "d", header: "Date", render: (r) => shortDate(r.date) },
      { key: "s", header: "Supplier", render: (r) => <span className="font-medium">{r.supplier}</span> },
      { key: "m", header: "Material", render: (r) => r.material },
      { key: "q", header: "Qty", align: "right", render: (r) => <span className="font-mono">{r.qty}</span> },
      { key: "t", header: "Total", align: "right", render: (r) => <span className="font-mono">{inr(r.total)}</span> },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];
    return (
      <ModuleShell title="Purchase" subtitle="POs · GRN · Supplier Invoices · Payments"
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New PO</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Open POs" value={POs.filter(p => p.status !== "completed").length} icon={ShoppingCart} tone="brand" />
          <StatCard label="Purchase (MTD)" value={inrCompact(POs.reduce((s, p) => s + p.total, 0))} icon={IndianRupee} tone="info" delta={4.4} />
          <StatCard label="GRN Pending" value={2} icon={PackageCheck} tone="warning" />
          <StatCard label="Supplier Deliveries" value={5} icon={Truck} tone="success" />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={POs} addLabel="New PO" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});