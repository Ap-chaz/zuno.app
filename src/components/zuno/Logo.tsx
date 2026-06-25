import zunoLogo from "@/assets/zuno-logo-new.png.asset.json";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <img
      src={zunoLogo.url}
      alt="ZUNO"
      style={{ height: size * 1.6, width: "auto" }}
      className="object-contain"
    />
  );
}
