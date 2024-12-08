import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth)
    return !loading && !user ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;