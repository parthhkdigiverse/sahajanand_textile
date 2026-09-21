import { createFileRoute } from "@tanstack/react-router";
import { CatInv } from "./less-inventory";

export const Route = createFileRoute("/patta-inventory")({
  head: () => ({ meta: [{ title: "Patta Inventory — Vastra ERP" }] }),
  component: () => <CatInv category="Patta" title="Patta Inventory" subtitle="Banarasi silk, jacquard & embroidered patta stock." />,
});