import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoaderWithLogo from "../Component/Spiners/LoaderWithLogo";
import { toast } from "react-toastify";

const DecoratorRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    // Show loader while checking authentication and role
    if (loading || roleLoading) {
        return <LoaderWithLogo />;
    }

    // Redirect to login if not authenticated
    if (!user) {
        toast.error("Please login to access this page");
        return <Navigate to="/login" replace />;
    }

    // Redirect to home if not user
    if (role !== "decorator") {
        toast.error("Access denied. User privileges required.");
        return <Navigate to="/" replace />;
    }

    // User is authenticated and is user
    return children;
};

export default DecoratorRoutes;