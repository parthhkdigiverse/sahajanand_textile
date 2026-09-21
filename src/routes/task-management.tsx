import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { TASKS } from "@/lib/erp/data";
import { Plus, ListTodo, Clock, CheckCircle2, ShieldCheck, Paperclip, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/task-management")({
  head: () => ({ meta: [{ title: "Task Management — Vastra ERP" }] }),
  component: TaskPage,
});

const COLUMNS = [
  { key: "todo", label: "To Do", tone: "bg-muted text-foreground/70" },
  { key: "running", label: "Running", tone: "bg-info/10 text-info" },
  { key: "approval", label: "Pending Approval", tone: "bg-warning/15 text-warning-foreground" },
  { key: "done", label: "Completed", tone: "bg-success/10 text-success" },
];

function TaskPage() {
  return (
    <ModuleShell title="Task Management" subtitle="Kanban board across production, finance & operations."
      actions={<Btn variant="brand"><Plus className="h-4 w-4" /> New Task</Btn>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Open Tasks" value={TASKS.filter(t => t.column !== "done").length} icon={ListTodo} tone="brand" />
        <StatCard label="Running" value={TASKS.filter(t => t.column === "running").length} icon={Clock} tone="info" />
        <StatCard label="Awaiting Approval" value={TASKS.filter(t => t.column === "approval").length} icon={ShieldCheck} tone="warning" />
        <StatCard label="Done (Today)" value={TASKS.filter(t => t.column === "done").length} icon={CheckCircle2} tone="success" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const rows = TASKS.filter((t) => t.column === col.key);
          return (
            <div key={col.key} className="rounded-xl border border-border/70 bg-muted/30 p-2.5">
              <div className="mb-2 flex items-center justify-between px-1.5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${col.tone}`}>{col.label}</span>
                  <span className="text-[11px] text-muted-foreground">{rows.length}</span>
                </div>
                <button className="rounded-md p-1 text-muted-foreground hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <div className="space-y-2">
                {rows.map((t, i) => (
                  <motion.article
                    key={t.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-lg border border-border bg-surface p-3 shadow-sm hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${t.priority === "High" ? "bg-danger/10 text-danger" : t.priority === "Medium" ? "bg-warning/10 text-warning-foreground" : "bg-info/10 text-info"}`}>{t.priority}</span>
                      <span className="font-mono text-[10.5px] text-muted-foreground">{t.id}</span>
                    </div>
                    <div className="text-[13px] font-medium leading-snug">{t.title}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="grid h-6 w-6 place-items-center rounded-full bg-brand/10 text-[10px] font-semibold text-brand">
                          {t.assignee.split(" ").slice(0, 2).map(w => w[0]).join("")}
                        </div>
                        <span>{t.assignee.split(" ")[0]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-0.5"><Paperclip className="h-3 w-3" /> 2</span>
                        <span className="inline-flex items-center gap-0.5"><MessageSquare className="h-3 w-3" /> 4</span>
                        <span>{t.due.slice(5)}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ModuleShell>
  );
}