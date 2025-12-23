import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const RoleGuard = ({ role, children }) => {
  const { auth } = useAuth();
  return auth?.role === role ? children : <Navigate to="/login" />;
};

export default RoleGuard;
