import { useState, useEffect } from "react";
import { X, Play, Film, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  projectName: string;
}

export function ProjectVideoModal({
  isOpen,
  onClose,
  videoUrl,
  projectName,
}: ProjectVideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isExternalEmbed =
    videoUrl &&
    (videoUrl.includes("youtube.com") ||
      videoUrl.includes("youtu.be") ||
      videoUrl.includes("vimeo.com"));

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} Demo Video`}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-bold text-foreground">
              {projectName} — Demo Video
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-accent"
            aria-label="Close video modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Video Container */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-black aspect-video flex items-center justify-center">
          {videoUrl ? (
            isExternalEmbed ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                title={`${projectName} Video`}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                controlsList="nodownload"
                playsInline
                className="h-full w-full object-contain"
              >
                Your browser does not support playing this video.
              </video>
            )
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <AlertCircle className="h-10 w-10 text-primary mb-3 opacity-60" />
              <p className="font-semibold text-foreground">Demo Video Coming Soon</p>
              <p className="mt-1 text-sm max-w-sm">
                A video walkthrough has not yet been attached for {projectName}.
              </p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Esc</kbd> or click close
            to exit
          </span>
          <Button variant="outline" size="sm" onClick={onClose} className="rounded-full">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
