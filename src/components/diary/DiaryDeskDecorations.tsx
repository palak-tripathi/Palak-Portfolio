interface DiaryDeskDecorationsProps {
  isNightMode?: boolean;
}

export function DiaryDeskDecorations({ isNightMode = false }: DiaryDeskDecorationsProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden transition-all duration-700"
      aria-hidden="true"
    >
      {/* Hanging Antique Lanterns at Top */}
      <div className="absolute top-2 left-8 hidden sm:flex flex-col items-center animate-sway">
        <div className={`h-10 w-0.5 ${isNightMode ? "bg-cyan-200/40" : "bg-amber-200/40"}`} />
        <div
          className={`relative flex h-14 w-10 items-center justify-center rounded-xl border ${
            isNightMode
              ? "border-cyan-300/70 bg-gradient-to-b from-cyan-950/40 to-indigo-950/60 shadow-[0_0_30px_rgba(6,182,212,0.6)]"
              : "border-amber-200/60 bg-gradient-to-b from-amber-100/30 to-amber-900/30 shadow-[0_0_25px_rgba(254,240,138,0.5)]"
          } backdrop-blur-xs`}
        >
          <div
            className={`h-4 w-3 rounded-full ${
              isNightMode
                ? "bg-cyan-200 shadow-[0_0_16px_#22d3ee]"
                : "bg-amber-300 shadow-[0_0_14px_#fde047]"
            } animate-pulse`}
          />
          <div
            className={`absolute -top-2.5 h-3 w-6 rounded-t-lg border-t ${
              isNightMode
                ? "border-cyan-300/80 bg-cyan-700/50"
                : "border-amber-300/80 bg-amber-500/40"
            }`}
          />
        </div>
      </div>

      <div
        className="absolute top-2 right-12 hidden md:flex flex-col items-center animate-sway"
        style={{ animationDelay: "1.8s" }}
      >
        <div className={`h-14 w-0.5 ${isNightMode ? "bg-indigo-200/40" : "bg-amber-200/40"}`} />
        <div
          className={`relative flex h-12 w-9 items-center justify-center rounded-xl border ${
            isNightMode
              ? "border-indigo-300/70 bg-gradient-to-b from-indigo-950/40 to-purple-950/60 shadow-[0_0_25px_rgba(129,140,248,0.55)]"
              : "border-amber-200/60 bg-gradient-to-b from-amber-100/30 to-amber-900/30 shadow-[0_0_20px_rgba(254,240,138,0.45)]"
          } backdrop-blur-xs`}
        >
          <div
            className={`h-3.5 w-2.5 rounded-full ${
              isNightMode
                ? "bg-indigo-200 shadow-[0_0_14px_#818cf8]"
                : "bg-amber-200 shadow-[0_0_12px_#fde047]"
            } animate-pulse`}
          />
          <div
            className={`absolute -top-2 h-2.5 w-5 rounded-t-lg border-t ${
              isNightMode
                ? "border-indigo-300/80 bg-indigo-700/50"
                : "border-amber-300/80 bg-amber-500/40"
            }`}
          />
        </div>
      </div>

      {/* Floating Dreamy Clouds Top & Bottom */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 transition-all duration-700 blur-2xl ${
          isNightMode
            ? "bg-gradient-to-b from-indigo-950/50 via-purple-950/40 to-transparent"
            : "bg-gradient-to-b from-pink-100/30 via-purple-100/20 to-transparent"
        }`}
      />
      <div
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl h-48 transition-all duration-700 blur-3xl ${
          isNightMode
            ? "bg-gradient-to-t from-indigo-950/60 via-cyan-950/30 to-transparent"
            : "bg-gradient-to-t from-pink-200/40 via-sky-100/25 to-transparent"
        }`}
      />

      {/* Night Mode Crescent Moon & Starlight in Upper Center */}
      {isNightMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center animate-in fade-in duration-700">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
            <span className="text-4xl text-amber-200 drop-shadow-[0_0_18px_rgba(254,240,138,0.85)] animate-sway">
              🌙
            </span>
          </div>
        </div>
      )}

      {/* Bottom Left: Vintage Camera */}
      <div className="absolute bottom-4 left-4 sm:left-10 z-10 hidden lg:block transform -rotate-12 transition duration-500 hover:rotate-0">
        <div className="relative flex h-20 w-28 flex-col justify-between rounded-xl border-2 border-stone-400/50 bg-stone-800 p-2 shadow-2xl">
          <div className="flex items-center justify-between px-1">
            <div className="h-2 w-4 rounded-t-sm bg-amber-300/80" />
            <div className="h-2.5 w-3 rounded-full bg-stone-300" />
            <div className="h-1.5 w-5 rounded-sm bg-stone-400" />
          </div>
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-300/70 bg-stone-900 shadow-inner">
            <div className="h-6 w-6 rounded-full border border-sky-400/40 bg-stone-950 shadow-[inset_0_0_8px_rgba(56,189,248,0.4)]" />
          </div>
          <div className="text-[7px] text-center font-mono text-stone-400/60 uppercase tracking-widest">
            Vintage Stills
          </div>
        </div>
      </div>

      {/* Bottom Left Center: Antique Pocket Watch */}
      <div className="absolute bottom-6 left-28 sm:left-44 z-10 hidden xl:block transform rotate-6">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-amber-300/90 bg-amber-50 p-1 shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
          <div className="absolute -top-3.5 h-3.5 w-3 rounded-t-full border-2 border-amber-400" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-amber-200 bg-amber-50/80">
            <span className="absolute top-0.5 font-serif text-[7px] font-bold text-amber-900">
              XII
            </span>
            <span className="absolute right-0.5 font-serif text-[7px] font-bold text-amber-900">
              III
            </span>
            <span className="absolute bottom-0.5 font-serif text-[7px] font-bold text-amber-900">
              VI
            </span>
            <span className="absolute left-0.5 font-serif text-[7px] font-bold text-amber-900">
              IX
            </span>
            <div className="h-3 w-0.5 -translate-y-1 bg-amber-950 rounded-full" />
            <div className="absolute h-0.5 w-4 translate-x-1.5 bg-amber-900 rounded-full" />
            <div className="absolute h-1.5 w-1.5 rounded-full bg-amber-500" />
          </div>
        </div>
      </div>

      {/* Bottom Right: Vinyl Record */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-10 hidden lg:block transform rotate-45">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-stone-900 shadow-[0_15px_30px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-1.5 rounded-full border border-stone-800" />
          <div className="absolute inset-3 rounded-full border border-stone-800" />
          <div className="absolute inset-5 rounded-full border border-stone-800" />
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              isNightMode ? "bg-indigo-400" : "bg-pink-300"
            } shadow-inner`}
          >
            <div className="h-2 w-2 rounded-full bg-stone-950" />
          </div>
        </div>
      </div>

      {/* Wax-sealed Letters & Envelopes */}
      <div className="absolute bottom-2 right-36 hidden xl:block transform -rotate-6">
        <div
          className={`relative h-14 w-20 rounded-md border p-2 shadow-md ${
            isNightMode
              ? "border-indigo-400/30 bg-gradient-to-br from-indigo-950 to-slate-900"
              : "border-amber-900/15 bg-gradient-to-br from-amber-50 to-pink-50"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-7 border-b border-white/10 [clip-path:polygon(0_0,50%_100%,100%_0)]" />
          <div className="absolute left-1/2 top-5 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-700 text-rose-100 shadow-sm text-[8px] font-serif font-bold">
            ♡
          </div>
        </div>
      </div>
    </div>
  );
}
