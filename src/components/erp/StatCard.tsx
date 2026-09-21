import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function StatCard({
  label,
  value,
  hint,
  delta,
  icon: Icon,
  tone = "brand",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  delta?: number;
  icon?: LucideIcon;
  tone?: "brand" | "info" | "success" | "warning" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand/10 text-brand",
    info: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    danger: "bg-danger/10 text-danger",
  };
  const up = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("card-elevated relative overflow-hidden p-4", className)}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 truncate text-[22px] font-semibold tracking-tight text-foreground">
            {value}
          </div>
          {hint && <div className="mt-0.5 truncate text-[12px] text-muted-foreground">{hint}</div>}
        </div>
        {Icon && (
          <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", tones[tone])}>
            <Icon className="h-[18px] w-[18px]" />
          </div>
        )}
      </div>
      {typeof delta === "number" && (
        <div className="mt-3 flex items-center gap-1 text-[12px]">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium ring-1 ring-inset",
              up ? "bg-success/10 text-success ring-success/20" : "bg-danger/10 text-danger ring-danger/20",
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}