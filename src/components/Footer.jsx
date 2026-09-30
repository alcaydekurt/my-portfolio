import React from "react";
import {
  ArrowUp,
  Mail,
  Heart,
  Sparkles,
  Code2
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { INITIAL_PROFILE } from "../data/initialData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c0d12] transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-100 dark:border-slate-800/80">
          
          {/* Brand & Course */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-rose-500/20">
                KA
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                Kurt Joshua Alcayde
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              DCIT 26 — Application Development and Emerging Technologies portfolio hub.
              Bachelor of Science in Information Technology • Cavite State University.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#about" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              About Me
            </a>
            <a href="#school-hub" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              School Works Hub
            </a>
            <a href="#skills" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              Skills &amp; Tech
            </a>
            <a href="#contact" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Kurt Joshua Alcayde. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1.5 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>using React, Vite &amp; Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/alcaydekurt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 dark:hover:text-rose-400"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/kurtjoshua-alcayde"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 dark:hover:text-rose-400"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${INITIAL_PROFILE.email}`}
              className="hover:text-rose-600 dark:hover:text-rose-400"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
