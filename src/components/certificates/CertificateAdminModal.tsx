import { useState, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Save,
  Upload,
  Check,
  MoveUp,
  MoveDown,
  Loader2,
  ExternalLink,
  Award,
  Calendar,
  Building2,
  Link as LinkIcon,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveCertificates, type Certificate } from "@/data/certificates-content";

interface CertificateAdminModalProps {
  certificates: Certificate[];
  onSave: (certificates: Certificate[]) => void;
  onClose: () => void;
}

// Aapke original real certificates aur paths yahan direct set kar diye hain
const defaultCertificates: Certificate[] = [
  // --- UPAR: ACHIEVEMENT & HACKATHONS ---
  {
    id: "cert-hack-1",
    title: "Hackathon & Achievement Certificate 1",
    issuer: "Hackathon Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/WhatsApp Image 2026-11-02 at 11.07.46 AM.jpeg",
    description: "Hackathon achievement and project submission certificate.",
    skills: ["Hackathon", "Innovation", "Development"],
    sortOrder: 1,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cert-hack-2",
    title: "Hackathon & Achievement Certificate 2",
    issuer: "Hackathon Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/WhatsApp Image 2026-11-02 at 11.07.42 AM.jpeg",
    description: "Hackathon achievement and project submission certificate.",
    skills: ["Coding", "Problem Solving"],
    sortOrder: 2,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cert-hack-3",
    title: "Hackathon & Achievement Certificate 3",
    issuer: "Hackathon Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/WhatsApp Image 2026-11-02 at 11.09.06 AM.jpeg",
    description: "Hackathon achievement and project submission certificate.",
    skills: ["Full-Stack", "Web App"],
    sortOrder: 3,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cert-hack-4",
    title: "Hackathon & Achievement Certificate 4",
    issuer: "Hackathon Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/WhatsApp Image 2026-11-02 at 11.07.31 AM.jpeg",
    description: "Hackathon achievement and project submission certificate.",
    skills: ["React", "UI/UX"],
    sortOrder: 4,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cert-hack-5",
    title: "Hackathon & Achievement Certificate 5",
    issuer: "Hackathon Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/WhatsApp Image 2026-11-02 at 11.08.01 AM.jpeg",
    description: "Hackathon achievement and project submission certificate.",
    skills: ["Teamwork", "Presentation"],
    sortOrder: 5,
    published: true,
    createdAt: new Date().toISOString(),
  },

  // --- NEECHEY: LEARNING & VIRTUAL INTERNSHIPS ---
  {
    id: "cert-learn-1",
    title: "Completion Certificate (PDF)",
    issuer: "Training Academy",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "",
    pdfUrl: "/assets/completion_certificate.pdf",
    description: "Successfully completed training and coursework program.",
    skills: ["Core Concepts", "Technical Training"],
    sortOrder: 6,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cert-learn-2",
    title: "Virtual Internship Certificate 1",
    issuer: "Internship Platform",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/WhatsApp Image 2026-11-02 at 11.07.51 AM.jpeg",
    description: "Virtual internship practical modules and tasks completion.",
    skills: ["Practical Training", "Development"],
    sortOrder: 7,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cert-learn-3",
    title: "Virtual Internship Certificate 2",
    issuer: "Internship Platform",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/WhatsApp Image 2026-11-02 at 11.07.57 AM.jpeg",
    description: "Virtual internship practical modules and tasks completion.",
    skills: ["Software Engineering", "Fundamentals"],
    sortOrder: 8,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

export function CertificateAdminModal({
  certificates,
  onSave,
  onClose,
}: CertificateAdminModalProps) {
  const [data, setData] = useState<Certificate[]>(
    certificates && certificates.length > 0
      ? JSON.parse(JSON.stringify(certificates))
      : defaultCertificates,
  );
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddNew = () => {
    const newCert: Certificate = {
      id: "cert-" + Date.now(),
      title: "New Certification",
      issuer: "Issuing Organization",
      issueDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      credentialUrl: "",
      imageUrl: "",
      description: "Brief summary of skills, modules, and achievements covered in this program.",
      skills: [],
      sortOrder: data.length + 1,
      published: true,
      createdAt: new Date().toISOString(),
    };
    setData((prev) => [...prev, newCert]);
    setEditingCert(newCert);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      setData((prev) => prev.filter((c) => c.id !== id));
      if (editingCert?.id === id) setEditingCert(null);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.length) return;
    const next = [...data];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setData(next);
  };

  const handleTogglePublished = (id: string) => {
    setData((prev) => prev.map((c) => (c.id === id ? { ...c, published: !c.published } : c)));
  };

  const handleSaveEdit = (updated: Certificate) => {
    setData((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingCert(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCert) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/public/diary-upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        setEditingCert({
          ...editingCert,
          imageUrl: json.url,
          pdfUrl: file.type === "application/pdf" ? json.url : editingCert.pdfUrl,
        });
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setEditingCert({
            ...editingCert,
            imageUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("[upload error]", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      await saveCertificates(data);
      onSave(data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="relative flex flex-col w-full max-w-5xl h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0c1228] text-slate-100 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-glow">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Certificates Manager</h2>
              <p className="text-xs text-slate-400">
                Add, edit, upload and organize your credentials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSaveAll}
              disabled={saving}
              className="rounded-full bg-brand text-primary-foreground font-semibold shadow-glow hover:bg-brand/90"
              size="sm"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="mr-1.5 h-4 w-4 text-cyan-300" /> Saved!
                </>
              ) : (
                <>
                  <Save className="mr-1.5 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-[1.1fr_1.4fr] overflow-hidden">
          {/* Left Column: List of Certificates */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 overflow-hidden bg-black/20">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Certificates ({data.length})
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddNew}
                className="h-8 rounded-full border border-cyan-400/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-semibold"
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Certificate
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {data.map((cert, idx) => {
                const isSelected = editingCert?.id === cert.id;
                return (
                  <div
                    key={cert.id}
                    onClick={() => setEditingCert(cert)}
                    className={`group relative flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-950/40 shadow-glow"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {cert.imageUrl ? (
                        <img
                          src={cert.imageUrl}
                          alt=""
                          className="h-12 w-16 shrink-0 rounded-lg object-cover border border-white/10"
                        />
                      ) : (
                        <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{cert.title}</h4>
                        <p className="text-xs text-slate-400 truncate">
                          {cert.issuer} · {cert.issueDate}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-1 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleTogglePublished(cert.id)}
                        className={`p-1.5 rounded-lg transition ${
                          cert.published
                            ? "text-cyan-300 hover:bg-cyan-950/60"
                            : "text-slate-500 hover:bg-white/10"
                        }`}
                        title={cert.published ? "Visible on portfolio" : "Hidden"}
                      >
                        {cert.published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-20"
                        title="Move Up"
                      >
                        <MoveUp className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === data.length - 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-20"
                        title="Move Down"
                      >
                        <MoveDown className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/50 hover:text-rose-300"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editor Form */}
          <div className="flex flex-col flex-1 overflow-y-auto p-6 bg-slate-950/40">
            {editingCert ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Edit Certificate Details</h3>
                  <span className="text-xs text-slate-400">ID: {editingCert.id}</span>
                </div>

                {/* Certificate Title */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Certificate Name / Title *
                  </label>
                  <Input
                    value={editingCert.title}
                    onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                    placeholder="e.g. Full-Stack Web Development Specialization"
                    className="border-white/15 bg-white/5 text-white placeholder:text-slate-500"
                  />
                </div>

                {/* Issuing Organisation & Issue Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Issuing Organisation *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        value={editingCert.issuer}
                        onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                        placeholder="e.g. Meta / Coursera / Oracle"
                        className="pl-9 border-white/15 bg-white/5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Issue Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        value={editingCert.issueDate}
                        onChange={(e) =>
                          setEditingCert({ ...editingCert, issueDate: e.target.value })
                        }
                        placeholder="e.g. Aug 2024 or 2024-08"
                        className="pl-9 border-white/15 bg-white/5 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Credential URL (Optional) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Credential Verification URL (Optional)
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      value={editingCert.credentialUrl || ""}
                      onChange={(e) =>
                        setEditingCert({ ...editingCert, credentialUrl: e.target.value })
                      }
                      placeholder="e.g. https://www.coursera.org/verify/..."
                      className="pl-9 border-white/15 bg-white/5 text-white"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    A "View Credential" button will be displayed only if this URL is provided.
                  </p>
                </div>

                {/* Certificate File / Image Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Certificate Image or PDF *
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="rounded-full border-cyan-400/40 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/60"
                      size="sm"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-1.5 h-4 w-4" /> Upload Image / PDF
                        </>
                      )}
                    </Button>
                    <span className="text-xs text-slate-400">Supports JPG, PNG, WebP, and PDF</span>
                  </div>

                  {editingCert.imageUrl && (
                    <div className="mt-3 relative rounded-xl overflow-hidden border border-white/15 max-h-40 bg-black/40">
                      {editingCert.imageUrl.endsWith(".pdf") ? (
                        <div className="flex items-center gap-2 p-3 text-sm text-cyan-300">
                          <FileText className="h-5 w-5" /> PDF Document Uploaded:{" "}
                          {editingCert.imageUrl}
                        </div>
                      ) : (
                        <img
                          src={editingCert.imageUrl}
                          alt="Preview"
                          className="w-full h-40 object-contain"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Description & Highlights
                  </label>
                  <Textarea
                    value={editingCert.description || ""}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, description: e.target.value })
                    }
                    rows={3}
                    placeholder="Key concepts, projects, or honors covered..."
                    className="border-white/15 bg-white/5 text-white"
                  />
                </div>

                {/* Skills Tags */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Skills / Topics (comma-separated)
                  </label>
                  <Input
                    value={(editingCert.skills || []).join(", ")}
                    onChange={(e) =>
                      setEditingCert({
                        ...editingCert,
                        skills: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="e.g. React, Java, SQL, Cloud Architecture"
                    className="border-white/15 bg-white/5 text-white"
                  />
                </div>

                {/* Save Edit Button */}
                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={() => handleSaveEdit(editingCert)}
                    className="w-full rounded-full bg-cyan text-navy font-bold hover:bg-cyan/90"
                  >
                    Apply Changes to Certificate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-8">
                <Award className="h-12 w-12 text-slate-600 mb-3" />
                <p className="text-sm font-semibold">
                  Select a certificate on the left to edit its details,
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  or click "Add Certificate" to create a new one.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
