import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaReceipt,
} from "react-icons/fa";
import RoundedLoader from "../../../../Component/Spiners/RoundedLoader";
import FindError from "../../../FindError";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payment history
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <RoundedLoader />;
  }

  if (isError) {
    return <FindError />;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/20 rounded-xl">
            <FaReceipt className="text-2xl text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Payment History
            </h1>
            <p className="text-base-content/60 mt-2">
              View all your payment transactions and receipts.
            </p>
          </div>
        </div>
      </motion.div>

      {payments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[40vh] bg-base-100 rounded-3xl p-8 text-center border-2 border-dashed border-base-300 shadow-sm"
        >
          <div className="text-6xl mb-4 opacity-50">💳</div>
          <h3 className="text-2xl font-bold opacity-70">No Payments Found</h3>
          <p className="text-base-content/60 mt-2 max-w-md">
            You haven't made any payments yet. Complete a booking payment to see
            your transaction history here.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="overflow-x-auto bg-base-100/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20"
        >
          <table className="table w-full">
            {/* head */}
            <thead className="bg-gradient-to-r from-primary/10 to-secondary/10 text-base-content uppercase text-xs font-extrabold tracking-wider">
              <tr>
                <th className="py-5 pl-8">Service</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Payment Date</th>
                <th>Service Date</th>
                <th>Status</th>
                <th className="pr-8">Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200/50">
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-base-200/40 transition-colors duration-300 group"
                >
                  <td className="pl-8 py-4">
                    <div className="flex items-center gap-5">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16 bg-base-300 shadow-md group-hover:scale-105 transition-transform">
                          <img
                            src={payment.serviceImage}
                            alt={payment.serviceName}
                            onError={(e) =>
                              (e.target.src = "https://via.placeholder.com/150")
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">
                          {payment.serviceName}
                        </div>
                        <div className="text-sm opacity-60 flex items-center gap-1 mt-1">
                          <FaMapMarkerAlt className="text-xs text-secondary" />
                          {payment.address?.substring(0, 30)}
                          {payment.address?.length > 30 && "..."}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-mono text-xs text-base-content/70">
                      {payment.transactionId}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 font-bold text-lg text-success">
                      <FaDollarSign className="text-sm" />
                      {payment.amount}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-primary" />
                      <span className="capitalize font-semibold">
                        {payment.paymentMethod || "stripe"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                        <FaCalendarAlt className="text-primary" />
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs opacity-50 font-mono">
                        {new Date(payment.paymentDate).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-semibold">
                      {payment.serviceDate
                        ? new Date(payment.serviceDate).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>
                  <td>
                    {payment.paymentStatus === "paid" ? (
                      <div className="badge badge-lg gap-2 badge-success text-white font-bold shadow-sm">
                        <FaCheckCircle />
                        Paid
                      </div>
                    ) : (
                      <div className="badge badge-lg gap-2 badge-error text-white font-bold shadow-sm">
                        <FaTimesCircle />
                        Failed
                      </div>
                    )}
                  </td>
                  <td className="pr-8">
                    {payment.cardLast4 ? (
                      <div className="flex items-center gap-2">
                        <FaCreditCard className="text-base-content/40" />
                        <span className="text-sm font-mono">
                          **** {payment.cardLast4}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-base-content/50">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Summary Card */}
      {payments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-effect rounded-3xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-base-content/60 mb-1">
                Total Payments
              </p>
              <p className="text-2xl font-bold text-primary">
                {payments.length}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm text-base-content/60 mb-1">
                Total Amount
              </p>
              <p className="text-2xl font-bold text-success">
                $
                {payments
                  .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm text-base-content/60 mb-1">
                Successful Payments
              </p>
              <p className="text-2xl font-bold text-success">
                {payments.filter((p) => p.paymentStatus === "paid").length}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentHistory;
