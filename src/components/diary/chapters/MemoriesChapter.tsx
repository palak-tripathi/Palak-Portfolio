import {
  Camera,
  Heart,
  PlusCircle,
  Sparkles,
  ZoomIn,
  Pin,
  Paperclip,
  Calendar,
  MapPin,
} from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  isNightMode?: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

export function MemoriesChapter({
  chapter,
  isNightMode = false,
  onSelectItem,
  onOpenAdmin,
}: ChapterProps) {
  const publishedItems = chapter.items.filter((i) => i.published);

  return (
    <div className="relative min-h-[610px] p-3 sm:p-7 select-none">
      {/* Chapter Vintage Header */}
      <div
        className={`mb-6 border-b-2 border-dashed pb-4 text-center ${
          isNightMode ? "border-rose-400/30" : "border-rose-300/70"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/90 dark:bg-rose-950/70 px-4 py-1 text-xs font-serif font-bold uppercase tracking-[0.25em] text-rose-950 dark:text-rose-200 shadow-xs border border-rose-300/60">
          <Camera className="h-3.5 w-3.5 text-rose-700 dark:text-rose-400" /> Chapter IV • Memory
          Scrapbook
        </div>
        <h2
          className={`font-cursive mt-2 text-4xl sm:text-5xl font-extrabold ${
            isNightMode
              ? "text-rose-200 drop-shadow-[0_0_12px_rgba(251,113,133,0.5)]"
              : "text-stone-900"
          }`}
        >
          {chapter.title} 📸
        </h2>
        <p
          className={`font-handwriting mt-1 text-lg sm:text-xl font-bold ${
            isNightMode ? "text-rose-300" : "text-rose-900"
          }`}
        >
          "{chapter.subtitle}"
        </p>

        {/* Small Memory Sticker */}
        <div className="mt-2.5 inline-flex items-center gap-2 text-xs font-handwriting text-stone-500 dark:text-stone-400">
          <span>🌸 College days & friendships</span>
          <span>•</span>
          <span>"The days are long, but the years are fleeting snapshots"</span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-rose-800 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/60 px-3.5 py-1 rounded-full border border-rose-200 dark:border-rose-800">
          <Sparkles className="h-3.5 w-3.5 text-rose-600 animate-pulse" />
          <span>Pinterest Polaroid Board · Distinct Real Photos</span>
        </div>

        <button
          onClick={onOpenAdmin}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-serif font-bold transition hover:scale-105 shadow-xs border ${
            isNightMode
              ? "border-rose-400/50 bg-rose-950/70 text-rose-200 hover:bg-rose-900/60"
              : "border-rose-300/80 bg-rose-50 text-rose-950 hover:bg-rose-100"
          }`}
        >
          <PlusCircle className="h-3.5 w-3.5" /> Add Memory
        </button>
      </div>

      {publishedItems.length === 0 ? (
        <div
          className={`my-8 flex min-h-[340px] flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center ${
            isNightMode
              ? "border-rose-400/40 bg-rose-950/20 text-slate-200"
              : "border-rose-300/80 bg-rose-50/40 text-stone-700"
          }`}
        >
          <Heart className="h-8 w-8 text-rose-500 animate-pulse mb-3" />
          <h3 className="font-serif text-2xl font-bold">Memory Canvas</h3>
          <p className="font-handwriting mt-2 max-w-md text-base">
            Polaroids of college friends, laughter, and milestones will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {publishedItems.map((item, idx) => {
            const rotations = ["-1.5deg", "1.5deg", "-1deg", "2deg"];
            const rot = rotations[idx % rotations.length];

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{ transform: `rotate(${rot})` }}
                className={`group relative cursor-pointer rounded-2xl border-2 p-4 pb-6 transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${
                  isNightMode
                    ? "border-rose-400/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 shadow-[0_10px_25px_rgba(251,113,133,0.15)]"
                    : "border-rose-200/90 bg-[#fffdfa] text-stone-900 shadow-[0_12px_25px_rgba(251,113,133,0.12)]"
                }`}
              >
                {/* Washi Tape Accent on Top Edge */}
                <div
                  className={`diary-washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4.5 z-10 ${
                    idx % 2 === 0
                      ? "bg-rose-200/90 border-t border-b border-rose-300 -rotate-2"
                      : "bg-amber-200/90 border-t border-b border-amber-300 rotate-2"
                  }`}
                />

                {/* Decorative Paperclip / Pin */}
                <div className="absolute top-2 right-2 text-stone-400 dark:text-stone-500">
                  <Paperclip className="h-4 w-4 -rotate-45" />
                </div>

                <div>
                  {/* Polaroid Photo Frame */}
                  {item.mediaUrl && (
                    <div className="relative mt-2 overflow-hidden rounded-xl border-4 border-white dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shadow-md aspect-[4/3] flex items-center justify-center">
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition group-hover:opacity-100 backdrop-blur-[1px]">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 text-stone-900 px-3 py-1 text-xs font-serif font-bold shadow-lg">
                          <ZoomIn className="h-3.5 w-3.5 text-rose-600" /> Click to enlarge
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Polaroid Margin: Handwritten Title and Date */}
                  <div className="mt-3.5 flex items-baseline justify-between border-b border-rose-200/50 dark:border-rose-400/20 pb-1.5">
                    <h3 className="font-serif text-base sm:text-lg font-bold group-hover:text-rose-600 transition truncate">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-rose-700 dark:text-rose-300 mt-1">
                    {item.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1 text-stone-500">
                        <MapPin className="h-2.5 w-2.5 text-rose-500" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Handwritten Memory Note */}
                  {item.caption && (
                    <p className="font-handwriting mt-2 text-sm sm:text-base leading-snug font-semibold text-stone-700 dark:text-rose-100 line-clamp-3">
                      "{item.caption}"
                    </p>
                  )}
                </div>

                {/* Footer Tag */}
                <div className="mt-3 pt-2 border-t border-rose-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>#CollegeDays</span>
                  <span className="text-rose-500">Inspect 🔍</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Decorative Scrapbook Notes Ribbon */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Yellow Sticky Note */}
        <div
          className={`relative rounded-2xl border p-4 shadow-sm transform rotate-1 ${
            isNightMode
              ? "border-amber-400/40 bg-amber-950/70 text-amber-100"
              : "border-amber-300 bg-[#fefce8] text-stone-800"
          }`}
        >
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-rose-500 text-xs">
            📌
          </div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
            Little things to remember ♡
          </h4>
          <p className="font-handwriting text-sm sm:text-base leading-relaxed font-bold">
            "College isn't just about lectures and exams. It's the impromptu laughter on campus
            lawns, canteen chai between classes, and the friends who turn ordinary afternoons into
            lifelong memories."
          </p>
        </div>

        {/* Pink Sticky Note */}
        <div
          className={`relative rounded-2xl border p-4 shadow-sm transform -rotate-1 ${
            isNightMode
              ? "border-rose-400/40 bg-rose-950/60 text-rose-100"
              : "border-rose-200 bg-[#fff1f2] text-stone-800"
          }`}
        >
          <div className="diary-washi-tape absolute -top-2 left-6 w-14 h-3.5 bg-teal-200/90 border-t border-b border-teal-300" />
          <p className="font-handwriting text-sm sm:text-base leading-relaxed font-semibold">
            "Somewhere between late night code builds and early morning exams, we built something
            unforgettable together ♡"
          </p>
          <span className="block mt-1.5 font-mono text-[10px] opacity-70">
            CLASS OF 2026 • COMPUTER SCIENCE & BUSINESS SYSTEMS
          </span>
        </div>
      </div>

      {/* Decorative Footnote */}
      <div
        className={`mt-8 pt-3 flex items-center justify-between text-xs font-serif border-t ${
          isNightMode ? "border-rose-400/20 text-slate-400" : "border-amber-900/10 text-stone-500"
        }`}
      >
        <span>Treasured College & Friendship Snapshots</span>
        <span className="font-handwriting text-sm text-rose-600 font-bold">
          "made of memories & little dreams ♡"
        </span>
      </div>
    </div>
  );
}

export default MemoriesChapter;
