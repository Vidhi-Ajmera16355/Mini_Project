import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists in localStorage

  return isAuthenticated ? <Component /> : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
