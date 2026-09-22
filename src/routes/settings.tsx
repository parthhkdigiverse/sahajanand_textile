import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { Btn } from "@/components/erp/Actions";
import { COMPANY, USER, EMPLOYEES } from "@/lib/erp/data";
import { cn } from "@/lib/utils";
import { Building2, Receipt, Users, ShieldCheck, Lock, Save, X, Check } from "lucide-react";
import { toast } from "sonner";

const TABS = [
  { key: "company", label: "Company", icon: Building2 },
  { key: "gst", label: "GST", icon: Receipt },
  { key: "users", label: "Users", icon: Users },
  { key: "roles", label: "Roles & Permissions", icon: ShieldCheck },
  { key: "security", label: "Security", icon: Lock },
];

type PermissionCategory = {
  category: string;
  items: { id: string; label: string; desc: string }[];
};

const PERMISSION_CONFIG: PermissionCategory[] = [
  {
    category: "Sales & Invoicing",
    items: [
      { id: "sales_view", label: "View Sales & Orders", desc: "Access sales dashboard and customer orders" },
      { id: "inv_gst", label: "Create GST Invoices", desc: "Generate B2B GST-compliant tax invoices" },
      { id: "inv_nongst", label: "Create Non-GST Bills", desc: "Issue cash memos and estimates" },
      { id: "customers_edit", label: "Manage Customers", desc: "Add, edit, or remove customer profiles" },
    ],
  },
  {
    category: "Inventory & Stock",
    items: [
      { id: "stock_view", label: "View Stock Levels", desc: "Access Less, Patta, and Color inventory" },
      { id: "stock_transfer", label: "Manage Stock Transfers", desc: "Transfer goods between warehouses" },
      { id: "raw_material", label: "Raw Material Control", desc: "Manage yarn, dyes, and raw stocks" },
    ],
  },
  {
    category: "Production & Workflow",
    items: [
      { id: "prod_orders", label: "Manage Production Orders", desc: "Create and update production jobs" },
      { id: "qc_check", label: "Quality Checks", desc: "Perform QC pass/reject inspections" },
      { id: "packing", label: "Packing & Bundling", desc: "Manage roll bundling and handoffs" },
    ],
  },
  {
    category: "Finance & Accounting",
    items: [
      { id: "pmt_view", label: "View Payments", desc: "Access payment records and ledger" },
      { id: "pmt_collect", label: "Record Payments", desc: "Collect payments and mark invoices paid" },
    ],
  },
];

