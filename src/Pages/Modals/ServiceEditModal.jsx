import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ServiceEditModal = ({ isOpen, onClose, service, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (service) {
            setValue("service_name", service.service_name);
            setValue("cost", service.cost);
            setValue("service_category", service.service_category);

            const items = Array.isArray(service.included_items)
                ? service.included_items.join(", ")
                : service.included_items;
            setValue("included_items", items);
            setValue("description", service.description);

        }
    }, [service, setValue]);

    // =====================handle update service=====================
    const handleUpdateService = async (data) => {
        setLoading(true);
        try {
            let imageUrl = service.image;

            if (data.image && data.image[0]) {
                const imageFile = data.image[0];

                if (imageFile.size > 5 * 1024 * 1024) {
                    toast.error("Image size must be less than 5MB");
                    setLoading(false);
                    return;
                }

                const formData = new FormData();
                formData.append("image", imageFile);

                // Upload to ImgBB
                const imageResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
                    formData
                );

                if (imageResponse.data.success) {
                    imageUrl = imageResponse.data.data.url;
                } else {
                    toast.error("Image upload failed");
                    setLoading(false);
                    return;
                }
            }


            const updatedServiceData = {
                service_name: data.service_name,
                cost: parseFloat(data.cost),
                service_category: data.service_category,
                included_items: data.included_items,
                description: data.description,
                image: imageUrl,
            };

            const res = await axiosSecure.patch(`/services/${service._id}`, updatedServiceData);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Service has been updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#00b894",
                });
                if (refetch) refetch();
                onClose();
            } else {
                toast.info("No changes made to the service.");
                onClose();
            }

        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to update service. Please try again.");
        } finally {
            setLoading(false);
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-3xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-6 flex justify-between items-center border-b border-primary/10">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Edit Service
                            </h2>
                            <button
                                onClick={onClose}
                                className="btn btn-sm btn-circle btn-ghost text-lg"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Scrollable Form Content */}
                        <div className="overflow-y-auto p-8 custom-scrollbar">
                            <form onSubmit={handleSubmit(handleUpdateService)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Service Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Service Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("service_name", { required: "Name is required" })}
                                        className="input input-bordered w-full rounded-xl focus:outline-primary"
                                        placeholder="e.g. Luxury Wedding"
                                    />
                                    {errors.service_name && <span className="text-error text-xs mt-1">{errors.service_name.message}</span>}
                                </div>

                                {/* Cost */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Cost (BDT)</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register("cost", { required: "Cost is required" })}
                                        className="input input-bordered w-full rounded-xl focus:outline-primary"
                                        placeholder="e.g. 15000"
                                    />
                                    {errors.cost && <span className="text-error text-xs mt-1">{errors.cost.message}</span>}
                                </div>

                                {/* Category */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Category</span>
                                    </label>
                                    <select
                                        {...register("service_category", { required: "Category is required" })}
                                        className="select select-bordered w-full rounded-xl focus:outline-primary"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="home">🏠 Home</option>
                                        <option value="wedding">💒 Wedding</option>
                                        <option value="office">🏢 Office</option>
                                        <option value="seminar">🎓 Seminar</option>
                                        <option value="party">🎉 Party</option>
                                    </select>
                                    {errors.service_category && <span className="text-error text-xs mt-1">{errors.service_category.message}</span>}
                                </div>

                                {/* Included Items */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Included Items</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("included_items", { required: "Required" })}
                                        className="input input-bordered w-full rounded-xl focus:outline-primary"
                                        placeholder="e.g. Flowers, Lights"
                                    />
                                    {errors.included_items && <span className="text-error text-xs mt-1">{errors.included_items.message}</span>}
                                </div>

                                {/* Description */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-medium">Description</span>
                                    </label>
                                    <textarea
                                        {...register("description", { required: "Description is required", minLength: { value: 20, message: "Min 20 chars" } })}
                                        className="textarea textarea-bordered h-24 w-full rounded-xl focus:outline-primary"
                                        placeholder="Detailed description..."
                                    ></textarea>
                                    {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
                                </div>

                                {/* Current Image Preview */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-medium">Service Image</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        {service?.image && (
                                            <div className="avatar">
                                                <div className="w-16 h-16 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={service.image} alt="Current Service" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                {...register("image")}
                                                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                            />
                                            <div className="text-xs text-base-content/60 mt-1">Leave empty to keep current image</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-base-200">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-8"
                                        disabled={loading}
                                    >
                                        {loading ? <span className="loading loading-spinner"></span> : "Update Service"}
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

export default ServiceEditModal;
