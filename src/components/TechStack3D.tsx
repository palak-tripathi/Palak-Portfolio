import React, { useState } from "react";

interface TechItem {
  name: string;
  category: string;
  color: string;
  glow: string;
  isMern?: boolean;
  svg: React.ReactNode;
}

const TECH_ITEMS: TechItem[] = [
  // MERN Stack (Row 1 - Biggest & Brightest)
  {
    name: "MongoDB",
    category: "MERN Database",
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.6)",
    isMern: true,
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-12 sm:h-12">
        <path
          d="M63.8 2.2C59.5 22.8 38.3 54.9 38.3 80.5c0 23.3 15.6 38.9 25.5 45.3.8-2.6 1.8-6.1 1.8-6.1s-.4.3-1.1-.3c-11.4-8.7-18.7-22.3-18.7-36.9 0-21.7 17.5-44.5 17.5-70.6 0-3.6-.3-6.9-.5-9.7z"
          fill="#499D4A"
        />
        <path
          d="M64 2c4.3 20.6 25.5 52.7 25.5 78.3 0 23.3-15.6 38.9-25.5 45.3-.8-2.6-1.8-6.1-1.8-6.1s.4.3 1.1-.3c11.4-8.7 18.7-22.3 18.7-36.9 0-21.7-17.5-44.5-17.5-70.6 0-3.6.3-6.9.5-9.7z"
          fill="#58AA50"
        />
        <path
          d="M63.6 127.3c-.6-1-.9-2.3-.9-3.8 0-4.6 2.3-8.8 4.2-13.6 1.8-4.6 3-9.7 1.5-14.7-.9-3.1-2.9-5.7-4.8-8.2-1.9 2.5-3.9 5.1-4.8 8.2-1.5 5-.3 10.1 1.5 14.7 1.9 4.8 4.2 9 4.2 13.6 0 1.5-.3 2.8-.9 3.8z"
          fill="#3FA037"
        />
      </svg>
    ),
  },
  {
    name: "Express.js",
    category: "MERN Backend",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.45)",
    isMern: true,
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-12 sm:h-12">
        <path
          d="M24 40h16v8H32v12h7v8h-7v12h8v8H24V40zm22 18h10l6 14 6-14h10l-11 23 11 25H68l-6-15-6 15H46l11-25-11-23zm38-18h16v8h-8v12h7v8h-7v12h8v8H84V40z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    name: "React",
    category: "MERN Frontend",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.65)",
    isMern: true,
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 sm:w-12 sm:h-12">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "MERN Runtime",
    color: "#68A063",
    glow: "rgba(104, 160, 99, 0.6)",
    isMern: true,
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-12 sm:h-12">
        <path
          d="M64 4L14 33v58l50 29 50-29V33L64 4zm0 18l36 21v42L64 106 28 85V43l36-21z"
          fill="#68A063"
        />
        <circle cx="64" cy="64" r="14" fill="#339933" />
      </svg>
    ),
  },

  // Ecosystem & Core Technologies (Row 2)
  {
    name: "JavaScript (ES6+)",
    category: "Core Language",
    color: "#F7DF1E",
    glow: "rgba(247, 223, 30, 0.5)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <rect width="128" height="128" rx="20" fill="#F7DF1E" />
        <path
          d="M67 40v48h14V72c0-9 4-13 11-13s10 4 10 13v16h14V70c0-16-9-23-22-23-8 0-14 4-17 10V40H67zm-39 0v33c0 11 6 15 15 15 5 0 9-1 12-3l-3-11c-2 1-4 2-7 2-3 0-5-2-5-6V40H28z"
          fill="#000000"
        />
      </svg>
    ),
  },
  {
    name: "HTML5",
    category: "Markup",
    color: "#E34F26",
    glow: "rgba(227, 79, 38, 0.5)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <path d="M19 116L9 4h110l-10 112-45 12z" fill="#E34F26" />
        <path d="M64 117l36-10 8-91H64v101z" fill="#EF652A" />
        <path d="M64 48H44l2 18h18v18H44l-2-28h-2l3 38 21 6v-16l-9-3-1-11h10V48z" fill="#EBEBEB" />
        <path d="M64 48h20l-2 24-18 5v16l25-7 3-38H64V48z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    category: "Styling",
    color: "#1572B6",
    glow: "rgba(21, 114, 182, 0.5)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <path d="M19 116L9 4h110l-10 112-45 12z" fill="#1572B6" />
        <path d="M64 117l36-10 8-91H64v101z" fill="#33A9DC" />
        <path d="M64 48H44l2 18h18v18H44l-2-28h-2l3 38 21 6v-16l-9-3-1-11h10V48z" fill="#EBEBEB" />
        <path d="M64 48h20l-2 24-18 5v16l25-7 3-38H64V48z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling Framework",
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.5)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <path
          d="M64 32c-20 0-32 10-36 30 7-10 16-14 26-11 6 2 10 6 15 11 8 8 17 18 35 18 20 0 32-10 36-30-7 10-16 14-26 11-6-2-10-6-15-11-8-8-17-18-35-18zm-36 36c-20 0-32 10-36 30 7-10 16-14 26-11 6 2 10 6 15 11 8 8 17 18 35 18 20 0 32-10 36-30-7 10-16 14-26 11-6-2-10-6-15-11-8-8-17-18-35-18z"
          fill="#06B6D4"
        />
      </svg>
    ),
  },
  {
    name: "Git",
    category: "Version Control",
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.5)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <path
          d="M124.7 57.2L70.8 3.3c-4.4-4.4-11.5-4.4-15.9 0L40 18.2l20.1 20.1c4.7-1.6 10.2-.5 13.9 3.2 3.7 3.7 4.8 9.2 3.2 13.9l19.4 19.4c4.7-1.6 10.2-.5 13.9 3.2 5.5 5.5 5.5 14.3 0 19.8-5.5 5.5-14.3 5.5-19.8 0-4.1-4.1-5.1-10.2-2.8-15.3L69.3 64v35.8c1.6.8 3.1 2 4.2 3.5 4.4 4.4 4.4 11.5 0 15.9-4.4 4.4-11.5 4.4-15.9 0-4.4-4.4-4.4-11.5 0-15.9 1.4-1.4 3.1-2.4 5-3V63.6c-1.9-.6-3.6-1.6-5-3-4-4-4.9-9.9-2.7-14.8L35.2 26 3.3 57.9c-4.4 4.4-4.4 11.5 0 15.9l53.9 53.9c4.4 4.4 11.5 4.4 15.9 0l51.6-51.6c4.4-4.4 4.4-11.5 0-15.9z"
          fill="#F05032"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    category: "Collaboration",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.4)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <path
          d="M64 5.3C29.8 5.3 2 33.1 2 67.4c0 27.5 17.8 50.8 42.5 59 3.1.6 4.2-1.3 4.2-3 0-1.5-.1-6.5-.1-11.8-17.3 3.8-20.9-7.3-20.9-7.3-2.8-7.2-6.9-9.1-6.9-9.1-5.6-3.9.4-3.8.4-3.8 6.3.4 9.6 6.5 9.6 6.5 5.6 9.5 14.6 6.8 18.1 5.2.6-4 2.2-6.8 4-8.4-13.8-1.6-28.3-6.9-28.3-30.7 0-6.8 2.4-12.3 6.4-16.7-.6-1.6-2.8-7.9.6-16.5 0 0 5.2-1.7 17.1 6.4 5-1.4 10.3-2.1 15.6-2.1 5.3 0 10.6.7 15.6 2.1 11.9-8.1 17.1-6.4 17.1-6.4 3.4 8.6 1.2 14.9.6 16.5 4 4.4 6.4 9.9 6.4 16.7 0 23.9-14.5 29.1-28.4 30.6 2.2 1.9 4.2 5.7 4.2 11.5 0 8.3-.1 15-.1 17 0 1.7 1.1 3.7 4.3 3 24.6-8.2 42.4-31.5 42.4-58.9 0-34.3-27.8-62.1-62-62.1z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    name: "VS Code",
    category: "Editor",
    color: "#007ACC",
    glow: "rgba(0, 122, 204, 0.55)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <path
          d="M94.6 4.3L37.1 57.5 14.4 40.1c-2.4-1.8-5.8-.8-6.9 2L.6 59.8c-1 2.3-.3 4.9 1.7 6.4l23.5 17.8L2.3 101.8c-2 1.5-2.7 4.1-1.7 6.4l6.9 17.7c1.1 2.8 4.5 3.8 6.9 2l22.7-17.4 57.5 53.2c3.4 3.1 8.8 1.6 10.2-2.8l22.6-70.5c1-3.2-.3-6.6-3.1-8.3L94.6 4.3z"
          fill="#007ACC"
        />
        <path d="M94.6 4.3L37.1 57.5l57.5 53.2 30.6-28.5V32.8L94.6 4.3z" fill="#1F9CF0" />
      </svg>
    ),
  },
  {
    name: "IntelliJ IDEA",
    category: "IDE",
    color: "#FE315D",
    glow: "rgba(254, 49, 93, 0.5)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <rect width="128" height="128" rx="28" fill="#000000" />
        <path d="M18 18h46v46H18z" fill="#FE315D" />
        <path d="M64 64h46v46H64z" fill="#087CFA" />
        <path d="M28 88h32v8H28z" fill="#FFFFFF" />
        <path d="M38 52h8v24h-8zm16-16h8v40h-8z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "Postman",
    category: "API Testing",
    color: "#FF6C37",
    glow: "rgba(255, 108, 55, 0.55)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <circle cx="64" cy="64" r="60" fill="#FF6C37" />
        <circle cx="64" cy="46" r="14" fill="#FFFFFF" />
        <path d="M34 84c4-12 16-20 30-20s26 8 30 20c-8 8-18 12-30 12s-22-4-30-12z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "npm",
    category: "Package Manager",
    color: "#CB3837",
    glow: "rgba(203, 56, 55, 0.5)",
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-9 sm:h-9">
        <path d="M0 0h128v128H0z" fill="#CB3837" />
        <path d="M18 18h92v92H18z" fill="#CB3837" />
        <path d="M36 36h56v56H73V54H55v38H36z" fill="#FFFFFF" />
      </svg>
    ),
  },
];

