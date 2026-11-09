import { useState, useEffect } from "react";
import { Sparkles, BookOpen, Layers } from "lucide-react";
import { DiaryCover } from "./DiaryCover";
import { DiaryPageTurner } from "./DiaryPageTurner";
import { DiaryMediaModal } from "./DiaryMediaModal";
import { DiaryAdminModal } from "./DiaryAdminModal";
import { DynamicScrapbookDiary } from "./DynamicScrapbookDiary";
import {
  loadDiaryChapters,
  fetchPersistentChapters,
  saveDiaryChapters,
  type DiaryChapter,
  type DiaryItem,
} from "@/data/diary-content";

export function DiaryExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"dynamic" | "book">("dynamic");
  const [isNightMode, setIsNightMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("diary_night_mode") === "true";
    }
    return false;
  });
  const [chapters, setChapters] = useState<DiaryChapter[]>(loadDiaryChapters);
  const [selectedItem, setSelectedItem] = useState<DiaryItem | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("diary_night_mode", String(next));
      }
      return next;
    });
  };

  // Check if owner access is enabled via URL query param (?admin=true or ?edit=true) or local session
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

  // Load persistent chapters from Server API / IndexedDB on mount
  useEffect(() => {
    let active = true;
    fetchPersistentChapters().then((loaded) => {
      if (active && loaded && loaded.length > 0) {
        setChapters(loaded);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSaveChapters = (updated: DiaryChapter[]) => {
    setChapters(updated);
    saveDiaryChapters(updated);
  };

  const handleActivateOwner = () => {
    setIsOwner(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("diary_owner", "true");
    }
    setShowAdmin(true);
  };

  const allItems = chapters.flatMap((c) => c.items);

  return (
    <div
      className={`relative w-full py-10 sm:py-20 overflow-hidden transition-all duration-700 ${
        isNightMode
          ? "bg-gradient-to-b from-[#060919] via-[#0d1433] to-[#050714] text-slate-100"
          : "bg-gradient-to-b from-[#fff7ed]/40 via-[#fdf2f8]/50 to-[#f0f9ff]/40 text-stone-900"
      }`}
    >
      {/* ========================================================================= */}
      {/* CONTINUOUSLY FLOWING ANIMATED GRADIENT & SUBTLE NEON PARTICLES             */}
      {/* ========================================================================= */}
      {isNightMode ? (
        <>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/40 via-indigo-950/50 to-transparent" />
          <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[950px] rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-purple-600/25 blur-[150px] -z-10 animate-pulse" />
          {/* Futuristic subtle floating neon particles */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40">
            <span className="absolute top-1/4 left-1/6 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
            <span className="absolute top-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6] animate-pulse" />
            <span className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
            <span className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-pulse" />
          </div>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100/60 via-purple-50/40 to-transparent" />
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[850px] rounded-full bg-gradient-to-r from-pink-200/35 via-amber-100/30 to-sky-200/35 blur-[140px] -z-10" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-3 sm:px-6">
        {/* Header Heading */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-3">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-serif text-xs font-bold uppercase tracking-[0.3em] shadow-xs backdrop-blur transition-colors ${
                isNightMode
                  ? "border-indigo-400/80 bg-indigo-950/80 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "border-pink-300/80 bg-pink-50/90 text-pink-900"
              }`}
            >
              <Sparkles
                className={`h-3.5 w-3.5 animate-spin-slow ${
                  isNightMode ? "text-cyan-300" : "text-pink-600"
                }`}
              />
              3D Interactive Scrapbook Diary
            </div>

            {/* Day / Night Mode Lighting Toggle */}
            <button
              type="button"
              onClick={toggleNightMode}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-serif text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xs backdrop-blur cursor-pointer hover:scale-105 ${
                isNightMode
                  ? "border-indigo-400/80 bg-indigo-950/90 text-cyan-200 shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                  : "border-pink-300/80 bg-pink-50/90 text-pink-900 hover:bg-pink-100 shadow-pink-200/50"
              }`}
              title={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isNightMode ? (
                <>
                  <span className="text-sm">🌙</span> Night Mode
                </>
              ) : (
                <>
                  <span className="text-sm">☀️</span> Day Mode
                </>
              )}
            </button>
          </div>

          <h2
            className={`reveal font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.18em] uppercase drop-shadow-sm transition-colors duration-500 ${
              isNightMode
                ? "text-slate-100 drop-shadow-[0_0_30px_rgba(129,140,248,0.5)]"
                : "text-stone-900"
            }`}
          >
            Beyond the Code
          </h2>

          <div className="mx-auto my-3 flex items-center justify-center gap-4">
            <span
              className={`h-px w-20 transition-all duration-500 ${
                isNightMode
                  ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  : "bg-gradient-to-r from-transparent via-pink-400 to-transparent"
              }`}
            />
            <span
              onClick={handleActivateOwner}
              className={`font-cursive text-2xl sm:text-3xl font-bold cursor-pointer select-none transition duration-300 ${
                isNightMode
                  ? "text-amber-200 hover:text-amber-100 drop-shadow-[0_0_12px_rgba(254,240,138,0.7)]"
                  : "text-rose-600 hover:text-pink-700"
              }`}
              title="Palak's Storybook"
            >
              Palak's Diary ♡
            </span>
            <span
              className={`h-px w-20 transition-all duration-500 ${
                isNightMode
                  ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  : "bg-gradient-to-r from-transparent via-pink-400 to-transparent"
              }`}
            />
          </div>

          <p
            className={`reveal mx-auto mt-2 max-w-2xl font-handwriting text-xl sm:text-2xl font-bold leading-snug transition-colors duration-500 ${
              isNightMode ? "text-cyan-200 drop-shadow-sm" : "text-rose-900"
            }`}
          >
            Where melodies, creative crafts, travel milestones, and quiet moments are bound together
          </p>

          {/* Master View Mode Switcher: 3D Dynamic Scrapbook vs Multi-Chapter Flipbook */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="inline-flex rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 p-1 backdrop-blur shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("dynamic")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-serif font-bold transition-all cursor-pointer ${
                  viewMode === "dynamic"
                    ? "bg-brand text-primary-foreground shadow-sm"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-900"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>3D Dynamic Studio (4 Topics)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode("book");
                  setIsOpen(true);
                }}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-serif font-bold transition-all cursor-pointer ${
                  viewMode === "book"
                    ? "bg-brand text-primary-foreground shadow-sm"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-900"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Flipbook Spreads (8 Chapters)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE VIEW: 3D Dynamic Scrapbook OR Flipbook Chapters Spreads             */}
        {/* ========================================================================= */}
        {viewMode === "dynamic" ? (
          <DynamicScrapbookDiary
            isNightMode={isNightMode}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenAdmin={() => setShowAdmin(true)}
          />
        ) : (
          <div className="relative transition-all duration-700">
            {!isOpen ? (
              <DiaryCover isNightMode={isNightMode} onOpen={() => setIsOpen(true)} />
            ) : (
              <DiaryPageTurner
                chapters={chapters}
                isOwner={isOwner}
                isNightMode={isNightMode}
                onToggleNightMode={toggleNightMode}
                onCloseBook={() => setIsOpen(false)}
                onSelectItem={(item) => setSelectedItem(item)}
                onOpenAdmin={() => setShowAdmin(true)}
                onActivateOwner={handleActivateOwner}
              />
            )}
          </div>
        )}
      </div>

      {/* Media Fullscreen Modal */}
      {selectedItem && (
        <DiaryMediaModal
          item={selectedItem}
          items={allItems}
          onClose={() => setSelectedItem(null)}
          onSelect={(item) => setSelectedItem(item)}
        />
      )}

      {/* Owner Content Manager Modal */}
      {showAdmin && (
        <DiaryAdminModal
          chapters={chapters}
          onSave={handleSaveChapters}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}

export default DiaryExperience;
