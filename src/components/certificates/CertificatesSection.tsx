import { useState, useEffect } from "react";
import {
  Award,
  Calendar,
  Building2,
  ExternalLink,
  ZoomIn,
  Settings2,
  Sparkles,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadCertificates, saveCertificates, type Certificate } from "@/data/certificates-content";
import { CertificateModal } from "./CertificateModal";
import { CertificateAdminModal } from "./CertificateAdminModal";

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>(loadCertificates);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Check owner permission via query param or local session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get("admin") === "true" ||
        urlParams.get("edit") === "true" ||
        localStorage.getItem("diary_owner") === "true"
      ) {
        setIsOwner(true);
      }
    }
  }, []);

  const handleSave = (updated: Certificate[]) => {
    setCertificates(updated);
    saveCertificates(updated);
  };

  const handleActivateOwner = () => {
    setIsOwner(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("diary_owner", "true");
    }
    setShowAdmin(true);
  };

  const publishedCertificates = certificates.filter((c) => c.published);

  return (
    <div className="relative overflow-hidden py-12 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] dark:from-[#090d1a] dark:via-[#0f172a] dark:to-[#090d1a] transition-colors duration-700">
      {/* Top-to-Bottom Multi-layered Organic Cloud-like Soft Gradient with Live Floating Orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-indigo-300/35 via-purple-200/30 to-pink-200/25 blur-[130px] dark:from-indigo-600/20 dark:via-purple-600/15 dark:to-transparent animate-float"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-cyan-300/35 via-sky-200/30 to-teal-200/25 blur-[140px] dark:from-cyan-600/20 dark:via-blue-600/15 dark:to-transparent animate-float"
        style={{ animationDelay: "2.5s" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-rose-200/30 via-amber-100/35 to-indigo-100/30 blur-[120px] dark:from-purple-900/20 dark:via-cyan-900/15 dark:to-transparent animate-float"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      />

      <section
        id="certificates"
        className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-6 py-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <p className="reveal text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Credentials & Honors
              </p>
              {isOwner && (
                <span className="rounded-full bg-cyan-950/60 border border-cyan-400/40 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300">
                  Admin Active
                </span>
              )}
            </div>

            <h2 className="reveal mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              CERTIFICATIONS & <span className="text-gradient">ACHIEVEMENTS</span>
            </h2>

            <p className="reveal mt-3 max-w-2xl text-lg text-muted-foreground">
              Every milestone is a step forward.
            </p>
          </div>

          {/* Owner Manage Button */}
          {isOwner && (
            <div className="reveal shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdmin(true)}
                className="rounded-full border-primary/40 bg-card px-4 py-2 font-semibold text-primary transition hover:bg-primary/10 shadow-sm"
              >
                <Settings2 className="mr-2 h-4 w-4" /> Manage Certificates
              </Button>
            </div>
          )}
        </div>

        {/* Certificates Gallery Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
          {publishedCertificates.map((cert, index) => {
            const hasCredentialUrl = Boolean(
              cert.credentialUrl && cert.credentialUrl.trim() !== "",
            );

            return (
              <div
                key={cert.id}
                className="reveal group relative flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Certificate Image Frame */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950/60 cursor-pointer border-b border-border/60"
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/20 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur">
                      <ZoomIn className="h-4 w-4" /> View Certificate
                    </span>
                  </div>

                  {/* Verified Badge Pill */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-slate-950/80 px-3 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur shadow-md">
                    <FileCheck2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Certificate Content Card Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Issuer & Date Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                      <Building2 className="h-3.5 w-3.5" />
                      {cert.issuer}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-amber-400" />
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="text-xl font-bold text-foreground cursor-pointer transition hover:text-primary leading-snug line-clamp-2 mb-2.5"
                  >
                    {cert.title}
                  </h3>

                  {/* Description snippet */}
                  {cert.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  )}

                  {/* Skills Tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2 mb-5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border/60">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center text-xs font-semibold text-primary transition hover:underline cursor-pointer"
                    >
                      Inspect Details →
                    </button>

                    {/* View Credential button — rendered ONLY when an actual credential URL is provided */}
                    {hasCredentialUrl && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full border-primary/30 bg-card hover:bg-accent text-xs font-semibold text-foreground hover:text-primary"
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          View Credential
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discrete Owner Signature Trigger */}
        <div className="mt-10 flex justify-end">
          <span
            onClick={handleActivateOwner}
            className="text-[11px] text-muted-foreground/40 cursor-pointer select-none hover:text-primary transition"
            title="Milestone Registry"
          >
            Palak Tripathi · Certified Milestones ✦
          </span>
        </div>

        {/* Certificate High-Res Modal */}
        {selectedCert && (
          <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
        )}

        {/* Owner Management Modal */}
        {showAdmin && (
          <CertificateAdminModal
            certificates={certificates}
            onSave={handleSave}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </section>
    </div>
  );
}
