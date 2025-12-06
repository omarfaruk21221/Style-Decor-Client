import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className="transition-colors duration-300">
        <nav className="py-2">
          <Navbar />
        </nav>
        <main className="min-h-screen">
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
