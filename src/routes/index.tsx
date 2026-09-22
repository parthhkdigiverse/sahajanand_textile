import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  IndianRupee,
  ClipboardList,
  Truck,
  Factory,
  AlertTriangle,
  Package,
  ArrowUpRight,
  ChevronRight,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { StatCard } from "@/components/erp/StatCard";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { Btn } from "@/components/erp/Actions";
import {
  CHALLANS,
  DISPATCH_STAGES,
  KPIS,
  MFR_PERFORMANCE,
  NOTIFICATIONS,
  PAYMENTS,
  PRODUCTION_ORDERS,
  REVENUE_TREND,
  TOP_PRODUCTS,
  UPCOMING_DELIVERIES,
  MILLS,
  PRODUCTS,
  TASKS,
} from "@/lib/erp/data";
import { inr, inrCompact, num } from "@/lib/erp/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Center — Vastra ERP" },
      {
        name: "description",
        content:
          "Live operations dashboard for revenue, orders, mill jobs, dispatch and stock across your Less-Patta business.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const lowStock = PRODUCTS.filter((p) => p.stock < p.min);
  return (
    <ModuleShell
      title="Command Center"
      subtitle="Live view of production, mills, dispatch and receivables."
      actions={
        <>
          <Btn variant="outline">
            <Clock className="h-4 w-4" /> This month
          </Btn>
          <Btn variant="brand">
            <TrendingUp className="h-4 w-4" /> Business Snapshot
          </Btn>
        </>
      }
    >
      {/* KPI band */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue (MTD)"
          value={inrCompact(KPIS.revenueMTD)}
          hint={`${inrCompact(KPIS.revenueYTD)} YTD`}
          icon={IndianRupee}
          delta={12.4}
          tone="brand"
        />
        <StatCard
          label="Pending Orders"
          value={KPIS.pendingOrders}
          hint="8 due this week"
          icon={ClipboardList}
          delta={-4.2}
          tone="info"
        />
        <StatCard
          label="Running Mill Jobs"
          value={KPIS.runningMillJobs}
          hint="Across 5 mills"
          icon={Factory}
          delta={5.6}
          tone="warning"
        />
        <StatCard
          label="Today's Dispatch"
          value={KPIS.todaysDispatch}
          hint={`${num(KPIS.lowStockItems)} low-stock alerts`}
          icon={Truck}
          delta={9.1}
          tone="success"
        />
      </div>

      {/* Row: Sales trend + Manufacturing progress + Alerts */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          className="xl:col-span-2"
          title="Monthly Sales vs Purchase"
          subtitle={`${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })} · FY 2025-26`}
          actions={
            <div className="hidden gap-4 text-[11px] text-muted-foreground md:flex">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-brand" /> Sales
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-secondary" /> Purchase
              </span>
            </div>
          }
        >
          <div className="h-[260px] w-full">
            <ResponsiveContainer>
              <AreaChart data={REVENUE_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis
                  tickFormatter={(v: number) => `${(v / 10_000_000).toFixed(1)}Cr`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  formatter={(v: any) => inrCompact(v as number)}
                  contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }}
                />
                <Area type="monotone" dataKey="sales" stroke="var(--brand)" strokeWidth={2} fill="url(#gSales)" />
                <Area type="monotone" dataKey="purchase" stroke="var(--secondary)" strokeWidth={2} fill="url(#gPur)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Live Alerts" subtitle="Requires attention">
          <ul className="space-y-3">
            {NOTIFICATIONS.slice(0, 5).map((n) => (
              <li key={n.id} className="flex gap-2.5">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    n.type === "success"
                      ? "bg-success"
                      : n.type === "warning"
                        ? "bg-warning"
                        : n.type === "danger"
                          ? "bg-danger"
                          : "bg-info"
                  }`}
                />
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium">{n.title}</div>
                  <div className="line-clamp-2 text-[12px] text-muted-foreground">{n.desc}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground/70">{n.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Production, Mills, Live pricing */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          title="Production Progress"
          subtitle={`${PRODUCTION_ORDERS.length} active orders`}
          actions={
            <Link to="/production-orders" className="text-[12px] font-medium text-brand hover:underline">
              View all
            </Link>
          }
        >
          <ul className="space-y-3.5">
            {PRODUCTION_ORDERS.slice(0, 5).map((o) => {
              const pct = Math.round((o.done / o.qty) * 100);
              return (
                <li key={o.id}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{o.product}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {o.id} · {o.mfr}
                      </div>
                    </div>
                    <div className="ml-3 text-right">
                      <div className="font-mono text-[12px] font-medium">{pct}%</div>
                      <div className="text-[11px] text-muted-foreground">
                        {num(o.done)} / {num(o.qty)} m
                      </div>
                    </div>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${
                        o.status === "delayed" ? "bg-danger" : pct === 100 ? "bg-success" : "bg-brand"
                      }`}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard
          title="Running Mill Jobs"
          subtitle="Dyeing · Printing · Finishing"
          actions={
            <Link to="/mills" className="text-[12px] font-medium text-brand hover:underline">
              Mill dashboard
            </Link>
          }
        >
          <ul className="space-y-3">
            {MILLS.slice(0, 4).map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium">{m.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {m.process} · Lot {m.lot}
                  </div>
                </div>
                <div className="ml-3 text-right">
                  <div className="text-[12px] font-mono font-medium">
                    {num(m.fabricReceived)}/{num(m.fabricSent)} m
                  </div>
                  <StatusBadge status={m.status} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>


      </div>

      {/* Row: Top products bar chart + Manufacturer performance + Task timeline */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Top Selling Products" subtitle="Revenue contribution — last 90 days">
          <div className="h-[240px]">
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={TOP_PRODUCTS}
                margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${(v / 100000).toFixed(0)}L`}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={140}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(v: any) => inrCompact(v as number)}
                  contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }}
                />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
                  {TOP_PRODUCTS.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "var(--brand)" : "var(--secondary)"} fillOpacity={i === 0 ? 1 : 0.75 - i * 0.1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Manufacturer Performance" subtitle="Quality · Delivery · Cost">
          <ul className="space-y-3">
            {MFR_PERFORMANCE.map((m) => (
              <li key={m.name}>
                <div className="mb-1 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium">{m.name}</span>
                  <span className="font-mono text-muted-foreground">
                    Q {m.quality} · D {m.delivery} · C {m.cost}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${m.quality}%` }} />
                  </div>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-secondary" style={{ width: `${m.delivery}%` }} />
                  </div>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${m.cost}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Task Timeline" subtitle="Today · High priority first">
          <ul className="relative space-y-3.5 border-l border-border/70 pl-4">
            {TASKS.filter((t) => t.column !== "done")
              .slice(0, 6)
              .map((t) => (
                <li key={t.id} className="relative">
                  <span
                    className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-background ${
                      t.priority === "High" ? "bg-danger" : t.priority === "Medium" ? "bg-warning" : "bg-info"
                    }`}
                  />
                  <div className="text-[13px] font-medium">{t.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {t.assignee} · Due {t.due}
                  </div>
                </li>
              ))}
          </ul>
        </SectionCard>
      </div>

      {/* Row: Recent challans + Recent payments + Upcoming deliveries + Low stock */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          className="xl:col-span-2"
          title="Pending Challans"
          subtitle="Awaiting dispatch or in transit"
          actions={
            <Link to="/delivery-challan" className="text-[12px] font-medium text-brand hover:underline">
              View all
            </Link>
          }
          padded={false}
        >
          <table className="w-full text-[12.5px]">
            <thead className="bg-muted/40 text-[10.5px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Challan</th>
                <th className="px-4 py-2 text-left font-semibold">Customer</th>
                <th className="px-4 py-2 text-left font-semibold">Transport</th>
                <th className="px-4 py-2 text-right font-semibold">Qty</th>
                <th className="px-4 py-2 text-right font-semibold">Amount</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {CHALLANS.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-mono text-[12px] text-brand">{c.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="font-medium">{c.customer}</div>
                    <div className="text-[11px] text-muted-foreground">{c.city}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div>{c.transport}</div>
                    <div className="text-[11px] font-mono text-muted-foreground">{c.vehicle}</div>
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono">{num(c.qty)} m</td>
                  <td className="px-4 py-2.5 text-right font-mono">{inr(c.amount)}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Recent Payments" subtitle="Received & Paid" padded={false}>
          <ul>
            {PAYMENTS.slice(0, 6).map((p) => (
              <li key={p.id} className="flex items-center gap-3 border-t border-border/60 px-4 py-2.5 first:border-0">
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    p.type === "Received" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"
                  }`}
                >
                  {p.type === "Received" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <IndianRupee className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{p.party}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {p.type} · {p.mode} · {p.date}
                  </div>
                </div>
                <div
                  className={`ml-2 font-mono text-[13px] font-semibold ${
                    p.type === "Received" ? "text-success" : "text-foreground"
                  }`}
                >
                  {inr(p.amount)}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Today's Deliveries" subtitle="Scheduled dispatch">
          <ul className="space-y-3">
            {UPCOMING_DELIVERIES.map((d) => (
              <li
                key={d.id}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-surface p-3"
              >
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary/10 text-secondary">
                  <Truck className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{d.customer}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {d.city} · {d.eta}
                  </div>
                </div>
                <span className="font-mono text-[11px] text-brand">{d.id}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Low Stock Alert" subtitle={`${lowStock.length} items below reorder`}>
          <ul className="space-y-2.5">
            {lowStock.slice(0, 5).map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-danger/20 bg-danger/5 p-3"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-danger" />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium">{p.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {p.code} · Min {num(p.min)} {p.unit}
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[13px] font-semibold text-danger">
                  {num(p.stock)}
                </div>
              </li>
            ))}
            {lowStock.length === 0 && (
              <li className="text-[13px] text-muted-foreground">All items above reorder level.</li>
            )}
          </ul>
        </SectionCard>

        <SectionCard title="Dispatch Pipeline Snapshot" subtitle="Live stage counts">
          <div className="grid grid-cols-3 gap-2">
            {DISPATCH_STAGES.slice(0, 9).map((s) => (
              <div
                key={s.key}
                className="rounded-lg border border-border/60 bg-muted/30 p-2.5 text-center"
              >
                <div className="text-[18px] font-semibold tracking-tight text-brand">{s.count}</div>
                <div className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/delivery-challan"
            className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-brand hover:underline"
          >
            View delivery challans <ChevronRight className="h-3 w-3" />
          </Link>
        </SectionCard>
      </div>
    </ModuleShell>
  );
}
