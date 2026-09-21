import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { StatCard } from "@/components/erp/StatCard";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { PRODUCTION_ORDERS, MANUFACTURERS } from "@/lib/erp/data";
import { inr, num, shortDate } from "@/lib/erp/format";
import { Plus, Wrench, Timer, TrendingUp, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({ meta: [{ title: "Manufacturing — Vastra ERP" }] }),
  component: MfgPage,
});

function MfgPage() {
  const running = PRODUCTION_ORDERS.filter((o) => o.status === "processing").length;
  const delayed = PRODUCTION_ORDERS.filter((o) => o.status === "delayed").length;
  const totalMeters = PRODUCTION_ORDERS.reduce((s, o) => s + o.qty, 0);
  const totalCost = PRODUCTION_ORDERS.reduce((s, o) => s + o.cost, 0);

  return (
    <ModuleShell title="Manufacturing" subtitle="Production dashboard across all manufacturers."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Create Order</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Active Orders" value={running} icon={Wrench} tone="brand" />
        <StatCard label="Total Meters" value={num(totalMeters)} icon={TrendingUp} tone="info" delta={7.2} />
        <StatCard label="In Delay" value={delayed} icon={Timer} tone="danger" />
        <StatCard label="MTD Cost" value={inr(totalCost)} icon={IndianRupee} tone="warning" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Production Progress">
          <div className="space-y-4">
            {PRODUCTION_ORDERS.map((o, i) => {
              const pct = Math.round((o.done / o.qty) * 100);
              return (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-lg border border-border/60 bg-muted/20 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-medium">{o.product}</div>
                      <div className="text-[11.5px] text-muted-foreground">
                        {o.id} · {o.mfr} · ETA {shortDate(o.eta)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ring-1 ring-inset ${
                        o.priority === "High" ? "bg-danger/10 text-danger ring-danger/20" :
                        o.priority === "Medium" ? "bg-warning/10 text-warning-foreground ring-warning/30" :
                        "bg-muted text-muted-foreground ring-border"
                      }`}>{o.priority}</span>
                      <StatusBadge status={o.status} />
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-[11.5px]">
                    <Meta label="Required" value={`${num(o.qty)} m`} />
                    <Meta label="Completed" value={`${num(o.done)} m`} />
                    <Meta label="Cost" value={inr(o.cost)} />
                    <Meta label="Progress" value={`${pct}%`} highlight />
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${o.status === "delayed" ? "bg-danger" : pct === 100 ? "bg-success" : "bg-brand"}`} style={{ width: `${pct}%` }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Manufacturer Load">
          <ul className="space-y-3">
            {MANUFACTURERS.map((m) => {
              const load = Math.min(100, m.running * 10 + m.pending * 5);
              return (
                <li key={m.id}>
                  <div className="mb-1 flex items-center justify-between text-[12.5px]">
                    <span className="font-medium">{m.name}</span>
                    <span className="font-mono text-muted-foreground">{m.running} run · {m.pending} pend</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${load}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>
      </div>
    </ModuleShell>
  );
}

function Meta({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-mono font-medium ${highlight ? "text-brand" : ""}`}>{value}</div>
    </div>
  );
}