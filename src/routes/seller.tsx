import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BottomNav } from "@/components/zuno/BottomNav";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";
import { getRole } from "@/lib/zuno-role";

export const Route = createFileRoute("/seller")({
  beforeLoad: () => {
    const role = getRole();
    if (!role) throw redirect({ to: "/auth/login" });
    if (role === "buyer") throw redirect({ to: "/app" });
  },
  component: () => (
    <PhoneFrame>
      <Outlet />
      <BottomNav variant="seller" />
    </PhoneFrame>
  ),
});
