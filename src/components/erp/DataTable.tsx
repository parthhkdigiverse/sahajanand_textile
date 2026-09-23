import type { ReactNode } from "react";
import { Search, Filter, Download, Upload, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  align?: "left" | "right" | "center";
  render: (row: T, i: number) => ReactNode;
};

export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  toolbarLeft,
  addLabel = "New",
  onAdd,
  searchable = true,
  showActions = true,
}: {
  columns: Column<T>[];
  rows: T[];
  toolbarLeft?: ReactNode;
  addLabel?: string;
  onAdd?: () => void;
  searchable?: boolean;
  showActions?: boolean;
}) {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search…"
                className="h-8 w-56 rounded-md border border-border bg-surface pl-8 pr-3 text-[13px] focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15"
              />
            </div>
          )}
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12px] font-medium text-foreground/80 hover:bg-muted">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </button>
          {toolbarLeft}
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12px] font-medium text-foreground/80 hover:bg-muted">
            <Upload className="h-3.5 w-3.5" />
            Import
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12px] font-medium text-foreground/80 hover:bg-muted">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>
      <div className="scroll-thin overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-[13px]">
          <thead>
            <tr className="bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "border-b border-border/70 px-4 py-2.5 text-left font-semibold",
                    c.align === "right" && "text-right",
                    c.align === "center" && "text-center",
                    c.className,
                  )}
                >
                  {c.header}
                </th>
              ))}
              {showActions && <th className="w-10 border-b border-border/70 px-2" />}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className="group transition-colors hover:bg-muted/40">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "border-b border-border/60 px-4 py-2.5 align-middle text-foreground",
                      c.align === "right" && "text-right",
                      c.align === "center" && "text-center",
                      c.className,
                    )}
                  >
                    {c.render(row, i)}
                  </td>
                ))}
                {showActions && (
                  <td className="border-b border-border/60 px-2 text-right">
                    <button className="rounded-md p-1.5 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:bg-muted hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border/70 px-4 py-2.5 text-[12px] text-muted-foreground">
        <div>
          Showing <span className="font-medium text-foreground">1–{rows.length}</span> of{" "}
          <span className="font-medium text-foreground">{rows.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="h-7 rounded-md border border-border bg-surface px-2 hover:bg-muted">Prev</button>
          <button className="h-7 rounded-md border border-brand bg-brand px-2.5 text-brand-foreground">1</button>
          <button className="h-7 rounded-md border border-border bg-surface px-2.5 hover:bg-muted">2</button>
          <button className="h-7 rounded-md border border-border bg-surface px-2.5 hover:bg-muted">3</button>
          <button className="h-7 rounded-md border border-border bg-surface px-2 hover:bg-muted">Next</button>
        </div>
      </div>
    </div>
  );
}