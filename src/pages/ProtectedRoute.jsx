import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, allowedRole, children }) {
  if (!role) return <Navigate to="/auth" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/auth" />;
  return children;
}
