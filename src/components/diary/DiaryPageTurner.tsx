import { useEffect, useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Book,
  X,
  Settings2,
  Sparkles,
  BookOpen,
  Star,
  Gamepad2,
  Plane,
  Camera,
  Heart,
  Coffee,
  Palette,
  Feather as FeatherIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiaryAudioControls, playPageTurnSound } from "./DiaryAudio";
import { DiarySparkles } from "./DiarySparkles";
import { FairyFloralElements } from "./FairyFloralElements";
import { DiaryDeskDecorations } from "./DiaryDeskDecorations";
import { StoryChapter } from "./chapters/StoryChapter";
import { TalentsChapter } from "./chapters/TalentsChapter";
import { TravelChapter } from "./chapters/TravelChapter";
import { MemoriesChapter } from "./chapters/MemoriesChapter";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface DiaryPageTurnerProps {
  chapters: DiaryChapter[];
  isOwner?: boolean;
  isNightMode?: boolean;
  onToggleNightMode?: () => void;
  onCloseBook: () => void;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
  onActivateOwner?: () => void;
}

const CHAPTER_ICONS = [
  BookOpen, // Chapter 1: My Story
  Star, // Chapter 2: My Talents
  Plane, // Chapter 3: Travel Diaries
  Camera, // Chapter 4: Memories
];

const RIBBON_STYLES = [
  {
    bg: "bg-pink-200 hover:bg-pink-300",
    text: "text-pink-950",
    border: "border-pink-300/80",
    shadow: "shadow-pink-300/40",
  },
  {
    bg: "bg-sky-200 hover:bg-sky-300",
    text: "text-sky-950",
    border: "border-sky-300/80",
    shadow: "shadow-sky-300/40",
  },
  {
    bg: "bg-teal-100 hover:bg-teal-200",
    text: "text-teal-950",
    border: "border-teal-200/80",
    shadow: "shadow-teal-200/40",
  },
  {
    bg: "bg-purple-200 hover:bg-purple-300",
    text: "text-purple-950",
    border: "border-purple-300/80",
    shadow: "shadow-purple-300/40",
  },
];

