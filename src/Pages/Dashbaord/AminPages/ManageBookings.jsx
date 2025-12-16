import React, { useState, useEffect } from "react";
import { MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineDetails } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AssignDecoratorModal from "../../Modals/AssignDecoratorModal";
import LoaderWithLogo from "../../../Component/Spiners/LoaderWithLogo";
import Swal from "sweetalert2";

const ManageBookings = ({ user }) => {
    const [searchText, setSearchText] = useState("");
    const axiosSecure = useAxiosSecure();

    const [filterCategory, setFilterCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

    // selected booking for modal
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ===== fetch paid bookings from backend =====
    const { data: bookingsData = [], isLoading, error, refetch } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings", {
                params: {
                    paymentStatus: "paid",
                    deliveryStatus: true,
                },
            });
            return res.data;
        },
    });

    // ===== filter & sort on frontend =====
    const filteredBookings = bookingsData
        .filter((booking) => {
            const searchLower = searchText.toLowerCase();
            const nameMatch = booking.serviceName?.toLowerCase().includes(searchLower) || "";
            const emailMatch = booking.userEmail?.toLowerCase().includes(searchLower) || "";
            const categoryMatch = filterCategory ? booking.service_category === filterCategory : true;
            const isNotAssigned = booking.deliveryStatus !== 'assigned';
            return (nameMatch || emailMatch) && categoryMatch && isNotAssigned;
        })
        .sort((a, b) => {
            if (!sortOrder) return 0;
            const dateA = new Date(a.paidAt || 0);
            const dateB = new Date(b.paidAt || 0);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

    // pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1); // reset page on filter/search change
    }, [searchText, filterCategory, sortOrder]);

    // ===== modal handlers =====
    const handleShowDetails = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedBooking(null), 300);
    };

    if (isLoading) return <LoaderWithLogo />;
    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="text-error text-6xl">⚠️</div>
            <h2 className="text-2xl font-bold text-error">Error Loading Bookings</h2>
            <p className="text-base-content/70">{error?.message || "Something went wrong"}</p>
            <button onClick={() => refetch()} className="btn btn-primary">Try Again</button>
        </div>
    );

    return (
        <div className="px-20">
            <header className="bg-primary/10 mb-10 rounded-2xl p-10 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-10">
                    Manage Bookings and Assign Decorator ({filteredBookings.length})
                </h1>

                <section className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        <label className="input rounded-2xl flex items-center gap-2 w-full md:w-auto">
                            <input
                                type="search"
                                className="grow"
                                placeholder="Search by service name or email"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </label>

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

            <main className="overflow-x-auto bg-primary/10 rounded-2xl text-center pb-5">
                <table className="table table-zebra mb-10">
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
                        {currentBookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <th>{indexOfFirstItem + index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={booking.serviceImage} alt={booking.serviceName} />
                                        </div>
                                    </div>
                                </td>
                                <td>{booking.serviceName}</td>
                                <td>{booking.userEmail}</td>
                                <td>${booking.amount}</td>
                                <td>
                                    <div className="flex flex-col text-xs">
                                        <span className="font-semibold" title="Tracking ID">Trx: {booking.transactionalId}</span>
                                        <span className="opacity-70" title="Tracking ID">Track: {booking.trackingId}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                        {booking.paymentStatus}
                                    </div>
                                </td>
                                <td>{new Date(booking.paidAt).toLocaleDateString()}</td>
                                <td className="flex gap-2 flex-wrap justify-center">
                                    <button
                                        className="btn btn-primary btn-sm text-wrap"
                                        onClick={() => handleShowDetails(booking)}
                                    >
                                        <MdOutlineDetails /> Assign Decorator
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
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

            {/* Assign Decorator Modal */}
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
