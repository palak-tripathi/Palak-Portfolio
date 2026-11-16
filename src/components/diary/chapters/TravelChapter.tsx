import { useState } from "react";
import {
  Compass,
  MapPin,
  Plane,
  PlusCircle,
  Sparkles,
  ZoomIn,
  Camera,
  Luggage,
  Ticket,
  Calendar,
  Sun,
  Globe,
} from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";
import { TravelRouteMap } from "../TravelRouteMap";

interface ChapterProps {
  chapter: DiaryChapter;
  isNightMode?: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

export function TravelChapter({
  chapter,
  isNightMode = false,
  onSelectItem,
  onOpenAdmin,
}: ChapterProps) {
  const publishedItems = chapter.items.filter((i) => i.published);

  return (
    <div className="relative min-h-[610px] p-3 sm:p-7 select-none overflow-hidden">
      {/* 3D Floating Travel Ambience Elements in corners */}
      <div className="absolute top-3 left-4 text-xl animate-bounce pointer-events-none opacity-80 z-10">
        ✈️
      </div>
      <div className="absolute top-5 right-8 text-sm animate-pulse pointer-events-none text-amber-400 z-10">
        🧭
      </div>
      <div className="absolute bottom-6 left-6 text-xs animate-ping pointer-events-none text-rose-400 z-10">
        ✦
      </div>
      <div className="absolute bottom-5 right-10 text-base animate-bounce pointer-events-none opacity-75 z-10">
        🌴
      </div>

      {/* Chapter Vintage Airmail Postcard Header */}
      <div
        className={`mb-5 border-b-2 border-dashed pb-4 text-center relative ${
          isNightMode ? "border-teal-400/30" : "border-teal-300/70"
        }`}
      >
        {/* Airmail stripes decorative top bar */}
        <div className="absolute -top-2 inset-x-8 h-1.5 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#ffffff_10px,#ffffff_20px,#3b82f6_20px,#3b82f6_30px,#ffffff_30px,#ffffff_40px)] opacity-70 rounded-full" />

        <div className="inline-flex items-center gap-2 rounded-full bg-teal-100/90 dark:bg-teal-950/70 px-4 py-1 text-xs font-serif font-bold uppercase tracking-[0.25em] text-teal-950 dark:text-teal-200 shadow-xs border border-teal-300/60 mt-2">
          <Plane className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" /> Chapter III •
          Wanderlust Diaries
        </div>

        <h2
          className={`font-cursive mt-2 text-3xl sm:text-5xl font-extrabold ${
            isNightMode
              ? "text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              : "text-stone-900"
          }`}
        >
          {chapter.title} ✈️
        </h2>

        <p
          className={`font-handwriting mt-1 text-base sm:text-xl font-bold ${
            isNightMode ? "text-teal-300" : "text-teal-900"
          }`}
        >
          "{chapter.subtitle}"
        </p>

        {/* Small Travel Quote Sticker */}
        <div className="mt-2 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-handwriting text-stone-600 dark:text-stone-300 font-semibold">
          <span>📮 Airmail Postcard</span>
          <span>•</span>
          <span>"To travel is to collect sunsets and keep them between paper pages"</span>
        </div>
      </div>

      {/* Interactive Controls & Add Card Banner */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
          <Compass className="h-3.5 w-3.5 animate-spin-slow text-teal-600" />
          <span>Interactive Map & Road Trip Expedition</span>
        </div>

        <button
          onClick={onOpenAdmin}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-serif font-bold transition hover:scale-105 shadow-xs border ${
            isNightMode
              ? "border-teal-400/50 bg-teal-950/70 text-cyan-200 hover:bg-teal-900/60"
              : "border-teal-300/80 bg-teal-50 text-teal-950 hover:bg-teal-100"
          }`}
        >
          <PlusCircle className="h-3.5 w-3.5" /> Add Postcard
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 1. INTERACTIVE TRAVEL ROUTE MAP WITH ANIMATED GIRL DRIVING VINTAGE CAR */}
      {/* ===================================================================== */}
      <TravelRouteMap
        isNightMode={isNightMode}
        onSelectItem={onSelectItem}
        travelItems={publishedItems}
      />

      {/* ===================================================================== */}
      {/* 2. DENSELY PACKED CUTE POLAROIDS (Small, aesthetic, punchy notes)      */}
      {/* ===================================================================== */}
      <div className="mt-8 border-t-2 border-dashed pt-6 border-teal-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
              Scrapbook Polaroids & Travel Notes
            </h3>
          </div>
          <span className="font-handwriting text-xs sm:text-sm font-bold text-teal-700 dark:text-teal-300">
            "small polaroids · golden hour · endless roads ♡"
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {publishedItems.map((item, idx) => {
            const rotations = ["-1deg", "1.5deg", "-2deg", "1deg", "-1.5deg", "2deg"];
            const currentRotation = rotations[idx % rotations.length];

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{ transform: `rotate(${currentRotation})` }}
                className={`group relative cursor-pointer rounded-2xl border-2 p-2 pb-3 shadow-md transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-xl ${
                  isNightMode
                    ? "border-teal-400/40 bg-[#0e1626] text-slate-100"
                    : "border-pink-200/90 bg-[#fffdfa] text-stone-900"
                }`}
              >
                {/* Cute Corner Push-pin or Washi Tape */}
                <div
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 rounded-xs border-x shadow-2xs z-10 pointer-events-none ${
                    idx % 3 === 0
                      ? "bg-amber-200/90 border-amber-400 -rotate-2"
                      : idx % 3 === 1
                        ? "bg-rose-200/90 border-rose-400 rotate-2"
                        : "bg-teal-200/90 border-teal-400 -rotate-1"
                  }`}
                />

                {/* Small Cute Polaroid Photo */}
                {item.mediaUrl && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-inner">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
                      <ZoomIn className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Short, Punchy Handwritten Notes */}
                <div className="mt-2 text-center">
                  <h4 className="font-serif text-xs font-bold truncate group-hover:text-teal-600 transition">
                    {item.title.split("·")[0].trim()}
                  </h4>
                  {item.caption && (
                    <p className="font-handwriting text-[11px] text-stone-600 dark:text-stone-300 font-semibold line-clamp-1 mt-0.5">
                      "{item.caption}"
                    </p>
                  )}
                  {item.location && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-teal-700 dark:text-cyan-300 mt-1 truncate">
                      <MapPin className="h-2.5 w-2.5 text-rose-500" />
                      {item.location.split(",")[0]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3D Scrapbook Decor Marginalia Strip (Zero Empty Space) */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Card 1: 3D Luggage Tag */}
          <div
            className={`rounded-xl border p-2.5 shadow-xs flex items-center gap-2 transform -rotate-1 hover:rotate-0 transition ${
              isNightMode
                ? "border-amber-400/30 bg-amber-950/50 text-amber-200"
                : "border-amber-200 bg-[#fefce8] text-stone-800"
            }`}
          >
            <span className="text-xl">🧳</span>
            <div className="min-w-0">
              <span className="font-mono text-[9px] font-bold block uppercase tracking-wider text-amber-700 dark:text-amber-300">
                TRAVEL PACK
              </span>
              <p className="font-handwriting text-xs font-bold truncate">
                "Bag packed, music queued"
              </p>
            </div>
          </div>

          {/* Card 2: 3D Camera Memories */}
          <div
            className={`rounded-xl border p-2.5 shadow-xs flex items-center gap-2 transform rotate-1 hover:rotate-0 transition ${
              isNightMode
                ? "border-rose-400/30 bg-rose-950/50 text-rose-200"
                : "border-rose-200 bg-[#fff1f2] text-stone-800"
            }`}
          >
            <span className="text-xl">📸</span>
            <div className="min-w-0">
              <span className="font-mono text-[9px] font-bold block uppercase tracking-wider text-rose-700 dark:text-rose-300">
                KODAK 35MM
              </span>
              <p className="font-handwriting text-xs font-bold truncate">
                "Captured in warm film light"
              </p>
            </div>
          </div>

          {/* Card 3: 3D Vintage Ticket Stub */}
          <div
            className={`rounded-xl border p-2.5 shadow-xs flex items-center gap-2 transform -rotate-1 hover:rotate-0 transition ${
              isNightMode
                ? "border-teal-400/30 bg-teal-950/50 text-teal-200"
                : "border-teal-200 bg-[#f0fdfa] text-stone-800"
            }`}
          >
            <span className="text-xl">🎫</span>
            <div className="min-w-0">
              <span className="font-mono text-[9px] font-bold block uppercase tracking-wider text-teal-700 dark:text-teal-300">
                TICKET #4829
              </span>
              <p className="font-handwriting text-xs font-bold truncate">"Window seat & chai"</p>
            </div>
          </div>

          {/* Card 4: 3D Golden Compass */}
          <div
            className={`rounded-xl border p-2.5 shadow-xs flex items-center gap-2 transform rotate-1 hover:rotate-0 transition ${
              isNightMode
                ? "border-cyan-400/30 bg-cyan-950/50 text-cyan-200"
                : "border-cyan-200 bg-[#f0f9ff] text-stone-800"
            }`}
          >
            <span className="text-xl">🧭</span>
            <div className="min-w-0">
              <span className="font-mono text-[9px] font-bold block uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                TRUE NORTH
              </span>
              <p className="font-handwriting text-xs font-bold truncate">
                "Chasing sunsets & peace"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Scrapbook Footnote */}
      <div
        className={`mt-6 pt-3 flex items-center justify-between text-xs font-serif border-t ${
          isNightMode ? "border-teal-400/20 text-slate-400" : "border-amber-900/10 text-stone-500"
        }`}
      >
        <span>Wanderlust & Travel Memories</span>
        <span className="font-handwriting text-sm text-teal-600 font-bold">
          "collected sunsets, not perfect moments ♡"
        </span>
      </div>
    </div>
  );
}

export default TravelChapter;
