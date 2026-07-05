import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function ActionCard({
  title,
  description,
  href,
  icon: Icon,
  label = "Ouvrir"
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  label?: string;
}) {
  return (
    <Card className="flex h-full flex-col">
      <Icon className="mb-4 h-6 w-6 text-primary" />
      <CardTitle>{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
      <Button href={href} variant="outline" className="mt-5 w-fit">
        {label}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Card>
  );
}
