import React, { useRef } from "react";
import {
  X,
  Download,
  GraduationCap,
  Code2,
  Mail,
  Phone,
  MapPin,
  Award,
  CheckCircle2,
  Printer
} from "lucide-react";
import { INITIAL_PROFILE, SKILLS_DATA } from "../data/initialData";

export default function CvModal({ isOpen, onClose, profile, skills }) {
  const printRef = useRef(null);

  if (!isOpen) return null;

  const currentProfile = profile || INITIAL_PROFILE;
  const currentSkills = (skills && skills.length > 0) ? skills : SKILLS_DATA;

  const handlePrint = () => {
    const skillLines = currentSkills
      .map((g) => `<strong>${g.category}:</strong> ${g.skills.map((s) => s.name).join(", ")}.`)
      .join("<br />");

    const courseFocusItems = (currentProfile.courseFocus || [])
      .map((item) => `<div class="comp-item"><span class="comp-dot"></span>${item}</div>`)
      .join("");

    const statsItems = (currentProfile.stats || [])
      .map(
        (s) =>
          `<div class="stat-card"><strong>${s.value}</strong><span class="stat-label">${s.label}</span><span class="stat-note">${s.note}</span></div>`
      )
      .join("");

    const printContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${currentProfile.name} - Academic CV</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 11px;
      color: #1e293b;
      background: #fff;
      padding: 32px 40px;
      line-height: 1.6;
    }
    h1 { font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; }
    .subtitle { font-size: 11px; font-weight: 600; color: #e11d48; margin-top: 3px; }
    .contact-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 8px; font-size: 10px; color: #64748b; }
    .section-title {
      font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px;
      color: #0f172a; margin: 22px 0 9px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 5px;
    }
    .profile-box {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;
      padding: 12px 16px; color: #475569; font-size: 11px; line-height: 1.7;
    }
    .edu-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 11px 15px; }
    .edu-header { display: flex; justify-content: space-between; font-weight: 700; color: #0f172a; }
    .edu-year { color: #e11d48; }
    .edu-sub { color: #64748b; font-size: 10px; margin-top: 3px; }
    .edu-honor { color: #059669; font-weight: 600; font-size: 10px; margin-top: 5px; }
    .competency-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
    .comp-item {
      display: flex; align-items: center; gap: 7px;
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;
      padding: 7px 11px; font-size: 10px; color: #334155;
    }
    .comp-dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; flex-shrink: 0; }
    .skills-block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; }
    .skills-block p { font-size: 11px; color: #475569; line-height: 1.8; }
    .skills-block p strong { color: #1e293b; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .stat-card {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 8px; text-align: center;
    }
    .stat-card strong { font-size: 16px; font-weight: 900; color: #0f172a; }
    .stat-label { font-size: 9.5px; font-weight: 600; color: #475569; margin-top: 2px; }
    .stat-note { font-size: 9px; color: #94a3b8; }
    hr { border: none; border-top: 1.5px solid #e2e8f0; margin: 18px 0; }
    .footer-note { font-size: 9px; color: #94a3b8; margin-top: 28px; text-align: right; }
    @media print {
      body { padding: 18px 26px; }
      @page { size: A4 portrait; margin: 10mm 13mm; }
    }
  </style>
</head>
<body>
  <h1>${currentProfile.name}</h1>
  <div class="subtitle">${currentProfile.role} &bull; ${currentProfile.degree} &bull; ${currentProfile.university}</div>
  <div class="contact-row">
    <span>&#9993; ${currentProfile.email}</span>
    <span>&#128222; ${currentProfile.phone}</span>
    <span>&#128205; ${currentProfile.location}</span>
  </div>
  <hr />

  <div class="section-title">Executive Academic Profile</div>
  <div class="profile-box">${currentProfile.bio}</div>

  <div class="section-title">Education</div>
  <div class="edu-card">
    <div class="edu-header">
      <span>${currentProfile.degree}</span>
      <span class="edu-year">2022 &mdash; Present</span>
    </div>
    <div class="edu-sub">${currentProfile.university} &bull; College of Engineering and IT</div>
    <div class="edu-sub">${currentProfile.course} &bull; ${currentProfile.section}</div>
    <div class="edu-honor">Dean&apos;s Lister &bull; Consistent Academic Honors</div>
  </div>

  ${courseFocusItems ? `
  <div class="section-title">Course Competencies &mdash; ${currentProfile.course}</div>
  <div class="competency-grid">${courseFocusItems}</div>
  ` : ""}

  <div class="section-title">Technical Proficiencies</div>
  <div class="skills-block"><p>${skillLines}</p></div>

  ${statsItems ? `
  <div class="section-title">Academic Performance</div>
  <div class="stats-grid">${statsItems}</div>
  ` : ""}

  <div class="footer-note">
    Generated from Portfolio &bull; ${currentProfile.name} &bull; ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
  </div>
</body>
</html>`;

    const printWindow = window.open("", "_blank", "width=920,height=720,scrollbars=yes");
    if (!printWindow) {
      alert("Pop-up blocked! Please allow pop-ups for this site to download the CV as PDF.");
      return;
    }
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {currentProfile.name} — Academic CV Preview
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
              title="Opens print dialog — choose Save as PDF to download"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Document */}
        <div ref={printRef} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs">

          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {currentProfile.name}
            </h1>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
              {currentProfile.role} &bull; {currentProfile.degree} &bull; {currentProfile.university}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-rose-500" />
                <span>{currentProfile.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-rose-500" />
                <span>{currentProfile.phone}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{currentProfile.location}</span>
              </span>
            </div>
          </div>

          {/* Academic Profile Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-rose-500" />
              <span>Executive Academic Profile</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              {currentProfile.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-rose-500" />
              <span>Education</span>
            </h4>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>{currentProfile.degree}</span>
                <span className="text-rose-600 dark:text-rose-400">2022 — Present</span>
              </div>
              <div className="text-slate-500">{currentProfile.university} &bull; College of Engineering and IT</div>
              <div className="text-slate-500 mt-0.5">{currentProfile.course} &bull; {currentProfile.section}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                Dean&apos;s Lister &bull; Consistent Academic Honors
              </div>
            </div>
          </div>

          {/* Course Focus / Competencies */}
          {(currentProfile.courseFocus || []).length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Course Competencies</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                {currentProfile.courseFocus.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Proficiencies — dynamic from skills */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Technical Proficiencies</span>
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 p-3.5 space-y-1.5">
              {currentSkills.map((group, i) => (
                <p key={i} className="text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">{group.category}:</strong>{" "}
                  {group.skills.map((s) => s.name).join(", ")}.
                </p>
              ))}
            </div>
          </div>

          {/* Academic Stats */}
          {(currentProfile.stats || []).length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-rose-500" />
                <span>Academic Performance</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentProfile.stats.map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">{s.value}</div>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Printer className="w-3 h-3" />
            Click &quot;Download PDF&quot; → choose <strong className="mx-0.5">Save as PDF</strong> in the print dialog
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
