import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { MANUFACTURERS } from "@/lib/erp/data";
import { inr, inrCompact } from "@/lib/erp/format";
import { Plus, Factory, Star, TrendingUp, Clock, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/manufacturers")({
  head: () => ({ meta: [{ title: "Manufacturers — Vastra ERP" }] }),
  component: MfrPage,
});

function MfrPage() {
  const [mfrs, setMfrs] = useState(MANUFACTURERS);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "Surat",
    ratePerMeter: 45,
    rating: 4.5,
  });

  const handleAddMfr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter manufacturer name");
      return;
    }
    const newMfr = {
      id: `MFR-${100 + mfrs.length + 1}`,
      name: formData.name,
      city: formData.city,
      ratePerMeter: Number(formData.ratePerMeter),
      running: 0,
      pending: 0,
      completed: 0,
      rating: Number(formData.rating),
      delivery: 95,
      outstanding: 0,
      status: "active" as const,
    };
    setMfrs([newMfr, ...mfrs]);
    setShowModal(false);
    setFormData({ name: "", city: "Surat", ratePerMeter: 45, rating: 4.5 });
    toast.success(`Manufacturer ${newMfr.name} added successfully!`);
  };

  const cols: Column<(typeof mfrs)[number]>[] = [
    { key: "n", header: "Manufacturer", render: (r) => (<div><div className="font-medium">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.id} · {r.city}</div></div>) },
    { key: "rate", header: "Rate / m", align: "right", render: (r) => <span className="font-mono">{inr(r.ratePerMeter)}</span> },
    { key: "run", header: "Running", align: "right", render: (r) => r.running },
    { key: "pen", header: "Pending", align: "right", render: (r) => r.pending },
    { key: "done", header: "Completed", align: "right", render: (r) => r.completed },
    { key: "rate2", header: "Quality", render: (r) => <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-medium text-warning-foreground"><Star className="h-3 w-3 fill-current" /> {r.rating}</span> },
    { key: "del", header: "Delivery %", align: "right", render: (r) => (<div className="inline-flex flex-col items-end"><span className="font-mono text-[12px]">{r.delivery}%</span><div className="mt-0.5 h-1 w-16 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand" style={{ width: `${r.delivery}%` }} /></div></div>) },
    { key: "os", header: "Outstanding", align: "right", render: (r) => <span className="font-mono">{inr(r.outstanding)}</span> },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <ModuleShell title="Manufacturers" subtitle="Weaving units, rates and current orders."
      actions={<Btn variant="brand" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Manufacturer</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Manufacturers" value={mfrs.length} icon={Factory} tone="brand" />
        <StatCard label="Running Orders" value={mfrs.reduce((s, m) => s + m.running, 0)} icon={Clock} tone="info" />
        <StatCard label="Avg Rating" value="4.7 ★" icon={Star} tone="warning" />
        <StatCard label="Avg Delivery" value="94%" icon={TrendingUp} tone="success" delta={2.1} />
      </div>
      <div className="mt-4"><DataTable columns={cols} rows={mfrs} /></div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-base font-semibold text-foreground">Add New Manufacturer</h3>
              <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddMfr} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Manufacturer / Weaving Unit Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahavir Textiles"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Weaving Rate / m (₹)</label>
                  <input
                    type="number"
                    value={formData.ratePerMeter}
                    onChange={(e) => setFormData({ ...formData, ratePerMeter: Number(e.target.value) })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <Btn type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Btn>
                <Btn type="submit" variant="brand">Save Manufacturer</Btn>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleShell>
  );
}