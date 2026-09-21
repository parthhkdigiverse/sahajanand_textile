import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Btn({
  children,
  variant = "outline",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "brand" | "outline" | "ghost" | "danger";
  children: ReactNode;
}) {
  const styles: Record<string, string> = {
    brand: "bg-brand text-brand-foreground hover:brightness-110 shadow-sm",
    outline: "border border-border bg-surface text-foreground/80 hover:bg-muted",
    ghost: "text-foreground/80 hover:bg-muted",
    danger: "bg-danger text-danger-foreground hover:brightness-110",
  };
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}