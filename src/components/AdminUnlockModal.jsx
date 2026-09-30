import React, { useState } from "react";
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  Eye,
  KeyRound,
  Check,
  Copy,
  Download,
  Sparkles,
  Settings
} from "lucide-react";

const DEFAULT_PASSCODE = "dcit26";

export default function AdminUnlockModal({
  isOpen,
  onClose,
  isAdmin,
  onToggleAdmin,
  onExportData
}) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");

  if (!isOpen) return null;

  // Retrieve current active passcode (or default)
  const getActivePasscode = () => {
    return localStorage.getItem("kurt_portfolio_admin_pin") || DEFAULT_PASSCODE;
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    const correctPin = getActivePasscode();

    if (passcode.trim() === correctPin) {
      onToggleAdmin(true);
      setError("");
      setPasscode("");
      onClose();
    } else {
      setError("Incorrect passcode. Access denied.");
    }
  };

  const handleLock = () => {
    onToggleAdmin(false);
    onClose();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentActive = getActivePasscode();

    if (currentPw !== currentActive) {
      setError("Current passcode does not match.");
      return;
    }

    if (newPw.length < 4) {
      setError("New passcode must be at least 4 characters long.");
      return;
    }

    if (newPw !== confirmPw) {
      setError("New passcodes do not match.");
      return;
    }

    localStorage.setItem("kurt_portfolio_admin_pin", newPw);
    setPwSuccess("Passcode updated successfully!");
    setError("");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => {
      setPwSuccess("");
      setShowChangePassword(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isAdmin
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
              }`}
            >
              {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isAdmin ? "Admin Controls (Unlocked)" : "Student Admin Authentication"}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isAdmin ? "Full edit & upload permissions active" : "Read-only mode active"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-slate-600 dark:text-slate-400">
          
          {/* Security status badge */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isAdmin
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            }`}
          >
            <ShieldCheck
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                isAdmin ? "text-emerald-500" : "text-slate-400"
              }`}
            />
            <div>
              <div className="font-bold text-xs">
                {isAdmin ? "Authenticated as Portfolio Owner" : "Public Read-Only Protection Active"}
              </div>
              <div className="text-[11px] opacity-80 mt-0.5 leading-relaxed">
                {isAdmin
                  ? "You have full privileges to upload school works, add project links, delete items, and download data backups."
                  : "Upload zones and delete actions are securely hidden from all public visitors and evaluators."}
              </div>
            </div>
          </div>

          {/* Form when locked */}
          {!isAdmin ? (
            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enter Admin Passcode to Unlock
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter private admin passcode..."
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-rose-500 text-slate-800 dark:text-slate-100 font-mono tracking-wider"
                  />
                </div>
                {error && <p className="text-[11px] text-rose-500 font-semibold mt-1">{error}</p>}
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                >
                  Verify Passcode &amp; Unlock
                </button>
              </div>
            </form>
          ) : (
            /* Panel when unlocked */
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-rose-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Backup / Export Coursework
                  </span>
                </div>
                <button
                  onClick={onExportData}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Export JSON
                </button>
              </div>

              {/* Change Passcode Accordion */}
              <div>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{showChangePassword ? "Cancel Passcode Change" : "Change Admin Passcode"}</span>
                </button>

                {showChangePassword && (
                  <form onSubmit={handleChangePassword} className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Current Passcode
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        New Passcode (min 4 characters)
                      </label>
                      <input
                        type="password"
                        required
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Confirm New Passcode
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                    </div>
                    {error && <p className="text-[11px] text-rose-500 font-semibold">{error}</p>}
                    {pwSuccess && <p className="text-[11px] text-emerald-500 font-semibold">{pwSuccess}</p>}
                    <button
                      type="submit"
                      className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Update Passcode
                    </button>
                  </form>
                )}
              </div>

              {/* Lock out action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLock}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock &amp; Return to Public Viewer Mode</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Protected with client-side credential verification
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