export const TechStack3D: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const mernItems = TECH_ITEMS.filter((t) => t.isMern);
  const toolItems = TECH_ITEMS.filter((t) => !t.isMern);

  return (
    <div className="relative w-full py-12 px-4 select-none overflow-hidden rounded-3xl bg-gradient-to-b from-[#070913] via-[#0d1222] to-[#070913] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.7)]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />

      {/* Floating Active Tooltip (Tooltip only — no permanent visible text) */}
      <div
        className={`pointer-events-none fixed z-50 transition-all duration-200 transform -translate-x-1/2 -translate-y-full ${
          hoveredTech ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{
          left: "50%",
          top: "35%",
        }}
      >
        {hoveredTech && (
          <div className="flex flex-col items-center rounded-2xl bg-[#0f172a]/95 border border-white/20 px-5 py-2.5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: hoveredTech.color }}
              />
              <span className="font-mono text-base font-bold text-white tracking-wide">
                {hoveredTech.name}
              </span>
            </div>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-0.5 font-sans">
              {hoveredTech.category}
            </span>
          </div>
        )}
      </div>

      {/* Stack Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">
        {/* ROW 1: MERN STACK (Biggest & Brightest) */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {mernItems.map((item, idx) => {
            const isHovered = hoveredTech?.name === item.name;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredTech(item)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  animationDelay: `${idx * 0.25}s`,
                  boxShadow: isHovered
                    ? `0 0 35px ${item.glow}, 0 20px 40px rgba(0,0,0,0.6)`
                    : "0 8px 30px rgba(0,0,0,0.4)",
                }}
                className={`group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/[0.05] border transition-all duration-300 transform cursor-pointer animate-float ${
                  isHovered
                    ? "scale-115 -translate-y-3 border-white/40 bg-white/[0.12]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                {/* 3D Glass Top Reflection Highlight */}
                <div className="absolute inset-x-3 top-1.5 h-2 rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* SVG Icon */}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {item.svg}
                </div>

                {/* Subtle MERN Badge indicator on bottom edge */}
                <div className="absolute -bottom-1.5 px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-[9px] font-mono uppercase tracking-widest text-emerald-300/90 pointer-events-none">
                  MERN
                </div>
              </div>
            );
          })}
        </div>

        {/* ROW 2: Ecosystem & Developer Tools */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 max-w-3xl">
          {toolItems.map((item, idx) => {
            const isHovered = hoveredTech?.name === item.name;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredTech(item)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  animationDelay: `${(idx + 4) * 0.15}s`,
                  boxShadow: isHovered
                    ? `0 0 25px ${item.glow}, 0 12px 25px rgba(0,0,0,0.5)`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                }}
                className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.04] border transition-all duration-300 transform cursor-pointer animate-float ${
                  isHovered
                    ? "scale-120 -translate-y-2 border-white/40 bg-white/[0.10]"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* 3D Glass Reflection */}
                <div className="absolute inset-x-2 top-1 h-1.5 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                {/* SVG Icon */}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {item.svg}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechStack3D;
