import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  Star,
  MapPin,
  Tag,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  Instagram,
  Facebook,
  Globe,
  ArrowRight,
} from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { sellers } from "@/lib/zuno-data";

export const Route = createFileRoute("/app/seller/$id")({
  head: () => ({ meta: [{ title: "Seller Profile — ZUNO" }] }),
  component: SellerProfile,
  notFoundComponent: () => (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <p className="text-lg font-semibold">Seller not found</p>
      <Link to="/app/sellers" className="text-sm font-semibold text-gold">
        Back to verified sellers
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <p className="text-lg font-semibold">Something went wrong</p>
      <Link to="/app/sellers" className="text-sm font-semibold text-gold">
        Back to verified sellers
      </Link>
    </div>
  ),
});

// TikTok isn't in lucide; use a small inline glyph.
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.5 8.6a6.6 6.6 0 0 1-3.9-1.3v7.4a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.1v2.6a2.7 2.7 0 1 0 1.9 2.6V2h2.5a4 4 0 0 0 3.9 3.9V8.6z" />
    </svg>
  );
}

function SellerProfile() {
  const { id } = Route.useParams();
  const seller = sellers.find((s) => s.id === id);
  if (!seller) throw notFound();

  const links = seller.links ?? {};
  const linkItems = [
    links.instagram && { key: "instagram", label: "Instagram", url: links.instagram, icon: Instagram },
    links.facebook && { key: "facebook", label: "Facebook", url: links.facebook, icon: Facebook },
    links.tiktok && { key: "tiktok", label: "TikTok", url: links.tiktok, icon: TikTokIcon },
    links.whatsapp && { key: "whatsapp", label: "WhatsApp", url: links.whatsapp, icon: MessageCircle },
    links.website && { key: "website", label: "Website", url: links.website, icon: Globe },
  ].filter(Boolean) as Array<{ key: string; label: string; url: string; icon: typeof Instagram }>;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto pb-28">
      <TopBar title="Seller Profile" back="/app/sellers" />

      {/* Cover */}
      <div className={`relative h-36 bg-gradient-to-br ${seller.color}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Logo + identity */}
      <div className="-mt-12 px-5">
        <div className="grid h-24 w-24 place-items-center rounded-3xl border-4 border-background bg-gradient-violet text-2xl font-bold shadow-card">
          {seller.initials}
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="truncate text-xl font-bold">{seller.name}</h1>
              {seller.verified && <BadgeCheck className="h-5 w-5 shrink-0 text-gold" />}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{seller.tagline}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {seller.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> {seller.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Tag className="h-3.5 w-3.5 text-gold" /> {seller.category}
              </span>
            </div>
          </div>
        </div>

        {seller.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{seller.description}</p>
        )}
      </div>

      {/* Trust statistics */}
      <section className="mt-5 px-5">
        <p className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground">TRUST STATISTICS</p>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <Stat icon={Star} value={seller.rating.toFixed(1)} label="Rating" sub={`${seller.reviews} reviews`} />
          <Stat icon={TrendingUp} value={seller.deals.toLocaleString()} label="Total Deals" sub="Completed" />
          <Stat
            icon={ShieldCheck}
            value={`${seller.responseRate ?? 95}%`}
            label="Response Rate"
            sub="Last 30d"
          />
        </div>
      </section>

      {/* Business links */}
      {linkItems.length > 0 && (
        <section className="mt-6 px-5">
          <p className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground">BUSINESS LINKS</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {linkItems.map((l) => (
              <a
                key={l.key}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-2xl border border-border/60 bg-surface px-3 py-2.5 text-sm font-semibold transition-colors hover:border-gold/60"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-gold/10 text-gold">
                  <l.icon className="h-4 w-4" />
                </span>
                {l.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Escrow notice */}
      <div className="mx-5 mt-6 flex items-start gap-2 rounded-2xl border border-border/40 bg-surface/60 p-3 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span>Every transaction with {seller.name} is protected by ZUNO escrow. Funds are only released after delivery confirmation.</span>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 z-10 border-t border-border/40 bg-background/95 px-5 py-3 backdrop-blur">
        <Link
          to="/app/new-escrow"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-gold text-base font-semibold text-gold-foreground shadow-gold"
        >
          Start Secure Transaction <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  sub,
}: {
  icon: typeof Star;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-surface p-3">
      <Icon className="h-4 w-4 text-gold" />
      <p className="mt-2 text-lg font-bold leading-none">{value}</p>
      <p className="mt-1 text-[11px] font-semibold">{label}</p>
      <p className="text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}
