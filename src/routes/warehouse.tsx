import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { WAREHOUSES } from "@/lib/erp/data";
import { inrCompact } from "@/lib/erp/format";
import { Plus, Warehouse, Boxes, Layers, MapPin, User } from "lucide-react";

export const Route = createFileRoute("/warehouse")({
  head: () => ({ meta: [{ title: "Warehouses — Vastra ERP" }] }),
  component: () => (
    <ModuleShell title="Warehouses" subtitle="Multi-location storage with rack utilisation."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Add Warehouse</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Warehouses" value={WAREHOUSES.length} icon={Warehouse} tone="brand" />
        <StatCard label="Total Racks" value={WAREHOUSES.reduce((s, w) => s + w.racks, 0)} icon={Layers} tone="info" />
        <StatCard label="Avg Utilisation" value={`${Math.round(WAREHOUSES.reduce((s, w) => s + w.utilisation, 0) / WAREHOUSES.length)}%`} icon={Boxes} tone="warning" />
        <StatCard label="Combined Value" value={inrCompact(WAREHOUSES.reduce((s, w) => s + w.stockValue, 0))} tone="success" delta={5.6} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {WAREHOUSES.map((w) => (
          <SectionCard key={w.id} title={w.name} subtitle={`${w.id} · ${w.racks} racks`}>
            <div className="grid grid-cols-3 gap-3 text-[12px]">
              <Info label="Utilisation" value={<div><div className="font-mono font-semibold">{w.utilisation}%</div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand" style={{ width: `${w.utilisation}%` }} /></div></div>} />
              <Info label="Location" value={<span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {w.city}</span>} />
              <Info label="Manager" value={<span className="inline-flex items-center gap-1"><User className="h-3 w-3" /> {w.manager}</span>} />
              <Info label="Stock Value" value={<span className="font-mono text-brand">{inrCompact(w.stockValue)}</span>} />
              <Info label="Categories" value="Less · Patta · Border" />
              <Info label="Last Audit" value="15 Jun 2026" />
            </div>
          </SectionCard>
        ))}
      </div>
    </ModuleShell>
  ),
});

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-[12.5px] font-medium">{value}</div>
    </div>
  );
}