import { useCallback, useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Settings2,
  GripHorizontal,
} from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import portrait from "@/assets/palak-portrait.jpg.asset.json";
import { cn } from "@/lib/utils";
import { KnowledgeAdminModal } from "./KnowledgeAdminModal";

type ChatMsg = { id: number; role: "user" | "assistant"; content: string };
type Status = "idle" | "submitted" | "streaming";

const SUGGESTIONS = [
  "Who is Palak?",
  "Tell me about PRICORA-AI",
  "What was her role in Sentinel AI?",
  "What technologies does she work with?",
  "Is she available for internships?",
  "Tell me about her creative side & singing",
  "How can I contact her?",
];

const WELCOME =
  "Hi there! I'm Palak's portfolio assistant ✨ Ask me anything about her skills, projects (like PRICORA-AI and Sentinel AI), education, or how to reach her!";

let nextId = 1;

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [voiceOn, setVoiceOn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [showKnowledgeAdmin, setShowKnowledgeAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Position & Drag state for 100% Draggable AI Chat Widget
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const chatPanelRef = useRef<HTMLDivElement | null>(null);

  // Window drag event listeners for mouse and touch
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const panelWidth = chatPanelRef.current?.offsetWidth || 380;
      const panelHeight = chatPanelRef.current?.offsetHeight || 550;
      const maxX = Math.max(10, window.innerWidth - panelWidth - 10);
      const maxY = Math.max(10, window.innerHeight - panelHeight - 10);
      const newX = Math.max(10, Math.min(e.clientX - dragOffsetRef.current.x, maxX));
      const newY = Math.max(10, Math.min(e.clientY - dragOffsetRef.current.y, maxY));
      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const panelWidth = chatPanelRef.current?.offsetWidth || 380;
      const panelHeight = chatPanelRef.current?.offsetHeight || 550;
      const maxX = Math.max(10, window.innerWidth - panelWidth - 10);
      const maxY = Math.max(10, window.innerHeight - panelHeight - 10);
      const newX = Math.max(10, Math.min(touch.clientX - dragOffsetRef.current.x, maxX));
      const newY = Math.max(10, Math.min(touch.clientY - dragOffsetRef.current.y, maxY));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleStartDrag = (clientX: number, clientY: number) => {
    const panel = chatPanelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    dragOffsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    setIsDragging(true);
  };

  const abortRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const lastUserRef = useRef<string | null>(null);

  // Check owner status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get("admin") === "true" ||
        urlParams.get("edit") === "true" ||
        localStorage.getItem("diary_owner") === "true"
      ) {
        setIsOwner(true);
      }
    }
  }, []);

  const stopAudio = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text: string) => {
      stopAudio();
      const cleanText = text
        .replace(/[*#_`~[\]]/g, "")
        .slice(0, 700)
        .trim();
      if (!cleanText) return;

      try {
        const res = await fetch("/api/public/chat-voice", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text: cleanText }),
        });
        if (res.ok) {
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = URL.createObjectURL(await res.blob());
          const audio = new Audio(urlRef.current);
          audioRef.current = audio;
          audio.onended = () => setSpeaking(false);
          audio.onerror = () => setSpeaking(false);
          await audio.play();
          setSpeaking(true);
          return;
        }
      } catch {
        /* Fall back to Web Speech API */
      }

      // High-quality natural browser speech synthesis fallback
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.rate = 1.0;
          utterance.pitch = 1.05;
          const voices = window.speechSynthesis.getVoices();
          const preferred =
            voices.find(
              (v) =>
                v.lang.startsWith("en") &&
                (v.name.includes("Google") ||
                  v.name.includes("Natural") ||
                  v.name.includes("Samantha") ||
                  v.name.includes("Jenny")),
            ) || voices.find((v) => v.lang.startsWith("en"));
          if (preferred) utterance.voice = preferred;
          utterance.onstart = () => setSpeaking(true);
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => setSpeaking(false);
          window.speechSynthesis.speak(utterance);
        } catch {
          setSpeaking(false);
        }
      }
    },
    [stopAudio],
  );

  const toggleVoice = useCallback(() => {
    setVoiceOn((on) => {
      if (on) stopAudio();
      return !on;
    });
  }, [stopAudio]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      stopAudio();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [stopAudio],
  );

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    stopAudio();
    setStatus("idle");
    setError(null);
    setMessages([{ id: nextId++, role: "assistant", content: WELCOME }]);
  }, [stopAudio]);

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || status !== "idle") return;
      setError(null);
      stopAudio();

      // Check if visitor is introducing their name e.g. "I'm Alex" or "My name is Sarah"
      const nameMatch = clean.match(/(?:my name is|i am|i'm|this is)\s+([a-zA-Z]+)/i);
      if (nameMatch && nameMatch[1]) {
        setName(nameMatch[1]);
      }

      lastUserRef.current = clean;
      const history = messages.map(({ role, content }) => ({ role, content }));
      setMessages((m) => [...m, { id: nextId++, role: "user", content: clean }]);
      setStatus("submitted");

      const assistantId = nextId++;
      let first = true;
      const append = (delta: string) => {
        if (first) {
          first = false;
          setStatus("streaming");
        }
        setMessages((m) => {
          const existing = m.find((x) => x.id === assistantId);
          if (existing)
            return m.map((x) => (x.id === assistantId ? { ...x, content: x.content + delta } : x));
          return [...m, { id: assistantId, role: "assistant" as const, content: delta }];
        });
      };

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/public/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name,
            messages: [...history, { role: "user", content: clean }].slice(-20),
          }),
          signal: controller.signal,
        });

        if (res.status === 429) {
          setStatus("idle");
          setError("You're chatting a little too quickly — take a short breath and try again 🌷");
          return;
        }
        if (!res.ok || !res.body) {
          setStatus("idle");
          setError("The assistant is taking a short break — please try again in a moment.");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let full = "";

        const handleEvent = (block: string) => {
          for (const line of block.split("\n")) {
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const payload = JSON.parse(data);
              if (payload.type === "response.output_text.delta" && payload.delta) {
                full += payload.delta;
                append(payload.delta);
              }
            } catch {
              // ignore parse errors
            }
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let idx: number;
          while ((idx = buffer.indexOf("\n\n")) >= 0) {
            const block = buffer.slice(0, idx);
            buffer = buffer.slice(idx + 2);
            handleEvent(block);
          }
        }
        if (buffer.trim()) handleEvent(buffer);

        setStatus("idle");
        if (full.trim() && voiceOn) {
          void speak(full);
        } else if (!full.trim() && !error) {
          setError("No reply came back — please try asking again.");
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          setStatus("idle");
          setError("Network hiccup — check your connection and try again.");
        } else {
          setStatus("idle");
        }
      } finally {
        abortRef.current = null;
      }
    },
    [messages, name, speak, status, stopAudio, voiceOn, error],
  );

  const retry = useCallback(() => {
    if (!lastUserRef.current) return;
    setMessages((m) => (m.at(-1)?.role === "user" ? m.slice(0, -1) : m));
    const text = lastUserRef.current;
    lastUserRef.current = null;
    void send(text);
  }, [send]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStatus("idle");
  }, []);

  // Drag state for floating button when closed
  const [btnPosition, setBtnPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDraggingBtn, setIsDraggingBtn] = useState(false);
  const btnDragStartRef = useRef({ x: 0, y: 0, startX: 0, startY: 0, hasMoved: false });
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isDraggingBtn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const btnWidth = btnRef.current?.offsetWidth || 180;
      const btnHeight = btnRef.current?.offsetHeight || 50;
      const dx = Math.abs(e.clientX - btnDragStartRef.current.startX);
      const dy = Math.abs(e.clientY - btnDragStartRef.current.startY);
      if (dx > 4 || dy > 4) {
        btnDragStartRef.current.hasMoved = true;
      }
      const maxX = Math.max(10, window.innerWidth - btnWidth - 10);
      const maxY = Math.max(10, window.innerHeight - btnHeight - 10);
      const newX = Math.max(10, Math.min(e.clientX - btnDragStartRef.current.x, maxX));
      const newY = Math.max(10, Math.min(e.clientY - btnDragStartRef.current.y, maxY));
      setBtnPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const btnWidth = btnRef.current?.offsetWidth || 180;
      const btnHeight = btnRef.current?.offsetHeight || 50;
      const dx = Math.abs(t.clientX - btnDragStartRef.current.startX);
      const dy = Math.abs(t.clientY - btnDragStartRef.current.startY);
      if (dx > 4 || dy > 4) {
        btnDragStartRef.current.hasMoved = true;
      }
      const maxX = Math.max(10, window.innerWidth - btnWidth - 10);
      const maxY = Math.max(10, window.innerHeight - btnHeight - 10);
      const newX = Math.max(10, Math.min(t.clientX - btnDragStartRef.current.x, maxX));
      const newY = Math.max(10, Math.min(t.clientY - btnDragStartRef.current.y, maxY));
      setBtnPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => setIsDraggingBtn(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDraggingBtn]);

  const handleStartBtnDrag = (clientX: number, clientY: number) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btnDragStartRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      startX: clientX,
      startY: clientY,
      hasMoved: false,
    };
    setIsDraggingBtn(true);
  };

  const openChat = useCallback(() => {
    if (btnDragStartRef.current.hasMoved) {
      btnDragStartRef.current.hasMoved = false;
      return;
    }
    setOpen(true);
    if (messages.length === 0) {
      setMessages([{ id: nextId++, role: "assistant", content: WELCOME }]);
    }
  }, [messages.length]);

  if (!open) {
    return (
      <button
        ref={btnRef}
        onClick={openChat}
        onMouseDown={(e) => handleStartBtnDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handleStartBtnDrag(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        style={
          btnPosition
            ? {
                left: `${btnPosition.x}px`,
                top: `${btnPosition.y}px`,
                right: "auto",
                bottom: "auto",
              }
            : undefined
        }
        aria-label="Chat with Palak's assistant (Drag anywhere)"
        title="Click to chat or drag anywhere across the screen"
        className={`group fixed z-50 flex h-12 sm:h-14 items-center gap-2 rounded-full bg-brand px-4 sm:px-5 font-semibold text-primary-foreground shadow-glow transition cursor-grab active:cursor-grabbing select-none hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 ${
          !btnPosition ? "top-20 right-4 sm:top-24 sm:right-6" : ""
        } ${isDraggingBtn ? "scale-105 shadow-2xl ring-2 ring-cyan-400" : ""}`}
      >
        <GripHorizontal className="h-3.5 w-3.5 opacity-60 hidden sm:inline" />
        <MessageCircle className="h-5 w-5" />
        <span className="font-display text-xs sm:text-sm">Chat with Palak ✨</span>
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cyan" />
        </span>
      </button>
    );
  }

  const showSuggestions = messages.length <= 2 && status === "idle";

  return (
    <>
      <div
        ref={chatPanelRef}
        style={
          position
            ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                right: "auto",
                bottom: "auto",
              }
            : undefined
        }
        className={`fixed z-50 flex h-[min(640px,85vh)] animate-rise flex-col overflow-hidden rounded-3xl glass shadow-glow sm:w-[min(420px,calc(100vw-2.5rem))] ${
          !position ? "top-20 right-2 sm:top-24 sm:right-6" : ""
        } ${isDragging ? "shadow-2xl scale-[1.01] transition-none ring-2 ring-cyan-400/50" : "transition-transform"}`}
      >
        {/* Header — 100% Draggable Handle */}
        <div
          onMouseDown={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            handleStartDrag(e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            if (e.touches.length > 0) {
              handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          className="relative flex items-center gap-3 bg-brand px-4 py-3 text-primary-foreground cursor-grab active:cursor-grabbing select-none"
          title="Click and drag to move anywhere on screen"
        >
          {/* Subtle Drag Handle Grip */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center justify-center opacity-60">
            <GripHorizontal className="h-3 w-8" />
          </div>
          <img
            src={portrait.url}
            alt=""
            className="h-10 w-10 rounded-full border-2 border-primary-foreground/40 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold leading-tight flex items-center gap-1.5">
              <span>Palak's Assistant</span>
              <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-0.2 text-[10px] text-cyan-200">
                AI Powered
              </span>
            </p>
            <p className="text-xs opacity-85">
              {speaking
                ? "Speaking…"
                : status !== "idle"
                  ? "Typing…"
                  : "Ask me anything about Palak"}
            </p>
          </div>

          {/* Reset / New Chat */}
          <button
            onClick={resetChat}
            aria-label="Start new chat"
            className="rounded-full bg-primary-foreground/15 p-2 transition hover:bg-primary-foreground/25"
            title="Start fresh conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Owner Knowledge Manager */}
          {isOwner && (
            <button
              onClick={() => setShowKnowledgeAdmin(true)}
              aria-label="Edit Knowledge Base"
              className="rounded-full bg-primary-foreground/15 p-2 transition hover:bg-primary-foreground/25"
              title="Edit AI Knowledge Base"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          )}

          {/* Voice Toggle */}
          <button
            onClick={toggleVoice}
            aria-label={voiceOn ? "Mute assistant voice" : "Unmute assistant voice"}
            className="rounded-full bg-primary-foreground/15 p-2 transition hover:bg-primary-foreground/25"
            title={voiceOn ? "Voice enabled" : "Voice muted"}
          >
            {voiceOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Close Chat */}
          <button
            onClick={() => {
              stop();
              stopAudio();
              setOpen(false);
            }}
            aria-label="Close chat"
            className="rounded-full bg-primary-foreground/15 p-2 transition hover:bg-primary-foreground/25"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Transcript */}
        <Conversation className="min-h-0 flex-1">
          <ConversationContent className="px-4 py-4">
            {messages.map((m) => (
              <Message key={m.id} from={m.role} className="mb-3">
                <MessageContent
                  className={cn(
                    "text-sm",
                    m.role === "user" &&
                      "group-[.is-user]:rounded-2xl group-[.is-user]:bg-primary group-[.is-user]:px-4 group-[.is-user]:text-primary-foreground",
                  )}
                >
                  <MessageResponse className="text-sm leading-relaxed whitespace-pre-line">
                    {m.content}
                  </MessageResponse>
                  {m.role === "assistant" && (
                    <button
                      type="button"
                      onClick={() => void speak(m.content)}
                      aria-label="Listen to voice"
                      title="Listen aloud"
                      className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary cursor-pointer"
                    >
                      <Volume2 className="h-3 w-3" />
                      <span>Speak</span>
                    </button>
                  )}
                </MessageContent>
              </Message>
            ))}
            {status === "submitted" && (
              <Message from="assistant" className="mb-3">
                <MessageContent>
                  <Shimmer className="text-sm text-muted-foreground">
                    Palak's assistant is thinking…
                  </Shimmer>
                </MessageContent>
              </Message>
            )}
            {error && (
              <div className="mt-1 flex flex-wrap items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                <span>{error}</span>
                {lastUserRef.current && (
                  <button
                    onClick={retry}
                    className="inline-flex items-center gap-1 font-semibold underline"
                  >
                    <RotateCcw className="h-3 w-3" /> Retry
                  </button>
                )}
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton className="rounded-full bg-brand text-primary-foreground" />
        </Conversation>

        {/* Composer */}
        <div className="border-t border-border/60 bg-card/70 p-3">
          {showSuggestions && (
            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => void send(s)}
                  className="whitespace-nowrap rounded-full border border-border bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition hover:bg-primary hover:text-primary-foreground shrink-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <PromptInput
            onSubmit={(message) => {
              const text = typeof message.text === "string" ? message.text : "";
              if (text) void send(text);
            }}
            className="rounded-2xl border-border"
          >
            <PromptInputTextarea
              placeholder={
                name
                  ? `Hi ${name}! Ask me anything about Palak…`
                  : "Ask anything about Palak's skills, projects…"
              }
              className="min-h-10 text-sm"
              autoFocus
            />
            <PromptInputFooter className="justify-between">
              <span className="text-[11px] text-muted-foreground">
                Truthful answers based on Palak's portfolio
              </span>
              <PromptInputSubmit
                status={status === "idle" ? "ready" : status}
                onStop={stop}
                disabled={status !== "idle"}
                className="bg-brand text-primary-foreground"
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>

      {/* Owner Knowledge Base Editor Modal */}
      {showKnowledgeAdmin && <KnowledgeAdminModal onClose={() => setShowKnowledgeAdmin(false)} />}
    </>
  );
}
