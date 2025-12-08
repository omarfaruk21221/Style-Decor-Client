import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../Component/Logo";
import AuthNav from "../Component/AuthNav";
import { ThemeProvider } from "../contexts/ThemeContext";

const AuthLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-base-200 transition-colors duration-300">
        <AuthNav />
        <main className="pt-20">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AuthLayout;
