# Palak Tripathi — Developer Portfolio

A personal developer portfolio and interactive digital experience presenting Palak Tripathi's software engineering projects, technical stack, achievements, and creative pursuits.

---

## 🌟 About the Portfolio

This portfolio bridges full-stack engineering with creative design. It highlights technical capabilities, showcases completed applications (including **PRICORA-AI** and **Sentinel AI**), presents verified credentials, and features **Beyond the Code** — an interactive 3D storybook diary reflecting creative passions beyond software development.

### Key Highlights

- **Dynamic Projects Showcase**: Powered by a central data file (`src/data/projects.ts`) supporting live demos, GitHub repositories, demo videos with modal playback, and documentation links.
- **Interactive 3D Diary ("Beyond the Code")**: Seven chapters (My Story, My Talents, My Hobbies, Travel Diaries, My Memories, My Interests, My Little World) with day/night celestial modes and ambient audio.
- **Verified Credentials & Achievements**: Interactive certificate gallery with direct previews and admin management.
- **Meet Palak Intro Experience**: Synchronized video and voice introduction with interactive playback controls and captions.
- **Intelligent AI Assistant**: Visitor chatbot answering questions grounded in Palak's authentic experience, with live multi-provider LLM support (Gemini, OpenAI) and an instant zero-latency local fallback synthesizer.
- **Local Content Management**: Integrated admin modals with file upload support for photographs, certificates, and recordings.

---

## 🛠️ Technology Stack

| Area                        | Technologies                                                                  |
| --------------------------- | ----------------------------------------------------------------------------- |
| **Frontend Framework**      | React 19, TypeScript                                                          |
| **Routing & Architecture**  | TanStack Router, TanStack Start                                               |
| **Styling & Design System** | Tailwind CSS 4, Radix UI primitives, Motion                                   |
| **Icons & Media**           | Lucide React, HTML5 Video & Audio, Web Audio API                              |
| **Build Tool & Server**     | Vite 8, Nitro                                                                 |
| **AI Integration**          | Gemini API, OpenAI API, Streamdown, Zero-latency knowledge synthesis          |
| **Persistence**             | Multi-tier: LocalStorage, IndexedDB, Server filesystem store, Supabase client |
| **Testing**                 | Vitest, Testing Library, jsdom                                                |

---

## 📁 Project Folder Structure

```text
story-in-stills-and-sound-main/
├── public/
│   ├── favicon.svg               # Modern branded SVG favicon
│   ├── favicon.ico               # Fallback legacy favicon
│   ├── assets/                   # Profile portrait, intro video, certificates
│   ├── images/
│   │   └── projects/             # Project screenshots & thumbnails
│   │       ├── pricora-ai/       # PRICORA-AI dashboard image
│   │       └── [project-id]/     # Future project image folders
│   ├── videos/
│   │   └── projects/             # Future project walkthrough videos
│   │       ├── pricora-ai/       # PRICORA-AI video folder
│   │       └── [project-id]/     # Future project video folders
│   └── uploads/
│       └── diary/                # Uploaded personal diary photos & singing videos
├── src/
│   ├── assets/                   # Source asset metadata (.asset.json)
│   ├── components/
│   │   ├── ai-elements/          # Conversational UI primitives
│   │   ├── certificates/         # Certificate cards and admin modal
│   │   ├── chat/                 # PortfolioChat and knowledge manager
│   │   ├── diary/                # 3D diary chapters, cover, and page turners
│   │   ├── projects/             # ProjectCard, ProjectsSection, ProjectVideoModal
│   │   └── ui/                   # Button, dialog, and shared UI primitives
│   ├── data/
│   │   ├── projects.ts           # Central project data source (Add projects here!)
│   │   ├── diary-content.ts      # Diary chapters and personal media entries
│   │   ├── diary-store.json      # Server-persisted diary store
│   │   ├── certificates-content.ts # Verified certificates data
│   │   └── palak-knowledge.json  # Chatbot authentic knowledge base
│   ├── lib/                      # Chat service, audio engine, rate limiters
│   ├── routes/
│   │   ├── __root.tsx            # Root shell, layout, fonts, and metadata
│   │   ├── index.tsx             # Main portfolio page
│   │   └── api/public/           # Chat, store, and upload server endpoints
│   └── styles.css                # Tailwind CSS 4 themes and custom animations
├── .env.example                  # Safe template for environment variables
├── package.json                  # Dependencies and build scripts
└── vite.config.ts                # Vite & TanStack Start configuration
```

