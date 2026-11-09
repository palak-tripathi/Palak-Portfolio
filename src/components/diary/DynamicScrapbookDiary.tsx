import { useState, useEffect } from "react";
import {
  Sparkles,
  Terminal,
  Play,
  RotateCcw,
  ZoomIn,
  Music,
  MapPin,
  Compass,
  Palette,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Volume2,
  VolumeX,
  Coffee,
  Heart,
  Disc,
} from "lucide-react";
import {
  DIARY_CONFIG,
  type DiaryPolaroidConfig,
  type DiarySectionConfig,
} from "@/config/diaryConfig";
import type { DiaryItem } from "@/data/diary-content";

interface DynamicScrapbookDiaryProps {
  isNightMode: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin?: () => void;
}

export function DynamicScrapbookDiary({
  isNightMode,
  onSelectItem,
  onOpenAdmin,
}: DynamicScrapbookDiaryProps) {
  const [activeTab, setActiveTab] = useState<"journey" | "music" | "travel" | "art-books">(
    "journey",
  );
  const [terminalRunning, setTerminalRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [audioWavesPlaying, setAudioWavesPlaying] = useState(true);

  const activeSection: DiarySectionConfig = DIARY_CONFIG.sections[activeTab];

  // Sync initial logs when active tab changes
  useEffect(() => {
    setTerminalLogs(activeSection.terminalCode.logs);
    setTerminalRunning(false);
  }, [activeSection.terminalCode.logs]);

  const handleRunTerminal = () => {
    setTerminalRunning(true);
    setTerminalLogs([`Executing ${activeSection.terminalCode.filename}...`]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `> Optimizing ${activeSection.label} assets & 3D dioramas...`,
      ]);
    }, 400);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        ...activeSection.terminalCode.logs,
        "✨ [SUCCESS] Live render updated successfully.",
      ]);
      setTerminalRunning(false);
    }, 900);
  };

  const handleResetTerminal = () => {
    setTerminalLogs(activeSection.terminalCode.logs);
  };

  const handleFrameClick = (frame: DiaryPolaroidConfig) => {
    const item: DiaryItem = {
      id: frame.id,
      title: frame.title,
      caption: frame.caption,
      description: frame.description,
      location: frame.location,
      date: frame.date,
      category: activeSection.id,
      mediaType: "image",
      mediaUrl: `/files/${frame.file}`,
      image: `/files/${frame.file}`,
      aspectRatio: "landscape",
      frameStyle: (frame.frameType === "washi-tape"
        ? "tape"
        : frame.frameType) as DiaryItem["frameStyle"],
      tags: frame.tags,
      sortOrder: 1,
      published: true,
      featured: true,
    };
    onSelectItem(item);
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* 3D FLOATING AMBIENCE: Micro-animated Neon Icons around Diary Perimeter   */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {activeSection.floating3DIcons.map((icon) => (
          <div
            key={icon.id}
            className={`absolute ${icon.position} transition-all duration-700 ${
              icon.animation === "pulse"
                ? "animate-pulse"
                : icon.animation === "bounce-slow"
                  ? "animate-bounce"
                  : icon.animation === "spin-slow"
                    ? "animate-spin-slow"
                    : "animate-float"
            }`}
          >
            <div
              style={{
                filter: isNightMode
                  ? `drop-shadow(0 0 12px ${activeSection.neonAccent})`
                  : "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
              }}
              className="flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-stone-900/80 px-2.5 py-1 text-xs font-mono font-bold shadow-md backdrop-blur border border-white/40 dark:border-white/10"
            >
              <span className="text-base">{icon.icon}</span>
              <span className="hidden sm:inline text-[11px] text-stone-700 dark:text-stone-300">
                {icon.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* DYNAMIC MASTER TABS SWITCHER (4 Main Dynamic Sections)                     */}
      {/* ========================================================================= */}
      <div className="relative z-20 mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
        {(
          [
            { id: "journey", label: "My Journey", emoji: "💻", badge: "Tech Timeline" },
            { id: "music", label: "Music Talent Wall", emoji: "🎸", badge: "Acoustics & Singing" },
            { id: "travel", label: "Travel & Adventure", emoji: "🛵", badge: "Wanderlust Map" },
            { id: "art-books", label: "Drawing & Reading", emoji: "🎨", badge: "Art & Books" },
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          const sectionConfig = DIARY_CONFIG.sections[tab.id];

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={
                isActive
                  ? {
                      borderColor: sectionConfig.themeColor,
                      boxShadow: isNightMode
                        ? `0 0 20px ${sectionConfig.neonAccent}`
                        : `0 8px 18px rgba(0,0,0,0.12)`,
                    }
                  : undefined
              }
              className={`group flex items-center gap-2 rounded-full border-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-serif font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? isNightMode
                    ? "bg-slate-900/95 text-white scale-105"
                    : "bg-[#fffdf9] text-stone-900 scale-105"
                  : isNightMode
                    ? "border-indigo-900/40 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-indigo-600/50"
                    : "border-stone-200 bg-white/70 text-stone-600 hover:text-stone-900 hover:border-stone-300"
              }`}
            >
              <span className="text-base sm:text-lg group-hover:scale-115 transition duration-300">
                {tab.emoji}
              </span>
              <span className="font-display tracking-wide">{tab.label}</span>
              <span
                style={{
                  backgroundColor: isActive ? sectionConfig.themeColor : undefined,
                }}
                className={`hidden md:inline rounded-full px-2 py-0.5 text-[9px] font-mono uppercase ${
                  isActive
                    ? "text-white font-bold"
                    : "bg-stone-200 dark:bg-stone-800 text-stone-500"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3D SCRAPBOOK SPREAD: Left Page (Interactive Stage) + Right Page (Frames)  */}
      {/* ========================================================================= */}
      <div
        className={`relative mx-auto rounded-3xl border-2 transition-all duration-500 shadow-2xl p-4 sm:p-7 ${
          isNightMode
            ? "border-indigo-500/30 bg-gradient-to-br from-[#0c132c]/95 via-[#111936]/95 to-[#0b1024]/95 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "border-amber-200/90 bg-[#fffdf9]/95 text-stone-900 shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* Washi Tape Strip on Top Center */}
        <div className="diary-washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-5 z-20 pointer-events-none rotate-0.5" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ===================================================================== */}
          {/* LEFT SPREAD (5 Columns): Dynamic Terminal Screen & 3D Diorama Stage   */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 space-y-4">
            {/* Topic Header & Handwritten Stanza */}
            <div>
              <div className="flex items-center justify-between">
                <span
                  style={{ borderColor: activeSection.themeColor, color: activeSection.themeColor }}
                  className="rounded-full border px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5"
                >
                  {activeSection.badge}
                </span>

                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  Topic: #{activeSection.id}
                </span>
              </div>

              <h3 className="font-cursive mt-2 text-3xl sm:text-4xl font-extrabold tracking-wide">
                {activeSection.label} {activeSection.emoji}
              </h3>

              {/* Poetic Marginalia Note */}
              <p
                style={{
                  color: isNightMode ? "#cbd5e1" : "#44403c",
                }}
                className="font-handwriting mt-1 text-base sm:text-lg font-bold leading-snug"
              >
                "{activeSection.handwrittenStanza.quote}"
              </p>
              <span className="block text-right font-cursive text-xs text-rose-500 dark:text-rose-400">
                {activeSection.handwrittenStanza.author}
              </span>
            </div>

            {/* DYNAMIC LAPTOP SCREEN TERMINAL CODE RUNNER */}
            <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-xl">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#121829] border-b border-white/10 text-xs font-mono text-stone-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-cyan-300 font-bold">
                    {activeSection.terminalCode.filename}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleRunTerminal}
                    disabled={terminalRunning}
                    className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition cursor-pointer"
                  >
                    <Play className="h-2.5 w-2.5 fill-current" />
                    {terminalRunning ? "Running..." : "Run"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetTerminal}
                    className="rounded-md bg-stone-800 p-1 text-stone-300 hover:bg-stone-700 transition cursor-pointer"
                  >
                    <RotateCcw className="h-2.5 w-2.5" />
                  </button>
                </div>
              </div>

              {/* Code Snippet Editor */}
              <div className="p-3 font-mono text-[11px] sm:text-[11.5px] leading-relaxed text-slate-200 bg-[#090d18]">
                {activeSection.terminalCode.snippet.map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-stone-600 select-none text-[9px] w-4 text-right">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        line.startsWith("#") || line.startsWith("//")
                          ? "text-stone-500 italic"
                          : line.includes("echo") ||
                              line.includes("print") ||
                              line.includes("console")
                            ? "text-amber-300"
                            : line.includes("def") ||
                                line.includes("function") ||
                                line.includes("const")
                              ? "text-pink-400"
                              : "text-cyan-200"
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Terminal Output Drawer */}
              <div className="p-2.5 bg-black/75 border-t border-white/5 font-mono text-[10px] text-cyan-200">
                <div className="flex items-center gap-1 text-[9px] text-stone-400 uppercase tracking-widest mb-1">
                  <Terminal className="h-2.5 w-2.5 text-cyan-400" />
                  <span>Output Telemetry</span>
                </div>
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1 leading-snug">
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

            {/* DYNAMIC TOPIC-SPECIFIC 3D DIORAMA BOX */}
            {activeSection.diorama.type === "cpu-timeline" && (
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-3.5 backdrop-blur">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">🧠</span> {activeSection.diorama.props.chipTitle}
                  </span>
                  <span className="text-[10px] text-stone-400">Silicon Inception</span>
                </div>
                <p className="text-xs font-serif text-stone-300 mb-2">
                  📍 <strong>{activeSection.diorama.props.college}</strong> •{" "}
                  {activeSection.diorama.props.course}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                  {activeSection.diorama.props.milestones?.map((m, i) => (
                    <div key={i} className="rounded-lg bg-black/40 p-2 border border-cyan-500/20">
                      <span className="text-cyan-400 font-bold block">{m.year}</span>
                      <span className="text-white block font-sans font-bold">{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection.diorama.type === "neon-audio" && (
              <div className="rounded-2xl border border-rose-500/40 bg-rose-950/30 p-3.5 backdrop-blur">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">🎙️</span> Neon Soundstage Waves
                  </span>
                  <button
                    type="button"
                    onClick={() => setAudioWavesPlaying(!audioWavesPlaying)}
                    className="text-[10px] text-rose-300 underline cursor-pointer"
                  >
                    {audioWavesPlaying ? "Pause Waves" : "Play Waves"}
                  </button>
                </div>
                {/* Interactive Pink Neon Audio Waveform Bars */}
                <div className="flex items-end justify-center gap-1.5 h-14 py-1">
                  {[24, 48, 18, 56, 32, 64, 40, 20, 52, 38, 60, 28, 45, 15].map((h, i) => (
                    <span
                      key={i}
                      style={{
                        height: audioWavesPlaying ? `${h}px` : "12px",
                        boxShadow: audioWavesPlaying
                          ? "0 0 10px rgba(244,63,94,0.8), 0 0 20px rgba(244,63,94,0.4)"
                          : "none",
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-rose-600 via-pink-400 to-rose-300 transition-all duration-300"
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-pink-200">
                  <span>Chords: {activeSection.diorama.props.chords.join(" • ")}</span>
                  <span>{activeSection.diorama.props.tempo}</span>
                </div>
              </div>
            )}

            {activeSection.diorama.type === "scooter-map" && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-3.5 backdrop-blur">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">🛵</span> Live Scooter Route Path
                  </span>
                  <span className="text-[10px] text-emerald-400 animate-pulse">Cruising...</span>
                </div>
                <div className="relative h-12 w-full rounded-xl bg-black/40 border border-emerald-500/20 flex items-center px-4 overflow-hidden">
                  <div className="absolute inset-x-4 h-0.5 bg-dashed border-t border-emerald-400/50" />
                  <div className="flex items-center justify-between w-full relative z-10 text-xs">
                    <span className="text-[10px] font-mono text-emerald-200 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      Bhopal 🌅
                    </span>
                    <span className="text-xl animate-bounce-slow">🛵💨</span>
                    <span className="text-[10px] font-mono text-emerald-200 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      Pachmarhi ⛰️
                    </span>
                    <span className="text-[10px] font-mono text-emerald-200 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      Tamil Nadu 🛕
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeSection.diorama.type === "books-easel" && (
              <div className="rounded-2xl border border-purple-500/40 bg-purple-950/30 p-3.5 backdrop-blur">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">📖</span> 3D Stacked Hardcover Bookshelf
                  </span>
                  <span className="text-[10px] text-amber-300">Curated Wisdom</span>
                </div>
                <div className="flex items-end justify-center gap-3 pt-2 pb-1 overflow-x-auto">
                  {activeSection.diorama.props.books?.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: b.spineColor,
                        boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
                      }}
                      className="w-12 h-28 rounded-t-md p-1 flex flex-col justify-between text-white text-center transition hover:-translate-y-2 cursor-pointer shadow-md"
                      title={`${b.title} by ${b.author}`}
                    >
                      <span className="text-[8px] font-mono opacity-75">★ 5.0</span>
                      <span className="writing-vertical text-[10px] font-serif font-bold tracking-wider my-auto line-clamp-1">
                        {b.title}
                      </span>
                      <span className="text-[7px] font-mono truncate opacity-60">
                        {b.author.split(" ").pop()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===================================================================== */}
          {/* RIGHT SPREAD (7 Columns): Config-Driven Glowing Polaroid Frames Grid  */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Config-Driven Polaroids ({activeSection.frames.length} Visuals)
              </span>

              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                Click any frame to inspect & zoom 🔍
              </span>
            </div>

            {/* Glowing Polaroid Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {activeSection.frames.map((frame, idx) => {
                const glowStyle = {
                  boxShadow: isNightMode
                    ? `0 10px 30px ${frame.glowColor}, 0 0 15px ${frame.glowColor}`
                    : `0 12px 24px rgba(0,0,0,0.08)`,
                };

                return (
                  <div
                    key={frame.id}
                    onClick={() => handleFrameClick(frame)}
                    style={{
                      transform: `rotate(${frame.rotation}deg)`,
                      ...glowStyle,
                    }}
                    className={`group relative cursor-pointer rounded-2xl border-2 p-3.5 pb-4 transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${
                      isNightMode
                        ? "border-white/10 bg-gradient-to-br from-slate-900/90 via-[#101730] to-slate-900/90 text-slate-100"
                        : "border-amber-200/90 bg-[#fffdfa] text-stone-900"
                    }`}
                  >
                    {/* Washi Tape Header Strip */}
                    <div className="diary-washi-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 z-10" />

                    <div>
                      {/* Polaroid Photo Canvas Frame */}
                      <div className="relative overflow-hidden rounded-xl border-4 border-white dark:border-stone-800 bg-stone-950 aspect-[4/3] flex items-center justify-center shadow-md">
                        <img
                          src={`/files/${frame.file}`}
                          alt={frame.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-106"
                          loading="lazy"
                        />

                        {/* Top corner badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-mono text-white backdrop-blur-xs">
                            {frame.frameType.toUpperCase()}
                          </span>
                        </div>

                        {/* Hover Zoom Prompt */}
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-[1px]">
                          <span className="rounded-full bg-white text-stone-900 px-3 py-1 text-xs font-serif font-bold shadow-lg flex items-center gap-1">
                            <ZoomIn className="h-3.5 w-3.5 text-pink-600" /> Inspect & Zoom
                          </span>
                        </div>
                      </div>

                      {/* Polaroid Title & Location */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400 mb-0.5">
                          {frame.date && <span>{frame.date}</span>}
                          {frame.location && (
                            <span className="flex items-center gap-0.5 truncate">
                              <MapPin className="h-2.5 w-2.5 text-rose-500" />
                              {frame.location}
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif text-sm sm:text-base font-bold group-hover:text-pink-600 transition truncate">
                          {frame.title}
                        </h4>

                        {/* Handwritten Caption */}
                        <p className="font-handwriting mt-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-snug line-clamp-2">
                          "{frame.caption}"
                        </p>
                      </div>
                    </div>

                    {/* Tag Pills Footer */}
                    <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-white/10 flex flex-wrap gap-1">
                      {frame.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-stone-100 dark:bg-stone-800/80 px-2 py-0.2 text-[9px] font-mono text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicScrapbookDiary;
