import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Shield, MessageCircle, AlertCircle } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { currency, transactions } from "@/lib/zuno-data";

export const Route = createFileRoute("/app/tracking/$id")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.id} — ZUNO` }] }),
  component: Tracking,
});

const steps = [
  { title: "Payment secured by ZUNO", time: "05/06/2026, 14:22", done: true },
  { title: "Seller preparing order", time: "05/06/2026, 14:23", done: true },
  { title: "Delivery in progress", time: "ETA 07/06/2026", done: false, active: true },
  { title: "Order completed", time: "Awaiting confirmation", done: false },
];

function Tracking() {
  const { id } = Route.useParams();
  const tx = transactions.find((t) => t.id === id);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Order Tracking" back="/app" />

      <div className="px-5 pt-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-base font-bold tracking-tight">#{id}</p>
          <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[10px] font-semibold text-accent">
            Funded
          </span>
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-violet/40 p-5 shadow-card">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">TOTAL PAID</p>
          <p className="mt-2 text-4xl font-bold">{currency(tx?.amount ?? 191311)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/40 pt-3 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Item</p>
              <p className="mt-0.5 font-semibold">{tx?.item ?? "iPhone 17 Pro Max"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Seller</p>
              <p className="mt-0.5 font-semibold">{tx?.seller ?? "Gadget World"}</p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs font-bold tracking-[0.18em] text-muted-foreground">PROGRESS</p>

        <ol className="mt-3 space-y-0">
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold ${
                    s.done
                      ? "bg-accent text-accent-foreground"
                      : s.active
                        ? "border-2 border-gold bg-gold/15 text-gold"
                        : "border-2 border-border bg-surface text-muted-foreground"
                  }`}
                >
                  {s.done ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-12 w-0.5 ${s.done ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
              <div className="pb-6 pt-1.5">
                <p
                  className={`text-sm font-semibold ${
                    s.done || s.active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.time}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-gold/30 bg-gold/5 p-3">
          <Shield className="h-4 w-4 shrink-0 text-gold" />
          <p className="text-xs text-muted-foreground">
            Payment will be released once you confirm delivery.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 pb-8">
          <a
            href="tel:+254700000001"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-surface text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" /> Message seller
          </a>
          <Link
            to="/app/disputes"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 text-sm font-semibold text-destructive"
          >
            <AlertCircle className="h-4 w-4" /> Report issue
          </Link>
        </div>
      </div>
    </div>
  );
}
