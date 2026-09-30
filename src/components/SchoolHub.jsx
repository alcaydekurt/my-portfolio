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
  Unlock,
  GripVertical,
  Check,
  CheckSquare,
  Square,
  X,
  Trash
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
  trashFiles = [],
  activeCategory,
  setActiveCategory,
  onOpenUpload,
  onPreviewFile,
  onDeleteFile,
  onReorderFiles,
  onMoveToTrash,
  onBatchMoveToTrash,
  onRestoreFromTrash,
  onBatchRestoreFromTrash,
  onPermanentDelete,
  onBatchPermanentDelete,
  onEmptyTrash,
  onResetFiles,
  onDownloadFile,
  isAdmin = false,
  onOpenAdminModal,
  onAttachFile
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [fileTypeFilter, setFileTypeFilter] = useState("all"); // 'all' | 'pdf' | 'zip' | 'docx' | 'url'
  const [sortBy, setSortBy] = useState("custom"); // 'custom' | 'newest' | 'oldest' | 'name'

  // Multi-selection state
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Drag & drop state
  const [draggedFile, setDraggedFile] = useState(null);
  const [isDraggingActive, setIsDraggingActive] = useState(false);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [isOverTrashZone, setIsOverTrashZone] = useState(false);

  // Clear selection on category switch
  const handleCategorySwitch = (catId) => {
    setActiveCategory(catId);
    setSelectedIds(new Set());
  };

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
        // 'custom' order: keep original array ordering
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
          label: (file.fileType || "FILE").toUpperCase(),
          color: "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
        };
    }
  };

  // Multi-Selection Handlers
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = (targetList) => {
    const allIds = targetList.map((f) => f.id);
    const areAllSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
    if (areAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allIds));
    }
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBatchDelete = () => {
    if (!isAdmin || selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    if (activeCategory === "trash") {
      if (onBatchPermanentDelete) {
        onBatchPermanentDelete(ids);
      }
    } else {
      if (onBatchMoveToTrash) {
        onBatchMoveToTrash(ids);
      } else if (onDeleteFile) {
        ids.forEach((id) => onDeleteFile(id));
      }
    }
    setSelectedIds(new Set());
  };

  const handleBatchRestore = () => {
    if (!isAdmin || selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    if (onBatchRestoreFromTrash) {
      onBatchRestoreFromTrash(ids);
    }
    setSelectedIds(new Set());
  };

  // Drag Handlers
  const handleDragStart = (e, file) => {
    setDraggedFile(file);
    setIsDraggingActive(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", file.id);
  };

  const handleDragEnd = () => {
    setDraggedFile(null);
    setIsDraggingActive(false);
    setDropTargetId(null);
    setIsOverTrashZone(false);
  };

  const handleDragOverCard = (e, targetFile) => {
    e.preventDefault();
    if (!draggedFile || draggedFile.id === targetFile.id) return;
    e.dataTransfer.dropEffect = "move";
    if (dropTargetId !== targetFile.id) {
      setDropTargetId(targetFile.id);
    }
  };

  const handleDropOnCard = (e, targetFile) => {
    e.preventDefault();
    if (!draggedFile || draggedFile.id === targetFile.id) {
      setDropTargetId(null);
      return;
    }

    if (onReorderFiles) {
      const fromIndex = files.findIndex((f) => f.id === draggedFile.id);
      const toIndex = files.findIndex((f) => f.id === targetFile.id);
      if (fromIndex !== -1 && toIndex !== -1) {
        const reordered = [...files];
        const [movedItem] = reordered.splice(fromIndex, 1);
        reordered.splice(toIndex, 0, movedItem);
        onReorderFiles(reordered);
        setSortBy("custom");
      }
    }

    setDraggedFile(null);
    setIsDraggingActive(false);
    setDropTargetId(null);
  };

  const handleDropOnTrash = (e) => {
    e.preventDefault();
    if (!draggedFile) return;

    if (!isAdmin) {
      if (onOpenAdminModal) onOpenAdminModal();
      setDraggedFile(null);
      setIsDraggingActive(false);
      setIsOverTrashZone(false);
      return;
    }

    // If dragged item is part of multi-selection, delete ALL selected items
    if (selectedIds.has(draggedFile.id) && selectedIds.size > 1) {
      const ids = Array.from(selectedIds);
      if (onBatchMoveToTrash) {
        onBatchMoveToTrash(ids);
      } else if (onDeleteFile) {
        ids.forEach((id) => onDeleteFile(id));
      }
      setSelectedIds(new Set());
    } else {
      if (onMoveToTrash) {
        onMoveToTrash(draggedFile.id);
      } else if (onDeleteFile) {
        onDeleteFile(draggedFile.id);
      }
    }

    setDraggedFile(null);
    setIsDraggingActive(false);
    setIsOverTrashZone(false);
  };

  const currentVisibleList = activeCategory === "trash" ? trashFiles : filteredFiles;
  const isAllSelected = currentVisibleList.length > 0 && currentVisibleList.every((f) => selectedIds.has(f.id));

  return (
    <section id="school-hub" className="py-20 md:py-28 relative">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-rose-500/5 blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline & Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive School Works &amp; Files Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Coursework Vault &amp; Deliverables
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore laboratory outputs, homework assignments, project repositories, and exam materials. 
              {isAdmin && (
                <span className="text-rose-600 dark:text-rose-400 font-semibold block mt-1">
                  ✨ Multi-select cards with checkboxes, drag to rearrange, or drag multiple items into the Deletion dropzone.
                </span>
              )}
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
                  onClick={() => onOpenUpload(activeCategory === "trash" ? "laboratory" : activeCategory)}
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
              onClick={() => handleCategorySwitch("all")}
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
                  onClick={() => handleCategorySwitch(cat.id)}
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

            {/* DELETION PAGE TAB (Recycle Bin) */}
            {isAdmin && (
              <button
                onClick={() => handleCategorySwitch("trash")}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsOverTrashZone(true);
                }}
                onDragLeave={() => setIsOverTrashZone(false)}
                onDrop={handleDropOnTrash}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ml-auto ${
                  activeCategory === "trash"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : isOverTrashZone
                    ? "bg-red-100 dark:bg-red-950 text-red-600 border-2 border-red-500 scale-105"
                    : "text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                }`}
                title="View deleted items or drop cards here to delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Recycle Bin</span>
                {trashFiles.length > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeCategory === "trash"
                        ? "bg-white/25 text-white"
                        : "bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {trashFiles.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ========================================================
            IF IN TRASH / DELETION PAGE
            ======================================================== */}
        {activeCategory === "trash" ? (
          <div className="space-y-6">
            {/* Deletion Dropzone Banner */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsOverTrashZone(true);
              }}
              onDragLeave={() => setIsOverTrashZone(false)}
              onDrop={handleDropOnTrash}
              className={`p-8 sm:p-12 rounded-3xl border-3 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center ${
                isOverTrashZone
                  ? "border-red-500 bg-red-100/80 dark:bg-red-950/60 text-red-700 dark:text-red-200 scale-[1.01] shadow-xl shadow-red-500/20"
                  : "border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 transition-transform duration-300 ${
                  isOverTrashZone
                    ? "bg-red-600 text-white scale-125 shadow-lg shadow-red-600/40"
                    : "bg-red-50 dark:bg-red-950/80 text-red-500"
                }`}
              >
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {isOverTrashZone
                  ? `Release to Delete ${selectedIds.size > 1 ? `${selectedIds.size} Selected Items` : "Card"}`
                  : "Drop Cards Here to Delete"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1.5">
                Drag any schoolwork card from any category and drop it onto this page to move it to the Recycle Bin.
              </p>
            </div>

            {/* Trash Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Deleted Files ({trashFiles.length})
                </span>
                {trashFiles.length > 0 && (
                  <button
                    onClick={() => handleSelectAll(trashFiles)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-rose-500" />
                    <span>{isAllSelected ? "Deselect All" : "Select All"}</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCategorySwitch("all")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  ← Back to Vault
                </button>
                {trashFiles.length > 0 && (
                  <button
                    onClick={onEmptyTrash}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
                  >
                    Empty Recycle Bin
                  </button>
                )}
              </div>
            </div>

            {/* Trash List */}
            {trashFiles.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Recycle Bin is Empty
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  You haven&apos;t moved any files to the trash. Drag any card from your portfolio into this area to test deleting.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {trashFiles.map((file) => {
                  const badge = getFileBadge(file);
                  const BadgeIcon = badge.icon;
                  const isSelected = selectedIds.has(file.id);

                  return (
                    <div
                      key={file.id}
                      className={`relative p-5 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm flex flex-col justify-between transition-all ${
                        isSelected
                          ? "border-rose-500 ring-2 ring-rose-500 bg-rose-50/20 dark:bg-rose-950/20"
                          : "border-slate-200 dark:border-slate-800 opacity-85 hover:opacity-100"
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleSelect(file.id)}
                        className={`absolute top-3 left-3 z-10 w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-rose-600 text-white shadow-xs"
                            : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-rose-400"
                        }`}
                        title={isSelected ? "Deselect" : "Select item"}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="pl-7">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${badge.color}`}
                          >
                            <BadgeIcon className="w-3 h-3" />
                            <span>{badge.label}</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {file.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                          {file.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                          {file.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 gap-2">
                        <button
                          onClick={() => onRestoreFromTrash && onRestoreFromTrash(file.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restore</span>
                        </button>
                        <button
                          onClick={() => onPermanentDelete && onPermanentDelete(file.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                          title="Permanently Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ========================================================
             STANDARD WORK VAULT VIEW
             ======================================================== */
          <>
            {/* Filter, Search & View Controls Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, tags, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-2xs transition-all"
                />
              </div>

              {/* Format, Sort & Layout Switcher */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                
                {/* Select All Button for Admin */}
                {isAdmin && filteredFiles.length > 0 && (
                  <button
                    onClick={() => handleSelectAll(filteredFiles)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    title={isAllSelected ? "Deselect All" : "Select all filtered files"}
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-rose-500" />
                    <span>{isAllSelected ? "Deselect All" : "Select All"}</span>
                  </button>
                )}

                {/* File Type Filter */}
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
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
                  <option value="custom">Custom Order (Drag &amp; Drop)</option>
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

            {/* Drag & Drop Reorder Tip Badge */}
            {isAdmin && filteredFiles.length > 1 && (
              <div className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 text-xs w-fit">
                <GripVertical className="w-3.5 h-3.5 text-rose-500" />
                <span>Select multiple cards using checkboxes to delete together, or drag cards to rearrange.</span>
              </div>
            )}

            {/* Empty State */}
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
                 GRID CARD VIEW (Draggable, Selectable & Reorderable)
                 ======================================================== */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFiles.map((file) => {
                  const badge = getFileBadge(file);
                  const BadgeIcon = badge.icon;
                  const isProject = file.category === "projects" || file.fileType === "url";
                  const isBeingDragged = draggedFile?.id === file.id;
                  const isDropTarget = dropTargetId === file.id && !isBeingDragged;
                  const isSelected = selectedIds.has(file.id);

                  return (
                    <div
                      key={file.id}
                      draggable={isAdmin}
                      onDragStart={(e) => handleDragStart(e, file)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOverCard(e, file)}
                      onDrop={(e) => handleDropOnCard(e, file)}
                      className={`group relative bg-white dark:bg-slate-900/80 border rounded-2xl overflow-hidden shadow-xs transition-all duration-300 flex flex-col ${
                        isBeingDragged
                          ? "opacity-35 scale-95 border-dashed border-rose-500 shadow-none ring-2 ring-rose-400"
                          : isDropTarget
                          ? "border-rose-500 ring-2 ring-rose-500 scale-[1.02] shadow-xl"
                          : isSelected
                          ? "border-rose-500 ring-2 ring-rose-500/80 bg-rose-50/20 dark:bg-rose-950/20 shadow-md"
                          : "border-slate-200/90 dark:border-slate-800/90 hover:shadow-xl hover:border-rose-300 dark:hover:border-rose-900/70"
                      } ${isAdmin ? "cursor-grab active:cursor-grabbing" : ""}`}
                    >
                      {/* Checkbox for Admin Multi-Select */}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(file.id);
                          }}
                          className={`absolute top-3 left-3 z-30 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-rose-600 text-white shadow-md ring-2 ring-white dark:ring-slate-900 scale-105"
                              : "bg-black/35 hover:bg-black/65 text-transparent hover:text-white/60 border border-white/40 backdrop-blur-md"
                          }`}
                          title={isSelected ? "Deselect" : "Select item for batch action"}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      )}

                      {/* Drag Grip Handle for Admin */}
                      {isAdmin && (
                        <div
                          className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-white backdrop-blur-md opacity-60 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                          title="Drag to rearrange card or drop in trash to delete"
                        >
                          <GripVertical className="w-3.5 h-3.5" />
                        </div>
                      )}

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
                          <div className={`absolute top-3 ${isAdmin ? "left-12" : "left-3"} right-11 flex items-center justify-between`}>
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
                          <div className={`flex items-center justify-between gap-2 mb-3 ${isAdmin ? "pl-7 pr-8" : ""}`}>
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

                        {/* Meta info footer */}
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

                          {isAdmin && onAttachFile && (
                            <label
                              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
                              title="Attach or replace real file"
                            >
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>Replace</span>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    onAttachFile(file.id, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          )}

                          {isAdmin && (
                            <button
                              onClick={() => {
                                if (onMoveToTrash) {
                                  onMoveToTrash(file.id);
                                } else if (onDeleteFile) {
                                  onDeleteFile(file.id);
                                }
                              }}
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
                 TABLE / LIST VIEW (Draggable & Selectable Rows)
                 ======================================================== */
              <div className="overflow-x-auto bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                      {isAdmin && (
                        <th className="py-3.5 px-3 w-8">
                          <button
                            onClick={() => handleSelectAll(filteredFiles)}
                            className="text-slate-400 hover:text-rose-500"
                            title="Select / Deselect All"
                          >
                            {isAllSelected ? <CheckSquare className="w-4 h-4 text-rose-600" /> : <Square className="w-4 h-4" />}
                          </button>
                        </th>
                      )}
                      {isAdmin && <th className="py-3.5 px-2 w-6"></th>}
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
                      const isBeingDragged = draggedFile?.id === file.id;
                      const isDropTarget = dropTargetId === file.id && !isBeingDragged;
                      const isSelected = selectedIds.has(file.id);

                      return (
                        <tr
                          key={file.id}
                          draggable={isAdmin}
                          onDragStart={(e) => handleDragStart(e, file)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => handleDragOverCard(e, file)}
                          onDrop={(e) => handleDropOnCard(e, file)}
                          className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                            isBeingDragged
                              ? "opacity-30 bg-rose-50"
                              : isDropTarget
                              ? "bg-rose-100/60 dark:bg-rose-950/40"
                              : isSelected
                              ? "bg-rose-50/30 dark:bg-rose-950/30"
                              : ""
                          }`}
                        >
                          {/* Row Checkbox */}
                          {isAdmin && (
                            <td className="py-3.5 px-3">
                              <button
                                type="button"
                                onClick={() => toggleSelect(file.id)}
                                className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                                  isSelected
                                    ? "bg-rose-600 text-white shadow-xs"
                                    : "border border-slate-300 dark:border-slate-600 text-transparent"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </button>
                            </td>
                          )}

                          {/* Grip */}
                          {isAdmin && (
                            <td className="py-3.5 px-2 text-slate-400 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-4 h-4" />
                            </td>
                          )}

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
                              {isAdmin && onAttachFile && (
                                <label
                                  className="p-1.5 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer"
                                  title="Attach or replace real file"
                                >
                                  <UploadCloud className="w-4 h-4" />
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files?.[0]) {
                                        onAttachFile(file.id, e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              )}
                              {isAdmin && (
                                <button
                                  onClick={() => {
                                    if (onMoveToTrash) {
                                      onMoveToTrash(file.id);
                                    } else if (onDeleteFile) {
                                      onDeleteFile(file.id);
                                    }
                                  }}
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
          </>
        )}

      </div>

      {/* ========================================================
          FLOATING BATCH ACTIONS DOCK (When items are selected)
          ======================================================== */}
      {isAdmin && selectedIds.size > 0 && !isDraggingActive && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9990] px-5 py-3 rounded-2xl bg-slate-900/95 dark:bg-black/95 border border-slate-700 text-white shadow-2xl backdrop-blur-xl flex items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-mono text-xs font-bold flex items-center justify-center">
              {selectedIds.size}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {selectedIds.size === 1 ? "item selected" : "items selected"}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          {activeCategory === "trash" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBatchRestore}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore ({selectedIds.size})</span>
              </button>
              <button
                onClick={handleBatchDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Forever</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleBatchDelete}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedIds.size})</span>
            </button>
          )}

          <button
            onClick={handleClearSelection}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Deselect All"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================
          FLOATING DRAG-TO-DELETE DOCK (Active while dragging cards)
          ======================================================== */}
      {isDraggingActive && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            setIsOverTrashZone(true);
          }}
          onDragLeave={() => setIsOverTrashZone(false)}
          onDrop={handleDropOnTrash}
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-7 py-4 rounded-3xl border-2 shadow-2xl backdrop-blur-xl transition-all duration-300 flex items-center gap-4 cursor-pointer ${
            isOverTrashZone
              ? "bg-red-600/95 border-white text-white scale-110 shadow-red-600/60 ring-4 ring-red-400 animate-pulse"
              : "bg-slate-900/95 dark:bg-black/95 border-red-500/60 text-white shadow-red-950/50"
          }`}
        >
          <div
            className={`p-3 rounded-2xl transition-colors ${
              isOverTrashZone
                ? "bg-white text-red-600"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            <Trash2 className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base">
              {isOverTrashZone
                ? selectedIds.has(draggedFile?.id) && selectedIds.size > 1
                  ? `Release to Delete ${selectedIds.size} Selected Items!`
                  : "Release to Delete!"
                : "Drop Here to Delete"}
            </div>
            <div className="text-xs text-red-200">
              {selectedIds.has(draggedFile?.id) && selectedIds.size > 1
                ? `${selectedIds.size} items will be moved to the Recycle Bin`
                : draggedFile
                ? `"${draggedFile.title.slice(0, 32)}..." will be moved to Recycle Bin`
                : "Drag card onto this zone to remove"}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
