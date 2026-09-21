import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { MILLS } from "@/lib/erp/data";
import { inr, num, shortDate } from "@/lib/erp/format";
import { CheckCircle2, Circle, Camera, Paperclip, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/mills/$id")({
  component: MillDetail,
});

const TIMELINE = [
  { label: "Fabric packed & dispatched from warehouse", time: "28 Jun, 9:20 AM", done: true },
  { label: "Received at mill — inward slip generated", time: "29 Jun, 11:40 AM", done: true },
  { label: "Colour matching approved (shade card)", time: "29 Jun, 5:10 PM", done: true },
  { label: "Dyeing bath — Batch 1 (2,400 m)", time: "30 Jun, 9:00 AM", done: true },
  { label: "Drying & stentering — Batch 1", time: "30 Jun, 2:00 PM", done: true },
  { label: "Dyeing bath — Batch 2 (2,000 m)", time: "01 Jul, 10:00 AM", done: false, active: true },
  { label: "Finishing (calendering & polishing)", time: "Est. 02 Jul", done: false },
  { label: "Quality inspection & lot packing", time: "Est. 03 Jul", done: false },
  { label: "Return dispatch to Vastra warehouse", time: "Est. 04 Jul", done: false },
];

function MillDetail() {
  const { id } = Route.useParams();
  const m = MILLS.find((x) => x.id === id) ?? MILLS[0];
  return (
    <ModuleShell title={m.name} subtitle={`${m.id} · ${m.process} · Lot ${m.lot}`}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title="Process Timeline" subtitle="Live status from dispatch to return">
          <ol className="relative space-y-4 border-l border-border/70 pl-5">
            {TIMELINE.map((t, i) => (
              <li key={i} className="relative">
                <span
                  className={`absolute -left-[26px] top-0.5 grid h-5 w-5 place-items-center rounded-full ring-4 ring-background ${
                    t.done ? "bg-success text-success-foreground" : t.active ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3 w-3" />}
                </span>
                <div className="text-[13px] font-medium">{t.label}</div>
                <div className="text-[11.5px] text-muted-foreground">{t.time}</div>
              </li>
            ))}
          </ol>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Mill Details">
            <div className="space-y-2 text-[13px]">
              <Row label="Status" value={<StatusBadge status={m.status} />} />
              <Row label="Shade" value={m.shade} />
              <Row label="Fabric Sent" value={`${num(m.fabricSent)} m`} />
              <Row label="Fabric Received" value={<span className="text-success">{num(m.fabricReceived)} m</span>} />
              <Row label="Pending" value={<span className="text-warning-foreground">{num(m.pending)} m</span>} />
              <Row label="Mill Charges" value={inr(m.charges)} />
              <Row label="ETA" value={shortDate(m.eta)} />
              <Row label="Location" value={<span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Sachin GIDC, Surat</span>} />
            </div>
          </SectionCard>

          <SectionCard title="Attachments">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border border-border bg-gradient-to-br from-muted to-muted/50"
                >
                  <div className="grid h-full place-items-center text-muted-foreground">
                    <Camera className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Paperclip className="h-3.5 w-3.5" /> Delivery challan, shade card, inward slip
            </div>
          </SectionCard>

          <SectionCard title="Remarks">
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              Rani Pink shade matched second try — customer approved lot on WhatsApp. Batch 2 delayed 12 hrs
              due to boiler maintenance; mill has confirmed recovery by tomorrow evening.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Last updated 2h ago by Kailash Nath
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/mills" className="text-[12px] font-medium text-brand hover:underline">
          ← Back to Mills
        </Link>
      </div>
    </ModuleShell>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}