import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { PRODUCTS } from "@/lib/erp/data";
import { inr, num } from "@/lib/erp/format";
import { Plus, Package, LayoutGrid, List, QrCode, Filter, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — Vastra ERP" }] }),
  component: ProductsPage,
});

const CATEGORIES = ["All", "Less", "Patta", "Border"];

function ProductsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [cat, setCat] = useState("All");
  const rows = PRODUCTS.filter((p) => cat === "All" || p.category === cat);

  return (
    <ModuleShell
      title="Product Master"
      subtitle="Less, Patta, Borders & Lace catalog with pricing and stock."
      actions={
        <Btn variant="brand"><Plus className="h-4 w-4" /> New Product</Btn>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="SKUs" value={PRODUCTS.length} icon={Package} tone="brand" />
        <StatCard label="Categories" value={3} tone="info" hint="Less · Patta · Border" />
        <StatCard label="Stock Value" value={inrCompact()} tone="success" />
        <StatCard label="Low Stock" value={PRODUCTS.filter((p) => p.stock < p.min).length} tone="danger" hint="Below reorder" />
      </div>

      <div className="mt-4 card-elevated overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 p-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "h-8 rounded-md px-3 text-[12px] font-medium transition",
                  cat === c ? "bg-brand text-brand-foreground" : "bg-muted text-foreground/70 hover:bg-muted/70",
                )}
              >
                {c}
              </button>
            ))}
            <button className="ml-2 inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12px] font-medium hover:bg-muted">
              <Filter className="h-3.5 w-3.5" /> Advanced
            </button>
          </div>
          <div className="flex items-center rounded-md border border-border bg-muted p-0.5">
            <button
              onClick={() => setView("grid")}
              className={cn("grid h-7 w-7 place-items-center rounded", view === "grid" && "bg-surface shadow-sm")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn("grid h-7 w-7 place-items-center rounded", view === "list" && "bg-surface shadow-sm")}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-3 xl:grid-cols-4">
            {rows.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="group overflow-hidden rounded-xl border border-border bg-surface transition hover:shadow-md"
              >
                <ProductArt hex={p.color} name={p.category} />
                <div className="p-3">
                  <div className="flex items-center justify-between text-[10.5px] text-muted-foreground">
                    <span className="font-mono">{p.code}</span>
                    <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-brand">{p.category}</span>
                  </div>
                  <h3 className="mt-1 line-clamp-1 text-[13.5px] font-semibold">{p.name}</h3>
                  <div className="text-[11.5px] text-muted-foreground">{p.material} · {p.width}</div>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[14px] font-semibold text-brand">{inr(p.rate)}<span className="text-[10px] text-muted-foreground">/{p.unit.toLowerCase()}</span></div>
                      <div className="text-[10.5px] text-muted-foreground">GST {p.gst}% · HSN {p.hsn}</div>
                    </div>
                    <div className={cn("text-right text-[11px]", p.stock < p.min ? "text-danger" : "text-success")}>
                      <div className="font-mono font-semibold">{num(p.stock)}</div>
                      <div className="text-[10px]">in stock</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[900px] text-[13px]">
              <thead className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Product</th>
                  <th className="px-4 py-2 text-left font-semibold">Category</th>
                  <th className="px-4 py-2 text-left font-semibold">Material</th>
                  <th className="px-4 py-2 text-left font-semibold">HSN / GST</th>
                  <th className="px-4 py-2 text-right font-semibold">Stock</th>
                  <th className="px-4 py-2 text-right font-semibold">Rate</th>
                  <th className="px-4 py-2 text-center font-semibold">Barcode</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-border/60 hover:bg-muted/40">
                    <td className="px-4 py-2.5">
                      <div className="font-medium">{p.name}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{p.code}</div>
                    </td>
                    <td className="px-4 py-2.5"><span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] text-brand">{p.category}</span></td>
                    <td className="px-4 py-2.5">{p.material}</td>
                    <td className="px-4 py-2.5"><span className="font-mono text-[11.5px]">{p.hsn}</span> · {p.gst}%</td>
                    <td className={cn("px-4 py-2.5 text-right font-mono", p.stock < p.min ? "text-danger" : "text-success")}>{num(p.stock)}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{inr(p.rate)}</td>
                    <td className="px-4 py-2.5 text-center"><QrCode className="mx-auto h-4 w-4 text-muted-foreground" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ModuleShell>
  );
}

function inrCompact() {
  const total = PRODUCTS.reduce((s, p) => s + p.stock * p.rate, 0);
  if (total >= 10_000_000) return `₹${(total / 10_000_000).toFixed(2)} Cr`;
  return `₹${(total / 100000).toFixed(1)} L`;
}

function ProductArt({ hex, name }: { hex: string; name: string }) {
  // Extract a color hint from color name, fallback gradient
  const palette: Record<string, [string, string]> = {
    "Gold / Maroon": ["#D4A017", "#7A1F2B"],
    Multi: ["#C6155B", "#1E3A8A"],
    "Rani Pink": ["#C6155B", "#7A1F2B"],
    Firozi: ["#16A8B3", "#0F766E"],
    Silver: ["#94A3B8", "#CBD5E1"],
    Ivory: ["#F2ECDD", "#E8DDBE"],
    "Kesar Orange": ["#E9762D", "#C6155B"],
    Maroon: ["#7A1F2B", "#3A0A12"],
  };
  const [a, b] = palette[hex] ?? ["#0F766E", "#2563EB"];
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,.18) 0 2px, transparent 2px 8px)" }} />
      <div className="absolute bottom-2 left-2 rounded-md bg-black/25 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
        {name} preview
      </div>
    </div>
  );
}