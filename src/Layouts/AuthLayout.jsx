import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../Component/Logo";
import AuthNav from "../Component/AuthNav";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <nav>
        <AuthNav />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
