import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";

export interface LightboxPhoto {
  id: string;
  title: string;
  caption: string;
  image: string;
  location?: string;
  date?: string;
  tag?: string;
  artist?: string;
  sourceUrl?: string;
}

interface PhotoLightboxProps {
  photos: LightboxPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (newIndex: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showStickers, setShowStickers] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentPhoto = photos[currentIndex] || photos[0];

  // Reset zoom on photo change
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () =>
    setZoom((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onIndexChange?.(nextIdx);
  }, [currentIndex, photos.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onIndexChange?.(nextIdx);
  }, [currentIndex, photos.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "+" || e.key === "=") handleZoomIn();
      else if (e.key === "-") handleZoomOut();
      else if (e.key === "0") handleResetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch swipe support on mobile
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (zoom === 1) {
      if (diff > 50) handlePrev();
      if (diff < -50) handleNext();
    }
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto.title || "Photo Lightbox"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300 p-2 sm:p-6"
    >
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Lightbox Card */}
      <div className="relative z-10 flex flex-col max-h-[96vh] w-full max-w-5xl rounded-3xl bg-[#1e2330]/95 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-medium text-amber-300">
              {currentIndex + 1} / {photos.length}
            </span>
            {currentPhoto.tag && (
              <span className="hidden sm:inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                {currentPhoto.tag}
              </span>
            )}
          </div>

          {/* Zoom & Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStickers(!showStickers)}
              title="Toggle Decorative Stickers"
              className={`rounded-full p-2 transition ${
                showStickers ? "bg-amber-400/20 text-amber-300" : "bg-white/5 text-white/50"
              } hover:bg-white/15`}
            >
              <Sparkles className="h-4 w-4" />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              title="Zoom Out (-)"
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="font-mono text-xs w-10 text-center text-white/80">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 3.5}
              title="Zoom In (+)"
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom (0)"
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Small Neat Circular Close (X) button */}
            <button
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close modal"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/80 text-white hover:bg-rose-600 transition shadow-md"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Image Display Area with Pan & Zoom */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative flex-1 min-h-[320px] max-h-[64vh] sm:max-h-[70vh] flex items-center justify-center overflow-hidden bg-black/40 select-none ${
            zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
          }`}
        >
          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              title="Previous photo (Left Arrow)"
              aria-label="Previous photo"
              className="absolute left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 hover:scale-110 transition shadow-lg backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              title="Next photo (Right Arrow)"
              aria-label="Next photo"
              className="absolute right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 hover:scale-110 transition shadow-lg backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Scaled & Panned Image */}
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
            className="flex items-center justify-center max-w-full max-h-full p-4"
          >
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              className="max-h-[60vh] max-w-full rounded-xl object-contain shadow-2xl pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Decorative Scrapbook Overlays */}
          {showStickers && (
            <>
              {/* Postage Stamp Sticker */}
              <div className="absolute top-4 right-4 pointer-events-none hidden sm:block rotate-6 opacity-90 filter drop-shadow-md">
                <div className="rounded border-2 border-dashed border-amber-300 bg-amber-50/90 px-3 py-1 text-center font-mono text-[10px] text-amber-900 uppercase">
                  <div>MEMORIES</div>
                  <div className="text-xs font-bold">POSTAGE</div>
                </div>
              </div>
              {/* Washi tape strip */}
              <div className="absolute top-3 left-10 pointer-events-none h-4 w-20 bg-rose-200/50 -rotate-3 border-x border-rose-300/60 shadow-sm" />
            </>
          )}
        </div>

        {/* Bottom Details Panel */}
        <div className="border-t border-white/10 bg-[#171b26] p-4 sm:p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-100">
                {currentPhoto.title}
              </h3>
              <p className="mt-1 text-sm text-stone-300 max-w-2xl leading-relaxed">
                {currentPhoto.caption}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
              {currentPhoto.location && (
                <span className="flex items-center gap-1 text-amber-300/80">
                  <MapPin className="h-3.5 w-3.5" />
                  {currentPhoto.location}
                </span>
              )}
              {currentPhoto.date && (
                <span className="flex items-center gap-1 text-stone-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {currentPhoto.date}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;
