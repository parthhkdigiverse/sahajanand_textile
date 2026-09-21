import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { Btn } from "@/components/erp/Actions";
import { DISPATCH_STAGES } from "@/lib/erp/data";
import { motion } from "framer-motion";
import { ChevronDown, ArrowDown, Filter, Download } from "lucide-react";

export const Route = createFileRoute("/dispatch")({
  head: () => ({ meta: [{ title: "Dispatch Pipeline — Vastra ERP" }] }),
  component: DispatchPage,
});

function DispatchPage() {
  return (
    <ModuleShell title="Dispatch Pipeline" subtitle="Live view of every order from creation to completion."
      actions={<><Btn variant="outline"><Filter className="h-4 w-4" /> Filter</Btn><Btn variant="outline"><Download className="h-4 w-4" /> Export</Btn></>}>
      <SectionCard title="End-to-end order flow" subtitle="18 stages · Order → Payment → Completed">
        <div className="mx-auto max-w-3xl">
          {DISPATCH_STAGES.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025 }}
            >
              <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-surface p-3 shadow-sm">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-[12px] font-mono font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-semibold">{s.label}</div>
                  <div className="text-[11.5px] text-muted-foreground">
                    Stage {i + 1} of {DISPATCH_STAGES.length}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[16px] font-semibold text-brand">{s.count}</div>
                  <div className="text-[10.5px] text-muted-foreground">active</div>
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground hover:bg-muted">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              {i < DISPATCH_STAGES.length - 1 && (
                <div className="my-1 grid place-items-center text-border">
                  <ArrowDown className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </SectionCard>
    </ModuleShell>
  );
}