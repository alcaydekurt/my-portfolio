// Initial Mock Data for School Works & Files Hub and Portfolio
export const INITIAL_PROFILE = {
  name: "Kurt Joshua Alcayde",
  preferredName: "Kurt",
  role: "Front-End Developer & IT Student",
  degree: "Bachelor of Science in Information Technology",
  university: "Cavite State University (CvSU)",
  course: "DCIT 26 - Application Development and Emerging Technologies",
  section: "BSIT 3-1",
  academicYear: "A.Y. 2024–2025",
  bio: "Passionate IT scholar and front-end engineer crafting high-impact modern web interfaces and emerging tech applications. Dedicated to writing clean, accessible code with exceptional user experiences.",
  avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  email: "kurtjoshua.alcayde@cvsu.edu.ph",
  phone: "+63 912 345 6789",
  location: "Cavite, Philippines",
  socials: {
    github: "https://github.com/alcaydekurt",
    linkedin: "https://linkedin.com/in/kurtjoshua-alcayde",
    behance: "https://behance.net/kurtalcayde",
    dribbble: "https://dribbble.com/alcaydekurt"
  },
  stats: [
    { label: "School Works", value: "24+", note: "Across all categories" },
    { label: "Lab Rating", value: "98.5%", note: "Consistent top standing" },
    { label: "Notable Commits", value: "350+", note: "Git repositories" },
    { label: "Submission Rate", value: "100%", note: "Always on time" }
  ],
  courseFocus: [
    "Single Page Application (SPA) Performance Optimization",
    "RESTful Architecture & Asynchronous Data Handling",
    "Component-Driven Design Systems with Tailwind CSS",
    "WebSockets, Real-Time Sync & Cloud Telemetry"
  ]
};

export const CATEGORIES = [
  { id: "laboratory", label: "Laboratory Activities", icon: "FlaskConical", countKey: "laboratory", badgeColor: "blue" },
  { id: "homework", label: "Homework / Assignments", icon: "BookOpen", countKey: "homework", badgeColor: "amber" },
  { id: "quizzes", label: "Quizzes & Exams", icon: "Award", countKey: "quizzes", badgeColor: "emerald" },
  { id: "projects", label: "Projects", icon: "Layers", countKey: "projects", badgeColor: "rose" },
  { id: "documents", label: "School Documents", icon: "FileCheck", countKey: "documents", badgeColor: "violet" },
  { id: "miscellaneous", label: "Miscellaneous Files", icon: "FolderArchive", countKey: "miscellaneous", badgeColor: "cyan" }
];

