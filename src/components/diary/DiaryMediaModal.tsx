import { useEffect, useState, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Sparkles,
  Volume2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Tag,
  Feather,
} from "lucide-react";
import type { DiaryItem } from "@/data/diary-content";

interface DiaryMediaModalProps {
  item: DiaryItem | null;
  items: DiaryItem[];
  onClose: () => void;
  onSelect: (item: DiaryItem) => void;
}

export function DiaryMediaModal({ item, items, onClose, onSelect }: DiaryMediaModalProps) {
  // Zoom & Pan state for inspecting high-res photography and artwork
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Reset zoom and pan whenever the active item changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleZoomReset();
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [item, items, zoom]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else if (items.length > 0) {
      onSelect(items[items.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    } else if (items.length > 0) {
      onSelect(items[0]);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.3, 3.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.3, 0.75);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleToggleDoubleClick = () => {
    if (zoom > 1) {
      handleZoomReset();
    } else {
      setZoom(2.2);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Mouse pan handlers for magnified inspection
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return (
      url.match(/\.(mp4|webm|ogg)$/i) ||
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.includes("vimeo.com")
    );
  };

  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    if (url.includes("vimeo.com/")) {
      const id = url.split("/").pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  const isEmbed =
    item.mediaUrl &&
    (item.mediaUrl.includes("youtube") ||
      item.mediaUrl.includes("youtu.be") ||
      item.mediaUrl.includes("vimeo"));

  const isImage =
    !isVideoUrl(item.mediaUrl) && item.mediaType !== "audio" && Boolean(item.mediaUrl);

  const categoryName =
    item.category === "travel"
      ? "✈️ Travel Diaries"
      : item.category === "drawings"
        ? "🎨 Art & Sketches"
        : item.category === "hobbies"
          ? "🎸 Hobbies & Rituals"
          : item.category === "memories"
            ? "📸 College Memories"
            : item.category === "interests"
              ? "📚 Books & Curiosities"
              : item.category === "story"
                ? "💻 Code Journey"
                : "🌙 My Little World";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 p-2 sm:p-5 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalContainerRef}
        className="relative max-h-[96vh] w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-pink-300/80 bg-[#fffdfa] dark:bg-stone-900 shadow-2xl flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Washi Tape Accent along Top Center */}
        <div className="diary-washi-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-32 h-5 z-20 pointer-events-none rotate-0.5" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-pink-200/80 dark:border-stone-800 bg-gradient-to-r from-pink-100/90 via-amber-50 to-pink-100/90 dark:from-stone-900 dark:via-stone-900 dark:to-stone-900 px-4 sm:px-6 py-3">
          <div className="pr-3 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="rounded-full bg-pink-200/90 dark:bg-pink-950/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-pink-950 dark:text-pink-200 border border-pink-300/60">
                {categoryName}
              </span>
              {item.date && (
                <span className="flex items-center gap-1 text-[11px] font-mono text-stone-600 dark:text-stone-300">
                  <Calendar className="h-3 w-3 text-pink-600" />
                  {item.date}
                </span>
              )}
            </div>

            <h3 className="font-serif text-base sm:text-xl font-bold text-stone-900 dark:text-stone-100 truncate">
              {item.title}
            </h3>

            {item.location && (
              <span className="flex items-center gap-1 text-xs font-serif text-stone-600 dark:text-stone-400 mt-0.5">
                <MapPin className="h-3 w-3 text-rose-500" />
                {item.location}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Memory Counter */}
            {items.length > 0 && (
              <span className="font-mono text-xs text-stone-500 dark:text-stone-400 font-bold hidden sm:inline bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-md">
                {currentIndex + 1} / {items.length}
              </span>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              title="Fullscreen"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900/10 dark:bg-stone-800 text-stone-700 dark:text-stone-300 transition hover:bg-stone-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-hidden"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>

            {/* High-Contrast Clickable Cross (X) Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal popup"
              title="Close (Esc)"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900/10 dark:bg-stone-800 text-stone-800 dark:text-stone-200 transition hover:bg-rose-500 hover:text-white hover:scale-110 active:scale-95 shadow-xs cursor-pointer focus:outline-hidden"
            >
              <X className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Media Content Stage with Zoom & Pan */}
        <div
          className="relative flex min-h-[300px] max-h-[60vh] w-full flex-1 items-center justify-center overflow-hidden bg-stone-950 select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {item.mediaType === "video" || isVideoUrl(item.mediaUrl) ? (
            isEmbed ? (
              <iframe
                src={getEmbedUrl(item.mediaUrl)}
                title={item.title}
                className="h-[55vh] w-full border-0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : item.mediaUrl ? (
              <video
                src={item.mediaUrl}
                controls
                autoPlay
                playsInline
                className="max-h-[56vh] max-w-full rounded-md object-contain shadow-2xl"
              />
            ) : (
              <div className="text-center p-8 text-stone-400">No video URL available</div>
            )
          ) : item.mediaType === "audio" ? (
            <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-700">
                <Volume2 className="h-8 w-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">{item.title}</h4>
              {item.mediaUrl && <audio src={item.mediaUrl} controls className="mt-2" />}
            </div>
          ) : isImage ? (
            /* Zoomable Image Container */
            <div
              className={`relative flex items-center justify-center transition-transform ${
                isDragging
                  ? "cursor-grabbing duration-0"
                  : zoom > 1
                    ? "cursor-grab duration-150"
                    : "cursor-zoom-in duration-200"
              }`}
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transformOrigin: "center center",
              }}
              onDoubleClick={handleToggleDoubleClick}
              title={zoom > 1 ? "Drag to pan, double click to reset" : "Double click to zoom in"}
            >
              <img
                src={item.mediaUrl}
                alt={item.title}
                draggable={false}
                className="max-h-[56vh] max-w-full object-contain rounded-sm shadow-2xl"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-12 text-center text-stone-400">
              <Sparkles className="h-10 w-10 text-pink-300" />
              <p className="font-serif text-sm">A handwritten memory note</p>
            </div>
          )}

          {/* Floating Zoom-In / Zoom-Out Toolbar (For Images) */}
          {isImage && (
            <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1 rounded-full bg-black/80 px-3 py-1.5 backdrop-blur-md border border-white/20 shadow-xl">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                title="Zoom Out (-)"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/90 hover:bg-white/20 hover:text-white disabled:opacity-40 transition cursor-pointer"
              >
                <ZoomOut className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleZoomReset}
                title="Reset Zoom (0)"
                className="px-2 font-mono text-xs font-bold text-cyan-300 hover:text-white transition cursor-pointer"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 3.5}
                title="Zoom In (+)"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/90 hover:bg-white/20 hover:text-white disabled:opacity-40 transition cursor-pointer"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={handleZoomReset}
                  title="Reset to 100%"
                  className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-amber-300 hover:bg-white/20 transition cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous memory"
                title="Previous (Arrow Left)"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-xs hover:bg-black/85 hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next memory"
                title="Next (Arrow Right)"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-xs hover:bg-black/85 hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption & Scrapbook Story Narrative Footer */}
        <div className="border-t border-pink-200/80 dark:border-stone-800 bg-gradient-to-b from-amber-50/70 to-pink-50/70 dark:from-stone-900 dark:to-stone-950 px-5 py-3 overflow-y-auto max-h-[22vh]">
          {item.caption && (
            <p className="font-handwriting text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200 font-semibold max-w-2xl mx-auto text-center">
              "{item.caption}"
            </p>
          )}

          {item.description && item.description !== item.caption && (
            <p className="font-serif text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-center mt-1">
              {item.description}
            </p>
          )}

          {/* Tags Pills */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 dark:bg-stone-800 px-2.5 py-0.5 text-[10px] font-mono text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
