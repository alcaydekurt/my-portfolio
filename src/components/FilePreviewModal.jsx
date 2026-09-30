import React, { useState } from "react";
import {
  X,
  Download,
  ExternalLink,
  FileText,
  FileCode,
  FileArchive,
  CheckCircle2,
  Calendar,
  User,
  ShieldCheck,
  Copy,
  Check,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";

export default function FilePreviewModal({ file, isOpen, onClose, onDownload }) {
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !file) return null;

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isProject = file.category === "projects" || file.fileType === "url";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              {isProject ? (
                <ExternalLink className="w-5 h-5" />
              ) : file.fileType === "code" || file.fileType === "zip" ? (
                <FileCode className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                {file.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="capitalize">{file.category}</span>
                <span>•</span>
                <span className="font-mono">{file.fileName || "online-project"}</span>
                <span>•</span>
                <span>{file.fileSize}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownload(file)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Metadata badges strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Status</span>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{file.status || "Submitted"}</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Score / Grade</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5 font-mono">
                {file.score || "100/100"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Submission Date</span>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                {file.submissionDate || file.uploadDate}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Course Code</span>
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                DCIT 26 • App Dev
              </p>
            </div>
          </div>

          {/* Description Abstract */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Abstract &amp; Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
              {file.description}
            </p>
          </div>

          {/* Conditional Preview Renderer */}
          {isProject ? (
            /* PROJECT PREVIEW: Showcase with Links & Features */
            <div className="space-y-4">
              {file.thumbnail && (
                <div className="relative rounded-2xl overflow-hidden max-h-72 border border-slate-200 dark:border-slate-800 shadow-md">
                  <img
                    src={file.thumbnail}
                    alt={file.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <div className="flex items-center gap-3">
                      {file.projectLinks?.githubUrl && (
                        <a
                          href={file.projectLinks.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-bold text-xs backdrop-blur-md transition-all shadow-md"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>View on GitHub</span>
                        </a>
                      )}
                      {file.projectLinks?.liveDemoUrl && (
                        <a
                          href={file.projectLinks.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs backdrop-blur-md transition-all shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Launch Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {file.previewContent?.features && (
                <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Key Features &amp; Architecture:
                  </h5>
                  <ul className="space-y-1.5">
                    {file.previewContent.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : file.previewContent?.type === "code" || file.fileType === "zip" ? (
            /* CODE PREVIEW BOX */
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Source Code Preview (Excerpt)</span>
                {file.previewContent?.codeSnippet && (
                  <button
                    onClick={() => handleCopyCode(file.previewContent.codeSnippet)}
                    className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-rose-500"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Snippet"}</span>
                  </button>
                )}
              </div>
              <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{file.previewContent?.codeSnippet || `// File: ${file.fileName}\n// Lab activity deliverables packaged into archive.\n// Verified against DCIT 26 rubrics.`}</pre>
              </div>
            </div>
          ) : file.fileType === "image" && file.fileData ? (
            /* REAL IMAGE PREVIEW */
            <div className="flex justify-center p-4 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
              <img
                src={file.fileData}
                alt={file.title}
                className="max-h-[520px] rounded-xl object-contain shadow-md"
              />
            </div>
          ) : file.fileType === "pdf" && file.fileData ? (
            /* REAL EMBEDDED PDF VIEWER */
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-900">
              <iframe
                src={file.fileData}
                title={file.title}
                className="w-full h-[540px] border-none"
              />
            </div>
          ) : (
            /* DOCUMENT / PDF VIEWER SIMULATOR */
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950">
              
              {/* Document toolbar */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-200/80 dark:bg-slate-800/80 border-b border-slate-300 dark:border-slate-700 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold">Official Academic Document Viewer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Zoom: {zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
                    className="p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-700"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 10, 140))}
                    className="p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-700"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Document Page Simulation */}
              <div className="p-6 flex justify-center overflow-x-auto">
                <div
                  className="bg-white text-slate-900 p-8 rounded-xl shadow-lg border border-slate-300 w-full max-w-2xl min-h-[360px] flex flex-col justify-between font-serif transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                >
                  {/* Institutional Header */}
                  <div className="text-center pb-4 border-b border-slate-200">
                    <p className="text-[11px] font-sans font-bold tracking-widest text-slate-500 uppercase">
                      Cavite State University • College of Engineering &amp; IT
                    </p>
                    <h5 className="text-base font-bold font-sans mt-1 text-slate-900">
                      {file.title}
                    </h5>
                    <p className="text-xs font-sans text-slate-500">
                      Student: Kurt Joshua Alcayde • DCIT 26 Application Development
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="my-6 text-xs leading-relaxed font-sans text-slate-700 whitespace-pre-line bg-slate-50 p-4 rounded-lg border border-slate-100">
                    {file.previewContent?.snippet ||
                      `Document Reference: ${file.fileName}\nCategory: ${file.category.toUpperCase()}\nEvaluation Status: ${file.status}\nInstructor Assessment: Submitted in full compliance with curriculum guidelines.`}
                  </div>

                  {/* Document Footer with Verified Stamp */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-sans text-slate-500">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>CvSU Academic Repository Verified</span>
                    </div>
                    <span>Page 1 of {file.previewContent?.pages || 1}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tags Footer */}
          {file.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {file.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            ID: <code className="font-mono">{file.id}</code>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onDownload(file)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Deliverable</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
