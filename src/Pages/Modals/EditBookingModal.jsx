import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const EditBookingModal = ({ isOpen, onClose, booking, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill form when booking data changes and modal opens
    useEffect(() => {
        if (booking && isOpen) {
            setValue('serviceDate', booking.serviceDate ? new Date(booking.serviceDate).toISOString().split('T')[0] : '');
            setValue('address', booking.address);
            setValue('instructions', booking.instructions || '');
        }
    }, [booking, isOpen, setValue]);

    const handleUpdateBooking = async (data) => {
        const updateData = {};

        // Compare and add only changed fields
        const originalDate = booking.serviceDate ? new Date(booking.serviceDate).toISOString().split('T')[0] : '';
        if (data.serviceDate !== originalDate) {
            updateData.serviceDate = data.serviceDate;
        }

        if (data.address !== booking.address) {
            updateData.address = data.address;
        }

        const originalInstructions = booking.instructions || "";
        const newInstructions = data.instructions || "";
        if (newInstructions !== originalInstructions) {
            updateData.instructions = newInstructions;
        }

        if (Object.keys(updateData).length === 0) {
            toast.info("No changes made to the booking.");
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await axiosSecure.patch(`/bookings/${booking._id}`, updateData);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Booking details updated successfully.',
                    icon: 'success',
                    didOpen: () => {
                        const container = Swal.getContainer();
                        if (container) container.style.zIndex = '20000';
                    }
                });
                refetch(); // Refresh list
                onClose();
            } else {
                toast.info("No changes made to the booking.");
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error(error.response?.data?.message || "Failed to update booking.");
        } finally {
            setIsSubmitting(false);
        }
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
                        <div className="bg-gradient-to-r from-info to-primary p-6 text-white relative">
                            <button
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="absolute top-4 right-4 p-2 bg-base-100/20 hover:bg-base-100/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaTimes />
                            </button>
                            <h2 className="text-2xl font-bold">Edit Booking</h2>
                            <p className="active:opacity-80 text-sm mt-1 opacity-90">Update your booking details</p>
                        </div>

                        {/* Form */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            {/* Service Summary */}
                            <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-xl border border-base-300">
                                <img
                                    src={booking?.serviceImage}
                                    alt={booking?.serviceName}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-base-content">{booking?.serviceName}</h3>
                                    <p className="text-primary font-bold">৳ {booking?.price}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(handleUpdateBooking)} className="space-y-4">
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
                                        className="btn btn-info px-8 text-white min-w-[160px]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Booking"
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

export default EditBookingModal;
