import {
  Gamepad2,
  PlusCircle,
  Sparkles,
  Coffee,
  Book,
  Heart,
  Music,
  Disc,
  ZoomIn,
} from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  isNightMode?: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

export function HobbiesChapter({
  chapter,
  isNightMode = false,
  onSelectItem,
  onOpenAdmin,
}: ChapterProps) {
  const publishedItems = chapter.items.filter((i) => i.published);

  const primaryHobbyItem = publishedItems[0] || {
    id: "hobby-acoustic-guitar",
    title: "Six Strings & Soft Harmonies",
    caption:
      "When screens turn off, music begins. Unplugged chords, soothing guitar rhythms, and soulful singing covers.",
    description:
      "Singing and playing guitar is where logic softens into melodic warmth. Unwinding with favorite acoustic covers.",
    date: "Acoustic Rituals",
    location: "Studio Corner",
    category: "hobbies",
    mediaType: "image",
    mediaUrl: "/assets/hobby-acoustic-guitar.jpg",
    aspectRatio: "portrait",
    frameStyle: "polaroid",
    sortOrder: 1,
    published: true,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[610px] select-none relative overflow-hidden">
      {/* Floating Musical Notes in Background */}
      <div className="absolute top-4 left-1/3 text-lg text-amber-500/70 animate-bounce pointer-events-none">
        ♪
      </div>
      <div className="absolute bottom-10 left-12 text-sm text-pink-400/80 animate-pulse pointer-events-none">
        ♫
      </div>
      <div className="absolute top-1/2 right-8 text-base text-cyan-400/80 animate-bounce pointer-events-none">
        ♬
      </div>

      {/* ======================================================== */}
      {/* LEFT PAGE: Aesthetic Guitar, Vinyl Record & Tea Rituals  */}
      {/* ======================================================== */}
      <div
        className={`relative border-b lg:border-b-0 lg:border-r p-4 sm:p-7 flex flex-col justify-between ${
          isNightMode ? "border-indigo-500/30" : "border-amber-900/15"
        }`}
      >
        <div>
          {/* Chapter Eyebrow Tag */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-serif font-bold uppercase tracking-[0.25em] ${
                isNightMode
                  ? "bg-indigo-950/80 border border-indigo-400/40 text-amber-200"
                  : "bg-amber-100/90 border border-amber-300/60 text-amber-950"
              }`}
            >
              <Music className="h-3 w-3 text-amber-600" /> Chapter III • Hobbies & Melodies
            </span>
            <span className="text-xl">🎸</span>
          </div>

          <h2
            className={`font-cursive mt-2.5 text-3xl sm:text-4xl font-extrabold ${
              isNightMode
                ? "text-amber-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.6)]"
                : "text-stone-900"
            }`}
          >
            Acoustic Chords & Simple Joys ♡
          </h2>
          <p
            className={`font-handwriting text-base sm:text-lg font-bold ${
              isNightMode ? "text-cyan-200" : "text-amber-900"
            }`}
          >
            "{chapter.subtitle}"
          </p>

          {/* ======================================================== */}
          {/* REAL GUITAR PHOTOGRAPH POLAROID WITH ZOOM INSPECT TRIGGER */}
          {/* ======================================================== */}
          <div className="relative mt-4 flex justify-center">
            <div
              onClick={() => onSelectItem(primaryHobbyItem)}
              className="group relative w-full max-w-[320px] p-3 pb-4 bg-white dark:bg-stone-900 rounded-2xl shadow-xl transform -rotate-1.5 hover:rotate-0 hover:scale-102 transition duration-300 border border-stone-200 dark:border-stone-800 cursor-pointer"
              title="Click to zoom acoustic melodies!"
            >
              {/* Washi Tape Strip */}
              <div className="diary-washi-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 z-10 rotate-1" />

              {/* Real Acoustic Guitar Photo Container */}
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden border-2 border-stone-800 shadow-inner bg-stone-950">
                <img
                  src="/assets/hobby-acoustic-guitar.jpg"
                  alt="Acoustic guitar resting by sunlit window"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-mono text-amber-200 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <Music className="h-3 w-3 text-amber-400" />
                  <span>Acoustic Session</span>
                </div>

                {/* Zoom prompt badge */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition backdrop-blur-[1px]">
                  <span className="rounded-full bg-white text-stone-900 px-3 py-1 text-xs font-serif font-bold shadow-lg flex items-center gap-1">
                    <ZoomIn className="h-3.5 w-3.5 text-amber-600" /> Inspect Melody Details
                  </span>
                </div>

                {/* Bottom Bar: Musical Waveform Snippet */}
                <div className="absolute bottom-1.5 inset-x-2 flex items-center justify-between text-[10px] font-mono text-amber-200">
                  <span className="flex items-center gap-1 font-bold">
                    <Disc className="h-3 w-3 text-rose-400 animate-spin-slow" /> Side A · Unplugged
                  </span>
                  <span className="text-amber-300 font-serif italic">Pure Acoustics</span>
                </div>
              </div>

              <div className="mt-2 text-center px-1">
                <span className="font-handwriting text-base font-bold text-stone-800 dark:text-stone-200 block truncate">
                  "Six Strings & Warm Harmonies"
                </span>
                <span className="font-serif text-[11px] text-stone-500 dark:text-stone-400">
                  Click to inspect the guitar Polaroid & notes 🔍
                </span>
              </div>
            </div>
          </div>

          {/* Dense Handwritten Scrapbook Card */}
          <div
            className={`mt-4 rounded-2xl border p-3.5 shadow-xs relative ${
              isNightMode
                ? "border-indigo-400/40 bg-indigo-950/70 text-slate-200"
                : "border-amber-300/80 bg-amber-50/80 text-stone-800"
            }`}
          >
            <div className="absolute -top-2 right-8 w-14 h-3.5 bg-rose-200/90 border-x border-rose-300 shadow-xs -rotate-2 pointer-events-none" />
            <p className="font-handwriting text-sm sm:text-base leading-relaxed font-semibold">
              "When screens turn off, I find peace in acoustic guitar chords, soothing singing
              harmonies, casual gaming sessions, and herbal tea. Balance keeps creativity alive and
              lines of code sharp."
            </p>
          </div>
        </div>

        {/* Left Page Footer */}
        <div
          className={`mt-3 pt-2 flex items-center justify-between text-xs font-serif border-t ${
            isNightMode
              ? "border-indigo-500/20 text-slate-400"
              : "border-amber-900/10 text-stone-500"
          }`}
        >
          <span>Mindful Pauses & Joys</span>
          <span className="font-cursive text-sm text-amber-600 font-bold">
            "where melody softens logic ♡"
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT PAGE: Densely Packed Pastimes & Collections        */}
      {/* ======================================================== */}
      <div className="relative p-4 sm:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3
              className={`font-serif text-base sm:text-lg font-bold flex items-center gap-2 ${
                isNightMode ? "text-slate-100" : "text-stone-900"
              }`}
            >
              <Sparkles className={`h-4 w-4 ${isNightMode ? "text-cyan-300" : "text-amber-600"}`} />
              Pastimes & Handcrafted Moments
            </h3>

            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-serif font-bold transition hover:scale-105 ${
                isNightMode
                  ? "border border-cyan-400/50 bg-cyan-950/60 text-cyan-300"
                  : "border border-amber-300/80 bg-amber-100/90 text-amber-950"
              }`}
            >
              <PlusCircle className="h-3.5 w-3.5" /> Add Hobby
            </button>
          </div>

          {/* Densely Packed Distinct Hobby Cards with Unique Photos */}
          <div className="space-y-3 max-h-[470px] overflow-y-auto pr-1">
            {publishedItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group rounded-2xl border-2 p-3 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-md ${
                  isNightMode
                    ? "border-amber-400/30 bg-[#121929] text-slate-100 hover:border-amber-400"
                    : "border-amber-200/90 bg-[#fffdf9] text-stone-900 hover:border-amber-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  {item.mediaUrl && (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-white dark:border-stone-800 shadow-md shrink-0 bg-stone-100 dark:bg-stone-800">
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="font-mono text-[10px] font-bold text-amber-700 dark:text-amber-300">
                        {item.date || "Pastime"}
                      </span>
                      {item.location && (
                        <span className="text-[10px] text-stone-500 truncate">
                          📍 {item.location}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-sm sm:text-base font-bold group-hover:text-amber-600 transition truncate">
                      {item.title}
                    </h4>

                    {item.caption && (
                      <p className="font-handwriting text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5 line-clamp-2">
                        "{item.caption}"
                      </p>
                    )}

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-amber-50 dark:bg-amber-950/60 px-2 py-0.2 text-[9px] font-mono text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Page Footer */}
        <div
          className={`mt-3 pt-2 text-center border-t ${
            isNightMode ? "border-indigo-500/20" : "border-amber-900/10"
          }`}
        >
          <p
            className={`font-handwriting text-sm sm:text-base font-bold ${
              isNightMode ? "text-cyan-200" : "text-stone-800"
            }`}
          >
            "Take time to make your soul happy ♡"
          </p>
        </div>
      </div>
    </div>
  );
}

export default HobbiesChapter;