---

## 🚀 How to Add a New Project (Easy 2-Step Process)

You do **not** need to edit complex React components to add new projects. Everything is generated automatically from one central data file!

### Step 1: Add Project Assets to `public/`

1. Create a folder named after your project ID under `public/images/projects/<project-id>/`.
2. Save your main screenshot or thumbnail as `dashboard.png` inside that folder:
   ```text
   public/images/projects/my-new-app/dashboard.png
   ```
3. _(Optional)_ If you have a video walkthrough, save it in:
   ```text
   public/videos/projects/my-new-app/demo.mp4
   ```

### Step 2: Add One Entry to `src/data/projects.ts`

Open `src/data/projects.ts` and add your project to the `PROJECTS` array:

```typescript
{
  id: "my-new-app",
  name: "My New Application",
  description: "A concise, professional description of what the project does and its core impact.",
  role: "Full-Stack Developer",
  technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
  thumbnail: "/images/projects/my-new-app/dashboard.png",
  githubUrl: "https://github.com/palak-tripathi/my-new-app",
  liveUrl: "https://my-new-app.vercel.app",
  demoVideoUrl: "/videos/projects/my-new-app/demo.mp4", // Or external YouTube/Vimeo URL
  documentationUrl: "", // Optional
  featured: true,
  highlights: [
    "Key feature or technical architecture highlight",
    "Another notable achievement or metric"
  ],
},
```

That's it! The website will automatically render your new project card with:

- Clickable **GitHub** link
- Clickable **Live Demo** button
- Working **Demo Video** button (opens the video modal without leaving the page)
- Optional **Documentation** button

---

## 💻 Local Development Setup (Windows / PowerShell)

### Prerequisites

- **Node.js**: Version 20.x or higher
- **Package Manager**: `npm` (included with Node.js)
- **Terminal**: Windows PowerShell or VS Code Integrated Terminal

### 1. Open the Project

In PowerShell, navigate to the project directory:

```powershell
cd "c:\Users\HP\Downloads\story-in-stills-and-sound-main (2) - Copy\story-in-stills-and-sound-main"
```

### 2. Configure Environment Variables

Copy `.env.example` to create your local `.env`:

```powershell
Copy-Item .env.example .env
```

_(Optional)_ Add your `GEMINI_API_KEY` or `OPENAI_API_KEY` in `.env` if you want live streaming AI chatbot responses. If left empty, the chatbot will use its built-in local knowledge synthesizer!

### 3. Install Dependencies

```powershell
npm install
```

### 4. Start the Development Server

```powershell
npm run dev
```

Open your browser and navigate to the printed local address (typically `http://localhost:3000` or `http://localhost:8080`).

---

## 🔨 Available Scripts

| Command           | Description                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with hot-reload |
| `npm run build`   | Compiles an optimized production build             |
| `npm run preview` | Previews the production build locally              |
| `npm run lint`    | Runs ESLint across the codebase                    |
| `npm test`        | Runs the Vitest test suite                         |

---

## 🚢 Production Build & Deployment

### Test the Production Build

```powershell
npm run build
```

The build creates optimized server and client bundles in `.output/`.

### Deployment to Vercel or Cloudflare

1. Push your repository to your personal GitHub account (`github.com/palak-tripathi/...`).
2. Connect your repository on [Vercel](https://vercel.com) or your preferred platform.
3. Configure the environment variables from `.env.example` in your deployment project settings.
4. Framework preset: **TanStack Start** / **Vite** with build command `npm run build` and output directory `.output`.

---

## 📬 Contact & Connect

- **Portfolio**: [Palak Tripathi](mailto:palak09.learner@gmail.com)
- **LinkedIn**: [linkedin.com/in/pal-tripathi-](https://linkedin.com/in/pal-tripathi-)
- **Instagram**: [@thepalakvoice](https://www.instagram.com/thepalakvoice/)
- **Email**: [palak09.learner@gmail.com](mailto:palak09.learner@gmail.com)
