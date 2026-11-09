import { createFileRoute } from "@tanstack/react-router";
import { GatewayError, generateSpeech } from "@lovable.dev/ai-gateway";
import {
  VOICE_MODEL,
  VOICE_NAME,
  clientIp,
  createRateLimiter,
  isPlayableAudio,
  validateVoicePayload,
  wrapPcmAsWav,
} from "@/lib/chat-shared";

const rateLimit = createRateLimiter(40, 5 * 60 * 1000); // 40 voice replies per 5 minutes per IP

export const Route = createFileRoute("/api/public/chat-voice")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!rateLimit(clientIp(request))) {
          return Response.json(
            { error: "Too many voice requests — please wait a few seconds." },
            { status: 429 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }
        const text = validateVoicePayload(body);
        if (!text) {
          return Response.json({ error: "Invalid voice payload" }, { status: 400 });
        }

        try {
          const binary = await generateSpeech({
            model: VOICE_MODEL,
            contents: [{ role: "user", parts: [{ text }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } } },
            },
          });

          if (isPlayableAudio(binary.contentType)) {
            return binary.toResponse({ headers: { "cache-control": "no-store" } });
          }
          // Raw PCM (e.g. audio/L16 or audio/pcm) — wrap into a WAV container.
          const blob = await binary.blob();
          const pcm = new Uint8Array(await blob.arrayBuffer());
          return new Response(wrapPcmAsWav(pcm), {
            headers: { "content-type": "audio/wav", "cache-control": "no-store" },
          });
        } catch (error) {
          if (error instanceof GatewayError) {
            console.error(
              "[chat-voice] gateway error:",
              error.code,
              error.httpStatus,
              error.message,
            );
          } else {
            console.error("[chat-voice] unexpected error:", error);
          }
          return Response.json({ error: "Voice is briefly unavailable" }, { status: 502 });
        }
      },
    },
  },
});
