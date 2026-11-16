import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { PortfolioChat } from "@/components/chat/PortfolioChat";
import { playMagicalOpenSound, playStepChime } from "@/components/diary/DiaryAudio";
import { shouldShowOpening } from "@/lib/portfolio-experience";

const IntroPlaybackContext = createContext(false);
export const useIntroPlayback = () => useContext(IntroPlaybackContext);

// Track in-memory session status: fresh page load / reload starts false so 1-2-3 always displays
let hasPlayedInSession = false;

// SCREEN 1: Snappy, Aesthetic, Futuristic 3D Countdown (1 -> 2 -> 3)
function TechSplashScreen({ onDone, onBegin }: { onDone: () => void; onBegin: () => void }) {
  const [count, setCount] = useState<1 | 2 | 3>(1);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Play initial chime for Step 1 immediately
    playStepChime(1);

    // Fast, crisp pacing: ~580ms per number = 1.74s total
    const t1 = setTimeout(() => {
      setCount(2);
      playStepChime(2);
    }, 580);

    const t2 = setTimeout(() => {
      setCount(3);
      playStepChime(3);
      playMagicalOpenSound();
    }, 1160);

    const t3 = setTimeout(() => {
      handleComplete();
    }, 1740);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleComplete = () => {
    setExiting(true);
    onBegin();
    setTimeout(onDone, 350);
  };

  const handleSkip = () => {
    onBegin();
    onDone();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#030612] text-white transition-opacity duration-400 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic countdown"
    >
      {/* Immersive Deep Holographic Lighting & Grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Cyber Perspective Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b30_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_75%,transparent_100%)] opacity-85" />

        {/* Dynamic Glowing Ambient Light Spheres */}
        <div
          className={`absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full blur-[140px] transition-colors duration-700 ${
            count === 1 ? "bg-cyan-600/35" : count === 2 ? "bg-purple-600/35" : "bg-amber-500/35"
          }`}
        />
        <div
          className={`absolute top-1/3 -right-24 h-[520px] w-[520px] rounded-full blur-[150px] transition-colors duration-700 ${
            count === 1
              ? "bg-indigo-600/30"
              : count === 2
                ? "bg-fuchsia-600/30"
                : "bg-orange-500/30"
          }`}
        />
        <div className="absolute -bottom-24 left-1/3 h-[450px] w-[450px] rounded-full bg-indigo-900/30 blur-[130px]" />

        {/* Sparkle particles */}
        <div className="absolute top-1/4 left-1/5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#06b6d4] animate-ping" />
        <div
          className="absolute top-2/3 right-1/4 h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_14px_#a855f7] animate-ping"
          style={{ animationDelay: "0.4s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-2.5 w-2.5 rounded-full bg-amber-200 shadow-[0_0_16px_#fde047] animate-ping"
          style={{ animationDelay: "0.8s" }}
        />

        {/* Ambient Horizontal Beam Lines */}
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
      </div>

      {/* Top Header — Skip Button */}
      <header className="relative z-10 flex items-center justify-end px-6 sm:px-12 py-6">
        <button
          onClick={handleSkip}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-wider text-white/80 backdrop-blur transition hover:bg-white/15 hover:text-white"
        >
          Skip Intro →
        </button>
      </header>

      {/* Main Center Stage: 3D NUMBER (1 -> 2 -> 3) WITH SUBTITLES */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        {count === 1 && (
          <div
            key="count-1"
            className="flex flex-col items-center justify-center animate-in fade-in zoom-in-90 duration-350"
          >
            {/* Holographic Glowing Ring Backdrop */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-52 w-52 sm:h-64 sm:w-64 rounded-full border border-cyan-400/35 bg-cyan-500/10 blur-[2px] shadow-[0_0_70px_rgba(6,182,212,0.35)] animate-pulse" />
              <span className="splash-number-3d splash-num-1">1</span>
            </div>

            <div className="mt-5 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
                <span>STAGE 01 · INITIALIZING</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                Palak Tripathi
              </h2>
              <p className="mt-1 text-sm font-medium text-cyan-200/80">
                Full-Stack Engineer & Vocalist
              </p>
            </div>
          </div>
        )}

        {count === 2 && (
          <div
            key="count-2"
            className="flex flex-col items-center justify-center animate-in fade-in zoom-in-90 duration-350"
          >
            {/* Holographic Glowing Ring Backdrop */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-52 w-52 sm:h-64 sm:w-64 rounded-full border border-purple-400/35 bg-purple-500/10 blur-[2px] shadow-[0_0_70px_rgba(168,85,247,0.35)] animate-pulse" />
              <span className="splash-number-3d splash-num-2">2</span>
            </div>

            <div className="mt-5 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-950/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-ping" />
                <span>STAGE 02 · HARMONIES & CODE</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                Story in Stills & Sound
              </h2>
              <p className="mt-1 text-sm font-medium text-purple-200/80">
                Interactive 3D Diary & Acoustic Sessions
              </p>
            </div>
          </div>
        )}

        {count === 3 && (
          <div
            key="count-3"
            className="flex flex-col items-center justify-center animate-in fade-in zoom-in-90 duration-350"
          >
            {/* Holographic Glowing Ring Backdrop */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-52 w-52 sm:h-64 sm:w-64 rounded-full border border-amber-400/35 bg-amber-500/10 blur-[2px] shadow-[0_0_75px_rgba(245,158,11,0.4)] animate-pulse" />
              <span className="splash-number-3d splash-num-3">3</span>
            </div>

            <div className="mt-5 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-950/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-ping" />
                <span>STAGE 03 · READY TO LAUNCH</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                Welcome to Palak's Portfolio ✨
              </h2>
              <p className="mt-1 text-sm font-medium text-amber-200/80">Opening Digital Space...</p>
            </div>
          </div>
        )}
      </main>

      {/* Sleek Stage Indicator Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 py-8">
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { step: 1 as const, label: "01 · INIT" },
            { step: 2 as const, label: "02 · HARMONY" },
            { step: 3 as const, label: "03 · LAUNCH" },
          ].map((item) => {
            const active = count === item.step;
            const done = count > item.step;
            return (
              <div
                key={item.step}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition-all duration-300 ${
                  active
                    ? count === 1
                      ? "border border-cyan-400/80 bg-cyan-500/25 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.45)]"
                      : count === 2
                        ? "border border-purple-400/80 bg-purple-500/25 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.45)]"
                        : "border border-amber-400/80 bg-amber-500/25 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.45)]"
                    : done
                      ? "border border-white/20 bg-white/10 text-white/70"
                      : "border border-white/10 bg-transparent text-white/30"
                }`}
              >
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Progress Track */}
        <div className="h-1 w-48 sm:w-64 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              count === 1
                ? "w-1/3 bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
                : count === 2
                  ? "w-2/3 bg-purple-400 shadow-[0_0_10px_#a855f7]"
                  : "w-full bg-amber-400 shadow-[0_0_10px_#f59e0b]"
            }`}
          />
        </div>
      </footer>
    </div>
  );
}

// SCREEN 2 & WRAPPER: Website Reveal Animation & Audio Controls
export function PortfolioExperience({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Compute synchronously on first render: zero blank flash, fast startup!
  const [showOpening, setShowOpening] = useState(() => {
    if (typeof window === "undefined") return false;
    // Clear stale sessionStorage flags from previous sessions
    try {
      sessionStorage.removeItem("introSeen");
    } catch {}
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    return shouldShowOpening(window.location.pathname, hasPlayedInSession, reducedMotion);
  });
  const [introPlayback, setIntroPlayback] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    setShowOpening(shouldShowOpening(pathname, hasPlayedInSession, reducedMotion));
  }, [pathname]);

  const finish = useCallback(() => {
    hasPlayedInSession = true;
    setShowOpening(false);
  }, []);

  const begin = useCallback(() => setIntroPlayback(true), []);
  const openingVisible = pathname === "/" && showOpening;

  if (openingVisible) {
    return (
      <IntroPlaybackContext.Provider value={introPlayback}>
        <TechSplashScreen onDone={finish} onBegin={begin} />
      </IntroPlaybackContext.Provider>
    );
  }

  // SCREEN 2: Smooth animated reveal into the website
  return (
    <div className="website-reveal-animation">
      {children}
      <PortfolioChat />
    </div>
  );
}
