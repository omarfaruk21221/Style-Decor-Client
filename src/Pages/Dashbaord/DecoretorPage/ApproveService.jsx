import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaCheckCircle, FaClock, FaSpinner } from "react-icons/fa";

// Mock Data
const mockAssignments = [
    {
        updatedAt: "2024-12-10T10:00:00Z",
        _id: "1",
        serviceName: "Modern Living Room Decor",
        clientName: "Alice Johnson",
        address: "123 Maple Street, NY",
        serviceDate: "2024-12-20",
        status: "pending",
        image: "https://i.ibb.co/3MqnL7B/living-room.jpg",
        price: 450
    },
    {
        _id: "2",
        serviceName: "Kitchen Renovation",
        clientName: "Bob Smith",
        address: "456 Oak Avenue, CA",
        serviceDate: "2024-12-18",
        status: "in-progress",
        image: "https://i.ibb.co/k0j3y2p/kitchen.jpg",
        price: 1200
    },
    {
        _id: "3",
        serviceName: "Bedroom Styling",
        clientName: "Charlie Davis",
        address: "789 Pine Lane, TX",
        serviceDate: "2024-12-15",
        status: "completed",
        image: "https://i.ibb.co/C0k3y2p/bedroom.jpg",
        price: 300
    }
];

const ApproveService = () => {
    const [filter, setFilter] = useState("all");

    const filteredAssignments = filter === "all"
        ? mockAssignments
        : mockAssignments.filter(item => item.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "badge-warning";
            case "in-progress": return "badge-info";
            case "completed": return "badge-success";
            default: return "badge-ghost";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending": return <FaClock />;
            case "in-progress": return <FaSpinner className="animate-spin" />;
            case "completed": return <FaCheckCircle />;
            default: return null;
        }
    };

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

            {/* Filter Tabs */}
            <div className="tabs tabs-boxed bg-base-100/50 backdrop-blur-md p-1 rounded-2xl inline-block mb-8 shadow-sm">
                {["all", "pending", "in-progress", "completed"].map((tab) => (
                    <a
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`tab tab-lg rounded-xl transition-all duration-300 ${filter === tab ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </a>
                ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredAssignments.map((assignment) => (
                        <motion.div
                            layout
                            key={assignment._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card bg-base-100/60 backdrop-blur-md shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                        >
                            <figure className="relative h-48 overflow-hidden">
                                <img
                                    src={assignment.image}
                                    alt={assignment.serviceName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4">
                                    <div className={`badge ${getStatusColor(assignment.status)} gap-2 p-3 font-semibold shadow-md`}>
                                        {getStatusIcon(assignment.status)}
                                        {assignment.status.toUpperCase()}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <h3 className="text-white font-bold text-lg drop-shadow-md truncate">
                                        {assignment.serviceName}
                                    </h3>
                                </div>
                            </figure>

                            <div className="card-body p-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-base-content/70">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <FaUser className="text-xs" />
                                        </div>
                                        <span className="font-medium">{assignment.clientName}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-base-content/70">
                                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                            <FaMapMarkerAlt className="text-xs" />
                                        </div>
                                        <span className="text-sm truncate">{assignment.address}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-base-content/70">
                                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            <FaCalendarAlt className="text-xs" />
                                        </div>
                                        <span className="text-sm">
                                            {new Date(assignment.serviceDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>

                                <div className="divider my-4"></div>

                                <div className="card-actions justify-between items-center">
                                    <div className="text-lg font-bold text-primary">
                                        ${assignment.price}
                                    </div>
                                    <button className="btn btn-sm btn-primary rounded-xl px-6">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredAssignments.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <h3 className="text-2xl font-bold">No assignments found</h3>
                    <p>Try changing the filter or relax!</p>
                </div>
            )}
        </div>
    );
};

export default ApproveService;
