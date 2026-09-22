import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { Btn } from "@/components/erp/Actions";
import { COMPANY, USER, EMPLOYEES } from "@/lib/erp/data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Building2, Receipt, Users, ShieldCheck, Lock, Save } from "lucide-react";

const TABS = [
  { key: "company", label: "Company", icon: Building2 },
  { key: "gst", label: "GST", icon: Receipt },
  { key: "users", label: "Users", icon: Users },
  { key: "roles", label: "Roles & Permissions", icon: ShieldCheck },
  { key: "security", label: "Security", icon: Lock },
];

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Vastra ERP" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [tab, setTab] = useState("company");
  return (
    <ModuleShell title="Settings" subtitle="Company, users, roles, GST & preferences.">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
        <aside className="card-elevated overflow-hidden">
          <ul className="p-2">
            {TABS.map(t => (
              <li key={t.key}>
                <button
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition",
                    tab === t.key ? "bg-brand-soft text-foreground" : "text-foreground/70 hover:bg-muted",
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
            <SectionCard title="Company Profile" actions={<Btn variant="brand"><Save className="h-4 w-4" /> Save</Btn>}>
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
            <SectionCard title="GST Configuration" actions={<Btn variant="brand"><Save className="h-4 w-4" /> Save</Btn>}>
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
                  <tr><th className="px-4 py-2 text-left">Name</th><th className="px-4 py-2 text-left">Role</th><th className="px-4 py-2 text-left">Department</th><th className="px-4 py-2 text-left">Access</th></tr>
                </thead>
                <tbody>
                  {EMPLOYEES.slice(0, 6).map(e => (
                    <tr key={e.id} className="border-t border-border/60">
                      <td className="px-4 py-2.5 font-medium">{e.name}</td>
                      <td className="px-4 py-2.5">{e.role}</td>
                      <td className="px-4 py-2.5">{e.dept}</td>
                      <td className="px-4 py-2.5"><span className="rounded-md bg-brand/10 px-2 py-0.5 text-[11px] text-brand">Full</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          )}
          {tab === "roles" && (
            <SectionCard title="Roles & Permissions">
              <div className="space-y-3 text-[13px]">
                {["Admin", "Sales", "Production", "Finance", "Warehouse", "QC"].map(r => (
                  <div key={r} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                    <div><div className="font-semibold">{r}</div><div className="text-[11px] text-muted-foreground">Custom permission set</div></div>
                    <Btn variant="outline">Edit</Btn>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {tab === "security" && (
            <SectionCard title="Security">
              <ul className="space-y-2 text-[13px]">
                <li className="flex items-center justify-between rounded-lg border border-border/60 p-3"><span>Two-factor authentication</span><span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] text-success">Enabled</span></li>
                <li className="flex items-center justify-between rounded-lg border border-border/60 p-3"><span>Session timeout</span><span>30 min</span></li>
                <li className="flex items-center justify-between rounded-lg border border-border/60 p-3"><span>IP allowlist</span><span>3 addresses</span></li>
              </ul>
              <div className="mt-3 text-[11px] text-muted-foreground">Signed in as {USER.name} · {USER.email}</div>
            </SectionCard>
          )}
        </div>
      </div>
    </ModuleShell>
  );
}

function Input({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <input defaultValue={value} className="h-9 w-full rounded-md border border-border bg-surface px-3 text-[13px] focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15" />
    </div>
  );
}