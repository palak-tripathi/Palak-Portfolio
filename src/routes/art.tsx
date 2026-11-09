import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Palette, Sparkles, ZoomIn, Brush, Feather, Info } from "lucide-react";
import artData from "@/data/art.json";
import { PhotoLightbox, type LightboxPhoto } from "@/components/scrapbook/PhotoLightbox";
import { StickerCutout } from "@/components/scrapbook/StickerCutout";
import { FillerDecor } from "@/components/scrapbook/FillerDecor";

export const Route = createFileRoute("/art")({
  head: () => ({
    meta: [
      { title: "Palak's Sketchbook & Art Corner" },
      {
        name: "description",
        content:
          "Colored pencil sketches, watercolor doodles, botanical studies and cozy illustrations.",
      },
    ],
  }),
  component: ArtPage,
});

function ArtPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeArtIndex, setActiveArtIndex] = useState(0);

  const lightboxPhotos: LightboxPhoto[] = artData.artworks.map((art) => ({
    id: art.id,
    title: art.title,
    caption: `${art.medium} · ${art.story}`,
    image: art.image,
    location: `Dimensions: ${art.dimensions}`,
    date: art.year,
    tag: art.category,
  }));

  const openArtwork = (index: number) => {
    setActiveArtIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#2d251e] selection:bg-rose-200 selection:text-rose-900 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fcf9f2]/90 border-b border-stone-200 px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-stone-800 transition hover:bg-stone-50 hover:-translate-x-0.5 shadow-xs"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>

          <div className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold tracking-wide text-stone-900">
            <Palette className="h-5 w-5 text-rose-500" />
            <span>Palak's Art Corner</span>
          </div>

          <Link
            to="/travel"
            className="text-xs font-serif underline text-stone-600 hover:text-stone-900"
          >
            Travel Journal →
          </Link>
        </div>
      </header>

      {/* Hero Sketchbook Header */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-4 py-1 text-xs font-mono uppercase tracking-widest text-rose-800 mb-4 shadow-xs">
            <Brush className="h-3.5 w-3.5 text-rose-600" />
            <span>ORIGINAL HANDMADE WORKS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-stone-900">
            The World is Quiet Between Pencil & Paper
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed font-serif">
            {artData.artistBio}
          </p>

          {/* Tools & Materials Tag Ribbon */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {artData.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-stone-200 bg-white/80 px-3.5 py-1 text-xs font-mono text-stone-700 shadow-xs"
              >
                ✦ {tool}
              </span>
            ))}
          </div>

          {/* Floating Stickers */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <StickerCutout
              src="/assets/stickers/butterfly.svg"
              alt="Butterfly"
              size={54}
              rotate="-8deg"
            />
            <StickerCutout
              src="/assets/stickers/glowing-moon.svg"
              alt="Moon"
              size={50}
              rotate="12deg"
            />
          </div>
        </div>
      </section>

      {/* Main Corkboard / Easel Exhibition */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {artData.artworks.map((art, idx) => (
            <div
              key={art.id}
              onClick={() => openArtwork(idx)}
              style={{ transform: `rotate(${art.rotation || "0deg"})` }}
              className="group relative cursor-pointer rounded-3xl bg-white p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-20 border border-stone-200 flex flex-col justify-between"
            >
              {/* Colored Washi Tape on top */}
              <div
                style={{ backgroundColor: art.tapeColor }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-24 border-x border-stone-300/40 shadow-xs opacity-90"
              />

              <div>
                {/* Artwork Canvas Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-inner">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Zoom Badge */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-stone-900 shadow-lg">
                      <ZoomIn className="h-4 w-4 text-rose-600" /> Zoom & Inspect Details
                    </span>
                  </div>

                  {/* Medium Badge */}
                  <span className="absolute bottom-3 left-3 rounded-md bg-stone-900/75 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-white">
                    {art.category}
                  </span>
                </div>

                {/* Details & Story */}
                <div className="mt-4">
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-rose-600 transition-colors">
                    {art.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 font-mono">
                    {art.medium} · {art.year}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-serif">
                    "{art.story}"
                  </p>

                  {/* Palette Swatches */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Palette:</span>
                    <div className="flex items-center gap-1.5">
                      {art.palette.map((hex) => (
                        <span
                          key={hex}
                          style={{ backgroundColor: hex }}
                          title={hex}
                          className="h-4 w-4 rounded-full border border-stone-300 shadow-xs transition hover:scale-125"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-mono">
                <span>{art.dimensions}</span>
                <span className="flex items-center gap-1 text-rose-600 font-serif italic">
                  <Sparkles className="h-3 w-3" /> Original Piece
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filler Scrapbook Decor */}
        <FillerDecor theme="art" className="my-8" />

        {/* Quotes Section */}
        <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xs">
          <Feather className="h-6 w-6 text-rose-500 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-xl text-stone-900">Words From the Studio</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 max-w-4xl mx-auto">
            {artData.sketchbookQuotes.map((q, i) => (
              <p
                key={i}
                className="rounded-2xl bg-stone-50 p-4 text-xs sm:text-sm italic font-serif text-stone-600 border border-stone-100 leading-relaxed"
              >
                {q}
              </p>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={lightboxPhotos}
        currentIndex={activeArtIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveArtIndex}
      />
    </div>
  );
}
