import React, { useState, useMemo } from "react";
import { CATEGORIES } from "../data/initialData";
import {
  FlaskConical,
  BookOpen,
  Award,
  Layers,
  FileCheck,
  FolderArchive,
  Search,
  Filter,
  Grid,
  List as ListIcon,
  UploadCloud,
  FileText,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  ExternalLink,
  Download,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Plus,
  Lock,
  Unlock
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";

// Icon mapping helper
const CATEGORY_ICONS = {
  FlaskConical: FlaskConical,
  BookOpen: BookOpen,
  Award: Award,
  Layers: Layers,
  FileCheck: FileCheck,
  FolderArchive: FolderArchive,
};

export default function SchoolHub({
  files,
  activeCategory,
  setActiveCategory,
  onOpenUpload,
  onPreviewFile,
  onDeleteFile,
  onResetFiles,
  onDownloadFile,
  isAdmin = false,
  onOpenAdminModal
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [fileTypeFilter, setFileTypeFilter] = useState("all"); // 'all' | 'pdf' | 'zip' | 'docx' | 'url'
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'name'

  // Filtered and sorted files
  const filteredFiles = useMemo(() => {
    return files
      .filter((file) => {
        // Category check (or all)
        const matchCategory =
          activeCategory === "all" ? true : file.category === activeCategory;

        // Search query check
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
          q === "" ||
          file.title.toLowerCase().includes(q) ||
          (file.fileName && file.fileName.toLowerCase().includes(q)) ||
          file.description.toLowerCase().includes(q) ||
          (file.tags && file.tags.some((t) => t.toLowerCase().includes(q)));

        // File format check
        const matchType =
          fileTypeFilter === "all" || file.fileType === fileTypeFilter;

        return matchCategory && matchSearch && matchType;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        }
        if (sortBy === "oldest") {
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        }
        if (sortBy === "name") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [files, activeCategory, searchQuery, fileTypeFilter, sortBy]);

  // Compute category count breakdown
  const categoryCounts = useMemo(() => {
    const counts = { all: files.length };
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = files.filter((f) => f.category === cat.id).length;
    });
    return counts;
  }, [files]);

  // File type icon and style helper
  const getFileBadge = (file) => {
    switch (file.fileType) {
      case "pdf":
        return {
          icon: FileText,
          label: "PDF",
          color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-900/60",
        };
      case "zip":
        return {
          icon: FileArchive,
          label: "ZIP / ARCHIVE",
          color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900/60",
        };
      case "docx":
      case "doc":
        return {
          icon: FileText,
          label: "DOCX",
          color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/60",
        };
      case "url":
        return {
          icon: ExternalLink,
          label: "LIVE / REPO",
          color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/60",
        };
      case "pptx":
        return {
          icon: FileText,
          label: "PPTX",
          color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-900/60",
        };
      default:
        return {
          icon: FileCode,
          label: "FILE",
          color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900/60",
        };
    }
  };

  return (
    <section id="school-hub" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive School Works &amp; File Vault</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              School Works &amp; Files Hub
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-base max-w-2xl">
              Centralized repository for DCIT 26 coursework. Upload, view, filter, preview, 
              and download laboratory activities, term assignments, exam reviewers, and projects.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <>
                <button
                  onClick={onResetFiles}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 transition-colors shadow-sm cursor-pointer"
                  title="Reset files to original sample dataset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Samples</span>
                </button>

                <button
                  onClick={() => onOpenUpload(activeCategory)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-xl font-bold text-xs shadow-md shadow-rose-600/25 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Work</span>
                </button>
              </>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all shadow-xs cursor-pointer"
                title="Public Viewer Mode: Uploads and deletions are hidden. Click to configure access."
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Viewer Mode</span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                  Read-Only
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Navigation Bar */}
        <div className="mb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {/* "All Works" Tab */}
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <span>All Works</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeCategory === "all"
                    ? "bg-rose-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {categoryCounts.all}
              </span>
            </button>

            {/* Individual Category Tabs */}
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] || FileText;
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, tag, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-800 dark:text-slate-100 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter by file type + Sort + View mode */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
              
              {/* File Type Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <select
                  value={fileTypeFilter}
                  onChange={(e) => setFileTypeFilter(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="all">All File Types</option>
                  <option value="pdf">PDF Documents</option>
                  <option value="zip">ZIP / Archives</option>
                  <option value="docx">Word DOCX</option>
                  <option value="url">Projects / Links</option>
                </select>
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="name">Sort: File Name A–Z</option>
              </select>

              {/* Grid vs Table View Switch */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                  title="Card Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "table"
                      ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                  title="List / Table View"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Content Section: Empty state OR File cards */}
        {filteredFiles.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
            <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No files found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
              {searchQuery
                ? `No submissions matched "${searchQuery}". Try adjusting your search or filter.`
                : "No files currently uploaded in this category. Upload one to get started!"}
            </p>
            <div className="flex items-center justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFileTypeFilter("all");
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
                >
                  Clear Filters
                </button>
              )}
              {isAdmin ? (
                <button
                  onClick={() => onOpenUpload(activeCategory)}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md cursor-pointer"
                >
                  Upload File Now
                </button>
              ) : (
                <button
                  onClick={onOpenAdminModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl cursor-pointer"
                >
                  Unlock Admin to Upload
                </button>
              )}
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* ========================================================
             GRID CARD VIEW (Rich Modern Cards)
             ======================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => {
              const badge = getFileBadge(file);
              const BadgeIcon = badge.icon;
              const isProject = file.category === "projects" || file.fileType === "url";

              return (
                <div
                  key={file.id}
                  className="group relative bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-rose-300 dark:hover:border-rose-900/70 transition-all duration-300 flex flex-col"
                >
                  {/* If it's a project with thumbnail, show header banner */}
                  {isProject && file.thumbnail && (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                      <img
                        src={file.thumbnail}
                        alt={file.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                      
                      {/* Top badges over thumbnail */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border backdrop-blur-md ${badge.color}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>

                        {file.score && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white shadow-xs backdrop-blur-sm">
                            {file.score}
                          </span>
                        )}
                      </div>

                      {/* Project quick links overlay in thumbnail */}
                      {file.projectLinks && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          {file.projectLinks.githubUrl && (
                            <a
                              href={file.projectLinks.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md transition-colors"
                              title="GitHub Repository"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {file.projectLinks.liveDemoUrl && (
                            <a
                              href={file.projectLinks.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs backdrop-blur-md transition-colors"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Main Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Header info (when no thumbnail) */}
                    {(!isProject || !file.thumbnail) && (
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${badge.color}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>

                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            file.status?.includes("Graded") || file.status?.includes("Verified") || file.status?.includes("On Time")
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                              : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                          }`}
                        >
                          {file.status || "Uploaded"}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {file.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
                      {file.description}
                    </p>

                    {/* Tags */}
                    {file.tags && file.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {file.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            #{tag}
                          </span>
                        ))}
                        {file.tags.length > 3 && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 text-slate-400">
                            +{file.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Meta info footer: File size, upload date, score */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{file.fileSize || "1.2 MB"}</span>
                        <span>•</span>
                        <span>{file.uploadDate}</span>
                      </div>
                      {file.score && (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {file.score}
                        </span>
                      )}
                    </div>

                    {/* Card Actions Bar */}
                    <div className={`grid ${isAdmin ? "grid-cols-3" : "grid-cols-2"} gap-2`}>
                      <button
                        onClick={() => onPreviewFile(file)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                        title="Preview file content"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => onDownloadFile(file)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Download file"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => onDeleteFile(file.id)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
                          title="Delete file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================
             TABLE / LIST VIEW (Clean Institutional Layout)
             ======================================================== */
          <div className="overflow-x-auto bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">Work / File Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Type &amp; Size</th>
                  <th className="py-3.5 px-4">Date / Due</th>
                  <th className="py-3.5 px-4">Status / Score</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredFiles.map((file) => {
                  const badge = getFileBadge(file);
                  const BadgeIcon = badge.icon;

                  return (
                    <tr
                      key={file.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Title & tags */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {file.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                          {file.fileName || "online-submission"}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="capitalize text-slate-600 dark:text-slate-300 font-medium">
                          {file.category}
                        </span>
                      </td>

                      {/* Type & Size */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${badge.color}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                        <span className="ml-2 text-slate-400 font-mono">
                          {file.fileSize || "N/A"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                        {file.uploadDate}
                      </td>

                      {/* Status / Score */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {file.score || file.status || "Submitted"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onPreviewFile(file)}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Preview File"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDownloadFile(file)}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Download File"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => onDeleteFile(file.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}
