import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  BookOpen,
  Music,
  Star,
  Play,
  Pause,
  Volume2,
  Sparkles,
  Quote,
} from "lucide-react";
import booksData from "@/data/books.json";
import { StickerCutout } from "@/components/scrapbook/StickerCutout";
import { FillerDecor } from "@/components/scrapbook/FillerDecor";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Palak's Bookshelf & Soundscapes" },
      {
        name: "description",
        content:
          "Books that shaped my mindset, melodies on repeat, and acoustic singing recordings.",
      },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<(typeof booksData.books)[0]>(booksData.books[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f0] text-[#2c2214] selection:bg-amber-200 selection:text-amber-900 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fcf8f0]/90 border-b border-amber-900/10 px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-900/20 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-amber-950 transition hover:bg-amber-50 hover:-translate-x-0.5 shadow-xs"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>

          <div className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold tracking-wide text-amber-950">
            <BookOpen className="h-5 w-5 text-amber-700" />
            <span>Palak's Bookshelf & Vinyl</span>
          </div>

          <Link
            to="/travel"
            className="text-xs font-serif underline text-amber-800 hover:text-amber-950"
          >
            Travel Journal →
          </Link>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-800/30 bg-amber-100/60 px-4 py-1 text-xs font-mono uppercase tracking-widest text-amber-900 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            <span>STORIES & MELODIES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-amber-950">
            Bookshelf, Vinyl & Soundscapes
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-amber-900/80 leading-relaxed font-serif">
            {booksData.shelfIntro}
          </p>

          {/* Stickers */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <StickerCutout
              src="/assets/stickers/guitar.svg"
              alt="Guitar"
              size={54}
              rotate="-10deg"
            />
            <StickerCutout
              src="/assets/stickers/filter-coffee.svg"
              alt="Coffee"
              size={50}
              rotate="8deg"
            />
          </div>
        </div>
      </section>

      {/* 3D BOOKSHELF DISPLAY */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-16">
        <div className="rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-10 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950 text-center mb-2">
            The Reading Shelf
          </h2>
          <p className="text-center text-xs sm:text-sm text-amber-800/70 mb-10">
            Click on any book spine to inspect Palak's reflections, key takeaways & quotes.
          </p>

          {/* 3D Books Alignment */}
          <div className="relative pt-6 pb-2">
            <div className="flex items-end justify-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar pb-1">
              {booksData.books.map((book) => {
                const isSelected = selectedBook.id === book.id;
                return (
                  <div
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    style={{
                      height: book.height,
                      backgroundColor: book.spineColor,
                      color: book.textColor,
                      boxShadow: isSelected
                        ? "0 12px 25px rgba(0,0,0,0.35), inset -3px 0 6px rgba(0,0,0,0.4), inset 3px 0 6px rgba(255,255,255,0.3)"
                        : "0 4px 10px rgba(0,0,0,0.2), inset -2px 0 4px rgba(0,0,0,0.3)",
                    }}
                    className={`group relative flex w-12 sm:w-16 flex-col justify-between rounded-t-lg p-2.5 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "-translate-y-4 scale-105 z-20 ring-4 ring-amber-400"
                        : "hover:-translate-y-2 hover:scale-102"
                    }`}
                  >
                    {/* Golden Bookmark Ribbon */}
                    <div className="absolute top-0 right-2 w-2 h-6 bg-amber-400 rounded-b shadow-sm" />

                    {/* Top Spine Decors */}
                    <div className="text-[10px] font-mono opacity-80 uppercase tracking-widest text-center">
                      ★ {book.rating}
                    </div>

                    {/* Vertical Book Title */}
                    <div className="writing-vertical flex-1 text-center font-serif text-xs sm:text-sm font-bold tracking-wider my-auto select-none">
                      {book.title}
                    </div>

                    {/* Author Bottom */}
                    <div className="text-[9px] font-mono text-center truncate opacity-75">
                      {book.author.split(" ").pop()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Wooden Bookshelf Plinth */}
            <div className="relative h-6 w-full rounded-md bg-[#6d4c41] shadow-[0_6px_12px_rgba(0,0,0,0.3)] border-t border-amber-300/40">
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#4e342e]" />
            </div>
          </div>

          {/* Selected Book Reader Card */}
          {selectedBook && (
            <div className="mt-10 rounded-2xl border border-amber-900/10 bg-amber-50/70 p-6 sm:p-8 animate-rise">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-200/80 px-3 py-1 text-xs font-mono font-medium text-amber-900">
                      {selectedBook.tag}
                    </span>
                    <span className="text-xs font-mono text-amber-700/80">
                      Status: {selectedBook.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-amber-950 mt-2">
                    {selectedBook.title}
                  </h3>
                  <p className="text-sm font-serif italic text-amber-800">
                    by {selectedBook.author}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(selectedBook.rating)
                            ? "fill-current text-amber-500"
                            : "text-stone-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-mono text-amber-900 font-bold">
                      {selectedBook.rating} / 5
                    </span>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-amber-950/85 leading-relaxed font-serif">
                    {selectedBook.notes}
                  </p>
                </div>

                {/* Favorite Quote Sticky Note */}
                <div className="shrink-0 w-full md:w-80 rounded-2xl bg-amber-100/90 border border-amber-300/60 p-5 shadow-sm rotate-1 relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-16 bg-amber-200/90 border-x border-amber-300 shadow-xs" />
                  <Quote className="h-5 w-5 text-amber-700/60 mb-2" />
                  <p className="font-serif italic text-xs sm:text-sm text-amber-950 leading-relaxed">
                    "{selectedBook.favoriteQuote}"
                  </p>
                  <p className="mt-3 text-right text-[11px] font-mono text-amber-800">
                    — From {selectedBook.title}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* VINYL TURNTABLE & SOUNDSCAPES */}
        <div className="rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200 px-3.5 py-1 text-xs font-mono uppercase text-rose-800 mb-3">
                <Music className="h-3.5 w-3.5" />
                <span>ACOUSTIC CORNER & SOUNDSCAPES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
                Vinyl & Unplugged Sessions
              </h2>
              <p className="mt-3 text-sm sm:text-base text-amber-900/80 leading-relaxed font-serif">
                Music is my other language. When I'm not writing software or sketching, I sing
                acoustic covers and play with soulful chord progressions. Listen to an authentic
                sample recording below.
              </p>

              {/* Audio Player Controls */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={toggleAudio}
                  className="inline-flex items-center gap-2.5 rounded-full bg-amber-900 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-amber-950 hover:scale-105"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="h-5 w-5" /> Pause Song
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" /> ▶ Play Acoustic Melody
                    </>
                  )}
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-800">
                  <Volume2 className="h-4 w-4" />
                  <span>Unmuted · Palak's Vocals</span>
                </div>
              </div>

              {/* Hidden audio element pointing to existing voice-sample */}
              <audio
                ref={audioRef}
                src="/uploads/diary/talents/voice-sample-1.mp3"
                onEnded={() => setIsPlayingAudio(false)}
              />
            </div>

            {/* Vinyl Record Animation */}
            <div className="relative flex items-center justify-center p-4">
              <div
                className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#121212] border-4 border-stone-800 shadow-2xl flex items-center justify-center ${
                  isPlayingAudio ? "animate-spin-slow" : ""
                }`}
              >
                {/* Vinyl Grooves */}
                <div className="absolute inset-4 rounded-full border border-stone-700/40" />
                <div className="absolute inset-8 rounded-full border border-stone-700/30" />
                <div className="absolute inset-12 rounded-full border border-stone-700/40" />
                <div className="absolute inset-16 rounded-full border border-stone-700/30" />

                {/* Center Label */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 border-4 border-amber-600 flex flex-col items-center justify-center text-center shadow-inner">
                  <div className="w-4 h-4 rounded-full bg-[#121212] mb-1" />
                  <span className="text-[8px] font-mono font-bold uppercase text-stone-900">
                    SIDE A
                  </span>
                </div>
              </div>

              {/* Turntable Stylus Needle */}
              <div
                className={`absolute top-0 right-4 w-2 h-24 bg-stone-400 rounded-full origin-top transition-transform duration-500 shadow-md ${
                  isPlayingAudio ? "rotate-25" : "rotate-0"
                }`}
              >
                <div className="absolute bottom-0 -left-1 w-4 h-4 rounded-sm bg-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filler Decor */}
        <FillerDecor theme="books" className="my-8" />
      </main>
    </div>
  );
}
