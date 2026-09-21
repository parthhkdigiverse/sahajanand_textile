import { cn } from "@/lib/utils";
import type { Status } from "@/lib/erp/data";

const MAP: Record<string, { label: string; cls: string }> = {
  active: { label: "Active", cls: "bg-success/10 text-success ring-success/20" },
  pending: { label: "Pending", cls: "bg-warning/10 text-warning-foreground ring-warning/30" },
  processing: { label: "Processing", cls: "bg-info/10 text-info ring-info/20" },
  completed: { label: "Completed", cls: "bg-success/10 text-success ring-success/20" },
  delayed: { label: "Delayed", cls: "bg-danger/10 text-danger ring-danger/20" },
  cancelled: { label: "Cancelled", cls: "bg-muted text-muted-foreground ring-border" },
  approved: { label: "Approved", cls: "bg-success/10 text-success ring-success/20" },
  draft: { label: "Draft", cls: "bg-muted text-muted-foreground ring-border" },
  paid: { label: "Paid", cls: "bg-success/10 text-success ring-success/20" },
  partial: { label: "Partial", cls: "bg-warning/10 text-warning-foreground ring-warning/30" },
  overdue: { label: "Overdue", cls: "bg-danger/10 text-danger ring-danger/20" },
};

export function StatusBadge({ status, className }: { status: Status | string; className?: string }) {
  const item = MAP[status] ?? { label: status, cls: "bg-muted text-muted-foreground ring-border" };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        item.cls,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {item.label}
    </span>
  );
}