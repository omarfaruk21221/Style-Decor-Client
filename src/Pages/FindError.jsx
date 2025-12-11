import React from 'react';

const FindError = ({ error }) => {
    return (
        <div className="container mx-auto min-h-[50vh] px-4 py-8">
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                <div className="text-error text-5xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-error">Failed to load bookings</h3>
                <p className="text-base-content/70 mt-2">{error?.message || "Something went wrong"}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary mt-6 text-white"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}

export default FindError;