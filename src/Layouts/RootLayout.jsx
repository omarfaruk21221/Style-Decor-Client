import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";

const RootLayout = () => {

  return (
    <ThemeProvider>
      <div className="transition-colors duration-300">
        <Navbar />
        <main className="max-w-7xl min-h-screen pt-20 mx-auto px-4 sm:px-6 lg:px-8 ">
        <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
