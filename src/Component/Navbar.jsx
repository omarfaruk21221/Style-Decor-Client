import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo2 from "../../public/assets/logo2.png";

const Navbar = () => {
  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative transition-all duration-300 px-3 py-2 ${isActive
              ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold"
              : "text-base-content hover:text-primary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              Home
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              )}
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `relative transition-all duration-300 px-3 py-2 ${isActive
              ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold"
              : "text-base-content hover:text-primary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              Services
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              )}
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative transition-all duration-300 px-3 py-2 ${isActive
              ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold"
              : "text-base-content hover:text-primary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              About
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              )}
            </>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 px-4 md:px-8 bg-transparent shadow-lg transition-all duration-300 font-display backdrop-blur-xl border-b border-slate-200/50 shadow-purple-500/5 dark:border-slate-700/20 dark:shadow-purple-500/10">
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
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-slate-900 rounded-lg z-[1] mt-3 w-52 p-2 shadow-lg backdrop-blur-sm"
          >
            {Links}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2"
        >
          <img className="w-12 h-12" src={logo2} alt="company logo" />
          Style Decor
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{Links}</ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        <div className="hidden lg:flex gap-2">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
