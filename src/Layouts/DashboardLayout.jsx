import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import DashboardLinks from "../Pages/Dashbaord/DashboardLinks";
import {
  MdHistoryEdu,
  MdOutlineMedicalServices,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { FaArrowAltCircleLeft, FaHome, FaUser } from "react-icons/fa";
import useRole from "../Hooks/useRole";
import RoundedLoader from "../Component/Spiners/RoundedLoader";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <RoundedLoader />;
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
          <MdProductionQuantityLimits className="my-1.5 inline-block size-4" />
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
          {/* ===================== Create Service ============= */}
          <li>
            <NavLink
              to="/create-service"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Create Service"
            >
              <MdOutlineMedicalServices className="inline-block size-4" />
              <span className="is-drawer-close:hidden">Create Service</span>
            </NavLink>
          </li>
          {/* ===================== Aprrove riders============= */}
          <li>
            <NavLink
              to="/approve-riders"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Approve Riders"
            >
              <FaMotorcycle className="inline-block size-4" />
              <span className="is-drawer-close:hidden">Approve Riders</span>
            </NavLink>
          </li>
          {/* ======== asign riders=============== */}
          <li>
            <NavLink
              to="/dashboard/asign-riders"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Asign Riders"
            >
              <MdBikeScooter className="inline-block size-4" />
              <span className="is-drawer-close:hidden">Asign Riders</span>
            </NavLink>
          </li>
          {/* =============== user management ======== */}
          <li>
            <NavLink
              to="/dashboard/users-Management"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Users Management"
            >
              <FaUser className="inline-block size-4" />
              <span className="is-drawer-close:hidden">Users Management</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
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
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
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
