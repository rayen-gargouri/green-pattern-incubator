import { Loader2, Sparkles } from "lucide-react";

export function AILoadingState({ label = "Analyse en cours..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-white">
        <Sparkles className="h-4 w-4" />
        <Loader2 className="absolute h-8 w-8 animate-spin text-primary/25" />
      </span>
      {label}
    </div>
  );
}
