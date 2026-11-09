import { describe, expect, it } from "vitest";
import {
  buildSystemPrompt,
  validateChatPayload,
  validateVoicePayload,
  wrapPcmAsWav,
  type ChatKnowledge,
} from "@/lib/chat-shared";

const knowledge: ChatKnowledge = {
  profile: { name: "Palak Tripathi", email: "palak09.learner@gmail.com", phone: "+91 7440608049" },
  items: [
    {
      kind: "skill",
      title: "Graphic Design",
      description: null,
      category: null,
      tags: null,
      link_url: null,
      github_url: null,
    },
    {
      kind: "project",
      title: "Real Published Project",
      description: "A real project Palak built.",
      category: null,
      tags: null,
      link_url: "https://example.com",
      github_url: null,
    },
  ],
};

describe("buildSystemPrompt", () => {
  it("grounds the assistant in published content only", () => {
    const prompt = buildSystemPrompt(knowledge, "Aarav");
    expect(prompt).toContain("Real Published Project");
    expect(prompt).toContain("Graphic Design");
    expect(prompt).toContain("palak09.learner@gmail.com");
  });

  it("uses the visitor's name and forbids inventing facts", () => {
    const prompt = buildSystemPrompt(knowledge, "Aarav");
    expect(prompt).toContain("The visitor's name is Aarav");
    expect(prompt).toContain("NEVER invent");
  });

  it("treats visitor messages as untrusted data", () => {
    const prompt = buildSystemPrompt(knowledge, null);
    expect(prompt).toContain("untrusted data");
  });
});

describe("validateChatPayload", () => {
  const msg = (role: "user" | "assistant", content = "hello") => ({ role, content });

  it("accepts a valid conversation with a name", () => {
    const ok = validateChatPayload({ name: "Aarav", messages: [msg("user")] });
    expect(ok).toEqual({ name: "Aarav", messages: [msg("user")] });
  });

  it("rejects oversized message content", () => {
    const long = "x".repeat(1001);
    expect(validateChatPayload({ messages: [msg("user", long)] })).toBeNull();
  });

  it("rejects more than 30 messages", () => {
    const many = Array.from({ length: 31 }, () => msg("user"));
    expect(validateChatPayload({ messages: many })).toBeNull();
  });

  it("rejects unknown roles and non-string content", () => {
    expect(validateChatPayload({ messages: [{ role: "system", content: "hi" }] })).toBeNull();
    expect(validateChatPayload({ messages: [{ role: "user", content: 5 }] })).toBeNull();
    expect(validateChatPayload({ messages: [] })).toBeNull();
  });

  it("caps an overlong name instead of failing it", () => {
    const ok = validateChatPayload({ name: "n".repeat(80), messages: [msg("user")] });
    expect(ok?.name).toHaveLength(40);
  });
});

describe("validateVoicePayload", () => {
  it("accepts short assistant text", () => {
    expect(validateVoicePayload({ text: "  Hi there!  " })).toBe("Hi there!");
  });

  it("rejects empty or overlong text", () => {
    expect(validateVoicePayload({ text: "   " })).toBeNull();
    expect(validateVoicePayload({ text: "x".repeat(801) })).toBeNull();
    expect(validateVoicePayload({ text: 5 })).toBeNull();
  });
});

describe("wrapPcmAsWav", () => {
  it("writes a 44-byte RIFF/WAVE header around PCM data", () => {
    const pcm = new Uint8Array(24000); // 0.5 s of mono 24 kHz 16-bit
    const wav = wrapPcmAsWav(pcm);
    expect(wav.byteLength).toBe(24044);
    expect(Buffer.from(wav.slice(0, 4)).toString("ascii")).toBe("RIFF");
    expect(Buffer.from(wav.slice(8, 12)).toString("ascii")).toBe("WAVE");
    expect(Buffer.from(wav.slice(36, 40)).toString("ascii")).toBe("data");
  });
});
