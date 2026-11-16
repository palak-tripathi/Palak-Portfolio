import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Navigation,
  Sparkles,
  Compass,
  Ticket,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Calendar,
  Layers,
} from "lucide-react";
import type { DiaryItem } from "@/data/diary-content";

interface TravelRouteMapProps {
  isNightMode?: boolean;
  onSelectItem?: (item: DiaryItem) => void;
  travelItems?: DiaryItem[];
}

export interface RealDestination {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  tagline: string;
  icon: string;
  ticketStub: string;
  photoUrl: string;
  attractions: string[];
  notes: string;
  itemMatchId: string;
  directionsUrl: string;
}

export const REAL_DESTINATIONS: RealDestination[] = [
  {
    id: "bhopal",
    name: "Bhopal · Upper Lake (Bada Talab)",
    region: "Madhya Pradesh, India",
    lat: 23.2599,
    lng: 77.4126,
    tagline: "Golden hour sunset & lake breezes",
    icon: "🌅",
    ticketStub: "BHOPAL SHATABDI • COACH B2",
    photoUrl: "/media/diary/travel/bhopal-lake.png",
    attractions: ["Bada Talab / VIP Road", "Van Vihar National Park", "Boat Club Promenade"],
    notes: "Golden light ripples across calm waters as the evening bells ring across VIP Road.",
    itemMatchId: "travel-bhopal-sunset",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=23.2599,77.4126",
  },
  {
    id: "pachmarhi",
    name: "Pachmarhi · Satpura Mountain Range",
    region: "Hoshangabad, Madhya Pradesh",
    lat: 22.4674,
    lng: 78.4346,
    tagline: "Misty peaks, Bee Falls & pine trails",
    icon: "⛰️",
    ticketStub: "SATPURA RESERVE ENTRY • PERMIT 412",
    photoUrl: "/media/diary/travel/pachmarhi-hills.jpg",
    attractions: ["Dhoopgarh Highest Peak (1,352m)", "Bee Falls & Fairy Pool", "Chauragarh Shrine"],
    notes:
      "1,300+ steps to Chauragarh peak and freezing mountain streams under tall pine canopies.",
    itemMatchId: "travel-misty-mountains",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=22.4674,78.4346",
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu · Temple Towers & Nilgiri Hills",
    region: "South India",
    lat: 9.9195,
    lng: 78.1193,
    tagline: "Gopuram towers & steaming filter kaapi",
    icon: "🛕",
    ticketStub: "MADURAI HERITAGE EXPRESS • BERTH 28",
    photoUrl: "/media/diary/travel/tamil-nadu-temple.png",
    attractions: [
      "Meenakshi Amman Gopurams",
      "Nilgiri Mountain Railway",
      "Dravidian Stone Sculptures",
    ],
    notes:
      "Intricate multi-tier gopuram stone carvings rising majestically against mist-covered green hills.",
    itemMatchId: "travel-tamil-nadu",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=9.9195,78.1193",
  },
];

