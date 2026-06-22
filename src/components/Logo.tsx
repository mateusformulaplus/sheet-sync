import logo from "@/assets/logo.png";

export function Logo({ className = "h-20 w-auto" }: { className?: string }) {
  return <img src={logo} alt="Fórmula Plus" className={className} />;
}
