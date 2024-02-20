import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RedirectIfAuthenticated({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/:checkInDate/:checkOutDate" /> : children;
}
