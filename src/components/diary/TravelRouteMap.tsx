import { useState, useEffect } from "react";
import { MapPin, Navigation, Sparkles, Compass, Ticket, ExternalLink, ZoomIn } from "lucide-react";
import type { DiaryItem } from "@/data/diary-content";

interface TravelRouteMapProps {
  isNightMode?: boolean;
  onSelectItem?: (item: DiaryItem) => void;
  travelItems?: DiaryItem[];
}

interface MapStop {
  id: string;
  name: string;
  state: string;
  x: number; // percentage along path
  y: number; // percentage along path
  tagline: string;
  icon: string;
  ticketStub: string;
  photoUrl: string;
  notes: string;
  itemMatchId: string;
}

const STOPS: MapStop[] = [
  {
    id: "bhopal",
    name: "Bhopal · Upper Lake",
    state: "Madhya Pradesh",
    x: 18,
    y: 58,
    tagline: "Golden hour sunset & lake breezes",
    icon: "🌅",
    ticketStub: "BHOPAL SHATABDI • TICKET 104",
    photoUrl: "/uploads/diary/travel/sunset-over-bhopal-lake.png",
    notes: "Golden light ripples across calm waters as the evening bells ring.",
    itemMatchId: "travel-bhopal-sunset",
  },
  {
    id: "pachmarhi",
    name: "Pachmarhi · Satpura Hills",
    state: "Madhya Pradesh",
    x: 48,
    y: 32,
    tagline: "Misty peaks, Bee Falls & pine trails",
    icon: "⛰️",
    ticketStub: "SATPURA NATIONAL PARK ENTRY • PERMIT 412",
    photoUrl: "/uploads/diary/travel/misty-mountain-ranges.png",
    notes: "1,300+ steps to Chauragarh peak and freezing fairy pools.",
    itemMatchId: "travel-misty-mountains",
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu · Temple & Hills",
    state: "South India",
    x: 82,
    y: 62,
    tagline: "Gopuram towers & steaming filter kaapi",
    icon: "🛕",
    ticketStub: "MADURAI HERITAGE EXPRESS • BERTH 28",
    photoUrl: "/uploads/diary/travel/tamil-nadu-temple-hills.png",
    notes: "Intricate Dravidian stone carvings against lush Nilgiri hills.",
    itemMatchId: "travel-tamil-nadu",
  },
];

