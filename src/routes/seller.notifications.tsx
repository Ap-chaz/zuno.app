import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Truck, Shield, BadgeCheck, AlertTriangle } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";

export const Route = createFileRoute("/seller/notifications")({
  head: () => ({ meta: [{ title: "Notifications — ZUNO Seller" }] }),
  component: SellerNotifications,
});

const groups = [
  {
    title: "Today",
    items: [
      { icon: CreditCard, iconClass: "text-success bg-success/15", title: "New order received", body: "iPhone 17 Pro Max · Alvan Mwangi · KES 191,311", time: "14:23" },
      { icon: Truck, iconClass: "text-accent bg-accent/15", title: "Delivery confirmed", body: "MacBook Air M4 delivered to Brenda K.", time: "11:40" },
    ],
  },
  {
    title: "This week",
    items: [
      { icon: Shield, iconClass: "text-gold bg-gold/15", title: "Funds released to you", body: "KES 145,000 sent to M-PESA", time: "Tue" },
      { icon: BadgeCheck, iconClass: "text-gold bg-gold/15", title: "Business verification approved", body: "Seller badge active on your profile", time: "Mon" },
      { icon: AlertTriangle, iconClass: "text-destructive bg-destructive/15", title: "Dispute opened", body: "DJI Mini 5 Pro · James O. · under review", time: "Sun" },
    ],
  },
];

function SellerNotifications() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Notifications" />
      <div className="px-5 pt-4 pb-8">
        {groups.map((g) => (
          <div key={g.title} className="mt-4 first:mt-0">
            <p className="px-1 text-xs font-bold tracking-[0.18em] text-muted-foreground">
              {g.title.toUpperCase()}
            </p>
            <ul className="mt-2 space-y-2">
              {g.items.map((n, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-2xl border border-border/40 bg-surface p-4"
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-2xl ${n.iconClass}`}>
                    <n.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.body}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
