import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import DashboardLinks from "../Pages/Dashbaord/DashboardLinks";
import {
  MdHistoryEdu,
  MdMedicalServices,
  MdOutlineAddCircleOutline,
  MdOutlineMedicalServices,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { FaArrowAltCircleLeft, FaHome, FaPlus, FaUser } from "react-icons/fa";
import useRole from "../Hooks/useRole";
import { FaUsersBetweenLines } from "react-icons/fa6";
import LoaderWithLogo from "../Component/Spiners/LoaderWithLogo";
import { MdOutlineAddCircle } from "react-icons/md";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <LoaderWithLogo />;
  }
  const DashboardLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Back to Home"
        >
          <FaArrowAltCircleLeft className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden"> Back to Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="dashboard"
        >
          <FaHome className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden"> Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="profile"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Profile"
        >
          <FaUser className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden"> My Profile</span>
        </NavLink>
      </li>

      {/* --- my -link --  */}
      <li>
        <NavLink
          to="my-services"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Services"
        >
          <FaPlus className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden"> My Services</span>
        </NavLink>
      </li>
      {/* ---Payment History --  */}
      <li>
        <NavLink
          to="payment-history"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip=" Payment History"
        >
          <MdHistoryEdu className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">Payment History</span>
        </NavLink>
      </li>


      {/*  Admin Links */}
      {role === "admin" && (
        <>
          {/* ==== manage service add delete updadete  === */}
          <li>
            <NavLink
              to="manage-service"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manage-Service"
            >
              <MdOutlineAddCircleOutline className="my-1.5 inline-block size-4" />
              <span className="is-drawer-close:hidden">Manage Service</span>
            </NavLink>
          </li>
          {/* ===== manage user set role and delete role user  ===   */}
          <li>
            <NavLink
              to="manage-users"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manage Users"
            >
              <FaUsersBetweenLines className="my-1.5 inline-block size-4" />
              <span className="is-drawer-close:hidden">Manage Users</span>
            </NavLink>
          </li>
          {/* ===== manage bookings  ===   */}
          <li>
            <NavLink
              to="manage-bookings"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manage Bookings"
            >
              <FaUsersBetweenLines className="my-1.5 inline-block size-4" />
              <span className="is-drawer-close:hidden">Manage Bookings</span>
            </NavLink>
          </li>
          {/* ===== add service  ===   */}
          <li>
            <NavLink
              to="add-service"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Add Service"
            >
              <MdOutlineAddCircle className="my-1.5 inline-block size-4" />
              <span className="is-drawer-close:hidden">Add Service</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open bg-primary/10 min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <main className="bg-secondary-content/50 p-6 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {DashboardLinks}

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
