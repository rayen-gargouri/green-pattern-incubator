import { cn } from "@/lib/utils";

export function StatusBadge({ label, tone = "green" }: { label: string; tone?: "green" | "blue" | "gray" | "amber" }) {
  const tones = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    blue: "border-cyan-200 bg-cyan-50 text-cyan-700",
    gray: "border-slate-200 bg-slate-50 text-slate-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700"
  };

  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize transition-colors", tones[tone])}>{label}</span>;
}

export function RoleBadge({ role }: { role: string }) {
  return <StatusBadge label={role} tone={role === "Administrateur" ? "amber" : role === "Mentor" ? "blue" : "green"} />;
}
