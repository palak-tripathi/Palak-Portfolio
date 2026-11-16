/**
 * ===============================================================================
 * PALAK'S SCRAPBOOK DIARY PHOTO MANAGEMENT CONFIGURATION
 * ===============================================================================
 *
 * HOW TO ADD OR CHANGE PHOTOS IN THE FUTURE (Zero-Code Backend Pipeline):
 *
 * 1. Drop your new image file directly into the folder:
 *    👉 public/files/
 *    (e.g., public/files/my-new-photo.jpg)
 *
 * 2. Update the filename in this file below, OR simply replace the existing image
 *    with the same name!
 *
 * 3. Save! Your photo will automatically show up in the diary spreads with:
 *    - 3D Polaroid frame / washi tape styling
 *    - Ethereal floating neon drop-shadows
 *    - Interactive click-to-zoom (up to 350% magnification)
 * ===============================================================================
 */

export interface DiaryPhotoSlot {
  id: string;
  label: string;
  chapter: string;
  filePath: string;
  caption: string;
}

export const DIARY_PHOTOS = {
  // ---------------------------------------------------------------------------
  // CHAPTER 1: MY STORY (Tech & Code Inception)
  // ---------------------------------------------------------------------------
  laptopWorkspace: "/files/laptop-desk.jpg",
  codeJourney: "/files/campus-memories.jpg",

  // ---------------------------------------------------------------------------
  // CHAPTER 2: MY TALENTS (Singing, Acoustic Vibrations & Instruments)
  // ---------------------------------------------------------------------------
  acousticGuitar: "/files/acoustic-guitar.jpg",
  vinylTurntable: "/files/vinyl-turntable.jpg",

  // ---------------------------------------------------------------------------
  // CHAPTER 3: TRAVEL DIARIES (Wanderlust, Temples, Lakes & Forest Deer)
  // ---------------------------------------------------------------------------
  tamilNaduTemple: "/files/tamil-nadu-temple.png",
  bhopalUpperLake: "/files/bhopal-lake.png",
  pachmarhiHills: "/files/pachmarhi-hills.jpg",
  forestWildDeer: "/files/forest-deer.png",
  waterfallPool: "/files/waterfall-pool.jpg",
  southIndianFeast: "/files/south-indian-feast.jpg",

  // ---------------------------------------------------------------------------
  // CHAPTER 4: MY DRAWINGS & ART NOOK
  // ---------------------------------------------------------------------------
  cottageDrawing: "/files/cottage-drawing.png",
  wildflowersSketch: "/files/wildflowers-sketch.png",
  chibiDoodle: "/files/chibi-doodle.png",
  charcoalSketch: "/files/charcoal-sketch.jpg",
  watercolorPalette: "/files/watercolor-palette.jpg",

  // ---------------------------------------------------------------------------
  // CHAPTER 5: MY MEMORIES (College Life, SIRT Bhopal, Canteen Chai)
  // ---------------------------------------------------------------------------
  campusLife: "/files/campus-memories.jpg",
  canteenChai: "/files/canteen-discussions.jpg",
  graduationMilestone: "/files/graduation-milestone.jpg",

  // ---------------------------------------------------------------------------
  // CHAPTER 6: MY HOBBIES (Acoustic Jamming, Chai Brew & Warmth)
  // ---------------------------------------------------------------------------
  masalaChaiBrew: "/files/masala-chai.jpg",

  // ---------------------------------------------------------------------------
  // CHAPTER 7: MY INTERESTS & BOOKS (Library Stacks & Creative Notebooks)
  // ---------------------------------------------------------------------------
  vintageLibrary: "/files/vintage-library.jpg",
  readingCoffee: "/files/reading-coffee.jpg",
  designJournal: "/files/design-journal.jpg",
} as const;

/**
 * Returns a safe photo path from /files/ or fallback.
 */
export function getDiaryPhoto(key: keyof typeof DIARY_PHOTOS, fallback?: string): string {
  return DIARY_PHOTOS[key] || fallback || "/files/laptop-desk.jpg";
}
