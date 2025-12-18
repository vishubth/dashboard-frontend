import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataIntakePage from "./pages/DataIntakePage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataIntakePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

