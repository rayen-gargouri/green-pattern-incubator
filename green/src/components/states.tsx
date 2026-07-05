import { Loader2, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, actionLabel, href }: { title: string; description: string; actionLabel?: string; href?: string }) {
  return (
    <div className="rounded-lg border bg-white p-10 text-center">
      <Sprout className="mx-auto mb-4 h-8 w-8 text-primary" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel && href ? (
        <Button href={href} className="mt-5">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function LoadingState({ label = "Chargement" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}