export function TravelRouteMap({
  isNightMode = false,
  onSelectItem,
  travelItems = [],
}: TravelRouteMapProps) {
  const [activeStop, setActiveStop] = useState<string>("pachmarhi");
  const [isRiding, setIsRiding] = useState(true);
  const [scootyProgress, setScootyProgress] = useState(48);

  // Smoothly move scooty when stop is selected
  const handleSelectStop = (stop: MapStop) => {
    setActiveStop(stop.id);
    setScootyProgress(stop.x);
  };

  // Continuous gentle scooty cruising effect
  useEffect(() => {
    if (!isRiding) return;
    const interval = setInterval(() => {
      setScootyProgress((prev) => {
        if (prev >= 82) return 18;
        return prev + 0.35;
      });
    }, 75);
    return () => clearInterval(interval);
  }, [isRiding]);

  // Find corresponding diary item to open modal if clicked
  const handleOpenPhoto = (itemMatchId: string, fallbackStop: MapStop) => {
    let matchedItem = travelItems.find(
      (i) =>
        i.id === itemMatchId ||
        i.id.includes(fallbackStop.id) ||
        i.title.toLowerCase().includes(fallbackStop.id),
    );

    if (!matchedItem) {
      matchedItem = {
        id: fallbackStop.id,
        title: fallbackStop.name,
        caption: fallbackStop.notes,
        description: fallbackStop.tagline,
        location: `${fallbackStop.name}, ${fallbackStop.state}`,
        date: "Travel Memoir",
        category: "travel",
        mediaType: "image",
        mediaUrl: fallbackStop.photoUrl,
        aspectRatio: "landscape",
        frameStyle: "postmark",
        sortOrder: 1,
        published: true,
      };
    }

    if (matchedItem && onSelectItem) {
      onSelectItem(matchedItem);
    }
  };

  // Curved path: y = 58 - 28 * sin(angle)
  const angle = ((scootyProgress - 18) / (82 - 18)) * Math.PI;
  const scootyY = 58 - 28 * Math.sin(angle);

  return (
    <div
      className={`relative my-6 overflow-hidden rounded-3xl border-2 p-4 sm:p-6 shadow-xl transition-all duration-500 select-none ${
        isNightMode
          ? "border-cyan-500/30 bg-gradient-to-b from-[#0a1128] via-[#0f1738] to-[#0a1128] text-slate-100"
          : "border-teal-300/80 bg-[#fffdf9] text-stone-900"
      }`}
    >
      {/* Decorative Washi Tape Strips on Map Corners */}
      <div className="diary-washi-tape absolute -top-3 left-10 w-24 h-5 z-20 -rotate-3" />
      <div className="diary-washi-tape absolute -top-3 right-10 w-24 h-5 z-20 rotate-3" />

      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 mb-4 border-dashed border-teal-300/50">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-cyan-300 bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800">
            <Compass className="h-3.5 w-3.5 text-teal-600 animate-spin-slow" />
            <span>Interactive Travel Route Map</span>
          </div>
          <h3 className="font-cursive text-2xl sm:text-3xl font-extrabold mt-1 text-teal-950 dark:text-cyan-100">
            Palak's Wandering Scooty Trail 🛵✨
          </h3>
          <p className="font-handwriting text-xs sm:text-sm text-stone-600 dark:text-teal-200/90">
            Click on any stop, ticket or photo to navigate & inspect in full zoom!
          </p>
        </div>

        {/* Toggle Cruising Animation */}
        <button
          type="button"
          onClick={() => setIsRiding(!isRiding)}
          className={`self-start sm:self-center inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-serif font-bold transition shadow-xs border ${
            isRiding
              ? "bg-teal-600 text-white border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.4)]"
              : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300"
          }`}
        >
          <span>{isRiding ? "⏸ Pause Cruising" : "▶ Start Cruising"}</span>
        </button>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[270px] sm:h-[310px] rounded-2xl overflow-hidden border border-teal-200/70 dark:border-cyan-500/20 bg-[#faf6ed] dark:bg-[#070b1a] shadow-inner">
        {/* Subtle Map Grid & Topographic Rings */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* SVG Route Path Line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path
            d="M 18% 58% Q 48% 6% 82% 62%"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeDasharray="8 6"
            className="animate-[dash_20s_linear_infinite]"
          />
        </svg>

        {/* Destination Stops with Aesthetic Mini Photo Frames & Vintage Tickets */}
        {STOPS.map((stop) => {
          const isCurrent = activeStop === stop.id;
          return (
            <div
              key={stop.id}
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              {/* Outer Pulsing Aura */}
              <div
                className={`absolute -inset-3 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-teal-400/40 animate-ping"
                    : "bg-amber-300/20 group-hover:bg-amber-300/40"
                }`}
              />

              {/* Pin Landmark Circle */}
              <div
                onClick={() => {
                  handleSelectStop(stop);
                  handleOpenPhoto(stop.itemMatchId, stop);
                }}
                className={`relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full border-3 shadow-lg transition-transform duration-300 cursor-pointer group-hover:scale-115 ${
                  isCurrent
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-950 scale-110 ring-4 ring-teal-300/60"
                    : "border-stone-400 dark:border-stone-600 bg-white dark:bg-stone-900 group-hover:border-teal-400"
                }`}
              >
                <span className="text-lg sm:text-xl select-none">{stop.icon}</span>
              </div>

              {/* Mini Aesthetic Photo Frame Attached to Landmark */}
              <div
                onClick={() => {
                  handleSelectStop(stop);
                  handleOpenPhoto(stop.itemMatchId, stop);
                }}
                className={`absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-12 rounded-lg p-1 bg-white dark:bg-stone-800 border-2 shadow-lg cursor-pointer transition-all hover:scale-115 ${
                  isCurrent ? "border-teal-400 scale-105" : "border-stone-300 opacity-90"
                }`}
              >
                <img
                  src={stop.photoUrl}
                  alt={stop.name}
                  className="w-full h-full object-cover rounded-xs"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition rounded-xs">
                  <ZoomIn className="h-3 w-3 text-white" />
                </div>
              </div>

              {/* Destination Tag & Vintage Ticket Stub Tag */}
              <div
                onClick={() => {
                  handleSelectStop(stop);
                  handleOpenPhoto(stop.itemMatchId, stop);
                }}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-serif font-bold shadow-md cursor-pointer transition-all ${
                  isCurrent
                    ? "bg-teal-700 text-white scale-105"
                    : "bg-white/95 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 group-hover:scale-105"
                }`}
              >
                {stop.name.split("·")[0]}
              </div>
            </div>
          );
        })}

        {/* ANIMATED CUTE GIRL RIDING RETRO SCOOTY */}
        <div
          style={{
            left: `${scootyProgress}%`,
            top: `${scootyY}%`,
            transition: isRiding ? "none" : "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto cursor-grab active:cursor-grabbing"
          title="Palak cruising on her pastel scooty! 🛵💨"
        >
          {/* Scooty Speech Bubble */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-900/95 text-amber-200 px-3 py-0.5 text-[10px] font-handwriting font-bold shadow-xl border border-amber-300/50 flex items-center gap-1 animate-bounce">
            <Sparkles className="h-3 w-3 text-cyan-300" />
            <span>Cruising with wind & coffee! 🛵💨</span>
          </div>

          {/* SVG Illustration: Cute girl on pastel retro scooty */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Little Exhaust Smoke Puff */}
              <circle cx="15" cy="74" r="4" fill="#cbd5e1" opacity="0.7">
                <animate attributeName="r" values="2;6;1" dur="0.6s" repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0.8;0.2;0"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="9" cy="76" r="3" fill="#cbd5e1" opacity="0.5">
                <animate attributeName="r" values="1;5;0.5" dur="0.8s" repeatCount="indefinite" />
              </circle>

              {/* Rear Wheel */}
              <circle cx="25" cy="76" r="10" fill="#1e293b" />
              <circle cx="25" cy="76" r="5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />

              {/* Front Wheel */}
              <circle cx="75" cy="76" r="10" fill="#1e293b" />
              <circle cx="75" cy="76" r="5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />

              {/* Pastel Teal Retro Scooty Body */}
              <path
                d="M 22 72 Q 35 70 42 60 L 52 60 L 58 72 L 72 72 L 65 52 L 48 52 Q 35 52 28 65 Z"
                fill="#2dd4bf"
              />
              <rect x="42" y="68" width="16" height="4" rx="2" fill="#0f766e" />
              <path d="M 62 48 L 74 72 L 68 74 L 58 50 Z" fill="#14b8a6" />

              {/* Headlight */}
              <circle cx="74" cy="46" r="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              {/* Handlebar */}
              <line
                x1="64"
                y1="48"
                x2="60"
                y2="40"
                stroke="#334155"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="56"
                y1="40"
                x2="64"
                y2="40"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="56" cy="37" r="2.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />

              {/* Cute Backpack */}
              <rect x="28" y="38" width="10" height="14" rx="4" fill="#fb7185" />

              {/* Girl's Cozy Sweater Body */}
              <path d="M 36 38 C 42 36 50 40 50 50 L 46 62 L 38 62 Z" fill="#f43f5e" />
              {/* Girl's Arm reaching to handlebar */}
              <path
                d="M 42 42 Q 54 42 60 41"
                stroke="#fda4af"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Hair blowing in the wind */}
              <path d="M 28 26 Q 16 28 10 36 Q 20 34 26 30" fill="#451a03" />

              {/* Girl's Head & Face */}
              <circle cx="38" cy="28" r="9" fill="#fecdd3" />
              {/* Cute Retro Cream Helmet */}
              <path
                d="M 30 27 C 30 18 47 18 47 27 C 47 29 30 29 30 27 Z"
                fill="#fef08a"
                stroke="#eab308"
                strokeWidth="1.5"
              />
              <circle cx="41" cy="30" r="1.5" fill="#fb7185" />
              <path
                d="M 38 31 Q 40 33 42 31"
                stroke="#881337"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Selected Stop Details Card with Vintage Ticket Stub & Zoom Button */}
      {activeStop && (
        <div className="mt-3.5 p-3.5 sm:p-4 rounded-2xl border border-teal-200/80 dark:border-teal-400/30 bg-teal-50/70 dark:bg-teal-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          {(() => {
            const stop = STOPS.find((s) => s.id === activeStop) || STOPS[0];
            return (
              <>
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => handleOpenPhoto(stop.itemMatchId, stop)}
                    className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border-2 border-white dark:border-stone-800 shadow-md cursor-pointer hover:scale-105 transition shrink-0"
                    title="Click to zoom photo!"
                  >
                    <img
                      src={stop.photoUrl}
                      alt={stop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 hover:opacity-100 transition">
                      <ZoomIn className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-teal-950 dark:text-cyan-200">
                        {stop.name}
                      </h4>
                      {/* Vintage Ticket Stub Badge */}
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-sm border border-dashed border-amber-600/60 bg-amber-100/90 dark:bg-amber-950/80 px-2 py-0.5 text-[9px] font-mono font-bold text-amber-900 dark:text-amber-200">
                        <Ticket className="h-2.5 w-2.5" />
                        {stop.ticketStub}
                      </span>
                    </div>
                    <p className="font-handwriting text-xs sm:text-sm text-stone-600 dark:text-teal-200/80 mt-0.5">
                      "{stop.notes}"
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPhoto(stop.itemMatchId, stop)}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 text-xs font-serif font-bold transition shadow-xs"
                >
                  <ZoomIn className="h-3.5 w-3.5" /> Open & Zoom In
                </button>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default TravelRouteMap;
