import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaClock, FaMapMarkerAlt, FaVideo, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SchedulePage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Generate next 7 days
    const getDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const days = getDays();

    // Mock Schedule Data mapped by date string
    const scheduleData = {
        [new Date().toDateString()]: [
            { id: 1, title: "Initial Consultation", time: "10:00 AM", duration: "1h", type: "video", client: "Sarah Cone" },
            { id: 2, title: "Project Walkthrough", time: "02:00 PM", duration: "2h", type: "on-site", location: "123 Main St", client: "Mike Ross" }
        ]
    };

    const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();

    const currentTasks = scheduleData[selectedDate.toDateString()] || [];

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
                <p className="text-base-content/60">
                    Plan your day effectively.
                </p>
            </motion.div>

            {/* Date Strip */}
            <div className="bg-base-100/50 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-white/10 mb-8 overflow-x-auto">
                <div className="flex justify-between items-center min-w-max gap-4">
                    {days.map((date, index) => {
                        const isSelected = isSameDay(date, selectedDate);
                        return (
                            <motion.button
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex flex-col items-center justify-center min-w-[80px] p-4 rounded-2xl transition-all duration-300 ${isSelected
                                        ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg scale-105"
                                        : "bg-base-200/50 hover:bg-base-200 text-base-content/70"
                                    }`}
                            >
                                <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                                <span className={`text-2xl font-bold mt-1 ${isSelected ? "text-white" : "text-base-content"}`}>
                                    {date.getDate()}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Tasks List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaCalendarCheck className="text-primary" />
                        Tasks for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>

                    {currentTasks.length > 0 ? (
                        <div className="space-y-4">
                            {currentTasks.map((task, idx) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-base-100 rounded-2xl p-6 shadow-md border-l-4 border-l-primary flex gap-4"
                                >
                                    <div className="flex flex-col items-center justify-center px-4 border-r border-base-200">
                                        <span className="font-bold text-lg">{task.time.split(' ')[0]}</span>
                                        <span className="text-xs text-base-content/60">{task.time.split(' ')[1]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">{task.title}</h4>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-base-content/70">
                                            <span className="flex items-center gap-1">
                                                <FaClock className="text-secondary" /> {task.duration}
                                            </span>
                                            {task.type === 'video' ? (
                                                <span className="flex items-center gap-1 text-info">
                                                    <FaVideo /> Video Call
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-accent">
                                                    <FaMapMarkerAlt /> {task.location}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-6">
                                                    <span className="text-xs">{task.client.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-semibold opacity-70">Client: {task.client}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 bg-base-100/30 rounded-3xl border-2 border-dashed border-base-300">
                            <div className="text-4xl mb-4 opacity-30">☕</div>
                            <h4 className="font-bold text-lg opacity-60">No tasks for this day</h4>
                            <p className="text-sm opacity-50">Enjoy your free time!</p>
                        </div>
                    )}
                </div>

                {/* Side Content: Notes or Upcoming */}
                <div className="hidden lg:block">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-3xl h-full">
                        <h3 className="text-xl font-bold mb-4">Quick Notes</h3>
                        <textarea
                            className="textarea textarea-ghost w-full h-[200px] text-lg placeholder:text-base-content/30 resize-none focus:bg-white/50 transition-colors rounded-xl"
                            placeholder="Jot down important reminders..."
                        ></textarea>
                        <button className="btn btn-primary w-full mt-4 rounded-xl">Save Notes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
