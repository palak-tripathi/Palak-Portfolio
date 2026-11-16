import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  RotateCcw,
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
  // Position percentage on the 3D isometric diorama canvas (x: 0-100, y: 0-100)
  canvasCoords: { x: number; y: number };
  // Target distance progress along curved path (0 to 1)
  pathProgress: number;
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
    canvasCoords: { x: 23, y: 24 },
    pathProgress: 0.04,
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
    canvasCoords: { x: 50, y: 48 },
    pathProgress: 0.38,
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
    canvasCoords: { x: 77, y: 76 },
    pathProgress: 0.72,
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

// OpenStreetMap GPS scenic route waypoints for Leaflet view
export const SCENIC_ROUTE_WAYPOINTS: [number, number][] = [
  [23.2599, 77.4126], // Bhopal
  [23.05, 77.62], // Bhojpur
  [22.75, 77.72], // Hoshangabad / Narmada
  [22.61, 78.35], // Pipariya
  [22.4674, 78.4346], // Pachmarhi
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
];

// Beautiful curved highway SVG path traversing the 3D diorama canvas (viewBox 800 x 480)
const SVG_ROUTE_PATH_D = `
  M 184 115
  C 260 115, 300 170, 350 200
  S 380 230, 400 230
  C 440 230, 470 270, 520 300
  S 580 340, 616 365
  C 640 380, 660 380, 670 350
  C 685 300, 610 220, 530 160
  C 450 100, 300 70, 184 115
  Z
`;

