import type { LucideIcon } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ProgressCard({
  title,
  description,
  value,
  icon: Icon
}: {
  title: string;
  description: string;
  value: number;
  icon?: LucideIcon;
}) {
  return (
    <Card>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {Icon ? <Icon className="h-6 w-6 text-primary" /> : null}
      </div>
      <ProgressBar value={value} />
    </Card>
  );
}
