import { useId } from "react";

interface FairyFloralElementsProps {
  isNightMode?: boolean;
}

/**
 * 3D Fairytale Floral & Neon Atmospheric Elements
 * Features:
 * - 3D Falling Floral/Sakura Petals drifting across spreads
 * - Fluttering Glowing Fairy Butterflies with wing-flap animation
 * - Ethereal Fairy Dust Sparkles and Neon Light Orbs
 * - Ambient Day/Night lighting adaptation
 */
export function FairyFloralElements({ isNightMode = false }: FairyFloralElementsProps) {
  const baseId = useId();

  // 14 falling floral petals with deterministic random offsets
  const petals = [
    { left: 5, delay: 0.2, duration: 8.5, size: 18, rotate: 25 },
    { left: 14, delay: 2.1, duration: 10.2, size: 22, rotate: -40 },
    { left: 24, delay: 4.3, duration: 9.1, size: 16, rotate: 60 },
    { left: 33, delay: 1.2, duration: 11.0, size: 20, rotate: -20 },
    { left: 45, delay: 3.5, duration: 8.8, size: 24, rotate: 75 },
    { left: 56, delay: 0.8, duration: 9.5, size: 19, rotate: -35 },
    { left: 67, delay: 4.8, duration: 10.5, size: 21, rotate: 45 },
    { left: 78, delay: 2.7, duration: 8.2, size: 17, rotate: -60 },
    { left: 88, delay: 5.1, duration: 11.5, size: 23, rotate: 30 },
    { left: 95, delay: 1.9, duration: 9.8, size: 18, rotate: -15 },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {/* ===================================================================== */}
      {/* 1. 3D DRIFTING FLORAL PETALS                                          */}
      {/* ===================================================================== */}
      {petals.map((petal, index) => (
        <div
          key={`${baseId}-petal-${index}`}
          className="absolute -top-10 animate-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            className="transition-transform duration-700"
            style={{
              transform: `rotate(${petal.rotate}deg)`,
              filter: isNightMode
                ? "drop-shadow(0 0 8px rgba(34, 211, 238, 0.7))"
                : "drop-shadow(0 2px 4px rgba(244, 114, 182, 0.4))",
            }}
          >
            <path
              d="M12 0C7 6 0 14 0 22C0 27.5 5.4 32 12 32C18.6 32 24 27.5 24 22C24 14 17 6 12 0Z"
              fill={
                isNightMode
                  ? index % 2 === 0
                    ? "url(#nightPetalGradA)"
                    : "url(#nightPetalGradB)"
                  : index % 2 === 0
                    ? "url(#dayPetalGradA)"
                    : "url(#dayPetalGradB)"
              }
              opacity={isNightMode ? 0.85 : 0.75}
            />
          </svg>
        </div>
      ))}

      {/* SVG Petal Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="dayPetalGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>
          <linearGradient id="dayPetalGradB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fecdd3" />
          </linearGradient>
          <linearGradient id="nightPetalGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="nightPetalGradB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>

      {/* ===================================================================== */}
      {/* 2. FLUTTERING GLOWING FAIRY BUTTERFLIES                               */}
      {/* ===================================================================== */}
      {/* Left Fluttering Butterfly */}
      <div
        className="absolute top-12 left-6 sm:left-12 hidden sm:block animate-fairy-fly"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="animate-butterfly">
          <span
            className="text-2xl sm:text-3xl inline-block"
            style={{
              filter: isNightMode
                ? "drop-shadow(0 0 14px #22d3ee) drop-shadow(0 0 25px #06b6d4)"
                : "drop-shadow(0 0 12px #f472b6) drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
            }}
          >
            🦋
          </span>
        </div>
      </div>

      {/* Right Fluttering Butterfly */}
      <div
        className="absolute top-1/3 right-8 sm:right-16 hidden md:block animate-fairy-fly"
        style={{ animationDelay: "3.2s" }}
      >
        <div className="animate-butterfly" style={{ animationDelay: "0.15s" }}>
          <span
            className="text-2xl sm:text-3xl inline-block"
            style={{
              filter: isNightMode
                ? "drop-shadow(0 0 14px #e879f9) drop-shadow(0 0 25px #c084fc)"
                : "drop-shadow(0 0 12px #fbbf24) drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
            }}
          >
            ✨
          </span>
        </div>
      </div>

      {/* Bottom Floating Fairy Dust */}
      <div
        className="absolute bottom-16 left-1/4 hidden lg:block animate-fairy-fly"
        style={{ animationDelay: "2s" }}
      >
        <span
          className="text-xl inline-block"
          style={{
            filter: isNightMode ? "drop-shadow(0 0 12px #34d399)" : "drop-shadow(0 0 10px #f43f5e)",
          }}
        >
          🌸
        </span>
      </div>

      {/* ===================================================================== */}
      {/* 3. 3D NEON AMBIENT GLOW RINGS (Subtle Fairy Tale Light Atmosphere)   */}
      {/* ===================================================================== */}
      <div
        className={`absolute -top-16 left-1/3 h-72 w-72 rounded-full blur-[110px] transition-all duration-700 pointer-events-none ${
          isNightMode ? "bg-cyan-500/20" : "bg-pink-300/25"
        }`}
      />
      <div
        className={`absolute top-1/2 right-1/4 h-80 w-80 rounded-full blur-[130px] transition-all duration-700 pointer-events-none ${
          isNightMode ? "bg-purple-600/20" : "bg-amber-200/20"
        }`}
      />
    </div>
  );
}
