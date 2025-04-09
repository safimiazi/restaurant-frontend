// src/components/common/AdminProtectedRoute.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentAdmin } from "../redux/features/auth/AdminAuthSlice";

const AdminProtectedRoute = () => {
  const admin = useSelector(selectCurrentAdmin);

  if (!admin) {
    // User not logged in, redirect to login
    return <Navigate to="/auth" replace />;
  }

  if (admin.role !== "admin") {
    // User is not an admin, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;