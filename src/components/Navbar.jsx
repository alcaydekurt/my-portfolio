import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Upload,
  FolderOpen,
  Code2,
  User,
  Mail,
  Menu,
  X,
  Lock,
  Unlock,
  ShieldCheck
} from "lucide-react";

export default function Navbar({
  isDark,
  toggleTheme,
  onOpenUpload,
  filesCount,
  isAdmin,
  onOpenAdminModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", icon: User },
    { name: "School Works", href: "#school-hub", icon: FolderOpen, badge: filesCount },
    { name: "Skills", href: "#skills", icon: Code2 },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-[#0e1017]/85 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Kurt Joshua Alcayde Portfolio Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform duration-300">
              <span>KA</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0e1017]" title="Active Student Status"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Kurt Joshua
                <span className="text-xs px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider">
                  BSIT
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                DCIT 26 • App Dev Hub
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-full transition-colors duration-200 hover:bg-white dark:hover:bg-slate-800"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Viewer / Admin Mode Toggle Pill */}
            <button
              onClick={onOpenAdminModal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer border ${
                isAdmin
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-600"
              }`}
              title={isAdmin ? "Admin privileges enabled. Click to configure." : "Public viewer mode. Click to unlock upload/delete privileges."}
            >
              {isAdmin ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline">Admin Mode</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Viewer</span>
                </>
              )}
            </button>

            {/* Quick Upload Button (Admin only!) */}
            {isAdmin && (
              <button
                onClick={onOpenUpload}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-full shadow-sm shadow-rose-600/30 transition-all duration-200 cursor-pointer animate-fade-in"
                title="Upload new file to School Hub"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Work</span>
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white/95 dark:bg-[#12141c]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl transition-all animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge !== undefined && (
                      <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1 space-y-2">
                {isAdmin ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenUpload();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload School Work</span>
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors"
                >
                  {isAdmin ? <Unlock className="w-3.5 h-3.5 text-emerald-500" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{isAdmin ? "Admin Privileges Active" : "Viewer Mode (Click to Unlock)"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
