import React from "react";
import {
  X,
  Download,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Code2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award
} from "lucide-react";
import { INITIAL_PROFILE } from "../data/initialData";

export default function CvModal({ isOpen, onClose, onDownload }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Kurt Joshua Alcayde — Academic CV Preview
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownload({ title: "Kurt_Joshua_Alcayde_CV.pdf" })}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Paper Simulated Document View */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Kurt Joshua Alcayde
            </h1>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
              Front-End Developer &bull; BS Information Technology &bull; Cavite State University
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-rose-500" />
                <span>{INITIAL_PROFILE.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-rose-500" />
                <span>{INITIAL_PROFILE.phone}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{INITIAL_PROFILE.location}</span>
              </span>
            </div>
          </div>

          {/* Academic Profile Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-rose-500" />
              <span>Executive Academic Profile</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              Third-year Information Technology scholar at Cavite State University specializing in 
              modern web applications and emerging technologies (DCIT 26). Dean&apos;s Honors Lister with a 
              1.24 General Weighted Average, with hands-on expertise in React 19, TypeScript, Tailwind CSS, 
              REST APIs, and cloud deployments.
            </p>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-rose-500" />
              <span>Education</span>
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>Bachelor of Science in Information Technology (BSIT)</span>
                  <span className="text-rose-600 dark:text-rose-400">2022 — Present</span>
                </div>
                <div className="text-slate-500">Cavite State University (CvSU) &bull; College of Engineering and IT</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  Honors: Dean&apos;s Lister (1.24 GWA) &bull; Section 3-1 Regular
                </div>
              </div>
            </div>
          </div>

          {/* Key Coursework: DCIT 26 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-rose-500" />
              <span>DCIT 26 — Application Development Competencies</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Single Page Application Performance &amp; Virtual DOM</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Asynchronous Network Pipelines &amp; RESTful APIs</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Real-Time WebSockets &amp; Telemetry Streaming</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Token Authentication (JWT) &amp; Session Handling</span>
              </div>
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Technical Proficiencies
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-200">Languages &amp; Libraries:</strong> React 19, JavaScript ES6+, TypeScript, Next.js, Vite, HTML5, CSS3, Tailwind CSS, Node.js, Express, SQL, C++.<br />
              <strong className="text-slate-800 dark:text-slate-200">Databases &amp; Cloud:</strong> Supabase, PostgreSQL, MongoDB, Vercel, Git, GitHub.<br />
              <strong className="text-slate-800 dark:text-slate-200">Tools:</strong> VS Code, Postman, Figma, Git CLI.
            </p>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Document Version: 2024.2 &bull; Verified Academic Resume
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
