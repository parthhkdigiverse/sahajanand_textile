import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { PACKING } from "@/lib/erp/data";
import { num } from "@/lib/erp/format";
import { Archive, Plus, Tag, Scale, Boxes } from "lucide-react";

export const Route = createFileRoute("/packing")({
  head: () => ({ meta: [{ title: "Packing — Vastra ERP" }] }),
  component: () => (
    <ModuleShell title="Packing" subtitle="Roll bundling, labelling and dispatch handoff."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Packing Job</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Jobs" value={PACKING.length} icon={Archive} tone="brand" />
        <StatCard label="Packed Today" value={`${num(PACKING.reduce((s, p) => s + p.packed, 0))} m`} icon={Boxes} tone="success" delta={6.2} />
        <StatCard label="Pending" value={`${num(PACKING.reduce((s, p) => s + p.pending, 0))} m`} icon={Scale} tone="warning" />
        <StatCard label="Labels" value="Ready" icon={Tag} tone="info" hint="2 pending print" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PACKING.map((p) => (
          <SectionCard key={p.id} title={p.product} subtitle={p.id}>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Package</span><span className="font-medium">{p.packageType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Weight</span><span className="font-medium">{p.weight}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Packed</span><span className="font-mono text-success">{num(p.packed)} m</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pending</span><span className="font-mono text-warning-foreground">{num(p.pending)} m</span></div>
              <div className="flex justify-between items-center"><span className="text-muted-foreground">Labels</span><span className={`rounded-full px-2 py-0.5 text-[10.5px] ring-1 ring-inset ${p.labels === "Ready" ? "bg-success/10 text-success ring-success/20" : "bg-warning/10 text-warning-foreground ring-warning/30"}`}>{p.labels}</span></div>
            </div>
          </SectionCard>
        ))}
      </div>
    </ModuleShell>
  ),
});