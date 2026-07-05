"use client";

import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatbotButton({
  isOpen,
  onClick
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Ouvrir Mentor IA"
      className={cn(
        "fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-emerald-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isOpen && "bg-emerald-800"
      )}
    >
      <Bot className="h-4 w-4" />
      Mentor IA
    </button>
  );
}
