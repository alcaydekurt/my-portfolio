import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { INITIAL_PROFILE } from "../data/initialData";

export default function ContactSection({ profile = INITIAL_PROFILE }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const currentProfile = profile || INITIAL_PROFILE;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(currentProfile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Have a project or collaboration in mind?
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Feel free to reach out for academic inquiries, team project opportunities, 
            or questions regarding DCIT 26 coursework deliverables.
          </p>
        </div>

        {/* Reference-Inspired Top 3 Contact Cards Strip (Directly matching Image 3!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Call / Mobile Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 shadow-xs flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-200">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Call / WhatsApp
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {currentProfile.phone}
              </p>
              <p className="text-[11px] text-slate-500">Mon–Fri • 8:00 AM – 6:00 PM</p>
            </div>
          </div>

          {/* Email Card (with click to copy) */}
          <div
            onClick={handleCopyEmail}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 shadow-xs flex items-center justify-between gap-4 group cursor-pointer hover:border-rose-300 dark:hover:border-rose-900 transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Academic Email
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                  {currentProfile.email}
                </p>
                <p className="text-[11px] text-slate-500">
                  {copiedEmail ? "Copied to clipboard!" : "Click to copy email address"}
                </p>
              </div>
            </div>
            <div className="text-slate-400 hover:text-rose-500">
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </div>
          </div>

          {/* Location Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 shadow-xs flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-200">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Location
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {currentProfile.location}
              </p>
              <p className="text-[11px] text-slate-500">{currentProfile.university || "Cavite State University (CvSU)"}</p>
            </div>
          </div>

        </div>{/* end grid */}

      </div>{/* end max-w-7xl */}
    </section>
  );
}
