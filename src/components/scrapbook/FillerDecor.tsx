import React from "react";
import { StickerCutout } from "./StickerCutout";

interface FillerDecorProps {
  theme?: "travel" | "art" | "books" | "celestial";
  className?: string;
}

export const FillerDecor: React.FC<FillerDecorProps> = ({ theme = "travel", className = "" }) => {
  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden select-none py-4 ${className}`}
      aria-hidden="true"
    >
      {theme === "travel" && (
        <div className="flex items-center justify-between opacity-85 px-6">
          {/* Coffee Ring Stain */}
          <div className="relative w-16 h-16 rounded-full border-4 border-amber-900/15 border-dashed -rotate-12 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-amber-800/10" />
          </div>

          {/* Airmail Stamp */}
          <div className="flex items-center gap-2 rounded border border-rose-300 bg-rose-50/80 px-3 py-1 shadow-sm rotate-3 text-[11px] font-mono uppercase tracking-wider text-rose-800">
            <span>✈ PAR AVION</span>
            <span className="text-rose-400">|</span>
            <span>INDIA POST</span>
          </div>

          {/* Camera Sticker */}
          <StickerCutout
            src="/assets/stickers/vintage-camera.svg"
            alt="Camera sticker"
            size={56}
            rotate="-8deg"
          />

          {/* Handwritten Cursive Note */}
          <div className="hidden sm:block font-serif italic text-amber-900/60 text-sm -rotate-2">
            ~ "keep wandering, keep wondering" ~
          </div>

          {/* Compass Sticker */}
          <StickerCutout
            src="/assets/stickers/compass.svg"
            alt="Compass sticker"
            size={50}
            rotate="12deg"
          />

          {/* Washi Tape Strip */}
          <div className="h-4 w-20 bg-amber-200/50 -rotate-6 shadow-sm border-x-2 border-amber-300/40" />
        </div>
      )}

      {theme === "art" && (
        <div className="flex items-center justify-between opacity-85 px-6">
          {/* Paint Splatter */}
          <div className="flex gap-1.5 items-center">
            <div className="w-3 h-3 rounded-full bg-pink-400/40" />
            <div className="w-2 h-2 rounded-full bg-indigo-400/50" />
            <div className="w-4 h-4 rounded-full bg-emerald-400/30" />
          </div>

          {/* Butterfly Sticker */}
          <StickerCutout
            src="/assets/stickers/butterfly.svg"
            alt="Butterfly sticker"
            size={52}
            rotate="-6deg"
          />

          {/* Handwritten note */}
          <div className="font-serif italic text-stone-600 text-sm rotate-1">
            ✎ "between pencil and paper, the world is quiet"
          </div>

          {/* Washi Tape */}
          <div className="h-4 w-24 bg-pink-200/50 rotate-3 shadow-sm border-x-2 border-pink-300/40" />

          {/* Pressed Leaf Doodle */}
          <div className="text-emerald-700/60 font-serif text-sm">🌿 botanical studies</div>
        </div>
      )}

      {theme === "books" && (
        <div className="flex items-center justify-between opacity-85 px-6">
          {/* Coffee Cup / Tumbler */}
          <StickerCutout
            src="/assets/stickers/filter-coffee.svg"
            alt="Filter coffee sticker"
            size={48}
            rotate="-5deg"
          />

          {/* Acoustic Guitar Sticker */}
          <StickerCutout
            src="/assets/stickers/guitar.svg"
            alt="Guitar sticker"
            size={52}
            rotate="8deg"
          />

          <div className="font-serif italic text-amber-900/60 text-sm">
            ♫ "stories on paper, melodies in the air"
          </div>

          {/* Pressed Bookmark */}
          <div className="rounded-sm border border-amber-300/60 bg-amber-50 px-3 py-1 text-xs font-serif text-amber-800 -rotate-3 shadow-sm">
            ✦ Chapter IV · Page 142
          </div>
        </div>
      )}

      {theme === "celestial" && (
        <div className="flex items-center justify-between opacity-85 px-6">
          {/* Glowing Moon */}
          <StickerCutout
            src="/assets/stickers/glowing-moon.svg"
            alt="Moon sticker"
            size={54}
            rotate="-10deg"
          />

          <div className="font-serif italic text-indigo-900/60 text-sm">
            ✨ "moonlit thoughts & starlit dreams"
          </div>

          <div className="flex gap-2">
            <span className="text-yellow-400 text-sm animate-pulse">★</span>
            <span className="text-indigo-400 text-xs">✦</span>
            <span className="text-yellow-300 text-base animate-pulse">★</span>
          </div>

          <div className="h-4 w-20 bg-indigo-200/40 rotate-2 shadow-sm border-x-2 border-indigo-300/30" />
        </div>
      )}
    </div>
  );
};

export default FillerDecor;
