import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { LIVE_PRICING, PRICE_HISTORY } from "@/lib/erp/data";
import { inr } from "@/lib/erp/format";
import { Plus, LineChart as LI, TrendingUp, TrendingDown, RefreshCw, CheckCircle2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/live-pricing")({
  head: () => ({ meta: [{ title: "Live Material Pricing — Vastra ERP" }] }),
  component: LivePricingPage,
});

function LivePricingPage() {
  return (
    <ModuleShell title="Live Material Pricing" subtitle="Real-time raw material rates across manufacturers."
      actions={<>
        <Btn variant="outline"><RefreshCw className="h-4 w-4" /> Sync Prices</Btn>
        <Btn variant="brand"><Plus className="h-4 w-4" /> Add Rate</Btn>
      </>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Tracked Materials" value={LIVE_PRICING.length} icon={LI} tone="brand" />
        <StatCard label="Rising Today" value={LIVE_PRICING.filter(p => p.diff > 0).length} icon={TrendingUp} tone="danger" />
        <StatCard label="Falling Today" value={LIVE_PRICING.filter(p => p.diff < 0).length} icon={TrendingDown} tone="success" />
        <StatCard label="Approved Updates" value={"96%"} icon={CheckCircle2} tone="info" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Price Comparison" subtitle="Today vs Yesterday · By manufacturer" padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Material</th>
                <th className="px-4 py-2 text-left font-semibold">Manufacturer</th>
                <th className="px-4 py-2 text-right font-semibold">Yesterday</th>
                <th className="px-4 py-2 text-right font-semibold">Today</th>
                <th className="px-4 py-2 text-right font-semibold">Change</th>
                <th className="px-4 py-2 text-left font-semibold">Updated</th>
                <th className="px-4 py-2 text-center font-semibold">Approve</th>
              </tr>
            </thead>
            <tbody>
              {LIVE_PRICING.map((p, i) => (
                <tr key={i} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-medium">{p.material}</td>
                  <td className="px-4 py-2.5">{p.mfr}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-muted-foreground">{inr(p.yesterday)}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold">{inr(p.today)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${p.diff >= 0 ? "bg-danger/10 text-danger" : "bg-success/10 text-success"}`}>
                      {p.diff >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {inr(Math.abs(p.diff))}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[12px] text-muted-foreground">{p.updated}</td>
                  <td className="px-4 py-2.5 text-center">
                    <button className="rounded-md bg-success/10 px-2 py-1 text-[11px] font-medium text-success hover:bg-success/20">Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Polyester Yarn 150D · Price Trend" subtitle="10-day movement · Ganesh Yarn Traders">
          <div className="h-[220px]">
            <ResponsiveContainer>
              <AreaChart data={PRICE_HISTORY} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis domain={["dataMin - 2", "dataMax + 2"]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="price" stroke="var(--brand)" strokeWidth={2} fill="url(#gPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11.5px]">
            <div className="rounded-md bg-muted/40 p-2"><div className="text-muted-foreground">10-day Avg</div><div className="font-mono font-semibold">₹144.4</div></div>
            <div className="rounded-md bg-muted/40 p-2"><div className="text-muted-foreground">High</div><div className="font-mono font-semibold text-danger">₹148</div></div>
            <div className="rounded-md bg-muted/40 p-2"><div className="text-muted-foreground">Low</div><div className="font-mono font-semibold text-success">₹141</div></div>
          </div>
        </SectionCard>
      </div>
    </ModuleShell>
  );
}