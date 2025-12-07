import React, { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avator from "./Avator";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const menuItems = [
    {
      label: "My Profile",
      icon: FaUser,
      action: () => closeDropdown(),
      link: "/profile",
    },
    {
      label: "Dashboard",
      icon: FaHeart,
      action: () => closeDropdown(),
      link: "/dashboard",
    },
    {
      label: "Settings",
      icon: FaCog,
      action: () => closeDropdown(),
      link: "/settings",
    },
  ];

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className={`transition-all duration-200 ${isOpen ? "opacity-75" : ""}`}
        title="User Menu"
      >
        <Avator />
      </button>

      {/* Dropdown Menu with Smooth Animation */}
      <div
        className={`absolute right-0 top-full mt-3 transition-all duration-200 origin-top z-50 ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }`}
      >
        <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 overflow-hidden w-64">
          {/* User Info Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
            <div className="flex items-center gap-3">
              <img
                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <p className="font-bold text-sm">User Name</p>
                <p className="text-xs opacity-90">user@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="menu p-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.link}
                    onClick={() => {
                      item.action();
                    }}
                    className="flex items-center gap-3 hover:bg-primary/10 transition-colors duration-150 px-4 py-2 rounded-lg"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="border-t border-base-300"></div>

          {/* Logout Button */}
          <div className="p-2">
            <button
              onClick={closeDropdown}
              className="w-full flex items-center gap-3 bg-error/10 hover:bg-error/20 text-error transition-colors duration-150 px-4 py-2 rounded-lg font-medium text-sm"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop - Close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={closeDropdown} />}
    </div>
  );
};

export default UserMenu;
