
import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
            <div className="text-center p-8 bg-white shadow-xl rounded-2xl border border-gray-100 max-w-lg w-full">
                <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">
                    {error?.status || '404'}
                </h1>
                <div className="bg-red-100 px-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <h2 className="text-2xl font-semibold md:text-3xl mt-4 mb-4">
                    Oops! Something went wrong.
                </h2>
                <p className="text-gray-500 mb-8">
                    {error?.statusText || error?.message || "Sorry, we couldn't find the page you're looking for."}
                </p>
                <Link
                    to="/"
                    className="inline-block px-8 py-3 text-sm font-medium text-white transition bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    Go Back Home
                </Link>
            </div>

            <div className="mt-12 text-gray-400 text-sm">
                <i>{error?.data}</i>
            </div>
        </div>
    );
};

export default ErrorPage;
