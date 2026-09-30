import React, { useState } from "react";
import {
  Code2,
  Server,
  Terminal,
  Sparkles,
  Zap,
  Palette,
  FileCode2,
  Layout,
  Smartphone,
  Cpu,
  Database,
  ShieldCheck,
  HardDrive,
  GitBranch,
  Send,
  Cloud,
  Layers,
  Boxes,
  Radio,
  Wifi,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { SKILLS_DATA } from "../data/initialData";

const ICON_MAP = {
  Code2,
  Zap,
  Palette,
  FileCode2,
  Layout,
  Smartphone,
  Server,
  Cpu,
  Database,
  ShieldCheck,
  HardDrive,
  GitBranch,
  Terminal,
  Send,
  Cloud,
  Layers,
  Boxes,
  Radio,
  Wifi,
  Sparkles,
  Calendar
};

export default function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills &amp; Technologies
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Curated toolkit covering frontend engineering, backend services, cloud deployment, 
            and modern paradigms practiced in DCIT 26.
          </p>
        </div>

        {/* 4 Reference-Inspired Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS_DATA.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-rose-300 dark:hover:border-rose-900/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>{group.category}</span>
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
                    {group.skills.length} Technologies
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {group.description}
                </p>

                {/* Skill List items with meters */}
                <div className="space-y-4">
                  {group.skills.map((skill, sIdx) => {
                    const SkillIcon = ICON_MAP[skill.icon] || Code2;

                    return (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                            <SkillIcon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                            <span>{skill.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {skill.tag}
                            </span>
                            <span className="font-mono font-bold text-[11px] text-slate-500 dark:text-slate-400">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom tag checklist */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tested in DCIT 26 Practicals</span>
                </span>
                <span>Active Track</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
