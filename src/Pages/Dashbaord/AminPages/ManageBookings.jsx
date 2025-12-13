import React, { useState, useEffect } from "react";
import { MdOutlineAddCircle, MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineDelete, MdOutlineDetails, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AssignDecoratorModal from "../../Modals/AssignDecoratorModal";
import ServiceEditModal from "../../Modals/ServiceEditModal";
import LoaderWithLogo from "../../../Component/Spiners/LoaderWithLogo";
import Swal from "sweetalert2";

const ManageBookings = () => {
    const [searchText, setSearchText] = useState("");
    const axiosSecure = useAxiosSecure();

    // Robust data fetching
    const { data: responseData = [], isLoading, error, refetch } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payments");
            return res.data;
        },
    });

    const payments = Array.isArray(responseData)
        ? responseData
        : responseData?.data || [];

    console.log(payments);
    const [filterCategory, setFilterCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

    const filteredPayments = payments
        .filter((payment) => {
            const searchLower = searchText.toLowerCase();
            const nameMatch = payment.serviceName?.toLowerCase().includes(searchLower) || "";
            const emailMatch = payment.userEmail?.toLowerCase().includes(searchLower) || "";
            // Note: adjust category filtering based on actual booking data structure
            // const categoryMatch = filterCategory ? booking.service_category === filterCategory : true;
            return (nameMatch || emailMatch);
        })
        .sort((a, b) => {
            if (!sortOrder) return 0;
            const dateA = new Date(a.date || 0); // Adjust 'date' to actual field if needed
            const dateB = new Date(b.date || 0);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

    // Calculate pagination based on filtered results
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1);

    }, [searchText, filterCategory, sortOrder]);

    // ===== handle handleShowDetails===
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // ============== servicr Details Modal =============
    const handleShowDetails = (payment) => {
        setSelectedBooking(payment);
        setIsModalOpen(true);
    };
    // =========service edit modal========
    const handleShowEdit = (payment) => {
        setSelectedBooking(payment);
        setIsEditModalOpen(true);
    };
    // ========= handle delete service========
    const handleDeleteBooking = (id) => {
        Swal.fire({
            title: "Delete Booking?",
            text: "Are you sure you want to delete this booking? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Booking has been deleted.",
                            icon: "success",
                        });
                        refetch();
                    }
                });
            }
        });
    };
    // ====== close modal ======
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedBooking(null), 300);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setTimeout(() => setSelectedBooking(null), 300);
    };

    if (isLoading) {
        return <LoaderWithLogo />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-error text-6xl">⚠️</div>
                <h2 className="text-2xl font-bold text-error">Error Loading Bookings</h2>
                <p className="text-base-content/70">
                    {error?.message || "Something went wrong"}
                </p>
                <button onClick={() => refetch()} className="btn btn-primary">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="px-20  ">
            <header className="bg-primary/10 mb-10 rounded-2xl p-10 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-10">Manage Bookings and Assign Decorator ({filteredPayments.length}) </h1>

                <section className="flex flex-col lg:flex-row justify-between items-center gap-4">

                    {/* Search & Filters Group */}
                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        {/* Search Input */}
                        <label className="input rounded-2xl flex items-center gap-2 w-full md:w-auto">
                            <input
                                onChange={(e) => setSearchText(e.target.value)}
                                type="search"
                                className="grow"
                                placeholder="Search by name or email"
                            />
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                        </label>

                        {/* Category Filter */}
                        <select
                            className="select select-bordered w-full md:w-auto rounded-2xl"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="home">🏠 Home</option>
                            <option value="wedding">💒 Wedding</option>
                            <option value="office">🏢 Office</option>
                            <option value="seminar">🎓 Seminar</option>
                            <option value="party">🎉 Party</option>
                        </select>

                        {/* Sort Order */}
                        <select
                            className="select select-bordered w-full md:w-auto rounded-2xl"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Sort by Date</option>
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </section>
            </header>

            {/* tableshaow all dervices */}
            <main className="overflow-x-auto bg-primary/10 rounded-2xl text-center pb-5">
                <table className="table table-zebra mb-10">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Service Name</th>
                            <th>Customer Email</th>
                            <th>Amount</th>
                            <th>Transaction IDs</th>
                            <th>Payment Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {currentPayments.map((payment, index) => (
                            <tr key={payment._id}  >
                                <th>{indexOfFirstItem + index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={payment.serviceImage} alt={payment.serviceName} />
                                        </div>
                                    </div>
                                </td>
                                <td>{payment.serviceName}</td>
                                <td>{payment.customerEmail}</td>
                                <td>${payment.amount}</td>
                                <td>
                                    <div className="flex flex-col text-xs">
                                        <span className="font-semibold" title="Tracking ID">Trx: {payment.transactionalId}</span>
                                        <span className="opacity-70" title="Transactional ID">Track: {payment.trackingId}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={`badge ${payment.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                        {payment.paymentStatus}
                                    </div>
                                </td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleDateString()}
                                </td>
                                <td className="flex gap-2 flex-wrap justify-center">
                                    <button className="btn btn-primary btn-sm text-wrap" onClick={() => handleShowDetails(payment)}>
                                        <MdOutlineDetails />Assign Decorator
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-center gap-2 mt-5">
                    <button
                        className="btn btn-sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <MdOutlineArrowBack />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`btn btn-sm ${currentPage === i + 1 ? "btn-active btn-primary" : ""}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <MdOutlineArrowForward />
                    </button>
                </div>

            </main>

            {/* assign decorator Details Modal */}
            <AssignDecoratorModal
                isOpen={isModalOpen}
                booking={selectedBooking}
                onClose={handleCloseModal}
                refetch={refetch}
            />
        </div>
    );
};

export default ManageBookings;