export function DiaryPageTurner({
  chapters,
  isOwner = false,
  isNightMode = false,
  onToggleNightMode,
  onCloseBook,
  onSelectItem,
  onOpenAdmin,
  onActivateOwner,
}: DiaryPageTurnerProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const totalPages = chapters.length;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      playPageTurnSound();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      playPageTurnSound();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const jumpToChapter = (chapterIndex: number) => {
    playPageTurnSound();
    setCurrentPage(chapterIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextPage();
      if (e.key === "ArrowLeft") goToPrevPage();
      if (e.key === "Escape") onCloseBook();
      // Owner keyboard shortcut Shift + E
      if (e.shiftKey && (e.key === "E" || e.key === "e")) {
        if (onActivateOwner) onActivateOwner();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages, onActivateOwner]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) goToNextPage();
    if (diff < -50) goToPrevPage();
    setTouchStart(null);
  };

  const activeChapter = currentPage > 0 ? chapters[currentPage - 1] : null;

  return (
    <div
      ref={bookRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative mx-auto w-full max-w-6xl py-4 sm:py-8 px-2 sm:px-4"
    >
      {/* Magical Surrounding Atmosphere */}
      <DiaryDeskDecorations isNightMode={isNightMode} />
      <DiarySparkles count={isNightMode ? 36 : 22} />

      {/* Top Floating Utility Navigation */}
      <div className="relative z-30 mb-6 flex flex-wrap items-center justify-between gap-3 px-3">
        <div className="flex items-center gap-2">
          {/* Reference Image "Close Diary" Button Pill */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseBook}
            className={`rounded-full border font-serif text-xs font-semibold shadow-md backdrop-blur transition ${
              isNightMode
                ? "border-indigo-400/80 bg-indigo-950/90 text-cyan-200 hover:bg-indigo-900"
                : "border-amber-300/80 bg-pink-50/90 text-pink-950 hover:bg-pink-100"
            }`}
          >
            <X
              className={`mr-1.5 h-3.5 w-3.5 ${isNightMode ? "text-cyan-300" : "text-pink-800"}`}
            />
            Close Diary
          </Button>

          {currentPage > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                playPageTurnSound();
                setCurrentPage(0);
              }}
              className={`rounded-full border font-serif text-xs font-semibold shadow-sm transition ${
                isNightMode
                  ? "border-cyan-400/70 bg-slate-900/90 text-amber-200 hover:bg-slate-800"
                  : "border-amber-300/70 bg-amber-50/90 text-amber-950 hover:bg-amber-100"
              }`}
            >
              <Book
                className={`mr-1.5 h-3.5 w-3.5 ${isNightMode ? "text-cyan-300" : "text-amber-800"}`}
              />
              Contents ♡
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Day / Night Mode Toggle Inside Book Spread */}
          {onToggleNightMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleNightMode}
              className={`rounded-full border font-serif text-xs font-semibold shadow-xs backdrop-blur transition cursor-pointer hover:scale-105 ${
                isNightMode
                  ? "border-indigo-400/80 bg-indigo-950/90 text-cyan-200 hover:bg-indigo-900 shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                  : "border-pink-300/80 bg-pink-50/90 text-pink-950 hover:bg-pink-100 shadow-pink-200/50"
              }`}
              title={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isNightMode ? "🌙 Night" : "☀️ Day"}
            </Button>
          )}

          {/* Romantic Dreamy Piano Sound Control */}
          <DiaryAudioControls />

          {/* Owner-Only Manage Button (No passkey prompt for owner) */}
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenAdmin}
              className={`rounded-full border font-serif text-xs font-semibold shadow-sm backdrop-blur transition ${
                isNightMode
                  ? "border-indigo-400/80 bg-indigo-950/90 text-cyan-200 hover:bg-indigo-900"
                  : "border-pink-300/80 bg-white/90 text-pink-950 hover:bg-pink-50"
              }`}
              title="Manage memories & upload files"
            >
              <Settings2
                className={`mr-1.5 h-3.5 w-3.5 ${isNightMode ? "text-cyan-300" : "text-pink-700"}`}
              />
              Manage Diary
            </Button>
          )}
        </div>
      </div>

      {/* Open 3D Handcrafted Vintage Book Spread */}
      <div
        className={`relative mx-auto min-h-[660px] overflow-hidden rounded-[2.4rem] border-4 p-4 sm:p-8 transition-all duration-700 ${
          isNightMode
            ? "diary-night-cover border-[#6366f1] shadow-[0_35px_95px_-15px_rgba(10,14,45,0.9),0_0_80px_rgba(99,102,241,0.4)]"
            : "border-[#e5a8bd] diary-pink-cover shadow-[0_35px_95px_-15px_rgba(200,90,130,0.55),0_0_70px_rgba(255,220,240,0.35)]"
        }`}
      >
        {/* Book Outer Edge Bevel & Gold/Silver Corner Ornaments */}
        <div
          className={`pointer-events-none absolute -left-1 -top-1 h-11 w-11 border-l-4 border-t-4 rounded-tl-xl z-20 ${
            isNightMode
              ? "border-cyan-300/90 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              : "border-amber-300/90"
          }`}
        />
        <div
          className={`pointer-events-none absolute -right-1 -top-1 h-11 w-11 border-r-4 border-t-4 rounded-tr-xl z-20 ${
            isNightMode
              ? "border-cyan-300/90 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              : "border-amber-300/90"
          }`}
        />
        <div
          className={`pointer-events-none absolute -bottom-1 -left-1 h-11 w-11 border-b-4 border-l-4 rounded-bl-xl z-20 ${
            isNightMode
              ? "border-cyan-300/90 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              : "border-amber-300/90"
          }`}
        />
        <div
          className={`pointer-events-none absolute -bottom-1 -right-1 h-11 w-11 border-b-4 border-r-4 rounded-br-xl z-20 ${
            isNightMode
              ? "border-cyan-300/90 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              : "border-amber-300/90"
          }`}
        />

        {/* Vintage Parchment Pages Spread */}
        <div
          className={`relative min-h-[610px] rounded-[1.8rem] border-2 overflow-hidden transition-all duration-700 ${
            isNightMode
              ? "diary-night-parchment border-indigo-500/30 text-slate-100"
              : "diary-parchment border-amber-900/15 diary-paper-shadow text-stone-900"
          }`}
        >
          {/* Book Spine Deep Center Crease & Page Curve Shadow */}
          <div
            className={`pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-12 -translate-x-1/2 z-10 lg:block ${
              isNightMode
                ? "bg-gradient-to-r from-transparent via-indigo-950/40 to-transparent"
                : "bg-gradient-to-r from-transparent via-amber-950/15 to-transparent"
            }`}
          />

          {/* Hanging Satin Bookmark Ribbon */}
          <div
            className={`pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 z-20 h-32 w-6 shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)] ${
              isNightMode
                ? "bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-300"
                : "bg-gradient-to-b from-rose-400 via-pink-400 to-rose-300"
            }`}
          />

          {/* Fairytale Floral Petals & Glowing Butterfly Atmospheric Layer */}
          <FairyFloralElements isNightMode={isNightMode} />

          {/* Dynamic Page Views */}
          <div key={currentPage} className="h-full w-full animate-in fade-in duration-300">
            {currentPage === 0 ? (
              /* TABLE OF CONTENTS SPREAD — Exactly as the Reference Image */
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[610px]">
                {/* Left Page: Welcoming Frontispiece & Memory World */}
                <div
                  className={`relative border-b lg:border-b-0 lg:border-r p-6 sm:p-10 flex flex-col justify-between ${
                    isNightMode ? "border-indigo-500/30" : "border-amber-900/15"
                  }`}
                >
                  <div>
                    {/* Fairytale Castle Vignette */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-serif text-xs font-bold uppercase tracking-[0.3em] ${
                          isNightMode ? "text-cyan-300" : "text-pink-900/70"
                        }`}
                      >
                        Memoria Aeterna
                      </span>
                      <span className="text-xl">{isNightMode ? "🌙" : "🌸"}</span>
                    </div>

                    <div className="mt-4 text-center">
                      <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-inner ${
                          isNightMode
                            ? "border-cyan-300/80 bg-indigo-950/80 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                            : "border-amber-300/80 bg-pink-100 text-pink-600"
                        }`}
                      >
                        <Sparkles className="h-7 w-7 animate-spin-slow" />
                      </div>
                      <h3
                        className={`font-cursive mt-3 text-4xl sm:text-5xl font-bold ${
                          isNightMode
                            ? "text-amber-200 drop-shadow-[0_0_15px_rgba(254,240,138,0.6)]"
                            : "text-stone-900"
                        }`}
                      >
                        Palak's Diary
                      </h3>
                      <p
                        className={`font-handwriting mt-1 text-lg sm:text-xl font-bold ${
                          isNightMode ? "text-cyan-200" : "text-rose-800"
                        }`}
                      >
                        "A collection of my memories, dreams and little happiness ♡"
                      </p>
                    </div>

                    {/* Left Page Fairytale Card & Ribbon Note */}
                    <div
                      className={`mt-8 rounded-2xl border p-5 shadow-sm transition-all duration-500 ${
                        isNightMode
                          ? "border-indigo-400/40 bg-gradient-to-br from-indigo-950/80 to-slate-900/80 text-slate-200 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                          : "border-amber-300/80 bg-gradient-to-br from-pink-50/85 to-amber-50/85 text-stone-800"
                      }`}
                    >
                      <h4
                        className={`font-serif text-sm font-bold flex items-center gap-2 ${
                          isNightMode ? "text-cyan-200" : "text-pink-950"
                        }`}
                      >
                        <FeatherIcon
                          className={`h-4 w-4 ${isNightMode ? "text-cyan-300" : "text-pink-700"}`}
                        />
                        A Gentle Memory Book
                      </h4>
                      <p
                        className={`font-handwriting mt-2 text-base leading-relaxed font-semibold ${
                          isNightMode ? "text-slate-200" : "text-stone-800"
                        }`}
                      >
                        Here you will find real memories, singing recordings, travel adventures,
                        quiet thoughts, and milestone photographs. Click any chapter ribbon on the
                        right to turn the pages.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Left Note with Owner Activation */}
                  <div
                    className={`mt-6 flex items-center justify-between text-xs font-serif ${
                      isNightMode ? "text-slate-400" : "text-stone-500"
                    }`}
                  >
                    <span>Handcrafted with Care</span>
                    <span
                      onClick={onActivateOwner}
                      className={`font-cursive text-base cursor-pointer select-none transition ${
                        isNightMode
                          ? "text-amber-200 hover:text-amber-100 drop-shadow-[0_0_8px_rgba(254,240,138,0.7)]"
                          : "text-rose-700 hover:text-pink-600"
                      }`}
                      title="Palak Tripathi"
                    >
                      Palak Tripathi ♡
                    </span>
                  </div>
                </div>

                {/* Right Page: Handcrafted Contents Ribbon Menu (Reference Image Match) */}
                <div className="relative p-6 sm:p-10 flex flex-col justify-between">
                  {/* Decorative Banner Heading "Contents ♡" */}
                  <div className="text-center relative">
                    <div
                      className={`inline-block relative px-8 py-2 rounded-xl border shadow-xs transition-all duration-500 ${
                        isNightMode
                          ? "bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-indigo-950/90 border-indigo-400/80 shadow-[0_0_15px_rgba(129,140,248,0.4)]"
                          : "bg-gradient-to-r from-amber-100/90 via-pink-100/90 to-amber-100/90 border-amber-300/80"
                      }`}
                    >
                      <h2
                        className={`font-cursive text-4xl sm:text-5xl font-bold tracking-wide ${
                          isNightMode
                            ? "text-amber-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.6)]"
                            : "text-stone-900"
                        }`}
                      >
                        Contents ♡
                      </h2>
                    </div>

                    {/* Feather Quill & Fluttering Butterfly in Upper Right */}
                    <div className="absolute top-0 right-2 hidden sm:block animate-butterfly">
                      <span className="text-2xl filter drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]">
                        🦋
                      </span>
                    </div>
                  </div>

                  {/* 7 Handcrafted Ribbon Tabs (Left) & Polaroid Photos (Right) */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1.25fr_0.9fr] gap-4 items-center">
                    {/* The 7 Chapter Ribbons */}
                    <div className="space-y-2">
                      {chapters.map((chapter, idx) => {
                        const Icon = CHAPTER_ICONS[idx % CHAPTER_ICONS.length];
                        const style = RIBBON_STYLES[idx % RIBBON_STYLES.length];
                        return (
                          <button
                            key={chapter.id}
                            onClick={() => jumpToChapter(idx)}
                            className={`diary-ribbon-tab group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-r-2xl rounded-l-md border ${style.bg} ${style.border} ${style.text} ${style.shadow} shadow-md text-left transition duration-200`}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-xs">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="font-serif text-sm font-bold tracking-wide truncate">
                              {chapter.title}
                            </span>
                            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-serif text-xs">
                              →
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Polaroid Scrapbook Photos with Pink Washi Tape (From Reference Image) */}
                    <div className="relative flex flex-col items-center gap-3 py-2">
                      {/* Polaroid 1: Pastel Clouds */}
                      <div className="relative w-28 p-2 pb-5 bg-white rounded-sm shadow-md transform rotate-6 hover:rotate-0 transition duration-300">
                        <div className="diary-washi-tape absolute -top-2 left-6 w-12 h-3" />
                        <div className="h-16 w-full rounded-xs bg-gradient-to-t from-sky-200 to-pink-100 flex items-center justify-center text-xs">
                          ☁️ 🌸
                        </div>
                        <span className="block mt-1 font-handwriting text-[10px] text-center text-stone-600 font-bold">
                          Cloudscapes
                        </span>
                      </div>

                      {/* Polaroid 2: Crescent Moon Sky */}
                      <div className="relative w-28 p-2 pb-5 bg-white rounded-sm shadow-md transform -rotate-6 hover:rotate-0 transition duration-300 -mt-2">
                        <div className="diary-washi-tape absolute -top-2 right-4 w-12 h-3" />
                        <div className="h-16 w-full rounded-xs bg-gradient-to-t from-stone-900 to-indigo-950 flex items-center justify-center text-xs">
                          🌙 ✨
                        </div>
                        <span className="block mt-1 font-handwriting text-[10px] text-center text-stone-600 font-bold">
                          Starry Dreams
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Closing Line (From Reference Image) */}
                  <div
                    className={`mt-6 text-center border-t pt-3 ${
                      isNightMode ? "border-indigo-500/30" : "border-amber-900/15"
                    }`}
                  >
                    <p
                      className={`font-handwriting text-lg sm:text-xl font-bold ${
                        isNightMode
                          ? "text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                          : "text-stone-800"
                      }`}
                    >
                      "Let's turn the pages... into beautiful memories ♡"
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* CHAPTER INSIDE VIEW — TWO-PAGE REAL STORYBOOK SPREADS */
              activeChapter && (
                <div className="min-h-[610px]">
                  {activeChapter.slug === "my-story" && (
                    <StoryChapter
                      chapter={activeChapter}
                      isNightMode={isNightMode}
                      onSelectItem={onSelectItem}
                      onOpenAdmin={onOpenAdmin}
                    />
                  )}
                  {activeChapter.slug === "my-talents" && (
                    <TalentsChapter
                      chapter={activeChapter}
                      isNightMode={isNightMode}
                      onSelectItem={onSelectItem}
                      onOpenAdmin={onOpenAdmin}
                    />
                  )}
                  {activeChapter.slug === "travel-diaries" && (
                    <TravelChapter
                      chapter={activeChapter}
                      isNightMode={isNightMode}
                      onSelectItem={onSelectItem}
                      onOpenAdmin={onOpenAdmin}
                    />
                  )}
                  {activeChapter.slug === "my-memories" && (
                    <MemoriesChapter
                      chapter={activeChapter}
                      isNightMode={isNightMode}
                      onSelectItem={onSelectItem}
                      onOpenAdmin={onOpenAdmin}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Page Navigation Controls */}
      <div className="relative z-30 mt-5 flex items-center justify-between px-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`rounded-full border font-serif text-xs font-semibold shadow-sm backdrop-blur disabled:opacity-30 transition ${
            isNightMode
              ? "border-indigo-400/80 bg-indigo-950/90 text-cyan-200 hover:bg-indigo-900"
              : "border-pink-300/80 bg-pink-50/90 text-pink-950 hover:bg-pink-100"
          }`}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          <span
            className={`font-handwriting text-base sm:text-lg font-bold transition-colors ${
              isNightMode ? "text-amber-200 drop-shadow-sm" : "text-pink-950"
            }`}
          >
            {currentPage === 0
              ? "Contents ♡"
              : `Chapter ${currentPage} of ${totalPages} · ${activeChapter?.title}`}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`rounded-full border font-serif text-xs font-semibold shadow-sm backdrop-blur disabled:opacity-30 transition ${
            isNightMode
              ? "border-indigo-400/80 bg-indigo-950/90 text-cyan-200 hover:bg-indigo-900"
              : "border-pink-300/80 bg-pink-50/90 text-pink-950 hover:bg-pink-100"
          }`}
        >
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
