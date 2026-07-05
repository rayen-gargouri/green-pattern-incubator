import type { LucideIcon } from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "green"
}: {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  tone?: "green" | "blue" | "slate";
}) {
  const toneClass = {
    green: "bg-emerald-100 text-emerald-800",
    blue: "bg-cyan-100 text-cyan-800",
    slate: "bg-slate-100 text-slate-700"
  }[tone];

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardDescription>{label}</CardDescription>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {Icon ? (
          <span className={`flex h-10 w-10 items-center justify-center rounded-md ${toneClass}`}>
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
    </Card>
  );
}
