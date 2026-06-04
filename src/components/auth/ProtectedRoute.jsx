import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}) {
  const auth = JSON.parse(
    localStorage.getItem("AUTH_USER") || "null"
  );

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && auth.role !== "admin") {
    return <Navigate to="/user" replace />;
  }

  return children;
}
