import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { COLORS } from "@/lib/erp/data";
import { Palette, Plus } from "lucide-react";

export const Route = createFileRoute("/color-inventory")({
  head: () => ({ meta: [{ title: "Color Inventory — Vastra ERP" }] }),
  component: ColorInvPage,
});

function ColorInvPage() {
  const total = COLORS.reduce((s, c) => s + c.stock, 0);
  return (
    <ModuleShell title="Color Inventory" subtitle="Reactive dyes & pigments — by shade and mill allocation."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Add Shade</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Active Shades" value={COLORS.length} icon={Palette} tone="brand" />
        <StatCard label="Total Stock" value={`${total} Kg`} tone="info" />
        <StatCard label="Consumed (MTD)" value={`${COLORS.reduce((s, c) => s + c.used, 0)} Kg`} tone="warning" delta={5.6} />
        <StatCard label="Mills Allocated" value={new Set(COLORS.map((c) => c.mill)).size} tone="success" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {COLORS.map((c) => (
          <SectionCard key={c.id} padded={false}>
            <div className="relative aspect-[16/9] w-full" style={{ background: c.hex }}>
              <div className="absolute right-2 top-2 rounded-full bg-black/25 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur">
                {c.hex}
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{c.name}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{c.id}</div>
              </div>
              <div className="mt-1 text-[11.5px] text-muted-foreground">Assigned mill: {c.mill}</div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Stock</div>
                  <div className="font-mono text-[15px] font-semibold">{c.stock}<span className="ml-0.5 text-[10px] text-muted-foreground">{c.unit}</span></div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground text-right">Used</div>
                  <div className="font-mono text-[13px] text-warning-foreground">{c.used} {c.unit}</div>
                </div>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, (c.used / (c.used + c.stock)) * 100)}%`, background: c.hex }} />
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </ModuleShell>
  );
}