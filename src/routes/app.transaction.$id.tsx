import { createFileRoute } from "@tanstack/react-router";
import { Download, Shield, Copy, BadgeCheck } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { transactions, sellers, currency, statusColor } from "@/lib/zuno-data";

export const Route = createFileRoute("/app/transaction/$id")({
  head: ({ params }) => ({ meta: [{ title: `Receipt ${params.id} — ZUNO` }] }),
  component: TxDetail,
});

function TxDetail() {
  const { id } = Route.useParams();
  const tx = transactions.find((t) => t.id === id) ?? transactions[0];
  const seller = sellers.find((s) => s.name === tx.seller);
  const initials = seller?.initials ?? tx.seller.slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Receipt" back="/app/transactions" />

      <div className="px-5 pt-4">
        <div className="overflow-hidden rounded-3xl border border-border/40 bg-gradient-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">TOTAL PAID</span>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusColor(tx.status)}`}>
              {tx.status}
            </span>
          </div>
          <p className="mt-3 text-4xl font-bold">{currency(tx.amount)}</p>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-3 py-2">
            <Shield className="h-4 w-4 text-accent" />
            <p className="text-xs font-medium text-accent">Protected by ZUNO SafePay</p>
          </div>
        </div>

        <p className="mt-6 px-1 text-xs font-bold tracking-[0.18em] text-muted-foreground">PAYMENT INFORMATION</p>
        <dl className="mt-2 space-y-3 rounded-2xl border border-border/40 bg-surface p-4 text-sm">
          <Row label="Transaction ID" value={`#${tx.id}`} mono copy />
          <Row label="Date" value={tx.date} />
          <Row label="Method" value="M-PESA · +254 714 637 437" />
          <Row label="Escrow fee" value={currency(Math.round(tx.amount * 0.015))} />
          <Row label="Category" value={tx.category} />
        </dl>

        <p className="mt-6 px-1 text-xs font-bold tracking-[0.18em] text-muted-foreground">SELLER</p>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-border/40 bg-surface p-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-violet font-bold">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold">{tx.seller}</p>
              {seller?.verified && <BadgeCheck className="h-4 w-4 text-gold" />}
            </div>
            <p className="text-xs text-muted-foreground">
              Trusted seller · {seller ? `${seller.rating} ★` : "Verified"}
            </p>
          </div>
        </div>

        <p className="mt-6 px-1 text-xs font-bold tracking-[0.18em] text-muted-foreground">ITEM</p>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-border/40 bg-surface p-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-2 text-xl">
            {tx.category === "Electronics" ? "📱" : tx.category === "Audio" ? "🎧" : tx.category === "Furniture" ? "🛋️" : tx.category === "Drones" ? "🚁" : tx.category === "Wearables" ? "⌚" : "📦"}
          </span>
          <div className="flex-1">
            <p className="font-semibold">{tx.item}</p>
            <p className="text-xs text-muted-foreground">{tx.category}</p>
          </div>
        </div>

        <button
          onClick={() => alert("PDF export coming soon")}
          className="my-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-gold text-sm font-semibold text-gold-foreground shadow-gold"
        >
          <Download className="h-4 w-4" /> Download receipt (PDF)
        </button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  copy,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copy?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="flex items-center gap-2">
        <span className={`text-right font-medium ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
        {copy && (
          <button
            onClick={() => navigator.clipboard?.writeText(value)}
            className="text-muted-foreground"
            aria-label="Copy"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
      </dd>
    </div>
  );
}
