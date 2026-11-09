import { Cloud, Heart, Moon, PlusCircle, Sparkles, Star, Feather, Coffee } from "lucide-react";
import type { DiaryChapter, DiaryItem } from "@/data/diary-content";

interface ChapterProps {
  chapter: DiaryChapter;
  onSelectItem: (item: DiaryItem) => void;
  onOpenAdmin: () => void;
}

const DEFAULT_LITTLE_WONDERS: DiaryItem[] = [
  {
    id: "wonder-starlit-skylines",
    title: "Twilight Crescent & Midnight Thoughts",
    caption:
      "When the city sleeps and the moon hangs low, the mind wanders into boundless dreams and new lines of code.",
    description: "Quiet twilight hours looking up at celestial clouds and starlit horizons.",
    date: "Midnight Thoughts",
    location: "Rooftop Under the Stars",
    category: "little-world",
    mediaType: "image",
    mediaUrl: "/assets/travel/moon-sky/crescent-moon-twilight.jpg",
    aspectRatio: "landscape",
    frameStyle: "floral",
    tags: ["CrescentMoon", "MidnightIdeas", "TwilightSky"],
    sortOrder: 1,
    published: true,
  },
  {
    id: "wonder-rain-ripples",
    title: "Rain on Window Panes & Water Ripples",
    caption:
      "The comforting rhythm of monsoon raindrops tapping against glass. Everything feels still, grounded, and safe.",
    description: "Monsoon serenity and peaceful reflective pauses during rainy afternoons.",
    date: "Monsoon Echoes",
    location: "Rainy Window Nook",
    category: "little-world",
    mediaType: "image",
    mediaUrl: "/assets/travel/water/rain-ripples-pond.jpg",
    aspectRatio: "landscape",
    frameStyle: "polaroid",
    tags: ["MonsoonRain", "WaterRipples", "Serenity", "Stillness"],
    sortOrder: 2,
    published: true,
  },
  {
    id: "wonder-ancient-woods",
    title: "Ancient Mossy Trees & Earth Whispers",
    caption:
      "Deep woodland trails where time slows down to the pace of swaying leaves and birdsong.",
    description: "Quiet morning walking trails in Satpura ancient pine forests.",
    date: "Woodland Walk",
    location: "Deep Forest Trail",
    category: "little-world",
    mediaType: "image",
    mediaUrl: "/assets/travel/forest/ancient-mossy-trees.jpg",
    aspectRatio: "landscape",
    frameStyle: "pinned",
    tags: ["AncientWoods", "MossyRoots", "ForestPines", "Earth"],
    sortOrder: 3,
    published: true,
  },
  {
    id: "wonder-serene-lake",
    title: "Glass Waters & Mirror Horizons",
    caption: "Still morning water holding the reflection of sky, clouds, and quiet morning hopes.",
    description: "Tranquil lake mirrors reflecting soft morning light and clear skies.",
    date: "Morning Solitude",
    location: "Quiet Lakeside",
    category: "little-world",
    mediaType: "image",
    mediaUrl: "/assets/travel/water/serene-lake-reflection.jpg",
    aspectRatio: "landscape",
    frameStyle: "tape",
    tags: ["GlassWaters", "LakeMirror", "Calmness", "Peace"],
    sortOrder: 4,
    published: true,
  },
];

export function LittleWorldChapter({ chapter, onSelectItem, onOpenAdmin }: ChapterProps) {
  const publishedItems = chapter.items.filter((i) => i.published);
  const itemsToDisplay = publishedItems.length > 0 ? publishedItems : DEFAULT_LITTLE_WONDERS;

  return (
    <div className="relative min-h-[610px] p-3 sm:p-8 select-none">
      {/* Chapter Vintage Header */}
      <div className="mb-6 border-b-2 border-dashed border-amber-300/60 pb-4 text-center relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 dark:bg-amber-950/70 px-4 py-1 text-xs font-serif font-bold uppercase tracking-[0.25em] text-amber-950 dark:text-amber-200 shadow-xs border border-amber-300/50">
          <Star className="h-3.5 w-3.5 text-amber-600" /> Chapter VII • Little World & Daydreams
        </div>
        <h2 className="font-cursive mt-2 text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-amber-100">
          {chapter.title} 🌙✨
        </h2>
        <p className="font-handwriting mt-1 text-base sm:text-lg font-bold text-amber-900 dark:text-amber-300">
          "{chapter.subtitle}"
        </p>

        {/* Marginalia Note */}
        <div className="mt-2 inline-flex items-center gap-2 text-xs font-handwriting text-stone-600 dark:text-stone-300">
          <span>🦋 "A quiet corner of the universe that is entirely, authentically mine"</span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
          <Moon className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
          <span>Dreamy Thoughts, Cozy Rituals & Everyday Wonders</span>
        </div>

        <button
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-serif font-bold transition hover:scale-105 shadow-xs border border-amber-300/80 bg-amber-50 text-amber-950 dark:bg-amber-950/80 dark:text-amber-200"
        >
          <PlusCircle className="h-3.5 w-3.5" /> Add Little Wonder
        </button>
      </div>

      {/* Densely Packed Dreamy Thought Cards — Zero Empty Space */}
      <div className="grid gap-6 sm:grid-cols-2">
        {itemsToDisplay.map((item, idx) => {
          const rotations = ["-1deg", "1.5deg", "-1.5deg", "1deg"];
          const rot = rotations[idx % rotations.length];

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              style={{ transform: `rotate(${rot})` }}
              className="group relative cursor-pointer rounded-3xl border-2 border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-br from-pink-50/70 via-white to-amber-50/70 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 p-5 shadow-md transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Fluttering Corner Butterfly */}
              <div className="absolute -top-3 -right-2 text-xl animate-bounce">🦋</div>

              {/* Washi Tape Strip */}
              <div className="diary-washi-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 z-10" />

              <div className="flex items-center justify-between text-xs font-serif text-amber-800 dark:text-amber-300 font-bold mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  Quiet Thought
                </span>
                {item.date && <span className="font-mono text-[10px]">{item.date}</span>}
              </div>

              <h3 className="font-serif mt-1 text-lg font-bold text-stone-900 dark:text-amber-100 group-hover:text-amber-900 transition">
                {item.title}
              </h3>

              {item.caption && (
                <p className="font-handwriting mt-2 text-sm sm:text-base leading-snug text-stone-800 dark:text-stone-300 font-semibold">
                  "{item.caption}"
                </p>
              )}

              {item.mediaUrl && (
                <div className="mt-3 overflow-hidden rounded-2xl border-2 border-white dark:border-stone-800 shadow-md aspect-[16/10] bg-stone-100 dark:bg-stone-900">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-103"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Card Footer */}
              <div className="mt-3 pt-2 border-t border-amber-200/50 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>{item.location || "Little World"}</span>
                <span className="text-teal-600 hover:underline">Click to Inspect & Zoom 🔍</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="mt-8 pt-3 text-center border-t border-amber-200/50 flex items-center justify-between text-xs font-serif text-stone-500">
        <span>Everyday Wonders & Mindful Pauses</span>
        <span className="font-handwriting text-sm text-amber-600 font-bold">
          "magic in the quiet corners ♡"
        </span>
      </div>
    </div>
  );
}

export default LittleWorldChapter;
