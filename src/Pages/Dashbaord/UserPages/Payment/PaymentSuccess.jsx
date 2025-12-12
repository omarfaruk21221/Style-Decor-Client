import React, { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaReceipt,
  FaArrowLeft,
  FaHome,
  FaPrint,
  FaDownload,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect } from "react";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state?.payment || {};

  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log("paymentSuccess session", sessionId)
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          // console.log("after paymentInfo",res);
          setPaymentInfo({
            transactionalId: res.data.transactionalId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [axiosSecure, sessionId]);
  console.log("after paymentInfo", paymentInfo)

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Success Card */}
        <div className="bg-primary/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl border-2 border-success/20">
          {/* Animated Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2,
            }}
            className="relative mb-8 inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl animate-pulse"></div>
              <FaCircleCheck className="text-8xl md:text-9xl text-success relative z-10" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-success to-green-400"
          >
            Payment Successful!
          </motion.h1>
          {paymentInfo.transactionalId && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-accent-content/90 mb-8"
            >
              <span>
                Transactional ID: {paymentInfo.transactionalId}
              </span>
              <br />
              <span>
               Tracking ID: {paymentInfo.trackingId}
              </span>
            </motion.p>
          )}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-base-content/70 mb-8"
          >
            Your payment has been processed successfully. A confirmation email
            has been sent to your registered email address.
          </motion.p>

          {/* Payment Details Card */}
          {paymentData.amount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-base-200/50 rounded-2xl p-6 mb-8 border border-base-300"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaReceipt className="text-2xl text-primary" />
                <h3 className="text-xl font-bold">Payment Details</h3>
              </div>

              <div className="space-y-3 text-left">
                {paymentData.transactionId && (
                  <div className="flex justify-between items-center py-2 border-b border-base-300">
                    <span className="text-base-content/60">Transaction ID</span>
                    <span className="font-mono text-sm font-semibold">
                      {paymentData.transactionId}
                    </span>
                  </div>
                )}

                {paymentData.serviceName && (
                  <div className="flex justify-between items-center py-2 border-b border-base-300">
                    <span className="text-base-content/60">Service</span>
                    <span className="font-semibold">
                      {paymentData.serviceName}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-2 border-b border-base-300">
                  <span className="text-base-content/60">Amount Paid</span>
                  <span className="text-2xl font-bold text-success">
                    ${paymentData.amount}
                  </span>
                </div>

                {paymentData.paymentDate && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-base-content/60">Payment Date</span>
                    <span className="font-semibold">
                      {new Date(paymentData.paymentDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/dashboard/payment-history")}
              className="btn btn-primary gap-2 flex-1 sm:flex-initial"
            >
              <FaReceipt />
              View Payment History
            </button>

            <button
              onClick={() => navigate("/dashboard/book-services")}
              className="btn btn-outline gap-2 flex-1 sm:flex-initial"
            >
              <FaArrowLeft />
              Back to Bookings
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-ghost gap-2 flex-1 sm:flex-initial"
            >
              <FaHome />
              Go Home
            </button>
          </motion.div>

          {/* Download/Print Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 pt-6 border-t border-base-300 flex justify-center gap-4"
          >
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-ghost gap-2"
            >
              <FaPrint />
              Print Receipt
            </button>
            <button
              onClick={() => {
                // Download receipt functionality can be added here
                toast.success("Receipt download feature coming soon");
              }}
              className="btn btn-sm btn-ghost gap-2"
            >
              <FaDownload />
              Download Receipt
            </button>
          </motion.div>

          {/* Success Confirmation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-success/10 rounded-xl border border-success/20"
          >
            <p className="text-sm text-base-content/70">
              <FaCheckCircle className="inline text-success mr-2" />
              Your payment receipt has been saved. You can access it anytime
              from your payment history.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
