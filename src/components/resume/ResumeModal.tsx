import { useState } from "react";
import {
  Download,
  Eye,
  ExternalLink,
  Printer,
  FileText,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "pdf">("interactive");

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Palak_Tripathi_Resume.pdf";
    link.download = "Palak_Tripathi_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open("/Palak_Tripathi_Resume.pdf", "_blank", "noopener,noreferrer");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/95 px-5 py-3.5 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold leading-tight">
                Palak Tripathi · Resume
              </h2>
              <p className="text-xs text-muted-foreground">
                Aspiring Full-Stack Developer · CSBS @ SIRT Bhopal
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="hidden sm:inline-flex rounded-lg border border-border bg-muted/50 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={`rounded-md px-2.5 py-1 font-semibold transition ${
                  activeTab === "interactive"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Interactive
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pdf")}
                className={`rounded-md px-2.5 py-1 font-semibold transition ${
                  activeTab === "pdf"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                PDF View
              </button>
            </div>

            {/* Direct Download Button */}
            <Button
              size="sm"
              onClick={handleDownload}
              className="rounded-full bg-brand font-semibold text-primary-foreground shadow-sm transition hover:scale-105"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> Download PDF
            </Button>

            {/* Open in New Tab Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenNewTab}
              className="hidden sm:inline-flex rounded-full"
              title="Open PDF in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition"
              title="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-muted/20">
          {activeTab === "pdf" ? (
            /* Embedded PDF Object / Iframe */
            <div className="w-full h-[70vh] rounded-2xl overflow-hidden border border-border bg-white shadow-inner">
              <object
                data="/Palak_Tripathi_Resume.pdf#toolbar=1&navpanes=0"
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="font-semibold text-base mb-2">PDF Preview Unavailable</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your browser does not support inline PDF viewing.
                  </p>
                  <Button onClick={handleDownload} className="rounded-full">
                    <Download className="mr-2 h-4 w-4" /> Download Resume PDF
                  </Button>
                </div>
              </object>
            </div>
          ) : (
            /* Pixel-Perfect High-Fidelity ATS Resume View */
            <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6 sm:p-10 text-stone-900 dark:text-stone-100 shadow-xl font-sans">
              {/* Header */}
              <div className="text-center pb-5 border-b border-stone-200 dark:border-stone-800">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950 dark:text-white">
                  PALAK TRIPATHI
                </h1>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-sky-800 dark:text-sky-400">
                  Aspiring Full-Stack Developer | API Integration | AI-Enabled Web Applications
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-stone-600 dark:text-stone-300">
                  <a
                    href="tel:+917440608049"
                    className="inline-flex items-center gap-1 hover:text-sky-700 dark:hover:text-sky-300 transition"
                  >
                    <Phone className="h-3 w-3" /> +91 74406 08049
                  </a>
                  <span>|</span>
                  <a
                    href="mailto:palak09.learner@gmail.com"
                    className="inline-flex items-center gap-1 hover:text-sky-700 dark:hover:text-sky-300 transition"
                  >
                    <Mail className="h-3 w-3" /> palak09.learner@gmail.com
                  </a>
                  <span>|</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Bhopal, M.P.
                  </span>
                  <span>|</span>
                  <a
                    href="https://linkedin.com/in/pal-tripathi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sky-700 dark:text-sky-400 underline hover:opacity-80 transition"
                  >
                    <Linkedin className="h-3 w-3" /> linkedin.com/in/pal-tripathi
                  </a>
                </div>
              </div>

              {/* Education */}
              <div className="mt-6">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-900 dark:text-white pb-1 border-b border-stone-800 dark:border-stone-300">
                  EDUCATION
                </h2>
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between font-bold text-xs sm:text-sm">
                      <span className="text-stone-900 dark:text-white">
                        Sagar Institute of Research & Technology (SIRT), Bhopal
                      </span>
                      <span className="font-mono text-xs opacity-80">2023 – 2027 (Expected)</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300">
                      B.Tech in Computer Science & Business Systems (CSBS) |{" "}
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        CGPA: 7.56/10
                      </span>
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-baseline justify-between font-bold text-xs sm:text-sm">
                      <span className="text-stone-900 dark:text-white">
                        Govt. Sarojini Naidu Higher Secondary School, Bhopal
                      </span>
                      <span className="font-mono text-xs opacity-80">2022</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300">
                      12th – Physics, Chemistry, Mathematics | 73.8%
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-baseline justify-between font-bold text-xs sm:text-sm">
                      <span className="text-stone-900 dark:text-white">
                        Govt. Subhash Excellence Higher Secondary School, Bhopal
                      </span>
                      <span className="font-mono text-xs opacity-80">2020</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300">
                      10th – Secondary School Certificate | 76%
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="mt-6">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-900 dark:text-white pb-1 border-b border-stone-800 dark:border-stone-300">
                  TECHNICAL SKILLS
                </h2>
                <div className="mt-3 space-y-1 text-xs text-stone-800 dark:text-stone-200">
                  <p>
                    <span className="font-bold">Programming:</span> Java
                  </p>
                  <p>
                    <span className="font-bold">Frontend:</span> React.js, HTML5, CSS3, JavaScript
                  </p>
                  <p>
                    <span className="font-bold">Backend & APIs:</span> Node.js, Express.js, FastAPI,
                    REST APIs
                  </p>
                  <p>
                    <span className="font-bold">Databases:</span> MongoDB, MySQL (Basic)
                  </p>
                  <p>
                    <span className="font-bold">AI Integration:</span> Gemini API, LLM API
                    Integration, Prompt Engineering
                  </p>
                  <p>
                    <span className="font-bold">Tools:</span> Git, GitHub, VS Code, IntelliJ IDEA
                  </p>
                </div>
              </div>

              {/* Projects */}
              <div className="mt-6">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-900 dark:text-white pb-1 border-b border-stone-800 dark:border-stone-300">
                  PROJECTS
                </h2>
                <div className="mt-3 space-y-4">
                  {/* Sentinel-AI */}
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between font-bold text-xs sm:text-sm">
                      <span className="text-stone-900 dark:text-white">
                        Sentinel-AI – AI-Based Civic Grievance Platform
                      </span>
                      <span className="font-mono text-xs opacity-80">May 2026</span>
                    </div>
                    <p className="text-xs italic font-medium text-stone-600 dark:text-stone-400">
                      Backend/API Integration Contributor | National-Level Hackathon
                    </p>
                    <p className="text-xs text-stone-700 dark:text-stone-300 font-semibold mt-0.5">
                      Tech: React.js, Node.js, Express.js, FastAPI, MongoDB, Gemini API, WebSockets
                    </p>
                    <ul className="mt-1.5 list-disc list-inside space-y-1 text-xs text-stone-700 dark:text-stone-300">
                      <li>
                        Built and tested API integration flow for citizen complaint submission,
                        classification and routing.
                      </li>
                      <li>
                        Connected the React-based complaint form with backend APIs and MongoDB
                        complaint records.
                      </li>
                      <li>
                        Integrated Gemini API to generate complaint category suggestions and concise
                        summaries.
                      </li>
                      <li>Supported real-time admin alerts through WebSocket-based event flow.</li>
                      <li>
                        Collaborated on end-to-end testing, request-response validation and
                        live-demo debugging in a two-day sprint.
                      </li>
                    </ul>
                  </div>

                  {/* PRICORA-AI */}
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between font-bold text-xs sm:text-sm">
                      <span className="text-stone-900 dark:text-white">
                        PRICORA-AI – AI Content Generation Platform
                      </span>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-sky-700 dark:text-sky-400 font-semibold">GitHub</span>
                        <span>|</span>
                        <span className="text-sky-700 dark:text-sky-400 font-semibold">
                          Live Demo
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 font-semibold mt-0.5">
                      Tech Stack: Next.js, TypeScript, Tailwind CSS, Drizzle ORM, Neon PostgreSQL,
                      Clerk, Gemini API
                    </p>
                    <ul className="mt-1.5 list-disc list-inside space-y-1 text-xs text-stone-700 dark:text-stone-300">
                      <li>
                        Developed an AI-powered content generation platform using Next.js and Google
                        Gemini API.
                      </li>
                      <li>
                        Implemented user authentication with Clerk and content history using Neon
                        PostgreSQL.
                      </li>
                      <li>
                        Added features to generate social media content and hashtags, with a
                        copy-to-clipboard option.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-6">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-900 dark:text-white pb-1 border-b border-stone-800 dark:border-stone-300">
                  ACHIEVEMENTS
                </h2>
                <ul className="mt-3 list-disc list-inside space-y-1 text-xs text-stone-700 dark:text-stone-300">
                  <li>
                    <span className="font-bold">National-Level AI Hackathon Participant</span> –
                    Built and demonstrated Sentinel-AI in a two-day sprint (May 2026).
                  </li>
                  <li>
                    <span className="font-bold">2nd Place</span> – College-Level Graphic Design
                    Competition.
                  </li>
                  <li>
                    <span className="font-bold">Generative AI with Gemini</span> – LinkedIn Learning
                    certification.
                  </li>
                  <li>
                    <span className="font-bold">CGPA: 7.56/10</span> in B.Tech CSBS.
                  </li>
                  <li>
                    Attended technical workshops on emerging technologies – hands-on sessions and
                    peer learning through college technical club.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-5 py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Updated & Verified ATS-Compatible Resume</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="rounded-full font-semibold"
            >
              <Download className="mr-1.5 h-3.5 w-3.5 text-primary" /> Download PDF
            </Button>
            <Button
              size="sm"
              onClick={onClose}
              className="rounded-full bg-brand font-semibold text-primary-foreground"
            >
              Done Viewing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
