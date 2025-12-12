import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import RoundedLoader from "../Component/Spiners/RoundedLoader";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  // console.log("location", location);
  // console.log({loading,user})
  if (loading) {
    return <RoundedLoader />;
  }

  if (!user) {
    // Save the current location so we can redirect back after login
    return <Navigate state={{ from: location }} to="/login" replace />;
  }

  return children;
};

export default PrivetRoutes;
