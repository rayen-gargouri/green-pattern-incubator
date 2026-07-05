import { NextResponse } from "next/server";
import { runAIText } from "@/lib/ai/ai-client";
import { buildMentorMockResponse, type MentorChatPayloadMessage } from "@/lib/chatbot/mentor-responses";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

function sanitizeMessage(message: unknown): MentorChatPayloadMessage | null {
  if (!message || typeof message !== "object") return null;
  const record = message as Record<string, unknown>;
  const role = record.role === "assistant" ? "assistant" : record.role === "user" ? "user" : null;
  const content = typeof record.content === "string" ? record.content.replace(/\s+/g, " ").trim() : "";

  if (!role || !content) return null;

  return {
    role,
    content: content.slice(0, MAX_MESSAGE_LENGTH)
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: unknown[] };
    const messages = Array.isArray(body.messages)
      ? body.messages.map(sanitizeMessage).filter((message): message is MentorChatPayloadMessage => Boolean(message))
      : [];
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json({ success: false, error: "Message utilisateur manquant." }, { status: 400 });
    }

    const conversation = messages
      .slice(-MAX_MESSAGES)
      .map((message) => `${message.role === "user" ? "Entrepreneur" : "Mentor IA"}: ${message.content}`)
      .join("\n");
    const fallback = buildMentorMockResponse(latestUserMessage.content);
    const result = await runAIText({
      system:
        "Tu es Mentor IA, un assistant professionnel pour Green Pattern Incubator. Tu aides un jeune entrepreneur a structurer un projet vert. Reponds en francais, de facon courte, concrete et actionnable. Ne donne pas de conseils juridiques, medicaux ou financiers personnalises; propose des pistes generales et invite a verifier avec un expert.",
      prompt: `Conversation recente:\n${conversation}\n\nReponds au dernier message avec 3 a 8 lignes utiles.`,
      fallback
    });

    return NextResponse.json({
      success: true,
      reply: result.output,
      provider: result.provider,
      demoMode: result.provider === "mock",
      message: result.message
    });
  } catch (error) {
    console.error("Mentor IA route error", error);
    return NextResponse.json(
      { success: false, error: "Impossible de repondre pour le moment." },
      { status: 500 }
    );
  }
}
