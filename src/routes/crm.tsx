import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import { CUSTOMERS, NOTIFICATIONS } from "@/lib/erp/data";
import { inrCompact } from "@/lib/erp/format";
import { Plus, BookUser, Phone, MessageSquare, Calendar, TrendingUp } from "lucide-react";

const LEADS = [
  { id: "LEAD-401", name: "Rajmandir Silks", city: "Jaipur", stage: "Qualification", value: 850000, next: "Follow-up call · Tomorrow" },
  { id: "LEAD-402", name: "Meenakshi Textiles", city: "Chennai", stage: "Quotation", value: 1420000, next: "Send sample lot" },
  { id: "LEAD-403", name: "Chandan Fabric", city: "Lucknow", stage: "Negotiation", value: 620000, next: "Price finalisation" },
  { id: "LEAD-404", name: "Aakar Sarees", city: "Pune", stage: "Won", value: 380000, next: "Convert to customer" },
];

export const Route = createFileRoute("/crm")({
  head: () => ({ meta: [{ title: "CRM — Vastra ERP" }] }),
  component: () => (
    <ModuleShell title="CRM" subtitle="Leads, pipeline & customer engagement."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Lead</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Open Leads" value={LEADS.length} icon={BookUser} tone="brand" />
        <StatCard label="Pipeline Value" value={inrCompact(LEADS.reduce((s, l) => s + l.value, 0))} icon={TrendingUp} tone="success" delta={12.2} />
        <StatCard label="Calls Today" value={18} icon={Phone} tone="info" />
        <StatCard label="Meetings" value={4} icon={Calendar} tone="warning" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Sales Pipeline" subtitle="Leads by stage" padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-2 text-left">Lead</th><th className="px-4 py-2 text-left">Stage</th><th className="px-4 py-2 text-right">Value</th><th className="px-4 py-2 text-left">Next Action</th></tr>
            </thead>
            <tbody>
              {LEADS.map(l => (
                <tr key={l.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5"><div className="font-medium">{l.name}</div><div className="text-[11px] text-muted-foreground">{l.id} · {l.city}</div></td>
                  <td className="px-4 py-2.5"><span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand">{l.stage}</span></td>
                  <td className="px-4 py-2.5 text-right font-mono">{inrCompact(l.value)}</td>
                  <td className="px-4 py-2.5 text-[12px] text-muted-foreground">{l.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Recent Customer Activity">
          <ul className="space-y-3 text-[13px]">
            {NOTIFICATIONS.slice(0, 5).map(n => (
              <li key={n.id} className="flex gap-2.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.type === "success" ? "bg-success" : n.type === "danger" ? "bg-danger" : "bg-info"}`} />
                <div>
                  <div className="font-medium">{n.title}</div>
                  <div className="text-[11.5px] text-muted-foreground">{n.desc}</div>
                  <div className="text-[10.5px] text-muted-foreground">{n.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="mt-4">
        <SectionCard title="Top Customers" actions={<Link to="/customers" className="text-[12px] font-medium text-brand hover:underline">All customers</Link>} padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-2 text-left">Customer</th><th className="px-4 py-2 text-left">Contact</th><th className="px-4 py-2 text-right">Credit Limit</th><th className="px-4 py-2 text-right">Outstanding</th><th className="px-4 py-2 text-left">Status</th></tr>
            </thead>
            <tbody>
              {CUSTOMERS.slice(0, 6).map(c => (
                <tr key={c.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5"><Link to="/customers/$id" params={{ id: c.id }} className="font-medium hover:text-brand">{c.name}</Link><div className="text-[11px] text-muted-foreground">{c.city}</div></td>
                  <td className="px-4 py-2.5">{c.contact}<div className="text-[11px] font-mono text-muted-foreground">{c.phone}</div></td>
                  <td className="px-4 py-2.5 text-right font-mono">{inrCompact(c.credit)}</td>
                  <td className={`px-4 py-2.5 text-right font-mono ${c.outstanding > 0 ? "text-danger" : "text-success"}`}>{inrCompact(c.outstanding)}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </ModuleShell>
  ),
});