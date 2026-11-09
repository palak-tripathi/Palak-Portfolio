import { useEffect } from "react";
import { X, ExternalLink, Calendar, Building2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Certificate } from "@/data/certificates-content";

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    if (!certificate) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  // Check if this certificate should show a credential link (e.g., Deloitte or Microsoft)
  const hasCredentialUrl = Boolean(
    certificate.credentialUrl && certificate.credentialUrl.trim() !== "",
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0b0f19] text-slate-100 shadow-2xl p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean & Small Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 transition hover:bg-white/20 cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Info */}
        <div className="mb-3 pr-8">
          <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 text-cyan-400 font-medium">
              <Building2 className="h-3 w-3" /> {certificate.issuer}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-amber-400">
              <Calendar className="h-3 w-3" /> {certificate.issueDate}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {certificate.title}
          </h3>
        </div>

        {/* Clean Image Screen Preview */}
        <div className="relative w-full overflow-hidden rounded-xl bg-black/70 border border-white/10 flex items-center justify-center my-2">
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="w-full h-auto max-h-[65vh] object-contain select-none"
          />
        </div>

        {/* Footer with optional Credential Link (for Deloitte/Microsoft if provided) */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-[11px] text-slate-400">Palak Tripathi · Certificate Preview</span>

          {hasCredentialUrl && (
            <Button
              asChild
              size="sm"
              className="rounded-full bg-primary text-primary-foreground font-semibold text-xs h-8 px-4"
            >
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="mr-1.5 h-3 w-3" />
                View Credential Link
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
