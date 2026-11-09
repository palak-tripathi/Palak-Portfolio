import { useState, useEffect } from "react";
import {
  Calendar,
  Feather,
  PlusCircle,
  Sparkles,
  MapPin,
  Heart,
  BookOpen,
  Code2,
  Laptop,
  Terminal,
  Coffee,
  Play,
  RotateCcw,
  CheckCircle2,
  ZoomIn,
  Flame,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  isNightMode?: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

const CODE_SNIPPET = `// Palak's Creative Lab ✨
const developer = {
  name: "Palak Tripathi",
  discipline: "CSBS @ Engineering",
  passions: ["AI & Full Stack", "Acoustics", "Art"],
  status: "Ready to ship 🚀"
};

function buildNextGen() {
  return "Turning ideas into living software ♡";
}
buildNextGen();`;

export function StoryChapter({
  chapter,
  isNightMode = false,
  onSelectItem,
  onOpenAdmin,
}: ChapterProps) {
  const publishedItems = chapter.items.filter((i) => i.published);

  // Active code runner state for live animated interactive terminal
  const [isRunning, setIsRunning] = useState(false);
  const [typedChars, setTypedChars] = useState(CODE_SNIPPET.length);
  const [terminalLog, setTerminalLog] = useState<string[]>([
    "PalakOS v2.4 initialized.",
    "[Compiled in 12ms] ✨ PRICORA-AI & Magical Diary live on :3000",
    "Status: 100% production ready ♡",
  ]);

  const handleRunCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning(true);
    setTerminalLog(["Compiling Palak's creative engine..."]);

    setTimeout(() => {
      setTerminalLog((prev) => [...prev, "Optimizing neural scrapers & aesthetic UI layouts..."]);
    }, 400);

    setTimeout(() => {
      setTerminalLog((prev) => [
        ...prev,
        "✨ [SUCCESS] Output: 'Turning ideas into living software ♡'",
        "🚀 18/18 tests passed · Ready for GitHub push",
      ]);
      setIsRunning(false);
    }, 900);
  };

  const handleResetCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTerminalLog([
      "PalakOS v2.4 initialized.",
      "[Compiled in 12ms] ✨ PRICORA-AI & Magical Diary live on :3000",
      "Status: 100% production ready ♡",
    ]);
  };

  const primaryItem = publishedItems[0] || {
    id: "story-inception-workspace",
    title: "Where My Journey Began · First Code Workspace",
    caption:
      "A cozy laptop desk glowing with late-night lines of code. The moment console.log('Hello, World!') ran, a software builder was born.",
    description:
      "Palak's inception into Computer Science and Business Systems: combining creative curiosity with full-stack engineering logic.",
    date: "First Code Milestone",
    location: "Studio Desk",
    category: "story",
    mediaType: "image",
    mediaUrl: "/assets/laptop-desk.jpg",
    aspectRatio: "landscape",
    frameStyle: "polaroid",
    sortOrder: 1,
    published: true,
    featured: true,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[620px] select-none relative overflow-hidden">
      {/* Visual Ambient Floaties */}
      <div className="absolute top-2 left-6 text-base animate-bounce pointer-events-none opacity-80 z-10">
        🦋
      </div>
      <div className="absolute top-3 right-10 text-sm animate-pulse pointer-events-none text-amber-400 z-10">
        ★
      </div>
      <div className="absolute bottom-5 left-1/3 text-xs animate-ping pointer-events-none text-rose-400 z-10">
        ✦
      </div>
      <div className="absolute bottom-4 right-1/4 text-sm animate-bounce pointer-events-none opacity-70 z-10">
        🌿
      </div>

      {/* ========================================================= */}
      {/* LEFT PAGE: Real Laptop Workspace with Animated Live Code  */}
      {/* ========================================================= */}
      <div
        className={`relative border-b lg:border-b-0 lg:border-r p-4 sm:p-7 flex flex-col justify-between ${
          isNightMode ? "border-indigo-500/30" : "border-amber-900/15"
        }`}
      >
        <div>
          {/* Header Tag & Airmail Stamp */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-serif font-bold uppercase tracking-[0.25em] ${
                isNightMode
                  ? "bg-indigo-950/80 border border-indigo-400/40 text-cyan-300"
                  : "bg-pink-100/90 border border-pink-300/60 text-pink-900"
              }`}
            >
              <Feather className="h-3 w-3" /> Chapter I • My Story
            </span>

            {/* Vintage Airmail Stamp */}
            <div className="flex items-center gap-1 rounded-xs border border-dashed border-rose-400 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 shadow-xs rotate-2">
              <span className="text-[8px] font-mono font-bold text-rose-800 dark:text-rose-200">
                INCEPTION 2024
              </span>
              <span className="text-xs">💻</span>
            </div>
          </div>

          {/* Title & Subtitle: Text-less, Punchy Aesthetic */}
          <div className="mt-2.5 flex items-baseline justify-between flex-wrap gap-2">
            <h2
              className={`font-cursive text-3xl sm:text-4xl font-extrabold ${
                isNightMode
                  ? "text-amber-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.6)]"
                  : "text-stone-900"
              }`}
            >
              Where My Journey Began ♡
            </h2>
            <span className="font-handwriting text-xs text-rose-600 dark:text-cyan-300 font-bold">
              "late nights • hot chai • live code"
            </span>
          </div>

          {/* ======================================================== */}
          {/* REAL LAPTOP PHOTO FRAME WITH LIVE ANIMATED CODE RUNNER  */}
          {/* ======================================================== */}
          <div className="relative mt-4">
            {/* Washi Tape Strip */}
            <div className="diary-washi-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 z-20 shadow-xs rotate-1" />

            <div
              className={`group relative rounded-2xl border-2 p-3 pb-4 shadow-xl transition-all duration-300 hover:shadow-2xl ${
                isNightMode
                  ? "border-indigo-400/30 bg-[#0e1626] text-slate-100"
                  : "border-pink-200/90 bg-[#fffdfa] text-stone-900"
              }`}
            >
              {/* Cute Corner Push-pin */}
              <div className="absolute top-2 right-2 text-xs z-20">📌</div>

              {/* Realistic Laptop Mockup Frame */}
              <div className="relative rounded-xl overflow-hidden border border-stone-800/80 bg-stone-950 shadow-2xl">
                {/* Real Desk Photo Header Strip */}
                <div className="relative h-28 sm:h-32 w-full overflow-hidden">
                  <img
                    src="/assets/laptop-desk.jpg"
                    alt="Cozy coding desk with laptop and coffee"
                    className="h-full w-full object-cover brightness-75 group-hover:scale-102 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  {/* Floating Badges over Real Photo */}
                  <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-mono text-cyan-300 backdrop-blur-xs border border-white/20 flex items-center gap-1">
                      <Laptop className="h-3 w-3" /> MacBook Studio
                    </span>
                    <span className="rounded-full bg-rose-500/80 px-2 py-0.5 text-[10px] font-mono text-white backdrop-blur-xs">
                      Live IDE
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-amber-200">
                    <span className="font-handwriting font-bold text-sm text-white drop-shadow">
                      ☕ Chai & Logic Desk
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectItem(primaryItem)}
                      className="rounded-full bg-white/90 hover:bg-white text-stone-900 px-2 py-0.5 text-[10px] font-serif font-bold shadow flex items-center gap-1 transition cursor-pointer"
                    >
                      <ZoomIn className="h-2.5 w-2.5 text-pink-600" /> Zoom Workspace
                    </button>
                  </div>
                </div>

                {/* Animated Interactive Code Editor Screen Inside Laptop */}
                <div className="p-3 bg-[#0a0f1d] border-t border-white/10">
                  {/* Editor Window Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="ml-2 font-mono text-[10px] text-stone-400">
                        palak-journey.ts
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleRunCode}
                        disabled={isRunning}
                        title="Execute Code"
                        className="rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-2 py-0.5 text-[10px] font-mono font-bold border border-emerald-500/40 flex items-center gap-1 transition cursor-pointer"
                      >
                        <Play className="h-2.5 w-2.5 fill-current" />
                        {isRunning ? "Running..." : "Run ▶"}
                      </button>
                      <button
                        type="button"
                        onClick={handleResetCode}
                        title="Reset Terminal"
                        className="rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 p-1 transition cursor-pointer"
                      >
                        <RotateCcw className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Code Block with Syntax Tokens */}
                  <div className="font-mono text-[11px] sm:text-[11.5px] leading-relaxed text-slate-200">
                    <div>
                      <span className="text-pink-400">const</span> developer = {"{"}
                    </div>
                    <div className="pl-3">
                      name: <span className="text-amber-300">"Palak Tripathi"</span>,
                    </div>
                    <div className="pl-3">
                      craft: [<span className="text-emerald-300">"AI"</span>,{" "}
                      <span className="text-cyan-300">"Full-Stack"</span>,{" "}
                      <span className="text-purple-300">"Art"</span>],
                    </div>
                    <div className="pl-3">
                      status: <span className="text-emerald-400">"Ready to build 🚀"</span>
                    </div>
                    <div>{"}"};</div>
                  </div>

                  {/* Live Terminal Output Tray */}
                  <div className="mt-2.5 rounded-lg bg-black/60 p-2 border border-white/5 font-mono text-[10px] text-cyan-200">
                    <div className="flex items-center gap-1 text-[9px] text-stone-400 uppercase tracking-wider mb-1">
                      <Terminal className="h-2.5 w-2.5 text-cyan-400" />
                      <span>Live Terminal Output</span>
                    </div>
                    {terminalLog.map((log, i) => (
                      <div key={i} className="flex items-start gap-1 leading-snug">
                        <span className="text-emerald-400">❯</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1 mt-0.5 text-cyan-400 animate-pulse">
                      <span>❯</span>
                      <span className="inline-block w-1.5 h-3 bg-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Desk Props Row */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#080d19] border-t border-white/5 text-[10px] font-mono text-stone-400">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Coffee className="h-3 w-3" /> Steaming Chai
                  </span>
                  <span className="flex items-center gap-1 text-pink-300 font-serif font-bold">
                    👩‍💻 Girl Coder Mode
                  </span>
                  <span className="flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> All Tests Green
                  </span>
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-2 text-center">
                <span className="font-handwriting text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200">
                  "Late night epiphanies, first terminal output, pure magic ♡"
                </span>
              </div>
            </div>
          </div>

          {/* Creative Brainstorming Sticky Note — Visual & Text-Less */}
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            {/* Sticky Note 1: The Core Philosophy */}
            <div
              className={`rounded-xl border p-2.5 shadow-xs transform -rotate-1 hover:rotate-0 transition duration-200 ${
                isNightMode
                  ? "border-amber-400/40 bg-amber-950/60 text-amber-100"
                  : "border-amber-300 bg-[#fefce8] text-stone-800"
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <span>💡</span> BRAINSTORMING
              </div>
              <p className="font-handwriting text-xs sm:text-sm font-bold mt-1 leading-tight">
                "What if code wasn't just cold logic, but had soul, art, and music?"
              </p>
            </div>

            {/* Sticky Note 2: Tech Milestones Flow */}
            <div
              className={`rounded-xl border p-2.5 shadow-xs transform rotate-1 hover:rotate-0 transition duration-200 ${
                isNightMode
                  ? "border-teal-400/40 bg-teal-950/60 text-teal-100"
                  : "border-teal-200 bg-[#f0fdf4] text-stone-800"
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1">
                <span>🚀</span> SHIP PROTOCOL
              </div>
              <p className="font-handwriting text-xs sm:text-sm font-bold mt-1 leading-tight">
                Idea ➔ Architecture ➔ Full-Stack Polish ➔ Live Deployment ✨
              </p>
            </div>
          </div>
        </div>

        {/* Left Page Footer */}
        <div
          className={`mt-3 pt-2 flex items-center justify-between text-xs font-serif border-t ${
            isNightMode
              ? "border-indigo-500/20 text-slate-400"
              : "border-amber-900/10 text-stone-500"
          }`}
        >
          <span>Palak's Story Chronicles</span>
          <span className="font-cursive text-sm text-rose-500 font-bold">
            "from hello world to production ♡"
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PAGE: Densely Packed Visual Story & Project Badges  */}
      {/* ========================================================= */}
      <div className="relative p-4 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Right Page Banner */}
          <div className="flex items-center justify-between mb-2.5">
            <h3
              className={`font-serif text-base sm:text-lg font-bold flex items-center gap-2 ${
                isNightMode ? "text-slate-100" : "text-stone-900"
              }`}
            >
              <BookOpen className={`h-4 w-4 ${isNightMode ? "text-cyan-300" : "text-pink-600"}`} />
              Visual Timeline & Project Milestones
            </h3>

            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-serif font-bold transition hover:scale-105 ${
                isNightMode
                  ? "border border-cyan-400/50 bg-cyan-950/60 text-cyan-300"
                  : "border border-pink-300/80 bg-pink-100/90 text-pink-900"
              }`}
            >
              <PlusCircle className="h-3 w-3" /> Add Card
            </button>
          </div>

          {/* Densely Packed Milestone Cards with Unique Real Photos */}
          <div className="space-y-3 max-h-[475px] overflow-y-auto pr-1">
            {publishedItems.slice(1).map((item, idx) => {
              const borderColors = [
                isNightMode ? "border-cyan-400/30" : "border-pink-200/90",
                isNightMode ? "border-teal-400/30" : "border-teal-200/90",
                isNightMode ? "border-amber-400/30" : "border-amber-200/90",
              ];
              const bColor = borderColors[idx % borderColors.length];

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`group relative rounded-2xl border-2 p-3 shadow-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg ${bColor} ${
                    isNightMode
                      ? "bg-slate-900/80 text-slate-100 hover:border-cyan-400/60"
                      : "bg-[#fffdfa] text-stone-900 hover:border-pink-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Small Polaroid Thumbnail with Real Photo */}
                    {item.mediaUrl && (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-white dark:border-stone-800 shadow-md shrink-0 bg-stone-100 dark:bg-stone-800">
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <ZoomIn className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Milestone Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-mono text-[10px] font-bold text-pink-600 dark:text-cyan-300 flex items-center gap-1">
                          <Calendar className="h-2.5 w-2.5" />
                          {item.date || "Milestone"}
                        </span>
                        {item.location && (
                          <span className="text-[10px] text-stone-500 flex items-center gap-0.5 truncate">
                            <MapPin className="h-2.5 w-2.5 text-rose-500" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-sm sm:text-base font-bold group-hover:text-pink-600 transition truncate">
                        {item.title}
                      </h4>

                      {item.caption && (
                        <p className="font-handwriting text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5 line-clamp-2">
                          "{item.caption}"
                        </p>
                      )}

                      {/* Tag Pills */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-stone-100 dark:bg-stone-800 px-2 py-0.2 text-[9px] font-mono text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Interactive Creative Visual Badges Strip */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-1.5 text-xs">
              <span className="rounded-lg bg-pink-100/80 dark:bg-pink-950/60 px-2.5 py-1 font-mono text-[10px] font-bold text-pink-800 dark:text-pink-200 border border-pink-300/50">
                ⚛️ React 19 + TypeScript
              </span>
              <span className="rounded-lg bg-cyan-100/80 dark:bg-cyan-950/60 px-2.5 py-1 font-mono text-[10px] font-bold text-cyan-800 dark:text-cyan-200 border border-cyan-300/50">
                🧠 PyTorch & AI Scrapers
              </span>
              <span className="rounded-lg bg-amber-100/80 dark:bg-amber-950/60 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-800 dark:text-amber-200 border border-amber-300/50">
                🎨 Pinterest Aesthetic
              </span>
            </div>
          </div>
        </div>

        {/* Right Page Closing Quote */}
        <div
          className={`mt-3 pt-2 text-center border-t flex items-center justify-between ${
            isNightMode ? "border-indigo-500/20" : "border-amber-900/10"
          }`}
        >
          <span className="text-xs">🌸</span>
          <p
            className={`font-handwriting text-sm sm:text-base font-bold ${
              isNightMode ? "text-cyan-200" : "text-stone-800"
            }`}
          >
            "every bug solved, every line written, every step forward ♡"
          </p>
          <span className="text-xs">★</span>
        </div>
      </div>
    </div>
  );
}

export default StoryChapter;
