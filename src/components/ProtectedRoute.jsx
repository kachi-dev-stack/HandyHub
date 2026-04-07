import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Spinner from "./UIS/Spinner";

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/"></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
