export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  technologies: string[];
  thumbnail: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  documentationUrl?: string;
  featured?: boolean;
  highlights?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "pricora-ai",
    name: "PRICORA-AI",
    description:
      "An AI-powered content and marketing intelligence suite engineered to generate optimized product copy, pricing insights, and high-converting campaign assets with advanced AI models.",
    role: "Full-Stack Developer & Creator",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "AI / LLM APIs", "Vite"],
    thumbnail: "/images/projects/pricora-ai/dashboard.png",
    screenshots: ["/images/projects/pricora-ai/dashboard.png"],
    githubUrl: "https://github.com/palak-tripathi/pricora-ai-content-generator",
    liveUrl: "https://pricora-ai-content-generator.vercel.app",
    demoVideoUrl: "", // Available for future local demo.mp4 or YouTube link
    documentationUrl: "",
    featured: true,
    highlights: [
      "AI-driven content and marketing copy generator",
      "Dynamic pricing strategy intelligence and product copy optimization",
      "Clean, modern responsive dashboard with instant generation workflows",
      "Robust client-side error handling and fast API response streaming",
    ],
  },
  {
    id: "sentinel-ai",
    name: "Sentinel AI",
    description:
      "Intelligent AI-assisted security and automated monitoring dashboard featuring real-time telemetry, threat alerts, and modular analytics widgets.",
    role: "Frontend Architecture & API Integration Lead",
    technologies: ["React", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS", "AI Analytics"],
    thumbnail: "", // Fallback badge rendered if thumbnail is empty
    githubUrl: "https://github.com/palak-tripathi",
    liveUrl: "",
    demoVideoUrl: "",
    documentationUrl: "",
    featured: true,
    highlights: [
      "Real-time event feed and threat level telemetry visualization",
      "Modular dashboard cards with high-contrast data visualization",
      "Asynchronous alerting and filterable incident history",
      "Robust REST API integration with real-time push events",
    ],
  },
  {
    id: "story-in-stills-and-sound",
    name: "Story in Stills & Sound",
    description:
      "An interactive developer portfolio combining modern full-stack web engineering with an acoustic Web Audio synthesizer, 3D animated diary, and AI chatbot.",
    role: "Solo Creator & Full-Stack Developer",
    technologies: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "Tailwind CSS 4",
      "Web Audio API",
      "Motion",
    ],
    thumbnail: "/assets/palak-portrait.jpg",
    githubUrl: "https://github.com/palak-tripathi",
    liveUrl: "#top",
    demoVideoUrl: "/assets/palak-intro.mp4",
    documentationUrl: "",
    featured: true,
    highlights: [
      "Full-screen 1-2-3 cinematic countdown splash intro",
      "Handcrafted 3D storybook with realistic paper turn physics and ambient sparkles",
      "Pure Web Audio API acoustic piano synthesizer with chord progressions",
      "Day and Night Mode with starlit celestial parchment and moonlit effects",
      "Intelligent conversational AI chatbot with dynamic knowledge updates",
    ],
  },
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
