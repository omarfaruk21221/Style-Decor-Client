import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
            <div className="text-center glass-effect p-12 rounded-3xl max-w-2xl w-full">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <h1 className="text-9xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
                        404
                    </h1>
                    <MdError className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-error/20 animate-spin" style={{ animationDuration: '3s' }} />
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-base-content/70 text-lg mb-2">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <p className="text-base-content/60">
                        It might have been moved or deleted.
                    </p>
                </div>

                {/* Search Suggestion */}
                <div className="glass-effect p-6 rounded-2xl mb-8">
                    <FaSearch className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-base-content/70">
                        Try searching for what you need or go back to the homepage
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="btn btn-primary btn-lg gap-2"
                    >
                        <FaHome className="w-5 h-5" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline btn-lg"
                    >
                        Go Back
                    </button>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-base-300">
                    <p className="text-sm text-base-content/60 mb-4">Quick Links:</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/services" className="link link-primary">Services</Link>
                        <Link to="/about" className="link link-primary">About</Link>
                        <Link to="/" className="link link-primary">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
