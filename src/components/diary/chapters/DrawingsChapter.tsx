import { Palette, PlusCircle, Sparkles, ZoomIn, Feather, Brush, Layers } from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  isNightMode?: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

export function DrawingsChapter({
  chapter,
  isNightMode = false,
  onSelectItem,
  onOpenAdmin,
}: ChapterProps) {
  const publishedItems = chapter.items.filter((i) => i.published);

  return (
    <div className="relative min-h-[610px] p-3 sm:p-8 select-none">
      {/* Chapter Vintage Artist Header */}
      <div
        className={`mb-6 border-b-2 border-dashed pb-4 text-center relative ${
          isNightMode ? "border-amber-400/30" : "border-orange-300/70"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/90 dark:bg-orange-950/70 px-4 py-1 text-xs font-serif font-bold uppercase tracking-[0.25em] text-orange-950 dark:text-orange-200 shadow-xs border border-orange-300/50">
          <Palette className="h-3.5 w-3.5 text-orange-700 dark:text-orange-400" /> Chapter V •
          Creative Atelier & Sketchbook
        </div>

        <h2
          className={`font-cursive mt-2 text-4xl sm:text-5xl font-extrabold ${
            isNightMode
              ? "text-amber-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.5)]"
              : "text-stone-900"
          }`}
        >
          {chapter.title} 🎨✨
        </h2>

        <p
          className={`font-handwriting mt-1 text-base sm:text-lg font-bold ${
            isNightMode ? "text-amber-300" : "text-amber-900"
          }`}
        >
          "{chapter.subtitle}"
        </p>

        {/* Studio Tool Ribbon & Marginalia */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-xs font-serif text-stone-600 dark:text-stone-300">
          <span className="rounded-full bg-amber-100/80 dark:bg-stone-800 px-3 py-0.5 border border-amber-300/60 font-mono text-[10px]">
            ✎ Prismacolor & Micron Ink
          </span>
          <span>•</span>
          <span className="rounded-full bg-rose-100/80 dark:bg-stone-800 px-3 py-0.5 border border-rose-300/60 font-mono text-[10px]">
            🖌️ Winsor & Newton Watercolor
          </span>
          <span>•</span>
          <span className="font-handwriting text-orange-700 dark:text-amber-300 font-bold">
            "between pencil & paper, the world is quiet"
          </span>
        </div>
      </div>

      {/* Action / Add Artwork */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-orange-800 dark:text-amber-200 bg-orange-50 dark:bg-stone-900 px-3 py-1 rounded-full border border-orange-200 dark:border-stone-800">
          <Brush className="h-3.5 w-3.5 text-orange-600" />
          <span>Authentic Handcrafted Works & Studies</span>
        </div>

        <button
          onClick={onOpenAdmin}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-serif font-bold transition hover:scale-105 shadow-xs border ${
            isNightMode
              ? "border-amber-400/50 bg-amber-950/60 text-amber-200 hover:bg-amber-900/60"
              : "border-orange-300/80 bg-orange-50 text-orange-950 hover:bg-orange-100"
          }`}
        >
          <PlusCircle className="h-3.5 w-3.5" /> Add Artwork
        </button>
      </div>

      {/* ======================================================== */}
      {/* ARTWORK GALLERY — REALISTIC FRAMES & CALLIGRAPHY DETAILS */}
      {/* ======================================================== */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {publishedItems.map((item, idx) => {
          const rotations = ["-1.5deg", "1.5deg", "-1deg", "2deg"];
          const currentRot = rotations[idx % rotations.length];
          const isHighlight = idx === 0;

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              style={{ transform: `rotate(${currentRot})` }}
              className={`group relative cursor-pointer rounded-3xl border-2 p-4 sm:p-5 transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${
                isHighlight ? "sm:col-span-2 lg:col-span-1" : ""
              } ${
                isNightMode
                  ? "border-amber-400/30 bg-gradient-to-br from-slate-900 via-stone-900 to-slate-900 shadow-[0_10px_25px_rgba(251,146,60,0.15)] text-slate-100"
                  : "border-orange-200/90 bg-[#fffdfa] shadow-[0_12px_28px_rgba(251,146,60,0.12)] text-stone-900"
              }`}
            >
              {/* Top Washi Tape Strip */}
              <div
                className={`diary-washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4.5 z-10 ${
                  idx % 2 === 0 ? "rotate-1" : "-rotate-2"
                }`}
              />

              {/* Wooden Pin & Authenticity Stamp */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-mono">
                <span className="text-sm">📌</span>
                <span className="rounded-xs border border-orange-300/80 bg-orange-100/80 dark:bg-stone-800 px-1.5 py-0.5 text-[8px] font-bold uppercase text-orange-900 dark:text-orange-200">
                  HANDMADE
                </span>
              </div>

              <div>
                {/* Artwork Canvas Frame with Shadow Bevel */}
                <div className="relative mt-2 overflow-hidden rounded-2xl border-4 border-white dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shadow-md aspect-[4/3] flex items-center justify-center">
                  {item.mediaUrl ? (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="h-full w-full object-contain p-1.5 transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <Palette className="h-12 w-12 text-orange-400/40" />
                  )}

                  {/* Hover Zoom Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100 backdrop-blur-[1px]">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 text-stone-900 px-3.5 py-1.5 text-xs font-serif font-bold shadow-lg">
                      <ZoomIn className="h-4 w-4 text-orange-600" /> Click to Zoom Original Work
                    </span>
                  </div>
                </div>

                {/* Calligraphy Title & Medium Technique Tag */}
                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-orange-700 dark:text-orange-300 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Feather className="h-3 w-3" />
                      {item.category || "Illustration"}
                    </span>
                    <span>{item.date || "2024"}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold group-hover:text-orange-600 transition truncate">
                    {item.title}
                  </h3>
                </div>

                {/* Handwritten Behind-the-Canvas Story */}
                {item.caption && (
                  <div className="mt-2.5 rounded-xl border border-orange-200/60 dark:border-stone-800 bg-orange-50/50 dark:bg-stone-900/60 p-2.5">
                    <p className="font-handwriting text-sm leading-snug font-semibold text-stone-800 dark:text-amber-100/90 line-clamp-2">
                      "{item.caption}"
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Card Tools Footer */}
              <div className="mt-3 pt-2 border-t border-orange-200/50 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span className="flex items-center gap-1 text-orange-600">
                  <Sparkles className="h-3 w-3" /> Palak's Sketchbook
                </span>
                <span className="text-teal-600 hover:underline">Click to Inspect 🔍</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Studio Studio Notes Footnote */}
      <div
        className={`mt-8 pt-3 flex items-center justify-between text-xs font-serif border-t ${
          isNightMode ? "border-amber-400/20 text-slate-400" : "border-amber-900/10 text-stone-500"
        }`}
      >
        <span>Palak's Personal Art Portfolio</span>
        <span className="font-handwriting text-sm text-orange-600 font-bold">
          "art washes away the dust of everyday life ♡"
        </span>
      </div>
    </div>
  );
}

export default DrawingsChapter;
