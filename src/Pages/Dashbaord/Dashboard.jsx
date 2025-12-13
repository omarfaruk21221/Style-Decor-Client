import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserCog,
  FaClipboardList,
  FaCalendarAlt,
  FaWallet,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaTools,
  FaHistory,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import LoaderWithLogo from "../../Component/Spiners/LoaderWithLogo";

const Dashboard = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <LoaderWithLogo />;
  }

  // Define content based on role
  const getRoleSpecificContent = () => {
    switch (role) {
      case "admin":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Manage Users"
              description="View and manage all registered users."
              icon={FaUsers}
              link="/dashboard/manage-users"
              color="bg-primary/10 text-primary"
            />
            <DashboardCard
              title="Manage Services"
              description="Add, edit, or remove services."
              icon={FaTools}
              link="/dashboard/manage-service"
              color="bg-secondary/10 text-secondary"
            />
            <DashboardCard
              title="Manage Bookings"
              description="Oversee all customer bookings."
              icon={FaClipboardList}
              link="/dashboard/manage-bookings"
              color="bg-accent/10 text-accent"
            />
          </div>
        );
      case "decorator":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Approved Services"
              description="View tasks assigned to you."
              icon={FaClipboardList}
              link="/dashboard/approve-service"
              color="bg-primary/10 text-primary"
            />
            <DashboardCard
              title="My Earnings"
              description="Track your income and payments."
              icon={FaWallet}
              link="/dashboard/earnings-summary"
              color="bg-success/10 text-success"
            />
            <DashboardCard
              title="My Schedule"
              description="View your upcoming appointments."
              icon={FaCalendarAlt}
              link="/dashboard/schedule"
              color="bg-info/10 text-info"
            />
          </div>
        );
      default: // user
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Book a Service"
              description="Browse and book new services."
              icon={FaStar}
              link="/services"
              color="bg-primary/10 text-primary"
            />
            <DashboardCard
              title="My Bookings"
              description="Check status of your orders."
              icon={FaClipboardList}
              link="/dashboard/book-services"
              color="bg-secondary/10 text-secondary"
            />
            <DashboardCard
              title="Payment History"
              description="View your past transactions."
              icon={FaHistory}
              link="/dashboard/payment-history"
              color="bg-accent/10 text-accent"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 bg-gradient-to-r from-base-100 to-base-200 p-8 rounded-3xl border border-base-300 shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-base-content">
              Welcome back, <span className="text-primary">{user?.displayName}!</span>
            </h1>
            <p className="text-base-content/60 mt-2">
              Here's what's happening with your account today.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-base-300 text-sm font-semibold uppercase tracking-wider">
              <FaUserCog className="text-primary" /> {role} Account
            </div>
          </div>
        </div>
      </motion.div>

      {/* Role Based Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaArrowRight className="text-primary" /> Quick Actions
        </h2>

        {getRoleSpecificContent()}
      </motion.div>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({ title, description, icon: Icon, link, color }) => (
  <Link to={link} className="block group">
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full p-6 bg-base-100 rounded-3xl border border-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-base-content/60 text-sm">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
        Go Now <FaArrowRight />
      </div>
    </motion.div>
  </Link>
);

export default Dashboard;
