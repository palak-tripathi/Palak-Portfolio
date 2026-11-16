import { useState, useEffect, useRef, useMemo } from "react";
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
  Play,
  Pause,
  Layers,
  Heart,
  Calendar,
  Eye,
  Camera,
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
  stopNumber: number;
  famousStateElements: { name: string; emoji: string }[];
}

export const REAL_DESTINATIONS: RealDestination[] = [
  {
    id: "bhopal",
    name: "Bhopal · Upper Lake (Bada Talab)",
    region: "Madhya Pradesh, Central India",
    lat: 23.2599,
    lng: 77.4126,
    tagline: "Golden hour sunset & lakeside breeze",
    icon: "🌅",
    ticketStub: "BHOPAL SHATABDI • COACH B2",
    photoUrl: "/media/diary/travel/bhopal-lake.png",
    stopNumber: 1,
    attractions: ["Bada Talab / VIP Road", "Van Vihar National Park", "Boat Club Promenade"],
    notes:
      "Golden light ripples across calm waters as evening breezes cool the lakeside promenade.",
    itemMatchId: "travel-bhopal-sunset",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=23.2599,77.4126",
    famousStateElements: [
      { name: "Upper Lake (Bada Talab)", emoji: "🌊" },
      { name: "Van Vihar Wildlife Safari", emoji: "🐅" },
      { name: "Taj-ul-Masajid Grand Minarets", emoji: "🕌" },
      { name: "Evening Chai at VIP Road", emoji: "☕" },
    ],
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
    stopNumber: 2,
    attractions: [
      "Dhoopgarh Highest Peak (1,352m)",
      "Bee Falls & Fairy Pool",
      "Chauragarh Mountain Shrine",
    ],
    notes:
      "1,300+ stone steps up to Chauragarh peak, crystal waterfalls, and cool pine-scented breezes.",
    itemMatchId: "travel-misty-mountains",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=22.4674,78.4346",
    famousStateElements: [
      { name: "Bee Falls & Waterfall Pool", emoji: "💧" },
      { name: "Dhoopgarh Highest Satpura Peak", emoji: "🌄" },
      { name: "Queen of Satpura Hill Trails", emoji: "🌲" },
      { name: "Chauragarh Mountain Shrine", emoji: "🛕" },
    ],
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
    stopNumber: 3,
    attractions: [
      "Meenakshi Amman Gopurams",
      "Nilgiri Mountain Railway",
      "Dravidian Stone Sculptures",
    ],
    notes:
      "Intricate multi-tier gopuram stone carvings rising majestically against mist-covered green hills.",
    itemMatchId: "travel-tamil-nadu",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=9.9195,78.1193",
    famousStateElements: [
      { name: "Meenakshi Amman Golden Gopuram", emoji: "🛕" },
      { name: "Nilgiri Mountain Toy Train", emoji: "🚂" },
      { name: "Steaming Hot Filter Kaapi", emoji: "☕" },
      { name: "Dravidian Stone Architecture", emoji: "🏛️" },
    ],
  },
];

// Scenic curved road waypoints connecting the travel expedition
export const SCENIC_ROUTE_WAYPOINTS: [number, number][] = [
  // Leg 1: Bhopal to Pachmarhi
  [23.2599, 77.4126], // Bhopal
  [23.05, 77.62], // Bhojpur
  [22.75, 77.72], // Hoshangabad / Narmada
  [22.61, 78.35], // Pipariya
  [22.4674, 78.4346], // Pachmarhi

  // Leg 2: Pachmarhi to Tamil Nadu
  [22.05, 78.93], // Chhindwara
  [21.1458, 79.0882], // Nagpur
  [19.66, 78.53], // Adilabad
  [18.67, 78.1], // Nizamabad
  [17.385, 78.4867], // Hyderabad
  [15.82, 78.03], // Kurnool
  [14.68, 77.6], // Anantapur
  [12.9716, 77.5946], // Bengaluru
  [11.6643, 78.146], // Salem
  [10.36, 77.98], // Dindigul
  [9.9195, 78.1193], // Tamil Nadu (Madurai)

  // Leg 3: Return loop to Bhopal
  [10.79, 78.7], // Tiruchirappalli
  [13.08, 80.27], // Coastal Route
  [16.5, 80.64], // Vijayawada
  [17.97, 79.59], // Warangal
  [21.8, 79.5], // Seoni / Pench
  [23.2599, 77.4126], // Return to Bhopal
];

