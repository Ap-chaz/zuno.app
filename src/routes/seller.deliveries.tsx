import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Truck, CheckCircle2, Package } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";

export const Route = createFileRoute("/seller/deliveries")({
  head: () => ({ meta: [{ title: "Delivery Management — ZUNO" }] }),
  component: Deliveries,
});

const tabs = ["Waiting", "Active", "Completed"] as const;
type Tab = (typeof tabs)[number];

type Order = { item: string; buyer: string; id: string };

const initialOrders: Record<Tab, Order[]> = {
  Waiting: [
    { item: "iPhone 17 Pro Max", buyer: "Alvan Mwangi", id: "ZUNOAXFVLO4Y8Y" },
    { item: "AirPods Pro 3", buyer: "Brenda Kerubo", id: "ZUNO22HJ8K9L0M" },
  ],
  Active: [
    { item: "MacBook Air M4", buyer: "James Otieno", id: "ZUNO9KLP2M3N4Q" },
  ],
  Completed: [
    { item: "Sony WH-1000XM6", buyer: "Mary Wanjiru", id: "ZUNO7HG6FD5SA1" },
    { item: "Apple Watch Ultra", buyer: "Peter Kim", id: "ZUNO5UI6OP7AS8" },
  ],
};

function Deliveries() {
  const [tab, setTab] = useState<Tab>("Waiting");
  const [orders, setOrders] = useState(initialOrders);

  const markShipped = (id: string) => {
    const order = orders.Waiting.find((o) => o.id === id);
    if (!order) return;
    setOrders((prev) => ({
      ...prev,
      Waiting: prev.Waiting.filter((o) => o.id !== id),
      Active: [...prev.Active, order],
    }));
  };

  const markDelivered = (id: string) => {
    const order = orders.Active.find((o) => o.id === id);
    if (!order) return;
    setOrders((prev) => ({
      ...prev,
      Active: prev.Active.filter((o) => o.id !== id),
      Completed: [...prev.Completed, order],
    }));
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Delivery Management" />

      <div className="mx-5 mt-4 grid grid-cols-3 gap-1 rounded-2xl border border-border/40 bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
              tab === t ? "bg-gradient-gold text-gold-foreground" : "text-muted-foreground"
            }`}
          >
            {t} <span className="opacity-60">({orders[t].length})</span>
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-3 px-5 pb-8">
        {orders[tab].length === 0 && (
          <li className="py-10 text-center text-sm text-muted-foreground">No orders here</li>
        )}
        {orders[tab].map((o) => (
          <li key={o.id} className="rounded-3xl border border-border/40 bg-surface p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface-2 text-xl">📦</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{o.item}</p>
                <p className="truncate text-xs text-muted-foreground">Buyer: {o.buyer}</p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">#{o.id}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <a
                href="tel:+254700000001"
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface-2 text-xs font-semibold"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>

              {tab === "Waiting" && (
                <button
                  onClick={() => markShipped(o.id)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-gold text-xs font-semibold text-gold-foreground"
                >
                  <Truck className="h-3.5 w-3.5" /> Mark shipped
                </button>
              )}
              {tab === "Active" && (
                <button
                  onClick={() => markDelivered(o.id)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-gold text-xs font-semibold text-gold-foreground"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Delivered
                </button>
              )}
              {tab === "Completed" && (
                <button
                  onClick={() => alert(`Receipt for ${o.item} — PDF export coming soon`)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-gold text-xs font-semibold text-gold-foreground"
                >
                  <Package className="h-3.5 w-3.5" /> Receipt
                </button>
              )}

              <button
                onClick={() => alert(`Order ID: ${o.id}\nItem: ${o.item}\nBuyer: ${o.buyer}`)}
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface-2 text-xs font-semibold"
              >
                <Package className="h-3.5 w-3.5" /> Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
