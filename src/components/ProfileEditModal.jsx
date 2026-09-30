import React, { useState, useRef } from "react";
import {
  X,
  Save,
  User,
  Image,
  Plus,
  Trash2,
  Edit3,
  BarChart2,
  BookOpen,
  GraduationCap,
  Link,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function FieldInput({ label, value, onChange, placeholder, type = "text", rows }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
        />
      )}
    </div>
  );
}

export default function ProfileEditModal({ isOpen, onClose, profile, education, onSave }) {
  const [tab, setTab] = useState("identity");
  const [form, setForm] = useState(() => structuredClone(profile));
  const [eduForm, setEduForm] = useState(() => structuredClone(education));
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl || "");
  const fileRef = useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setForm(structuredClone(profile));
      setEduForm(structuredClone(education));
      setAvatarPreview(profile?.avatarUrl || "");
    }
  }, [isOpen, profile, education]);

  if (!isOpen) return null;

  /* ─── Helpers ─────────────────────────────────── */
  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateStat = (idx, key, value) =>
    setForm((prev) => {
      const stats = [...prev.stats];
      stats[idx] = { ...stats[idx], [key]: value };
      return { ...prev, stats };
    });

  const addStat = () =>
    setForm((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: "New Stat", value: "0", note: "" }],
    }));

  const removeStat = (idx) =>
    setForm((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== idx) }));

  const updateFocus = (idx, value) =>
    setForm((prev) => {
      const focus = [...(prev.courseFocus || [])];
      focus[idx] = value;
      return { ...prev, courseFocus: focus };
    });

  const addFocus = () =>
    setForm((prev) => ({
      ...prev,
      courseFocus: [...(prev.courseFocus || []), "New learning point"],
    }));

  const removeFocus = (idx) =>
    setForm((prev) => ({
      ...prev,
      courseFocus: prev.courseFocus.filter((_, i) => i !== idx),
    }));

  /* Education helpers */
  const updateEduField = (idx, key, value) =>
    setEduForm((prev) => {
      const arr = [...prev];
      arr[idx] = { ...arr[idx], [key]: value };
      return arr;
    });

  const updateEduHighlight = (eduIdx, hIdx, value) =>
    setEduForm((prev) => {
      const arr = [...prev];
      const highlights = [...arr[eduIdx].highlights];
      highlights[hIdx] = value;
      arr[eduIdx] = { ...arr[eduIdx], highlights };
      return arr;
    });

  const addEduHighlight = (eduIdx) =>
    setEduForm((prev) => {
      const arr = [...prev];
      arr[eduIdx] = {
        ...arr[eduIdx],
        highlights: [...arr[eduIdx].highlights, "New highlight"],
      };
      return arr;
    });

  const removeEduHighlight = (eduIdx, hIdx) =>
    setEduForm((prev) => {
      const arr = [...prev];
      arr[eduIdx] = {
        ...arr[eduIdx],
        highlights: arr[eduIdx].highlights.filter((_, i) => i !== hIdx),
      };
      return arr;
    });

  const addEduEntry = () =>
    setEduForm((prev) => [
      ...prev,
      {
        institution: "New Institution",
        period: "2024–Present",
        degree: "Degree / Program",
        honors: "Award or standing",
        highlights: ["Highlight 1"],
      },
    ]);

  const removeEduEntry = (idx) => setEduForm((prev) => prev.filter((_, i) => i !== idx));

  /* Avatar: local file to data URL */
  const handleAvatarFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      setAvatarPreview(url);
      updateField("avatarUrl", url);
    };
    reader.readAsDataURL(file);
  };

  /* Save */
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave({ profile: form, education: eduForm });
      setSaving(false);
      onClose();
    }, 400);
  };

  const tabs = [
    { id: "identity", label: "Identity", icon: User },
    { id: "stats", label: "Stats", icon: BarChart2 },
    { id: "focus", label: "Course Focus", icon: BookOpen },
    { id: "education", label: "Education", icon: GraduationCap },
  ];


  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#111318] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Edit About Section</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Admin-only profile editor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  tab === t.id
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* IDENTITY TAB */}
          {tab === "identity" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-rose-300 dark:border-rose-700 shrink-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <User className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Profile Photo</p>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors w-fit"
                  >
                    <Image className="w-3.5 h-3.5 text-rose-500" />
                    Upload from device
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
                  <p className="text-[10px] text-slate-400">Or paste an image URL below</p>
                  <input
                    type="url"
                    value={form.avatarUrl?.startsWith("data:") ? "" : (form.avatarUrl || "")}
                    onChange={(e) => {
                      updateField("avatarUrl", e.target.value);
                      setAvatarPreview(e.target.value);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Full Name" value={form.name || ""} onChange={(v) => updateField("name", v)} placeholder="Kurt Joshua Alcayde" />
                <FieldInput label="Preferred Name" value={form.preferredName || ""} onChange={(v) => updateField("preferredName", v)} placeholder="Kurt" />
              </div>
              <FieldInput label="Role / Title" value={form.role || ""} onChange={(v) => updateField("role", v)} placeholder="Front-End Developer & IT Student" />
              <FieldInput label="Degree Program" value={form.degree || ""} onChange={(v) => updateField("degree", v)} placeholder="BS Information Technology" />
              <FieldInput label="University" value={form.university || ""} onChange={(v) => updateField("university", v)} placeholder="Cavite State University (CvSU)" />
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Course" value={form.course || ""} onChange={(v) => updateField("course", v)} placeholder="DCIT 26 …" />
                <FieldInput label="Section" value={form.section || ""} onChange={(v) => updateField("section", v)} placeholder="BSIT 3-1" />
              </div>
              <FieldInput label="Academic Year" value={form.academicYear || ""} onChange={(v) => updateField("academicYear", v)} placeholder="A.Y. 2024–2025" />
              <FieldInput label="Bio / Short Description" value={form.bio || ""} onChange={(v) => updateField("bio", v)} rows={3} placeholder="Passionate IT scholar…" />
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Email" value={form.email || ""} onChange={(v) => updateField("email", v)} type="email" />
                <FieldInput label="Phone" value={form.phone || ""} onChange={(v) => updateField("phone", v)} placeholder="+63 912 345 6789" />
              </div>
              <FieldInput label="Location" value={form.location || ""} onChange={(v) => updateField("location", v)} placeholder="Cavite, Philippines" />

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Link className="w-3 h-3" /> Social Links
                </p>
                <div className="space-y-2">
                  {["github", "linkedin", "behance", "dribbble"].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400 w-16 capitalize">{s}</span>
                      <input
                        type="url"
                        value={form.socials?.[s] || ""}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, socials: { ...prev.socials, [s]: e.target.value } }))
                        }
                        placeholder={`https://${s}.com/…`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATS TAB */}
          {tab === "stats" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">These appear as metric cards in the About section.</p>
              {form.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Stat #{idx + 1}</span>
                    <button
                      onClick={() => removeStat(idx)}
                      className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/40 text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <FieldInput label="Value" value={stat.value} onChange={(v) => updateStat(idx, "value", v)} placeholder="98.5%" />
                    <FieldInput label="Label" value={stat.label} onChange={(v) => updateStat(idx, "label", v)} placeholder="Lab Rating" />
                    <FieldInput label="Note" value={stat.note} onChange={(v) => updateStat(idx, "note", v)} placeholder="Top standing" />
                  </div>
                </div>
              ))}
              <button
                onClick={addStat}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-rose-400 hover:text-rose-500 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Stat
              </button>
            </div>
          )}

          {/* COURSE FOCUS TAB */}
          {tab === "focus" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">Bullet points shown in the "Curriculum & Course Focus" card.</p>
              {(form.courseFocus || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateFocus(idx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                  <button
                    onClick={() => removeFocus(idx)}
                    className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/40 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addFocus}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-rose-400 hover:text-rose-500 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Bullet Point
              </button>
            </div>
          )}

          {/* EDUCATION TAB */}
          {tab === "education" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">Academic timeline entries shown in the About section.</p>
              {eduForm.map((entry, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Entry #{idx + 1}</span>
                    <button onClick={() => removeEduEntry(idx)} className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/40 text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <FieldInput label="Institution" value={entry.institution} onChange={(v) => updateEduField(idx, "institution", v)} />
                    <FieldInput label="Period" value={entry.period} onChange={(v) => updateEduField(idx, "period", v)} placeholder="2022–2026" />
                  </div>
                  <FieldInput label="Degree / Program" value={entry.degree} onChange={(v) => updateEduField(idx, "degree", v)} />
                  <FieldInput label="Honors / Standing" value={entry.honors} onChange={(v) => updateEduField(idx, "honors", v)} placeholder="Dean's Lister" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Highlights</p>
                    {entry.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => updateEduHighlight(idx, hIdx, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        />
                        <button onClick={() => removeEduHighlight(idx, hIdx)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-red-500 transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addEduHighlight(idx)} className="mt-1 flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-semibold">
                      <Plus className="w-3 h-3" /> Add highlight
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addEduEntry}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-rose-400 hover:text-rose-500 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Education Entry
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Changes saved to localStorage
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-rose-600/30 transition-all disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
