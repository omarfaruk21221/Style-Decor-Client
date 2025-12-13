import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUserTie } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoaderWithLogo from "../../Component/Spiners/LoaderWithLogo";
import { toast } from 'react-toastify';

const AssignDecoratorModal = ({ isOpen, onClose, booking, refetch }) => {
    const axiosSecure = useAxiosSecure();

    // Fetch potential decorators (users with role 'decorator')
    const { data: decorators = [], isLoading } = useQuery({
        queryKey: ['users'],
        enabled: isOpen, // Only fetch when modal is open
        queryFn: async () => {
            const res = await axiosSecure.get('/users/active-decorators');
            return res.data;
        }
    });




    const [isAssigning, setIsAssigning] = useState(false);

    const handleAssign = async (decorator) => {
        setIsAssigning(true);
        try {
            const updateData = {
                decoratorId: decorator._id,
                decoratorName: decorator.name,
                decoratorEmail: decorator.email,
                deliveryStatus: 'assigned'
            };

            const res = await axiosSecure.patch(`/bookings/${booking._id}`, updateData);

            if (res.data.modifiedCount > 0) {
                toast.success(`Assigned ${decorator.name} to this booking!`);
                refetch();
                onClose();
            }
        } catch (error) {
            console.error("Failed to assign decorator:", error);
            toast.error("Failed to assign decorator. Please try again.");
        } finally {
            setIsAssigning(false);
        }
    };

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
                        className="relative w-full max-w-3xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-6 flex justify-between items-center border-b border-base-200">
                            <div>
                                <h3 className="text-2xl font-bold flex items-center gap-2">
                                    <FaUserTie className="text-primary" />
                                    Assign Decorator
                                </h3>
                                <p className="text-base-content/60 text-sm mt-1">
                                    Select a decorator for <strong>{booking?.serviceName}</strong>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-base-200 rounded-full transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            {isLoading ? (
                                <LoaderWithLogo />
                            ) : decorators.length === 0 ? (
                                <div className="text-center py-10 text-base-content/60">
                                    <p>No active decorators found.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra w-full">
                                        <thead>
                                            <tr>
                                                <th>Decorator</th>
                                                <th>Email</th>
                                                <th className="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {decorators.map(decorator => (
                                                <tr key={decorator._id}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-10 h-10">
                                                                    <img src={decorator.image || "https://i.ibb.co/84hPCXq/user.png"} alt={decorator.name} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{decorator.name}</div>
                                                                <div className="text-xs opacity-50">Active</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{decorator.email}</td>
                                                    <td className="text-right">
                                                        <button
                                                            onClick={() => handleAssign(decorator)}
                                                            disabled={isAssigning}
                                                            className="btn btn-primary btn-sm disabled:bg-gray-400"
                                                        >
                                                            {isAssigning ? 'Assigning...' : 'Assign'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AssignDecoratorModal;
