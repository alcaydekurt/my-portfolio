import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Zap,
  Code2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// Outer pure inputs to prevent losing focus during keystrokes
function SkillTextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
      />
    </div>
  );
}

export default function SkillsEditModal({ isOpen, onClose, skills, onSave }) {
  const [skillsForm, setSkillsForm] = useState(() => structuredClone(skills));
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSkillsForm(structuredClone(skills));
      setActiveGroupIndex(0);
    }
  }, [isOpen, skills]);

  if (!isOpen) return null;

  const currentGroup = skillsForm[activeGroupIndex] || skillsForm[0];

  const updateGroupField = (idx, key, value) => {
    setSkillsForm((prev) => {
      const copy = structuredClone(prev);
      copy[idx][key] = value;
      return copy;
    });
  };

  const updateSkillItem = (groupIdx, skillIdx, key, value) => {
    setSkillsForm((prev) => {
      const copy = structuredClone(prev);
      copy[groupIdx].skills[skillIdx][key] = value;
      return copy;
    });
  };

  const addSkillItem = (groupIdx) => {
    setSkillsForm((prev) => {
      const copy = structuredClone(prev);
      copy[groupIdx].skills.push({
        name: "New Technology",
        level: 85,
        tag: "Proficient",
        icon: "Code2"
      });
      return copy;
    });
  };

  const removeSkillItem = (groupIdx, skillIdx) => {
    setSkillsForm((prev) => {
      const copy = structuredClone(prev);
      copy[groupIdx].skills.splice(skillIdx, 1);
      return copy;
    });
  };

  const addCategory = () => {
    setSkillsForm((prev) => [
      ...prev,
      {
        category: "New Category",
        description: "Description of this skill category.",
        skills: [
          { name: "Sample Skill", level: 90, tag: "Advanced", icon: "Zap" }
        ]
      }
    ]);
    setActiveGroupIndex(skillsForm.length);
  };

  const removeCategory = (idx) => {
    if (skillsForm.length <= 1) {
      alert("At least one skill category is required.");
      return;
    }
    setSkillsForm((prev) => prev.filter((_, i) => i !== idx));
    setActiveGroupIndex(0);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave(skillsForm);
      setSaving(false);
      onClose();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-[#111318] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center">
              <Zap className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Edit Skills &amp; Technologies
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Admin editor: customize categories, proficiencies, and tags
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0 overflow-x-auto">
          {skillsForm.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGroupIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeGroupIndex === idx
                  ? "bg-rose-600 text-white shadow"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>{cat.category || `Category #${idx + 1}`}</span>
              <span className="text-[10px] opacity-75">({cat.skills.length})</span>
            </button>
          ))}

          <button
            onClick={addCategory}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-dashed border-rose-300 dark:border-rose-800"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Body Editor */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {currentGroup && (
            <div className="space-y-5">
              {/* Category Details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Category Information
                  </span>
                  {skillsForm.length > 1 && (
                    <button
                      onClick={() => removeCategory(activeGroupIndex)}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Category</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SkillTextInput
                    label="Category Name"
                    value={currentGroup.category}
                    onChange={(v) => updateGroupField(activeGroupIndex, "category", v)}
                    placeholder="e.g. Front-End Engineering"
                  />
                  <SkillTextInput
                    label="Category Description"
                    value={currentGroup.description}
                    onChange={(v) => updateGroupField(activeGroupIndex, "description", v)}
                    placeholder="Short description of this focus area..."
                  />
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Technologies ({currentGroup.skills.length})
                  </span>
                  <button
                    onClick={() => addSkillItem(activeGroupIndex)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Technology</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {currentGroup.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      {/* Name */}
                      <div className="flex-1">
                        <SkillTextInput
                          label=""
                          value={skill.name}
                          onChange={(v) => updateSkillItem(activeGroupIndex, sIdx, "name", v)}
                          placeholder="Skill name (e.g. React 19)"
                        />
                      </div>

                      {/* Tag */}
                      <div className="w-28">
                        <SkillTextInput
                          label=""
                          value={skill.tag || "Proficient"}
                          onChange={(v) => updateSkillItem(activeGroupIndex, sIdx, "tag", v)}
                          placeholder="Expert / Core"
                        />
                      </div>

                      {/* Percentage slider & number */}
                      <div className="flex items-center gap-2 w-40">
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={skill.level || 80}
                          onChange={(e) =>
                            updateSkillItem(activeGroupIndex, sIdx, "level", parseInt(e.target.value) || 0)
                          }
                          className="w-full accent-rose-600 cursor-pointer"
                        />
                        <span className="text-xs font-mono font-bold w-10 text-right text-rose-600 dark:text-rose-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeSkillItem(activeGroupIndex, sIdx)}
                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors self-end sm:self-center"
                        title="Remove skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? "Saving…" : "Save Skills"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
