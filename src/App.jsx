import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import NavBar from "./components/NavBar";

import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import DashboardPage from "./pages/DashboardPage";
import DataIntakePage from "./pages/DataIntakePage";
import ProfileSummaryPage from "./pages/ProfileSummaryPage";
import AdminPage from "./pages/AdminPage";

/* ---------- Layout Wrapper ---------- */
function Layout({ children }) {
  const location = useLocation();

  /*
    We hide the NavBar ONLY on login pages.
    After login, NavBar will be visible everywhere.
  */
  const hideNav =
    location.pathname === "/" ||
    location.pathname === "/login";

  return (
    <>
      {!hideNav && <NavBar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* LOGIN (root entry) */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* USER FLOW */}
          <Route path="/user" element={<UserHomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/summary" element={<ProfileSummaryPage />} />

          {/* ADMIN FLOW */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/data" element={<DataIntakePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
