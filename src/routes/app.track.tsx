import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Package,
  MapPin,
  CheckCircle2,
  Circle,
  MessageCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { activeOrders, statusColor } from "@/lib/zuno-data";

export const Route = createFileRoute("/app/track")({
  head: () => ({ meta: [{ title: "Track Delivery — ZUNO" }] }),
  component: TrackDelivery,
});

function TrackDelivery() {
  const trackable = activeOrders.filter(
    (o) => o.status === "Funded" || o.status === "Protected"
  );

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Track Delivery" back="/app" />

      <div className="space-y-4 px-5 pt-4 pb-6">
        {trackable.length === 0 && (
          <div className="mt-10 text-center text-sm text-muted-foreground">
            No active deliveries to track.
          </div>
        )}

        {trackable.map((order) => (
          <Link
            key={order.id}
            to="/app/tracking/$id"
            params={{ id: order.id }}
            className="block"
          >
            <div className="rounded-3xl border border-border/40 bg-surface p-4 shadow-card">
              {/* Order header */}
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-violet text-xl">
                  <Package className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-semibold">{order.item}</p>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {order.seller} · {order.date}
                  </p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="mt-4">
                <ol className="relative space-y-0">
                  {[
                    { title: "Order Confirmed", done: true },
                    { title: "Funds Secured", done: true },
                    { title: "Seller Shipped", done: order.status === "Protected" },
                    { title: "In Transit", active: order.status === "Protected", done: false },
                    { title: "Delivered", done: false },
                  ].map((step, i, arr) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ${
                            step.done
                              ? "bg-accent text-accent-foreground"
                              : step.active
                                ? "border-2 border-gold bg-gold/15 text-gold"
                                : "border-2 border-border bg-surface text-muted-foreground"
                          }`}
                        >
                          {step.done ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : step.active ? (
                            <Truck className="h-3.5 w-3.5" />
                          ) : (
                            <Circle className="h-3.5 w-3.5" />
                          )}
                        </div>
                        {i < arr.length - 1 && (
                          <div
                            className={`mt-0.5 h-6 w-0.5 ${step.done ? "bg-accent" : "bg-border"}`}
                          />
                        )}
                      </div>
                      <div className="pb-3 pt-0.5">
                        <p
                          className={`text-xs font-semibold ${
                            step.done || step.active ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Delivery Info */}
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl border border-border/40 bg-surface-2/50 p-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Courier</p>
                    <p className="text-xs font-semibold">SpeedMtaani</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Tracking #</p>
                    <p className="text-xs font-semibold">SPM-{order.id.slice(-7)}</p>
                  </div>
                </div>
              </div>

              {/* Escrow Notice */}
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-gold/30 bg-gold/5 p-3">
                <Shield className="h-4 w-4 shrink-0 text-gold" />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Your funds remain securely protected in escrow until you confirm successful delivery.
                </p>
              </div>

              {/* Buyer Actions */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href="tel:+254700000001"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-2xl border border-border bg-surface text-xs font-semibold"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Contact Seller
                </a>
                <Link
                  to="/app/disputes"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-2xl border border-destructive/30 bg-destructive/10 text-xs font-semibold text-destructive"
                >
                  <AlertCircle className="h-3.5 w-3.5" /> Report Issue
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
