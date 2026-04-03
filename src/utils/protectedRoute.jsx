import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role }) {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // role-based guard
  if (role && user?.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
