// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem("sessionToken") &&
    sessionStorage.getItem("userPhone");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
