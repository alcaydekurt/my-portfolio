import React from "react";

export function GithubIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function DribbbleIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

export function BehanceIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.254 0-5.625-3.003-5.625-5.918 0-3.342 1.944-6.082 5.589-6.082 3.844 0 5.289 2.735 5.289 5.86 0 .584-.047 1.139-.092 1.455h-8.086c.036 1.761 1.018 2.949 2.879 2.949 1.477 0 2.262-.572 2.664-1.264h2.483zm-7.986-3.415h5.451c-.046-1.391-.774-2.585-2.614-2.585-1.782 0-2.658 1.187-2.837 2.585zm-10.74 3.415h-4.996v-14h5.787c3.344 0 4.885 1.554 4.885 3.731 0 1.523-.746 2.724-2.028 3.298 1.714.568 2.378 1.983 2.378 3.655 0 2.457-1.766 4.316-6.026 4.316zm-2.484-8.113h2.646c1.657 0 2.74-.53 2.74-1.763 0-1.127-.852-1.636-2.39-1.636h-2.996v3.399zm0 5.624h2.934c1.781 0 3.037-.591 3.037-2.039 0-1.378-1.123-1.956-2.822-1.956h-3.149v3.995z"/>
    </svg>
  );
}
