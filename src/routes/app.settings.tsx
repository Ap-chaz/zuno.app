import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Lock, CreditCard, Eye, Moon, Globe, ChevronRight } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { useTheme } from "@/components/zuno/ThemeToggle";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — ZUNO" }] }),
  component: Settings,
});

function Settings() {
  const { theme, toggle } = useTheme();
  const [biometric, setBiometric] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Settings" back="/app/account" />
      <div className="space-y-6 px-5 pb-8 pt-4">
        <Section title="Security">
          <Toggle icon={Lock} label="Biometric login" on={biometric} onChange={() => setBiometric((v) => !v)} />
          <Toggle icon={Eye} label="Hide balances" on={hideBalances} onChange={() => setHideBalances((v) => !v)} />
          <Row icon={Lock} label="Change password" onPress={() => alert("Coming soon")} />
          <Row icon={Lock} label="Two-factor authentication" badge="On" onPress={() => alert("Coming soon")} />
        </Section>

        <Section title="Payments">
          <Row icon={CreditCard} label="M-PESA · +254 714 637 437" badge="Default" onPress={() => alert("Coming soon")} />
          <Row icon={CreditCard} label="Visa ending 4321" onPress={() => alert("Coming soon")} />
          <Row icon={CreditCard} label="Add new method" onPress={() => alert("Coming soon")} />
        </Section>

        <Section title="Preferences">
          <Toggle icon={Bell} label="Push notifications" on={pushNotifications} onChange={() => setPushNotifications((v) => !v)} />
          <Toggle icon={Moon} label="Dark mode" on={theme === "dark"} onChange={toggle} />
          <Row icon={Globe} label="Language" badge="English" onPress={() => alert("Coming soon")} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <ul className="divide-y divide-border/40 overflow-hidden rounded-2xl border border-border/40 bg-surface">
        {children}
      </ul>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  badge,
  onPress,
}: {
  icon: typeof Lock;
  label: string;
  badge?: string;
  onPress?: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onPress}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-gold">
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex-1 text-sm font-medium">{label}</span>
        {badge && (
          <span className="rounded-full border border-border/60 bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>
    </li>
  );
}

function Toggle({
  icon: Icon,
  label,
  on,
  onChange,
}: {
  icon: typeof Lock;
  label: string;
  on?: boolean;
  onChange?: () => void;
}) {
  return (
    <li className="flex items-center gap-3 px-4 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <button
        type="button"
        onClick={onChange}
        aria-pressed={on}
        aria-label={`Toggle ${label}`}
        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${on ? "bg-gold" : "bg-muted"}`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-surface shadow transition-transform ${on ? "translate-x-5" : ""}`}
        />
      </button>
    </li>
  );
}
