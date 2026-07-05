import { AlertTriangle } from "lucide-react";

export function AIErrorState({
  message = "Impossible de generer l'analyse pour le moment"
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}
