import React from "react";
import ThemeToggle from "./ThemeToggle";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full glass-effect transition-all duration-300">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8">
        {/* Navbar Start - Hamburger Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <HiMenuAlt3 className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow-xl"
            >
              <li>
                <a
                  href="/"
                  className="hover:bg-primary hover:text-primary-content transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:bg-primary hover:text-primary-content transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:bg-primary hover:text-primary-content transition-colors duration-200"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <a
            href="/"
            className="btn btn-ghost text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
          >
            Style Decor
          </a>
        </div>

        {/* Navbar Center - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <a
                href="/"
                className="hover:bg-primary hover:text-primary-content transition-all duration-200 rounded-lg"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:bg-primary hover:text-primary-content transition-all duration-200 rounded-lg"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:bg-primary hover:text-primary-content transition-all duration-200 rounded-lg"
              >
                Services
              </a>
            </li>
          </ul>
        </div>

        {/* Navbar End - Theme Toggle */}
        <div className="navbar-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
