import { Link, useRouterState } from "@tanstack/react-router";
import { NAV } from "@/lib/erp/nav";
import { COMPANY } from "@/lib/erp/data";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar({
  collapsed,
  mobileOpen,
  onMobileClose,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = (
    <nav className="scroll-thin flex h-full flex-col overflow-y-auto">
      <div className="flex items-center gap-2.5 border-b border-border/70 px-4 py-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground shadow-sm">
          <span className="text-sm font-bold tracking-tight">V</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-tight">{COMPANY.short}</div>
            <div className="truncate text-[11px] text-muted-foreground">{COMPANY.fy}</div>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-5 px-2.5 py-4">
        {NAV.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                {group.label}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onMobileClose}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-foreground/70 transition-colors",
                        "hover:bg-brand-soft hover:text-foreground",
                        active && "bg-brand-soft text-foreground",
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand" />
                      )}
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0 text-muted-foreground",
                          active && "text-brand",
                        )}
                      />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {!collapsed && (
        <div className="m-3 rounded-xl border border-border/60 bg-brand-soft/60 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand">
            Vastra Cloud
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Sync inventory, mills, GST & dispatch across all warehouses in real time.
          </p>
        </div>
      )}
    </nav>
  );

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-border/70 bg-sidebar transition-[width] duration-300 lg:block",
          collapsed ? "w-[76px]" : "w-[260px]",
        )}
      >
        {nav}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-border/70 bg-sidebar lg:hidden"
            >
              <button
                onClick={onMobileClose}
                className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              {nav}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}