import {
  Download,
  ExternalLink,
  FileText,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Sparkles,
  CheckCircle2,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Compact Aesthetic Framed Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-xl sm:max-w-2xl max-h-[82vh] rounded-[2rem] border-2 border-primary/40 bg-card/95 text-card-foreground shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Aesthetic Washi Tape on Top Center */}
        <div className="diary-washi-tape absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4 z-30 pointer-events-none" />

        {/* Ornate Brass Frame Corners */}
        <div className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-l-2 border-t-2 border-primary/60 rounded-tl-md z-20" />
        <div className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-r-2 border-t-2 border-primary/60 rounded-tr-md z-20" />
        <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-primary/60 rounded-bl-md z-20" />
        <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-primary/60 rounded-br-md z-20" />

        {/* Compact Frame Header Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card/90 px-4 sm:px-6 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold leading-none flex items-center gap-1.5">
                Palak Tripathi · Resume
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-1.5 py-0.2 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-2.5 w-2.5" /> ATS Ready
                </span>
              </h2>
              <span className="text-[11px] text-muted-foreground">
                B.Tech CSBS · SIRT Bhopal (7.56 CGPA)
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              onClick={handleDownload}
              className="h-8 rounded-full bg-brand px-3 text-xs font-semibold text-primary-foreground shadow-xs transition hover:scale-105"
            >
              <Download className="mr-1 h-3.5 w-3.5" /> Download
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 rounded-full text-xs font-semibold gap-1 hidden sm:inline-flex"
              title="Print Resume"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenNewTab}
              className="h-8 w-8 p-0 rounded-full hidden sm:inline-flex"
              title="Open PDF in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition"
              title="Close viewer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body with Clean Aesthetic Framing */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-muted/15">
          <div className="mx-auto max-w-lg rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-4 sm:p-6 text-stone-900 dark:text-stone-100 shadow-md font-sans text-[11px] sm:text-xs">
            {/* Header */}
            <div className="text-center pb-3 border-b border-stone-200 dark:border-stone-800">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-stone-950 dark:text-white">
                PALAK TRIPATHI
              </h1>
              <p className="mt-0.5 text-[11px] font-semibold text-sky-800 dark:text-sky-400">
                Aspiring Full-Stack Developer | API Integration | AI-Enabled Web Applications
              </p>
              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-300">
                <a
                  href="tel:+917440608049"
                  className="inline-flex items-center gap-0.5 hover:text-sky-700 dark:hover:text-sky-300 transition"
                >
                  <Phone className="h-2.5 w-2.5" /> +91 74406 08049
                </a>
                <span>•</span>
                <a
                  href="mailto:palak09.learner@gmail.com"
                  className="inline-flex items-center gap-0.5 hover:text-sky-700 dark:hover:text-sky-300 transition"
                >
                  <Mail className="h-2.5 w-2.5" /> palak09.learner@gmail.com
                </a>
                <span>•</span>
                <span className="inline-flex items-center gap-0.5">
                  <MapPin className="h-2.5 w-2.5" /> Bhopal, M.P.
                </span>
                <span>•</span>
                <a
                  href="https://linkedin.com/in/pal-tripathi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-0.5 text-sky-700 dark:text-sky-400 underline hover:opacity-80 transition"
                >
                  <Linkedin className="h-2.5 w-2.5" /> linkedin.com/in/pal-tripathi
                </a>
              </div>
            </div>

            {/* Education */}
            <div className="mt-3.5">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-stone-900 dark:text-white pb-0.5 border-b border-stone-800 dark:border-stone-300">
                EDUCATION
              </h2>
              <div className="mt-2 space-y-2">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-[11px]">
                    <span className="text-stone-900 dark:text-white">
                      Sagar Institute of Research & Technology (SIRT), Bhopal
                    </span>
                    <span className="font-mono text-[10px] opacity-80">2023 – 2027 (Expected)</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-700 dark:text-stone-300">
                    B.Tech in Computer Science & Business Systems (CSBS) |{" "}
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      CGPA: 7.56/10
                    </span>
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-[11px]">
                    <span className="text-stone-900 dark:text-white">
                      Govt. Sarojini Naidu Higher Secondary School, Bhopal
                    </span>
                    <span className="font-mono text-[10px] opacity-80">2022</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-700 dark:text-stone-300">
                    12th – Physics, Chemistry, Mathematics | 73.8%
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-[11px]">
                    <span className="text-stone-900 dark:text-white">
                      Govt. Subhash Excellence Higher Secondary School, Bhopal
                    </span>
                    <span className="font-mono text-[10px] opacity-80">2020</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-700 dark:text-stone-300">
                    10th – Secondary School Certificate | 76%
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mt-3.5">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-stone-900 dark:text-white pb-0.5 border-b border-stone-800 dark:border-stone-300">
                TECHNICAL SKILLS
              </h2>
              <div className="mt-2 space-y-0.5 text-[10.5px] text-stone-800 dark:text-stone-200">
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
            <div className="mt-3.5">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-stone-900 dark:text-white pb-0.5 border-b border-stone-800 dark:border-stone-300">
                PROJECTS
              </h2>
              <div className="mt-2 space-y-2.5">
                {/* Sentinel-AI */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-[11px]">
                    <span className="text-stone-900 dark:text-white">
                      Sentinel-AI – AI-Based Civic Grievance Platform
                    </span>
                    <span className="font-mono text-[10px] opacity-80">May 2026</span>
                  </div>
                  <p className="text-[10px] italic font-medium text-stone-600 dark:text-stone-400">
                    Backend/API Integration Contributor | National-Level Hackathon
                  </p>
                  <p className="text-[10px] text-stone-700 dark:text-stone-300 font-semibold mt-0.5">
                    Tech: React.js, Node.js, Express.js, FastAPI, MongoDB, Gemini API, WebSockets
                  </p>
                  <ul className="mt-1 list-disc list-inside space-y-0.5 text-[10px] sm:text-[10.5px] text-stone-700 dark:text-stone-300">
                    <li>
                      Built and tested API integration flow for citizen complaint submission and
                      routing.
                    </li>
                    <li>
                      Connected React complaint form with backend APIs and MongoDB complaint
                      records.
                    </li>
                    <li>
                      Integrated Gemini API to generate complaint category suggestions and concise
                      summaries.
                    </li>
                    <li>Supported real-time admin alerts through WebSocket event flow.</li>
                  </ul>
                </div>

                {/* PRICORA-AI */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-[11px]">
                    <span className="text-stone-900 dark:text-white">
                      PRICORA-AI – AI Content Generation Platform
                    </span>
                    <span className="text-sky-700 dark:text-sky-400 font-semibold text-[10px]">
                      GitHub | Live Demo
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-700 dark:text-stone-300 font-semibold mt-0.5">
                    Tech: Next.js, TypeScript, Tailwind CSS, Drizzle ORM, Neon PostgreSQL, Gemini
                    API
                  </p>
                  <ul className="mt-1 list-disc list-inside space-y-0.5 text-[10px] sm:text-[10.5px] text-stone-700 dark:text-stone-300">
                    <li>
                      Developed AI content generation platform using Next.js and Google Gemini API.
                    </li>
                    <li>
                      Implemented user authentication and content history using Neon PostgreSQL.
                    </li>
                    <li>Added social media hashtag generator with copy-to-clipboard option.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-3.5">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-stone-900 dark:text-white pb-0.5 border-b border-stone-800 dark:border-stone-300">
                ACHIEVEMENTS
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-0.5 text-[10px] sm:text-[10.5px] text-stone-700 dark:text-stone-300">
                <li>
                  <span className="font-bold">National-Level AI Hackathon Participant</span> – Built
                  and demonstrated Sentinel-AI in a two-day sprint (May 2026).
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
                <li>Attended technical workshops on emerging technologies and peer learning.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compact Frame Bottom Bar */}
        <div className="flex items-center justify-between border-t border-border bg-card/90 px-4 sm:px-6 py-2.5 text-xs text-muted-foreground">
          <span className="font-mono text-[11px]">Palak_Tripathi_Resume.pdf</span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 rounded-full text-xs font-semibold gap-1 hidden sm:inline-flex"
            >
              <Printer className="h-3 w-3" /> Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenNewTab}
              className="h-8 rounded-full text-xs font-semibold gap-1"
            >
              <ExternalLink className="h-3 w-3" /> Open Full PDF
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="h-8 rounded-full bg-brand text-xs font-semibold text-primary-foreground shadow-xs gap-1"
            >
              <Download className="h-3 w-3" /> Download CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
