import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoaderWithLogo from "../../../Component/Spiners/LoaderWithLogo";
import { MdCloudDone } from "react-icons/md";

const ApproveService = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: bookings = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["bookings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/decorator/${user?.email}`);
            return res.data;
        },
    });
    // --------------- Handle Booking Action (Accept/Complete) ---------------
    const handleBookingAction = (booking, action) => {
        const id = booking._id;
        const isAccept = action === 'accept';
        const serviceName = booking.serviceName || "Service";

        const executeAction = async () => {
            try {
                // Show loading state
                Swal.fire({
                    title: 'Processing...',
                    text: 'Please wait while we update the status.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const res = await axiosSecure.patch(`/bookings/${id}/decorator-action?action=${action}`);

                if (res.data.success || res.data.modifiedCount > 0 || (res.data.bookingResult && res.data.bookingResult.modifiedCount > 0)) {
                    await refetch(); // Refetch data to update UI
                    Swal.fire({
                        title: isAccept ? "Accepted!" : "Completed!",
                        text: isAccept
                            ? `You have successfully accepted "${serviceName}". Details are now available.`
                            : `Great job! "${serviceName}" has been marked as completed.`,
                        icon: "success",
                        confirmButtonColor: "#3085d6"
                    });
                } else {
                    Swal.fire("Info", "Booking status remains unchanged.", "info");
                }
            } catch (error) {
                console.error(`${action} booking error:`, error);
                const errorMessage = error.response?.data?.message || `Failed to ${action} booking. Please try again.`;
                Swal.fire("Error", errorMessage, "error");
            }
        };

        if (isAccept) {
            executeAction();
        } else {
            Swal.fire({
                title: "Complete Service?",
                text: `Are you sure you have completed the service for "${serviceName}"?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, Complete",
                cancelButtonColor: "#d33",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    executeAction();
                }
            });
        }
    };

    if (isLoading) return <LoaderWithLogo />;

    if (isError)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-error text-6xl">⚠️</div>
                <h2 className="text-2xl font-bold text-error">
                    Error Loading Assignments
                </h2>
                <p className="text-base-content/70">
                    Failed to load your assigned services. Please try again.
                </p>
                <button onClick={() => refetch()} className="btn btn-primary">
                    Try Again
                </button>
            </div>
        );

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                    Assigned Services
                </h1>
                <p className="text-base-content/60">
                    Manage your upcoming tasks and track project status.
                </p>
            </motion.div>

            {/* Table View */}
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto bg-base-100/60 backdrop-blur-md shadow-xl rounded-2xl border border-white/10">
                <table className="table w-full">
                    <thead className="bg-primary/10 text-base-content font-bold">
                        <tr>
                            <th>Service</th>
                            <th>Client Info</th>
                            <th>Date & Location</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-primary/5 transition-colors">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={booking.serviceImage || "https://placehold.co/100"}
                                                    alt={booking.serviceName}
                                                    onError={(e) => (e.target.src = "https://placehold.co/100?text=Service")}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{booking.serviceName}</div>
                                            <div className="text-xs opacity-50 capitalize">
                                                {booking.service_category || "General"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaUser className="text-primary text-xs" />
                                            <span className="font-medium">
                                                {booking.customerName || booking.userEmail?.split("@")[0]}
                                            </span>
                                        </div>
                                        <div className="text-xs opacity-50">{booking.userEmail}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaCalendarAlt className="text-secondary text-xs" />
                                            <span>{new Date(booking.date || booking.paidAt || Date.now()).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs opacity-70">
                                            <FaMapMarkerAlt className="text-accent text-xs" />
                                            <span className="truncate max-w-[150px]" title={booking.address}>
                                                {booking.address || "Location N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold text-primary">${booking.price || booking.amount || 0}</td>
                                <td>
                                    <div className={`badge badge-ghost gap-2 font-medium capitalize`}>
                                        {booking.deliveryStatus || "pending"}
                                    </div>
                                </td>
                                <td>
                                    {booking.deliveryStatus === "assigned" && (
                                        <button
                                            onClick={() => handleBookingAction(booking, 'accept')}
                                            className="btn btn-success btn-sm"
                                        >
                                            <FcAcceptDatabase /> Accept
                                        </button>
                                    )}
                                    {booking.deliveryStatus === "accepted-decorator" && (
                                        <button
                                            onClick={() => handleBookingAction(booking, 'completed')}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <MdCloudDone /> Completed
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {bookings.length === 0 && (
                <div className="text-center py-20 opacity-50 flex flex-col items-center justify-center gap-3">
                    <div className="text-6xl">📝</div>
                    <h3 className="text-2xl font-bold">No assignments found</h3>
                    <p>You don't have any assigned services yet.</p>
                </div>
            )}
        </div>
    );
};

export default ApproveService;
