import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaLayerGroup, FaTags, FaPhoneAlt } from "react-icons/fa";

const STOCK_IMAGES = [
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop",
];

const ServiceModal = ({ isOpen, onClose, service }) => {

    const {
        service_name = "Untitled Service",
        image,
        description = "No description available.",
        service_category = "General",
        cost = 0,
        included_items = [],
        createdByName = "Service Provider",
        createdByPhoto,
        createdAt
    } = service || {};

    const features = Array.isArray(included_items) ? included_items : [];
    const finalImage = image || STOCK_IMAGES[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Modal Header with Background Image */}
                        <div className="relative h-40 sm:h-56 bg-slate-900 flex items-center justify-center shrink-0 overflow-hidden">
                            <img
                                src={finalImage}
                                alt={service_name}
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 border border-white/20"
                            >
                                <FaTimes className="text-xl" />
                            </button>

                            {/* Title Section */}
                            <div className="relative z-10 text-center px-6 text-white w-full">
                                <div className="badge badge-secondary mb-3 uppercase font-bold tracking-wider shadow-lg">
                                    {service_category}
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black mb-2 shadow-sm drop-shadow-md">
                                    {service_name}
                                </h2>
                                <p className="text-2xl font-bold text-primary-content">৳ {cost}</p>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="p-8 overflow-y-auto custom-scrollbar bg-base-100 h-full">
                            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                                {/* Left Column: Description & Features */}
                                <div className="md:col-span-2 space-y-8">
                                    {/* Overview Section */}
                                    <div>
                                        <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-primary rounded-full" />
                                            Overview
                                        </h3>
                                        <p className="text-base-content/70 leading-relaxed text-lg text-justify">
                                            {description}
                                        </p>
                                    </div>

                                    {/* Features Section */}
                                    {features.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                                                <span className="w-1 h-6 bg-secondary rounded-full" />
                                                What's Included
                                            </h3>
                                            <ul className="grid sm:grid-cols-2 gap-3">
                                                {features.map((feature, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-2 text-base-content/80"
                                                    >
                                                        <span className="text-primary mt-1">✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {/* Action Buttons */}
                                    <div className="pt-4 border-t border-base-200">
                                        <button className="w-full py-3 bg-primary hover:bg-primary-focus text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/40 hover:-translate-y-1">
                                            <FaPhoneAlt /> Book Now
                                        </button>
                                    </div>
                                </div>

                                {/* Right Column: Meta Information */}
                                <div className="space-y-8">
                                    {/* Service Info Box */}
                                    <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200">
                                        <h4 className="font-bold text-base-content mb-4">
                                            Service Details
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-base-content/70">
                                                <FaLayerGroup className="text-primary" />
                                                <span className="capitalize font-medium">{service_category}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-base-content/70">
                                                <FaTags className="text-primary" />
                                                <span className="font-medium">৳ {cost}</span>
                                            </div>
                                            {createdAt && (
                                                <div className="flex items-center gap-3 text-base-content/70">
                                                    <FaCalendarAlt className="text-primary" />
                                                    <span className="font-medium">{new Date(createdAt).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Provider Info */}
                                    <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200">
                                        <h4 className="font-bold text-base-content mb-4">
                                            Provider Info
                                        </h4>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={createdByPhoto || "https://i.ibb.co/84hPCXq/user.png"} alt={createdByName} />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-base-content">{createdByName}</p>
                                                <p className="text-xs text-base-content/60">Verified Provider</p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
