export interface DiaryItem {
  id: string;
  title: string;
  caption?: string;
  description?: string;
  date?: string;
  location?: string;
  category?: string;
  mediaType: "image" | "video" | "audio" | "pdf" | "note" | "drawing";
  mediaUrl?: string;
  image?: string;
  video?: string;
  thumbnailUrl?: string;
  videoEmbedUrl?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  frameStyle?:
    "vintage-gold" | "polaroid" | "floral" | "postmark" | "tape" | "sketchbook" | "pinned";
  tags?: string[];
  noteContent?: string;
  sortOrder: number;
  published: boolean;
  featured?: boolean;
}

export interface DiaryChapter {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  quote?: string;
  coverAccent: string;
  items: DiaryItem[];
}

/**
 * EXACTLY FOUR CHAPTERS:
 * 1. My Story — personal journey, introduction, coding inception & milestones
 * 2. My Talents — singing, acoustic recordings, vocal harmonies & musical passions
 * 3. Travel Diaries — real destinations, photographs, interactive map & travel memories
 * 4. Memories — friends, college, celebrations, artwork & cozy little moments
 */
export const INITIAL_CHAPTERS: DiaryChapter[] = [
  // =========================================================================
  // CHAPTER 1: MY STORY
  // =========================================================================
  {
    id: "chapter-story",
    slug: "my-story",
    title: "My Story",
    subtitle: "A journey written in quiet milestones, creative leaps and code",
    quote: "Every line of code and every song begins with a single, quiet thought.",
    coverAccent: "#f472b6",
    items: [
      {
        id: "story-inception-workspace",
        title: "Where My Journey Began · First Code Workspace",
        caption:
          "A cozy laptop desk glowing with late-night lines of code. The moment console.log('Hello, World!') ran, a software builder was born.",
        description:
          "Palak's inception into Computer Science and Business Systems: combining creative curiosity with full-stack engineering logic.",
        date: "First Code Milestone",
        location: "Creative Studio Desk",
        category: "story",
        mediaType: "image",
        mediaUrl: "/media/diary/story/laptop-desk.jpg",
        image: "/media/diary/story/laptop-desk.jpg",
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: ["Inception", "FirstCode", "HelloWorld", "ChaiAndLogic"],
        sortOrder: 1,
        published: true,
        featured: true,
      },
      {
        id: "story-milestone-csbs",
        title: "Stepping into Computer Science & Business Systems",
        caption:
          "Learning both sides of the coin: clean algorithmic software craft and real business product architecture.",
        description:
          "Formal engineering studies at SIRT Bhopal, building analytical foundations and scalable architectures.",
        date: "B.Tech in CSBS · 2024",
        location: "SIRT Bhopal Campus",
        category: "story",
        mediaType: "image",
        mediaUrl: "/media/diary/story/campus-memories.jpg",
        image: "/media/diary/story/campus-memories.jpg",
        aspectRatio: "landscape",
        frameStyle: "tape",
        tags: ["BTech", "CSBS", "Academics", "Engineering"],
        sortOrder: 2,
        published: true,
      },
      {
        id: "story-milestone-pricora",
        title: "PRICORA-AI · Dynamic Pricing Intelligence Engine",
        caption:
          "From initial whiteboard idea to full-stack production. Built with React, Node.js, and real-time market telemetry.",
        description:
          "Engineered live price scraping, competitive analytics dashboard, and dynamic pricing models.",
        date: "Flagship AI Project",
        location: "Production Deployment",
        category: "story",
        mediaType: "image",
        mediaUrl: "/media/diary/story/graduation-milestone.jpg",
        image: "/media/diary/story/graduation-milestone.jpg",
        aspectRatio: "landscape",
        frameStyle: "pinned",
        tags: ["PRICORA", "FullStack", "AI", "React"],
        sortOrder: 3,
        published: true,
        featured: true,
      },
      {
        id: "story-milestone-sentinel",
        title: "Sentinel AI · Smart Security & Anomaly Detection",
        caption:
          "Intelligent anomaly detection system with real-time alert monitors, vision feeds, and backend telemetry.",
        description:
          "Collaborative engineering effort integrating computer vision security models with modern UI.",
        date: "Security Systems Milestone",
        location: "Innovation Lab",
        category: "story",
        mediaType: "image",
        mediaUrl: "/assets/travel/moon-sky/starry-milky-way-night.jpg",
        image: "/assets/travel/moon-sky/starry-milky-way-night.jpg",
        aspectRatio: "landscape",
        frameStyle: "vintage-gold",
        tags: ["SentinelAI", "Vision", "Security", "Telemetry"],
        sortOrder: 4,
        published: true,
      },
    ],
  },

  // =========================================================================
  // CHAPTER 2: MY TALENTS (Singing, Melodies & Acoustic Passion)
  // =========================================================================
  {
    id: "chapter-talents",
    slug: "my-talents",
    title: "My Talents & Melodies",
    subtitle: "Acoustic singing sessions, vocal harmonies & creative music",
    quote: "Where melody meets engineering: art that breathes life into logic.",
    coverAccent: "#38bdf8",
    items: [
      {
        id: "talent-video-1",
        title: "Romantic & Acoustic Melodies",
        caption: "Acoustic singing session & vocal harmony",
        description: "Vocal recording capturing romantic notes and acoustic nuances.",
        date: "Acoustic Session",
        category: "singing",
        mediaType: "video",
        mediaUrl: "/media/videos/talents/palak-intro.mp4",
        video: "/media/videos/talents/palak-intro.mp4",
        aspectRatio: "landscape",
        frameStyle: "vintage-gold",
        tags: ["Singing", "Acoustic", "VocalCover"],
        sortOrder: 1,
        published: true,
        featured: true,
      },
      {
        id: "talent-video-2",
        title: "Heartfelt Vocal Performance",
        caption: "Singing covers & expressive acoustic notes",
        description: "Heartfelt singing recording exploring melodic depth and rhythm.",
        date: "Vocal Covers",
        category: "singing",
        mediaType: "video",
        mediaUrl: "/media/videos/talents/palak-intro.mp4",
        video: "/media/videos/talents/palak-intro.mp4",
        aspectRatio: "landscape",
        frameStyle: "vintage-gold",
        tags: ["Melodies", "Harmony", "LiveSinging"],
        sortOrder: 2,
        published: true,
        featured: true,
      },
      {
        id: "hobby-acoustic-guitar",
        title: "Acoustic Chords & Soulful Harmonies",
        caption:
          "When screens turn off, music begins. Unplugged chords, soothing guitar rhythms, and soulful singing covers.",
        description:
          "Acoustic jamming session at dusk. Finding comfort in acoustic melodies between programming sprints.",
        date: "Dusk Jamming",
        location: "Music Room",
        category: "music",
        mediaType: "image",
        mediaUrl: "/media/diary/talents/acoustic-guitar.jpg",
        image: "/media/diary/talents/acoustic-guitar.jpg",
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: ["Acoustic", "Guitar", "Singing", "CozyVibes"],
        sortOrder: 3,
        published: true,
        featured: true,
      },
      {
        id: "hobby-vinyl-record",
        title: "Vintage Vinyl & Classical Melodies",
        caption:
          "Warm crackle of analog records. Slow evenings spent listening to timeless melodies and old soulful hits.",
        description:
          "Spinning retro records on an old turntable. A reminder that classic craftsmanship never goes out of style.",
        date: "Vintage Collection",
        location: "Listening Nook",
        category: "music",
        mediaType: "image",
        mediaUrl: "/media/diary/talents/vinyl-turntable.jpg",
        image: "/media/diary/talents/vinyl-turntable.jpg",
        aspectRatio: "landscape",
        frameStyle: "tape",
        tags: ["Vinyl", "Turntable", "AnalogSound", "RetroMelodies"],
        sortOrder: 4,
        published: true,
      },
    ],
  },

  // =========================================================================
  // CHAPTER 3: TRAVEL DIARIES (Real Destinations & Interactive Map)
  // =========================================================================
  {
    id: "chapter-travel",
    slug: "travel-diaries",
    title: "Travel Diaries",
    subtitle: "Real destinations, misty mountain trails, lakes & temple gopurams",
    quote: "To travel is to collect sunsets and keep them between paper pages.",
    coverAccent: "#2dd4bf",
    items: [
      {
        id: "travel-bhopal-sunset",
        title: "Golden Hour Glow · Upper Lake Bhopal",
        caption:
          "Golden sunlight dancing across Bhopal's serene Bada Talab waters. Evening breezes, lakeside chai, and quiet contemplation.",
        description:
          "Photographed at VIP Road, Bhopal. The water shimmered like molten amber as the city lights began to twinkle.",
        date: "Golden Hour Reflections",
        location: "Upper Lake, Bhopal",
        category: "travel",
        mediaType: "image",
        mediaUrl: "/media/diary/travel/bhopal-lake.png",
        image: "/media/diary/travel/bhopal-lake.png",
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: ["Bhopal", "UpperLake", "GoldenHour", "LakesideVibes"],
        sortOrder: 1,
        published: true,
        featured: true,
      },
      {
        id: "travel-misty-mountains",
        title: "Misty Mountain Morning · Satpura Hills Pachmarhi",
        caption:
          "Misty layers of blue and green rolling across the Satpura mountain ranges at dawn. Cold pine breezes and silent horizons.",
        description:
          "Witnessed from Dhoopgarh, the highest point in Madhya Pradesh. Walking through misty forest paths as morning fog lifted.",
        date: "Dawn Elevation",
        location: "Dhoopgarh, Pachmarhi",
        category: "travel",
        mediaType: "image",
        mediaUrl: "/media/diary/travel/pachmarhi-hills.jpg",
        image: "/media/diary/travel/pachmarhi-hills.jpg",
        aspectRatio: "landscape",
        frameStyle: "pinned",
        tags: ["Pachmarhi", "Satpura", "MistyMorning", "MountainScrapbook"],
        sortOrder: 2,
        published: true,
        featured: true,
      },
      {
        id: "travel-tamil-nadu",
        title: "Temple Gopurams & Sacred Hills · Tamil Nadu",
        caption:
          "Magnificent temple gopuram towers rising against scenic mountain hills. Rich Dravidian architecture and cultural heritage.",
        description:
          "Exploring ancient temples in Tamil Nadu. The intricate sculptures, peaceful courtyards, and scenic hillside backdrops.",
        date: "Southern Odyssey",
        location: "Tamil Nadu, India",
        category: "travel",
        mediaType: "image",
        mediaUrl: "/media/diary/travel/tamil-nadu-temple.png",
        image: "/media/diary/travel/tamil-nadu-temple.png",
        aspectRatio: "landscape",
        frameStyle: "vintage-gold",
        tags: ["TamilNadu", "TempleArchitecture", "ScenicHills", "SouthIndia"],
        sortOrder: 3,
        published: true,
        featured: true,
      },
      {
        id: "travel-enchanted-forest",
        title: "Enchanted Woods & Wild Deer · Satpura Trails",
        caption:
          "Quiet encounter with a wild deer standing peacefully among ancient trees in the morning mist.",
        description:
          "Deeper into the Satpura woodland trails. Sunbeams filtering through tall trees illuminating an enchanted forest scene.",
        date: "Wilderness Walk",
        location: "Satpura Woodland",
        category: "travel",
        mediaType: "image",
        mediaUrl: "/media/diary/travel/forest-deer.png",
        image: "/media/diary/travel/forest-deer.png",
        aspectRatio: "landscape",
        frameStyle: "floral",
        tags: ["WildDeer", "EnchantedForest", "NatureWalk", "PeacefulMoments"],
        sortOrder: 4,
        published: true,
        featured: true,
      },
      {
        id: "travel-waterfall-pools",
        title: "Cold Mountain Waterfalls & Natural Springs",
        caption:
          "Natural freshwater pools hidden deep inside the ravine. Clear, freezing water cascading over smooth canyon rocks.",
        description:
          "Bee Falls and Duchess Fall hike. The thunderous echo of cascading water and refreshing mountain pools.",
        date: "Waterfall Trek",
        location: "Bee Falls, Pachmarhi",
        category: "travel",
        mediaType: "image",
        mediaUrl: "/media/diary/travel/waterfall-pool.jpg",
        image: "/media/diary/travel/waterfall-pool.jpg",
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: ["BeeFalls", "WaterfallPool", "CanyonTrek", "ClearWaters"],
        sortOrder: 5,
        published: true,
      },
      {
        id: "travel-south-indian-feast",
        title: "Steaming Filter Kaapi & Crispy Dosa Delights",
        caption:
          "Crispy golden masala dosa served on banana leaf with fresh coconut chutneys and traditional brass tumbler filter coffee.",
        description:
          "Traditional breakfast stop during the South Indian road trip. The rich aroma of roasted chicory and spices.",
        date: "Culinary Trail",
        location: "Madurai Eatery",
        category: "travel",
        mediaType: "image",
        mediaUrl: "/media/diary/travel/south-indian-feast.jpg",
        image: "/media/diary/travel/south-indian-feast.jpg",
        aspectRatio: "landscape",
        frameStyle: "tape",
        tags: ["FilterKaapi", "MasalaDosa", "BananaLeaf", "RoadTripFood"],
        sortOrder: 6,
        published: true,
      },
    ],
  },

  // =========================================================================
  // CHAPTER 4: MEMORIES (Friends, Campus Life, Art & Creative Moments)
  // =========================================================================
  {
    id: "chapter-memories",
    slug: "my-memories",
    title: "Memories",
    subtitle: "College days at SIRT Bhopal, creative sketches, celebrations & little moments",
    quote:
      "Photographs and handwritten notes: tiny time capsules of people and places that made us.",
    coverAccent: "#c084fc",
    items: [
      {
        id: "memory-canteen-chai",
        title: "Canteen Chai & Architecture Debates",
        caption:
          "Post-class debates over cutting chai and samosas at the campus canteen. Talking about cloud backends and future blueprints.",
        description:
          "SIRT Bhopal canteen bench. Where some of our most ambitious project roadmaps were sketched on paper napkins.",
        date: "Canteen Diaries",
        location: "Campus Canteen, SIRT",
        category: "memory",
        mediaType: "image",
        mediaUrl: "/media/diary/memories/canteen-discussions.jpg",
        image: "/media/diary/memories/canteen-discussions.jpg",
        aspectRatio: "landscape",
        frameStyle: "tape",
        tags: ["CampusLife", "CuttingChai", "Debates", "CollegeMemories"],
        sortOrder: 1,
        published: true,
        featured: true,
      },
      {
        id: "drawing-cottage-garden",
        title: "Cozy Cottage Garden · Handcrafted Ink Sketch",
        caption:
          "A quiet cottage surrounded by flowering hedges and stone pathways. Sketched with fine-liner ink on textured paper.",
        description:
          "Drawn on a Sunday afternoon with a cup of masala chai. Visualizing tranquil homes tucked away in misty valleys.",
        date: "Ink Study · 2024",
        location: "Creative Sketchbook",
        category: "drawing",
        mediaType: "image",
        mediaUrl: "/media/diary/memories/cottage-drawing.png",
        image: "/media/diary/memories/cottage-drawing.png",
        aspectRatio: "landscape",
        frameStyle: "sketchbook",
        tags: ["InkSketch", "CottageGarden", "ArtStudy", "FineLiner"],
        sortOrder: 2,
        published: true,
        featured: true,
      },
      {
        id: "drawing-botanical-wildflowers",
        title: "Botanical Wildflowers · Watercolor & Fineliner",
        caption:
          "Delicate wildflower stems, leaves, and soft floral petals studied from roadside trails and meadows.",
        description:
          "Watercolor washes over delicate pigment ink lines. Preserving seasonal blossoms inside paper spreads.",
        date: "Botanical Study",
        location: "Desk Studio",
        category: "drawing",
        mediaType: "image",
        mediaUrl: "/media/diary/memories/wildflowers-sketch.png",
        image: "/media/diary/memories/wildflowers-sketch.png",
        aspectRatio: "landscape",
        frameStyle: "floral",
        tags: ["BotanicalArt", "Wildflowers", "Watercolor", "NatureStudy"],
        sortOrder: 3,
        published: true,
        featured: true,
      },
      {
        id: "drawing-chibi-girl",
        title: "Creative Chibi Doodle · Hand-drawn Sticker",
        caption:
          "Playful chibi cartoon doodle of an ambitious tech girl holding books and wearing oversized glasses.",
        description:
          "Hand-drawn sticker illustration bringing lighthearted warmth to engineering notebook margins.",
        date: "Fun Sticker",
        location: "Notebook Marginalia",
        category: "drawing",
        mediaType: "image",
        mediaUrl: "/media/diary/memories/chibi-doodle.png",
        image: "/media/diary/memories/chibi-doodle.png",
        aspectRatio: "square",
        frameStyle: "polaroid",
        tags: ["ChibiArt", "CuteDoodle", "CharacterDesign", "Stickers"],
        sortOrder: 4,
        published: true,
      },
      {
        id: "drawing-charcoal-sketch",
        title: "Charcoal Monochrome Highlights",
        caption:
          "Soft charcoal shading and bold graphite pencil strokes exploring depth, light, and monochrome shadow.",
        description:
          "Experimenting with charcoal powder, blending stumps, and kneaded erasers to capture expressive shadows.",
        date: "Charcoal Sketch",
        location: "Art Corner",
        category: "drawing",
        mediaType: "image",
        mediaUrl: "/media/diary/memories/charcoal-sketch.jpg",
        image: "/media/diary/memories/charcoal-sketch.jpg",
        aspectRatio: "landscape",
        frameStyle: "vintage-gold",
        tags: ["Charcoal", "Monochrome", "Shading", "ArtGallery"],
        sortOrder: 5,
        published: true,
      },
      {
        id: "memory-vintage-library",
        title: "Old Bookstore & Hardcover Shelves",
        caption:
          "Wandering through narrow wooden aisles surrounded by thousands of pre-loved books and quiet study corners.",
        description:
          "Finding rare programming guides and philosophical essays tucked away on vintage cedar shelves.",
        date: "Book Hunting",
        location: "Old City Library",
        category: "interest",
        mediaType: "image",
        mediaUrl: "/media/diary/memories/vintage-library.jpg",
        image: "/media/diary/memories/vintage-library.jpg",
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: ["Library", "Bookshelves", "BookNook", "QuietHours"],
        sortOrder: 6,
        published: true,
      },
      {
        id: "hobby-chai-brew",
        title: "Steaming Masala Chai Brew · Daily Ritual",
        caption:
          "Crushed green cardamom, fresh ginger, cloves, and whole milk simmered to a rich golden caramel hue.",
        description:
          "The ritual that starts every productive coding session. A steaming earthen kulhad on the balcony.",
        date: "Daily Ritual",
        location: "Kitchen Nook",
        category: "hobby",
        mediaType: "image",
        mediaUrl: "/media/diary/memories/masala-chai.jpg",
        image: "/media/diary/memories/masala-chai.jpg",
        aspectRatio: "landscape",
        frameStyle: "polaroid",
        tags: ["MasalaChai", "GingerCardamom", "DailyComfort", "ChaiBreak"],
        sortOrder: 7,
        published: true,
      },
    ],
  },
];

