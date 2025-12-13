import React from "react";
import { NavLink } from "react-router";
import { FaMotorcycle, FaUser } from "react-icons/fa6";

import {
  MdBikeScooter,
  MdHistoryEdu,
  MdProductionQuantityLimits,
} from "react-icons/md";
import useRole from "../../Hooks/useRole";
import RoundedLoader from "../../Component/Spiners/RoundedLoader";



const DashboardLinks = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <RoundedLoader />;
  }

  const DashboardLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip=" MyParcels"
        >
          <FaUser className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden"> My Profile</span>
        </NavLink>
      </li>

      {/* --- my-parcels -link --  */}
      <li>
        <NavLink
          to="/dashboard/my-parcels"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip=" My Parcels"
        >
          <MdProductionQuantityLimits className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden"> My Parcels</span>
        </NavLink>
      </li>
      {/* ---Payment History --  */}
      <li>
        <NavLink
          to="/dashboard/payment-history"
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
          {/* ===================== Aprrove riders============= */}
          <li>
            <NavLink
              to="/dashboard/approve-riders"
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

      {/* decoretor links */}
        {role === "decorator" && (
        <>
          {/* ===================== earnings summary============= */}
          <li>
            <NavLink
              to="/dashboard/earnings-summary"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Earnings Summary"
            >
              <FaMotorcycle className="inline-block size-4" />
              <span className="is-drawer-close:hidden">Earnings Summary</span>
              </NavLink>
            </li>
          {/* ===================== Approve service============= */}
          <li>
            <NavLink
              to="/dashboard/approve-service"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Approve Service"
            >
              <FaMotorcycle className="inline-block size-4" />
              <span className="is-drawer-close:hidden">Approve Service</span>
            </NavLink>
          </li>
          {/* ===================== Schedule============= */}
          <li>
            <NavLink
              to="/dashboard/schedule"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Schedule"
            >
              <FaMotorcycle className="inline-block size-4" />
              <span className="is-drawer-close:hidden">Schedule</span>
            </NavLink>
          </li>


        </>
      )}
    </>
  );
  return (
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
  );
};

export default DashboardLinks;