export const INITIAL_FILES = [
  // 1. LABORATORY ACTIVITIES
  {
    id: "lab-1",
    title: "Lab 01: Modern React Architecture & Environment Setup",
    category: "laboratory",
    fileType: "pdf",
    fileName: "Lab1_Alcayde_React_Setup.pdf",
    fileSize: "2.4 MB",
    uploadDate: "2024-09-08",
    submissionDate: "2024-09-08 23:45",
    status: "Graded",
    score: "100/100",
    description: "Detailed setup report covering Node.js v24, Vite bundling pipeline, Tailwind CSS integration, and Git workflow for modern web applications.",
    tags: ["React", "Vite", "Environment", "Git"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 4,
      author: "Kurt Joshua Alcayde",
      course: "DCIT 26",
      remarks: "Excellent configuration breakdown and comprehensive environment documentation.",
      instructor: "Prof. DCIT Faculty",
      snippet: `Laboratory Activity #1: Setting Up the Modern Front-End Toolchain
Student Name: Kurt Joshua Alcayde
Course Code: DCIT 26 (App Dev & Emerging Tech)
Grade: 100/100 (Perfect Mark)

Key Deliverables:
- Vite 6+ React 19 configuration setup with strict TypeScript types
- Modular CSS architecture and Tailwind utility verification
- Component lifecycle testing & initial benchmark results`
    }
  },
  {
    id: "lab-2",
    title: "Lab 02: Interactive Component State & Props Engineering",
    category: "laboratory",
    fileType: "zip",
    fileName: "Lab2_Alcayde_ComponentState_Package.zip",
    fileSize: "4.8 MB",
    uploadDate: "2024-09-15",
    submissionDate: "2024-09-15 21:10",
    status: "Graded",
    score: "98/100",
    description: "Interactive data-flow demonstration implementing useState, useEffect, customized hooks, and unidirectional state passing.",
    tags: ["Hooks", "State", "Props", "Source Code"],
    downloadUrl: "#",
    previewContent: {
      type: "code",
      language: "javascript",
      codeSnippet: `// Lab 02: Custom Filter & State Synchronization Hook
import { useState, useEffect, useMemo } from 'react';

export function useSchoolWorkFilter(initialItems = []) {
  const [items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [items, searchQuery, selectedCategory]);

  return { filtered, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory };
}`
    }
  },
  {
    id: "lab-3",
    title: "Lab 03: RESTful API Integration & Async Data Pipelines",
    category: "laboratory",
    fileType: "pdf",
    fileName: "Lab3_Alcayde_REST_API_Report.pdf",
    fileSize: "3.2 MB",
    uploadDate: "2024-09-22",
    submissionDate: "2024-09-22 22:30",
    status: "Graded",
    score: "99/100",
    description: "Full implementation of Axios and Fetch API with asynchronous state handlers, loading skeletons, error boundaries, and debounce utilities.",
    tags: ["REST API", "Async/Await", "Axios", "Error Handling"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 6,
      author: "Kurt Joshua Alcayde",
      course: "DCIT 26",
      remarks: "Outstanding error handling implementation and resilient network state management.",
      snippet: `Laboratory Activity #3: Asynchronous Web Data Pipelines
Student: Kurt Joshua Alcayde
Evaluation: 99 / 100

Key Takeaways:
- Implemented robust exponential backoff for failed network calls
- Created high-fidelity loading skeleton placeholders
- Encapsulated CRUD operations behind typed repository services`
    }
  },
  {
    id: "lab-4",
    title: "Lab 04: Token-Based Authentication & Session Handling",
    category: "laboratory",
    fileType: "docx",
    fileName: "Lab4_Alcayde_JWT_Auth_Documentation.docx",
    fileSize: "1.9 MB",
    uploadDate: "2024-09-29",
    submissionDate: "2024-09-29 23:00",
    status: "Submitted",
    score: "Pending Review",
    description: "Comprehensive technical documentation for JSON Web Token (JWT) storage in HTTP-Only cookies vs local session storage.",
    tags: ["JWT", "Security", "Auth", "Documentation"],
    downloadUrl: "#",
    previewContent: {
      type: "document",
      title: "Lab 4 - JWT Authentication & Secure Local Storage Benchmarks",
      author: "Kurt Joshua Alcayde",
      snippet: `Executive Summary:
This report investigates client-side security measures when handling JSON Web Tokens (JWT) in single-page applications. Comparative benchmarks between HTTP-Only cookies and memory-cached refresh tokens were measured against XSS and CSRF attack surfaces.`
    }
  },

  // 2. HOMEWORK / ASSIGNMENTS
  {
    id: "hw-1",
    title: "Assignment 1: Client-Side Rendering vs SSR vs SSG Analysis",
    category: "homework",
    fileType: "pdf",
    fileName: "HW1_Rendering_Paradigms_Analysis.pdf",
    fileSize: "1.8 MB",
    uploadDate: "2024-09-10",
    submissionDate: "2024-09-10 18:20",
    dueDate: "2024-09-11 23:59",
    status: "Submitted On Time",
    score: "100/100",
    description: "In-depth comparative paper reviewing First Contentful Paint (FCP), Time to Interactive (TTI), and SEO tradeoffs across modern rendering architectures.",
    tags: ["SSR", "SSG", "CSR", "Next.js", "Vite"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 5,
      author: "Kurt Joshua Alcayde",
      course: "DCIT 26",
      remarks: "Well-researched synthesis of rendering strategies with real-world Lighthouse metrics."
    }
  },
  {
    id: "hw-2",
    title: "Assignment 2: Mobile-First Responsive UI & Micro-Interactions",
    category: "homework",
    fileType: "pdf",
    fileName: "HW2_Responsive_Design_Systems.pdf",
    fileSize: "3.5 MB",
    uploadDate: "2024-09-17",
    submissionDate: "2024-09-17 19:40",
    dueDate: "2024-09-18 23:59",
    status: "Submitted On Time",
    score: "98/100",
    description: "Design system breakdown detailing fluid typography scales, CSS grid layouts, container queries, and touch-target accessibility benchmarks.",
    tags: ["Responsive", "CSS Grid", "UI/UX", "Accessibility"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 8,
      author: "Kurt Joshua Alcayde",
      course: "DCIT 26"
    }
  },
  {
    id: "hw-3",
    title: "Assignment 3: State Management Benchmark — Redux vs Zustand vs Context",
    category: "homework",
    fileType: "docx",
    fileName: "HW3_State_Management_Evaluation.docx",
    fileSize: "2.1 MB",
    uploadDate: "2024-09-24",
    submissionDate: "2024-09-24 20:15",
    dueDate: "2024-09-25 23:59",
    status: "Submitted On Time",
    score: "97/100",
    description: "Performance benchmarking of re-render frequencies and memory footprint comparing Redux Toolkit, Zustand, and React Context in enterprise apps.",
    tags: ["Zustand", "Redux", "Context API", "Performance"],
    downloadUrl: "#",
    previewContent: {
      type: "document",
      title: "State Management Architecture Evaluation",
      author: "Kurt Joshua Alcayde"
    }
  },

  // 3. QUIZZES & EXAMS
  {
    id: "quiz-1",
    title: "Midterm Quiz 1: Web Frameworks & Virtual DOM Reviewer",
    category: "quizzes",
    fileType: "pdf",
    fileName: "Quiz1_WebFrameworks_Reviewer_Alcayde.pdf",
    fileSize: "1.4 MB",
    uploadDate: "2024-09-14",
    submissionDate: "2024-09-14 10:00",
    status: "Completed",
    score: "49/50 (98%)",
    description: "Comprehensive reviewer sheet summarizing React fiber reconciliation, virtual DOM diffing algorithms, synthetic events, and JSX compilation.",
    tags: ["Quiz Reviewer", "Virtual DOM", "Midterms", "High Score"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 4,
      author: "Kurt Joshua Alcayde",
      course: "DCIT 26",
      remarks: "High-yield summary with illustrated diagrams of the reconciliation process."
    }
  },
  {
    id: "quiz-2",
    title: "Quiz 2: Cloud Computing, REST & Emerging Web Protocols Cheat Sheet",
    category: "quizzes",
    fileType: "pdf",
    fileName: "Quiz2_Cloud_Protocols_Summary.pdf",
    fileSize: "1.6 MB",
    uploadDate: "2024-09-21",
    submissionDate: "2024-09-21 11:15",
    status: "Completed",
    score: "50/50 (100%)",
    description: "Concise formula and concept cheat sheet for HTTP/2, HTTP/3, WebSockets, Server-Sent Events (SSE), and serverless cloud architectures.",
    tags: ["Cheat Sheet", "WebSockets", "Cloud", "Perfect Score"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 3,
      author: "Kurt Joshua Alcayde",
      course: "DCIT 26"
    }
  },
  {
    id: "quiz-3",
    title: "DCIT 26 Midterm Examination Score Summary & Answer Sheet",
    category: "quizzes",
    fileType: "pdf",
    fileName: "Midterm_Exam_Score_Summary_Alcayde.pdf",
    fileSize: "920 KB",
    uploadDate: "2024-09-28",
    submissionDate: "2024-09-28 15:30",
    status: "Verified Official",
    score: "96/100 (1.25)",
    description: "Official score card and answer rationalization document for the DCIT 26 Midterm Examination covering Units 1 to 4.",
    tags: ["Official Exam", "Midterms", "Dean's List", "Dean's Mark"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 2,
      author: "Kurt Joshua Alcayde",
      course: "DCIT 26"
    }
  },

  // 4. PROJECTS (Dual submission support: files OR URLs)
  {
    id: "proj-1",
    title: "CampusSync — University Event & Schedule Intelligence Hub",
    category: "projects",
    fileType: "url",
    fileName: "campussync-v2.zip",
    fileSize: "14.2 MB",
    uploadDate: "2024-09-25",
    submissionDate: "2024-09-25 18:00",
    status: "Featured Project",
    score: "100/100",
    description: "A centralized campus dashboard enabling students to subscribe to academic calendars, receive real-time class announcements, and manage organizational events.",
    tags: ["React 19", "Tailwind CSS", "Vite", "Supabase", "TypeScript"],
    projectLinks: {
      githubUrl: "https://github.com/alcaydekurt/campussync-platform",
      liveDemoUrl: "https://campussync-cvsu.vercel.app"
    },
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    previewContent: {
      type: "project-showcase",
      overview: "CampusSync revolutionizes university event tracking by providing a seamless, real-time portal for college announcements, class schedule syncing, and student council event registration.",
      features: [
        "Real-time event notification sync via Supabase WebSockets",
        "Personalized timetable scheduler with conflict warning algorithms",
        "Dark / Light responsive design system built with Tailwind CSS",
        "Role-based access control for students, faculty, and council leads"
      ],
      techStack: ["React 19", "Vite", "Tailwind CSS v4", "Supabase Auth & DB", "Lucide Icons"]
    }
  },
  {
    id: "proj-2",
    title: "NexusDev — Peer Learning & Curated Student Resource Vault",
    category: "projects",
    fileType: "url",
    fileName: "nexusdev-source.zip",
    fileSize: "18.6 MB",
    uploadDate: "2024-09-20",
    submissionDate: "2024-09-20 20:30",
    status: "Featured Project",
    score: "99/100",
    description: "Open-access peer-to-peer knowledge sharing hub allowing IT students to exchange verified code snippets, lab reviewers, and project starter kits.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    projectLinks: {
      githubUrl: "https://github.com/alcaydekurt/nexus-dev-vault",
      liveDemoUrl: "https://nexusdev-vault.vercel.app"
    },
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    previewContent: {
      type: "project-showcase",
      overview: "NexusDev was conceptualized during DCIT 26 to solve the fragmented distribution of lecture notes and code sandboxes among IT students.",
      features: [
        "Interactive markdown viewer with copyable code snippets",
        "Categorized vault with fast search index and filter tags",
        "Student upvoting and moderation verification badges"
      ],
      techStack: ["React", "Next.js 15", "Prisma ORM", "PostgreSQL", "Tailwind"]
    }
  },
  {
    id: "proj-3",
    title: "EmergTech IoT Gateway — Real-Time Environmental Sensor Dashboard",
    category: "projects",
    fileType: "url",
    fileName: "iot-gateway-app.zip",
    fileSize: "8.9 MB",
    uploadDate: "2024-09-27",
    submissionDate: "2024-09-27 22:15",
    status: "Prototype",
    score: "In Progress",
    description: "Web-based telemetry monitoring system designed for classroom temperature, humidity, and air quality telemetry with interactive charts.",
    tags: ["React", "WebSockets", "Chart.js", "Tailwind", "MQTT"],
    projectLinks: {
      githubUrl: "https://github.com/alcaydekurt/emergtech-iot-dashboard",
      liveDemoUrl: "https://emergtech-iot.vercel.app"
    },
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    previewContent: {
      type: "project-showcase",
      overview: "An exploratory application demonstrating emerging IoT data handling and live stream charting directly in the browser.",
      features: [
        "Live sensor streaming with sub-50ms latency using WebSockets",
        "Dynamic time-series visualizations with customizable alert thresholds",
        "Offline caching using IndexedDB and Service Workers"
      ],
      techStack: ["React", "Chart.js", "WebSockets", "Tailwind CSS", "Vite"]
    }
  },

  // 5. SCHOOL DOCUMENTS (Official verified school files)
  {
    id: "doc-1",
    title: "Certificate of Program Registration (COR) — 1st Sem A.Y. 2024-2025",
    category: "documents",
    fileType: "pdf",
    fileName: "COR_Alcayde_KurtJoshua_1stSem_2024-2025.pdf",
    fileSize: "1.1 MB",
    uploadDate: "2024-08-28",
    submissionDate: "2024-08-28 09:30",
    status: "Verified Official",
    score: "Registered",
    description: "Official registrar-validated registration form verifying enrollment in DCIT 26 (App Dev & Emerging Tech) and 21 academic units.",
    tags: ["Official", "Registrar", "Enrollment", "CvSU"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 1,
      author: "Office of the University Registrar",
      course: "BS Information Technology",
      remarks: "Official Certificate of Registration with University Seal.",
      snippet: `CAVITE STATE UNIVERSITY
Office of the University Registrar
CERTIFICATE OF REGISTRATION (COR)
Student Name: ALCAYDE, KURT JOSHUA
Student Number: 2022-10842
Degree Program: Bachelor of Science in Information Technology
Year & Section: 3-1 | Regular Status

Enrolled Subjects:
- DCIT 26: Application Development and Emerging Technologies (3 Units)
- DCIT 60: Methods of Research in Computing (3 Units)
- ITEC 85: Network Security & Administration (3 Units)
- ITEC 90: Systems Integration and Architecture (3 Units)
- Total Academic Load: 21 Units | Status: Enrolled & Validated`
    }
  },
  {
    id: "doc-2",
    title: "Official Certified True Copy of Grades / Dean's Honors List",
    category: "documents",
    fileType: "pdf",
    fileName: "Grade_Slip_Alcayde_KurtJoshua_DeanLister.pdf",
    fileSize: "1.3 MB",
    uploadDate: "2024-08-30",
    submissionDate: "2024-08-30 11:00",
    status: "Dean's Lister",
    score: "1.24 GWA",
    description: "Transcript excerpt and grade evaluation showcasing consistent academic honors standing and Dean's List inclusion.",
    tags: ["Grades", "Dean's List", "Academic Honors", "CvSU"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 2,
      author: "College of Engineering and Information Technology",
      remarks: "Awarded President's and Dean's Honors List for sustained academic excellence."
    }
  },
  {
    id: "doc-3",
    title: "BSIT Curriculum Checklist & Evaluation Sheet",
    category: "documents",
    fileType: "pdf",
    fileName: "Curriculum_Checklist_BSIT_Alcayde.pdf",
    fileSize: "1.8 MB",
    uploadDate: "2024-09-01",
    submissionDate: "2024-09-01 14:00",
    status: "Verified Official",
    score: "On Track",
    description: "Complete 4-year curriculum evaluation matrix documenting completed prerequisite courses in computing and programming.",
    tags: ["Curriculum", "Academic Progress", "Prerequisites", "BSIT"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 3,
      author: "Department of Information Technology"
    }
  },

  // 6. MISCELLANEOUS FILES
  {
    id: "misc-1",
    title: "DCIT 26 Course Syllabus, Rubrics & Project Guidelines 2024-2025",
    category: "miscellaneous",
    fileType: "pdf",
    fileName: "DCIT26_Course_Syllabus_AY2024-2025.pdf",
    fileSize: "3.1 MB",
    uploadDate: "2024-09-02",
    submissionDate: "2024-09-02 08:00",
    status: "Reference",
    score: "Approved",
    description: "Institutional syllabus covering course outcomes, weekly laboratory outlines, emerging technology topics, and grading rubrics.",
    tags: ["Syllabus", "Course Outline", "Rubrics", "DCIT 26"],
    downloadUrl: "#",
    previewContent: {
      type: "pdf-doc",
      pages: 12,
      author: "CvSU Faculty Curriculum Board"
    }
  },
  {
    id: "misc-2",
    title: "Modern Front-End Pitch Deck & Architecture Presentation Template",
    category: "miscellaneous",
    fileType: "pptx",
    fileName: "Final_Project_Pitch_Template_Alcayde.pptx",
    fileSize: "5.4 MB",
    uploadDate: "2024-09-18",
    submissionDate: "2024-09-18 16:30",
    status: "Asset",
    score: "Ready to Use",
    description: "Clean presentation deck designed for capstone pitches, architecture diagrams, live demo workflows, and sprint retrospectives.",
    tags: ["Presentation", "Pitch Deck", "Template", "Figma"],
    downloadUrl: "#",
    previewContent: {
      type: "document",
      title: "DCIT 26 Project Pitch Deck Master Template",
      author: "Kurt Joshua Alcayde"
    }
  }
];

