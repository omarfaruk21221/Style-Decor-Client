import React from "react";
import { motion } from "framer-motion";
import {
    FaDollarSign,
    FaChartLine,
    FaBriefcase,
    FaArrowUp,
    FaWallet,
} from "react-icons/fa";
// Custom SVG Area Chart
const CustomAreaChart = ({ data }) => {
    const height = 300;
    const width = 800;
    const padding = 40;
    const maxVal = Math.max(...data.map(d => d.earnings));

    // Calculate points
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - (d.earnings / maxVal) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    // Create area path (close the loop at bottom)
    const areaPath = `${points} ${width - padding},${height - padding} ${padding},${height - padding}`;

    return (
        <div className="w-full h-full overflow-hidden relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Grid Lines */}
                {[0, 1, 2, 3, 4].map(i => (
                    <line
                        key={i}
                        x1={padding}
                        y1={padding + i * ((height - padding * 2) / 4)}
                        x2={width - padding}
                        y2={padding + i * ((height - padding * 2) / 4)}
                        stroke="currentColor"
                        className="text-base-content/10"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                ))}

                {/* Area */}
                <path d={`M ${areaPath} Z`} fill="url(#gradient)" />

                {/* Line */}
                <polyline points={points} fill="none" stroke="currentColor" className="text-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Points */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
                    const y = height - (d.earnings / maxVal) * (height - padding * 2) - padding;
                    return (
                        <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="currentColor" className="text-primary" strokeWidth="2" />
                    );
                })}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between px-4 mt-[-20px] text-xs text-base-content/60">
                {data.map((d, i) => (
                    <span key={i}>{d.name}</span>
                ))}
            </div>
        </div>
    );
};

// Mock Data for the Chart
const data = [
    { name: "Mon", earnings: 400 },
    { name: "Tue", earnings: 300 },
    { name: "Wed", earnings: 600 },
    { name: "Thu", earnings: 800 },
    { name: "Fri", earnings: 500 },
    { name: "Sat", earnings: 900 },
    { name: "Sun", earnings: 700 },
];

const EarningsSummary = () => {
    return (
        <div className="p-6 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex justify-between items-end"
            >
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                        Earnings Overview
                    </h1>
                    <p className="text-base-content/60">
                        Track your financial growth and performance.
                    </p>
                </div>
                <div className="hidden md:block">
                    <button className="btn btn-primary btn-outline gap-2 rounded-full">
                        <FaWallet /> Withdraw Funds
                    </button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                    {
                        title: "Total Revenue",
                        value: "$12,450",
                        icon: FaDollarSign,
                        color: "text-primary",
                        bg: "bg-primary/10",
                        trend: "+12.5%",
                    },
                    {
                        title: "Monthly Earnings",
                        value: "$3,200",
                        icon: FaChartLine,
                        color: "text-secondary",
                        bg: "bg-secondary/10",
                        trend: "+8.2%",
                    },
                    {
                        title: "Completed Projects",
                        value: "45",
                        icon: FaBriefcase,
                        color: "text-accent",
                        bg: "bg-accent/10",
                        trend: "+5 New",
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-3xl border border-white/5 shadow-xl backdrop-blur-md bg-base-100/60 hover:shadow-2xl transition-all duration-300 group`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-base-content/60 font-medium mb-1">
                                    {item.title}
                                </p>
                                <h3 className="text-3xl font-bold">{item.value}</h3>
                            </div>
                            <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                                <item.icon className="text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm text-success font-semibold">
                            <span className="flex items-center gap-1 bg-success/10 px-2 py-1 rounded-lg">
                                <FaArrowUp /> {item.trend}
                            </span>
                            <span className="text-base-content/40 font-normal">
                                vs last month
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-base-100/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Revenue Analytics</h3>
                        <select className="select select-bordered select-sm rounded-full">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <CustomAreaChart data={data} />
                    </div>
                </motion.div>

                {/* Recent Activity / Mini List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-1 bg-gradient-to-b from-base-100/50 to-primary/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg"
                >
                    <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-base-100/80 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                                    JS
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">John Smith</h4>
                                    <p className="text-xs text-base-content/50">Dec {10 + i}, 2024</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-success">+$250</p>
                                    <p className="text-xs text-info">Completed</p>
                                </div>
                            </div>
                        ))}
                    </div>{" "}
                    <button className="btn btn-ghost btn-sm w-full mt-4 text-primary">
                        View All Transactions
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default EarningsSummary;
