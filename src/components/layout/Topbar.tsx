import { Bell, Menu, PanelLeft, Search, Plus, HelpCircle } from "lucide-react";
import { COMPANY, USER, NOTIFICATIONS } from "@/lib/erp/data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function Topbar({
  collapsed,
  onToggle,
  onOpenMobile,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onOpenMobile: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onOpenMobile}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button
          onClick={onToggle}
          className="hidden rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className={cn("h-[18px] w-[18px] transition-transform", collapsed && "rotate-180")} />
        </button>

        <div className="relative hidden max-w-md flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search customers, invoices, challans, products…"
            className="h-9 w-full rounded-lg border border-border/80 bg-surface pl-9 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="mr-2 hidden text-right md:block">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">GSTIN</div>
            <div className="font-mono text-[11px] font-medium text-foreground/80">{COMPANY.gstin}</div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-[13px] font-medium text-brand-foreground shadow-sm transition hover:brightness-110">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Quick create</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New Sales Invoice</DropdownMenuItem>
              <DropdownMenuItem>New Delivery Challan</DropdownMenuItem>
              <DropdownMenuItem>New Production Order</DropdownMenuItem>
              <DropdownMenuItem>Send Fabric to Mill</DropdownMenuItem>
              <DropdownMenuItem>New Purchase Order</DropdownMenuItem>
              <DropdownMenuItem>Add Customer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="hidden rounded-md p-2 text-muted-foreground hover:bg-muted md:inline-flex"
            aria-label="Help"
          >
            <HelpCircle className="h-[18px] w-[18px]" />
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button
                className="relative rounded-md p-2 text-muted-foreground hover:bg-muted"
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[360px] p-0">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="text-sm font-semibold">Notifications</div>
                <button className="text-xs font-medium text-brand hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="scroll-thin max-h-[380px] overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className="flex gap-3 border-b border-border/60 px-4 py-3 last:border-0 hover:bg-muted/60"
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        n.type === "success" && "bg-success",
                        n.type === "warning" && "bg-warning",
                        n.type === "danger" && "bg-danger",
                        n.type === "info" && "bg-info",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium">{n.title}</div>
                      <div className="text-[12px] text-muted-foreground">{n.desc}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground/80">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-muted">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand to-secondary text-xs font-semibold text-brand-foreground">
                  {USER.initials}
                </div>
                <div className="hidden text-left md:block">
                  <div className="text-[12px] font-medium leading-tight">{USER.name}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{USER.role}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-sm">{USER.name}</div>
                <div className="text-[11px] font-normal text-muted-foreground">{USER.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Company Settings</DropdownMenuItem>
              <DropdownMenuItem>Users & Roles</DropdownMenuItem>
              <DropdownMenuItem>Financial Year</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger focus:text-danger">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}