import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { PortfolioChat } from "@/components/chat/PortfolioChat";
import { shouldShowOpening } from "@/lib/portfolio-experience";

const IntroPlaybackContext = createContext(false);
export const useIntroPlayback = () => useContext(IntroPlaybackContext);

// SCREEN 1: Minimalist, Powerful Full-Screen Cinematic Countdown (1 -> 2 -> 3)
function TechSplashScreen({ onDone, onBegin }: { onDone: () => void; onBegin: () => void }) {
  const [count, setCount] = useState<1 | 2 | 3>(1);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Snappy, energetic countdown (600ms per number = 1.8s total)
    const t1 = setTimeout(() => setCount(2), 650);
    const t2 = setTimeout(() => setCount(3), 1300);
    const t3 = setTimeout(() => handleComplete(), 1950);

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
    setTimeout(onDone, 400);
  };

  const handleSkip = () => {
    onBegin();
    onDone();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#040714] text-white transition-opacity duration-600 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic countdown"
    >
      {/* Immersive Deep Blue, Violet, Cyan & Golden Futuristic Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Holographic Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b25_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />

        {/* Ambient Ethereal Glow Orbs */}
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/30 blur-[140px] animate-pulse" />
        <div
          className="absolute top-1/3 -right-24 h-[520px] w-[520px] rounded-full bg-cyan-500/25 blur-[150px] animate-pulse"
          style={{ animationDuration: "3.5s" }}
        />
        <div className="absolute -bottom-24 left-1/3 h-[450px] w-[450px] rounded-full bg-amber-400/20 blur-[130px]" />

        {/* Floating Digital Particles */}
        <div className="absolute top-1/4 left-1/5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#06b6d4] animate-ping" />
        <div
          className="absolute top-2/3 right-1/4 h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_14px_#6366f1] animate-ping"
          style={{ animationDelay: "0.8s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-2.5 w-2.5 rounded-full bg-amber-200 shadow-[0_0_16px_#fde047] animate-ping"
          style={{ animationDelay: "1.6s" }}
        />

        {/* Laser Light Streaks */}
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
      </div>

      {/* Top Header — Minimal Skip */}
      <header className="relative z-10 flex items-center justify-end px-6 sm:px-12 py-6">
        <button
          onClick={handleSkip}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-wider text-white/80 backdrop-blur transition hover:bg-white/15 hover:text-white"
        >
          Skip Intro →
        </button>
      </header>

      {/* Main Center Stage: HUGE BOLD 3D NUMBERS ONLY (1 -> 2 -> 3) */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        {count === 1 && (
          <div
            key="count-1"
            className="flex items-center justify-center animate-in fade-in zoom-in-75 duration-400"
          >
            <span className="splash-number-3d text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 select-none">
              1
            </span>
          </div>
        )}

        {count === 2 && (
          <div
            key="count-2"
            className="flex items-center justify-center animate-in fade-in zoom-in-75 duration-400"
          >
            <span className="splash-number-3d text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-500 select-none">
              2
            </span>
          </div>
        )}

        {count === 3 && (
          <div
            key="count-3"
            className="flex items-center justify-center animate-in fade-in zoom-in-75 duration-400"
          >
            <span className="splash-number-3d text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-200 to-amber-400 select-none">
              3
            </span>
          </div>
        )}
      </main>

      {/* Minimal Footer Progress Indicator */}
      <footer className="relative z-10 flex items-center justify-center px-6 py-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                count === s ? "w-8 bg-cyan-400 shadow-[0_0_10px_#06b6d4]" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

// SCREEN 2 & WRAPPER: Website Reveal Animation & Audio Controls
export function PortfolioExperience({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [ready, setReady] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [introPlayback, setIntroPlayback] = useState(false);

  useEffect(() => {
    // Show splash screen on initial visit unless already seen in session or reduced-motion requested
    const seen = Boolean(sessionStorage.getItem("introSeen"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowOpening(shouldShowOpening(pathname, seen, reducedMotion));
    setReady(true);
  }, [pathname]);

  const finish = useCallback(() => {
    sessionStorage.setItem("introSeen", "1");
    setShowOpening(false);
  }, []);

  const begin = useCallback(() => setIntroPlayback(true), []);
  const openingVisible = pathname === "/" && showOpening;

  // IMPORTANT: Keep the actual website completely hidden while the splash screen is running!
  if (!ready) {
    return <div className="fixed inset-0 bg-[#050814]" />;
  }

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
