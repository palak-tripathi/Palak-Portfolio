import { createFileRoute } from "@tanstack/react-router";
import { CHAT_LIMITS, clientIp, createRateLimiter, validateChatPayload } from "@/lib/chat-shared";
import { streamAIChat } from "@/lib/chat-service";

const rateLimit = createRateLimiter(40, 5 * 60 * 1000); // 40 messages per 5 minutes per IP

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!rateLimit(clientIp(request))) {
          return Response.json(
            { error: "You're sending messages a little too quickly — please wait a moment." },
            { status: 429 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }
        const payload = validateChatPayload(body);
        if (!payload) {
          return Response.json({ error: "Invalid chat payload" }, { status: 400 });
        }

        try {
          const history = payload.messages.slice(-CHAT_LIMITS.maxHistorySent);
          const stream = await streamAIChat(history, payload.name);

          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream; charset=utf-8",
              "Cache-Control": "no-cache, no-transform",
              Connection: "keep-alive",
            },
          });
        } catch (error) {
          console.error("[chat] unexpected error:", error);
          return Response.json(
            { error: "The AI assistant is taking a short break — please try again in a moment." },
            { status: 502 },
          );
        }
      },
    },
  },
});
