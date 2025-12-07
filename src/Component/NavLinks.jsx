import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const NavLinks = () => {
  const { user } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `transition-all duration-300 px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold shadow-lg shadow-primary/50"
                  : "hover:bg-primary/20 hover:text-primary text-base-content hover:shadow-md"
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}

      {/* Dashboard link - only show if user is logged in */}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-all duration-300 px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold shadow-lg shadow-primary/50"
                  : "hover:bg-primary/20 hover:text-primary text-base-content hover:shadow-md"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
};

export default NavLinks;