const LOCAL_KEY = "palak_diary_chapters_v4";
const IDB_NAME = "PalakDiaryDB";
const IDB_STORE = "diary_chapters";

function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      resolve(null);
      return;
    }
    const req = indexedDB.open(IDB_NAME, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function saveToIndexedDB(chapters: DiaryChapter[]): Promise<void> {
  try {
    const db = await openDB();
    if (!db) return;
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(chapters, "chapters");
  } catch (e) {
    console.warn("Failed saving chapters to IndexedDB:", e);
  }
}

async function loadFromIndexedDB(): Promise<DiaryChapter[] | null> {
  try {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get("chapters");
      req.onsuccess = () => {
        const data = req.result;
        if (Array.isArray(data) && data.length === 4) {
          resolve(data);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Ensures exactly 4 chapters are returned and sanitized.
 */
function sanitizeToFourChapters(chapters: DiaryChapter[]): DiaryChapter[] {
  if (!Array.isArray(chapters) || chapters.length !== 4) {
    return INITIAL_CHAPTERS;
  }
  return chapters;
}

export function loadDiaryChapters(): DiaryChapter[] {
  if (typeof window === "undefined") return INITIAL_CHAPTERS;

  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 4) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load diary chapters from local storage", e);
  }

  return INITIAL_CHAPTERS;
}

export function saveDiaryChapters(chapters: DiaryChapter[]) {
  if (typeof window === "undefined") return;

  const sanitized = sanitizeToFourChapters(chapters);
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(sanitized));
    void saveToIndexedDB(sanitized);
  } catch (e) {
    console.error("Failed to save diary chapters to local storage", e);
  }
}

export async function fetchPersistentChapters(): Promise<DiaryChapter[]> {
  if (typeof window === "undefined") return INITIAL_CHAPTERS;

  try {
    const res = await fetch("/api/public/diary-store");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.chapters) && data.chapters.length === 4) {
        saveDiaryChapters(data.chapters);
        return data.chapters;
      }
    }
  } catch {
    // offline or static fallback
  }

  const idbData = await loadFromIndexedDB();
  if (idbData && idbData.length === 4) {
    return idbData;
  }

  return loadDiaryChapters();
}

export async function persistDiaryChapters(
  chapters: DiaryChapter[],
  adminPasskey?: string,
): Promise<boolean> {
  const sanitized = sanitizeToFourChapters(chapters);
  saveDiaryChapters(sanitized);
  await saveToIndexedDB(sanitized);

  try {
    const res = await fetch("/api/public/diary-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(adminPasskey ? { "X-Admin-Passkey": adminPasskey } : {}),
      },
      body: JSON.stringify({ chapters: sanitized }),
    });
    return res.ok;
  } catch {
    return true;
  }
}
