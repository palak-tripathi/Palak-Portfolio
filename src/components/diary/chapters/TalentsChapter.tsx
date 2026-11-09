import { useState, useRef } from "react";
import {
  Music,
  Play,
  Pause,
  PlusCircle,
  Sparkles,
  Video,
  Volume2,
  VolumeX,
  Mic,
  Maximize2,
  Disc,
} from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  isNightMode?: boolean;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

export function TalentsChapter({
  chapter,
  isNightMode = false,
  onSelectItem,
  onOpenAdmin,
}: ChapterProps) {
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
          // If autoplay policy or codec issue, fallback to modal view
          onSelectItem(item);
        });
    }
  };

  const handleVideoEnded = (id: string) => {
    if (playingId === id) setPlayingId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[610px]">
      {/* LEFT PAGE: Musical Cassette / Vinyl Record Studio */}
      <div
        className={`relative border-b lg:border-b-0 lg:border-r p-6 sm:p-10 flex flex-col justify-between ${
          isNightMode ? "border-indigo-500/30" : "border-amber-900/15"
        }`}
      >
        <div>
          {/* Eyebrow */}
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
            <span className="text-xl">🎵</span>
          </div>

          {/* Title */}
          <h2
            className={`font-cursive mt-4 text-3xl sm:text-4xl font-extrabold ${
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
          <div className="relative mt-8 flex justify-center">
            <div
              className={`relative flex items-center justify-center h-44 w-44 rounded-full border-4 shadow-2xl transition duration-500 ${
                isNightMode
                  ? "border-amber-300/60 bg-gradient-to-br from-black via-slate-950 to-indigo-950"
                  : "border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-neutral-900"
              } ${playingId ? "animate-spin-slow" : ""}`}
            >
              {/* Vinyl Grooves */}
              <div className="h-32 w-32 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-cyan-400/80 flex items-center justify-center shadow-inner">
                    <Disc className="h-5 w-5 text-indigo-950" />
                  </div>
                </div>
              </div>

              {/* Tonearm */}
              <div
                className={`absolute -top-3 -right-2 h-16 w-1.5 origin-top rounded-full transition-transform duration-500 ${
                  playingId
                    ? "bg-amber-400 rotate-25 shadow-[0_0_8px_#facc15]"
                    : "bg-stone-400 rotate-5"
                }`}
              />
            </div>
          </div>

          {/* Soundwave Equalizer when playing */}
          <div className="mt-6 flex items-center justify-center gap-1.5 h-8">
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
            className={`mt-6 rounded-2xl border p-4 shadow-xs ${
              isNightMode
                ? "border-indigo-400/40 bg-indigo-950/70 text-slate-200"
                : "border-sky-300/80 bg-sky-50/80 text-stone-800"
            }`}
          >
            <p className="font-handwriting text-base sm:text-lg leading-relaxed font-semibold">
              "Singing has always been my quiet refuge. Whether rehearsing acoustic covers or
              exploring emotional nuances, music brings depth and warmth to my world that code alone
              could never reach."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-6 pt-3 flex items-center justify-between text-xs font-serif border-t ${
            isNightMode
              ? "border-indigo-500/20 text-slate-400"
              : "border-amber-900/10 text-stone-500"
          }`}
        >
          <span>Acoustic Vibrations & Vocal Arts</span>
          <span className="font-cursive text-sm text-sky-600">
            {publishedItems.length} {publishedItems.length === 1 ? "Recording" : "Recordings"}
          </span>
        </div>
      </div>

      {/* RIGHT PAGE: Playable Singing Videos Showcase */}
      <div className="relative p-6 sm:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`font-serif text-lg font-bold flex items-center gap-2 ${
                isNightMode ? "text-slate-100" : "text-stone-900"
              }`}
            >
              <Video className={`h-4 w-4 ${isNightMode ? "text-cyan-300" : "text-sky-600"}`} />
              Recordings & Video Showcase
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

          {publishedItems.length === 0 ? (
            <div
              className={`my-6 flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center ${
                isNightMode
                  ? "border-indigo-400/40 bg-indigo-950/30 text-slate-200"
                  : "border-sky-300/80 bg-sky-50/40 text-stone-700"
              }`}
            >
              <Music className="h-8 w-8 text-sky-500 animate-pulse mb-3" />
              <h4 className="font-serif text-xl font-bold">Singing & Creative Showcase</h4>
              <p className="font-handwriting mt-2 max-w-sm text-base">
                Click "Upload Video" to add singing recordings, video links, or audio clips.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-h-[460px] overflow-y-auto pr-1">
              {publishedItems.map((item, idx) => {
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
                    <div className="diary-washi-tape absolute -top-2 left-6 w-14 h-4 z-20" />

                    {/* Video Player Container */}
                    <div className="relative aspect-[16/9] bg-black overflow-hidden">
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
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 group-hover:bg-black/30 transition cursor-pointer"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-indigo-950 shadow-2xl backdrop-blur transition group-hover:scale-110">
                            <Play className="h-6 w-6 ml-1 fill-indigo-950" />
                          </div>
                          <span className="mt-2 text-xs font-serif font-bold text-white/90 drop-shadow">
                            Click to play recording
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
                        className="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur hover:bg-black/80 transition"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Video Info Card & Playback Controls */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base font-bold truncate">{item.title}</h4>
                        {item.date && (
                          <span className="text-[11px] font-mono opacity-60">{item.date}</span>
                        )}
                      </div>
                      {item.caption && (
                        <p className="font-handwriting mt-1 text-sm text-stone-600 dark:text-stone-300">
                          "{item.caption}"
                        </p>
                      )}

                      {/* Direct Click to Listen / Play Bar */}
                      <div
                        className={`mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-2.5 text-xs ${
                          isNightMode ? "border-indigo-500/20" : "border-stone-200"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleTogglePlay(item, e)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-serif font-bold transition shadow-xs ${
                            isPlaying
                              ? "bg-amber-400 text-stone-950 hover:bg-amber-300"
                              : "bg-sky-600 text-white hover:bg-sky-500"
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="h-3.5 w-3.5 fill-current" /> Pause Song
                            </>
                          ) : (
                            <>
                              <Play className="h-3.5 w-3.5 fill-current" /> ▶ Play Song & Voice
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-[11px] opacity-75">
                            <Volume2 className="h-3.5 w-3.5 text-cyan-500" /> Audio On
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectItem(item);
                            }}
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-serif border transition ${
                              isNightMode
                                ? "border-indigo-400/30 hover:bg-slate-800 text-slate-300"
                                : "border-stone-300 hover:bg-stone-100 text-stone-700"
                            }`}
                          >
                            <Maximize2 className="h-3 w-3" /> Theater
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footnote */}
        <div
          className={`mt-4 pt-3 flex items-center justify-between text-xs font-serif border-t ${
            isNightMode
              ? "border-indigo-500/20 text-slate-400"
              : "border-amber-900/10 text-stone-500"
          }`}
        >
          <span>Acoustic Session Master</span>
          <span className="font-handwriting text-xs text-sky-600">
            ♪ Click play on any track to listen
          </span>
        </div>
      </div>
    </div>
  );
}
