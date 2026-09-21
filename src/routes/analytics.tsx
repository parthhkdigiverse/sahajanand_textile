import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { REVENUE_TREND, MFR_PERFORMANCE, TOP_PRODUCTS, KPIS, PRICE_HISTORY, DISPATCH_STAGES } from "@/lib/erp/data";
import { inrCompact } from "@/lib/erp/format";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Radar, RadarChart, PolarAngleAxis, PolarGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, Users, Factory, Boxes } from "lucide-react";

const PIE = [
  { name: "Less", value: 42 }, { name: "Patta", value: 38 }, { name: "Border", value: 20 },
];
const COLORS = ["var(--brand)", "var(--secondary)", "var(--accent)"];

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Vastra ERP" }] }),
  component: () => (
    <ModuleShell title="Analytics" subtitle="Growth, performance & operational intelligence.">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Revenue YTD" value={inrCompact(KPIS.revenueYTD)} icon={TrendingUp} tone="brand" delta={14.2} />
        <StatCard label="Customer Growth" value="+18%" icon={Users} tone="success" delta={4.1} />
        <StatCard label="Manufacturer OTIF" value="94%" icon={Factory} tone="info" delta={1.6} />
        <StatCard label="Inventory Turns" value="6.4x" icon={Boxes} tone="warning" delta={0.8} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Revenue & Growth" subtitle="Monthly trend · FY 2025-26">
          <div className="h-[280px]">
            <ResponsiveContainer>
              <AreaChart data={REVENUE_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickFormatter={(v: number) => `${(v/1e7).toFixed(1)}Cr`} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip formatter={(v: any) => inrCompact(v as number)} contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="sales" stroke="var(--brand)" strokeWidth={2} fill="url(#a1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Category Mix" subtitle="Revenue share by category">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={PIE} innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                  {PIE.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-[12px]">
            {PIE.map((p, i) => (
              <li key={p.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-sm" style={{ background: COLORS[i] }} />{p.name}</span>
                <span className="font-mono font-medium">{p.value}%</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Manufacturer Performance" subtitle="Quality · Delivery · Cost">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <RadarChart data={MFR_PERFORMANCE}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Radar name="Quality" dataKey="quality" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.35} />
                <Radar name="Delivery" dataKey="delivery" stroke="var(--secondary)" fill="var(--secondary)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Top Products" subtitle="By revenue">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={TOP_PRODUCTS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tickFormatter={(v: number) => `${(v/1e5).toFixed(0)}L`} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v: any) => inrCompact(v as number)} contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} fill="var(--brand)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Pipeline Heatmap" subtitle="Order load by stage">
          <div className="grid grid-cols-3 gap-1.5">
            {DISPATCH_STAGES.map((s) => {
              const intensity = Math.min(1, s.count / 30);
              return (
                <div key={s.key} className="rounded-md p-2 text-center text-[10.5px]" style={{ background: `color-mix(in oklab, var(--brand) ${intensity * 55}%, transparent)` }}>
                  <div className="font-mono text-[13px] font-semibold" style={{ color: intensity > 0.5 ? "white" : "var(--foreground)" }}>{s.count}</div>
                  <div className="mt-0.5 leading-tight" style={{ color: intensity > 0.5 ? "rgba(255,255,255,.85)" : "var(--muted-foreground)" }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="mt-4">
        <SectionCard title="Material Cost Movement" subtitle="Polyester Yarn 150D · 10 days">
          <div className="h-[220px]">
            <ResponsiveContainer>
              <AreaChart data={PRICE_HISTORY} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="price" stroke="var(--secondary)" strokeWidth={2} fill="url(#a2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </ModuleShell>
  ),
});