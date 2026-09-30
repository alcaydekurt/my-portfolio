/**
 * cloudStore.js
 * Cloud sync service using JSONBin.io
 * All portfolio data (profile, skills, files, trash) is stored in a single bin
 * and fetched on every page load so ALL visitors / devices see the same data.
 */

const BIN_ID  = import.meta.env.VITE_JSONBIN_BIN_ID;
const API_KEY = import.meta.env.VITE_JSONBIN_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const HEADERS_READ = {
  "X-Master-Key": API_KEY,
};

const HEADERS_WRITE = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

/** Fetch all stored portfolio data from the cloud bin.
 *  Returns the record object or null on failure / missing credentials. */
export async function fetchCloudData() {
  if (!BIN_ID || !API_KEY) {
    console.warn("cloudStore: missing VITE_JSONBIN_KEY or VITE_JSONBIN_BIN_ID");
    return null;
  }
  try {
    const res = await fetch(BASE_URL, { headers: HEADERS_READ });
    if (!res.ok) throw new Error(`JSONBin read failed: ${res.status}`);
    const json = await res.json();
    // JSONBin wraps the stored data in { record: { ... } }
    return json.record && Object.keys(json.record).length > 1
      ? json.record
      : null;
  } catch (err) {
    console.error("cloudStore: read error →", err.message);
    return null;
  }
}

/** Write all portfolio data to the cloud bin.
 *  Called by admin after any save action.
 *  data = { profile, education, skills, files, trash }
 *  Returns true on success, false on failure. */
export async function saveCloudData(data) {
  if (!BIN_ID || !API_KEY) return false;
  try {
    const res = await fetch(BASE_URL, {
      method: "PUT",
      headers: HEADERS_WRITE,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`JSONBin write failed: ${res.status}`);
    return true;
  } catch (err) {
    console.error("cloudStore: write error →", err.message);
    return false;
  }
}
