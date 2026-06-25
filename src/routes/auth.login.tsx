import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Fingerprint } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";
import { getRole } from "@/lib/zuno-role";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Log in — ZUNO" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const role = getRole();
    if (role === "seller") {
      navigate({ to: "/seller" });
    } else {
      navigate({ to: "/app" });
    }
  };

  return (
    <PhoneFrame>
      <TopBar title="Log In" back="/" />
      <div className="flex flex-1 flex-col px-6 pt-6">
        <Field icon={Mail} placeholder="Phone Number or Email" />
        <div className="h-4" />
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
        <Link to="/auth/forgot" className="mt-3 self-end text-xs font-medium text-gold">
          Forgot Password?
        </Link>

        <button
          onClick={handleLogin}
          className="mt-8 flex h-14 items-center justify-center rounded-2xl bg-gradient-gold text-base font-semibold text-gold-foreground shadow-gold"
        >
          Log In
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={handleLogin}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-border bg-surface/60 text-base font-semibold"
        >
          <Fingerprint className="h-5 w-5 text-gold" /> Continue with Biometrics
        </button>

        <p className="mt-auto pb-8 pt-10 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="font-semibold text-gold">
            Sign up
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
