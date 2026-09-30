import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SchoolHub from "./components/SchoolHub";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import UploadModal from "./components/UploadModal";
import FilePreviewModal from "./components/FilePreviewModal";
import CvModal from "./components/CvModal";
import AdminUnlockModal from "./components/AdminUnlockModal";
import Toast from "./components/Toast";
import ProfileEditModal from "./components/ProfileEditModal";
import {
  getStoredFiles,
  saveFilesToStorage,
  resetStoredFiles,
  getStoredProfile,
  saveProfileToStorage,
  getStoredEducation,
  saveEducationToStorage,
  getStoredTrash,
  saveTrashToStorage
} from "./data/initialData";

export default function App() {
  // Theme state: dark mode toggle
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("kurt_portfolio_theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return true;
  });

  // Apply dark mode class to <html> element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("kurt_portfolio_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("kurt_portfolio_theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Read-only / Admin mode state (STRICTLY FALSE BY DEFAULT FOR ALL PUBLIC VISITORS)
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== "undefined") {
      // Only keep admin if an active verified session exists in current tab
      return sessionStorage.getItem("kurt_portfolio_auth_session") === "active";
    }
    return false;
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // If ?mode=admin is entered in URL, trigger the Passcode Verification Modal
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode") === "admin" || params.get("admin") === "true") {
        if (!isAdmin) {
          setIsAdminModalOpen(true);
        }
      }
    }
  }, [isAdmin]);

  // Toggle admin / viewer mode with secure session storage
  const handleToggleAdmin = (enableAdmin) => {
    setIsAdmin(enableAdmin);
    if (typeof window !== "undefined") {
      if (enableAdmin) {
        sessionStorage.setItem("kurt_portfolio_auth_session", "active");
        const url = new URL(window.location.href);
        url.searchParams.set("mode", "admin");
        window.history.replaceState({}, "", url.toString());
        showToast("🔓 Passcode verified! Admin mode active.");
      } else {
        sessionStorage.removeItem("kurt_portfolio_auth_session");
        const url = new URL(window.location.href);
        url.searchParams.delete("mode");
        url.searchParams.delete("admin");
        url.searchParams.delete("edit");
        window.history.replaceState({}, "", url.toString());
        showToast("🔒 Locked. Public read-only viewer mode active.", "info");
      }
    }
  };

  // Export current coursework data to a downloadable JSON file
  const handleExportData = () => {
    const dataStr = JSON.stringify(files, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kurt_alcayde_coursework_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Downloaded coursework JSON backup!");
  };

  // Files State Management (synced with localStorage)
  const [files, setFiles] = useState(() => getStoredFiles());
  const [trashFiles, setTrashFiles] = useState(() => getStoredTrash());
  const [activeCategory, setActiveCategory] = useState("all");

  // Profile & Education State (synced with localStorage)
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [education, setEducation] = useState(() => getStoredEducation());
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  const handleSaveProfile = ({ profile: newProfile, education: newEdu }) => {
    setProfile(newProfile);
    saveProfileToStorage(newProfile);
    setEducation(newEdu);
    saveEducationToStorage(newEdu);
    showToast("About section updated successfully!");
  };

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("laboratory");
  const [previewFile, setPreviewFile] = useState(null);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Add new file handler (only accessible in admin mode)
  const handleAddFile = (newFile) => {
    const updated = [newFile, ...files];
    setFiles(updated);
    saveFilesToStorage(updated);
    showToast(`"${newFile.title}" successfully added to School Hub!`);
  };

  // Reorder files handler (via drag and drop)
  const handleReorderFiles = (reorderedFiles) => {
    setFiles(reorderedFiles);
    saveFilesToStorage(reorderedFiles);
  };

  // Move file to Trash (via drag to delete or delete button)
  const handleMoveToTrash = (fileId) => {
    if (!isAdmin) {
      showToast("Delete action is restricted in read-only mode.", "error");
      return;
    }

    const fileToDelete = files.find((f) => f.id === fileId);
    if (!fileToDelete) return;

    const updatedFiles = files.filter((f) => f.id !== fileId);
    const updatedTrash = [
      { ...fileToDelete, deletedAt: new Date().toISOString() },
      ...trashFiles.filter((t) => t.id !== fileId)
    ];

    setFiles(updatedFiles);
    saveFilesToStorage(updatedFiles);
    setTrashFiles(updatedTrash);
    saveTrashToStorage(updatedTrash);

    showToast(`Moved "${fileToDelete.title}" to Recycle Bin.`, "info");
    if (previewFile?.id === fileId) {
      setPreviewFile(null);
    }
  };

  // Restore file from Trash back to active files
  const handleRestoreFromTrash = (fileId) => {
    if (!isAdmin) return;
    const fileToRestore = trashFiles.find((f) => f.id === fileId);
    if (!fileToRestore) return;

    const { deletedAt, ...cleanedFile } = fileToRestore;
    const updatedTrash = trashFiles.filter((f) => f.id !== fileId);
    const updatedFiles = [cleanedFile, ...files];

    setFiles(updatedFiles);
    saveFilesToStorage(updatedFiles);
    setTrashFiles(updatedTrash);
    saveTrashToStorage(updatedTrash);

    showToast(`Restored "${cleanedFile.title}" to vault!`, "success");
  };

  // Permanently delete an item from Trash
  const handlePermanentDelete = (fileId) => {
    if (!isAdmin) return;
    const fileToDelete = trashFiles.find((f) => f.id === fileId);
    if (
      window.confirm(
        `Permanently delete "${fileToDelete?.title || "this file"}"? This cannot be undone.`
      )
    ) {
      const updatedTrash = trashFiles.filter((f) => f.id !== fileId);
      setTrashFiles(updatedTrash);
      saveTrashToStorage(updatedTrash);
      showToast("Item permanently removed.", "info");
    }
  };

  // Empty entire Recycle Bin
  const handleEmptyTrash = () => {
    if (!isAdmin) return;
    if (trashFiles.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to permanently delete all ${trashFiles.length} item(s) in the Recycle Bin?`
      )
    ) {
      setTrashFiles([]);
      saveTrashToStorage([]);
      showToast("Recycle Bin emptied.", "info");
    }
  };

  // Delete file handler (wrapper for move to trash)
  const handleDeleteFile = (fileId) => {
    handleMoveToTrash(fileId);
  };

  // Reset to sample dataset (only accessible in admin mode)
  const handleResetFiles = () => {
    if (!isAdmin) {
      showToast("Reset is restricted in read-only mode.", "error");
      return;
    }

    if (
      window.confirm(
        "Reset all school files back to initial DCIT 26 mock coursework?"
      )
    ) {
      const reset = resetStoredFiles();
      setFiles(reset);
      showToast("Restored all default DCIT 26 coursework files!");
    }
  };

  // Download simulation handler (always functional for all users!)
  const handleDownloadFile = (file) => {
    const filename = file.fileName || `${file.title.toLowerCase().replace(/\s+/g, "_")}.pdf`;
    
    // Create a text/binary blob to trigger actual browser download
    const blobContent = `CAVITE STATE UNIVERSITY\nCollege of Engineering & Information Technology\nCourse: DCIT 26 Application Development and Emerging Technologies\n\nTitle: ${file.title}\nCategory: ${file.category}\nStatus: ${file.status}\nScore: ${file.score || "N/A"}\nAuthor: Kurt Joshua Alcayde\n\nDescription:\n${file.description}\n\nGenerated on: ${new Date().toLocaleString()}`;
    const blob = new Blob([blobContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloading deliverable: ${filename}`);
  };

  const handleOpenUpload = (cat = "laboratory") => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setUploadCategory(cat === "all" ? "laboratory" : cat);
    setIsUploadOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-slate-800 dark:bg-[#0b0c10] dark:text-slate-100 transition-colors duration-200">
      {/* Top Fixed Navigation */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenUpload={() => handleOpenUpload(activeCategory)}
        filesCount={files.length}
        isAdmin={isAdmin}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenUpload={() => handleOpenUpload("laboratory")}
          onDownloadCv={() => setIsCvOpen(true)}
        />

        {/* School Works & File Hub (Flagship Feature) */}
        <SchoolHub
          files={files}
          trashFiles={trashFiles}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onOpenUpload={handleOpenUpload}
          onPreviewFile={(file) => setPreviewFile(file)}
          onDeleteFile={handleDeleteFile}
          onReorderFiles={handleReorderFiles}
          onMoveToTrash={handleMoveToTrash}
          onRestoreFromTrash={handleRestoreFromTrash}
          onPermanentDelete={handlePermanentDelete}
          onEmptyTrash={handleEmptyTrash}
          onResetFiles={handleResetFiles}
          onDownloadFile={handleDownloadFile}
          isAdmin={isAdmin}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />

        {/* About Me & Academic Highlights */}
        <AboutSection
          profile={profile}
          education={education}
          onDownloadCv={() => setIsCvOpen(true)}
          isAdmin={isAdmin}
          onEditProfile={() => setIsProfileEditOpen(true)}
        />

        {/* Skills & Technologies */}
        <SkillsSection />

        {/* Contact Info Cards */}
        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Upload File / Project Modal (Admin Only) */}
      <UploadModal
        isOpen={isUploadOpen && isAdmin}
        onClose={() => setIsUploadOpen(false)}
        onAddFile={handleAddFile}
        defaultCategory={uploadCategory}
      />

      {/* File Preview Modal (Accessible to all users) */}
      <FilePreviewModal
        file={previewFile}
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        onDownload={handleDownloadFile}
      />

      {/* CV Download / Preview Modal (Accessible to all users) */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        onDownload={handleDownloadFile}
      />

      {/* Admin Mode Unlock & Configuration Modal */}
      <AdminUnlockModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onExportData={handleExportData}
      />

      {/* Profile / About Section Editor (Admin Only) */}
      {isAdmin && (
        <ProfileEditModal
          isOpen={isProfileEditOpen}
          onClose={() => setIsProfileEditOpen(false)}
          profile={profile}
          education={education}
          onSave={handleSaveProfile}
        />
      )}

      {/* Floating Interactive Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
