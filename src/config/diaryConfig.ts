/**
 * =========================================================================
 * DIARY CONFIGURATION PIPELINE (Zero-Code Backend Asset System)
 * =========================================================================
 * Place any image inside /public/files/ and configure it here.
 * Handles page mapping, captions, glow intensity, and rotation angles
 * dynamically without touching component layouts!
 */

export interface DiaryPolaroidConfig {
  id: string;
  file: string; // Filename located inside /public/files/
  title: string;
  caption: string;
  description: string;
  location?: string;
  date?: string;
  glowColor: string;
  glowIntensity: "soft" | "medium" | "vibrant";
  rotation: number; // in degrees, e.g. -1.5, 2, -2
  frameType: "polaroid" | "gilded" | "postmark" | "washi-tape" | "sketchbook";
  tags: string[];
}

export interface DiarySectionConfig {
  id: "journey" | "music" | "travel" | "art-books";
  label: string;
  badge: string;
  emoji: string;
  themeColor: string;
  neonAccent: string;
  terminalCode: {
    filename: string;
    language: string;
    snippet: string[];
    logs: string[];
  };
  floating3DIcons: Array<{
    id: string;
    icon: string;
    label: string;
    animation: "float" | "pulse" | "spin-slow" | "bounce-slow";
    position: string;
  }>;
  handwrittenStanza: {
    quote: string;
    author: string;
    marginalia: string;
  };
  diorama: {
    type: "cpu-timeline" | "neon-audio" | "scooter-map" | "books-easel";
    title: string;
    props: {
      chipTitle?: string;
      college?: string;
      course?: string;
      milestones?: Array<{ year: string; title: string; note: string }>;
      chords?: string[];
      tempo?: string;
      vibe?: string;
      stops?: Array<{ name: string; detail: string }>;
      books?: Array<{ title: string; author: string; spineColor: string }>;
    };
  };
  frames: DiaryPolaroidConfig[];
}

