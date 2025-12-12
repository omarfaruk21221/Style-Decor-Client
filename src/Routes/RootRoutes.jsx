import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout.jsx";
import DashboardLayout from "../Layouts/DashboardLayout.jsx";
import HomePage from "../Pages/HomePage/HomePage.jsx";
import Services from "../Pages/ServicePage/ServicesPage.jsx";
import About from "../Pages/AboutPage/AboutPage.jsx";
import ContactPage from "../Pages/ContactPage/ContactPage.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import NotFound from "../Pages/NotFound.jsx";
import LoginPage from "../Pages/AuthPages/LoginPage.jsx";
import RegisterPage from "../Pages/AuthPages/RegisterPage.jsx";
import ForgetPage from "../Pages/AuthPages/ForgetPage.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import MyProfile from "../Pages/MyProfile/MyProfile.jsx";
import PrivetRoutes from "./PrivetRoutes.jsx";
import Dashboard from "../Pages/Dashbaord/Dashboard.jsx";
import BookServices from "../Pages/Dashbaord/UserPages/BookServices.jsx";
import ManageUsers from "../Pages/Dashbaord/AminPages/ManageUsers.jsx";
import ServiceManage from "../Pages/Dashbaord/AminPages/ServiceManage.jsx";
import ManageBookings from "../Pages/Dashbaord/AminPages/ManageBookings.jsx";
import AddService from "../Pages/Dashbaord/AminPages/AddService.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import UserRoutes from "./UserRoutes.jsx";
import ProfilePage from "../Pages/Dashbaord/ProfilePage.jsx";
import BookingModal from "../Pages/Modals/BookingModal.jsx";
import Payment from "../Pages/Dashbaord/UserPages/Payment/Payment.jsx";
import PaymentHistory from "../Pages/Dashbaord/UserPages/Payment/PaymentHistory.jsx";
import PaymentSuccess from "../Pages/Dashbaord/UserPages/Payment/PaymentSuccess.jsx";
import PaymentCancle from "../Pages/Dashbaord/UserPages/Payment/PaymantCancle.jsx";
export const router = createBrowserRouter([
  // Main Routes with RootLayout
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },

  // Dashboard Routes with DashboardLayout (Protected)
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <DashboardLayout />
      </PrivetRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // admin routes
      {
        path: "profile",
        element: <ProfilePage />,
      },
      // user routes
      {
        path: "book-services",
        element: (
          <UserRoutes>
            <BookServices />
          </UserRoutes>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <UserRoutes>
            <Payment />
          </UserRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <UserRoutes>
            <PaymentHistory></PaymentHistory>
          </UserRoutes>
        ),
      },
      {
        path: "payment-success",
        element: (
          <UserRoutes>
            <PaymentSuccess />
          </UserRoutes>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <UserRoutes>
            <PaymentCancle />
          </UserRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Wishlist
            </h2>
            <p className="text-base-content/70">Coming Soon</p>
          </div>
        ),
      },
      {
        path: "settings",
        element: (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Settings
            </h2>
            <p className="text-base-content/70">Coming Soon</p>
          </div>
        ),
      },
      // Admin routes - protected with AdminRoutes
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-service",
        element: (
          <AdminRoutes>
            <ServiceManage />
          </AdminRoutes>
        ),
      },
      {
        path: "add-service",
        element: (
          <AdminRoutes>
            <AddService />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoutes>
            <ManageBookings />
          </AdminRoutes>
        ),
      },
      {
        path: "add-service",
        element: (
          <AdminRoutes>
            <AddService />
          </AdminRoutes>
        ),
      },
    ],
  },

  // Authentication Routes with AuthLayout
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgetPage />,
      },
    ],
  },

  // Legacy Auth Routes (direct access)
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "forgot-password",
    element: <ForgetPage />,
  },

  // 404 Not Found (must be last)
  {
    path: "*",
    element: <NotFound />,
  },
]);
