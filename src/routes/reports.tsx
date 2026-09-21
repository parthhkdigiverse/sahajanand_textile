import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { BarChart3, TrendingUp, ShoppingCart, Wrench, Factory, Truck, Boxes, Receipt, IndianRupee, TrendingDown, BookUser, LineChart, ListTodo } from "lucide-react";

const REPORTS = [
  { title: "Sales Report", desc: "Customer & product-wise sales", icon: TrendingUp, tone: "brand", updated: "3h ago" },
  { title: "Purchase Report", desc: "Supplier POs & GRN", icon: ShoppingCart, tone: "info", updated: "4h ago" },
  { title: "Manufacturing Report", desc: "Production efficiency", icon: Wrench, tone: "warning", updated: "1h ago" },
  { title: "Mill Report", desc: "Dyeing & printing performance", icon: Factory, tone: "info", updated: "2h ago" },
  { title: "Delivery Report", desc: "Challan & dispatch summary", icon: Truck, tone: "success", updated: "1h ago" },
  { title: "Inventory Report", desc: "Stock aging & valuation", icon: Boxes, tone: "brand", updated: "6h ago" },
  { title: "GST Report", desc: "GSTR-1 & GSTR-3B ready", icon: Receipt, tone: "danger", updated: "Yesterday" },
  { title: "Profit & Loss", desc: "Monthly P&L statement", icon: IndianRupee, tone: "success", updated: "Yesterday" },
  { title: "Loss Analysis", desc: "Waste, rejects & rework", icon: TrendingDown, tone: "danger", updated: "3h ago" },
  { title: "Customer Ledger", desc: "Outstanding & aging", icon: BookUser, tone: "brand", updated: "1h ago" },
  { title: "Supplier Ledger", desc: "Payables tracking", icon: BookUser, tone: "warning", updated: "2h ago" },
  { title: "Manufacturer Ledger", desc: "Job-work payables", icon: Factory, tone: "info", updated: "2h ago" },
  { title: "Live Pricing Trend", desc: "Material cost movement", icon: LineChart, tone: "brand", updated: "45m ago" },
  { title: "Task Report", desc: "Team completion metrics", icon: ListTodo, tone: "success", updated: "30m ago" },
];

const TONE: Record<string, string> = {
  brand: "bg-brand/10 text-brand", info: "bg-info/10 text-info", success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground", danger: "bg-danger/10 text-danger",
};

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — Vastra ERP" }] }),
  component: () => (
    <ModuleShell title="Reports" subtitle="Downloadable reports for every module.">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((r) => (
          <SectionCard key={r.title}>
            <div className="flex items-start gap-3">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${TONE[r.tone]}`}>
                <r.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{r.title}</div>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-[12px] text-muted-foreground">{r.desc}</div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Updated {r.updated}</span>
                  <Link to="/analytics" className="font-medium text-brand hover:underline">Generate →</Link>
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </ModuleShell>
  ),
});