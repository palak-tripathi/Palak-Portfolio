# 📸 How to Easily Add & Replace Diary Photos (Zero-Code Guide)

Yeh guide aapko batati hai ki kaise aap **bina kisi code change ke**, sirf photo paste karke apni diary ki photos change ya add kar sakte ho!

---

## ⚡ Method 1: The Easiest Way (Direct File Replace)

Sabse asaan tareeqa yeh hai ki aap `/public/files/` folder mein purani photo ko apni nayi photo se replace kar dein (same file name ke sath):

1. **Folder Open Karein**:
   ```
   story-in-stills-and-sound-main/public/files/
   ```
2. **File Replace Karein**:
   - Agar aapko **Laptop/Coding** photo badalni hai: Apni photo ka naam `laptop-desk.jpg` rakhkar `public/files/` mein paste kar dein.
   - Agar aapko **Guitar** photo badalni hai: Apni photo ka naam `acoustic-guitar.jpg` rakhkar paste kar dein.
   - Agar aapko **Bhopal Lake** photo badalni hai: `bhopal-lake.png` ko replace kar dein.
   - Agar aapko **Temple** photo badalni hai: `tamil-nadu-temple.png` ko replace kar dein.
   - Agar aapko **Drawing** photo badalni hai: `cottage-drawing.png` ya `wildflowers-sketch.png` ko replace kar dein.
3. **Done!** Browser mein page reload karein, nayi photo automatically Polaroid frame mein glowing shadow ke sath dikhne lagegi!

---

## 🎨 Method 2: Adding a Brand New Photo with Custom Name

Agar aap apni photo ka koi naya naam rakhna chahte hain (e.g. `my-trip.jpg`):

1. Apni photo ko `public/files/` folder mein paste karein (e.g., `public/files/my-trip.jpg`).
2. `src/config/diaryPhotos.ts` file open karein.
3. Us category ke samne apna filename update kar dein:
   ```typescript
   tamilNaduTemple: "/files/my-trip.jpg",
   ```
4. File save karein — aapki nayi photo instantly live ho jayegi!

---

## 📂 Current Image Slots in `/public/files/`

| Chapter                  | Slot Key              | Current File               | Theme                         |
| :----------------------- | :-------------------- | :------------------------- | :---------------------------- |
| **Chapter 1: Story**     | `laptopWorkspace`     | `laptop-desk.jpg`          | First code workspace & laptop |
| **Chapter 2: Talents**   | `acousticGuitar`      | `acoustic-guitar.jpg`      | Acoustic guitar & music       |
| **Chapter 2: Talents**   | `vinylTurntable`      | `vinyl-turntable.jpg`      | Vinyl record player           |
| **Chapter 3: Travel**    | `tamilNaduTemple`     | `tamil-nadu-temple.png`    | Temple gopuram                |
| **Chapter 3: Travel**    | `bhopalUpperLake`     | `bhopal-lake.png`          | Upper Lake golden sunset      |
| **Chapter 3: Travel**    | `pachmarhiHills`      | `pachmarhi-hills.jpg`      | Satpura misty hills           |
| **Chapter 3: Travel**    | `forestWildDeer`      | `forest-deer.png`          | Enchanted forest deer         |
| **Chapter 3: Travel**    | `waterfallPool`       | `waterfall-pool.jpg`       | Natural waterfall             |
| **Chapter 3: Travel**    | `southIndianFeast`    | `south-indian-feast.jpg`   | Dosa & filter coffee feast    |
| **Chapter 4: Drawings**  | `cottageDrawing`      | `cottage-drawing.png`      | Cozy cottage ink & pencil     |
| **Chapter 4: Drawings**  | `wildflowersSketch`   | `wildflowers-sketch.png`   | Botanical floral study        |
| **Chapter 4: Drawings**  | `chibiDoodle`         | `chibi-doodle.png`         | Cute chibi girl doodle        |
| **Chapter 4: Drawings**  | `charcoalSketch`      | `charcoal-sketch.jpg`      | Charcoal monochrome art       |
| **Chapter 4: Drawings**  | `watercolorPalette`   | `watercolor-palette.jpg`   | Artist easel & palette        |
| **Chapter 5: Memories**  | `campusLife`          | `campus-memories.jpg`      | SIRT Bhopal campus life       |
| **Chapter 5: Memories**  | `canteenChai`         | `canteen-discussions.jpg`  | College canteen discussions   |
| **Chapter 5: Memories**  | `graduationMilestone` | `graduation-milestone.jpg` | Convocation milestone         |
| **Chapter 6: Hobbies**   | `masalaChaiBrew`      | `masala-chai.jpg`          | Steaming masala chai brew     |
| **Chapter 7: Interests** | `vintageLibrary`      | `vintage-library.jpg`      | Bookshelf & study nook        |
| **Chapter 7: Interests** | `readingCoffee`       | `reading-coffee.jpg`       | Hardcover book & coffee       |
| **Chapter 7: Interests** | `designJournal`       | `design-journal.jpg`       | Handcrafted notebook          |

---

## 🚀 How to Run Locally & Push to GitHub

### 1. Locally Run in VS Code:

```bash
npm run dev
```

Open **`http://localhost:3000/`** in your browser.

### 2. Push Changes to GitHub:

```bash
git add .
git commit -m "update: added new photos to diary"
git push origin main
```