export const SKILLS_DATA = [
  {
    category: "Front-End Engineering",
    description: "Building responsive, accessible, and high-performance interactive interfaces.",
    skills: [
      { name: "React 19 / 18", level: 95, tag: "Expert", icon: "Code2" },
      { name: "Next.js & Vite", level: 92, tag: "Advanced", icon: "Zap" },
      { name: "Tailwind CSS v4 / v3", level: 96, tag: "Expert", icon: "Palette" },
      { name: "TypeScript / JavaScript ES6+", level: 90, tag: "Advanced", icon: "FileCode2" },
      { name: "HTML5 Semantic & Modern CSS", level: 98, tag: "Mastery", icon: "Layout" },
      { name: "Responsive & Fluid Design", level: 95, tag: "Mastery", icon: "Smartphone" }
    ]
  },
  {
    category: "Back-End & Data Pipelines",
    description: "Developing scalable REST APIs, authentication flows, and data models.",
    skills: [
      { name: "Node.js & Express", level: 86, tag: "Proficient", icon: "Server" },
      { name: "RESTful API Architecture", level: 90, tag: "Advanced", icon: "Cpu" },
      { name: "Supabase & PostgreSQL", level: 85, tag: "Proficient", icon: "Database" },
      { name: "JWT Auth & Session Security", level: 88, tag: "Advanced", icon: "ShieldCheck" },
      { name: "MongoDB & Mongoose", level: 82, tag: "Proficient", icon: "HardDrive" }
    ]
  },
  {
    category: "Developer Tools & Version Control",
    description: "Industry-standard workflow tooling for continuous delivery and team collaboration.",
    skills: [
      { name: "Git & GitHub Workflows", level: 94, tag: "Expert", icon: "GitBranch" },
      { name: "VS Code / IDE Workspaces", level: 96, tag: "Power User", icon: "Terminal" },
      { name: "Postman & API Testing", level: 90, tag: "Advanced", icon: "Send" },
      { name: "Vercel & Netlify Deployment", level: 92, tag: "Advanced", icon: "Cloud" },
      { name: "Figma to Code Translation", level: 88, tag: "Advanced", icon: "Layers" }
    ]
  },
  {
    category: "Course Concepts & Emerging Tech",
    description: "Core concepts emphasized in DCIT 26 Application Development and Emerging Tech.",
    skills: [
      { name: "Component-Driven Architecture", level: 95, tag: "Core", icon: "Boxes" },
      { name: "WebSockets & Real-Time Sync", level: 84, tag: "Emerging", icon: "Radio" },
      { name: "Progressive Web Apps (PWA)", level: 82, tag: "Emerging", icon: "Wifi" },
      { name: "AI/LLM Prompt & API Integration", level: 88, tag: "Emerging", icon: "Sparkles" },
      { name: "Agile / Scrum Sprint Delivery", level: 90, tag: "Core", icon: "Calendar" }
    ]
  }
];