export function TravelRouteMap({
  isNightMode = false,
  onSelectItem,
  travelItems = [],
}: TravelRouteMapProps) {
  const [activeDestId, setActiveDestId] = useState<string>("pachmarhi");
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  const activeDest = REAL_DESTINATIONS.find((d) => d.id === activeDestId) || REAL_DESTINATIONS[1];

  // Dynamic client-side Leaflet loader
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if Leaflet CSS is loaded
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Check if Leaflet JS is loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    script.onerror = () => {
      console.warn("Leaflet script failed to load; using vector fallback");
    };
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Initialize and update Leaflet Map
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;
    if (!leafletLoaded || !L || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      try {
        const map = L.map(mapContainerRef.current, {
          center: [activeDest.lat, activeDest.lng],
          zoom: mapZoom,
          zoomControl: false,
          scrollWheelZoom: false,
        });

        // OpenStreetMap Tile Layer
        const tileUrl = isNightMode
          ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        L.tileLayer(tileUrl, {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Add markers for all real destinations
        REAL_DESTINATIONS.forEach((dest) => {
          const markerHtml = `
            <div style="cursor: pointer; text-align: center; transform: translate(-50%, -50%);">
              <div style="background: ${isNightMode ? "#06b6d4" : "#0d9488"}; color: white; padding: 6px 10px; border-radius: 9999px; font-weight: bold; font-size: 11px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white; display: inline-flex; align-items: center; gap: 4px;">
                <span>${dest.icon}</span>
                <span>${dest.name.split("·")[0].trim()}</span>
              </div>
            </div>
          `;

          const customIcon = L.divIcon({
            html: markerHtml,
            className: "leaflet-custom-marker",
            iconSize: [120, 36],
            iconAnchor: [60, 18],
          });

          const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);
          marker.on("click", () => {
            setActiveDestId(dest.id);
            map.flyTo([dest.lat, dest.lng], 8, { duration: 1 });
          });
        });

        mapInstanceRef.current = map;
      } catch (err) {
        console.warn("Leaflet initialization warning:", err);
      }
    } else {
      try {
        mapInstanceRef.current.flyTo([activeDest.lat, activeDest.lng], 7, {
          duration: 1.2,
        });
      } catch {
        // ignore pan error
      }
    }
  }, [leafletLoaded, activeDest, isNightMode, mapZoom]);

  const handleZoom = (delta: number) => {
    const nextZoom = Math.max(4, Math.min(12, mapZoom + delta));
    setMapZoom(nextZoom);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(nextZoom);
    }
  };

  const handleOpenPhoto = () => {
    let matchedItem = travelItems.find(
      (i) =>
        i.id === activeDest.itemMatchId ||
        i.title.toLowerCase().includes(activeDest.id) ||
        i.location?.toLowerCase().includes(activeDest.id),
    );

    if (!matchedItem) {
      matchedItem = {
        id: activeDest.itemMatchId,
        title: activeDest.name,
        caption: activeDest.tagline,
        description: activeDest.notes,
        location: activeDest.region,
        date: "Travel Postcard",
        category: "travel",
        mediaType: "image",
        mediaUrl: activeDest.photoUrl,
        image: activeDest.photoUrl,
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: [activeDest.id, "RealDestination", "Scrapbook"],
        sortOrder: 1,
        published: true,
      };
    }

    if (onSelectItem && matchedItem) {
      onSelectItem(matchedItem);
    }
  };

  return (
    <div className="relative my-6 select-none">
      {/* ===================================================================== */}
      {/* TOP BAR: Real Destination Tabs & Interactive Map Controls            */}
      {/* ===================================================================== */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap items-center gap-2">
          {REAL_DESTINATIONS.map((dest) => {
            const isActive = activeDest.id === dest.id;
            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => {
                  setActiveDestId(dest.id);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo([dest.lat, dest.lng], 7, { duration: 1.2 });
                  }
                }}
                className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-serif font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? isNightMode
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105"
                      : "bg-teal-700 text-white shadow-md scale-105"
                    : isNightMode
                      ? "bg-slate-900/80 text-cyan-200 border border-cyan-800/40 hover:bg-slate-800"
                      : "bg-teal-50 text-teal-950 border border-teal-200 hover:bg-teal-100"
                }`}
              >
                <span>{dest.icon}</span>
                <span>{dest.name.split("·")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Map Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleZoom(1)}
            aria-label="Zoom in map"
            className={`rounded-full p-1.5 text-xs border shadow-xs transition hover:scale-105 ${
              isNightMode
                ? "bg-slate-900 border-cyan-500/40 text-cyan-200"
                : "bg-white border-teal-300 text-teal-900"
            }`}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom(-1)}
            aria-label="Zoom out map"
            className={`rounded-full p-1.5 text-xs border shadow-xs transition hover:scale-105 ${
              isNightMode
                ? "bg-slate-900 border-cyan-500/40 text-cyan-200"
                : "bg-white border-teal-300 text-teal-900"
            }`}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2-COLUMN SPREAD: Real Interactive Map (Left) + 3D Destination Card (Right) */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN (7 Cols): Real Leaflet OpenStreetMap Container */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            className={`relative min-h-[360px] sm:min-h-[420px] w-full flex-1 rounded-2xl overflow-hidden border-2 shadow-inner transition duration-500 ${
              isNightMode
                ? "border-cyan-500/40 shadow-black/50"
                : "border-teal-300/80 shadow-teal-900/10"
            }`}
          >
            {/* The Actual Leaflet Map Canvas */}
            <div ref={mapContainerRef} className="absolute inset-0 h-full w-full z-10" />

            {/* Fallback Vector Graphic if Offline */}
            {!leafletLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-teal-900/10 backdrop-blur z-0">
                <Compass className="h-10 w-10 text-teal-500 animate-spin-slow mb-2" />
                <p className="font-serif font-bold text-sm">Loading OpenStreetMap Canvas…</p>
                <p className="text-xs font-mono opacity-70">
                  {activeDest.name} · [{activeDest.lat}°N, {activeDest.lng}°E]
                </p>
              </div>
            )}

            {/* Real Coordinates Overlay Pill */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                {activeDest.lat.toFixed(4)}° N, {activeDest.lng.toFixed(4)}° E
              </span>
            </div>

            {/* Live OpenStreetMap Attribution Pill */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[9px] font-mono text-white/80 backdrop-blur">
              <Layers className="h-2.5 w-2.5" />
              <span>OpenStreetMap Verified</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): 3D Destination Card & Animated Girl Scooter */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div
            className={`popup-3d-element relative rounded-2xl border-2 p-5 shadow-xl transition-all duration-300 ${
              isNightMode
                ? "border-cyan-400/50 bg-[#091124]/95 text-slate-100"
                : "border-teal-300/80 bg-[#fffdf9] text-stone-900"
            }`}
          >
            {/* Animated Floating "TRAVEL" Lettering */}
            <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-teal-500/20">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-extrabold tracking-[0.28em] uppercase text-teal-600 dark:text-cyan-300 animate-pulse">
                  ✈ TRAVEL DIARIES
                </span>
              </div>

              {/* Cute Animated Scooty Girl */}
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-bounce">
                <span className="text-base">🛵💨</span>
                <span className="text-[10px] font-mono">Exploring…</span>
              </div>
            </div>

            {/* Destination Name & Region */}
            <h3 className="font-cursive text-2xl sm:text-3xl font-extrabold tracking-wide leading-tight">
              {activeDest.name}
            </h3>
            <p className="font-mono text-xs opacity-75 mt-0.5 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-rose-500" />
              <span>{activeDest.region}</span>
            </p>

            {/* Destination Real Photo in Polaroid Style Frame */}
            <div
              onClick={handleOpenPhoto}
              className="group relative mt-3 aspect-[16/10] overflow-hidden rounded-xl border-4 border-white dark:border-stone-800 shadow-md cursor-pointer transition hover:scale-[1.02]"
            >
              <img
                src={activeDest.photoUrl}
                alt={activeDest.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3 text-white">
                <span className="text-xs font-serif font-bold">Click to Inspect in Deep Zoom</span>
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>

            {/* Handwritten Caption & Notes */}
            <p className="font-handwriting mt-3 text-base sm:text-lg font-bold leading-snug text-stone-700 dark:text-stone-300">
              "{activeDest.notes}"
            </p>

            {/* Famous Attractions */}
            <div className="mt-3">
              <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                ⭐ Famous Highlights:
              </span>
              <ul className="mt-1 space-y-0.5 text-xs font-serif text-stone-600 dark:text-stone-300">
                {activeDest.attractions.map((attr, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-teal-500">•</span>
                    <span>{attr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* External Navigation Link & Ticket Stub */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-teal-500/20 text-xs">
              <div className="flex items-center gap-1 font-mono text-[10px] opacity-75">
                <Ticket className="h-3 w-3 text-amber-500" />
                <span>{activeDest.ticketStub}</span>
              </div>

              <a
                href={activeDest.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-serif font-bold transition shadow-xs hover:scale-105 ${
                  isNightMode
                    ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/30"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                <Navigation className="h-3 w-3" />
                <span>Get Directions (Maps)</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
