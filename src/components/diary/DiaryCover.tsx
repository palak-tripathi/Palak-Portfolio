import { useState, useRef } from "react";
import { Sparkles, Crown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiarySparkles } from "./DiarySparkles";
import { DiaryDeskDecorations } from "./DiaryDeskDecorations";
import { playMagicalOpenSound, playStepChime } from "./DiaryAudio";

interface DiaryCoverProps {
  isNightMode?: boolean;
  onOpen: () => void;
}

const COUNTDOWN_STEPS = [
  {
    step: 1,
    number: "1",
    badge: "STAGE I",
    title: "Unlocking Secret Keys ✨",
    subtitle: "Releasing fairy-tale ribbon straps & brass clasps",
    icon: "🗝️",
  },
  {
    step: 2,
    number: "2",
    badge: "STAGE II",
    title: "Gathering Stardust & Memories 🌸",
    subtitle: "Summoning Polaroid frames, code editor & melodies",
    icon: "✨",
  },
  {
    step: 3,
    number: "3",
    badge: "STAGE III",
    title: "Opening Palak's Diary 🦋",
    subtitle: "Entering a cozy realm of stills and sound...",
    icon: "📖",
  },
];

export function DiaryCover({ isNightMode = false, onOpen }: DiaryCoverProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState<number | null>(null);
  const [opening, setOpening] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!coverRef.current || opening || countdown !== null) return;
    const rect = coverRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 10), y: x * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleTriggerOpen = () => {
    if (opening || countdown !== null) return;

    // Step 1: 1... Unlocking
    setCountdown(1);
    playStepChime(1);

    // Step 2: 2... Gathering
    setTimeout(() => {
      setCountdown(2);
      playStepChime(2);
    }, 700);

    // Step 3: 3... Turning page
    setTimeout(() => {
      setCountdown(3);
      playStepChime(3);
    }, 1400);

    // Final grand 3D rotation & open sound
    setTimeout(() => {
      setCountdown(null);
      setOpening(true);
      playMagicalOpenSound();
    }, 2100);

    // Transition into open diary spread
    setTimeout(() => {
      onOpen();
    }, 2850);
  };

  return (
    <div className="relative mx-auto flex min-h-[680px] w-full max-w-5xl items-center justify-center py-6 px-4">
      {/* Desk Surroundings & Ambient Glow */}
      <DiaryDeskDecorations isNightMode={isNightMode} />
      <DiarySparkles count={isNightMode ? 40 : 34} />

      {/* Dreamy Ethereal Light Rays Behind the Book */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className={`h-[520px] w-[520px] rounded-full blur-[100px] transition-all duration-700 animate-pulse ${
            isNightMode
              ? "bg-gradient-to-r from-indigo-500/30 via-cyan-400/25 to-purple-600/35"
              : "bg-gradient-to-r from-pink-300/35 via-amber-200/30 to-purple-300/30"
          }`}
        />
      </div>

      {/* Opening Light Burst Animation */}
      {opening && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <div
            className={`h-[560px] w-[560px] rounded-full blur-3xl animate-burst ${
              isNightMode
                ? "bg-gradient-to-r from-cyan-300/90 via-indigo-300/90 to-amber-200/90"
                : "bg-gradient-to-r from-amber-200/90 via-pink-200/90 to-purple-200/90"
            }`}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* MAGICAL "1 - 2 - 3" COUNTDOWN UNLOCK PORTAL OVERLAY     */}
      {/* ======================================================== */}
      {countdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-4 backdrop-blur-md animate-in fade-in duration-200 select-none">
          <div className="relative w-full max-w-md rounded-3xl border-2 border-amber-300/90 bg-gradient-to-b from-stone-900 via-purple-950/90 to-stone-950 p-6 sm:p-8 text-center shadow-[0_0_70px_rgba(251,191,36,0.5)]">
            {/* Ambient Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-stone-950 font-mono text-xs font-black tracking-widest shadow-md">
              <Sparkles className="h-3 w-3 fill-current" /> MAGIC UNLOCK SEQUENCE
            </div>

            {/* Step Indicators: 1 ── 2 ── 3 */}
            <div className="flex items-center justify-center gap-3 mt-5 mb-5">
              {[1, 2, 3].map((s) => {
                const isActive = countdown === s;
                const isPassed = countdown > s;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? "scale-125 border-2 border-amber-300 bg-amber-400 text-stone-950 shadow-[0_0_20px_rgba(251,191,36,0.9)]"
                          : isPassed
                            ? "border border-emerald-400 bg-emerald-500/30 text-emerald-300"
                            : "border border-white/20 bg-white/5 text-stone-400"
                      }`}
                    >
                      {isPassed ? "✓" : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`h-0.5 w-8 transition-colors duration-300 ${
                          isPassed ? "bg-emerald-400" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Giant Glowing Countdown Number with Zoom Pulse */}
            <div className="relative my-4 flex items-center justify-center min-h-[170px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-36 w-36 rounded-full bg-amber-400/20 blur-2xl animate-ping" />
              </div>

              {COUNTDOWN_STEPS.filter((cs) => cs.step === countdown).map((cs) => (
                <div
                  key={cs.step}
                  className="relative z-10 flex flex-col items-center animate-in zoom-in-75 duration-300"
                >
                  <span className="text-4xl sm:text-5xl mb-1">{cs.icon}</span>
                  <div className="font-serif text-7xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-rose-400 drop-shadow-[0_4px_30px_rgba(251,191,36,0.9)]">
                    {cs.number}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100 mt-2">
                    {cs.title}
                  </h3>
                  <p className="font-handwriting text-sm sm:text-base text-pink-200/90 font-medium mt-1">
                    "{cs.subtitle}"
                  </p>
                </div>
              ))}
            </div>

            {/* Aesthetic marginalia note */}
            <div className="mt-5 pt-3 border-t border-white/10 text-xs font-mono text-stone-400 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 text-amber-300 animate-spin-slow" />
              <span>Unlocking Palak's 3D scrapbook diary...</span>
            </div>
          </div>
        </div>
      )}

      {/* 3D Interactive Floating Oversized Storybook Cover */}
      <div
        ref={coverRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleTriggerOpen}
        style={{
          transform: opening
            ? "perspective(1600px) rotateY(-88deg) scale(0.96) translateZ(60px)"
            : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: opening
            ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.75s"
            : "transform 0.15s ease-out",
          opacity: opening ? 0.1 : 1,
        }}
        className={`group relative aspect-[3/4] w-full max-w-[460px] cursor-pointer select-none rounded-[2.2rem] border-4 p-7 sm:p-9 transition-all duration-500 hover:scale-[1.01] ${
          isNightMode
            ? "diary-night-cover shadow-[0_35px_90px_-15px_rgba(10,14,45,0.85),0_0_70px_rgba(99,102,241,0.5)]"
            : "border-[#e5a8bd] diary-pink-cover shadow-[0_35px_90px_-15px_rgba(200,90,130,0.65),0_0_60px_rgba(255,220,240,0.45)]"
        }`}
      >
        {/* Book Spine (Left Edge Binding) */}
        <div
          className={`absolute bottom-0 left-0 top-0 w-9 rounded-l-[2.1rem] shadow-inner ${
            isNightMode
              ? "bg-gradient-to-r from-[#030712]/90 via-[#1e1b4b]/60 to-transparent"
              : "bg-gradient-to-r from-[#913253]/80 via-[#c45b84]/50 to-transparent"
          }`}
        />
        <div
          className={`absolute bottom-0 left-9 top-0 w-1 ${
            isNightMode ? "bg-cyan-300/50" : "bg-amber-300/40"
          }`}
        />

        {/* Vintage Champagne Gold Foil Filigree Outer Border */}
        <div
          className={`relative h-full w-full rounded-[1.8rem] border-2 p-5 sm:p-6 transition-all duration-500 ${
            isNightMode
              ? "border-indigo-300/80 shadow-[inset_0_0_30px_rgba(99,102,241,0.3)]"
              : "border-amber-300/80 shadow-[inset_0_0_25px_rgba(254,240,138,0.25)]"
          }`}
        >
          {/* Inner Dotted Filigree Border */}
          <div
            className={`absolute inset-1.5 rounded-[1.6rem] border border-dashed ${
              isNightMode ? "border-cyan-300/50" : "border-amber-200/60"
            }`}
          />

          {/* Ornate Gold Filigree Corners */}
          <div
            className={`absolute -left-1.5 -top-1.5 h-9 w-9 border-l-4 border-t-4 rounded-tl-xl shadow-xs ${isNightMode ? "border-indigo-300/90" : "border-amber-300/90"}`}
          />
          <div
            className={`absolute -right-1.5 -top-1.5 h-9 w-9 border-r-4 border-t-4 rounded-tr-xl shadow-xs ${isNightMode ? "border-indigo-300/90" : "border-amber-300/90"}`}
          />
          <div
            className={`absolute -bottom-1.5 -left-1.5 h-9 w-9 border-b-4 border-l-4 rounded-bl-xl shadow-xs ${isNightMode ? "border-indigo-300/90" : "border-amber-300/90"}`}
          />
          <div
            className={`absolute -bottom-1.5 -right-1.5 h-9 w-9 border-b-4 border-r-4 rounded-br-xl shadow-xs ${isNightMode ? "border-indigo-300/90" : "border-amber-300/90"}`}
          />

          {/* 3D Sparkling Ribbon Bow (Top-Left) with Flowing Tails */}
          <div className="absolute -left-8 -top-6 z-20 pointer-events-none transform -rotate-12 transition-transform duration-300 group-hover:scale-105">
            <div className="relative flex items-center justify-center">
              <div className="flex items-center gap-1">
                <div
                  className={`h-11 w-16 rounded-full border shadow-md ${
                    isNightMode
                      ? "bg-gradient-to-br from-indigo-400 via-indigo-600 to-slate-900 border-indigo-300 shadow-[0_6px_18px_rgba(99,102,241,0.5)]"
                      : "bg-gradient-to-br from-pink-200 via-pink-300 to-rose-400 border-pink-100 shadow-[0_6px_18px_rgba(219,39,119,0.35)]"
                  }`}
                />
                <div
                  className={`h-8 w-7 rounded-full shadow-md flex items-center justify-center border ${
                    isNightMode
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-400 border-cyan-200"
                      : "bg-gradient-to-r from-pink-300 to-rose-400 border-amber-200/60"
                  }`}
                >
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      isNightMode
                        ? "bg-cyan-200 shadow-[0_0_8px_#22d3ee]"
                        : "bg-amber-200 shadow-[0_0_8px_#fde047]"
                    }`}
                  />
                </div>
                <div
                  className={`h-11 w-16 rounded-full border shadow-md ${
                    isNightMode
                      ? "bg-gradient-to-bl from-indigo-400 via-indigo-600 to-slate-900 border-indigo-300 shadow-[0_6px_18px_rgba(99,102,241,0.5)]"
                      : "bg-gradient-to-bl from-pink-200 via-pink-300 to-rose-400 border-pink-100 shadow-[0_6px_18px_rgba(219,39,119,0.35)]"
                  }`}
                />
              </div>

              {/* Hanging Golden/Silver Crescent Moon Charm */}
              <div className="absolute -bottom-8 left-4 flex flex-col items-center animate-sway">
                <div className={`h-4 w-0.5 ${isNightMode ? "bg-cyan-300" : "bg-amber-300"}`} />
                <span
                  className={`text-2xl leading-none drop-shadow-[0_0_12px_rgba(250,204,21,0.95)] ${
                    isNightMode ? "text-cyan-200" : "text-amber-300"
                  }`}
                >
                  🌙
                </span>
              </div>

              {/* Flowing Ribbon Tails */}
              <div
                className={`absolute -bottom-12 left-11 h-16 w-5 transform rotate-12 [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)] ${
                  isNightMode
                    ? "bg-gradient-to-b from-indigo-400 to-indigo-900/60"
                    : "bg-gradient-to-b from-pink-300 to-pink-200/50"
                }`}
              />
            </div>
          </div>

          {/* Ornate Gold / Celestial Crown Crest at Top */}
          <div className="text-center mt-2">
            <div
              className={`mx-auto flex h-11 w-11 items-center justify-center animate-bounce ${
                isNightMode
                  ? "text-cyan-300 drop-shadow-[0_2px_12px_rgba(34,211,238,0.8)]"
                  : "text-amber-300 drop-shadow-[0_2px_10px_rgba(234,179,8,0.75)]"
              }`}
              style={{ animationDuration: "3s" }}
            >
              <Crown className="h-9 w-9 fill-current opacity-30" />
            </div>
          </div>

          {/* Center Oval Filigree Frame with "Palak's Diary" */}
          <div className="relative mx-auto mt-2 max-w-[310px]">
            {/* Glowing Butterfly */}
            <div className="absolute -top-4 -right-3 z-10 animate-butterfly">
              <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_14px_rgba(56,189,248,0.95)]">
                🦋
              </span>
            </div>

            {/* Oval Carved Frame */}
            <div
              className={`relative rounded-[50%] border-4 px-6 py-9 text-center transition-all duration-500 ${
                isNightMode
                  ? "border-indigo-400 bg-gradient-to-b from-slate-900/95 via-indigo-950/90 to-slate-950/95 shadow-[0_12px_35px_rgba(6,9,28,0.6),inset_0_0_20px_rgba(99,102,241,0.4)]"
                  : "border-amber-300/90 bg-gradient-to-b from-pink-100/95 via-pink-50/90 to-rose-100/95 shadow-[0_12px_35px_rgba(180,60,100,0.25),inset_0_0_18px_rgba(254,240,138,0.4)]"
              }`}
            >
              <div
                className={`absolute inset-1.5 rounded-[50%] border border-dashed ${
                  isNightMode ? "border-cyan-400/50" : "border-amber-400/60"
                }`}
              />

              <h1
                className={`font-cursive text-4xl sm:text-5xl font-extrabold tracking-wide ${
                  isNightMode
                    ? "text-white drop-shadow-[0_2px_8px_rgba(99,102,241,0.8)]"
                    : "text-stone-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
                }`}
              >
                Palak's
              </h1>
              <h2
                className={`font-cursive text-4xl sm:text-5xl font-extrabold tracking-wide -mt-1 ${
                  isNightMode
                    ? "text-white drop-shadow-[0_2px_8px_rgba(99,102,241,0.8)]"
                    : "text-stone-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
                }`}
              >
                Diary
              </h2>
              <div
                className={`mt-1 flex items-center justify-center text-xl ${
                  isNightMode ? "text-cyan-300" : "text-rose-800"
                }`}
              >
                ♡
              </div>
            </div>
          </div>

          {/* Lower Storybook Vignettes (Castle & Handwritten Dedication) */}
          <div className="mt-6 flex items-end justify-between gap-3">
            {/* Fairytale Castle Illustration Card */}
            <div
              className={`relative h-24 w-32 overflow-hidden rounded-xl border-2 p-1.5 shadow-md ${
                isNightMode
                  ? "border-indigo-400 bg-gradient-to-t from-slate-950 to-indigo-900 text-cyan-200"
                  : "border-amber-300/80 bg-gradient-to-t from-pink-100 to-sky-100"
              }`}
            >
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <span className="text-3xl leading-none">🏰</span>
                <span
                  className={`mt-1 font-serif text-[8px] font-semibold uppercase tracking-widest ${
                    isNightMode ? "text-cyan-200" : "text-pink-900/80"
                  }`}
                >
                  Memory Kingdom
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 text-sm">{isNightMode ? "✨" : "🌸"}</div>
            </div>

            {/* Handwritten Dedication Note Card */}
            <div
              className={`relative flex-1 rounded-xl border p-3 text-center shadow-sm ${
                isNightMode
                  ? "border-indigo-400/50 bg-indigo-950/90 text-cyan-100"
                  : "border-amber-300/60 bg-amber-50/95 text-stone-800"
              }`}
            >
              <p className="font-handwriting text-sm sm:text-base leading-tight font-semibold">
                "A collection of my memories, dreams and little happiness ♡"
              </p>
            </div>
          </div>

          {/* "OPEN MY WORLD" Interactive Bottom Pill */}
          <div className="absolute bottom-6 inset-x-7 text-center">
            <Button
              size="lg"
              disabled={opening || countdown !== null}
              className={`group/btn relative w-full overflow-hidden rounded-full border-2 font-serif text-xs font-bold tracking-[0.2em] text-white shadow-lg transition duration-300 hover:scale-[1.02] ${
                isNightMode
                  ? "border-cyan-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 shadow-[0_8px_25px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.7)]"
                  : "border-amber-300/90 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 shadow-[0_8px_25px_rgba(219,39,119,0.45)] hover:shadow-[0_12px_32px_rgba(219,39,119,0.6)]"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 animate-spin-slow text-amber-200" />
                {countdown !== null
                  ? `UNLOCKING... ${countdown} / 3 ✨`
                  : opening
                    ? "OPENING PALAK'S WORLD... 🌸"
                    : "OPEN PALAK'S DIARY"}
                <BookOpen className="h-4 w-4 transition group-hover/btn:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            </Button>
            <p
              className={`mt-1.5 font-handwriting text-xs sm:text-sm font-bold ${
                isNightMode ? "text-cyan-200" : "text-pink-900/80"
              }`}
            >
              {countdown !== null
                ? `✨ Step ${countdown} of 3: Unlocking Palak's Memories...`
                : "✨ Click anywhere on the storybook to enter"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
