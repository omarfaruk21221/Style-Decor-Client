import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaIdBadge, FaEdit, FaCamera, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";

const ProfilePage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-infinity loading-lg text-primary"></span>
            </div>
        );
    }

    // Determine role color/badge style
    const roleConfig = {
        admin: { color: "bg-rose-500 text-white shadow-rose-500/50", icon: <FaShieldAlt className="mr-2" /> },
        decorator: { color: "bg-amber-500 text-white shadow-amber-500/50", icon: <FaIdBadge className="mr-2" /> },
        user: { color: "bg-blue-500 text-white shadow-blue-500/50", icon: <FaUser className="mr-2" /> },
    };
    const roleStyle = roleConfig[profile?.role] || roleConfig.user;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 transition-colors duration-300 font-sans">
            {/* Cover Section */}
            <div className="relative h-72 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600">
                    <h1 className="text-3xl text-center pt-10 md:text-5xl font-extrabold text-secondary/70 bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">My Profile</h1>
                </div>
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl mix-blend-overlay"
                />

            </div>

            {/* Profile Content Container */}
            <div className="container mx-auto px-4 relative -mt-32 z-10 max-w-5xl">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm dark:bg-opacity-95 border border-white/20 dark:border-gray-700"
                >
                    {/* Header: Avatar, Name, Role */}
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between p-8 pb-6 gap-6 relative">
                        {/* Avatar Group */}
                        <div className="relative group">
                            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-white dark:bg-gray-800 shadow-xl ring-4 ring-white/50 dark:ring-gray-700/50">
                                <img
                                    src={profile?.image || user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                                {/* Active Status Dot */}
                                <span className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full shadow-sm" title="Active"></span>
                            </div>
                            {/* Hover Edit Action */}
                            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                <FaCamera className="text-white text-3xl drop-shadow-md" />
                            </div>
                        </div>

                        {/* Title & Badge */}
                        <div className="flex-1 text-center md:text-left mb-2 md:mb-4 w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-4">
                                <div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                                        {profile?.name || user?.displayName}
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center justify-center md:justify-start gap-2 text-lg font-medium">
                                        <FaEnvelope className="text-indigo-500" />
                                        {profile?.email || user?.email}
                                    </p>
                                </div>
                                <div className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center uppercase tracking-wide transform hover:scale-105 transition-transform duration-200 ${roleStyle.color}`}>
                                    {roleStyle.icon}
                                    {profile?.role || "USER"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation/Tabs (Visual only) */}
                    <div className="px-8 border-b border-gray-100 dark:border-gray-700 flex gap-8 overflow-x-auto">
                        <button className="pb-4 border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold whitespace-nowrap">Overview</button>
                        <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors whitespace-nowrap">Settings</button>
                        <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors whitespace-nowrap">Security</button>
                    </div>

                    {/* Details Grid */}
                    <div className="p-8 bg-gray-50/50 dark:bg-gray-800/50 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white dark:bg-gray-700/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                    Personal Information
                                </h3>
                                <button className="btn btn-circle btn-ghost btn-sm text-gray-400 hover:text-indigo-500">
                                    <FaEdit />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div className="group">
                                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</span>
                                    <div className="font-medium text-gray-700 dark:text-gray-200 text-lg group-hover:text-indigo-600 transition-colors">
                                        {profile?.name || user?.displayName || "Not Set"}
                                    </div>
                                </div>
                                <div className="group">
                                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</span>
                                    <div className="font-medium text-gray-700 dark:text-gray-200 text-lg group-hover:text-indigo-600 transition-colors">
                                        {profile?.email || user?.email}
                                    </div>
                                </div>
                                <div className="group">
                                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">User Identifier</span>
                                    <div className="font-mono text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg break-all border border-gray-200 dark:border-gray-700">
                                        {profile?._id || user?.uid || "N/A"}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Account Statistics / Status */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white dark:bg-gray-700/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
                                <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                Account Status
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-indigo-50 dark:bg-gray-800 p-4 rounded-xl text-center border border-indigo-100 dark:border-gray-700">
                                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Active</div>
                                    <div className="text-xs text-gray-500 font-semibold uppercase mt-1">Current Status</div>
                                </div>
                                <div className="bg-pink-50 dark:bg-gray-800 p-4 rounded-xl text-center border border-pink-100 dark:border-gray-700">
                                    <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                                        {profile?.role === 'admin' ? 'Lvl 99' : profile?.role === 'seller' ? 'Lvl 10' : 'Lvl 1'}
                                    </div>
                                    <div className="text-xs text-gray-500 font-semibold uppercase mt-1">Access Level</div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <span>Member Since:</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                                        {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl mt-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span>Last Login:</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                                        {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'Just now'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;