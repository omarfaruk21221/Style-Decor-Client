import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaTimesCircle,
  FaArrowLeft,
  FaHome,
  FaExclamationTriangle,
  FaCreditCard,
  FaRedo,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const PaymentCancle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking || {};
  const error = location.state?.error || "";

  const handleRetryPayment = () => {
    if (booking._id) {
      navigate(`/dashboard/payment/${booking._id}`);
    } else {
      navigate("/dashboard/book-services");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-error/5 to-orange-500/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Cancel Card */}
        <div className="bg-primary/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl border-2 border-error/20">
          {/* Animated Cancel Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2,
            }}
            className="relative mb-8 inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-error/20 rounded-full blur-2xl animate-pulse"></div>
              <FaCircleXmark className="text-8xl md:text-9xl text-error relative z-10" />
            </div>
          </motion.div>

          {/* Cancel Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-error to-orange-500"
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-base-content/70 mb-8"
          >
            Your payment process was cancelled. No charges have been made to
            your account.
          </motion.p>

          {/* Error Message (if any) */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-error/10 rounded-xl p-4 mb-8 border border-error/20"
            >
              <div className="flex items-center gap-2 justify-center mb-2">
                <FaExclamationTriangle className="text-error" />
                <span className="font-semibold text-error">Error Details</span>
              </div>
              <p className="text-sm text-base-content/70">{error}</p>
            </motion.div>
          )}

          {/* Booking Info (if available) */}
          {booking.serviceName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-base-200/50 rounded-2xl p-6 mb-8 border border-base-300"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaCreditCard className="text-2xl text-warning" />
                <h3 className="text-xl font-bold">Booking Information</h3>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center py-2 border-b border-base-300">
                  <span className="text-base-content/60">Service</span>
                  <span className="font-semibold">{booking.serviceName}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-base-content/60">Amount</span>
                  <span className="text-xl font-bold text-primary">
                    ${booking.price}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Reasons List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-warning/10 rounded-xl p-6 mb-8 border border-warning/20 text-left"
          >
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FaExclamationTriangle className="text-warning" />
              Common reasons for cancellation:
            </h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span>You clicked the cancel button</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span>Payment gateway timeout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span>Network connectivity issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span>Incorrect payment details</span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {booking._id && (
              <button
                onClick={handleRetryPayment}
                className="btn btn-primary gap-2 flex-1 sm:flex-initial"
              >
                <FaRedo />
                Retry Payment
              </button>
            )}

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

          {/* Help Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-base-200/50 rounded-xl border border-base-300"
          >
            <p className="text-sm text-base-content/70">
              <FaExclamationTriangle className="inline text-warning mr-2" />
              Need help? Contact our support team if you encounter any issues
              with your payment.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-error/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancle;
