import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { PAYMENTS } from "@/lib/erp/data";
import { inr, inrCompact, shortDate } from "@/lib/erp/format";
import { Plus, ArrowDownRight, ArrowUpRight, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Payments — Vastra ERP" }] }),
  component: () => {
    const received = PAYMENTS.filter(p => p.type === "Received").reduce((s, p) => s + p.amount, 0);
    const paid = PAYMENTS.filter(p => p.type === "Paid").reduce((s, p) => s + p.amount, 0);
    const cols: Column<(typeof PAYMENTS)[number]>[] = [
      { key: "id", header: "Ref", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "d", header: "Date", render: (r) => shortDate(r.date) },
      { key: "p", header: "Party", render: (r) => <span className="font-medium">{r.party}</span> },
      { key: "ag", header: "Against", render: (r) => <span className="font-mono text-[12px]">{r.against}</span> },
      { key: "m", header: "Mode", render: (r) => <span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">{r.mode}</span> },
      { key: "type", header: "Type", render: (r) => <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${r.type === "Received" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"}`}>{r.type === "Received" ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}{r.type}</span> },
      { key: "a", header: "Amount", align: "right", render: (r) => <span className={`font-mono font-semibold ${r.type === "Received" ? "text-success" : "text-foreground"}`}>{inr(r.amount)}</span> },
      { key: "rf", header: "Bank Ref", render: (r) => <span className="font-mono text-[11px] text-muted-foreground">{r.ref}</span> },
    ];
    return (
      <ModuleShell title="Payments" subtitle="Customer, supplier, manufacturer & mill transactions."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Record Payment</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Received (MTD)" value={inrCompact(received)} icon={ArrowDownRight} tone="success" delta={9.4} />
          <StatCard label="Paid (MTD)" value={inrCompact(paid)} icon={ArrowUpRight} tone="warning" delta={3.8} />
          <StatCard label="Net Cash" value={inrCompact(received - paid)} icon={IndianRupee} tone="brand" />
          <StatCard label="Modes" value={new Set(PAYMENTS.map(p => p.mode)).size} tone="info" hint="NEFT, RTGS, UPI, Cheque" />
        </div>
        <div className="mt-4"><DataTable columns={cols} rows={PAYMENTS} addLabel="Record" onAdd={() => {}} /></div>
      </ModuleShell>
    );
  },
});