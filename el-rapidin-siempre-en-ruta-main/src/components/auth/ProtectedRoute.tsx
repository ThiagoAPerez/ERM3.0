import { Navigate, Outlet } from "react-router-dom";
import { MeResponse } from "@/lib/auth";
import { getRoleFromToken } from "@/lib/session";

interface ProtectedRouteProps {
  allowedRoles?: MeResponse["role"][];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si no hay restricción por rol, solo valida sesión
  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  const role = getRoleFromToken();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
