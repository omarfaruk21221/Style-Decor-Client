import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Services from "../Pages/HomePage/Services";
import About from "../Pages/HomePage/About";
import ErrorPage from "../Pages/ErrorPage";
import NotFound from "../Pages/NotFound";
import LoginPage from "../Pages/AuthPages/LoginPage";
import RegisterPage from "../Pages/AuthPages/RegisterPage";
import AuthLayout from "../Layouts/AuthLayout";
import ForgetPage from "../Pages/AuthPages/ForgetPage";
import ContactPage from "../Pages/ContactPage/ContactPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/services",
                element: <Services />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <ContactPage />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/forgot-password",
                element:<ForgetPage />,
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);
