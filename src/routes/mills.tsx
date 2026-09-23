import { createFileRoute, Link, Outlet, useMatch } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { MILLS } from "@/lib/erp/data";
import { inr, num, shortDate } from "@/lib/erp/format";
import { Plus, Building2, Factory, Timer, TrendingUp, Camera, Paperclip, MessageSquare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/mills")({
  head: () => ({ meta: [{ title: "Mill Process — Vastra ERP" }] }),
  component: MillsRouteComponent,
});

function MillsRouteComponent() {
  const matchDetail = useMatch({ from: "/mills/$id", shouldThrow: false });
  if (matchDetail) {
    return <Outlet />;
  }
  return <MillsPage />;
}

function MillsPage() {
  const sent = MILLS.reduce((s, m) => s + m.fabricSent, 0);
  const received = MILLS.reduce((s, m) => s + m.fabricReceived, 0);
  const pending = sent - received;

  return (
    <ModuleShell
      title="Mill Process Dashboard"
      subtitle="Dyeing · Printing · Finishing — real-time fabric tracking"
      actions={
        <>
          <Btn variant="outline"><Factory className="h-4 w-4" /> Mill Directory</Btn>
          <Btn variant="brand"><Plus className="h-4 w-4" /> Send Fabric to Mill</Btn>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Fabric Sent" value={`${num(sent)} m`} icon={ArrowRight} tone="info" hint="This month" />
        <StatCard label="Fabric Received" value={`${num(received)} m`} icon={Building2} tone="success" delta={7.4} />
        <StatCard label="Pending at Mills" value={`${num(pending)} m`} icon={Timer} tone="warning" hint="Awaiting return" />
        <StatCard label="Avg Turnaround" value="4.8 days" icon={TrendingUp} tone="brand" delta={-6.2} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MILLS.map((m, i) => {
          const pct = m.fabricSent ? Math.round((m.fabricReceived / m.fabricSent) * 100) : 0;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="card-elevated overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3 border-b border-border/70 p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-semibold">{m.name}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{m.id} · {m.process}</div>
                    </div>
                  </div>
                </div>
                <StatusBadge status={m.status} />
              </div>

              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <Stat label="Sent" value={num(m.fabricSent)} unit="m" />
                  <Stat label="Received" value={num(m.fabricReceived)} unit="m" accent="success" />
                  <Stat label="Pending" value={num(m.pending)} unit="m" accent="warning" />
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-muted-foreground">Progress</span>
                    <span className="font-mono font-medium">{pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${pct === 100 ? "bg-success" : "bg-brand"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                  <MetaRow label="Lot No." value={<span className="font-mono">{m.lot}</span>} />
                  <MetaRow label="ETA" value={shortDate(m.eta)} />
                  <MetaRow
                    label="Shade"
                    value={
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-3 w-3 rounded-full border border-border"
                          style={{ background: m.shade.split("#")[1] ? `#${m.shade.split("#")[1]}` : undefined }}
                        />
                        {m.shade.split("#")[0].trim()}
                      </span>
                    }
                  />
                  <MetaRow label="Mill Charges" value={<span className="font-mono">{inr(m.charges)}</span>} />
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><Camera className="h-3.5 w-3.5" /> 4</span>
                    <span className="inline-flex items-center gap-1"><Paperclip className="h-3.5 w-3.5" /> 2</span>
                    <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> 3</span>
                  </div>
                  <Link to="/mills/$id" params={{ id: m.id }} className="font-medium text-brand hover:underline">
                    View timeline →
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ModuleShell>
  );
}

function Stat({ label, value, unit, accent }: { label: string; value: string; unit: string; accent?: "success" | "warning" }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-2">
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono text-[15px] font-semibold ${accent === "success" ? "text-success" : accent === "warning" ? "text-warning-foreground" : ""}`}>
        {value}<span className="ml-0.5 text-[10px] text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-[12.5px] font-medium">{value}</div>
    </div>
  );
}