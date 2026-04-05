import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Spinner from "./UIS/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
