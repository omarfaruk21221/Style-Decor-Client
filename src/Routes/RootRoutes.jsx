import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Services from "../Pages/HomePage/Services";
import About from "../Pages/HomePage/About";
import ErrorPage from "../Pages/ErrorPage";
import NotFound from "../Pages/NotFound";

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
                // Catch-all route for 404
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
