import { Navigate } from "react-router-dom";
import { authApi } from "../services/api";
import Header from "./Header";

const ProtectedRoute = ({ children }) => {
  const user = authApi.getUser();
  const token = localStorage.getItem("token");

  if (!user || !token) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired (you might want to implement this)
  // For now, we'll just check if token exists

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ProtectedRoute;
