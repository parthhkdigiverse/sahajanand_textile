import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { SUPPLIERS } from "@/lib/erp/data";
import { inr, inrCompact } from "@/lib/erp/format";
import { Plus, Truck, IndianRupee, PackageCheck, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers — Vastra ERP" }] }),
  component: SuppliersPage,
});

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(SUPPLIERS);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "Surat",
    gstin: "",
    material: "Silk Yarn & Zari",
    phone: "+91 98251 00000",
  });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter supplier name");
      return;
    }
    const newSup = {
      id: `SUP-${100 + suppliers.length + 1}`,
      name: formData.name,
      city: formData.city,
      gstin: formData.gstin || "24BBBBB0000B1Z1",
      material: formData.material,
      phone: formData.phone,
      outstanding: 0,
      status: "active" as const,
    };
    setSuppliers([newSup, ...suppliers]);
    setShowModal(false);
    setFormData({ name: "", city: "Surat", gstin: "", material: "Silk Yarn & Zari", phone: "+91 98251 00000" });
    toast.success(`Supplier ${newSup.name} created successfully!`);
  };

  const cols: Column<(typeof suppliers)[number]>[] = [
    { key: "name", header: "Supplier", render: (r) => (<div><div className="font-medium">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.id} · {r.city}</div></div>) },
    { key: "gst", header: "GSTIN", render: (r) => <span className="font-mono text-[12px]">{r.gstin}</span> },
    { key: "mat", header: "Materials", render: (r) => <span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">{r.material}</span> },
    { key: "ph", header: "Phone", render: (r) => r.phone },
    { key: "os", header: "Outstanding", align: "right", render: (r) => <span className={`font-mono ${r.outstanding > 0 ? "text-warning-foreground" : "text-success"}`}>{inr(r.outstanding)}</span> },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];
  const outstanding = suppliers.reduce((s, c) => s + c.outstanding, 0);
  return (
    <ModuleShell title="Suppliers" subtitle="Raw material vendors, purchase history and payables."
      actions={<Btn variant="brand" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Supplier</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total Suppliers" value={suppliers.length} icon={Truck} tone="brand" />
        <StatCard label="Payable" value={inrCompact(outstanding)} icon={IndianRupee} tone="warning" />
        <StatCard label="Purchase (MTD)" value={inrCompact(61200000)} icon={PackageCheck} tone="info" delta={4.2} />
        <StatCard label="Avg Lead Time" value="6.4 days" hint="From PO to GRN" tone="success" />
      </div>
      <div className="mt-4"><DataTable columns={cols} rows={suppliers} /></div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-base font-semibold text-foreground">Add New Supplier</h3>
              <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Supplier Firm Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laxmi Silk Yarns"
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
                  <label className="block text-xs font-medium text-muted-foreground">GSTIN</label>
                  <input
                    type="text"
                    placeholder="24BBBBB0000B1Z1"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground">Supplied Materials</label>
                <input
                  type="text"
                  placeholder="e.g. Silk Yarn, Metallic Zari, Dyes"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <Btn type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Btn>
                <Btn type="submit" variant="brand">Save Supplier</Btn>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleShell>
  );
}