export const EDUCATION_DATA = [
  {
    institution: "Cavite State University (CvSU)",
    degree: "Bachelor of Science in Information Technology",
    period: "2022 — Present (3rd Year Regular)",
    honors: "Dean's Honors Lister (GWA: 1.24)",
    highlights: [
      "Focused on Application Development, Systems Integration, and Cloud Infrastructure",
      "Lead developer for team capstone prototyping and collaborative laboratory projects",
      "Active participant in collegiate programming competitions and tech symposiums"
    ]
  },
  {
    institution: "DCIT 26 — Application Development and Emerging Technologies",
    degree: "Specialized Coursework & Academic Track",
    period: "1st Semester A.Y. 2024–2025",
    honors: "100% Submission Rate • 98.5% Practical Lab Average",
    highlights: [
      "In-depth mastery of modern Single Page Application (SPA) lifecycles",
      "Hands-on architectural benchmarks comparing client vs server rendering paradigms",
      "Full-stack team project development with live cloud deployment and CI/CD pipelines"
    ]
  }
];

// Helper functions for LocalStorage persistence
const STORAGE_KEY = "kurt_alcayde_portfolio_files_v1";

export function getStoredFiles() {
  if (typeof window === "undefined") return INITIAL_FILES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading localStorage files:", e);
  }
  return INITIAL_FILES;
}

