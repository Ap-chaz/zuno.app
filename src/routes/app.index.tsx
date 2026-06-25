import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Shield, Store, ArrowUpRight, ShieldCheck, Package, FilePlus } from "lucide-react";
import { Logo } from "@/components/zuno/Logo";
import { transactions, currency, statusColor, activeOrders, categoryEmoji } from "@/lib/zuno-data";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Home — ZUNO" }] }),
  component: Home,
});

function Home() {
  const recent = transactions.slice(0, 3);
  const escrowBalance = activeOrders.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6">
        <Logo />
        <div className="flex items-center gap-2">
          <Link
            to="/app/notifications"
            className="relative grid h-10 w-10 place-items-center rounded-xl bg-surface"
          >
            <Bell className="h-5 w-5 text-gold" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </Link>
          <Link
            to="/app/account"
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-gold text-sm font-bold text-gold-foreground"
          >
            A
          </Link>
        </div>
      </header>

      <p className="mt-5 px-5 text-sm text-muted-foreground">Hi, Alvan 👋</p>

      {/* Balance card */}
      <section className="mx-5 mt-3 overflow-hidden rounded-3xl border border-border/40 bg-gradient-card p-6 shadow-card">
        <div className="relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -bottom-16 left-6 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />

          <div className="relative flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-gold" /> PROTECTED IN ESCROW
          </div>
          <p className="relative mt-3 text-4xl font-bold tracking-tight">{currency(escrowBalance)}</p>

          <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-border/40 pt-4">
            <Stat label="Trust Score" value="850 / 1000" />
            <Stat label="Active" value={`${activeOrders.length} deals`} />
            <Stat label="Completed" value="14" />
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-6 grid grid-cols-3 gap-3 px-5">
        <Action to="/app/new-escrow" icon={FilePlus} label="New" />
        <Action to="/app/sellers" icon={Store} label="Sellers" />
        <Action to="/app/safepay" icon={ShieldCheck} label="SafePay" />
      </section>

      {/* Active Orders */}
      <section className="mt-7 px-5">
        <SectionHeader title="Active Orders" to="/app/transactions" />
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {activeOrders.map((order) => (
            <Link
              key={order.id}
              to="/app/transaction/$id"
              params={{ id: order.id }}
              className="min-w-[260px] flex-1 rounded-3xl border border-border/40 bg-surface p-4 shadow-card transition-transform active:scale-[0.98]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-surface-2 text-lg">
                    <Package className="h-5 w-5 text-gold" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{order.item}</p>
                    <p className="text-xs text-muted-foreground">{order.seller}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">{currency(order.amount)}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{
                        width:
                          order.status === "Pending"
                            ? "25%"
                            : order.status === "Funded"
                              ? "50%"
                              : order.status === "Protected"
                                ? "75%"
                                : order.status === "Disputed"
                                  ? "60%"
                                  : "0%",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {order.status === "Pending"
                      ? "Awaiting funding"
                      : order.status === "Funded"
                        ? "Funds secured"
                        : order.status === "Protected"
                          ? "In transit"
                          : order.status === "Disputed"
                            ? "Under review"
                            : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent transactions */}
      <section className="mt-7 px-5">
        <SectionHeader title="Recent Transactions" to="/app/transactions" />
        <ul className="mt-3 divide-y divide-border/40 rounded-3xl border border-border/40 bg-surface">
          {recent.map((t) => (
            <li key={t.id}>
              <Link
                to="/app/transaction/$id"
                params={{ id: t.id }}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3.5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface-2 text-lg">
                  {categoryEmoji[t.category] ?? "📦"}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.item}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.seller} · {t.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{currency(t.amount)}</p>
                  <span
                    className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusColor(t.status)}`}
                  >
                    {t.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-bold">{value}</p>
    </div>
  );
}

function Action({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof FilePlus;
  label: string;
}) {
  return (
    <Link to={to} className="flex flex-col items-center gap-2">
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-border/40 bg-surface text-gold transition-colors hover:bg-surface-2">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
    </Link>
  );
}

function SectionHeader({ title, to }: { title: string; to: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-bold">{title}</h2>
      <Link to={to} className="flex items-center gap-1 text-xs font-medium text-gold">
        See all <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
