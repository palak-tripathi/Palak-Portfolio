import { useState } from "react";
import { FolderGit2, Sparkles, Award } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectVideoModal } from "./ProjectVideoModal";

export function ProjectsSection() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; name: string } | null>(null);

  const handleOpenVideo = (url: string, name: string) => {
    setActiveVideo({ url, name });
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="reveal text-sm font-bold uppercase tracking-[0.3em] text-primary">
          Featured Engineering
        </p>
        <h2 className="reveal mt-3 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
          Things I'm <span className="text-gradient">Building.</span>
        </h2>
        <p className="reveal mt-4 max-w-2xl text-lg text-muted-foreground">
          Real-world applications spanning AI generation tools, security monitoring dashboards, and
          interactive creative web architectures.
        </p>
      </div>

      {/* Projects Dynamic Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenVideo={handleOpenVideo} />
        ))}
      </div>

      {/* Future Project Note */}
      <div className="reveal mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-border/80 bg-accent/40 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand text-primary-foreground">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Continuously Shipping & Experimenting</p>
            <p className="text-xs text-muted-foreground">
              More production builds, hackathon entries, and open-source packages added regularly.
            </p>
          </div>
        </div>
        <a
          href="https://github.com/palak-tripathi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold transition hover:bg-accent hover:text-primary shrink-0"
        >
          View All Repositories on GitHub →
        </a>
      </div>

      {/* Global Video Modal */}
      <ProjectVideoModal
        isOpen={Boolean(activeVideo)}
        onClose={handleCloseVideo}
        videoUrl={activeVideo?.url}
        projectName={activeVideo?.name || ""}
      />
    </section>
  );
}
