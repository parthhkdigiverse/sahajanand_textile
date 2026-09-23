import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { RAW_MATERIAL, SUPPLIERS } from "@/lib/erp/data";
import { inr, num, inrCompact } from "@/lib/erp/format";
import { Plus, Boxes, AlertTriangle, TrendingDown, TrendingUp, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/raw-material")({
  head: () => ({ meta: [{ title: "Raw Material — Vastra ERP" }] }),
  component: RMPage,
});

function RMPage() {
  const [materials, setMaterials] = useState(RAW_MATERIAL);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    supplier: SUPPLIERS[0]?.name || "",
    location: "Godown A",
    stock: 500,
    min: 200,
    unit: "kg",
    rate: 1200,
  });

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter material name");
      return;
    }
    const newMat = {
      id: `RM-${100 + materials.length + 1}`,
      name: formData.name,
      supplier: formData.supplier,
      location: formData.location,
      stock: Number(formData.stock),
      min: Number(formData.min),
      incoming: 0,
      unit: formData.unit,
      rate: Number(formData.rate),
    };
    setMaterials([newMat, ...materials]);
    setShowModal(false);
    setFormData({
      name: "",
      supplier: SUPPLIERS[0]?.name || "",
      location: "Godown A",
      stock: 500,
      min: 200,
      unit: "kg",
      rate: 1200,
    });
    toast.success(`Material ${newMat.name} added successfully!`);
  };

  const cols: Column<(typeof materials)[number]>[] = [
    { key: "n", header: "Material", render: (r) => (<div><div className="font-medium">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.id}</div></div>) },
    { key: "sup", header: "Supplier", render: (r) => r.supplier },
    { key: "loc", header: "Location", render: (r) => <span className="text-[12px]">{r.location}</span> },
    { key: "stk", header: "Stock", align: "right", render: (r) => <span className={`font-mono ${r.stock < r.min ? "text-danger" : ""}`}>{num(r.stock)} {r.unit}</span> },
    { key: "min", header: "Min", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{num(r.min)}</span> },
    { key: "in", header: "Incoming", align: "right", render: (r) => r.incoming > 0 ? <span className="font-mono text-success">+{num(r.incoming)}</span> : "—" },
    { key: "rt", header: "Rate", align: "right", render: (r) => <span className="font-mono">{inr(r.rate)}</span> },
    { key: "val", header: "Value", align: "right", render: (r) => <span className="font-mono font-medium">{inrCompact(r.stock * r.rate)}</span> },
  ];
  const totalVal = materials.reduce((s, r) => s + r.stock * r.rate, 0);
  return (
    <ModuleShell title="Raw Material" subtitle="Yarn, zari, dyes & filaments — incoming and current stock."
      actions={<Btn variant="brand" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Material</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="SKUs" value={materials.length} icon={Boxes} tone="brand" />
        <StatCard label="Stock Value" value={inrCompact(totalVal)} tone="success" delta={3.4} icon={TrendingUp} />
        <StatCard label="Low Stock" value={materials.filter((r) => r.stock < r.min).length} tone="danger" icon={AlertTriangle} />
        <StatCard label="MTD Consumption" value={inrCompact(28_40_000)} tone="warning" delta={-2.1} icon={TrendingDown} />
      </div>
      <div className="mt-4"><DataTable columns={cols} rows={materials} /></div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-base font-semibold text-foreground">Add Raw Material SKU</h3>
              <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddMaterial} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Material Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mulberry Silk Yarn 20/22 Denier"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Supplier</label>
                  <select
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    {SUPPLIERS.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Initial Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Rate / Unit (₹)</label>
                  <input
                    type="number"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value) })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <Btn type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Btn>
                <Btn type="submit" variant="brand">Save Material</Btn>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleShell>
  );
}