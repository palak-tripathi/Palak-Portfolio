import { useState, useRef } from "react";
import {
  Music,
  Play,
  Pause,
  PlusCircle,
  Video,
  Volume2,
  Maximize2,
  Disc,
  Sparkles,
} from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  isNightMode?: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

/**
 * 3D Cute Aesthetic Acoustic Guitar Mini Badge
 */
function Cute3DGuitarBadge({ isNightMode = false }: { isNightMode?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl border p-2.5 shadow-sm transition hover:scale-[1.02] ${
        isNightMode
          ? "border-amber-400/30 bg-gradient-to-br from-amber-950/40 via-indigo-950/40 to-slate-900/60 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
          : "border-amber-300/80 bg-gradient-to-br from-amber-50 via-rose-50/60 to-amber-100/70 text-stone-900"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {/* Miniature SVG Acoustic Guitar with 3D Wood Finish */}
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 p-1 shadow-md border border-amber-500/40">
          <svg viewBox="0 0 40 40" className="h-8 w-8 drop-shadow-sm" fill="none">
            {/* Guitar Body */}
            <path
              d="M20 7 C21 9 22 10 22 12 C24 13 26 15 26 18 C26 21 24 23 23 25 C25 28 26 31 25 34 C24 37 16 37 15 34 C14 31 15 28 17 25 C16 23 14 21 14 18 C14 15 16 13 18 12 C18 10 19 9 20 7 Z"
              fill="url(#guitarWoodGrad)"
              stroke="#fbbf24"
              strokeWidth="1.2"
            />
            {/* Soundhole */}
            <circle cx="20" cy="20" r="3" fill="#18181b" stroke="#fde68a" strokeWidth="0.8" />
            <circle
              cx="20"
              cy="20"
              r="4.2"
              stroke="#fbbf24"
              strokeWidth="0.5"
              strokeDasharray="1 1"
            />
            {/* Bridge */}
            <rect
              x="17"
              y="27"
              width="6"
              height="2"
              rx="0.5"
              fill="#451a03"
              stroke="#fde68a"
              strokeWidth="0.5"
            />
            {/* Neck & Fretboard */}
            <rect x="19" y="3" width="2" height="10" fill="#78350f" />
            {/* Strings */}
            <line x1="19.4" y1="3" x2="19.4" y2="27" stroke="#fef08a" strokeWidth="0.4" />
            <line x1="20" y1="3" x2="20" y2="27" stroke="#fef08a" strokeWidth="0.4" />
            <line x1="20.6" y1="3" x2="20.6" y2="27" stroke="#fef08a" strokeWidth="0.4" />
            {/* Headstock & Gold Tuning Pegs */}
            <rect
              x="18.5"
              y="1.5"
              width="3"
              height="3"
              rx="0.5"
              fill="#451a03"
              stroke="#fbbf24"
              strokeWidth="0.5"
            />
            <circle cx="17.8" cy="2.2" r="0.7" fill="#facc15" />
            <circle cx="22.2" cy="2.2" r="0.7" fill="#facc15" />
            <circle cx="17.8" cy="3.5" r="0.7" fill="#facc15" />
            <circle cx="22.2" cy="3.5" r="0.7" fill="#facc15" />
            <defs>
              <linearGradient id="guitarWoodGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              ACOUSTIC STRINGS
            </span>
            <span className="text-[10px]">✨</span>
          </div>
          <p className="font-handwriting text-xs sm:text-sm font-bold truncate">
            "Warm wooden tones & live fingerstyle"
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 3D Cute Aesthetic Guitar Pick Badge
 */
function Cute3DPickBadge({ isNightMode = false }: { isNightMode?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl border p-2.5 shadow-sm transition hover:scale-[1.02] ${
        isNightMode
          ? "border-pink-400/30 bg-gradient-to-br from-pink-950/40 via-purple-950/40 to-slate-900/60 text-pink-200 shadow-[0_0_15px_rgba(244,114,182,0.15)]"
          : "border-pink-300/80 bg-gradient-to-br from-pink-50 via-purple-50/60 to-pink-100/70 text-stone-900"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {/* Tortex Guitar Pick Shape */}
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
          <div
            className="flex h-9 w-8 items-center justify-center bg-gradient-to-b from-rose-400 via-pink-500 to-rose-600 shadow-md border border-rose-300/60 transform -rotate-6"
            style={{
              clipPath: "polygon(50% 100%, 0% 25%, 20% 0%, 80% 0%, 100% 25%)",
            }}
          >
            <span className="text-[9px] font-mono font-black text-white drop-shadow-xs">0.71</span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-rose-700 dark:text-pink-300">
              PALAK'S PICK
            </span>
            <span className="text-[10px]">🎸</span>
          </div>
          <p className="font-handwriting text-xs sm:text-sm font-bold truncate">
            "Unplugged melodies & rhythm chords"
          </p>
        </div>
      </div>
    </div>
  );
}

export function TalentsChapter({
  chapter,
  isNightMode = false,
  onSelectItem,
  onOpenAdmin,
}: ChapterProps) {
  // Only the authentic singing videos
  const publishedItems = chapter.items.filter((i) => i.published);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleTogglePlay = (item: DiaryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const vid = videoRefs.current[item.id];
    if (!vid) return;

    if (playingId === item.id) {
      vid.pause();
      setPlayingId(null);
    } else {
      // Pause any previously playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      vid.muted = false;
      vid.volume = 1.0;
      vid
        .play()
        .then(() => {
          setPlayingId(item.id);
        })
        .catch((err) => {
          console.warn("Direct play error:", err);
          onSelectItem(item);
        });
    }
  };

  const handleVideoEnded = (id: string) => {
    if (playingId === id) setPlayingId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
      {/* LEFT PAGE: Musical Cassette / Vinyl Record Studio & 3D Guitar Elements */}
      <div
        className={`relative border-b lg:border-b-0 lg:border-r p-5 sm:p-8 flex flex-col justify-between ${
          isNightMode ? "border-indigo-500/30" : "border-amber-900/15"
        }`}
      >
        <div>
          {/* Eyebrow & Floating Music Notes */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-serif font-bold uppercase tracking-[0.25em] ${
                isNightMode
                  ? "bg-indigo-950/80 border border-indigo-400/40 text-cyan-300"
                  : "bg-sky-100/90 border border-sky-300/60 text-sky-950"
              }`}
            >
              <Music className="h-3 w-3 text-sky-600" /> Chapter II • My Talents
            </span>
            <div className="flex items-center gap-1 text-base select-none">
              <span className="animate-bounce" style={{ animationDuration: "2.2s" }}>
                ♪
              </span>
              <span className="animate-bounce text-pink-400" style={{ animationDuration: "1.8s" }}>
                ♫
              </span>
              <span className="animate-bounce text-amber-400" style={{ animationDuration: "2.6s" }}>
                ♬
              </span>
            </div>
          </div>

          {/* Title */}
          <h2
            className={`font-cursive mt-3 text-3xl sm:text-4xl font-extrabold ${
              isNightMode
                ? "text-amber-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.6)]"
                : "text-stone-900"
            }`}
          >
            Melodies from the Heart 🌸
          </h2>
          <p
            className={`font-handwriting text-base sm:text-lg font-bold ${
              isNightMode ? "text-cyan-200" : "text-sky-900"
            }`}
          >
            "{chapter.subtitle}"
          </p>

          {/* Animated Vinyl Record Graphic */}
          <div className="relative mt-5 flex justify-center">
            <div
              className={`relative flex items-center justify-center h-36 w-36 sm:h-40 sm:w-40 rounded-full border-4 shadow-2xl transition duration-500 ${
                isNightMode
                  ? "border-amber-300/60 bg-gradient-to-br from-black via-slate-950 to-indigo-950"
                  : "border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-neutral-900"
              } ${playingId ? "animate-spin-slow" : ""}`}
            >
              {/* Vinyl Grooves */}
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-cyan-400/80 flex items-center justify-center shadow-inner">
                    <Disc className="h-5 w-5 text-indigo-950" />
                  </div>
                </div>
              </div>

              {/* Tonearm */}
              <div
                className={`absolute -top-2 -right-1 h-14 w-1.5 origin-top rounded-full transition-transform duration-500 ${
                  playingId
                    ? "bg-amber-400 rotate-25 shadow-[0_0_8px_#facc15]"
                    : "bg-stone-400 rotate-5"
                }`}
              />
            </div>
          </div>

          {/* Soundwave Equalizer when playing */}
          <div className="mt-4 flex items-center justify-center gap-1.5 h-7">
            {[40, 75, 55, 90, 60, 85, 45, 95, 65, 50, 70, 80].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  playingId
                    ? "bg-gradient-to-t from-cyan-400 to-indigo-500 animate-pulse"
                    : "bg-stone-300 dark:bg-stone-700 h-2"
                }`}
                style={{
                  height: playingId ? `${h}%` : "8px",
                  animationDelay: `${(i % 4) * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Personal Music Story Note */}
          <div
            className={`mt-4 rounded-2xl border p-3.5 shadow-xs ${
              isNightMode
                ? "border-indigo-400/40 bg-indigo-950/70 text-slate-200"
                : "border-sky-300/80 bg-sky-50/80 text-stone-800"
            }`}
          >
            <p className="font-handwriting text-sm sm:text-base leading-relaxed font-semibold">
              "Singing has always been my quiet refuge. Raw acoustic vocals, guitar chords, and
              unplugged harmonies bring a depth and warmth that code alone could never reach."
            </p>
          </div>

          {/* 3D Cute Aesthetic Guitar Elements Badges (Zero Empty Space) */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Cute3DGuitarBadge isNightMode={isNightMode} />
            <Cute3DPickBadge isNightMode={isNightMode} />
          </div>

          {/* Acoustic Chords Mini Bar */}
          <div
            className={`mt-2.5 rounded-xl border px-3 py-1.5 flex items-center justify-between text-xs font-mono ${
              isNightMode
                ? "border-amber-400/20 bg-amber-950/20 text-amber-200/90"
                : "border-amber-300/60 bg-amber-50/70 text-amber-950"
            }`}
          >
            <span className="font-bold tracking-wider text-[10px] uppercase">
              CHORD SET: [C] • [G] • [Am] • [F]
            </span>
            <span className="font-handwriting text-xs font-bold">Unplugged Vibes ♡</span>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-4 pt-2.5 flex items-center justify-between text-xs font-serif border-t ${
            isNightMode
              ? "border-indigo-500/20 text-slate-400"
              : "border-amber-900/10 text-stone-500"
          }`}
        >
          <span>Authentic Acoustic Showcase</span>
          <span className="font-cursive text-sm text-sky-600">
            {publishedItems.length} {publishedItems.length === 1 ? "Video Track" : "Video Tracks"}
          </span>
        </div>
      </div>

      {/* RIGHT PAGE: Strictly the 2 Authentic Singing Videos Showcase (Zero Empty Space) */}
      <div className="relative p-5 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3
              className={`font-serif text-base sm:text-lg font-bold flex items-center gap-2 ${
                isNightMode ? "text-slate-100" : "text-stone-900"
              }`}
            >
              <Video className={`h-4 w-4 ${isNightMode ? "text-cyan-300" : "text-sky-600"}`} />
              Singing Videos · 2 Master Tracks
            </h3>

            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-serif font-bold transition hover:scale-105 ${
                isNightMode
                  ? "border border-cyan-400/50 bg-cyan-950/60 text-cyan-300"
                  : "border border-sky-300/80 bg-sky-100/90 text-sky-950"
              }`}
            >
              <PlusCircle className="h-3.5 w-3.5" /> Upload Video
            </button>
          </div>

          {/* Clean 2-Video Stack — Perfectly fitting page height with ZERO empty gap */}
          <div className="space-y-3.5">
            {publishedItems.slice(0, 2).map((item, idx) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl border-2 transition duration-300 shadow-md ${
                    isNightMode
                      ? "border-indigo-400/50 bg-slate-900/90 text-slate-100"
                      : "border-sky-200/90 bg-[#fffdfa] text-stone-900"
                  }`}
                >
                  {/* Washi tape on top corner */}
                  <div className="diary-washi-tape absolute -top-1.5 left-5 w-12 h-3.5 z-20" />

                  <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr] items-center">
                    {/* Video Player Container */}
                    <div className="relative aspect-[16/9] sm:aspect-[4/3] bg-black overflow-hidden">
                      {item.mediaUrl && (
                        <video
                          ref={(el) => {
                            videoRefs.current[item.id] = el;
                          }}
                          src={item.mediaUrl}
                          playsInline
                          preload="metadata"
                          controls={isPlaying}
                          onEnded={() => handleVideoEnded(item.id)}
                          onPause={() => {
                            if (playingId === item.id) setPlayingId(null);
                          }}
                          onPlay={() => setPlayingId(item.id)}
                          className="h-full w-full object-cover"
                        />
                      )}

                      {/* Custom Play Button Overlay when paused */}
                      {!isPlaying && (
                        <div
                          onClick={(e) => handleTogglePlay(item, e)}
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/25 transition cursor-pointer"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-indigo-950 shadow-xl backdrop-blur transition group-hover:scale-110">
                            <Play className="h-5 w-5 ml-0.5 fill-indigo-950" />
                          </div>
                          <span className="mt-1.5 text-[11px] font-serif font-bold text-white/95 drop-shadow">
                            ▶ Play Track {idx + 1}
                          </span>
                        </div>
                      )}

                      {/* Maximize to Modal Button in top right */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        title="Open in full theater modal"
                        className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur hover:bg-black/80 transition"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Video Info Card & Playback Controls */}
                    <div className="p-3.5 sm:p-4 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-serif text-sm sm:text-base font-bold truncate">
                            {item.title}
                          </h4>
                          {item.date && (
                            <span className="text-[10px] font-mono shrink-0 opacity-60">
                              {item.date}
                            </span>
                          )}
                        </div>
                        {item.caption && (
                          <p className="font-handwriting mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-snug line-clamp-2">
                            "{item.caption}"
                          </p>
                        )}
                      </div>

                      {/* Direct Click to Listen / Play Bar */}
                      <div
                        className={`mt-2.5 flex items-center justify-between gap-2 border-t pt-2 text-xs ${
                          isNightMode ? "border-indigo-500/20" : "border-stone-200"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleTogglePlay(item, e)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-serif text-xs font-bold transition shadow-xs ${
                            isPlaying
                              ? "bg-amber-400 text-stone-950 hover:bg-amber-300"
                              : "bg-sky-600 text-white hover:bg-sky-500"
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="h-3 w-3 fill-current" /> Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 fill-current" /> Play Voice
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[10px] opacity-75">
                            <Volume2 className="h-3 w-3 text-cyan-500" /> 100% Vol
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectItem(item);
                            }}
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-serif border transition ${
                              isNightMode
                                ? "border-indigo-400/30 hover:bg-slate-800 text-slate-300"
                                : "border-stone-300 hover:bg-stone-100 text-stone-700"
                            }`}
                          >
                            <Maximize2 className="h-2.5 w-2.5" /> Full
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Densely Packed Decorative Scrapbook Footer (Guarantees zero empty space) */}
          <div
            className={`mt-3.5 rounded-xl border p-3 shadow-xs flex items-center justify-between gap-3 ${
              isNightMode
                ? "border-cyan-400/30 bg-gradient-to-r from-slate-900/90 to-indigo-950/90 text-cyan-200"
                : "border-sky-200 bg-gradient-to-r from-sky-50/90 to-pink-50/90 text-stone-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <div className="min-w-0">
                <span className="font-mono text-[9px] font-bold block uppercase tracking-wider text-sky-600 dark:text-cyan-300">
                  ACOUSTIC VOCAL ARCHIVE
                </span>
                <p className="font-handwriting text-xs font-bold truncate">
                  "Recorded with raw uncompressed acoustic bass & warmth"
                </p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-cyan-300 border border-sky-400/30">
              HD Audio
            </span>
          </div>
        </div>

        {/* Footnote */}
        <div
          className={`mt-3 pt-2 flex items-center justify-between text-xs font-serif border-t ${
            isNightMode
              ? "border-indigo-500/20 text-slate-400"
              : "border-amber-900/10 text-stone-500"
          }`}
        >
          <span>Palak's Singing Diary</span>
          <span className="font-handwriting text-xs text-sky-600">
            ♪ Click play on either recording to listen
          </span>
        </div>
      </div>
    </div>
  );
}

export default TalentsChapter;
