import { useState } from "react";
import {
  Compass,
  MapPin,
  Plane,
  PlusCircle,
  Sparkles,
  ZoomIn,
  Camera,
  Heart,
  Eye,
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
    <div className="relative min-h-[610px] p-3 sm:p-8 select-none">
      {/* Chapter Vintage Airmail Postcard Header */}
      <div
        className={`mb-6 border-b-2 border-dashed pb-5 text-center relative ${
          isNightMode ? "border-teal-400/30" : "border-teal-300/70"
        }`}
      >
        {/* Airmail stripes decorative top bar */}
        <div className="absolute -top-2 inset-x-8 h-1.5 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#ffffff_10px,#ffffff_20px,#3b82f6_20px,#3b82f6_30px,#ffffff_30px,#ffffff_40px)] opacity-70 rounded-full" />

        <div className="inline-flex items-center gap-2 rounded-full bg-teal-100/90 dark:bg-teal-950/70 px-4 py-1 text-xs font-serif font-bold uppercase tracking-[0.25em] text-teal-950 dark:text-teal-200 shadow-xs border border-teal-300/60 mt-2">
          <Plane className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" /> Chapter IV • Wanderlust
          Scrapbook
        </div>

        <h2
          className={`font-cursive mt-2 text-4xl sm:text-5xl font-extrabold ${
            isNightMode
              ? "text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              : "text-stone-900"
          }`}
        >
          {chapter.title} ✈️
        </h2>

        <p
          className={`font-handwriting mt-1 text-lg sm:text-xl font-bold ${
            isNightMode ? "text-teal-300" : "text-teal-900"
          }`}
        >
          "{chapter.subtitle}"
        </p>

        {/* Small Travel Quote Sticker */}
        <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-handwriting text-stone-600 dark:text-stone-300">
          <span>📮 Airmail Collection</span>
          <span>•</span>
          <span>"To travel is to collect sunsets and keep them between paper pages"</span>
        </div>
      </div>

      {/* Header Actions / Upload */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/60 px-3.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
          <Compass className="h-3.5 w-3.5 animate-spin-slow text-teal-600" />
          <span>Pinterest Travel Moodboard · Real Photos</span>
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

      {/* INTERACTIVE TRAVEL ROUTE MAP WITH ANIMATED GIRL RIDING SCOOTY */}
      <TravelRouteMap
        isNightMode={isNightMode}
        onSelectItem={onSelectItem}
        travelItems={publishedItems}
      />

      {/* PINTEREST & VINTAGE SCRAPBOOK PHOTO SPREAD */}
      {publishedItems.length === 0 ? (
        <div
          className={`my-8 flex min-h-[340px] flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center ${
            isNightMode
              ? "border-teal-400/40 bg-teal-950/20 text-slate-200"
              : "border-teal-300/80 bg-teal-50/40 text-stone-700"
          }`}
        >
          <Compass className="h-8 w-8 text-teal-500 animate-pulse mb-3" />
          <h3 className="font-serif text-2xl font-bold">A Vintage Travel Journal</h3>
          <p className="font-handwriting mt-2 max-w-md text-base">
            Postcards from unfamiliar roads, flight stubs, and golden sunsets await your entries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
          {publishedItems.map((item, idx) => {
            const rotations = ["-1.5deg", "1.5deg", "-2deg", "2deg", "-1deg", "1.5deg"];
            const currentRotation = rotations[idx % rotations.length];
            const isFeatured = idx === 0;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{ transform: `rotate(${currentRotation})` }}
                className={`group relative cursor-pointer rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl ${
                  isFeatured ? "md:col-span-2" : ""
                } ${
                  isNightMode
                    ? "border-teal-400/30 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_10px_25px_rgba(20,184,166,0.15)] text-slate-100"
                    : "border-amber-200/90 bg-[#fffdf9] shadow-[0_12px_28px_rgba(20,184,166,0.12)] text-stone-900"
                }`}
              >
                {/* Washi Tape Accent on Top Edge */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 border-x shadow-xs z-10 pointer-events-none ${
                    idx % 3 === 0
                      ? "bg-amber-200/90 border-amber-300 -rotate-2"
                      : idx % 3 === 1
                        ? "bg-rose-200/90 border-rose-300 rotate-2"
                        : "bg-teal-200/90 border-teal-300 -rotate-1"
                  }`}
                />

                {/* Corner Push-Pin or Stamp */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <div className="rounded-xs border border-dashed border-rose-400/80 bg-rose-50/90 dark:bg-rose-950/80 px-2 py-0.5 text-[8px] font-mono font-bold text-rose-800 dark:text-rose-200 shadow-xs uppercase">
                    AIRMAIL 📮
                  </div>
                </div>

                {/* Location Pin & Date Tag */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/90 dark:bg-teal-950/80 px-3 py-0.5 font-serif text-xs font-bold text-teal-950 dark:text-teal-200 border border-teal-300/50">
                    <MapPin className="h-3.5 w-3.5 text-rose-500 animate-bounce" />
                    {item.location || "Wanderlust Destination"}
                  </span>
                  {item.date && (
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-full">
                      {item.date}
                    </span>
                  )}
                </div>

                {/* Postcard Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-teal-600 transition">
                  {item.title}
                </h3>

                {/* Polaroid Frame for Photograph */}
                {item.mediaUrl && (
                  <div
                    className={`relative mt-3 overflow-hidden rounded-2xl border-4 border-white dark:border-stone-800 bg-black/5 shadow-md ${
                      isFeatured ? "aspect-[16/9]" : "aspect-[4/3]"
                    } flex items-center justify-center`}
                  >
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover Zoom Prompt Badge */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100 backdrop-blur-[1px]">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 text-stone-900 px-4 py-1.5 text-xs font-serif font-bold shadow-xl">
                        <ZoomIn className="h-4 w-4 text-teal-600" /> Click to Inspect & Zoom Detail
                      </span>
                    </div>
                  </div>
                )}

                {/* Handwritten Postcard Marginalia Note */}
                {item.caption && (
                  <div className="mt-4 rounded-xl border border-amber-200/70 dark:border-teal-400/20 bg-amber-50/60 dark:bg-teal-950/40 p-3.5">
                    <p className="font-handwriting text-base sm:text-lg leading-relaxed font-semibold text-stone-800 dark:text-teal-100">
                      "{item.caption}"
                    </p>
                  </div>
                )}

                {/* Postcard Footer Note */}
                <div className="mt-3 flex items-center justify-between text-xs font-serif text-stone-400 dark:text-stone-500 border-t pt-2 border-stone-200/60 dark:border-stone-800">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" /> Authentic Travel Memory
                  </span>
                  <span className="font-mono text-[11px] text-teal-600 hover:underline">
                    Click to Open Full View 🔍
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Decorative Scrapbook Footnote */}
      <div
        className={`mt-10 pt-4 flex items-center justify-between text-xs font-serif border-t ${
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
