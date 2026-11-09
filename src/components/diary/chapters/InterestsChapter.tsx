import {
  BookOpen,
  Heart,
  PlusCircle,
  Sparkles,
  Star,
  Coffee,
  Feather,
  Bookmark,
  ZoomIn,
} from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

const CLASSIC_BOOKS = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    color: "#1e3a8a",
    tag: "Software Craft",
    quote:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
  },
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    color: "#7c3aed",
    tag: "Philosophy",
    quote: "What is essential is invisible to the eye.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    color: "#d97706",
    tag: "Mindset",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
  },
  {
    title: "Designing Data-Intensive Apps",
    author: "Martin Kleppmann",
    color: "#b91c1c",
    tag: "Architecture",
    quote: "Reliability and maintainability are deliberate engineering choices.",
  },
];

export function InterestsChapter({ chapter, onSelectItem, onOpenAdmin }: ChapterProps) {
  const publishedItems = chapter.items.filter((i) => i.published);

  const handleSelectBook = (book: (typeof CLASSIC_BOOKS)[0]) => {
    const item: DiaryItem = {
      id: `book-${book.title.toLowerCase().replace(/\s+/g, "-")}`,
      title: `${book.title} · Book Reflections`,
      caption: `"${book.quote}" — ${book.author}`,
      description: `Exploring key ideas from ${book.title} and applying them to daily engineering habits and architecture.`,
      date: book.tag,
      location: "Palak's Vintage Bookshelf",
      category: "interests",
      mediaType: "note",
      aspectRatio: "portrait",
      frameStyle: "floral",
      tags: ["Reading", "SoftwareArchitecture", "Philosophy", "Mindset"],
      sortOrder: 1,
      published: true,
    };
    onSelectItem(item);
  };

  return (
    <div className="relative min-h-[610px] p-3 sm:p-7 select-none">
      {/* Chapter Vintage Header */}
      <div className="mb-6 border-b-2 border-dashed border-purple-300/60 pb-4 text-center relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 dark:bg-purple-950/70 px-4 py-1 text-xs font-serif font-bold uppercase tracking-[0.25em] text-purple-950 dark:text-purple-200 shadow-xs border border-purple-300/50">
          <BookOpen className="h-3.5 w-3.5 text-purple-700 dark:text-purple-400" /> Chapter VI •
          Vintage Library & Curiosities
        </div>
        <h2 className="font-cursive mt-2 text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-purple-100">
          {chapter.title} 📚✨
        </h2>
        <p className="font-handwriting mt-1 text-base sm:text-lg font-bold text-purple-900 dark:text-purple-300">
          "{chapter.subtitle}"
        </p>

        {/* Marginalia Note */}
        <div className="mt-2 inline-flex items-center gap-2 text-xs font-handwriting text-stone-600 dark:text-stone-300">
          <span>🕯️ "Between vintage pages and lines of code, curiosity thrives"</span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-800 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1 rounded-full border border-purple-200 dark:border-purple-800">
          <Bookmark className="h-3.5 w-3.5 text-purple-600" />
          <span>Curated Reading Shelf & Design Studies</span>
        </div>

        <button
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-serif font-bold transition hover:scale-105 shadow-xs border border-purple-300/80 bg-purple-50 text-purple-950 dark:bg-purple-950/80 dark:text-purple-200"
        >
          <PlusCircle className="h-3.5 w-3.5" /> Add Curiosity
        </button>
      </div>

      {/* ======================================================== */}
      {/* DENSE VINTAGE LIBRARY SHELF LAYOUT                      */}
      {/* ======================================================== */}
      <div className="rounded-3xl border-2 border-purple-200/80 dark:border-purple-900/60 bg-[#fffdf9] dark:bg-stone-900/90 p-4 sm:p-7 shadow-lg mb-6 relative overflow-hidden">
        {/* Washi Tape Strip across top */}
        <div className="diary-washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 z-20 rotate-1" />

        <div className="flex items-center justify-between mb-3 border-b border-purple-200/60 pb-2">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-purple-950 dark:text-purple-200">
            <span>📖 Cozy Reading Corner</span>
            <span className="text-xs font-mono font-normal opacity-75">
              (Click any book spine for notes!)
            </span>
          </div>
          <span className="text-xs font-handwriting text-amber-600 font-bold">
            ☕ "steaming tea & good books"
          </span>
        </div>

        {/* 3D Book Spines on Shelf */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 pt-3 pb-2 overflow-x-auto no-scrollbar">
          {CLASSIC_BOOKS.map((book) => (
            <div
              key={book.title}
              onClick={() => handleSelectBook(book)}
              style={{
                backgroundColor: book.color,
                boxShadow:
                  "0 8px 18px rgba(0,0,0,0.25), inset -2px 0 5px rgba(0,0,0,0.3), inset 2px 0 5px rgba(255,255,255,0.2)",
              }}
              className="group relative flex w-12 sm:w-16 h-36 sm:h-44 flex-col justify-between rounded-t-lg p-2 text-white transition-all duration-300 hover:-translate-y-3 hover:scale-105 cursor-pointer shadow-md shrink-0"
              title={`Click to inspect ${book.title}!`}
            >
              {/* Bookmark Ribbon */}
              <div className="absolute top-0 right-2 w-2 h-5 bg-amber-400 rounded-b shadow-xs" />
              <div className="text-[9px] font-mono text-center opacity-80 uppercase tracking-widest">
                ★ 5.0
              </div>
              <div className="writing-vertical flex-1 text-center font-serif text-xs sm:text-sm font-bold tracking-wider my-auto select-none">
                {book.title}
              </div>
              <div className="text-[8px] font-mono text-center truncate opacity-75">
                {book.author.split(" ").pop()}
              </div>
            </div>
          ))}
        </div>

        {/* Wooden Shelf Plinth */}
        <div className="relative h-4 w-full rounded-md bg-[#6d4c41] shadow-[0_4px_8px_rgba(0,0,0,0.3)] border-t border-amber-300/40" />

        {/* Marginalia Sticky Notes below shelf */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/70 dark:bg-purple-950/40 p-3">
            <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 uppercase">
              ✦ Engineering Craft Note
            </span>
            <p className="font-handwriting text-xs sm:text-sm text-stone-700 dark:text-stone-200 mt-1 leading-snug">
              "Readable code is an act of empathy towards the next developer who touches your
              system."
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/40 p-3">
            <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 uppercase">
              ✦ Design Harmony Note
            </span>
            <p className="font-handwriting text-xs sm:text-sm text-stone-700 dark:text-stone-200 mt-1 leading-snug">
              "Great interfaces are like good writing — clear, elegant, and effortless to navigate."
            </p>
          </div>
        </div>
      </div>

      {/* Densely Packed Published Interest Cards with Unique Real Photos */}
      {publishedItems.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {publishedItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              style={{
                transform: idx % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
              }}
              className="group relative cursor-pointer rounded-2xl border-2 border-purple-200/90 dark:border-purple-900/60 bg-[#fffdfa] dark:bg-stone-900 p-4 shadow-md transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Top Washi Tape */}
              <div className="diary-washi-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-4.5 z-10" />

              <div>
                <div className="flex items-center justify-between text-xs font-serif text-purple-800 dark:text-purple-300 font-bold mb-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-purple-600" />
                    Curiosity Card
                  </span>
                  {item.date && <span className="font-mono text-[10px]">{item.date}</span>}
                </div>

                <h3 className="font-serif text-base font-bold text-stone-900 dark:text-purple-100 group-hover:text-purple-600 transition truncate">
                  {item.title}
                </h3>

                {item.mediaUrl && (
                  <div className="relative mt-2 overflow-hidden rounded-xl border-2 border-white dark:border-stone-800 aspect-[4/3] bg-stone-100 dark:bg-stone-800 shadow-xs">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="rounded-full bg-white text-stone-900 px-3 py-1 text-xs font-serif font-bold shadow-md flex items-center gap-1">
                        <ZoomIn className="h-3 w-3 text-purple-600" /> Inspect
                      </span>
                    </div>
                  </div>
                )}

                {item.caption && (
                  <p className="font-handwriting mt-2 text-xs sm:text-sm leading-snug text-stone-700 dark:text-stone-300 font-semibold line-clamp-2">
                    "{item.caption}"
                  </p>
                )}
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-purple-100 dark:border-stone-800">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-purple-50 dark:bg-purple-950/60 px-2 py-0.2 text-[9px] font-mono text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footnote */}
      <div className="mt-8 pt-3 text-center border-t border-purple-200/50 flex items-center justify-between text-xs font-serif text-stone-500">
        <span>Curiosities & Lifelong Learning</span>
        <span className="font-handwriting text-sm text-purple-600 font-bold">
          "always stay curious ♡"
        </span>
      </div>
    </div>
  );
}

export default InterestsChapter;
