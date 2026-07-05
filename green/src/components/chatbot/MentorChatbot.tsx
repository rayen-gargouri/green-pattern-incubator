"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChatbotButton } from "./ChatbotButton";
import { ChatbotWindow } from "./ChatbotWindow";
import type { MentorChatMessage } from "./ChatMessage";
import { buildMentorMockResponse } from "@/lib/chatbot/mentor-responses";

const STORAGE_KEY = "green_pattern_chatbot_messages";

const ALLOWED_PATHS = new Set([
  "/dashboard",
  "/project",
  "/pathway",
  "/business-model-canvas",
  "/resources",
  "/documents"
]);

const WELCOME_MESSAGE: MentorChatMessage = {
  id: "mentor-welcome",
  role: "assistant",
  content:
    "Bonjour, je suis Mentor IA. Je peux vous aider a clarifier votre idee, preparer un pitch, comprendre le Business Model Canvas ou choisir vos prochaines etapes.",
  createdAt: new Date(0).toISOString()
};

export function MentorChatbot() {
  const pathname = usePathname();
  const isAllowed = useMemo(() => ALLOWED_PATHS.has(pathname), [pathname]);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MentorChatMessage[]>([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAllowed) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as MentorChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      setMessages([WELCOME_MESSAGE]);
    }
  }, [isAllowed]);

  useEffect(() => {
    if (!isAllowed) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [isAllowed, messages]);

  if (!isAllowed) return null;

  function handleClear() {
    setMessages([WELCOME_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
  }

  function handleSend(content: string) {
    const userMessage = createMessage("user", content);
    setMessages((current) => [...current, userMessage]);
    setLoading(true);

    fetch("/api/chatbot/mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] })
    })
      .then(async (response) => {
        const data = (await response.json()) as { success?: boolean; reply?: string };
        if (!response.ok || !data.success || !data.reply) {
          throw new Error("Mentor IA unavailable");
        }
        return data.reply;
      })
      .catch(() => buildMentorMockResponse(content))
      .then((reply) => {
        const response = createMessage("assistant", reply);
        setMessages((current) => [...current, response]);
      })
      .finally(() => {
      setLoading(false);
      });
  }

  return (
    <>
      {isOpen && (
        <ChatbotWindow
          messages={messages}
          loading={loading}
          onClose={() => setIsOpen(false)}
          onClear={handleClear}
          onSend={handleSend}
        />
      )}
      <ChatbotButton isOpen={isOpen} onClick={() => setIsOpen((value) => !value)} />
    </>
  );
}

function createMessage(role: MentorChatMessage["role"], content: string): MentorChatMessage {
  return {
    id: `mentor_${role}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: new Date().toISOString()
  };
}
