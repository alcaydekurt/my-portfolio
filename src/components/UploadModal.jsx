import React, { useState, useRef } from "react";
import {
  X,
  UploadCloud,
  FileText,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Globe
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { CATEGORIES } from "../data/initialData";
import confetti from "canvas-confetti";
import { storeFileInDB } from "../utils/fileStorage";

export default function UploadModal({ isOpen, onClose, onAddFile, defaultCategory }) {
  const [submissionMode, setSubmissionMode] = useState("file"); // 'file' | 'project-url'
  const [category, setCategory] = useState(defaultCategory !== "all" ? defaultCategory : "laboratory");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Submitted");
  const [score, setScore] = useState("");

  // File Upload State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Project URL state
  const [githubUrl, setGithubUrl] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle Drag & Drop events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    if (!title) {
      // Auto-populate title from clean filename
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  // Determine file type from extension
  const getFileType = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["pdf"].includes(ext)) return "pdf";
    if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "zip";
    if (["doc", "docx"].includes(ext)) return "docx";
    if (["jpg", "jpeg", "png", "webp", "svg"].includes(ext)) return "image";
    if (["js", "jsx", "ts", "tsx", "html", "css", "json", "py", "java"].includes(ext)) return "code";
    if (["ppt", "pptx"].includes(ext)) return "pptx";
    return "other";
  };

  // Submit Handler with Realistic Simulated Upload Progress
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please provide a title for this submission.");
      return;
    }

    if (submissionMode === "file" && !selectedFile) {
      alert("Please select or drop a file to upload.");
      return;
    }

    if (submissionMode === "project-url" && !githubUrl && !liveDemoUrl) {
      alert("Please provide at least a GitHub URL or Live Demo URL.");
      return;
    }

    // Start simulated upload progress
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            finishUpload();
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 120);
  };

  const finishUpload = async () => {
    setIsUploading(false);

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if not loaded
    }

    const newId = `work-${Date.now()}`;
    const parsedTags = tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : ["DCIT 26", "Student Work"];

    let newFileItem;

    if (submissionMode === "project-url") {
      newFileItem = {
        id: newId,
        title: title.trim(),
        category: category,
        fileType: "url",
        fileName: `${title.toLowerCase().replace(/\s+/g, "-")}-repo`,
        fileSize: "Web App / Cloud",
        uploadDate: new Date().toISOString().split("T")[0],
        submissionDate: new Date().toLocaleString(),
        dueDate: dueDate,
        status: status || "Submitted",
        score: score || "Pending",
        description: description.trim() || "Full-stack project submission for DCIT 26 Application Development.",
        tags: parsedTags,
        projectLinks: {
          githubUrl: githubUrl.trim() || undefined,
          liveDemoUrl: liveDemoUrl.trim() || undefined
        },
        thumbnail:
          thumbnailUrl.trim() ||
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        previewContent: {
          type: "project-showcase",
          overview: description.trim() || "Student project showcase repository.",
          features: [
            "Modular architecture and component state handling",
            "Deployed with cloud CI/CD integration",
            "Responsive layout tested across desktop and mobile"
          ],
          techStack: parsedTags
        }
      };
    } else {
      const type = getFileType(selectedFile.name);
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB";

      // Read real binary file as Data URL
      let dataUrl = "";
      try {
        dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
      } catch (err) {
        console.warn("Could not read file as DataURL:", err);
      }

      // Read text snippet if code or text file
      let codeSnippet = "";
      const ext = selectedFile.name.split(".").pop().toLowerCase();
      if (type === "code" || ["txt", "md", "json", "html", "css", "js", "jsx", "ts", "tsx", "py", "sql"].includes(ext)) {
        try {
          codeSnippet = await new Promise((resolve) => {
            const textReader = new FileReader();
            textReader.onload = () => resolve((textReader.result || "").slice(0, 5000));
            textReader.onerror = () => resolve("");
            textReader.readAsText(selectedFile);
          });
        } catch (e) {}
      }

      // Store in IndexedDB for reliable persistence
      if (dataUrl) {
        await storeFileInDB(newId, dataUrl, selectedFile.name, selectedFile.type);
      }

      newFileItem = {
        id: newId,
        title: title.trim(),
        category: category,
        fileType: type,
        fileName: selectedFile.name,
        fileSize: sizeMB,
        mimeType: selectedFile.type || "application/octet-stream",
        fileData: dataUrl || undefined,
        uploadDate: new Date().toISOString().split("T")[0],
        submissionDate: new Date().toLocaleString(),
        dueDate: dueDate,
        status: status || "Submitted",
        score: score || "Pending Review",
        description: description.trim() || "Coursework submission for DCIT 26.",
        tags: parsedTags,
        downloadUrl: "#",
        thumbnail: type === "image" && dataUrl ? dataUrl : undefined,
        previewContent: {
          type: type === "pdf" ? "pdf-doc" : type === "code" ? "code" : type === "image" ? "image" : "document",
          title: title.trim(),
          fileName: selectedFile.name,
          author: "Kurt Joshua Alcayde",
          codeSnippet: codeSnippet || undefined,
          snippet: `File: ${selectedFile.name}\nSize: ${sizeMB}\nStatus: Verified Upload\nCourse: DCIT 26`
        }
      };
    }

    onAddFile(newFileItem);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setGithubUrl("");
    setLiveDemoUrl("");
    setThumbnailUrl("");
    setScore("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload School Work or Project
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Submit files to your DCIT 26 Academic Hub with live previews
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Submission Mode Selector: File vs Project Links */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setSubmissionMode("file")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                submissionMode === "file"
                  ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Standard File Upload (PDF, ZIP, DOCX)</span>
            </button>
            <button
              type="button"
              onClick={() => setSubmissionMode("project-url")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                submissionMode === "project-url"
                  ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Project Repository &amp; Live Demo</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Category & Status Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Submission Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  <option value="Submitted On Time">Submitted On Time</option>
                  <option value="Graded">Graded / Perfect</option>
                  <option value="Featured Project">Featured Project</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Verified Official">Verified Official Document</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Work Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Lab 05: Modern API Integration & WebSockets"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            {/* Mode 1: Drag & Drop Zone */}
            {submissionMode === "file" ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Upload Document or Archive <span className="text-rose-500">*</span>
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                    dragActive
                      ? "border-rose-500 bg-rose-50/60 dark:bg-rose-950/20 scale-[0.99]"
                      : selectedFile
                      ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20"
                      : "border-slate-300 dark:border-slate-700 hover:border-rose-400 bg-slate-50/50 dark:bg-slate-800/40"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.zip,.rar,.7z,.doc,.docx,.png,.jpg,.jpeg,.pptx,.js,.jsx,.ts,.tsx"
                  />

                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {selectedFile.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Drag and drop your file here, or{" "}
                        <span className="text-rose-600 dark:text-rose-400 underline">browse files</span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Supports PDF, ZIP, DOCX, PPTX, Images, and Source Code
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Mode 2: Project External URLs */
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Repository URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/alcaydekurt/project-repo"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Demo / Production URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://project-demo.vercel.app"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Project Thumbnail Image URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or direct image link"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Description / Abstract / Deliverables
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of requirements met, architecture, or assignment outcomes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            {/* Tags & Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Tailwind, DCIT 26, Hooks"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Score / Grade Received (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100/100 or 98%"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Simulated Upload Progress Bar */}
            {isUploading && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
                    <span>Uploading and verifying file integrity...</span>
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Save to School Hub"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