const INITIAL_ROLES: Record<string, { desc: string; permissions: string[] }> = {
  Admin: {
    desc: "Full system administration and unrestricted access",
    permissions: [
      "sales_view",
      "inv_gst",
      "inv_nongst",
      "customers_edit",
      "stock_view",
      "stock_transfer",
      "raw_material",
      "prod_orders",
      "qc_check",
      "packing",
      "pmt_view",
      "pmt_collect",
    ],
  },
  Sales: {
    desc: "Customer management, quotations, GST & Non-GST billing",
    permissions: ["sales_view", "inv_gst", "inv_nongst", "customers_edit", "stock_view", "pmt_view"],
  },
  Production: {
    desc: "Production order creation, QC checks, and packing",
    permissions: ["stock_view", "prod_orders", "qc_check", "packing"],
  },
  Finance: {
    desc: "Invoicing, payment collection, and accounting ledgers",
    permissions: ["sales_view", "inv_gst", "inv_nongst", "pmt_view", "pmt_collect"],
  },
  Warehouse: {
    desc: "Inventory management, raw materials, and stock transfers",
    permissions: ["stock_view", "stock_transfer", "raw_material", "packing"],
  },
  QC: {
    desc: "Quality inspection and pass/fail tagging",
    permissions: ["stock_view", "qc_check"],
  },
};

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Vastra ERP" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [tab, setTab] = useState("company");
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [tempPermissions, setTempPermissions] = useState<string[]>([]);

  const handleOpenEdit = (roleName: string) => {
    setEditingRole(roleName);
    setTempPermissions([...roles[roleName].permissions]);
  };

  const handleTogglePermission = (id: string) => {
    setTempPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSavePermissions = () => {
    if (!editingRole) return;
    setRoles((prev) => ({
      ...prev,
      [editingRole]: {
        ...prev[editingRole],
        permissions: tempPermissions,
      },
    }));
    toast.success(`Permissions for ${editingRole} role updated successfully!`);
    setEditingRole(null);
  };

  return (
    <ModuleShell title="Settings" subtitle="Company, users, roles, GST & preferences.">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
        <aside className="card-elevated overflow-hidden">
          <ul className="p-2">
            {TABS.map((t) => (
              <li key={t.key}>
                <button
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition",
                    tab === t.key ? "bg-brand-soft text-foreground" : "text-foreground/70 hover:bg-muted"
                  )}
                >
                  <t.icon className={cn("h-4 w-4", tab === t.key ? "text-brand" : "text-muted-foreground")} />
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-4">
          {tab === "company" && (
            <SectionCard title="Company Profile" actions={<Btn variant="brand" onClick={() => toast.success("Company profile saved!")}><Save className="h-4 w-4" /> Save</Btn>}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Legal Name" value={COMPANY.name} />
                <Input label="Display Name" value={COMPANY.short} />
                <Input label="Phone" value={COMPANY.phone} />
                <Input label="Email" value={COMPANY.email} />
                <Input label="Registered Address" value={COMPANY.address} className="md:col-span-2" />
                <Input label="Financial Year" value={COMPANY.fy} />
                <Input label="Currency" value="INR (₹)" />
              </div>
            </SectionCard>
          )}
          {tab === "gst" && (
            <SectionCard title="GST Configuration" actions={<Btn variant="brand" onClick={() => toast.success("GST configuration saved!")}><Save className="h-4 w-4" /> Save</Btn>}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="GSTIN" value={COMPANY.gstin} />
                <Input label="Place of Supply (State)" value="Gujarat (24)" />
                <Input label="Composition Scheme" value="No" />
                <Input label="E-Invoice IRN" value="Enabled" />
                <Input label="Default HSN — Less" value="5808" />
                <Input label="Default HSN — Patta" value="5407" />
              </div>
            </SectionCard>
          )}
          {tab === "users" && (
            <SectionCard title="Users">
              <table className="w-full text-[13px]">
                <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Department</th>
                    <th className="px-4 py-2 text-left">Access</th>
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES.slice(0, 6).map((e) => (
                    <tr key={e.id} className="border-t border-border/60">
                      <td className="px-4 py-2.5 font-medium">{e.name}</td>
                      <td className="px-4 py-2.5">{e.role}</td>
                      <td className="px-4 py-2.5">{e.dept}</td>
                      <td className="px-4 py-2.5">
                        <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[11px] text-brand">Full</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          )}
          {tab === "roles" && (
            <SectionCard title="Roles & Permissions">
              <div className="space-y-3 text-[13px]">
                {Object.entries(roles).map(([roleName, roleData]) => (
                  <div key={roleName} className="flex items-center justify-between rounded-lg border border-border/60 p-3 hover:border-brand/40 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
                        {roleName}
                        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-mono text-brand">
                          {roleData.permissions.length} permissions
                        </span>
                      </div>
                      <div className="text-[11.5px] text-muted-foreground">{roleData.desc}</div>
                    </div>
                    <Btn variant="outline" onClick={() => handleOpenEdit(roleName)}>
                      Edit
                    </Btn>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {tab === "security" && (
            <SectionCard title="Security">
              <ul className="space-y-2 text-[13px]">
                <li className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                  <span>Two-factor authentication</span>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] text-success">Enabled</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                  <span>Session timeout</span>
                  <span>30 min</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                  <span>IP allowlist</span>
                  <span>3 addresses</span>
                </li>
              </ul>
              <div className="mt-3 text-[11px] text-muted-foreground">Signed in as {USER.name} · {USER.email}</div>
            </SectionCard>
          )}
        </div>
      </div>

      {/* Interactive Role Permissions Modal */}
      {editingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-muted/30">
              <div>
                <h3 className="text-base font-bold text-foreground">Edit Role: {editingRole}</h3>
                <p className="text-[12px] text-muted-foreground">{roles[editingRole]?.desc}</p>
              </div>
              <button
                onClick={() => setEditingRole(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-5 space-y-5">
              {PERMISSION_CONFIG.map((cat) => (
                <div key={cat.category} className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {cat.category}
                  </div>
                  <div className="space-y-1.5">
                    {cat.items.map((perm) => {
                      const isChecked = tempPermissions.includes(perm.id);
                      return (
                        <label
                          key={perm.id}
                          onClick={() => handleTogglePermission(perm.id)}
                          className={cn(
                            "flex items-start justify-between rounded-xl border p-3 cursor-pointer transition-all select-none",
                            isChecked
                              ? "border-brand/50 bg-brand/5 shadow-xs"
                              : "border-border/60 hover:bg-muted/50"
                          )}
                        >
                          <div className="pr-3">
                            <div className="text-[13px] font-semibold text-foreground">{perm.label}</div>
                            <div className="text-[11.5px] text-muted-foreground">{perm.desc}</div>
                          </div>
                          <div
                            className={cn(
                              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all",
                              isChecked
                                ? "border-brand bg-brand text-brand-foreground"
                                : "border-border bg-surface"
                            )}
                          >
                            {isChecked && <Check className="h-3.5 w-3.5" />}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3.5 bg-muted/20">
              <Btn variant="outline" onClick={() => setEditingRole(null)}>
                Cancel
              </Btn>
              <Btn variant="brand" onClick={handleSavePermissions}>
                Save Permissions ({tempPermissions.length})
              </Btn>
            </div>
          </div>
        </div>
      )}
    </ModuleShell>
  );
}

function Input({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <input
        defaultValue={value}
        className="h-9 w-full rounded-md border border-border bg-surface px-3 text-[13px] focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15"
      />
    </div>
  );
}