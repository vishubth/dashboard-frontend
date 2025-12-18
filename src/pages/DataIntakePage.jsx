import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ===================== UI DESIGN TOKENS ===================== */
const CARD_BG = "bg-gray-800";
const CARD_BORDER = "border border-gray-700";
const CARD_RADIUS = "rounded-2xl";
const CARD_SHADOW = "shadow-lg shadow-black/30";

const SECTION_BG = "bg-gray-700"; // safe Tailwind color
const SECTION_RADIUS = "rounded-xl";
const SECTION_SHADOW = "shadow-md shadow-black/20";
/* ============================================================ */

const API_BASE = "https://dashboard-backend-api-ocr5.onrender.com";



export default function DataIntakePage() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* -------- Fetch existing profiles -------- */
  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      try {
        const res = await fetch(`${API_BASE}/profiles`);

        if (!res.ok) {
          throw new Error(`Profiles fetch failed (${res.status})`);
        }

        const json = await res.json();

        if (!cancelled) {
          setProfiles(Array.isArray(json.profiles) ? json.profiles : []);
        }
      } catch (err) {
        console.error("Profiles fetch error:", err);
        if (!cancelled) setProfiles([]);
      }
    }

    loadProfiles();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------- Upload PDFs -------- */
  const handlePdfSubmit = async () => {
    if (!files.length) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await fetch(`${API_BASE}/extract`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`PDF extraction failed (${res.status})`);
      }

      const json = await res.json();

      if (!json?.data) {
        throw new Error("Invalid extraction response");
      }

      localStorage.setItem(
        "ACTIVE_PROFILE",
        JSON.stringify(json.data)
      );

      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* -------- Load existing profile -------- */
  const handleProfileSubmit = async () => {
    if (!selectedProfile) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${API_BASE}/profile?name=${encodeURIComponent(selectedProfile)}`
      );

      if (!res.ok) {
        throw new Error(`Profile not found (${res.status})`);
      }

      const json = await res.json();

      if (!json?.data) {
        throw new Error("Invalid profile response");
      }

      localStorage.setItem(
        "ACTIVE_PROFILE",
        JSON.stringify(json.data)
      );

      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
        style={{
        minHeight: "100vh",
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "white",
        }}
    >
        {/* MAIN CARD */}
        <div
        style={{
            width: "100%",
            maxWidth: "760px",
            background: "#0f172a",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            padding: "40px",
        }}
        >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
            📂 Profile Data Intake
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            Upload new PDFs or continue with an existing profile
            </p>
        </div>

        {/* UPLOAD PDFs (PRIMARY) */}
        <div
            style={{
            background: "#020617",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "28px",
            }}
        >
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
            Upload PDFs
            </h2>

            <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            style={{ marginBottom: "12px" }}
            />

            <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
            You can upload multiple PDF files at once
            </div>

            <button
            disabled={!files.length || loading}
            onClick={handlePdfSubmit}
            style={{
                padding: "10px 20px",
                background: files.length ? "#2563eb" : "#1e293b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: files.length ? "pointer" : "not-allowed",
            }}
            >
            Submit PDFs
            </button>
        </div>

        {/* DIVIDER */}
        <div
            style={{
            textAlign: "center",
            color: "#64748b",
            margin: "20px 0",
            fontSize: "13px",
            }}
        >
            OR
        </div>

        {/* LOAD EXISTING PROFILE */}
        <div
            style={{
            background: "#020617",
            borderRadius: "12px",
            padding: "24px",
            }}
        >
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
            Load Existing Profile
            </h2>

            <select
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
            style={{
                width: "100%",
                padding: "10px",
                background: "#020617",
                color: "white",
                border: "1px solid #334155",
                borderRadius: "8px",
                marginBottom: "16px",
            }}
            >
            <option value="">Select profile</option>
            {profiles.map((p) => (
                <option key={p} value={p}>
                {p}
                </option>
            ))}
            </select>

            <button
            disabled={!selectedProfile || loading}
            onClick={handleProfileSubmit}
            style={{
                padding: "10px 20px",
                background: selectedProfile ? "#16a34a" : "#1e293b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: selectedProfile ? "pointer" : "not-allowed",
            }}
            >
            Load Profile
            </button>
        </div>

        {/* STATUS */}
        {loading && (
            <div style={{ marginTop: "20px", color: "#60a5fa", textAlign: "center" }}>
            Processing…
            </div>
        )}

        {error && (
            <div style={{ marginTop: "12px", color: "#f87171", textAlign: "center" }}>
            {error}
            </div>
        )}
        </div>
    </div>
    );
}
