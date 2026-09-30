import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 shadow-2xl backdrop-blur-md border border-slate-700/50 dark:border-slate-200/50 max-w-md">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
        ) : isError ? (
          <AlertCircle className="w-5 h-5 text-rose-400 dark:text-rose-600 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-sky-400 dark:text-sky-600 shrink-0" />
        )}
        <div className="text-xs font-semibold">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 text-slate-400 hover:text-white dark:hover:text-slate-900 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
