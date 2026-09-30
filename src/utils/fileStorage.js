/**
 * fileStorage.js
 * IndexedDB storage for real binary files (PDFs, ZIPs, DOCX, Images, etc.)
 * Bypasses localStorage's ~5MB quota limit and avoids string corruption.
 */

const DB_NAME = "PortfolioFileDB";
const STORE_NAME = "fileBlobs";
const DB_VERSION = 1;

let dbPromise = null;

function openDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !window.indexedDB) {
        resolve(null);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn("IndexedDB open error:", request.error);
        resolve(null);
      };
    });
  }
  return dbPromise;
}

export async function storeFileInDB(id, fileData, fileName, mimeType) {
  try {
    const db = await openDB();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const record = {
        id,
        fileData,
        fileName,
        mimeType: mimeType || "application/octet-stream",
        updatedAt: Date.now()
      };
      const req = store.put(record);
      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.warn("Failed to store file in IndexedDB:", req.error);
        resolve(false);
      };
    });
  } catch (err) {
    console.warn("IndexedDB store error:", err);
    return false;
  }
}

export async function getFileFromDB(id) {
  try {
    const db = await openDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn("IndexedDB get error:", err);
    return null;
  }
}

export async function removeFileFromDB(id) {
  try {
    const db = await openDB();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn("IndexedDB remove error:", err);
    return false;
  }
}

export async function getAllStoredFilesFromDB() {
  try {
    const db = await openDB();
    if (!db) return {};

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const map = {};
        (req.result || []).forEach((item) => {
          map[item.id] = item;
        });
        resolve(map);
      };
      req.onerror = () => resolve({});
    });
  } catch (err) {
    console.warn("IndexedDB getAll error:", err);
    return {};
  }
}
