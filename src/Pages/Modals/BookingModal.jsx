import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope, FaDollarSign } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const BookingModal = ({ isOpen, onClose, service }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    const handleBookingSubmit = async (data) => {
        if (!user) {
            toast.error("Please login to book a service");
            return;
        }

        const bookingData = {
            serviceId: service._id,
            serviceName: service.service_name,
            serviceImage: service.image,
            providerEmail: service.userEmail,
            userId: user._id,
            userEmail: user.email,
            userName: user.displayName,
            serviceDate: data.serviceDate,
            address: data.address,
            price: service.cost,
            status: 'pending',
            paymentStatus: 'unpaid',
            bookingDate: new Date().toISOString(),
            instructions: data.instructions || ""
        };

        Swal.fire({
            title: 'Confirm Booking?',
            text: `You are about to book "${service.service_name}" for ৳${service.cost}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Confirm it!',
            didOpen: () => {
                const container = Swal.getContainer();
                if (container) container.style.zIndex = '20000';
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsSubmitting(true);
                    const res = await axiosSecure.post('/bookings', bookingData);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: 'Booked!',
                            text: 'Your service has been booked successfully.',
                            icon: 'success',
                            didOpen: () => {
                                const container = Swal.getContainer();
                                if (container) container.style.zIndex = '20000';
                            }
                        });
                        setIsBooking(true);
                        reset();
                        onClose();
                    }
                } catch (error) {
                    console.error("Booking Error:", error);
                    const errorMessage = error.response?.data?.message || "Failed to book service. Please try again.";
                    toast.error(errorMessage);
                    Swal.fire({
                        title: 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        didOpen: () => {
                            const container = Swal.getContainer();
                            if (container) container.style.zIndex = '20000';
                        }
                    });
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isSubmitting ? onClose : undefined}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative">
                            <button
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="absolute top-4 right-4 p-2 bg-base-100/20 hover:bg-base-100/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaTimes />
                            </button>
                            <h2 className="text-2xl font-bold">Book Service</h2>
                            <p className="active:opacity-80 text-sm mt-1 opacity-90">Complete the form to request this service</p>
                        </div>

                        {/* Form */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            {/* Service Summary */}
                            <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-xl border border-base-300">
                                <img
                                    src={service?.image}
                                    alt={service?.service_name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-base-content">{service?.service_name}</h3>
                                    <p className="text-primary font-bold">৳ {service?.cost}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(handleBookingSubmit)} className="space-y-4">
                                {/* Read-only User Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium flex items-center gap-2"><FaUser className="text-base-content/50" /> Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={user?.displayName || ''}
                                            readOnly
                                            className="input input-bordered bg-base-200 text-base-content/60 cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium flex items-center gap-2"><FaEnvelope className="text-base-content/50" /> Email</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={user?.email || ''}
                                            readOnly
                                            className="input input-bordered bg-base-200 text-base-content/60 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Booking Inputs */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-2 text-primary"><FaCalendarAlt /> Service Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        {...register("serviceDate", { required: "Date is required" })}
                                        className="input input-bordered focus:input-primary w-full"
                                        disabled={isSubmitting}
                                    />
                                    {errors.serviceDate && <span className="text-error text-xs mt-1">{errors.serviceDate.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-2 text-primary"><FaMapMarkerAlt /> Service Address</span>
                                    </label>
                                    <textarea
                                        {...register("address", { required: "Address is required" })}
                                        placeholder="Enter your full address"
                                        className="textarea textarea-bordered focus:textarea-primary h-24"
                                        disabled={isSubmitting}
                                    ></textarea>
                                    {errors.address && <span className="text-error text-xs mt-1">{errors.address.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Special Instructions (Optional)</span>
                                    </label>
                                    <textarea
                                        {...register("instructions")}
                                        placeholder="Any specific requirements..."
                                        className="textarea textarea-bordered focus:textarea-primary h-20"
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <div className="modal-action">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="btn btn-ghost"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-8 text-white min-w-[160px]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                                Booking...
                                            </>
                                        ) : (
                                            "Confirm Booking"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
