import { createFileRoute, Link } from "@tanstack/react-router";
import { ModuleShell } from "@/components/erp/ModuleShell";
import { SectionCard } from "@/components/erp/SectionCard";
import { StatCard } from "@/components/erp/StatCard";
import { Btn } from "@/components/erp/Actions";
import { CHALLANS } from "@/lib/erp/data";
import { Plus, QrCode, MapPin, FileText, Truck } from "lucide-react";

export const Route = createFileRoute("/e-way-bill")({
  head: () => ({ meta: [{ title: "E-Way Bill — Vastra ERP" }] }),
  component: () => {
    const bills = CHALLANS.slice(0, 4).map((c, i) => ({
      id: `EWB-2609-${871 + i}-4412`, dc: c.id, customer: c.customer, city: c.city,
      transport: c.transport, vehicle: c.vehicle, distance: [640, 285, 1120, 895][i],
      valid: "2026-07-08", from: "Surat, 395002", to: `${c.city}`,
    }));
    return (
      <ModuleShell title="E-Way Bills" subtitle="Generate & manage e-way bills for outward dispatch."
        actions={<Btn variant="brand"><Plus className="h-4 w-4" /> Generate E-Way</Btn>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="EWBs (MTD)" value={42} icon={FileText} tone="brand" />
          <StatCard label="Active" value={18} icon={Truck} tone="info" />
          <StatCard label="Expiring Soon" value={3} tone="warning" />
          <StatCard label="Auto-Generated" value={"96%"} tone="success" delta={4.4} />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bills.map((b) => (
            <SectionCard key={b.id} title={b.id} subtitle={<>Ref <Link to="/delivery-challan/$id" params={{ id: b.dc }} className="text-brand hover:underline font-mono">{b.dc}</Link></>}>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-2 text-[12.5px]">
                  <Row label="Consignee" value={<><b>{b.customer}</b> · {b.city}</>} />
                  <Row label="Transporter" value={<>{b.transport}</>} />
                  <Row label="Vehicle" value={<span className="font-mono">{b.vehicle}</span>} />
                  <Row label="Dispatch From" value={<span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {b.from}</span>} />
                  <Row label="Dispatch To" value={<span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {b.to}</span>} />
                  <Row label="Distance" value={<span className="font-mono">{b.distance} km</span>} />
                  <Row label="Valid Until" value={b.valid} />
                </div>
                <div className="grid place-items-center rounded-lg border border-border bg-muted/30 p-2">
                  <div className="grid h-24 w-24 place-items-center rounded-md bg-surface">
                    <QrCode className="h-16 w-16 text-foreground/80" />
                  </div>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      </ModuleShell>
    );
  },
});

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}