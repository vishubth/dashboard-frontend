import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}) {
  import { useAuth } from "../../context/AuthContext";
  const { auth } = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && auth.role !== "admin") {
    return <Navigate to="/user" replace />;
  }

  return children;
}
