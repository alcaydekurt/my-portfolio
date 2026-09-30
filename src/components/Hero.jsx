import React from "react";
import {
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  Layers
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { INITIAL_PROFILE } from "../data/initialData";

export default function Hero({ profile = INITIAL_PROFILE, onOpenUpload, onDownloadCv }) {
  const currentProfile = profile || INITIAL_PROFILE;
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background decorative ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Subject badge pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wide uppercase shadow-sm mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>{currentProfile.course ? currentProfile.course.split("-")[0].trim() : "DCIT 26"} • {currentProfile.course ? currentProfile.course.split("-").slice(1).join("-").trim() : "App Development & Emerging Tech"}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-4">
              Hello, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 dark:from-rose-400 dark:via-rose-300 dark:to-amber-400">
                {currentProfile.preferredName || currentProfile.name.split(" ")[0]}
              </span>
              <br />
              <span className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100">
                {currentProfile.role || "Front-End Developer"}
              </span>
            </h1>

            {/* University & Degree Subtitle */}
            <p className="text-base sm:text-lg font-medium text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
              <span>{currentProfile.degree}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>{currentProfile.university}</span>
            </p>

            {/* Comprehensive Bio */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              {currentProfile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#school-hub"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/30 transition-all duration-200 group cursor-pointer"
              >
                <span>Explore School Hub</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onDownloadCv}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 active:scale-95 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Academic CV</span>
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Reference-Inspired Visual Portrait Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-md">
              
              {/* Reference-Styled Crimson Backdrop Shape */}
              <div className="absolute inset-0 mx-auto w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] bg-gradient-to-b from-rose-500 to-rose-600 rounded-[2.5rem] rotate-3 shadow-2xl shadow-rose-500/25 transition-transform hover:rotate-1 duration-500 -z-10"></div>
              
              {/* Secondary offset subtle border card */}
              <div className="absolute inset-0 mx-auto w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] border-2 border-rose-300/40 dark:border-rose-400/20 rounded-[2.5rem] -rotate-3 -z-10"></div>

              {/* Central Avatar / Developer Portrait Frame */}
              <div className="relative mx-auto w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl border-4 border-white dark:border-slate-800 flex items-center justify-center group">
                <img
                  key={currentProfile.avatarUrl}
                  src={currentProfile.avatarUrl}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to stylized SVG avatar if network image is blocked
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = "flex";
                    }
                  }}
                />
                
                {/* Fallback stylized avatar */}
                <div className="hidden absolute inset-0 bg-gradient-to-tr from-slate-900 via-rose-950 to-slate-900 flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center mb-4">
                    <span className="text-3xl font-black">
                      {(currentProfile.name || "KA").split(" ").map(w => w[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{currentProfile.name}</h3>
                  <p className="text-xs text-rose-300">{currentProfile.role}</p>
                </div>

                {/* Subtle dark gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-xs font-semibold text-rose-300 uppercase tracking-widest">{currentProfile.university}</p>
                  <p className="text-sm font-bold text-white flex items-center justify-between">
                    <span>{currentProfile.name}</span>
                    <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-mono">{currentProfile.section}</span>
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Left - Course Status */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce-slow">
                <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Course Status</div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    <span>{currentProfile.course ? currentProfile.course.split("-")[0].trim() : "DCIT 26"} Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Reference-Inspired Bottom Social Pill Cards (Directly matching Image 1 & 2!) */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* GitHub Card */}
            <a
              href={currentProfile.socials?.github || "https://github.com/alcaydekurt"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-200">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  GitHub
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Explore Repos & Code
                </span>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={currentProfile.socials?.linkedin || "https://linkedin.com/in/kurtjoshua-alcayde"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-200">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  LinkedIn
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Connect Professionally
                </span>
              </div>
            </a>

            {/* Academic Lab Works Hub Card */}
            <a
              href="#school-hub"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-200">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  School Vault
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  6 Categorized Tabs
                </span>
              </div>
            </a>

            {/* Email / Contact Card */}
            <a
              href="#contact"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Email Me
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Direct Inquiries
                </span>
              </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
