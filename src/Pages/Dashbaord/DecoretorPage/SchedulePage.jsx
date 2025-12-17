import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaCalendarCheck,
    FaClock,
    FaMapMarkerAlt,
    FaVideo,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import RoundedLoader from "../../../Component/Spiners/RoundedLoader";
import NotFound from "../../NotFound";

const SchedulePage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: bookings = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["completedBookings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/bookings/decorator-earnings/${user?.email}`
            );
            return res.data;
        },
    });
    console.log("schedule page", bookings)
    if (isLoading) return <RoundedLoader />;
    if (isError) return <NotFound />;

    // Generate days based on bookings
    const days = React.useMemo(() => {
        const uniqueDateStrings = new Set();
        const uniqueDays = [];

        bookings.forEach((booking) => {
            const dateVal = booking.serviceDate || booking.completedAt || booking.paidAt;
            if (dateVal) {
                const date = new Date(dateVal);
                const dateStr = date.toDateString();
                if (!uniqueDateStrings.has(dateStr)) {
                    uniqueDateStrings.add(dateStr);
                    uniqueDays.push(date);
                }
            }
        });

        // Sort days chronologically
        return uniqueDays.sort((a, b) => a - b);
    }, [bookings]);

    // Update selected date when bookings load
    React.useEffect(() => {
        if (days.length > 0) {
            // If the currently selected date is not in the list, switch to the first available day
            const isSelectedInDays = days.some(
                (d) => d.toDateString() === selectedDate.toDateString()
            );
            if (!isSelectedInDays) {
                setSelectedDate(days[0]);
            }
        }
    }, [days, selectedDate]);

    const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();

    // Filter and map bookings to task structure
    const currentTasks = bookings
        .filter((booking) => {
            const bookingDate = new Date(booking.serviceDate || booking.completedAt || booking.paidAt);
            return isSameDay(bookingDate, selectedDate);
        })
        .map((booking) => ({
            id: booking._id,
            title: booking.serviceName,
            time: new Date(booking.serviceDate || booking.completedAt || booking.paidAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            duration: "1h", // Default duration as it might not be in the booking object
            type: "on-site",
            location: booking.address || "Client Address",
            client: booking.userName || booking.userEmail || "Valued Client",
        }));

    return (
        <div className="p-6 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                    My Schedule
                </h1>
                <p className="text-base-content/60">Plan your day effectively.</p>
            </motion.div>
            <span className="divider"></span>

            {/* Today's Tasks Section */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                    <FaCalendarCheck /> Today's Tasks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.filter(booking => {
                        const bookingDate = new Date(booking.serviceDate || booking.completedAt || booking.paidAt);
                        return bookingDate.toDateString() === new Date().toDateString();
                    }).length > 0 ? (
                        bookings.filter(booking => {
                            const bookingDate = new Date(booking.serviceDate || booking.completedAt || booking.paidAt);
                            return bookingDate.toDateString() === new Date().toDateString();
                        }).map((task) => (
                            <motion.div
                                key={task._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-5 border border-primary/10 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-lg text-base-content">{task.serviceName}</h4>
                                    <span className="badge badge-primary py-3">Today</span>
                                </div>
                                <div className="space-y-2 text-sm text-base-content/70">
                                    <p className="flex items-center gap-2"><FaClock className="text-secondary" /> {new Date(task.serviceDate || task.completedAt || task.paidAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-accent" /> {task.address || "Client Address"}</p>
                                    <div className="pt-3 flex items-center gap-2 border-t border-base-200">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-6">
                                                <span className="text-xs">{(task.userName || task.userEmail || "C").charAt(0)}</span>
                                            </div>
                                        </div>
                                        <span className="font-medium">{task.userName || task.userEmail || "Client"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full p-8 bg-base-200/30 rounded-2xl text-center border-2 border-dashed border-base-300">
                            <p className="text-base-content/50">No tasks scheduled for today. Take a rest! ☕</p>
                        </div>
                    )}
                </div>
            </div>

            <span className="divider"></span>

            {/* Tasks Grid (Weekly/All Schedule) */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-base-content/80">Upcoming & Past Schedule</h2>
                {days.length > 0 ? (
                    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                        {days.map((day, index) => {
                            // Find tasks for this specific day
                            const dayTasks = bookings.map(booking => {
                                const bookingDate = new Date(booking.serviceDate || booking.completedAt || booking.paidAt);
                                // Format task time
                                return {
                                    ...booking,
                                    taskDate: bookingDate,
                                    id: booking._id,
                                    title: booking.serviceName,
                                    time: bookingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                                    client: booking.userName || booking.userEmail || "Client"
                                };
                            }).filter(task => task.taskDate.toDateString() === day.toDateString());

                            return (
                                <div key={index} className="min-w-[320px] bg-base-100/50 rounded-2xl p-4 border border-base-200 shadow-sm flex flex-col h-full">
                                    <h4 className="font-bold text-lg mb-4 text-center border-b pb-2 border-base-200">
                                        {day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                    </h4>

                                    <div className="space-y-4 flex-1">
                                        {dayTasks.map((task) => (
                                            <motion.div
                                                key={task.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-secondary relative overflow-hidden group hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-md line-clamp-1" title={task.title}>{task.title}</span>
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                                                        {task.time}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs text-base-content/70 mb-2">
                                                    <FaClock className="text-secondary" /> 1h
                                                    <span className="text-base-content/20">|</span>
                                                    <FaMapMarkerAlt className="text-accent" /> {task.address || "On-site"}
                                                </div>

                                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                                    <div className="avatar placeholder">
                                                        <div className="bg-neutral text-neutral-content rounded-full w-6">
                                                            <span className="text-xs">{task.client.charAt(0)}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-semibold opacity-80 truncate max-w-[150px]">
                                                        {task.client}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-base-100/30 rounded-3xl border-2 border-dashed border-base-300">
                        <div className="text-4xl mb-4 opacity-30">☕</div>
                        <h4 className="font-bold text-lg opacity-60">No tasks found</h4>
                        <p className="text-sm opacity-50">You are all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchedulePage;
