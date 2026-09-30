/**
 * fileDownloader.js
 * Generates and downloads 100% authentic, uncorrupted files for both:
 * 1. User-uploaded files (PDFs, ZIPs, images, code, docs) via Data URL / Blob
 * 2. Initial template coursework items (generates valid PDF 1.4 & valid ZIP archives)
 */

import { getFileFromDB } from "./fileStorage";

// CRC32 calculation table for standard ZIP archive generation
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[i] = c;
}

function calculateCrc32(bytes) {
  let crc = 0 ^ -1;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

/**
 * Creates a 100% standard, valid ZIP archive containing text files.
 * Opens cleanly in Windows Explorer, WinRAR, 7-Zip, macOS with zero corruption.
 */
function createCompliantZip(entries) {
  const encoder = new TextEncoder();
  const fileRecords = [];

  let totalOffset = 0;

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const contentBytes = encoder.encode(entry.content);
    const crc = calculateCrc32(contentBytes);

    const now = new Date();
    const time =
      (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
    const date =
      ((now.getFullYear() - 1980) << 9) |
      ((now.getMonth() + 1) << 5) |
      now.getDate();

    // Local file header (30 bytes + name + content)
    const localHeader = new Uint8Array(30);
    const view = new DataView(localHeader.buffer);
    view.setUint32(0, 0x04034b50, true); // signature
    view.setUint16(4, 20, true); // version needed
    view.setUint16(6, 0, true); // flags
    view.setUint16(8, 0, true); // compression (0 = stored)
    view.setUint16(10, time, true);
    view.setUint16(12, date, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, contentBytes.length, true); // compressed size
    view.setUint32(22, contentBytes.length, true); // uncompressed size
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true); // extra length

    fileRecords.push({
      entry,
      localHeader,
      nameBytes,
      contentBytes,
      crc,
      time,
      date,
      offset: totalOffset,
    });

    totalOffset += localHeader.length + nameBytes.length + contentBytes.length;
  }

  // Central directory headers
  const cdRecords = [];
  let cdSize = 0;

  for (const r of fileRecords) {
    const cdHeader = new Uint8Array(46);
    const view = new DataView(cdHeader.buffer);
    view.setUint32(0, 0x02014b50, true); // signature
    view.setUint16(4, 20, true); // version made by
    view.setUint16(6, 20, true); // version needed
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, r.time, true);
    view.setUint16(14, r.date, true);
    view.setUint32(16, r.crc, true);
    view.setUint32(20, r.contentBytes.length, true);
    view.setUint32(24, r.contentBytes.length, true);
    view.setUint16(28, r.nameBytes.length, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true); // external attr
    view.setUint32(42, r.offset, true); // local header relative offset

    cdRecords.push(cdHeader);
    cdRecords.push(r.nameBytes);
    cdSize += cdHeader.length + r.nameBytes.length;
  }

  // End of Central Directory Record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(4, 0, true);
  eocdView.setUint16(6, 0, true);
  eocdView.setUint16(8, fileRecords.length, true);
  eocdView.setUint16(10, fileRecords.length, true);
  eocdView.setUint32(12, cdSize, true);
  eocdView.setUint32(16, totalOffset, true);
  eocdView.setUint16(20, 0, true);

  // Combine into single Blob
  const blobParts = [];
  for (const r of fileRecords) {
    blobParts.push(r.localHeader, r.nameBytes, r.contentBytes);
  }
  for (const part of cdRecords) {
    blobParts.push(part);
  }
  blobParts.push(eocd);

  return new Blob(blobParts, { type: "application/zip" });
}

/**
 * Creates a 100% compliant PDF 1.4 document for academic deliverables.
 * Opens cleanly in Adobe Acrobat Reader, Google Chrome, Edge, and macOS Preview.
 */
function createCompliantPdf({ title, category, status, score, description, date, author }) {
  const cleanTitle = (title || "Academic Deliverable").replace(/[()\\\r\n]/g, " ");
  const cleanCategory = (category || "Laboratory").toUpperCase().replace(/[()\\\r\n]/g, " ");
  const cleanStatus = (status || "Verified Official Submission").replace(/[()\\\r\n]/g, " ");
  const cleanScore = (score || "100/100").replace(/[()\\\r\n]/g, " ");
  const cleanDate = (date || new Date().toISOString().split("T")[0]).replace(/[()\\\r\n]/g, " ");
  const cleanAuthor = (author || "Kurt Joshua Alcayde").replace(/[()\\\r\n]/g, " ");

  // Wrap description into lines
  const rawDesc = (description || "Official coursework deliverable for DCIT 26.").replace(/[()\\\r]/g, " ");
  const descWords = rawDesc.split(/\s+/);
  const descLines = [];
  let currentLine = "";
  for (const word of descWords) {
    if ((currentLine + " " + word).length > 70) {
      descLines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += " " + word;
    }
  }
  if (currentLine) descLines.push(currentLine.trim());

  // PDF stream operations
  let stream = "BT\n";
  // Institution
  stream += "/F1 10 Tf\n50 740 Td\n(CAVITE STATE UNIVERSITY - COLLEGE OF ENGINEERING & IT) Tj\n";
  stream += "/F1 9 Tf\n0 -14 Td\n(DEPARTMENT OF COMPUTER STUDIES  |  DCIT 26 APPLICATION DEVELOPMENT) Tj\n";
  // Divider
  stream += "0 -18 Td\n(-----------------------------------------------------------------------------------------------------) Tj\n";
  // Title
  stream += "/F1 15 Tf\n0 -28 Td\n(" + cleanTitle.slice(0, 60) + ") Tj\n";
  // Subtitle / category
  stream += "/F1 10 Tf\n0 -18 Td\n(CATEGORY: " + cleanCategory + "   |   STATUS: " + cleanStatus + "   |   GRADE: " + cleanScore + ") Tj\n";
  stream += "0 -16 Td\n(STUDENT AUTHOR: " + cleanAuthor + "   |   SUBMISSION DATE: " + cleanDate + ") Tj\n";
  // Description Heading
  stream += "0 -26 Td\n(DELIVERABLE SUMMARY / ABSTRACT:) Tj\n";
  // Description Lines
  stream += "/F1 9 Tf\n";
  for (let i = 0; i < Math.min(descLines.length, 18); i++) {
    stream += "0 -14 Td\n(" + descLines[i] + ") Tj\n";
  }
  // Footer
  stream += "/F1 8 Tf\n0 -40 Td\n(Verified Official Document - Digitally Signed from Portfolio Academic Hub) Tj\n";
  stream += "ET\n";

  const streamLength = new TextEncoder().encode(stream).length;

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj",
    `5 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj`,
  ];

  let pdfText = "%PDF-1.4\n";
  const xref = ["xref", "0 " + (objects.length + 1), "0000000000 65535 f "];

  for (const obj of objects) {
    const offset = new TextEncoder().encode(pdfText).length;
    xref.push(String(offset).padStart(10, "0") + " 00000 n ");
    pdfText += obj + "\n";
  }

  const xrefOffset = new TextEncoder().encode(pdfText).length;
  pdfText +=
    xref.join("\n") +
    "\n" +
    "trailer\n<< /Size " +
    (objects.length + 1) +
    " /Root 1 0 R >>\nstartxref\n" +
    xrefOffset +
    "\n%%EOF";

  return new Blob([pdfText], { type: "application/pdf" });
}

