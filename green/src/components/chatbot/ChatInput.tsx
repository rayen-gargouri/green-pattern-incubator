"use client";

import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export function ChatInput({
  disabled,
  onSend
}: {
  disabled?: boolean;
  onSend: (message: string) => void;
}) {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (!message || disabled) return;
    onSend(message);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t bg-white p-3">
      <label className="sr-only" htmlFor="mentor-ia-message">
        Message
      </label>
      <textarea
        id="mentor-ia-message"
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="Posez une question sur votre projet vert..."
        className="max-h-28 min-h-10 flex-1 resize-none rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        aria-label="Envoyer"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-emerald-800 disabled:pointer-events-none disabled:opacity-50"
      >
        <SendHorizonal className="h-4 w-4" />
      </button>
    </form>
  );
}
