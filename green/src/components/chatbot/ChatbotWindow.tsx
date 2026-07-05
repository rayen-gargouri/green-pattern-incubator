"use client";

import { Loader2, RotateCcw, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage, type MentorChatMessage } from "./ChatMessage";

export function ChatbotWindow({
  messages,
  loading,
  onClose,
  onClear,
  onSend
}: {
  messages: MentorChatMessage[];
  loading: boolean;
  onClose: () => void;
  onClear: () => void;
  onSend: (message: string) => void;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <section
      aria-label="Mentor IA"
      className="fixed inset-x-3 bottom-20 z-50 flex max-h-[74vh] flex-col overflow-hidden rounded-2xl border bg-white shadow-soft sm:inset-auto sm:bottom-20 sm:right-5 sm:h-[620px] sm:max-h-[calc(100vh-120px)] sm:w-[390px]"
    >
      <header className="border-b bg-primary px-4 py-4 text-primary-foreground">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Mentor IA</h2>
            <p className="mt-1 text-xs leading-5 text-primary-foreground/85">
              Votre assistant pour structurer votre projet vert
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onClear}
              className="flex h-8 w-8 items-center justify-center rounded-md text-primary-foreground/90 transition hover:bg-white/15"
              aria-label="Vider la conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-md text-primary-foreground/90 transition hover:bg-white/15"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto bg-background/80 p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Mentor IA reflechit...
          </div>
        )}
        <div ref={endRef} />
      </div>

      <ChatInput disabled={loading} onSend={onSend} />
    </section>
  );
}
