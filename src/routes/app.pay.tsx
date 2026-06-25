import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, AlertTriangle, Lock, Phone } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { currency } from "@/lib/zuno-data";
import { z } from "zod";

const searchSchema = z.object({
  amount: z.number().optional().default(0),
  item: z.string().optional().default("Item"),
  seller: z.string().optional().default("Seller"),
  txId: z.string().optional().default(""),
});

export const Route = createFileRoute("/app/pay")({
  head: () => ({ meta: [{ title: "Secure Payment — ZUNO" }] }),
  validateSearch: searchSchema,
  component: Pay,
});

function Pay() {
  const { amount: rawAmount, item, seller, txId } = useSearch({ from: "/app/pay" });
  const [method, setMethod] = useState<"M-PESA" | "Card" | "Wallet">("M-PESA");
  const amount = rawAmount || 0;
  const fee = Math.round(amount * 0.015);
  const total = amount + fee;

  const trackingId = txId || "ZUNOAXFVLO4Y8Y";

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Secure Payment" back="/app" />

      <div className="px-5 pt-4">
        <h1 className="text-2xl font-bold">Confirm & Pay</h1>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3">
          <Shield className="h-4 w-4 text-accent" />
          <p className="text-xs font-medium text-accent">Funds locked in ZUNO escrow until delivery</p>
        </div>

        <dl className="mt-5 space-y-3 rounded-2xl border border-border/40 bg-surface p-4 text-sm">
          <Line label="Item" value={item} />
          <Line label="Seller" value={`${seller} ✓`} />
          <Line label="Item Amount" value={currency(amount)} />
          <Line label="Escrow Fee (1.5%)" value={currency(fee)} />
          <div className="my-1 h-px bg-border/60" />
          <Line label="Total" value={currency(total)} bold />
        </dl>

        <p className="mt-6 text-xs font-bold tracking-[0.18em] text-accent">PAYMENT METHOD</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(["M-PESA", "Card", "Wallet"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors ${
                method === m ? "border-gold bg-gold/10 text-gold" : "border-border bg-surface text-muted-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border/60 bg-input px-4 py-3">
          <Phone className="h-4 w-4 text-gold" />
          <input defaultValue="+254 714 637 437" className="flex-1 bg-transparent text-sm outline-none" />
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-gold" />
          <p className="text-xs text-gold/90">If a seller asks you to send money directly, stop. That's a scam.</p>
        </div>

        <Link
          to="/app/tracking/$id"
          params={{ id: trackingId }}
          className="my-6 flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-gold text-base font-semibold text-gold-foreground shadow-gold"
        >
          <Lock className="h-4 w-4" /> Pay {currency(total)} into Escrow
        </Link>
      </div>
    </div>
  );
}

function Line({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</dt>
      <dd className={`text-right ${bold ? "text-lg font-bold" : "font-medium"}`}>{value}</dd>
    </div>
  );
}
