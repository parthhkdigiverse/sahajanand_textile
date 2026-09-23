import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { PRODUCTION_ORDERS, MANUFACTURERS } from "@/lib/erp/data";
import { inr, num, shortDate } from "@/lib/erp/format";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/production-orders")({
  head: () => ({ meta: [{ title: "Production Orders — Vastra ERP" }] }),
  component: () => {
    const [orders, setOrders] = useState(PRODUCTION_ORDERS);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      product: "",
      mfr: MANUFACTURERS[0]?.name || "",
      qty: 1000,
      priority: "Medium" as "Low" | "Medium" | "High",
      eta: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      cost: 50000,
    });

    const handleCreateOrder = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.product.trim()) {
        toast.error("Please enter product name");
        return;
      }
      const newOrder = {
        id: `PO-${202600 + orders.length + 1}`,
        product: formData.product,
        mfr: formData.mfr,
        qty: Number(formData.qty),
        done: 0,
        priority: formData.priority,
        status: "pending" as const,
        eta: formData.eta,
        cost: Number(formData.cost),
      };
      setOrders([newOrder, ...orders]);
      setShowModal(false);
      setFormData({
        product: "",
        mfr: MANUFACTURERS[0]?.name || "",
        qty: 1000,
        priority: "Medium",
        eta: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        cost: 50000,
      });
      toast.success(`Production Order ${newOrder.id} created successfully`);
    };

    const cols: Column<(typeof orders)[number]>[] = [
      { key: "id", header: "Order", render: (r) => <span className="font-mono text-brand">{r.id}</span> },
      { key: "p", header: "Product", render: (r) => <span className="font-medium">{r.product}</span> },
      { key: "mfr", header: "Manufacturer", render: (r) => r.mfr },
      { key: "qty", header: "Qty", align: "right", render: (r) => <span className="font-mono">{num(r.qty)} m</span> },
      { key: "done", header: "Done", align: "right", render: (r) => <span className="font-mono text-success">{num(r.done)} m</span> },
      { key: "pct", header: "Progress", render: (r) => { const p = Math.round((r.done / r.qty) * 100); return <div className="flex items-center gap-2"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted"><div className={`h-full ${r.status === "delayed" ? "bg-danger" : p === 100 ? "bg-success" : "bg-brand"}`} style={{ width: `${p}%` }} /></div><span className="font-mono text-[11px]">{p}%</span></div>; } },
      { key: "eta", header: "ETA", render: (r) => shortDate(r.eta) },
      { key: "cost", header: "Cost", align: "right", render: (r) => <span className="font-mono">{inr(r.cost)}</span> },
      { key: "pr", header: "Priority", render: (r) => <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ring-1 ring-inset ${r.priority === "High" ? "bg-danger/10 text-danger ring-danger/20" : r.priority === "Medium" ? "bg-warning/10 text-warning-foreground ring-warning/30" : "bg-muted text-muted-foreground ring-border"}`}>{r.priority}</span> },
      { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    ];

    return (
      <ModuleShell title="Production Orders" subtitle="All orders across manufacturers & priorities."
        actions={<Btn variant="brand" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Order</Btn>}>
        <DataTable columns={cols} rows={orders} addLabel="New Order" onAdd={() => setShowModal(true)} />

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-base font-semibold text-foreground">Create Production Order</h3>
                <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Silk Jacquard Saree"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground">Manufacturer</label>
                    <select
                      value={formData.mfr}
                      onChange={(e) => setFormData({ ...formData, mfr: e.target.value })}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      {MANUFACTURERS.map((m) => (
                        <option key={m.id} value={m.name}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground">Quantity (m)</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.qty}
                      onChange={(e) => setFormData({ ...formData, qty: Number(e.target.value) })}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground">ETA Date</label>
                    <input
                      type="date"
                      value={formData.eta}
                      onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground">Estimated Cost (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <Btn type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Btn>
                  <Btn type="submit" variant="brand">Create Order</Btn>
                </div>
              </form>
            </div>
          </div>
        )}
      </ModuleShell>
    );
  },
});