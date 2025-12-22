import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.center}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/summary"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Profile Summary
        </NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",   // 👈 centers everything
    alignItems: "center",
    height: "48px",
    borderBottom: "1px solid #cbd5e1",
    background: "#9bb8f1ff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  center: {
    display: "flex",
    gap: "24px",
  },
  link: {
    textDecoration: "none",
    color: "#475569",
    fontSize: "14px",
    paddingBottom: "4px",
  },
  activeLink: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 600,
    borderBottom: "2px solid #2563eb",
    paddingBottom: "4px",
  },
};