export function saveFilesToStorage(files) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  } catch (e) {
    console.error("Error saving files to localStorage:", e);
  }
}

export function resetStoredFiles() {
  if (typeof window === "undefined") return INITIAL_FILES;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error resetting localStorage:", e);
  }
  return INITIAL_FILES;
}

// ── Profile & Education persistence ──────────────────────────────────────────
const PROFILE_KEY = "kurt_alcayde_portfolio_profile_v1";
const EDUCATION_KEY = "kurt_alcayde_portfolio_education_v1";

export function getStoredProfile() {
  if (typeof window === "undefined") return INITIAL_PROFILE;
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) return { ...INITIAL_PROFILE, ...JSON.parse(saved) };
  } catch (e) {
    console.error("Error reading profile from localStorage:", e);
  }
  return INITIAL_PROFILE;
}

export function saveProfileToStorage(profile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving profile to localStorage:", e);
  }
}

export function getStoredEducation() {
  if (typeof window === "undefined") return EDUCATION_DATA;
  try {
    const saved = localStorage.getItem(EDUCATION_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error reading education from localStorage:", e);
  }
  return EDUCATION_DATA;
}

export function saveEducationToStorage(education) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EDUCATION_KEY, JSON.stringify(education));
  } catch (e) {
    console.error("Error saving education to localStorage:", e);
  }
}

// ── Recycle Bin / Trash persistence ──────────────────────────────────────────
const TRASH_KEY = "kurt_alcayde_portfolio_trash_v1";

export function getStoredTrash() {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(TRASH_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("Error reading trash from localStorage:", e);
  }
  return [];
}

export function saveTrashToStorage(trash) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TRASH_KEY, JSON.stringify(trash));
  } catch (e) {
    console.error("Error saving trash to localStorage:", e);
  }
}
