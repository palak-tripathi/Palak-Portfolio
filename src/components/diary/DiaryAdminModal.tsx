import { useState, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Upload,
  Sparkles,
  Check,
  MoveUp,
  MoveDown,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { persistDiaryChapters, type DiaryChapter, type DiaryItem } from "@/data/diary-content";

interface DiaryAdminModalProps {
  chapters: DiaryChapter[];
  onSave: (chapters: DiaryChapter[]) => void;
  onClose: () => void;
}

export function DiaryAdminModal({ chapters, onSave, onClose }: DiaryAdminModalProps) {
  const [data, setData] = useState<DiaryChapter[]>(JSON.parse(JSON.stringify(chapters)));
  const [selectedChapterId, setSelectedChapterId] = useState<string>(chapters[0]?.id || "");
  const [editingItem, setEditingItem] = useState<DiaryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeChapter = data.find((c) => c.id === selectedChapterId) || data[0];

  const handleUpdateChapterTitle = (newTitle: string) => {
    setData((prev) =>
      prev.map((c) => (c.id === selectedChapterId ? { ...c, title: newTitle } : c)),
    );
  };

  const handleUpdateChapterSubtitle = (newSub: string) => {
    setData((prev) =>
      prev.map((c) => (c.id === selectedChapterId ? { ...c, subtitle: newSub } : c)),
    );
  };

  const handleAddNewItem = () => {
    const newItem: DiaryItem = {
      id: "item-" + Date.now(),
      title: "New Scrapbook Memory",
      caption: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      location: "",
      mediaType: "image",
      frameStyle: "polaroid",
      mediaUrl: "",
      sortOrder: (activeChapter?.items.length || 0) + 1,
      published: true,
    };

    setData((prev) =>
      prev.map((c) => (c.id === selectedChapterId ? { ...c, items: [...c.items, newItem] } : c)),
    );
    setEditingItem(newItem);
  };

  const handleDeleteItem = (itemId: string) => {
    setData((prev) =>
      prev.map((c) =>
        c.id === selectedChapterId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c,
      ),
    );
    if (editingItem?.id === itemId) setEditingItem(null);
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    if (!activeChapter) return;
    const items = [...activeChapter.items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    setData((prev) => prev.map((c) => (c.id === selectedChapterId ? { ...c, items } : c)));
  };

  const handleTogglePublished = (itemId: string) => {
    setData((prev) =>
      prev.map((c) =>
        c.id === selectedChapterId
          ? {
              ...c,
              items: c.items.map((i) => (i.id === itemId ? { ...i, published: !i.published } : i)),
            }
          : c,
      ),
    );
  };

  const handleSaveItemChanges = (updated: DiaryItem) => {
    setData((prev) =>
      prev.map((c) =>
        c.id === selectedChapterId
          ? {
              ...c,
              items: c.items.map((i) => (i.id === updated.id ? updated : i)),
            }
          : c,
      ),
    );
    setEditingItem(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

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
        setEditingItem({
          ...editingItem,
          mediaUrl: json.url,
          mediaType: file.type.startsWith("video/")
            ? "video"
            : file.type.startsWith("audio/")
              ? "audio"
              : "image",
        });
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setEditingItem({
            ...editingItem,
            mediaUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setEditingItem({
          ...editingItem,
          mediaUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    await persistDiaryChapters(data);
    onSave(data);
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-3 sm:p-6 backdrop-blur-md animate-in fade-in">
      <div className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border-2 border-pink-300/80 bg-[#fffdfa] shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-pink-200/80 bg-gradient-to-r from-pink-100/90 via-amber-50 to-pink-100/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-200 text-pink-800 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Diary Content Management System
              </h3>
              <p className="font-handwriting text-xs sm:text-sm text-pink-900 font-semibold">
                Manage your photos, singing videos, travel notes & memories without touching code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSaveAll}
              disabled={saving}
              size="sm"
              className="rounded-full border border-amber-300/80 bg-gradient-to-r from-pink-500 to-rose-500 font-serif text-xs font-bold text-white shadow-md hover:from-pink-600 hover:to-rose-600"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-200" /> Saved!
                </>
              ) : (
                <>
                  <Save className="mr-1.5 h-3.5 w-3.5" /> Save & Publish
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full text-stone-600 hover:bg-pink-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* CMS Body */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-[260px_1fr] overflow-hidden">
          {/* Chapter Selector Sidebar */}
          <div className="border-r border-pink-200/80 bg-pink-50/40 p-4 overflow-y-auto">
            <p className="mb-3 font-serif text-xs font-bold uppercase tracking-wider text-pink-950/70">
              Diary Chapters
            </p>
            <div className="space-y-1.5">
              {data.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChapterId(c.id);
                    setEditingItem(null);
                  }}
                  className={`w-full rounded-2xl px-3.5 py-2.5 text-left font-serif text-sm transition duration-150 ${
                    c.id === selectedChapterId
                      ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold shadow-md"
                      : "text-stone-800 hover:bg-pink-100/70"
                  }`}
                >
                  <span className="text-xs mr-2 opacity-80">{idx + 1}.</span>
                  {c.title}
                  <span className="block text-[11px] opacity-80 font-normal">
                    {c.items.length} memory entries
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Items & Content Area */}
          <div className="flex flex-col p-6 overflow-y-auto">
            {activeChapter && (
              <>
                {/* Chapter Subtitle & Theme Settings */}
                <div className="mb-6 rounded-2xl border border-pink-200/80 bg-gradient-to-r from-pink-50/50 to-amber-50/50 p-4 shadow-xs">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="font-serif text-xs font-bold text-stone-800">
                        Chapter Title
                      </label>
                      <input
                        type="text"
                        value={activeChapter.title}
                        onChange={(e) => handleUpdateChapterTitle(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-pink-300 bg-white px-3 py-1.5 font-serif text-sm text-stone-900 focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="font-serif text-xs font-bold text-stone-800">
                        Subtitle / Chapter Theme
                      </label>
                      <input
                        type="text"
                        value={activeChapter.subtitle}
                        onChange={(e) => handleUpdateChapterSubtitle(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-pink-300 bg-white px-3 py-1.5 font-serif text-sm text-stone-900 focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Items Header */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    Memories in {activeChapter.title} ({activeChapter.items.length})
                  </h4>
                  <Button
                    onClick={handleAddNewItem}
                    size="sm"
                    className="rounded-full border border-pink-300/80 bg-pink-100 font-serif text-xs font-bold text-pink-950 shadow-xs hover:bg-pink-200"
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5 text-pink-700" /> Add Entry
                  </Button>
                </div>

                {/* Item Editor Drawer (if editing an item) */}
                {editingItem && (
                  <div className="mb-6 rounded-2xl border-2 border-pink-400 bg-white p-5 shadow-lg">
                    <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                      <h5 className="font-serif text-sm font-bold text-stone-900">
                        Edit Memory: {editingItem.title}
                      </h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingItem(null)}
                        className="text-stone-500 hover:text-stone-900"
                      >
                        Cancel
                      </Button>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="font-serif text-xs font-bold text-stone-800">
                          Memory Title
                        </label>
                        <input
                          type="text"
                          value={editingItem.title}
                          onChange={(e) =>
                            setEditingItem({ ...editingItem, title: e.target.value })
                          }
                          className="mt-1 w-full rounded-xl border border-stone-200 p-2 font-serif text-sm focus:border-pink-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-serif text-xs font-bold text-stone-800">
                          Media Type
                        </label>
                        <select
                          value={editingItem.mediaType}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              mediaType: e.target.value as DiaryItem["mediaType"],
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-stone-200 p-2 font-serif text-sm focus:border-pink-400 focus:outline-none"
                        >
                          <option value="image">Photo / Artwork / Snapshot</option>
                          <option value="video">Video (Singing / Clip / YouTube URL)</option>
                          <option value="audio">Audio Voice Note / Song</option>
                          <option value="note">Written Journal Note / Poem</option>
                        </select>
                      </div>

                      {/* File Upload & Media URL */}
                      <div className="sm:col-span-2">
                        <label className="font-serif text-xs font-bold text-stone-800 flex items-center justify-between">
                          <span>Media File or Web Link</span>
                          <span className="text-[11px] text-pink-700 font-normal">
                            Direct upload or paste YouTube/Instagram link
                          </span>
                        </label>
                        <div className="mt-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. /assets/my-photo.jpg or https://youtube.com/watch?v=..."
                            value={editingItem.mediaUrl || ""}
                            onChange={(e) =>
                              setEditingItem({ ...editingItem, mediaUrl: e.target.value })
                            }
                            className="flex-1 rounded-xl border border-stone-200 p-2 font-serif text-sm focus:border-pink-400 focus:outline-none"
                          />
                          <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="rounded-xl border border-pink-300 bg-pink-50 font-serif text-xs font-semibold text-pink-900 hover:bg-pink-100"
                          >
                            {uploading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Upload className="mr-1.5 h-4 w-4 text-pink-700" /> Upload File
                              </>
                            )}
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*,audio/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Frame Style Selector */}
                      <div>
                        <label className="font-serif text-xs font-bold text-stone-800">
                          Scrapbook Frame Style
                        </label>
                        <select
                          value={editingItem.frameStyle || "polaroid"}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              frameStyle: e.target.value as DiaryItem["frameStyle"],
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-stone-200 p-2 font-serif text-sm focus:border-pink-400 focus:outline-none"
                        >
                          <option value="polaroid">Classic Polaroid with Washi Tape</option>
                          <option value="vintage-gold">Vintage Gold Filigree Frame</option>
                          <option value="floral">Soft Floral Pastel Border</option>
                          <option value="postmark">Cancelled Airmail Stamp Postcard</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-serif text-xs font-bold text-stone-800">
                          Date (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. October 2024"
                          value={editingItem.date || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-stone-200 p-2 font-serif text-sm focus:border-pink-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-serif text-xs font-bold text-stone-800">
                          Location (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mumbai, India"
                          value={editingItem.location || ""}
                          onChange={(e) =>
                            setEditingItem({ ...editingItem, location: e.target.value })
                          }
                          className="mt-1 w-full rounded-xl border border-stone-200 p-2 font-serif text-sm focus:border-pink-400 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-serif text-xs font-bold text-stone-800">
                          Caption / Personal Handwritten Story
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Write your genuine thoughts, lyrics, or memory story here..."
                          value={editingItem.caption || ""}
                          onChange={(e) =>
                            setEditingItem({ ...editingItem, caption: e.target.value })
                          }
                          className="mt-1 w-full rounded-xl border border-stone-200 p-2.5 font-handwriting text-base font-semibold text-stone-800 focus:border-pink-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveItemChanges(editingItem)}
                        className="rounded-full bg-pink-500 font-serif text-xs font-bold text-white hover:bg-pink-600"
                      >
                        Apply Changes
                      </Button>
                    </div>
                  </div>
                )}

                {/* Items List */}
                {activeChapter.items.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/30 p-8 text-center">
                    <p className="font-serif text-sm text-stone-600">
                      No memories in this chapter yet. Click "Add Entry" above to upload your first
                      authentic photo, singing video, or story.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeChapter.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl border border-pink-200/80 bg-white p-3 shadow-xs hover:border-pink-300 transition"
                      >
                        <div
                          className="flex-1 cursor-pointer truncate mr-2"
                          onClick={() => setEditingItem(item)}
                        >
                          <p className="font-serif text-sm font-bold text-stone-900 truncate">
                            {item.title}
                          </p>
                          <span className="font-handwriting text-xs text-pink-800 font-semibold">
                            {item.mediaType} {item.date ? `· ${item.date}` : ""}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveItem(index, "up")}
                            disabled={index === 0}
                            className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20"
                            title="Move up"
                          >
                            <MoveUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveItem(index, "down")}
                            disabled={index === activeChapter.items.length - 1}
                            className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20"
                            title="Move down"
                          >
                            <MoveDown className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => handleTogglePublished(item.id)}
                            title={
                              item.published
                                ? "Published (click to draft)"
                                : "Draft (click to publish)"
                            }
                            className="p-1 text-stone-600 hover:text-pink-600"
                          >
                            {item.published ? (
                              <Eye className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-stone-300" />
                            )}
                          </button>

                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete memory"
                            className="p-1 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
