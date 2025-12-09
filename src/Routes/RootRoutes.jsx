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
import UserServices from "../Pages/Dashbaord/UserPages/UserServices.jsx";
import PaymentHistory from "../Pages/Dashbaord/UserPages/PaymentHistory.jsx";

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
        element: (
          <PrivetRoutes>
            <About />
          </PrivetRoutes>
        ),
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
        element: <Dashboard/>,
      },
      // admin routes
       {
        path: "profile",
        element: <MyProfile />,
      },
      // user routes
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "my-services",
        element: <UserServices/>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory/>,
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
