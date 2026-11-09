import { useState } from "react";
import {
  Github,
  ExternalLink,
  Play,
  FileText,
  FolderGit2,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  onOpenVideo: (url: string, name: string) => void;
}

export function ProjectCard({ project, onOpenVideo }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim());
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim());
  const hasVideo = Boolean(project.demoVideoUrl && project.demoVideoUrl.trim());
  const hasDocs = Boolean(project.documentationUrl && project.documentationUrl.trim());

  return (
    <div className="reveal group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-glow">
      {/* Visual Accent Glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition duration-500 group-hover:bg-primary/20"
        aria-hidden
      />

      <div>
        {/* Project Thumbnail / Banner */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-border/80 bg-muted/40 aspect-[16/10]">
          {project.thumbnail && !imgError ? (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/60 animate-pulse">
                  <FolderGit2 className="h-8 w-8 text-primary/40" />
                </div>
              )}
              <img
                src={project.thumbnail}
                alt={`${project.name} dashboard preview`}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`h-full w-full object-cover object-top transition duration-500 group-hover:scale-105 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-navy/10 via-brand/5 to-cyan/10 p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-glow transition group-hover:rotate-6">
                <FolderGit2 className="h-7 w-7" />
              </div>
              <p className="mt-3 font-display text-base font-bold text-foreground">
                {project.name}
              </p>
              <span className="mt-1 text-xs text-muted-foreground">{project.role}</span>
            </div>
          )}

          {/* Quick Badges in Header */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md shadow-xs border border-border/50">
              <Sparkles className="h-3 w-3" /> {project.role}
            </span>
          </div>
        </div>

        {/* Project Title & Description */}
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground transition group-hover:text-primary">
          {project.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Highlights List if available */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack Pills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent/80 px-2.5 py-1 text-[11px] font-medium text-accent-foreground transition hover:bg-accent"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
        {/* 1. Live Demo */}
        {hasLive && (
          <Button
            asChild
            size="sm"
            className="rounded-full bg-brand px-4 text-xs font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Live Demo
            </a>
          </Button>
        )}

        {/* 2. GitHub */}
        {hasGithub && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-border bg-card px-3.5 text-xs font-semibold transition hover:bg-accent"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${project.name} on GitHub`}
              aria-label={`View ${project.name} on GitHub`}
            >
              <Github className="mr-1.5 h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
        )}

        {/* 3. Demo Video Button */}
        {hasVideo ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenVideo(project.demoVideoUrl!, project.name)}
            className="rounded-full border-primary/30 bg-primary/5 px-3.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
            title="Watch Demo Video"
            aria-label={`Watch ${project.name} Demo Video`}
          >
            <Play className="mr-1.5 h-3.5 w-3.5 fill-current" />
            Demo Video
          </Button>
        ) : (
          <button
            type="button"
            disabled
            title="Demo video coming soon"
            aria-label="Demo video coming soon"
            className="inline-flex cursor-not-allowed items-center rounded-full border border-dashed border-border/80 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground/60 transition"
          >
            <Play className="mr-1.5 h-3 w-3 opacity-40" />
            <span className="hidden sm:inline">Demo Video</span>
            <span className="ml-1 text-[10px] opacity-75">(Coming soon)</span>
          </button>
        )}

        {/* 4. Documentation */}
        {hasDocs && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <a
              href={project.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Read Documentation"
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Docs
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