export const DIARY_CONFIG: {
  ambientFloatingIcons: Array<{ icon: string; size: string; delay: string; pos: string }>;
  sections: Record<string, DiarySectionConfig>;
} = {
  ambientFloatingIcons: [
    { icon: "⚡", size: "text-lg", delay: "animate-float", pos: "top-8 left-4" },
    { icon: "♫", size: "text-base", delay: "animate-pulse", pos: "top-14 right-8" },
    { icon: "🛵", size: "text-xl", delay: "animate-bounce-slow", pos: "bottom-12 left-8" },
    { icon: "🎨", size: "text-lg", delay: "animate-float", pos: "bottom-16 right-6" },
    { icon: "📖", size: "text-base", delay: "animate-pulse", pos: "top-1/2 left-2" },
    { icon: "🌸", size: "text-sm", delay: "animate-spin-slow", pos: "top-1/3 right-3" },
  ],
  sections: {
    journey: {
      id: "journey",
      label: "My Journey",
      badge: "Tech & Life Timeline",
      emoji: "💻",
      themeColor: "#06b6d4",
      neonAccent: "rgba(6, 182, 212, 0.65)",
      terminalCode: {
        filename: "my_journey.sh",
        language: "bash",
        snippet: [
          "#!/bin/bash",
          "# Palak Tripathi's Tech Inception",
          "echo '>> Initializing Neural Core & CSBS Stack...'",
          "engineer --name 'Palak Tripathi' --degree 'B.Tech CSBS'",
          "git commit -m 'feat: Hello World! Ready to build 🚀'",
          "./deploy_pricora_ai.sh --env production",
        ],
        logs: [
          "PalakOS v2.4 booted in 11ms.",
          "SIRT Bhopal Campus linked (CSBS 2026).",
          "PRICORA-AI intelligence engine: ONLINE.",
          "✨ Status: 100% production ready.",
        ],
      },
      floating3DIcons: [
        {
          id: "cpu",
          icon: "🧠",
          label: "Neural Chip",
          animation: "pulse",
          position: "top-4 left-6",
        },
        {
          id: "backpack",
          icon: "🎒",
          label: "Campus Life",
          animation: "bounce-slow",
          position: "top-6 right-10",
        },
        {
          id: "gradcap",
          icon: "🎓",
          label: "B.Tech CSBS",
          animation: "float",
          position: "bottom-6 left-12",
        },
        {
          id: "terminal",
          icon: "⚡",
          label: "Compiled Live",
          animation: "pulse",
          position: "bottom-6 right-10",
        },
      ],
      handwrittenStanza: {
        quote:
          "Every line of code and every late-night terminal build was a step toward building something meaningful ♡",
        author: "~ Palak Tripathi",
        marginalia: "✎ 'SIRT College, Bhopal • late night coffee & logic'",
      },
      diorama: {
        type: "cpu-timeline",
        title: "3D Silicon Timeline & SIRT Campus Inception",
        props: {
          chipTitle: "PALAK-AI CORE v2.4",
          college: "SIRT Bhopal, Madhya Pradesh",
          course: "Computer Science & Business Systems",
          milestones: [
            { year: "2024", title: "CSBS Induction", note: "Algorithm foundations" },
            { year: "2025", title: "PRICORA-AI Engine", note: "Dynamic pricing scrapers" },
            { year: "2026", title: "Global Web & UI Craft", note: "Interactive 3D portfolios" },
          ],
        },
      },
      frames: [
        {
          id: "journey-laptop",
          file: "laptop-desk.jpg",
          title: "Where My Journey Began · Studio Desk",
          caption:
            "A cozy aesthetic desk glowing with late-night terminal code. The spark of 'Hello World'.",
          description:
            "Palak's inception into Computer Science and Business Systems: combining creative curiosity with full-stack engineering logic.",
          location: "Studio Desk, SIRT Bhopal",
          date: "CSBS Inception",
          glowColor: "rgba(6, 182, 212, 0.55)",
          glowIntensity: "vibrant",
          rotation: -1.5,
          frameType: "polaroid",
          tags: ["HelloWorld", "MacBook", "ChaiAndLogic", "CSBS"],
        },
        {
          id: "journey-campus",
          file: "campus-memories.jpg",
          title: "SIRT Campus Lawns & Technical Cohort",
          caption:
            "Sunny afternoons between lectures debating tech stacks and architecting systems.",
          description:
            "Formal engineering studies at SIRT Bhopal, building analytical foundations and scalable architectures.",
          location: "SIRT Campus, Bhopal",
          date: "B.Tech Journey",
          glowColor: "rgba(14, 165, 233, 0.45)",
          glowIntensity: "medium",
          rotation: 1.5,
          frameType: "washi-tape",
          tags: ["SIRT", "CampusLife", "Engineering", "Friendships"],
        },
        {
          id: "journey-graduation",
          file: "graduation-milestone.jpg",
          title: "Academic Milestones & Software Triumphs",
          caption: "The triumph of shipping real, live software after endless hours of dedication.",
          description:
            "Celebrating triumphs, presentations, and engineering milestones with the entire cohort.",
          location: "Convocation Hall",
          date: "Milestone Triumph",
          glowColor: "rgba(99, 102, 241, 0.5)",
          glowIntensity: "vibrant",
          rotation: -1,
          frameType: "gilded",
          tags: ["Graduation", "Milestones", "Triumph", "Future"],
        },
      ],
    },
    music: {
      id: "music",
      label: "Music Talent Wall",
      badge: "Acoustic & Singing Melodies",
      emoji: "🎸",
      themeColor: "#f43f5e",
      neonAccent: "rgba(244, 63, 94, 0.65)",
      terminalCode: {
        filename: "acoustic_session.rb",
        language: "ruby",
        snippet: [
          "# Palak's Melody Studio",
          "live_loop :acoustic_harmonies do",
          "  use_synth :acoustic_guitar",
          "  play_chord [:E4, :G4, :B4, :D5], amp: 1.2",
          "  sleep 1.0",
          "  sample :vocals_soft_reverb",
          "end",
        ],
        logs: [
          "Stereo mic calibration: 96kHz / 24-bit.",
          "Pink neon waveform: REAL-TIME ACTIVE.",
          "Recording: Romantic Acoustic Sessions.",
          "✨ Pure vocal harmony live on tape.",
        ],
      },
      floating3DIcons: [
        {
          id: "mic",
          icon: "🎙️",
          label: "Studio Mic",
          animation: "pulse",
          position: "top-4 left-8",
        },
        {
          id: "cassette",
          icon: "📼",
          label: "Lo-Fi Tape",
          animation: "bounce-slow",
          position: "top-6 right-8",
        },
        {
          id: "guitar",
          icon: "🎸",
          label: "Six Strings",
          animation: "float",
          position: "bottom-6 left-10",
        },
        {
          id: "notes",
          icon: "♫",
          label: "Harmonies",
          animation: "spin-slow",
          position: "bottom-6 right-10",
        },
      ],
      handwrittenStanza: {
        quote:
          "Where logic softens into melody: unplugged guitar chords and heartfelt vocal covers ♡",
        author: "~ Palak Tripathi",
        marginalia: "✎ 'Six strings, warm tea, and pure acoustic solace'",
      },
      diorama: {
        type: "neon-audio",
        title: "Acoustic Guitar Diorama & Neon Audio Waveforms",
        props: {
          chords: ["Em7", "Cadd9", "G", "Dsus4"],
          tempo: "78 BPM",
          vibe: "Warm Unplugged Acoustics",
        },
      },
      frames: [
        {
          id: "music-guitar",
          file: "acoustic-guitar.jpg",
          title: "Six Strings & Sunlit Acoustic Chords",
          caption:
            "When screens go dim, acoustic melodies take over. Unplugged chords and vocal therapy.",
          description:
            "Singing and playing guitar is where logic softens into melodic warmth. Unwinding with favorite acoustic covers.",
          location: "Studio Nook",
          date: "Acoustic Rituals",
          glowColor: "rgba(244, 63, 94, 0.55)",
          glowIntensity: "vibrant",
          rotation: -2,
          frameType: "polaroid",
          tags: ["AcousticGuitar", "MusicTherapy", "Unplugged"],
        },
        {
          id: "music-vinyl",
          file: "vinyl-turntable.jpg",
          title: "Vintage Vinyl Turntable & Lo-Fi Sessions",
          caption:
            "The rhythmic crackle of classic records spinning on the turntable, filling quiet evenings.",
          description:
            "Collecting vintage vinyl records, studying acoustic production, and relaxing to soothing melodies.",
          location: "Listening Corner",
          date: "Side A · Unplugged",
          glowColor: "rgba(251, 113, 133, 0.5)",
          glowIntensity: "medium",
          rotation: 1.5,
          frameType: "gilded",
          tags: ["VinylRecords", "LoFiVibes", "WarmAcoustics"],
        },
        {
          id: "music-chai",
          file: "masala-chai.jpg",
          title: "Steaming Kulhad Chai & Music Breaks",
          caption:
            "Fresh ginger, crushed cardamom, and quiet pauses before diving back into singing practice.",
          description:
            "Traditional clay kulhad chai brewing — the essential cozy ritual that powers every creative breakthrough.",
          location: "Tea Garden Nook",
          date: "Evening Ritual",
          glowColor: "rgba(245, 158, 11, 0.5)",
          glowIntensity: "soft",
          rotation: -1,
          frameType: "washi-tape",
          tags: ["ChaiRituals", "Warmth", "Mindfulness"],
        },
      ],
    },
    travel: {
      id: "travel",
      label: "Travel & Adventure",
      badge: "Wanderlust Scrapbook",
      emoji: "🛵",
      themeColor: "#10b981",
      neonAccent: "rgba(16, 185, 129, 0.65)",
      terminalCode: {
        filename: "wanderlust_route.py",
        language: "python",
        snippet: [
          "# Automated Scooter Travel Route",
          "route = ['Bhopal Upper Lake', 'Pachmarhi Peaks', 'Tamil Nadu Temples']",
          "for stop in route:",
          "    scooter.navigate(stop, speed='scenic_cruise')",
          "    capture_polaroid(sunset_mode=True)",
          "print('✨ Collected sunsets stored in scrapbook.')",
        ],
        logs: [
          "GPS Coordinates locked: Satpura & Nilgiris.",
          "Scooter Rider: Palak (Retro Pastel Green Scooty).",
          "Speed: 35 km/h scenic breeze.",
          "✨ Dhoopgarh peak reached: 1,352m altitude.",
        ],
      },
      floating3DIcons: [
        {
          id: "scooter",
          icon: "🛵",
          label: "Green Scooter",
          animation: "bounce-slow",
          position: "top-4 left-6",
        },
        {
          id: "compass",
          icon: "🧭",
          label: "Vintage Compass",
          animation: "spin-slow",
          position: "top-6 right-8",
        },
        {
          id: "camera",
          icon: "📷",
          label: "35mm Camera",
          animation: "pulse",
          position: "bottom-6 left-12",
        },
        {
          id: "passport",
          icon: "🛂",
          label: "Travel Permits",
          animation: "float",
          position: "bottom-6 right-8",
        },
      ],
      handwrittenStanza: {
        quote:
          "To travel is to collect golden sunsets, mountain breezes, and keep them between paper pages ♡",
        author: "~ Palak Tripathi",
        marginalia: "✎ 'Pachmarhi ravines to Madurai temple gopurams'",
      },
      diorama: {
        type: "scooter-map",
        title: "Interactive Scooter Travel Route on 3D Aesthetic Map",
        props: {
          stops: [
            { name: "Upper Lake, Bhopal", detail: "Golden light water ripples" },
            { name: "Pachmarhi Highlands", detail: "Misty peaks & Bee Falls" },
            { name: "Tamil Nadu", detail: "Dravidian temple gopurams" },
          ],
        },
      },
      frames: [
        {
          id: "travel-bhopal",
          file: "bhopal-lake.png",
          title: "Golden Hour Over Upper Lake, Bhopal",
          caption:
            "Sunsets are proof that endings can often be beautiful too. Golden light reflecting across calm waters.",
          description:
            "Bhopal Upper Lake bathed in golden hour light, reflecting serene ripples and calm breezes.",
          location: "Upper Lake, Bhopal",
          date: "Golden Afternoon",
          glowColor: "rgba(245, 158, 11, 0.55)",
          glowIntensity: "vibrant",
          rotation: -1.5,
          frameType: "postmark",
          tags: ["Bhopal", "UpperLake", "GoldenHour", "Reflections"],
        },
        {
          id: "travel-tamilnadu",
          file: "tamil-nadu-temple.png",
          title: "Tamil Nadu Temple Gopuram & Nilgiri Hills",
          caption:
            "Intricate Dravidian stone carvings standing tall against misty lush hills in golden hour light.",
          description:
            "Historic temple architecture framed by winding scenic hill roads and soft spiritual warmth.",
          location: "Tamil Nadu, South India",
          date: "Spiritual Wanderings",
          glowColor: "rgba(16, 185, 129, 0.5)",
          glowIntensity: "vibrant",
          rotation: 1.5,
          frameType: "postmark",
          tags: ["TamilNadu", "TempleGopuram", "Nilgiris", "Dravidian"],
        },
        {
          id: "travel-pachmarhi",
          file: "pachmarhi-hills.jpg",
          title: "Dhoopgarh Sunset · Satpura's Highest Peak",
          caption:
            "Standing atop Satpura at 1,352m watching the golden sun sink into a sea of misty valleys.",
          description:
            "The crowning jewel of Pachmarhi highlands — panoramic vista where dusk paints the entire horizon.",
          location: "Dhoopgarh Peak, Pachmarhi",
          date: "Highland Sunset",
          glowColor: "rgba(20, 184, 166, 0.55)",
          glowIntensity: "vibrant",
          rotation: -2,
          frameType: "polaroid",
          tags: ["Pachmarhi", "Dhoopgarh", "Satpura", "Highlands"],
        },
        {
          id: "travel-forest-deer",
          file: "forest-deer.png",
          title: "The Enchanted Forest & Wild Deer",
          caption:
            "Sunbeams filtering through emerald canopies, mossy roots, and a gentle wild deer watching peacefully.",
          description:
            "Magical forest sanctuary bathed in dappled morning light and peaceful forest whispers.",
          location: "Woodland Sanctuary",
          date: "Enchanted Morning",
          glowColor: "rgba(34, 197, 94, 0.5)",
          glowIntensity: "medium",
          rotation: 1,
          frameType: "polaroid",
          tags: ["EnchantedWoods", "WildDeer", "Sunbeams", "Sanctuary"],
        },
        {
          id: "travel-dosa",
          file: "south-indian-feast.jpg",
          title: "Authentic Crispy Masala Dosa Feast",
          caption:
            "Golden roasted ghee dosa on fresh banana leaf paired with coconut chutney and hot sambar.",
          description:
            "Traditional breakfast in Madurai — crispy wafer crust, aromatic potato masala, and rich heritage flavors.",
          location: "Heritage Mess, Madurai",
          date: "Food Trails",
          glowColor: "rgba(217, 119, 6, 0.45)",
          glowIntensity: "soft",
          rotation: -1,
          frameType: "washi-tape",
          tags: ["MasalaDosa", "BananaLeaf", "HeritageTaste"],
        },
      ],
    },
    "art-books": {
      id: "art-books",
      label: "Drawing & Reading",
      badge: "Art Atelier & Book Nook",
      emoji: "🎨",
      themeColor: "#8b5cf6",
      neonAccent: "rgba(139, 92, 246, 0.65)",
      terminalCode: {
        filename: "creative_canvas.art",
        language: "javascript",
        snippet: [
          "// Palak's Creative Sketchbook",
          "const palette = ['Raw Sienna', 'Cobalt Blue', 'Sap Green'];",
          "const library = ['Clean Code', 'Ikigai', 'Subconscious Mind'];",
          "canvas.render({ medium: 'Graphite & Watercolor', flow: 'Deep Focus' });",
          "console.log('✨ Imagination made tangible on textured paper.');",
        ],
        logs: [
          "Brush pressure: 0.42N soft sable touch.",
          "Paper texture: 300gsm cold-pressed cotton.",
          "Currently Reading: Ikigai & The Power of Subconscious Mind.",
          "✨ Botanical wildflowers sketch rendered.",
        ],
      },
      floating3DIcons: [
        {
          id: "palette",
          icon: "🎨",
          label: "Paint Palette",
          animation: "pulse",
          position: "top-4 left-6",
        },
        {
          id: "pen",
          icon: "✒️",
          label: "Calligraphy Pen",
          animation: "bounce-slow",
          position: "top-6 right-8",
        },
        {
          id: "book",
          icon: "📖",
          label: "Hardcover Book",
          animation: "float",
          position: "bottom-6 left-10",
        },
        {
          id: "easel",
          icon: "🖌️",
          label: "Watercolor Easel",
          animation: "spin-slow",
          position: "bottom-6 right-8",
        },
      ],
      handwrittenStanza: {
        quote:
          "Drawing is putting a piece of your imagination into something tangible; reading is peering into another soul ♡",
        author: "~ Palak Tripathi",
        marginalia: "✎ 'Ikigai, Clean Code, and watercolor wildflower washes'",
      },
      diorama: {
        type: "books-easel",
        title: "3D Stacked Hardcover Books & Watercolor Easel Diorama",
        props: {
          books: [
            { title: "Clean Code", author: "Robert C. Martin", spineColor: "#1e3a8a" },
            { title: "Ikigai", author: "Héctor García", spineColor: "#dc2626" },
            {
              title: "The Power of Your Subconscious Mind",
              author: "Joseph Murphy",
              spineColor: "#7c3aed",
            },
            { title: "Atomic Habits", author: "James Clear", spineColor: "#d97706" },
          ],
        },
      },
      frames: [
        {
          id: "art-cottage",
          file: "cottage-drawing.png",
          title: "Cozy Countryside Cottage Architecture Sketch",
          caption:
            "A realistic colored pencil sketch of a peaceful countryside cottage with flower boxes on windows.",
          description:
            "Detailed handmade architectural sketch featuring floral garden trellises, pitched roofs, and stone pathways.",
          location: "Palak's Sketchbook",
          date: "Pencil & Ink",
          glowColor: "rgba(139, 92, 246, 0.55)",
          glowIntensity: "vibrant",
          rotation: -1.5,
          frameType: "sketchbook",
          tags: ["CottageSketch", "PencilArt", "FlowerBoxes", "Architecture"],
        },
        {
          id: "art-wildflowers",
          file: "wildflowers-sketch.png",
          title: "Botanical Wildflower Studies on Cream Paper",
          caption:
            "Handmade botanical study of pressed lavender, daisies, and sage leaves with soft colored pencil strokes.",
          description:
            "Realistic colored pencil illustrations of wildflowers on textured vintage cream paper.",
          location: "Botanical Journal",
          date: "Botanical Study",
          glowColor: "rgba(236, 72, 153, 0.5)",
          glowIntensity: "vibrant",
          rotation: 1.5,
          frameType: "sketchbook",
          tags: ["BotanicalArt", "ColoredPencil", "PressedFlowers"],
        },
        {
          id: "art-library",
          file: "vintage-library.jpg",
          title: "Vintage Stacked Books & Deep Reading Nook",
          caption:
            "Immersed in timeless volumes: Ikigai, Clean Code, and the psychology of creativity.",
          description:
            "Exploring engineering literature, architectural theory, and philosophy in quiet study corners.",
          location: "Library Nook",
          date: "Curated Shelf",
          glowColor: "rgba(168, 85, 247, 0.5)",
          glowIntensity: "medium",
          rotation: -1,
          frameType: "gilded",
          tags: ["Ikigai", "SubconsciousMind", "ReadingNook", "Philosophy"],
        },
        {
          id: "art-charcoal",
          file: "charcoal-sketch.jpg",
          title: "Expressive Graphite & Charcoal Study",
          caption:
            "Exploring shadow gradients, high-contrast textures, and raw expressive pencil lines.",
          description:
            "Hand-drawn studio study focusing on light diffusion, tonal transitions, and cross-hatch shading.",
          location: "Studio Easel",
          date: "Charcoal & 6B",
          glowColor: "rgba(120, 113, 108, 0.5)",
          glowIntensity: "soft",
          rotation: 2,
          frameType: "polaroid",
          tags: ["CharcoalStudy", "GraphiteArt", "FineArt"],
        },
        {
          id: "art-coffee",
          file: "reading-coffee.jpg",
          title: "Morning Chapters & Fresh Roast Ritual",
          caption: "Starting the day with fifty pages before the first line of code is written.",
          description:
            "Daily reading habits covering Clean Code, system design, and personal development.",
          location: "Morning Desk",
          date: "Daily Habit",
          glowColor: "rgba(245, 158, 11, 0.45)",
          glowIntensity: "soft",
          rotation: -1.5,
          frameType: "washi-tape",
          tags: ["CoffeeAndBooks", "MorningHabits", "Focus"],
        },
      ],
    },
  },
};
