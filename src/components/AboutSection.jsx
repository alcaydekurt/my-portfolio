import React from "react";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Sparkles,
  Download,
  Edit3,
} from "lucide-react";

export default function AboutSection({ profile, education, onDownloadCv, isAdmin, onEditProfile }) {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Profile &amp; Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            I&apos;m {profile.preferredName}, an IT Scholar &amp; Front-End Developer
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            {profile.bio}
          </p>

          {/* Admin Edit Button */}
          {isAdmin && (
            <button
              onClick={onEditProfile}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-sm"
              title="Edit About section (Admin only)"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit About Section
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 shadow-xs hover:shadow-lg hover:border-rose-300 dark:hover:border-rose-900/50 transition-all duration-300 text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 dark:from-rose-400 dark:to-amber-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stat.note}
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Curriculum & Course Focus */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>Curriculum &amp; Course Focus</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              In{" "}
              <strong className="text-slate-900 dark:text-slate-200 font-semibold">
                {profile.course}
              </strong>
              , we explore the cutting-edge ecosystem of modern web development—from reactive component lifecycles
              and state orchestration to cloud data integration and progressive web technologies.
            </p>

            <div className="space-y-3 mb-6">
              {(profile.courseFocus || []).map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onDownloadCv}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-rose-600/25 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Academic Resume</span>
            </button>
          </div>

          {/* Right: Educational Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>Academic Journey &amp; Milestones</span>
              </h3>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                {profile.academicYear}
              </span>
            </div>

            {education.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.institution}
                  </h4>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900/60 w-fit">
                    {item.period}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {item.degree}
                </div>

                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.honors}</span>
                </div>

                <ul className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  {item.highlights.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
