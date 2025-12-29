import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { createProfileRequest } from "../utils/userApi";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const authUser = JSON.parse(localStorage.getItem("AUTH_USER"));
  const role = authUser?.role;

  const isUserHome = location.pathname === "/user";
  const isAdminPage = location.pathname === "/admin";

  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);

  function logout() {
    localStorage.removeItem("AUTH_USER");
    navigate("/login");
  }

  async function submitRequest() {
    if (!profileName.trim()) return;

    try {
      setLoading(true);
      await createProfileRequest(profileName.trim(), extraInfo.trim());
      setShowModal(false);
      setProfileName("");
      setExtraInfo("");
      navigate("/user"); // refresh table
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <nav style={styles.nav}>
        {/* LEFT */}
        <div style={styles.left}>{authUser?.email}</div>

        {/* CENTER */}
        <div style={styles.center}>
          {isUserHome && role !== "admin" && (
            <button style={styles.requestBtn} onClick={() => setShowModal(true)}>
              Request Profile
            </button>
          )}

          {!isUserHome && !isAdminPage && role !== "admin" && (
            <>
              <NavLink to="/user" style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }>
                Home
              </NavLink>

              <NavLink to="/dashboard" style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }>
                Dashboard
              </NavLink>

              <NavLink to="/summary" style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }>
                Profile Summary
              </NavLink>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* ===== SINGLE MODAL ===== */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalCard}>
            <h3>Request Profile</h3>

            <input
              placeholder="Full name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              style={styles.input}
            />

            <textarea
              placeholder="Additional details (DOB, address, SSN, notes, etc.)"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              rows={4}
              style={styles.textarea}
            />

            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={submitRequest} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ===== STYLES ===== */

const styles = {
  nav: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    height: "48px",
    padding: "0 20px",
    background: "#9bb8f1ff",
    borderBottom: "1px solid #cbd5e1",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  left: { fontSize: "13px" },
  center: { display: "flex", gap: "24px", justifyContent: "center" },
  right: { display: "flex", justifyContent: "flex-end" },

  link: { textDecoration: "none", color: "#475569", fontSize: "14px" },
  activeLink: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 600,
    borderBottom: "2px solid #2563eb",
  },

  requestBtn: {
    padding: "6px 14px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "6px 12px",
    border: "1px solid #adc9eaff",
    background: "#fff",
    color: "#0f172a",
    borderRadius: "4px",
    cursor: "pointer",
  },

  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },

  modalCard: {
    background: "#fff",
    padding: "20px",
    width: "380px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    color: "#111827",
  },

  input: {
    padding: "8px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
  },

  textarea: {
    padding: "8px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    resize: "vertical",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
};
