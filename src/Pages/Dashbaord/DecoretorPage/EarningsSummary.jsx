import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaUsers, FaCalendarAlt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RoundedLoader from "../../../Component/Spiners/RoundedLoader";
import NotFound from "../../NotFound";

const EarningsSummary = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["completedBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator-earnings/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <RoundedLoader/>;
  if (isError) return <NotFound/> ;

  // Total earnings
  const totalEarnings = bookings.reduce(
    (sum, b) => sum + (parseFloat(b.decoratorCost) || 0),
    0
  );

  // Monthly earnings
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyEarnings = bookings
    .filter((b) => {
      const bookingDate = new Date(b.completedAt);
      return (
        bookingDate.getMonth() === currentMonth &&
        bookingDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, b) => sum + (parseFloat(b.decoratorCost) || 0), 0);

  // Unique customers
  const uniqueCustomers = [...new Set(bookings.map((b) => b.userEmail))].length;

  // Chart Data Preparation (Grouped by Month)
  const monthlyStats = bookings.reduce((acc, item) => {
    const date = new Date(item.completedAt);
    const month = date.toLocaleString("default", { month: "short" }); // e.g., "Jan", "Feb"

    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += parseFloat(item.decoratorCost) || 0;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyStats).map((key) => ({
    name: key,
    earnings: monthlyStats[key],
  }));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Earnings Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stat bg-primary/10 rounded-2xl shadow-sm border border-primary/20">
          <div className="stat-figure text-primary text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title font-semibold text-gray-600">Total Earnings</div>
          <div className="stat-value text-primary">${totalEarnings.toFixed(2)}</div>
          <div className="stat-desc">All time earnings</div>
        </div>

        <div className="stat bg-secondary/10 rounded-2xl shadow-sm border border-secondary/20">
          <div className="stat-figure text-secondary text-3xl">
            <FaCalendarAlt />
          </div>
          <div className="stat-title font-semibold text-gray-600">Monthly Earnings</div>
          <div className="stat-value text-secondary">${monthlyEarnings.toFixed(2)}</div>
          <div className="stat-desc">For this month</div>
        </div>

        <div className="stat bg-accent/10 rounded-2xl shadow-sm border border-accent/20">
          <div className="stat-figure text-accent text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title font-semibold text-gray-600">Unique Customers</div>
          <div className="stat-value text-accent">{uniqueCustomers}</div>
          <div className="stat-desc">Distinct clients served</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-10 bg-base-100 p-6 rounded-2xl shadow-md border border-base-200">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-700">Earnings Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" fill="#8884d8" barSize={30} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-700">Recent Transactions</h3>
        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-md border border-base-200">
          <table className="table w-full">
            <thead className="bg-base-200 text-gray-600">
              <tr>
                <th>Service Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-base-50">
                  <td className="font-semibold">{b.serviceName}</td>
                  <td className="text-sm text-gray-500">
                    {new Date(b.completedAt).toLocaleDateString()}
                  </td>
                  <td className="text-success font-bold">
                    +${parseFloat(b.decoratorCost).toFixed(2)}
                  </td>
                  <td>
                    <span className="badge badge-success badge-sm text-white">Completed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;