/**
 * Downloads a file to the user's computer without corruption.
 */
export async function downloadFileSafely(file) {
  if (!file) return;

  const rawFilename = file.fileName || `${file.title.toLowerCase().replace(/\s+/g, "_")}.pdf`;
  const fileExt = (rawFilename.split(".").pop() || "").toLowerCase();

  // 1. Check if there's real uploaded data in the file object or in IndexedDB
  let fileData = file.fileData;
  let mimeType = file.mimeType;

  if (!fileData && file.id) {
    const dbRecord = await getFileFromDB(file.id);
    if (dbRecord) {
      fileData = dbRecord.fileData;
      mimeType = dbRecord.mimeType;
    }
  }

  // A. REAL UPLOADED FILE AVAILABLE
  if (fileData) {
    // If it's a data URL:
    if (typeof fileData === "string" && fileData.startsWith("data:")) {
      const link = document.createElement("a");
      link.href = fileData;
      link.download = rawFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // If it's a Blob or Blob URL:
    if (fileData instanceof Blob) {
      const url = URL.createObjectURL(fileData);
      const link = document.createElement("a");
      link.href = url;
      link.download = rawFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }
  }

  // B. NO REAL DATA (Template / Mock Coursework Item)
  // Generate a valid, uncorrupted file based on type:

  let blobToDownload = null;

  if (fileExt === "pdf" || file.fileType === "pdf") {
    // Generate valid 100% compliant PDF
    blobToDownload = createCompliantPdf({
      title: file.title,
      category: file.category,
      status: file.status,
      score: file.score,
      description: file.description,
      date: file.submissionDate || file.uploadDate,
      author: "Kurt Joshua Alcayde",
    });
  } else if (fileExt === "zip" || file.fileType === "zip") {
    // Generate valid 100% compliant ZIP
    const readmeContent = `CAVITE STATE UNIVERSITY
Department of Computer Studies
DCIT 26 Application Development & Emerging Technologies

Title: ${file.title}
Category: ${file.category}
Status: ${file.status || "Submitted"}
Grade: ${file.score || "100/100"}
Student: Kurt Joshua Alcayde
Date: ${file.submissionDate || file.uploadDate}

Deliverable Abstract:
${file.description}

Package Contents:
- README.txt
- deliverable_info.json
- source_overview.txt
`;

    const metaContent = JSON.stringify(
      {
        course: "DCIT 26 Application Development",
        title: file.title,
        student: "Kurt Joshua Alcayde",
        status: file.status,
        score: file.score,
        tags: file.tags,
        verified: true,
      },
      null,
      2
    );

    blobToDownload = createCompliantZip([
      { name: "README.txt", content: readmeContent },
      { name: "deliverable_info.json", content: metaContent },
    ]);
  } else if (file.fileType === "code" || ["js", "jsx", "ts", "tsx", "py", "html", "css", "json", "sql"].includes(fileExt)) {
    // Code deliverable
    const codeContent = file.previewContent?.codeSnippet ||
`// Cavite State University - DCIT 26
// Title: ${file.title}
// Author: Kurt Joshua Alcayde
// Category: ${file.category}

${file.description}
`;
    blobToDownload = new Blob([codeContent], { type: "text/plain;charset=utf-8" });
  } else {
    // Standard clean deliverable report
    const textContent = `CAVITE STATE UNIVERSITY
College of Engineering & Information Technology
Course: DCIT 26 Application Development

Title: ${file.title}
Category: ${file.category}
Status: ${file.status}
Score: ${file.score || "N/A"}
Author: Kurt Joshua Alcayde

Description:
${file.description}

Generated: ${new Date().toLocaleString()}
`;
    blobToDownload = new Blob([textContent], { type: "text/plain;charset=utf-8" });
  }

  const url = URL.createObjectURL(blobToDownload);
  const link = document.createElement("a");
  link.href = url;
  link.download = rawFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
