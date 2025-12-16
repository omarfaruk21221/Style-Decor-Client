import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaCheckCircle, FaClock, FaSpinner, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoaderWithLogo from "../../../Component/Spiners/LoaderWithLogo";

const ApproveService = () => {
    const [filter, setFilter] = useState("all");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const {
        data: bookings = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["bookings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        },
    });

    // Helper functions for status
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'badge-warning';
            case 'in-progress': return 'badge-info';
            case 'completed': return 'badge-success';
            case 'cancelled': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <FaClock />;
            case 'in-progress': return <FaSpinner className="animate-spin" />;
            case 'completed': return <FaCheckCircle />;
            default: return <FaClock />;
        }
    };

    if (isLoading) return <LoaderWithLogo />;
    if (isError) return <div className="text-center p-10 text-error">Failed to load bookings.</div>;

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                    Assigned Services
                </h1>
                <p className="text-base-content/60">
                    Manage your upcoming tasks and track project status.
                </p>
            </motion.div>

            {/* Table View */}
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-x-auto bg-base-100/60 backdrop-blur-md shadow-xl rounded-2xl border border-white/10"
            >
                <table className="table w-full">
                    {/* Head */}
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
                                                <img src={booking.serviceImage || "https://placehold.co/100"} alt={booking.serviceName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{booking.serviceName}</div>
                                            <div className="text-xs opacity-50">{booking.service_category || 'General'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaUser className="text-primary text-xs" />
                                            <span>{booking.customerName || booking.userEmail}</span>
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
                                            <span className="truncate max-w-[150px]" title={booking.address}>{booking.address || 'N/A'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold text-primary">
                                    ${booking.price || booking.amount}
                                </td>
                                <td>
                                    <div className={`badge ${getStatusColor(booking.status || 'pending')} gap-2 font-medium`}>
                                        {getStatusIcon(booking.status || 'pending')}
                                        {(booking.status || 'pending').toUpperCase()}
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs text-info tooltip" data-tip="View Details">
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {bookings.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <h3 className="text-2xl font-bold">No assignments found</h3>
                    <p>You don't have any assigned services yet.</p>
                </div>
            )}
        </div>
    );
};

export default ApproveService;
