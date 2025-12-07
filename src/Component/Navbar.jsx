import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 px-4 md:px-8 bg-transparent transition-all duration-300 backdrop-blur-xl border-b border-slate-200/50 shadow-primary/50 ">
      {/* Navbar Start - Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-transparent  rounded-lg z-[1] mt-3 w-52 p-2 shadow-lg backdrop-blur-sm"
          >
            <NavLinks />
          </ul>
        </div>
        <Logo />
      </div>

      {/* Navbar Center - Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <NavLinks />
        </ul>
      </div>

      {/* Navbar End - Theme Toggle and Auth Buttons */}
      <div className="navbar-end gap-2 md:gap-4">
        <ThemeToggle />

        <div className="flex gap-2">
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
