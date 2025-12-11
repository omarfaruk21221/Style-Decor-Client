import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaEdit, FaCreditCard, FaTrashAlt } from 'react-icons/fa';
import EditBookingModal from '../../Modals/EditBookingModal';
import Swal from 'sweetalert2';
import RoundedLoader from '../../../Component/Spiners/RoundedLoader';
import FindError from '../../FindError';

const BookServices = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);


    // ====== showing all booking data of user ========
    const { data: bookings = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    // =================  payment handle ============
    const handlePayBooking = (booking) => {

    }

    // =======edit booking ====
    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setIsEditModalOpen(true);
    }

    // ============ cancle Booking =============
    const handleCancelBooking = (booking) => {
        const id = booking._id;
        Swal.fire({
            title: 'Confirm Cencle Booking?',
            text: `You are about to cancel "${booking.serviceName}"`,
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
                    const res = await axiosSecure.delete(`/bookings/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: 'Canceled!',
                            text: 'Your service has been canceled successfully.',
                            icon: 'success',
                            didOpen: () => {
                                const container = Swal.getContainer();
                                if (container) container.style.zIndex = '20000';
                            }
                        });
                        refetch();
                    }
                } catch (error) {
                    console.error("Booking Error:", error);
                    const errorMessage = error.response?.data?.message || "Failed to cancel booking. Please try again.";
                    Swal.fire({
                        title: 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        didOpen: () => {
                            const container = Swal.getContainer();
                            if (container) container.style.zIndex = '20000';
                        }
                    });
                }
            }
        });


    }


    if (isLoading) {
        return (
            <RoundedLoader />
        );
    }

    if (isError) {
        return (
            <FindError />
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">My Bookings</h1>
                <p className="text-base-content/60 mt-2">Manage your booked services and track their status.</p>
            </motion.div>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] bg-base-100 rounded-3xl p-8 text-center border-2 border-dashed border-base-300 shadow-sm">
                    <div className="text-6xl mb-4 opacity-50">📅</div>
                    <h3 className="text-2xl font-bold opacity-70">No Bookings Found</h3>
                    <p className="text-base-content/60 mt-2 max-w-md">You haven't booked any services yet. Explore our services and book your first one!</p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="overflow-x-auto bg-base-100/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20"
                >
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-gradient-to-r from-primary/10 to-secondary/10 text-base-content uppercase text-xs font-extrabold tracking-wider">
                            <tr>
                                <th className="py-5 pl-8">Service</th>
                                <th>Price</th>
                                <th>Schedule</th>
                                <th>Delivary Status</th>
                                <th>Payment Status</th>
                                <th className="pr-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200/50">
                            {bookings.map((booking, index) => (
                                <tr key={booking._id} className="hover:bg-base-200/40 transition-colors duration-300 group">
                                    <td className="pl-8 py-4">
                                        <div className="flex items-center gap-5">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16 bg-base-300 shadow-md group-hover:scale-105 transition-transform">
                                                    <img
                                                        src={booking.serviceImage}
                                                        alt={booking.serviceName}
                                                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">{booking.serviceName}</div>
                                                <div className="text-sm opacity-60 flex items-center gap-1 mt-1">
                                                    <FaMapMarkerAlt className="text-xs text-secondary" />
                                                    {booking.address?.substring(0, 25)}{booking.address?.length > 25 && '...'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1 font-bold text-lg text-primary">
                                            <FaDollarSign className="text-sm" />
                                            {booking.price}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                                <FaCalendarAlt className="text-secondary" />
                                                {new Date(booking.serviceDate).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs opacity-50 font-mono">
                                                Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`badge badge-lg gap-2 font-bold shadow-sm ${booking.status === 'confirmed' ? 'badge-success text-white' :
                                            booking.status === 'completed' ? 'badge-info text-white' :
                                                booking.status === 'pending' ? 'badge-warning text-white' :
                                                    'badge-ghost'
                                            }`}>
                                            {booking.status}
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            booking.paymentStatus === 'paid' ? (
                                                <span className="px-2 text-success font-semibold">Paid</span>
                                            ) : (
                                                <button onClick={() => handlePayBooking(booking)} >
                                                    <span className="btn btn-circle btn-sm btn-ghost text-success bg-success/10 hover:bg-success hover:text-white transition-all tooltip tooltip-left" data-tip="Pay Now">

                                                        <FaCreditCard />                                                    </span>
                                                    <span className="px-2 text-error font-semibold">Pay Now</span>
                                                </button>
                                            )
                                        }


                                    </td>
                                    <td className="pr-8 text-right">
                                        <div className="flex justify-end gap-2">


                                            <button onClick={() => handleEditBooking(booking)} className="btn btn-circle btn-sm btn-ghost text-info bg-info/10 hover:bg-info hover:text-white transition-all tooltip tooltip-left" data-tip="Edit Booking">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleCancelBooking(booking)} className="btn btn-circle btn-sm btn-ghost text-error bg-error/10 hover:bg-error hover:text-white transition-all tooltip tooltip-left" data-tip="Cancel">
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}

            <EditBookingModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                booking={selectedBooking}
                refetch={refetch}
            />
        </div>
    );
};

export default BookServices;