export function TravelRouteMap({
  isNightMode = false,
  onSelectItem,
  travelItems = [],
}: TravelRouteMapProps) {
  const [activeDestId, setActiveDestId] = useState<string>("bhopal");
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);
  const [isAutoDriving, setIsAutoDriving] = useState<boolean>(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routePolylineRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeGlowPolylineRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);

  const activeDest = useMemo(
    () => REAL_DESTINATIONS.find((d) => d.id === activeDestId) || REAL_DESTINATIONS[0],
    [activeDestId],
  );

  // Auto-drive simulation across Bhopal -> Pachmarhi -> Tamil Nadu
  useEffect(() => {
    if (!isAutoDriving) return;
    const destIds = ["bhopal", "pachmarhi", "tamilnadu"];

    const timer = setInterval(() => {
      setActiveDestId((curr) => {
        const nextIdx = (destIds.indexOf(curr) + 1) % destIds.length;
        return destIds[nextIdx];
      });
    }, 4800);

    return () => clearInterval(timer);
  }, [isAutoDriving]);

  // Dynamic client-side Leaflet loader
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

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
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
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

        const tileUrl = isNightMode
          ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        L.tileLayer(tileUrl, {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Add Outer Glow Polyline for curved route
        const glowLine = L.polyline(SCENIC_ROUTE_WAYPOINTS, {
          color: isNightMode ? "#38bdf8" : "#fb7185",
          weight: 8,
          opacity: 0.35,
          smoothFactor: 1.5,
        }).addTo(map);
        routeGlowPolylineRef.current = glowLine;

        // Add Styled Dashed Road Polyline
        const roadLine = L.polyline(SCENIC_ROUTE_WAYPOINTS, {
          color: isNightMode ? "#06b6d4" : "#e11d48",
          weight: 4,
          dashArray: "8, 12",
          opacity: 0.85,
          smoothFactor: 1.5,
        }).addTo(map);
        routePolylineRef.current = roadLine;

        // Add markers for all real destinations with mini Polaroid thumbnails
        REAL_DESTINATIONS.forEach((dest) => {
          const markerHtml = `
            <div style="cursor: pointer; text-align: center; transform: translate(-50%, -50%); transition: all 0.3s ease;">
              <div style="background: ${isNightMode ? "#0f172a" : "#ffffff"}; color: ${isNightMode ? "#38bdf8" : "#0f172a"}; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 10px; box-shadow: 0 4px 14px rgba(0,0,0,0.3); border: 2px solid ${isNightMode ? "#38bdf8" : "#f43f5e"}; display: inline-flex; align-items: center; gap: 4px;">
                <span style="font-size: 13px;">${dest.icon}</span>
                <span style="font-family: serif;">${dest.name.split("·")[0].trim()}</span>
              </div>
              <div style="width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid ${isNightMode ? "#38bdf8" : "#f43f5e"}; margin: 0 auto;"></div>
            </div>
          `;

          const customIcon = L.divIcon({
            html: markerHtml,
            className: "leaflet-custom-marker",
            iconSize: [120, 36],
            iconAnchor: [60, 32],
          });

          const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);
          marker.on("click", () => {
            setActiveDestId(dest.id);
            map.flyTo([dest.lat, dest.lng], 7, { duration: 1.2 });
          });
        });

        // Add the Cute Road-Trip Car Marker with Girl Driver
        const carIconHtml = `
          <div style="cursor: pointer; transform: translate(-50%, -50%); filter: drop-shadow(0 8px 16px rgba(244,63,94,0.45));">
            <div style="background: linear-gradient(135deg, #f43f5e, #db2777); color: white; border-radius: 9999px; padding: 4px 10px; border: 2px solid #fff; font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 4px 14px rgba(244,63,94,0.6);">
              <span style="font-size: 14px;">🚗</span>
              <span style="font-family: sans-serif; letter-spacing: 0.5px;">Palak 🌸</span>
              <span style="font-size: 11px;">💨</span>
            </div>
          </div>
        `;
        const carIcon = L.divIcon({
          html: carIconHtml,
          className: "leaflet-car-marker",
          iconSize: [110, 32],
          iconAnchor: [55, 16],
        });

        const carMarker = L.marker([activeDest.lat, activeDest.lng], { icon: carIcon }).addTo(map);
        carMarkerRef.current = carMarker;

        mapInstanceRef.current = map;
      } catch (err) {
        console.warn("Leaflet initialization warning:", err);
      }
    } else {
      // Smooth movement along route
      try {
        mapInstanceRef.current.flyTo([activeDest.lat, activeDest.lng], 7, {
          duration: 1.4,
        });

        if (carMarkerRef.current) {
          const startLatLng = carMarkerRef.current.getLatLng();
          const targetLat = activeDest.lat;
          const targetLng = activeDest.lng;

          let progress = 0;
          const duration = 1200; // 1.2s smooth drive
          const startTime = performance.now();

          const animateStep = (now: number) => {
            progress = Math.min((now - startTime) / duration, 1);
            // Ease in out quad
            const ease =
              progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            const currLat = startLatLng.lat + (targetLat - startLatLng.lat) * ease;
            const currLng = startLatLng.lng + (targetLng - startLatLng.lng) * ease;

            if (carMarkerRef.current) {
              carMarkerRef.current.setLatLng([currLat, currLng]);
            }

            if (progress < 1) {
              animFrameRef.current = requestAnimationFrame(animateStep);
            }
          };

          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
          }
          animFrameRef.current = requestAnimationFrame(animateStep);
        }
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

  const handleOpenPhoto = (dest?: RealDestination) => {
    const targetDest = dest || activeDest;
    let matchedItem = travelItems.find(
      (i) =>
        i.id === targetDest.itemMatchId ||
        i.title.toLowerCase().includes(targetDest.id) ||
        i.location?.toLowerCase().includes(targetDest.id),
    );

    if (!matchedItem) {
      matchedItem = {
        id: targetDest.itemMatchId,
        title: targetDest.name,
        caption: targetDest.tagline,
        description: targetDest.notes,
        location: targetDest.region,
        date: "Travel Postcard",
        category: "travel",
        mediaType: "image",
        mediaUrl: targetDest.photoUrl,
        image: targetDest.photoUrl,
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: [targetDest.id, "RealDestination", "Scrapbook"],
        sortOrder: targetDest.stopNumber,
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
      {/* TOP CONTROLS BAR: Destination Buttons & Road Trip Auto-Drive          */}
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

        {/* Road Trip Auto-Drive & Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoDriving((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono font-bold transition shadow-md border ${
              isAutoDriving
                ? "bg-rose-500 text-white border-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                : isNightMode
                  ? "bg-indigo-950/80 text-cyan-200 border-cyan-500/40 hover:bg-indigo-900"
                  : "bg-amber-100 text-stone-900 border-amber-300 hover:bg-amber-200"
            }`}
          >
            {isAutoDriving ? (
              <>
                <Pause className="h-3 w-3 fill-current" />
                <span>Driving... 🚗💨</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-current" />
                <span>🚗 Start Road Trip</span>
              </>
            )}
          </button>

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
      {/* 2-COLUMN SPREAD: Interactive Map (Left) + Destination Spotlight (Right) */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: 3D Aesthetic Map Container */}
        <div className="lg:col-span-7 flex flex-col relative">
          <div
            className={`relative min-h-[380px] sm:min-h-[440px] w-full flex-1 rounded-3xl overflow-hidden border-4 shadow-2xl transition duration-500 ${
              isNightMode
                ? "border-cyan-500/50 shadow-[0_15px_40px_rgba(6,182,212,0.25)]"
                : "border-amber-300/90 shadow-[0_15px_40px_rgba(20,184,166,0.2)]"
            }`}
          >
            {/* Washi Tape Corner Accents */}
            <div className="diary-washi-tape absolute -top-3 left-10 w-24 h-5 z-30 rotate-1 shadow-sm pointer-events-none" />
            <div className="diary-washi-tape absolute -top-3 right-10 w-24 h-5 z-30 -rotate-2 shadow-sm pointer-events-none" />

            {/* Brass Filigree Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl z-30 pointer-events-none shadow-xs" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl z-30 pointer-events-none shadow-xs" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl z-30 pointer-events-none shadow-xs" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-2xl z-30 pointer-events-none shadow-xs" />

            {/* Leaflet Map Canvas */}
            <div ref={mapContainerRef} className="absolute inset-0 h-full w-full z-10" />

            {/* Offline Fallback Vector Map Canvas */}
            {!leafletLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-teal-900/10 backdrop-blur z-0">
                <Compass className="h-10 w-10 text-teal-500 animate-spin-slow mb-2" />
                <p className="font-serif font-bold text-sm">Loading Scenic Route Canvas…</p>
                <p className="text-xs font-mono opacity-70">
                  {activeDest.name} · [{activeDest.lat}°N, {activeDest.lng}°E]
                </p>
              </div>
            )}

            {/* POPUP BUBBLE: Shows iconic highlights of the active stop */}
            <div className="absolute top-4 left-4 z-20 max-w-[280px] sm:max-w-xs rounded-2xl bg-black/85 p-3 text-white backdrop-blur-md border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top duration-300">
              <div className="flex items-center gap-1.5 mb-1.5 border-b border-white/15 pb-1">
                <span className="text-base">{activeDest.icon}</span>
                <span className="font-serif text-xs font-bold text-amber-300 truncate">
                  {activeDest.name.split("·")[0].trim()}
                </span>
                <span className="ml-auto rounded-full bg-emerald-500/80 px-2 py-0.2 text-[9px] font-mono text-white">
                  Stop #{activeDest.stopNumber}
                </span>
              </div>

              <div className="text-[10px] font-serif uppercase tracking-wider text-cyan-300 font-bold mb-1">
                ✨ Iconic Landmarks:
              </div>
              <div className="grid grid-cols-1 gap-1 text-[11px] font-mono leading-tight">
                {activeDest.famousStateElements.map((el, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-200">
                    <span>{el.emoji}</span>
                    <span className="truncate">{el.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coordinates Overlay Pill */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                {activeDest.lat.toFixed(4)}° N, {activeDest.lng.toFixed(4)}° E
              </span>
            </div>

            {/* Live Route Verification Badge */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[9px] font-mono text-white/80 backdrop-blur">
              <Layers className="h-2.5 w-2.5" />
              <span>Scenic Route · Madhya Pradesh ➔ Tamil Nadu</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Destination Card + Cute Girl in Vintage Car */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div
            className={`popup-3d-element relative rounded-3xl border-2 p-5 shadow-2xl transition-all duration-300 ${
              isNightMode
                ? "border-cyan-400/50 bg-[#091124]/95 text-slate-100"
                : "border-teal-300/80 bg-[#fffdf9] text-stone-900"
            }`}
          >
            {/* Top Bar with Cute Animated Girl Driving Vintage Car SVG */}
            <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-teal-500/20">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-extrabold tracking-[0.28em] uppercase text-teal-600 dark:text-cyan-300 animate-pulse">
                  ✈ TRAVEL DIARIES
                </span>
              </div>

              {/* Cute Animated Car with Girl Inside SVG */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 dark:text-pink-300">
                <div className="relative inline-flex items-center justify-center">
                  <svg
                    viewBox="0 0 110 56"
                    className="w-20 h-10 filter drop-shadow-md overflow-visible"
                  >
                    {/* Wind lines & exhaust puffs */}
                    <circle cx="6" cy="42" r="2" fill="#fb7185" className="animate-ping" />
                    <text x="2" y="32" fontSize="9" className="animate-bounce">
                      💨
                    </text>
                    <text x="12" y="18" fontSize="8" className="animate-pulse">
                      💖
                    </text>

                    {/* Windshield */}
                    <path
                      d="M38 30 L48 14 L72 14 L82 30 Z"
                      fill="#e0f2fe"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      opacity="0.95"
                    />

                    {/* Girl inside */}
                    <path d="M52 18 C46 16 40 20 38 25 C44 24 50 27 54 27 Z" fill="#451a03" />
                    <circle cx="58" cy="20" r="7" fill="#fed7aa" />
                    <path d="M53 14 C56 11 63 12 65 16 C63 15 59 15 55 17 Z" fill="#451a03" />
                    {/* Cute sunglasses */}
                    <rect x="58" y="18" width="4" height="3" rx="0.8" fill="#0f172a" />
                    <rect x="63" y="18" width="3.5" height="3" rx="0.8" fill="#0f172a" />
                    <path d="M62 19 L63 19" stroke="#0f172a" strokeWidth="0.8" />
                    {/* Smile & Cheek */}
                    <path d="M59 23 Q61 25 63 23" fill="none" stroke="#e11d48" strokeWidth="0.8" />
                    <circle cx="58" cy="22" r="1.2" fill="#fda4af" />
                    {/* Waving Arm */}
                    <path
                      d="M52 28 Q48 24 45 22"
                      stroke="#fed7aa"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="44" cy="21" r="1.8" fill="#fed7aa" />

                    {/* Vintage Roadster Pink Body */}
                    <path
                      d="M16 34 C16 30 20 28 26 28 L88 28 C94 28 98 32 98 36 L98 44 C98 46 96 48 94 48 L18 48 C16 48 16 46 16 44 Z"
                      fill="#fb7185"
                      stroke="#e11d48"
                      strokeWidth="1.8"
                    />
                    {/* Chrome side trim */}
                    <path
                      d="M20 38 L94 38"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Headlight with warm glow */}
                    <ellipse
                      cx="96"
                      cy="35"
                      rx="2.5"
                      ry="3.5"
                      fill="#fef08a"
                      stroke="#ca8a04"
                      strokeWidth="1.2"
                    />
                    <path d="M99 33 L107 30 L107 40 L99 37 Z" fill="#fef08a" opacity="0.4" />

                    {/* Wheels */}
                    <g className="animate-spin-slow origin-[32px_46px]">
                      <circle
                        cx="32"
                        cy="46"
                        r="8"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />
                      <circle cx="32" cy="46" r="3" fill="#f8fafc" />
                    </g>
                    <g className="animate-spin-slow origin-[82px_46px]">
                      <circle
                        cx="82"
                        cy="46"
                        r="8"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />
                      <circle cx="82" cy="46" r="3" fill="#f8fafc" />
                    </g>
                  </svg>
                </div>
                <span className="text-[10px] font-mono font-bold">Palak Driving 🌸</span>
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
              onClick={() => handleOpenPhoto(activeDest)}
              className="group relative mt-3 aspect-[16/10] overflow-hidden rounded-2xl border-4 border-white dark:border-stone-800 shadow-md cursor-pointer transition hover:scale-[1.02]"
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

            {/* State's Iconic Highlights Grid */}
            <div className="mt-3 rounded-xl bg-teal-500/10 p-2.5 border border-teal-500/20">
              <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-teal-700 dark:text-cyan-300">
                ⭐ Famous State Highlights:
              </span>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {activeDest.famousStateElements.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 text-xs font-serif text-stone-700 dark:text-stone-300 bg-white/60 dark:bg-stone-900/60 px-2 py-1 rounded-md border border-black/5"
                  >
                    <span>{el.emoji}</span>
                    <span className="truncate">{el.name}</span>
                  </div>
                ))}
              </div>
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

      {/* ===================================================================== */}
      {/* 3. PINNED POLAROID MEMORY CARDS ALONG THE ROUTE (Tilting & Interactive) */}
      {/* ===================================================================== */}
      <div className="mt-8 border-t-2 border-dashed border-teal-500/30 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📌</span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                Pinned Route Memories & Stops
              </h3>
              <p className="font-handwriting text-xs text-muted-foreground">
                Hover or click any Polaroid to drive Palak's car there & inspect photo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-teal-700 dark:text-cyan-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
            <Sparkles className="h-3 w-3 text-amber-500 animate-spin-slow" />
            <span>Interactive Road Stops (3D Pinned)</span>
          </div>
        </div>

        {/* 3 Pinned Polaroid Cards: Bhopal, Pachmarhi, Tamil Nadu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REAL_DESTINATIONS.map((dest, idx) => {
            const isCarAtThisStop = activeDest.id === dest.id;
            const isHovered = hoveredCardId === dest.id;

            // Tilts: Stop 1 = -2deg, Stop 2 = 2deg, Stop 3 = -2.5deg
            const defaultRotations = ["-2deg", "2deg", "-2.5deg"];
            const baseRotation = defaultRotations[idx % defaultRotations.length];

            return (
              <div
                key={dest.id}
                onMouseEnter={() => setHoveredCardId(dest.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => {
                  setActiveDestId(dest.id);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo([dest.lat, dest.lng], 7, { duration: 1.2 });
                  }
                }}
                style={{
                  transform: isCarAtThisStop
                    ? `translateY(-10px) scale(1.03) rotate(${isHovered ? "0deg" : baseRotation})`
                    : isHovered
                      ? `translateY(-6px) scale(1.02) rotate(0deg)`
                      : `rotate(${baseRotation})`,
                }}
                className={`group relative cursor-pointer rounded-2xl p-3 pb-4 transition-all duration-300 border-2 ${
                  isCarAtThisStop
                    ? isNightMode
                      ? "bg-[#0b172e] border-cyan-400 shadow-[0_20px_40px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400/60"
                      : "bg-[#fffdf9] border-amber-400 shadow-[0_20px_40px_rgba(245,158,11,0.3)] ring-2 ring-amber-400/70"
                    : isNightMode
                      ? "bg-[#091124] border-cyan-800/40 text-slate-200 hover:border-cyan-500 hover:shadow-xl"
                      : "bg-white border-stone-200 text-stone-800 hover:border-teal-400 hover:shadow-xl"
                }`}
              >
                {/* Washi Tape Accent at Top Center */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4.5 rounded-xs border-x shadow-xs z-20 pointer-events-none ${
                    idx === 0
                      ? "bg-amber-200/90 border-amber-400 rotate-1"
                      : idx === 1
                        ? "bg-rose-200/90 border-rose-400 -rotate-2"
                        : "bg-teal-200/90 border-teal-400 rotate-2"
                  }`}
                />

                {/* Corner Pushpin Element */}
                <div className="absolute top-2 right-2 text-xs opacity-75 z-20">📌</div>

                {/* Polaroid Photo Frame */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPhoto(dest);
                  }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-inner group/photo"
                >
                  <img
                    src={dest.photoUrl}
                    alt={dest.name}
                    className="h-full w-full object-cover transition duration-300 group-hover/photo:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/photo:opacity-100 transition flex items-center justify-center text-white">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-serif backdrop-blur">
                      <ZoomIn className="h-3.5 w-3.5" /> Inspect
                    </span>
                  </div>

                  {/* Active Car Arrived Badge */}
                  {isCarAtThisStop && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-rose-500/95 text-white px-2.5 py-0.5 text-[10px] font-mono font-bold shadow-md animate-pulse">
                      <span>🚗 Palak Here! 🌸</span>
                    </div>
                  )}
                </div>

                {/* Polaroid Caption & Details */}
                <div className="mt-3">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                      Stop #{dest.stopNumber} · {dest.icon}
                    </span>
                    <span className="text-[10px] font-mono opacity-70">
                      {dest.lat.toFixed(2)}°N
                    </span>
                  </div>

                  <h4 className="font-serif text-sm sm:text-base font-bold mt-0.5 truncate group-hover:text-teal-600 transition">
                    {dest.name.split("·")[0].trim()}
                  </h4>

                  <p className="font-handwriting text-xs text-stone-600 dark:text-stone-300 font-semibold line-clamp-2 mt-1">
                    "{dest.notes}"
                  </p>

                  {/* Iconic Highlights Chips */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {dest.famousStateElements.slice(0, 2).map((el, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800/80 px-1.5 py-0.5 text-[10px] font-mono text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700/50"
                      >
                        <span>{el.emoji}</span>
                        <span className="truncate max-w-[90px]">{el.name}</span>
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="mt-3 pt-2 border-t border-dashed border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-muted-foreground truncate">
                      {dest.region.split(",")[0]}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPhoto(dest);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-serif font-bold text-teal-700 dark:text-cyan-300 hover:underline"
                    >
                      <Eye className="h-3 w-3" /> View Memory
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TravelRouteMap;
