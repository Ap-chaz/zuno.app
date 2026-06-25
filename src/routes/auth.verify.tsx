import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { TopBar } from "@/components/zuno/TopBar";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";
import { getRole } from "@/lib/zuno-role";

export const Route = createFileRoute("/auth/verify")({
  head: () => ({ meta: [{ title: "Verify — ZUNO" }] }),
  component: Verify,
});

function Verify() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendSeconds, setResendSeconds] = useState(45);
  const [resendActive, setResendActive] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useState(() => {
    const t = setInterval(() => {
      setResendSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          setResendActive(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  });

  const otp = digits.join("");
  const isValid = otp.length === 6 && digits.every((d) => d !== "");

  const handleChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = digit;
    setDigits(next);
    if (digit && i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleResend = () => {
    setResendSeconds(45);
    setResendActive(false);
    setDigits(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    const t = setInterval(() => {
      setResendSeconds((s) => {
        if (s <= 1) { clearInterval(t); setResendActive(true); return 0; }
        return s - 1;
      });
    }, 1000);
  };

  const handleVerify = () => {
    const role = getRole();
    navigate({ to: role === "seller" ? "/seller" : "/app" });
  };

  return (
    <PhoneFrame>
      <TopBar title="Verify" back="/auth/role" />
      <div
        className="flex flex-1 flex-col justify-between px-6"
        style={{ paddingTop: "clamp(16px, 4vh, 32px)", paddingBottom: "clamp(16px, 4vh, 32px)", gap: "clamp(16px, 3vh, 28px)" }}
      >
        <div style={{ gap: "clamp(12px, 2vh, 20px)" }} className="flex flex-col">
          <p className="text-xs font-bold tracking-[0.2em] text-accent">OTP VERIFICATION</p>
          <div>
            <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to</p>
            <p className="mt-1 text-base font-semibold">+254 714 637 437</p>
          </div>

          <div className="grid grid-cols-6 gap-2" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`grid place-items-center rounded-2xl border text-center text-xl font-semibold outline-none transition-colors ${
                  d ? "border-gold bg-gold/10 text-gold" : "border-border bg-surface"
                } focus:border-gold/60`}
                style={{ height: "clamp(48px, 8vh, 56px)" }}
              />
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {resendActive ? (
              <button onClick={handleResend} className="font-semibold text-gold">
                Resend code
              </button>
            ) : (
              <>Resend code in <span className="font-semibold text-gold">00:{String(resendSeconds).padStart(2, "0")}</span></>
            )}
          </p>
        </div>

        <button
          onClick={handleVerify}
          disabled={!isValid}
          className="flex items-center justify-center rounded-2xl bg-gradient-gold text-base font-semibold text-gold-foreground shadow-gold disabled:opacity-40"
          style={{ height: "clamp(52px, 7vh, 56px)" }}
        >
          Verify
        </button>
      </div>
    </PhoneFrame>
  );
}