export function TravelRouteMap({
  isNightMode = false,
  onSelectItem,
  travelItems = [],
}: TravelRouteMapProps) {
  const [activeDestId, setActiveDestId] = useState<string>("bhopal");
  const [mapMode, setMapMode] = useState<"3d" | "gps">("3d");
  const [mapZoom, setMapZoom] = useState<number>(6);
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);
  const [isAutoDriving, setIsAutoDriving] = useState<boolean>(true);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Car animation state on 3D Diorama path
  const [carProgress, setCarProgress] = useState<number>(0.04);
  const [carCoords, setCarCoords] = useState<{ x: number; y: number; angle: number }>({
    x: 184,
    y: 115,
    angle: 25,
  });

  const svgPathRef = useRef<SVGPathElement>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const targetProgressRef = useRef<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carMarkerRef = useRef<any>(null);

  const activeDest = useMemo(
    () => REAL_DESTINATIONS.find((d) => d.id === activeDestId) || REAL_DESTINATIONS[0],
    [activeDestId],
  );

  // Compute position and angle along SVG road path
  const updateCarOnPath = useCallback((progress: number) => {
    const path = svgPathRef.current;
    if (!path) return;
    try {
      const pathLength = path.getTotalLength();
      if (pathLength <= 0) return;

      const normProgress = ((progress % 1) + 1) % 1;
      const currentDistance = normProgress * pathLength;
      const point = path.getPointAtLength(currentDistance);

      // Look slightly ahead to calculate tangent angle
      const forwardDistance = (((currentDistance + 3) % pathLength) + pathLength) % pathLength;
      const nextPoint = path.getPointAtLength(forwardDistance);

      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      setCarCoords({
        x: point.x,
        y: point.y,
        angle: angleDeg,
      });
      setCarProgress(normProgress);
    } catch {
      // ignore path calculation error during render
    }
  }, []);

  // 60fps Smooth animation loop for car ride
  useEffect(() => {
    let lastTime = performance.now();

    const animateLoop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (targetProgressRef.current !== null) {
        // Driving towards specific destination stop
        const target = targetProgressRef.current;
        setCarProgress((prev) => {
          let diff = target - prev;
          if (diff > 0.5) diff -= 1;
          if (diff < -0.5) diff += 1;

          if (Math.abs(diff) < 0.003) {
            targetProgressRef.current = null;
            updateCarOnPath(target);
            return target;
          }

          const step = Math.sign(diff) * Math.min(Math.abs(diff), dt * 0.35);
          const next = prev + step;
          updateCarOnPath(next);
          return next;
        });
      } else if (isAutoDriving) {
        // Continuous scenic cruise along the loop
        setCarProgress((prev) => {
          const next = (prev + dt * 0.045) % 1;
          updateCarOnPath(next);

          // Check if car reached any destination stop to trigger popup highlight
          REAL_DESTINATIONS.forEach((d) => {
            if (Math.abs(next - d.pathProgress) < 0.035) {
              if (activeDestId !== d.id) {
                setActiveDestId(d.id);
              }
            }
          });

          return next;
        });
      }

      animFrameIdRef.current = requestAnimationFrame(animateLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isAutoDriving, updateCarOnPath, activeDestId]);

  // Steer car directly to a destination when selected
  const handleDriveTo = (dest: RealDestination) => {
    setActiveDestId(dest.id);
    targetProgressRef.current = dest.pathProgress;

    if (mapMode === "gps" && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([dest.lat, dest.lng], 7, { duration: 1.2 });
    }
  };

  // Dynamic client-side Leaflet loader for GPS mode
  useEffect(() => {
    if (typeof window === "undefined" || mapMode !== "gps") return;

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
    document.body.appendChild(script);
  }, [mapMode]);

  // Initialize and update Leaflet Map in GPS mode
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;
    if (mapMode !== "gps" || !leafletLoaded || !L || !mapContainerRef.current) return;

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
        L.polyline(SCENIC_ROUTE_WAYPOINTS, {
          color: isNightMode ? "#38bdf8" : "#fb7185",
          weight: 8,
          opacity: 0.35,
          smoothFactor: 1.5,
        }).addTo(map);

        // Add Styled Dashed Road Polyline
        L.polyline(SCENIC_ROUTE_WAYPOINTS, {
          color: isNightMode ? "#06b6d4" : "#e11d48",
          weight: 4,
          dashArray: "8, 12",
          opacity: 0.85,
          smoothFactor: 1.5,
        }).addTo(map);

        // Add markers for all real destinations
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
            handleDriveTo(dest);
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
        console.warn("Leaflet warning:", err);
      }
    } else {
      try {
        mapInstanceRef.current.flyTo([activeDest.lat, activeDest.lng], 7, { duration: 1.2 });
        if (carMarkerRef.current) {
          carMarkerRef.current.setLatLng([activeDest.lat, activeDest.lng]);
        }
      } catch {
        // ignore
      }
    }
  }, [mapMode, leafletLoaded, activeDest, isNightMode, mapZoom]);

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
      {/* TOP CONTROLS BAR: Destination Stops, Auto Cruise & View Mode Toggle    */}
      {/* ===================================================================== */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        {/* Destination Quick Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {REAL_DESTINATIONS.map((dest) => {
            const isActive = activeDest.id === dest.id;
            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => handleDriveTo(dest)}
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
                {isActive && <span className="text-[10px] animate-pulse">🚗💨</span>}
              </button>
            );
          })}
        </div>

        {/* View Toggle & Cruise Control */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 3D Diorama vs Live GPS Mode Switcher */}
          <div className="flex items-center rounded-full p-0.5 border bg-muted/40 text-xs font-serif font-bold">
            <button
              type="button"
              onClick={() => setMapMode("3d")}
              className={`px-3 py-1 rounded-full transition flex items-center gap-1 ${
                mapMode === "3d"
                  ? "bg-brand text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>3D Diorama Map</span>
            </button>
            <button
              type="button"
              onClick={() => setMapMode("gps")}
              className={`px-3 py-1 rounded-full transition flex items-center gap-1 ${
                mapMode === "gps"
                  ? "bg-brand text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Navigation className="h-3 w-3" />
              <span>GPS Map</span>
            </button>
          </div>

          {/* Road Trip Auto-Cruise Toggle Button */}
          <button
            type="button"
            onClick={() => setIsAutoDriving((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-bold transition shadow-md border ${
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
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2-COLUMN SPREAD: 3D Animated Map (Left) + Destination Spotlight (Right)*/}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: 3D Map Canvas with Moving Girl Car Animation */}
        <div className="lg:col-span-7 flex flex-col relative">
          <div
            className={`relative min-h-[380px] sm:min-h-[460px] w-full flex-1 rounded-3xl overflow-hidden border-4 shadow-2xl transition duration-500 ${
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

            {/* MODE 1: 3D ILLUSTRATED PICTORIAL DIORAMA MAP */}
            {mapMode === "3d" ? (
              <div className="relative h-full w-full min-h-[440px] overflow-hidden bg-[#faf5eb] dark:bg-[#0c1322]">
                {/* 3D Illustrated Map Background Image */}
                <img
                  src="/media/diary/travel/3d-travel-route-map.jpg"
                  alt="3D Illustrated Travel Map of India Road Trip"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                />

                {/* Ambient Depth & Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                {/* SVG Overlay: Curved Road Highway & Moving Girl Car Animation */}
                <svg
                  viewBox="0 0 800 480"
                  className="absolute inset-0 h-full w-full z-10 pointer-events-none"
                >
                  <defs>
                    <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                    </linearGradient>
                    <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Highway Underlay Glow */}
                  <path
                    d={SVG_ROUTE_PATH_D}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.35"
                    filter="url(#roadGlow)"
                  />

                  {/* Asphalt Highway Body */}
                  <path
                    d={SVG_ROUTE_PATH_D}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />

                  {/* Yellow Center Road Dashes */}
                  <path
                    ref={svgPathRef}
                    d={SVG_ROUTE_PATH_D}
                    fill="none"
                    stroke="#fde047"
                    strokeWidth="2.5"
                    strokeDasharray="8 9"
                    strokeLinecap="round"
                    opacity="0.95"
                  />

                  {/* 3 Destination Milestones & Pins on the 3D Map */}
                  {REAL_DESTINATIONS.map((dest) => {
                    const isArrived = activeDest.id === dest.id;
                    const coords =
                      dest.id === "bhopal"
                        ? { x: 184, y: 115 }
                        : dest.id === "pachmarhi"
                          ? { x: 400, y: 230 }
                          : { x: 616, y: 365 };

                    return (
                      <g key={dest.id} transform={`translate(${coords.x}, ${coords.y})`}>
                        {/* Ripple Aura when active */}
                        {isArrived && (
                          <circle
                            cx="0"
                            cy="0"
                            r="22"
                            fill="none"
                            stroke="#f43f5e"
                            strokeWidth="2"
                            className="animate-ping"
                            opacity="0.75"
                          />
                        )}

                        {/* Milestone Flagpole & Pin */}
                        <circle
                          cx="0"
                          cy="0"
                          r="14"
                          fill={isArrived ? "#f43f5e" : "#0f766e"}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fontSize="11"
                          fill="#ffffff"
                          className="pointer-events-none"
                        >
                          {dest.icon}
                        </text>

                        {/* Milestone Pill Label */}
                        <g transform="translate(0, -22)">
                          <rect
                            x="-48"
                            y="-9"
                            width="96"
                            height="18"
                            rx="9"
                            fill="rgba(15, 23, 42, 0.88)"
                            stroke={isArrived ? "#f43f5e" : "#38bdf8"}
                            strokeWidth="1.2"
                          />
                          <text
                            x="0"
                            y="3.5"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="serif"
                          >
                            {dest.name.split("·")[0].trim()}
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* ======================================================= */}
                  {/* ANIMATED CAR WITH GIRL RIDING / DRIVING ALONG THE ROAD  */}
                  {/* ======================================================= */}
                  <g
                    transform={`translate(${carCoords.x}, ${carCoords.y}) rotate(${carCoords.angle})`}
                    style={{ transition: "none" }}
                  >
                    {/* Ground Shadow underneath the car */}
                    <ellipse cx="0" cy="12" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />

                    {/* Headlight beam illuminating the highway ahead */}
                    <polygon
                      points="24,-2 65,-12 65,16 24,6"
                      fill="url(#headlightBeam)"
                      opacity="0.7"
                    />

                    {/* Exhaust Smoke Puffs & Floating Hearts behind the car */}
                    <g transform="translate(-26, 4)">
                      <circle cx="0" cy="0" r="2.5" fill="#fbcfe8" className="animate-ping" />
                      <text x="-9" y="3" fontSize="9" className="animate-bounce">
                        💨
                      </text>
                      <text x="-3" y="-7" fontSize="8" className="animate-pulse">
                        💖
                      </text>
                    </g>

                    {/* Windshield with Sky Reflection */}
                    <path
                      d="M-4,-4 L4,-15 L18,-15 L22,-4 Z"
                      fill="#e0f2fe"
                      stroke="#38bdf8"
                      strokeWidth="1.2"
                      opacity="0.9"
                    />

                    {/* Cute Girl Driver (Palak) with fluttering hair & scarf */}
                    {/* Fluttering hair */}
                    <path d="M4,-10 C-4,-13 -8,-8 -10,-4 C-5,-5 2,-2 5,-2 Z" fill="#451a03" />
                    {/* Pink Scarf fluttering in breeze */}
                    <path
                      d="M-2,-3 Q-14,-9 -20,-5 Q-12,-1 0,-1 Z"
                      fill="#f43f5e"
                      className="animate-pulse"
                    />
                    {/* Head */}
                    <circle cx="8" cy="-10" r="5" fill="#fed7aa" />
                    {/* Bangs */}
                    <path d="M5,-14 C8,-17 13,-16 14,-12 C12,-13 9,-13 6,-11 Z" fill="#451a03" />
                    {/* Cute Retro Sunglasses */}
                    <rect x="8" y="-11" width="3" height="2.2" rx="0.5" fill="#0f172a" />
                    <rect x="12" y="-11" width="2.5" height="2.2" rx="0.5" fill="#0f172a" />
                    <path d="M11,-10 L12,-10" stroke="#0f172a" strokeWidth="0.5" />
                    {/* Smile */}
                    <path
                      d="M9,-7 Q10.5,-5.5 12,-7"
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="0.7"
                    />
                    <circle cx="7.5" cy="-7.5" r="0.9" fill="#fda4af" />
                    {/* Waving Arm */}
                    <path
                      d="M4,-2 Q1,-5 -2,-7"
                      stroke="#fed7aa"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="-2.5" cy="-7.5" r="1.3" fill="#fed7aa" />

                    {/* Vintage Pastel Roadster Body */}
                    <path
                      d="M-20,2 C-20,-1 -16,-3 -11,-3 L20,-3 C24,-3 27,0 27,4 L27,11 C27,13 25,14 23,14 L-18,14 C-20,14 -20,13 -20,11 Z"
                      fill="#fb7185"
                      stroke="#e11d48"
                      strokeWidth="1.4"
                    />
                    {/* Chrome Side Accent */}
                    <path d="M-18,5 L23,5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    {/* Shiny Headlight */}
                    <circle
                      cx="26"
                      cy="3"
                      r="2.5"
                      fill="#fef08a"
                      stroke="#ca8a04"
                      strokeWidth="0.8"
                    />

                    {/* Wheels with Whitewall Hubcaps */}
                    <g transform="translate(-12, 12)">
                      <circle
                        cx="0"
                        cy="0"
                        r="5"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="1.2"
                      />
                      <circle cx="0" cy="0" r="2" fill="#f8fafc" />
                    </g>
                    <g transform="translate(16, 12)">
                      <circle
                        cx="0"
                        cy="0"
                        r="5"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="1.2"
                      />
                      <circle cx="0" cy="0" r="2" fill="#f8fafc" />
                    </g>

                    {/* Floating Name Badge above the car */}
                    <g transform="translate(0, -24)">
                      <rect
                        x="-30"
                        y="-8"
                        width="60"
                        height="15"
                        rx="7.5"
                        fill="rgba(15,23,42,0.85)"
                        stroke="#fb7185"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="2.5"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        🚗 Palak 🌸
                      </text>
                    </g>
                  </g>
                </svg>

                {/* Compass Rose Accent */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 font-serif text-xs text-amber-300 backdrop-blur border border-amber-300/30">
                  <Compass className="h-4 w-4 animate-spin-slow text-amber-400" />
                  <span>3D Scenic Expedition</span>
                </div>

                {/* Weather & Scenic Driving Status Badge */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/80 px-3.5 py-1.5 font-mono text-xs text-white backdrop-blur border border-white/20 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>
                    🚗 Palak Cruising to{" "}
                    <b className="text-amber-300">{activeDest.name.split("·")[0].trim()}</b>
                  </span>
                </div>
              </div>
            ) : (
              /* MODE 2: LIVE OPENSTREETMAP GPS CANVAS */
              <div className="relative h-full w-full min-h-[440px]">
                <div ref={mapContainerRef} className="absolute inset-0 h-full w-full z-10" />

                {!leafletLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-teal-900/10 backdrop-blur z-0">
                    <Compass className="h-10 w-10 text-teal-500 animate-spin-slow mb-2" />
                    <p className="font-serif font-bold text-sm">
                      Loading Live OpenStreetMap Canvas…
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Destination Card + Live Travel Details */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div
            className={`popup-3d-element relative rounded-3xl border-2 p-5 shadow-2xl transition-all duration-300 ${
              isNightMode
                ? "border-cyan-400/50 bg-[#091124]/95 text-slate-100"
                : "border-teal-300/80 bg-[#fffdf9] text-stone-900"
            }`}
          >
            {/* Top Bar with Mini Animated Car Graphic */}
            <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-teal-500/20">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-extrabold tracking-[0.28em] uppercase text-teal-600 dark:text-cyan-300 animate-pulse">
                  ✈ TRAVEL DIARIES
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 dark:text-pink-300">
                <span className="text-base animate-bounce">🚗</span>
                <span className="text-[11px] font-mono font-bold">Palak On The Road 🌸</span>
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
                onClick={() => handleDriveTo(dest)}
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
