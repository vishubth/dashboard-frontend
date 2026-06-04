import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserStats,
  fetchProfileRequests,
  createProfileRequest,
} from "../utils/userApi";
import { API_BASE } from "../config/api";

export default function UserHomePage() {
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("AUTH_USER"));

  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [statsRes, reqRes] = await Promise.all([
        fetchUserStats(),
        fetchProfileRequests(),
      ]);

      setStats(statsRes);
      setRequests(Array.isArray(reqRes) ? reqRes : []);
    } catch (err) {
      setError(err.message || "Failed to load data");
    }
  }

  async function handleCreateRequest() {
    if (!profileName.trim()) return;

    try {
      setLoading(true);
      await createProfileRequest(profileName.trim());
      setProfileName("");
      setShowModal(false);
      loadData();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("AUTH_USER");
    navigate("/login");
  }

  async function openProfile(profileId) {
    if (!profileId) return;

    try {
      const res = await fetch(
        `${API_BASE}/profile?name=${encodeURIComponent(profileId)}`
      );

      if (!res.ok) {
        alert("Failed to load profile");
        return;
      }

      const data = await res.json();

      // 🔑 single source of truth
      localStorage.setItem("ACTIVE_PROFILE", JSON.stringify(data));

      navigate("/summary");
    } catch (err) {
      console.error(err);
      alert("Error loading profile");
    }
  }

  return (
    <div className="user-wrapper">
      <style>{`
        .user-wrapper {
          padding: 20px 24px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
          background: #f8fafc;
          min-height: calc(100vh - 48px);
        }

        /* ---------- TOP BAR ---------- */
        .top-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          margin-bottom: 20px;
        }

        .user-email {
          font-size: 13px;
          color: #334155;
        }

        .request-btn {
          padding: 8px 16px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
        }

        .logout-btn {
          justify-self: end;
          padding: 6px 14px;
          border: 1px solid #cbd5e1;
          background: white;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
        }

        /* ---------- STATS ---------- */
        .stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .card {
          background: white;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 16px;
        }

        .stat-title {
          font-size: 13px;
          color: #475569;
          margin-bottom: 6px;
        }

        .stat-value {
          font-size: 26px;
          font-weight: 600;
          color: #0f172a;
        }

        /* ---------- TABLE ---------- */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th, td {
          padding: 10px 8px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 13px;
        }

        th {
          background: #f1f5f9;
          text-align: left;
          color: #334155;
          font-weight: 600;
        }

        td {
          color: #0f172a;
        }

        .status {
          text-transform: capitalize;
          font-weight: 500;
        }

        .view-btn {
          padding: 4px 10px;
          font-size: 12px;
          border-radius: 4px;
          border: 1px solid #2563eb;
          background: white;
          color: #2563eb;
          cursor: pointer;
        }

        /* ---------- MODAL ---------- */
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal-card {
          background: white;
          padding: 20px;
          width: 380px;
          border-radius: 8px;
          display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .modal-card h3 {
          margin: 0 0 12px;
          font-size: 16px;
        }

        .modal-card input {
          width: 100%;
          padding: 8px;
          font-size: 13px;
          margin-bottom: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .modal-actions button {
          padding: 6px 12px;
          font-size: 12px;
          cursor: pointer;
        }

        .error {
          color: #dc2626;
          margin-bottom: 12px;
          font-size: 13px;
        }
      `}</style>

    

      {/* ---------- STATS ---------- */}
      {stats && (
        <div className="stats">
          <div className="card">
            <div className="stat-title">Total Profiles Searched</div>
            <div className="stat-value">{stats.total_searched}</div>
          </div>

          <div className="card">
            <div className="stat-title">Total Searches Available</div>
            <div className="stat-value">{stats.total_available}</div>
          </div>
        </div>
      )}

      {/* ---------- REQUEST TABLE ---------- */}
      <div className="card">
        <h3 style={{ marginBottom: 8 }}>Profile Requests</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Data</th>
              <th>Requested At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#64748b" }}>
                  No requests yet
                </td>
              </tr>
            )}

            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td style={{ maxWidth: 240, whiteSpace: "pre-wrap" }}>
                {r.extrainfo || "-"}
                </td>
                <td>{new Date(r.requested_at).toLocaleString()}</td>
                <td className="status">{r.status}</td>
                <td>
                  {r.status === "completed" && (
                    <button
                      className="view-btn"
                      onClick={() => openProfile(r.profile_id)}
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

    </div>
  );
}
