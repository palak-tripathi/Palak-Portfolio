# Architecture decisions

- Shared PortfolioExperience owns the session opening, intro-playback context and chat visibility around the route outlet; keep contact destinations in the client-safe portfolio-experience module. Countdown exit starts muted intro playback; chat mounts only after exit. Why: one lifecycle prevents overlays and browser autoplay restrictions must not block the visual transition.

- Portfolio chatbot runs as public server routes `src/routes/api/public/chat.ts` (streamed text) and `chat-voice.ts` (TTS); logic lives in the client-safe `src/lib/chat-shared.ts` (knowledge prompt, validation, rate limiting). Why: raw SSE streaming and anonymous visitors need server routes, and route files ship to the browser so shared code must stay secret-free.
- The chatbot is grounded only in `site_profile` + `published` rows from `items`, read with the publishable client; it must never see drafts or admin data, and must refuse to invent facts. Why: visitors may only see published content.
- Chat history is session-only (component state, one conversation, no threads, no DB persistence). Why: the user chose in-session history for a visitor assistant.
- Chat model `openai/gpt-6-astra` (Responses) and voice model `google/gemini-3.1-flash-tts-preview` (prebuilt voice "Leda") use the configured AI gateway integration; Gemini TTS may return raw PCM that gets wrapped into WAV by `wrapPcmAsWav`. Keep slugs in sync with `src/ai-gateway.types.ts`.
