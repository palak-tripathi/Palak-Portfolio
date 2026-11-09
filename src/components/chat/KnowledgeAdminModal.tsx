import { useState, useEffect } from "react";
import {
  X,
  Save,
  Check,
  Loader2,
  Sparkles,
  BookOpen,
  Briefcase,
  Code2,
  User,
  HelpCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PalakKnowledge } from "@/lib/chat-service";

interface KnowledgeAdminModalProps {
  onClose: () => void;
}

export function KnowledgeAdminModal({ onClose }: KnowledgeAdminModalProps) {
  const [knowledge, setKnowledge] = useState<PalakKnowledge | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "projects" | "faqs">("profile");

  useEffect(() => {
    fetch("/api/public/knowledge-store")
      .then((res) => res.json())
      .then((data) => {
        setKnowledge(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load knowledge:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!knowledge) return;
    setSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch("/api/public/knowledge-store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(knowledge),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !knowledge) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-900 p-6 text-white border border-white/10">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
          <span>Loading Palak's Knowledge Base...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="relative flex flex-col w-full max-w-4xl h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#080d21] text-slate-100 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-glow">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Chatbot Knowledge Base</h2>
              <p className="text-xs text-slate-400">
                Everything Palak's Assistant knows and answers about you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-cyan text-navy font-bold hover:bg-cyan/90 shadow-glow"
              size="sm"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : savedSuccess ? (
                <>
                  <Check className="mr-1.5 h-4 w-4" /> Saved to AI Brain!
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 px-6 py-2.5 bg-black/30 overflow-x-auto">
          {[
            { id: "profile", label: "Profile & Career", icon: User },
            { id: "skills", label: "Technical Skills", icon: Code2 },
            { id: "projects", label: "Projects", icon: Briefcase },
            { id: "faqs", label: "Custom FAQs", icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Profile & Career */}
          {activeTab === "profile" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Full Name
                  </label>
                  <Input
                    value={knowledge.profile.name}
                    onChange={(e) =>
                      setKnowledge({
                        ...knowledge,
                        profile: { ...knowledge.profile, name: e.target.value },
                      })
                    }
                    className="border-white/15 bg-white/5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Headline
                  </label>
                  <Input
                    value={knowledge.profile.headline}
                    onChange={(e) =>
                      setKnowledge({
                        ...knowledge,
                        profile: { ...knowledge.profile, headline: e.target.value },
                      })
                    }
                    className="border-white/15 bg-white/5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Personal Introduction & Bio
                </label>
                <Textarea
                  value={knowledge.profile.bio}
                  onChange={(e) =>
                    setKnowledge({
                      ...knowledge,
                      profile: { ...knowledge.profile, bio: e.target.value },
                    })
                  }
                  rows={3}
                  className="border-white/15 bg-white/5 text-white"
                />
              </div>

              {/* Education */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-cyan-400" /> Education & College
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Degree</label>
                    <Input
                      value={knowledge.profile.education.degree}
                      onChange={(e) =>
                        setKnowledge({
                          ...knowledge,
                          profile: {
                            ...knowledge.profile,
                            education: { ...knowledge.profile.education, degree: e.target.value },
                          },
                        })
                      }
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Current Academic Status
                    </label>
                    <Input
                      value={knowledge.profile.education.status}
                      onChange={(e) =>
                        setKnowledge({
                          ...knowledge,
                          profile: {
                            ...knowledge.profile,
                            education: { ...knowledge.profile.education, status: e.target.value },
                          },
                        })
                      }
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Focus / Coursework</label>
                  <Input
                    value={knowledge.profile.education.focus}
                    onChange={(e) =>
                      setKnowledge({
                        ...knowledge,
                        profile: {
                          ...knowledge.profile,
                          education: { ...knowledge.profile.education, focus: e.target.value },
                        },
                      })
                    }
                    className="border-white/15 bg-white/5 text-white text-xs"
                  />
                </div>
              </div>

              {/* Career Goals */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-amber-400" /> Career Goals & Availability
                </h4>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Target Job Roles (comma-separated)
                  </label>
                  <Input
                    value={knowledge.profile.careerGoals.targetRoles.join(", ")}
                    onChange={(e) =>
                      setKnowledge({
                        ...knowledge,
                        profile: {
                          ...knowledge.profile,
                          careerGoals: {
                            ...knowledge.profile.careerGoals,
                            targetRoles: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          },
                        },
                      })
                    }
                    className="border-white/15 bg-white/5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Internship & Job Availability
                  </label>
                  <Input
                    value={knowledge.profile.careerGoals.availability}
                    onChange={(e) =>
                      setKnowledge({
                        ...knowledge,
                        profile: {
                          ...knowledge.profile,
                          careerGoals: {
                            ...knowledge.profile.careerGoals,
                            availability: e.target.value,
                          },
                        },
                      })
                    }
                    className="border-white/15 bg-white/5 text-white text-xs"
                  />
                </div>
              </div>

              {/* Contacts */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <h4 className="text-sm font-bold text-white">Public Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Email</label>
                    <Input
                      value={knowledge.profile.contacts.email}
                      onChange={(e) =>
                        setKnowledge({
                          ...knowledge,
                          profile: {
                            ...knowledge.profile,
                            contacts: { ...knowledge.profile.contacts, email: e.target.value },
                          },
                        })
                      }
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Instagram</label>
                    <Input
                      value={knowledge.profile.contacts.instagram}
                      onChange={(e) =>
                        setKnowledge({
                          ...knowledge,
                          profile: {
                            ...knowledge.profile,
                            contacts: { ...knowledge.profile.contacts, instagram: e.target.value },
                          },
                        })
                      }
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">LinkedIn</label>
                    <Input
                      value={knowledge.profile.contacts.linkedin}
                      onChange={(e) =>
                        setKnowledge({
                          ...knowledge,
                          profile: {
                            ...knowledge.profile,
                            contacts: { ...knowledge.profile.contacts, linkedin: e.target.value },
                          },
                        })
                      }
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">GitHub</label>
                    <Input
                      value={knowledge.profile.contacts.github}
                      onChange={(e) =>
                        setKnowledge({
                          ...knowledge,
                          profile: {
                            ...knowledge.profile,
                            contacts: { ...knowledge.profile.contacts, github: e.target.value },
                          },
                        })
                      }
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Technical Skills */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Skills with proficiency levels and specific architectural highlights that the
                chatbot cites when asked about your capabilities.
              </p>
              {Object.entries(knowledge.technicalSkills || {}).map(([category, skills]) => (
                <div
                  key={category}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3"
                >
                  <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                    {category} Technologies
                  </h4>
                  <div className="space-y-2">
                    {skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="grid grid-cols-1 sm:grid-cols-[1.2fr_0.8fr_2fr] gap-2 items-center"
                      >
                        <Input
                          value={skill.name}
                          onChange={(e) => {
                            const next = { ...knowledge.technicalSkills };
                            next[category][sIdx].name = e.target.value;
                            setKnowledge({ ...knowledge, technicalSkills: next });
                          }}
                          placeholder="Skill name"
                          className="border-white/15 bg-white/5 text-white text-xs"
                        />
                        <Input
                          value={skill.level}
                          onChange={(e) => {
                            const next = { ...knowledge.technicalSkills };
                            next[category][sIdx].level = e.target.value;
                            setKnowledge({ ...knowledge, technicalSkills: next });
                          }}
                          placeholder="Proficient / Intermediate"
                          className="border-white/15 bg-white/5 text-white text-xs"
                        />
                        <Input
                          value={skill.highlight}
                          onChange={(e) => {
                            const next = { ...knowledge.technicalSkills };
                            next[category][sIdx].highlight = e.target.value;
                            setKnowledge({ ...knowledge, technicalSkills: next });
                          }}
                          placeholder="Highlight / detail"
                          className="border-white/15 bg-white/5 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Projects */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              {knowledge.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase">
                      Project #{idx + 1}
                    </span>
                    <Input
                      value={proj.name}
                      onChange={(e) => {
                        const next = [...knowledge.projects];
                        next[idx].name = e.target.value;
                        setKnowledge({ ...knowledge, projects: next });
                      }}
                      className="max-w-xs border-white/15 bg-white/5 text-white font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Your Specific Role & Contribution
                    </label>
                    <Input
                      value={proj.role}
                      onChange={(e) => {
                        const next = [...knowledge.projects];
                        next[idx].role = e.target.value;
                        setKnowledge({ ...knowledge, projects: next });
                      }}
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Summary / What It Does
                    </label>
                    <Textarea
                      value={proj.summary}
                      onChange={(e) => {
                        const next = [...knowledge.projects];
                        next[idx].summary = e.target.value;
                        setKnowledge({ ...knowledge, projects: next });
                      }}
                      rows={2}
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Detailed Contributions (Sentinel AI role etc.)
                    </label>
                    <Textarea
                      value={proj.contributions}
                      onChange={(e) => {
                        const next = [...knowledge.projects];
                        next[idx].contributions = e.target.value;
                        setKnowledge({ ...knowledge, projects: next });
                      }}
                      rows={2}
                      className="border-white/15 bg-white/5 text-white text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Custom FAQs */}
          {activeTab === "faqs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Pre-trained questions & answers that the chatbot responds with directly.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setKnowledge({
                      ...knowledge,
                      faqs: [
                        ...(knowledge.faqs || []),
                        { q: "New Question?", a: "Answer here..." },
                      ],
                    });
                  }}
                  className="rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs"
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add Question
                </Button>
              </div>

              {(knowledge.faqs || []).map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      value={faq.q}
                      onChange={(e) => {
                        const next = [...knowledge.faqs];
                        next[fIdx].q = e.target.value;
                        setKnowledge({ ...knowledge, faqs: next });
                      }}
                      className="border-white/15 bg-white/5 text-white text-xs font-semibold"
                      placeholder="e.g. Is Palak available for internships?"
                    />
                    <button
                      onClick={() => {
                        setKnowledge({
                          ...knowledge,
                          faqs: knowledge.faqs.filter((_, i) => i !== fIdx),
                        });
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Textarea
                    value={faq.a}
                    onChange={(e) => {
                      const next = [...knowledge.faqs];
                      next[fIdx].a = e.target.value;
                      setKnowledge({ ...knowledge, faqs: next });
                    }}
                    rows={2}
                    className="border-white/15 bg-white/5 text-white text-xs"
                    placeholder="Exact response the chatbot gives..."
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
