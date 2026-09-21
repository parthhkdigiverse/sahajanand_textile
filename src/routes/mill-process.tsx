import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mill-process")({
  head: () => ({ meta: [{ title: "Mill Process — Vastra ERP" }] }),
  component: () => {
    // redirect-like content
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground">Mill process is managed under Mills →</p>
        <Link to="/mills" className="mt-2 inline-block text-brand hover:underline">Go to Mill Dashboard</Link>
      </div>
    );
  },
});