import { useState } from "react";
import { createFileRoute, Link, Outlet, useMatch } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { DataTable, type Column } from "@/components/erp/DataTable";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { CUSTOMERS } from "@/lib/erp/data";
import { inr, inrCompact } from "@/lib/erp/format";
import { Download, Plus, Users, IndianRupee, ShieldAlert, TrendingUp, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customers — Vastra ERP" }] }),
  component: CustomersRouteComponent,
});

function CustomersRouteComponent() {
  const matchDetail = useMatch({ from: "/customers/$id", shouldThrow: false });
  if (matchDetail) {
    return <Outlet />;
  }
  return <CustomersPage />;
}

function CustomersPage() {
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "Surat",
    gstin: "",
    contact: "",
    phone: "",
    category: "Wholesaler",
    credit: 500000,
    terms: "30 days",
  });

  const total = customers.length;
  const outstanding = customers.reduce((s, c) => s + c.outstanding, 0);
  const active = customers.filter((c) => c.status === "active").length;
  const overdue = customers.filter((c) => c.status === "delayed").length;

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter customer name");
      return;
    }
    const newCust = {
      id: `CUST-${100 + customers.length + 1}`,
      name: formData.name,
      city: formData.city,
      gstin: formData.gstin || "24AAAAA0000A1Z5",
      contact: formData.contact || formData.name,
      phone: formData.phone || "+91 98765 43210",
      category: formData.category,
      credit: Number(formData.credit),
      outstanding: 0,
      terms: formData.terms,
      status: "active" as const,
    };
    setCustomers([newCust, ...customers]);
    setShowModal(false);
    setFormData({
      name: "",
      city: "Surat",
      gstin: "",
      contact: "",
      phone: "",
      category: "Wholesaler",
      credit: 500000,
      terms: "30 days",
    });
    toast.success(`Customer ${newCust.name} added successfully!`);
  };

  const cols: Column<(typeof customers)[number]>[] = [
    {
      key: "party",
      header: "Customer",
      render: (r) => (
        <Link to="/customers/$id" params={{ id: r.id }} className="group flex items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand/20 to-secondary/20 text-[11px] font-semibold text-brand">
            {r.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium text-foreground group-hover:text-brand">{r.name}</div>
            <div className="truncate text-[11px] text-muted-foreground">{r.id} · {r.city}</div>
          </div>
        </Link>
      ),
    },
    { key: "gstin", header: "GSTIN", render: (r) => <span className="font-mono text-[12px]">{r.gstin}</span> },
    { key: "contact", header: "Contact", render: (r) => (<div><div>{r.contact}</div><div className="text-[11px] text-muted-foreground">{r.phone}</div></div>) },
    { key: "cat", header: "Category", render: (r) => <span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">{r.category}</span> },
    { key: "terms", header: "Terms", render: (r) => r.terms },
    { key: "credit", header: "Credit Limit", align: "right", render: (r) => <span className="font-mono">{inr(r.credit)}</span> },
    { key: "os", header: "Outstanding", align: "right", render: (r) => (<span className={`font-mono font-medium ${r.outstanding > 0 ? "text-danger" : "text-success"}`}>{inr(r.outstanding)}</span>) },
    { key: "st", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <ModuleShell
      title="Customers"
      subtitle="Directory, ledgers, credit limits and outstanding."
      actions={
        <>
          <Btn variant="outline"><Download className="h-4 w-4" /> Export</Btn>
          <Btn variant="brand" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Customer</Btn>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total Customers" value={total} icon={Users} tone="brand" hint={`${active} active`} />
        <StatCard label="Outstanding" value={inrCompact(outstanding)} icon={IndianRupee} tone="warning" delta={6.4} />
        <StatCard label="Overdue Accounts" value={overdue} icon={ShieldAlert} tone="danger" hint="Follow-up required" />
        <StatCard label="MTD Sales" value={inrCompact(8_74_65_000)} icon={TrendingUp} tone="success" delta={12.4} />
      </div>
      <div className="mt-4">
        <DataTable columns={cols} rows={customers} />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-base font-semibold text-foreground">Add New Customer</h3>
              <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Customer / Firm Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhey Shyam Fabrics"
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
                    placeholder="24AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Shah"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98250 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Credit Limit (₹)</label>
                  <input
                    type="number"
                    value={formData.credit}
                    onChange={(e) => setFormData({ ...formData, credit: Number(e.target.value) })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Retailer">Retailer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Boutique">Boutique</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <Btn type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Btn>
                <Btn type="submit" variant="brand">Save Customer</Btn>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleShell>
  );
}