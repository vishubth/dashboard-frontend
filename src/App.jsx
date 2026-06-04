import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserHomePage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/summary"
              element={
                <ProtectedRoute>
                  <ProfileSummaryPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/data"
              element={
                <ProtectedRoute requireAdmin>
                  <DataIntakePage />
                </ProtectedRoute>
              }
            />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
