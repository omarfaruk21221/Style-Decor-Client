import { FaDollarSign, FaChartBar, FaClipboardList, FaHandHoldingUsd } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import RoundedLoader from "../../../Component/Spiners/RoundedLoader";
import NotFound from "../../NotFound";

const RevenueMonitoring = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["adminRevenueStats"],
    queryFn: async () => {
      // Fetching all completed bookings for overall revenue monitoring
      const res = await axiosSecure.get(`/bookings`, {
        params: {
          deliveryStatus: "completed",
        },
      });
      return res.data;
    },
  });

  if (isLoading) return <RoundedLoader />;
  if (isError) return <NotFound />;

  // Beginner-friendly calculations
  let totalSell = 0;
  let totalDecoratorCost = 0;
  const serviceDemandMap = {};

  bookings.forEach((b) => {
    totalSell += parseFloat(b.price) || 0;
    totalDecoratorCost += parseFloat(b.decoratorCost) || 0;

    // Count bookings per service name for demand chart
    const sName = b.serviceName || "Unknown Service";
    serviceDemandMap[sName] = (serviceDemandMap[sName] || 0) + 1;
  });

  const totalNetRevenue = totalSell - totalDecoratorCost;

  // Prepare chart data for Service Demand
  const demandChartData = Object.keys(serviceDemandMap).map((key) => ({
    name: key,
    count: serviceDemandMap[key],
  }));

  // Prepare chart data for Revenue Breakdown
  const revenueChartData = [
    { name: "Total Sell", amount: totalSell, color: "#4F46E5" },
    { name: "Decorator Costs", amount: totalDecoratorCost, color: "#F59E0B" },
    { name: "Net Profit", amount: totalNetRevenue, color: "#10B981" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Revenue & Analytics Monitoring
        </h1>
        <p className="text-base-content/60">A comprehensive overview of your financial performance and service demand.</p>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 text-primary mb-3">
            <div className="p-3 bg-primary/10 rounded-2xl"><FaHandHoldingUsd size={24} /></div>
            <h3 className="font-bold text-lg">Total Sell</h3>
          </div>
          <p className="text-3xl font-extrabold text-primary">${totalSell.toLocaleString()}</p>
        </div>

        <div className="bg-warning/5 border border-warning/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 text-warning mb-3">
            <div className="p-3 bg-warning/10 rounded-2xl"><FaClipboardList size={24} /></div>
            <h3 className="font-bold text-lg">Decorator Cost</h3>
          </div>
          <p className="text-3xl font-extrabold text-warning">${totalDecoratorCost.toLocaleString()}</p>
        </div>

        <div className="bg-success/5 border border-success/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 text-success mb-3">
            <div className="p-3 bg-success/10 rounded-2xl"><FaDollarSign size={24} /></div>
            <h3 className="font-bold text-lg">Net Revenue</h3>
          </div>
          <p className="text-3xl font-extrabold text-success">${totalNetRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-info/5 border border-info/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 text-info mb-3">
            <div className="p-3 bg-info/10 rounded-2xl"><FaChartBar size={24} /></div>
            <h3 className="font-bold text-lg">Total Bookings</h3>
          </div>
          <p className="text-3xl font-extrabold text-info">{bookings.length}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Revenue Breakdown Chart */}
        <div className="bg-white/50 backdrop-blur-sm border border-base-200 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Finacial Overview
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" radius={[10, 10, 0, 0]} barSize={60}>
                  {revenueChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Demand Chart */}
        <div className="bg-white/50 backdrop-blur-sm border border-base-200 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-secondary rounded-full"></span>
            Service Demand (Histogram)
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={demandChartData}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={120} fontSize={12} />
                <Tooltip
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#EC4899" radius={[0, 10, 10, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white/50 backdrop-blur-sm border border-base-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-base-200 flex justify-between items-center">
          <h3 className="text-xl font-bold">Detailed Revenue Stream</h3>
          <span className="badge badge-outline badge-md">{bookings.length} Records found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="px-6 py-4">Service Details</th>
                <th className="px-6 py-4">Completed Date</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const price = parseFloat(b.price) || 0;
                const cost = parseFloat(b.decoratorCost) || 0;
                const net = price - cost;
                return (
                  <tr key={b._id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold">{b.serviceName}</div>
                      <div className="text-xs opacity-50">{b._id}</div>
                    </td>
                    <td className="px-6 py-4">{new Date(b.completedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-primary font-semibold">${price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-warning">${cost.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="text-success font-bold bg-success/10 px-3 py-1 rounded-full">${net.toFixed(2)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueMonitoring;
