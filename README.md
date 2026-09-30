# Kurt Joshua Alcayde — Personal Portfolio & Interactive School Works Hub

> **Course Focus**: DCIT 26 — Application Development and Emerging Technologies  
> **Degree**: Bachelor of Science in Information Technology (BSIT)  
> **Institution**: Cavite State University (CvSU)  
> **Tech Stack**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti

---

## 🌟 Key Highlights & Design Architecture

### 1. Interactive School Portfolio & File Hub
A dedicated academic vault organized into **6 distinct tabs/categories** with dynamic file management (simulated upload state, file lists, previews, downloads, and deletions):

1. **Laboratory Activities**: Interactive file upload & listing interface for lab reports and code outputs (PDF, ZIP, DOCX, images).
2. **Homework / Assignments**: Submissions tracking with due dates, on-time turn-in status, and rubric evaluations.
3. **Quizzes & Exams**: Dedicated upload area for reviewer sheets, answer keys, cheat sheets, and official exam scorecards.
4. **Projects (Dual Submission)**: Support for uploading package files **OR** submitting external URLs (GitHub Repository link, Live Demo/Website URL) with custom thumbnail preview, architecture overview, and feature badges.
5. **School Documents**: Verified school documents (Certificate of Registration, Grade Slip / Dean's List certificate, Curriculum Evaluation Sheets) with official academic viewer simulation and seals.
6. **Miscellaneous Files**: General academic assets including course syllabus, capstone pitch deck templates, and cheatsheets.

### 2. File Hub Capabilities
- **Dual View Modes**: Switch seamlessly between a modern **Grid Card View** and an institutional **Table / List View**.
- **Instant Search & Filtering**: Real-time search query matching titles, filenames, descriptions, and tags, with format filters (PDF, ZIP, DOCX, Links).
- **Interactive File Preview Modal**: Full-featured previewer simulating PDF document viewer with zoom controls, code syntax previewer with clipboard copy, project showcase with direct repository and demo launches.
- **Local Persistence & Reset**: All file operations (uploads, edits, deletions) persist automatically to browser `localStorage`, with a one-click **"Reset Samples"** button to restore sample coursework anytime.
- **Drag-and-Drop Upload Modal**: Drag-and-drop dropzone, animated simulated upload progress bar (0% to 100%), and confetti celebration!

### 3. Public Read-Only Viewer Mode vs Admin Mode
- **Public Users (Default)**:
  - **Read-Only Viewer Mode is active by default**.
  - All file upload zones, drag-and-drop components, and delete trash buttons are hidden.
  - Download buttons, file previews, GitHub repository buttons, and live demo links remain **100% active and functional**.
- **Admin / Owner Privileges**:
  - **Via URL Parameter**: Open with `?mode=admin` (or `?admin=true` / `?edit=true`).
  - **Via In-App Modal / Toggle**: Click the mode pill in the navbar (`🔒 Viewer` / `🔓 Admin Mode`) to enter passcode (default: `dcit26`) or use the 1-click toggle.
  - Unlocks drag-and-drop file uploaders, project URL submissions, deletion actions, and dataset reset.

### 4. Core Portfolio Sections
- **Hero / Header**: Reference-inspired aesthetic with dark/light mode toggle, bold typography, developer portrait with crimson background shape, floating achievement badges (`350+ Commits & Submissions`, `DCIT 26 Active Student`), and social pill strip (GitHub, LinkedIn, Behance, Email).
- **Academic Profile & Education**: Detailed curriculum breakdown, 4 key performance metrics (24+ Works, 98.5% Lab Rating, 350+ Commits, 100% Submission Rate), and educational timeline.
- **Skills & Technologies**: 4 categorized capability cards (Frontend, Backend, Tools & DevOps, Course Concepts & Emerging Tech) with proficiency meters and status tags.
- **Academic Resume Modal**: Downloadable and printable CV preview.
- **Contact Section**: Quick cards for Call, Email (with 1-click clipboard copy), and University Location, plus an interactive message form with instant validation.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/alcaydekurt/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🎨 Aesthetics & Reference Details
- Custom dark theme matching the provided mockup designs (obsidian `#0b0c10` with crimson rose `#ef4444` / `#f43f5e` accents).
- High-contrast, clean light mode toggle.
- Modern typography pairing `Plus Jakarta Sans` for body text and `Outfit` for bold geometric headings.
