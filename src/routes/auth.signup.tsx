import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Phone, User, Check } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "Sign up — ZUNO" }] }),
  component: Signup,
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PhoneFrame>
      <TopBar title="Sign Up" back="/" />
      <div className="flex flex-1 flex-col gap-3 px-6 pt-6">
        <p className="text-xs font-bold tracking-[0.2em] text-accent">CREATE ACCOUNT</p>
        <Field icon={User} placeholder="Full Name" />
        <Field icon={Phone} placeholder="Phone Number" />
        <Field icon={Mail} placeholder="Email" />
        <Field
          icon={Lock}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-muted-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        <label className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
          <span className="mt-0.5 grid h-4 w-4 place-items-center rounded border border-gold bg-gold/15">
            <Check className="h-3 w-3 text-gold" />
          </span>
          <span>
            By creating an account, you agree to our{" "}
            <span className="font-semibold text-gold">Terms of Service</span> and{" "}
            <span className="font-semibold text-gold">Privacy Policy</span>
          </span>
        </label>

        <Link
          to="/auth/role"
          className="mt-4 flex h-14 items-center justify-center rounded-2xl bg-gradient-gold text-base font-semibold text-gold-foreground shadow-gold"
        >
          Continue
        </Link>

        <p className="mt-auto pb-8 pt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-gold">
            Log in
          </Link>
        </p>
      </div>
    </PhoneFrame>
  );
}

function Field({
  icon: Icon,
  placeholder,
  type = "text",
  trailing,
}: {
  icon: typeof Mail;
  placeholder: string;
  type?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="flex h-14 items-center gap-3 rounded-2xl border border-border/60 bg-input px-4 transition-colors focus-within:border-gold/50">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      {trailing}
    </label>
  );
}
