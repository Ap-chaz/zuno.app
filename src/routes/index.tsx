import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, CheckCircle2, Users, Sparkles } from "lucide-react";
import zunoLogo from "@/assets/zuno-logo-new.png.asset.json";
import { Logo } from "@/components/zuno/Logo";
import { ThemeToggle } from "@/components/zuno/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZUNO — Secure Escrow Payments for Buyers & Sellers" },
      { name: "description", content: "Pay verified sellers safely with ZUNO escrow. Funds released only when you confirm delivery." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-gradient-hero sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <div className="flex items-center justify-between px-6 pt-6">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Log in
          </Link>
        </div>
      </div>

      <div className="relative mx-6 mt-8 flex-1 overflow-hidden rounded-3xl border border-border/40 bg-gradient-card p-8 shadow-elevated">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />

        <div className="relative">
          <div className="mx-auto grid h-32 w-32 place-items-center overflow-hidden rounded-3xl bg-white p-4 shadow-elevated ring-1 ring-gold/30">
            <img src={zunoLogo.url} alt="ZUNO" className="h-full w-full object-contain" />
          </div>



          <h1 className="mt-10 text-3xl font-bold leading-tight">
            Pay and get paid <span className="text-gold">safely.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Escrow protection that gives you peace of mind on every deal. Verified sellers, protected buyers.
          </p>

          <div className="mt-8 space-y-3">
            <Feature icon={Lock} text="Funds locked until you confirm delivery" />
            <Feature icon={CheckCircle2} text="Every seller is KYC-verified" />
            <Feature icon={Users} text="Trusted by 80,000+ users" />
          </div>
        </div>
      </div>

      <div className="space-y-3 px-6 pb-8 pt-6">
        <Link
          to="/auth/signup"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-gold text-base font-semibold text-gold-foreground shadow-gold transition-transform active:scale-[0.98]"
        >
          Get Started <ArrowRight className="h-5 w-5" />
        </Link>
        <Link
          to="/app"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-border bg-surface/60 text-base font-semibold text-foreground transition-colors hover:bg-surface"
        >
          <Sparkles className="h-4 w-4 text-gold" /> Explore demo
        </Link>
        <p className="pt-2 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-gold">Log in</Link>
        </p>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: { icon: typeof Lock; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-surface/60 px-4 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
