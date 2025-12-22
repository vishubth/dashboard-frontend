import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import DataIntakePage from "./pages/DataIntakePage";
import DashboardPage from "./pages/DashboardPage";
import ProfileSummaryPage from "./pages/ProfileSummaryPage";

/* ---------- Layout Wrapper ---------- */
function Layout({ children }) {
  const location = useLocation();

  // hide navbar ONLY on intake page
  const hideNav = location.pathname === "/";

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
          <Route path="/" element={<DataIntakePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/summary" element={<ProfileSummaryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
