import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleGuard = ({ role, children }) => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (auth.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleGuard;
