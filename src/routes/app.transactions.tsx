import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { transactions, currency, statusColor, categoryEmoji, type TxStatus } from "@/lib/zuno-data";

const filters: ("All" | TxStatus)[] = ["All", "Completed", "Funded", "Pending", "Protected", "Refunded", "Disputed"];

export const Route = createFileRoute("/app/transactions")({
  head: () => ({ meta: [{ title: "Activity — ZUNO" }] }),
  component: Activity,
});

function Activity() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const list = transactions
    .filter((t) => filter === "All" || t.status === filter)
    .filter((t) =>
      query === "" ||
      t.item.toLowerCase().includes(query.toLowerCase()) ||
      t.seller.toLowerCase().includes(query.toLowerCase()) ||
      t.id.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Activity"
        back="/app"
        right={
          <button className="grid h-10 w-10 place-items-center rounded-xl bg-surface">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        }
      />

      <div className="px-5 pt-4">
        <label className="flex h-12 items-center gap-3 rounded-2xl border border-border/60 bg-input px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-1 hide-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold ${
              filter === f ? "border-gold bg-gold text-gold-foreground" : "border-border bg-surface text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-2 px-5 pb-6">
        {list.length === 0 && (
          <li className="py-10 text-center text-sm text-muted-foreground">No transactions found</li>
        )}
        {list.map((t) => (
          <li key={t.id}>
            <Link
              to="/app/transaction/$id"
              params={{ id: t.id }}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-border/40 bg-surface p-3.5"
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
    </div>
  );
}
