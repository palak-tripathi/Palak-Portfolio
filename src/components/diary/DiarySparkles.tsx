import { useId } from "react";

interface DiarySparklesProps {
  count?: number;
  interactive?: boolean;
}

export function DiarySparkles({ count = 24 }: DiarySparklesProps) {
  const baseId = useId();

  // Deterministic positions and animation delays to prevent hydration mismatches
  const particles = Array.from({ length: count }, (_, i) => {
    const left = ((i * 37 + 13) % 96) + 2; // 2% to 98%
    const top = ((i * 53 + 7) % 94) + 3; // 3% to 97%
    const size = (i % 4) + 3; // 3px to 6px
    const delay = ((i * 0.4) % 3.6).toFixed(1);
    const duration = ((i % 3) + 2.5).toFixed(1);
    const isGold = i % 2 === 0;
    const isStar = i % 3 === 0;

    return { id: `${baseId}-p-${i}`, left, top, size, delay, duration, isGold, isStar };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `sparkle-twinkle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.isStar ? (
            <svg
              width={p.size * 2.4}
              height={p.size * 2.4}
              viewBox="0 0 24 24"
              fill={p.isGold ? "#fef08a" : "#e9d5ff"}
              className="drop-shadow-[0_0_8px_rgba(250,204,21,0.85)]"
            >
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6Z" />
            </svg>
          ) : (
            <div
              className={`rounded-full ${
                p.isGold
                  ? "bg-amber-200/90 shadow-[0_0_10px_#fde047]"
                  : "bg-pink-200/85 shadow-[0_0_10px_#f472b6]"
              }`}
              style={{ width: `${p.size}px`, height: `${p.size}px` }}
            />
          )}
        </div>
      ))}

      {/* Floating Gentle Light Orbs */}
      <div className="absolute -top-12 left-1/4 h-56 w-56 rounded-full bg-pink-300/15 blur-3xl animate-soft-float" />
      <div
        className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-sky-200/15 blur-3xl animate-soft-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute -bottom-10 left-1/3 h-52 w-52 rounded-full bg-amber-100/20 blur-3xl animate-soft-float"
        style={{ animationDelay: "3.5s" }}
      />
    </div>
  );
}
