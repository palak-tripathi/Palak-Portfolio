import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Compass,
  Camera,
  Heart,
  ZoomIn,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import travelData from "@/data/travel.json";
import creditsData from "@/data/credits.json";
import { PhotoLightbox, type LightboxPhoto } from "@/components/scrapbook/PhotoLightbox";
import { StickerCutout } from "@/components/scrapbook/StickerCutout";
import { FillerDecor } from "@/components/scrapbook/FillerDecor";

export const Route = createFileRoute("/travel")({
  head: () => ({
    meta: [
      { title: "Palak's Travel Scrapbook & Wandering Diaries" },
      {
        name: "description",
        content: "Candid memories, road trips, mountain trails, temple bells, and serene skies.",
      },
    ],
  }),
  component: TravelPage,
});

function TravelPage() {
  const [activeChapter, setActiveChapter] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Flatten all photos for continuous lightbox browsing
  const allPhotos: LightboxPhoto[] = useMemo(() => {
    const list: LightboxPhoto[] = [];
    travelData.chapters.forEach((ch) => {
      ch.photos.forEach((p) => {
        list.push({
          id: p.id,
          title: p.title,
          caption: p.caption,
          image: p.image,
          location: p.location,
          date: p.date,
          tag: p.tag,
        });
      });
    });
    return list;
  }, []);

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    if (activeChapter === "all") return travelData.chapters;
    return travelData.chapters.filter((c) => c.id === activeChapter);
  }, [activeChapter]);

  const openLightbox = (photoId: string) => {
    const idx = allPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setActivePhotoIndex(idx);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5eb] text-[#2c2416] selection:bg-amber-200 selection:text-amber-900 font-sans">
      {/* Vintage Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf5eb]/90 border-b border-amber-900/10 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-900/20 bg-amber-50 px-4 py-1.5 text-xs sm:text-sm font-medium text-amber-950 transition hover:bg-amber-100 hover:-translate-x-0.5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>

          <div className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold tracking-wide text-amber-950">
            <Compass className="h-5 w-5 text-amber-700" />
            <span>Palak's Travel Scrapbook</span>
          </div>

          <a
            href="#credits"
            className="text-xs font-mono underline text-amber-800/80 hover:text-amber-950"
          >
            Photo Credits
          </a>
        </div>
      </header>

      {/* Hero Scrapbook Banner */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-8">
        {/* Background Vintage Airmail Stripes */}
        <div className="absolute top-0 inset-x-0 h-2 bg-[repeating-linear-gradient(45deg,#b91c1c_0,#b91c1c_15px,#faf5eb_15px,#faf5eb_30px,#1d4ed8_30px,#1d4ed8_45px,#faf5eb_45px,#faf5eb_60px)] opacity-70" />

        <div className="max-w-5xl mx-auto text-center relative z-10 mt-4">
          {/* Postmark stamp */}
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-amber-800/40 bg-amber-100/60 px-4 py-1 text-xs font-mono uppercase tracking-widest text-amber-900 mb-4 shadow-sm">
            <span>PASSPORT & FIELD JOURNAL</span>
            <span>•</span>
            <span>INDIA 2024</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-amber-950">
            Wandering Through Stills & Silence
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-amber-900/75 leading-relaxed font-serif">
            Candid travel logs, misty hill climbs in Pachmarhi, temple towers in Tamil Nadu, quiet
            cloudscapes, and waterfalls caught on camera.
          </p>

          {/* Floating Stickers around header */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <StickerCutout
              src="/assets/stickers/vintage-camera.svg"
              alt="Vintage Camera"
              size={56}
              rotate="-12deg"
            />
            <StickerCutout
              src="/assets/stickers/filter-coffee.svg"
              alt="Filter Coffee"
              size={52}
              rotate="8deg"
            />
            <StickerCutout
              src="/assets/stickers/dosa.svg"
              alt="Dosa Sticker"
              size={58}
              rotate="-5deg"
            />
            <StickerCutout
              src="/assets/stickers/glowing-moon.svg"
              alt="Glowing Moon"
              size={54}
              rotate="15deg"
            />
          </div>
        </div>
      </section>

      {/* Sticky Chapter Filter Tabs */}
      <div className="sticky top-[57px] z-30 bg-[#faf5eb]/95 backdrop-blur-sm border-y border-amber-900/10 py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveChapter("all")}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
              activeChapter === "all"
                ? "bg-amber-900 text-amber-50 shadow-sm"
                : "bg-amber-100/70 text-amber-900 hover:bg-amber-200/80"
            }`}
          >
            All Memories ({allPhotos.length})
          </button>
          {travelData.chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                activeChapter === ch.id
                  ? "bg-amber-900 text-amber-50 shadow-sm"
                  : "bg-amber-100/70 text-amber-900 hover:bg-amber-200/80"
              }`}
            >
              {ch.name} ({ch.photos.length})
            </button>
          ))}
        </div>
      </div>

      {/* Main Chapters Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
        {filteredChapters.map((chapter) => (
          <section key={chapter.id} className="relative">
            {/* Chapter Header Card with Vintage Stamp */}
            <div className="rounded-3xl bg-amber-50/80 border border-amber-900/15 p-6 sm:p-8 shadow-sm relative overflow-hidden mb-8">
              {/* Decorative Washi Tape */}
              <div className="absolute top-0 left-12 h-4 w-28 bg-amber-200/60 -rotate-2 border-x border-amber-300 shadow-sm" />
              <div className="absolute top-0 right-16 h-4 w-24 bg-rose-200/60 rotate-3 border-x border-rose-300 shadow-sm" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    <span>{chapter.location}</span>
                    <span>•</span>
                    <span>{chapter.badge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 mt-1">
                    {chapter.name}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-amber-900/80 max-w-3xl leading-relaxed italic font-serif">
                    "{chapter.narrative}"
                  </p>
                </div>

                {/* Vintage Postal Cachet */}
                <div className="shrink-0 rounded-2xl border-2 border-dashed border-amber-800/30 p-3 text-center font-mono text-[11px] text-amber-900/80 rotate-2 bg-amber-100/50">
                  <div className="font-bold">{chapter.stampText}</div>
                  <div className="text-[9px] text-amber-700/70 mt-0.5">AUTHENTIC LOG ENTRY</div>
                </div>
              </div>
            </div>

            {/* Photos Collage Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {chapter.photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo.id)}
                  style={{ transform: `rotate(${photo.rotation || "0deg"})` }}
                  className="group relative cursor-pointer rounded-2xl bg-white p-3 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20 border border-stone-200"
                >
                  {/* Washi Tape Strip at top of Polaroid */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-16 bg-amber-200/70 border-x border-amber-300 shadow-xs" />

                  {/* Photo Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Quick zoom badge on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900 shadow-md">
                        <ZoomIn className="h-3.5 w-3.5" /> Inspect Detail
                      </span>
                    </div>

                    {/* Tag badge */}
                    {photo.tag && (
                      <span className="absolute bottom-2 left-2 rounded-md bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium text-white">
                        {photo.tag}
                      </span>
                    )}
                  </div>

                  {/* Polaroid Caption Footer */}
                  <div className="mt-3 px-1">
                    <h3 className="font-serif font-bold text-sm text-stone-800 line-clamp-1">
                      {photo.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-600" />
                        {photo.location}
                      </span>
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reusable filler decor between chapters */}
            <FillerDecor theme="travel" className="mt-8" />
          </section>
        ))}

        {/* PHOTO CREDITS & LICENSING SECTION */}
        <section
          id="credits"
          className="rounded-3xl bg-amber-50 border border-amber-900/15 p-6 sm:p-10 shadow-sm mt-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Open Creative Commons & Unsplash Attribution</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-amber-950 mt-1">
                Photo Credits & Licensing Directory
              </h2>
              <p className="mt-1 text-sm text-amber-900/75">
                {creditsData.licenseNotice} ({creditsData.totalPhotos} curated photographs)
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 self-start rounded-full bg-amber-900 px-4 py-2 text-xs font-medium text-amber-50 transition hover:bg-amber-950"
            >
              Return Home
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {creditsData.credits.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-amber-900/10 bg-white/70 p-3 flex flex-col justify-between"
              >
                <div>
                  <div className="font-semibold text-amber-950">{item.title}</div>
                  <div className="text-amber-800/80 mt-0.5">
                    Photo by <b className="text-amber-900">{item.photographer}</b>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-amber-700 font-mono">
                  <span>{item.license}</span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline hover:text-amber-950"
                  >
                    Source <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={allPhotos}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActivePhotoIndex}
      />
    </div>
  );
}
