import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import RoundedLoader from "../../../../Component/Spiners/RoundedLoader";
import FindError from "../../../FindError";

const Payment = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id: bookingId } = useParams();

  const [isProcessing, setIsProcessing] = useState(false);

  // Load booking
  const {
    isLoading,
    data: booking,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["booking", bookingId],
    enabled: !!bookingId,
    queryFn: async () => {
      // Corrected endpoint from /booking to /bookings to match server conventions
      const res = await axiosSecure.get(`/bookings/${bookingId}`);
      return res.data;
    },
    // Retry once to handle transient errors
    retry: 1,
  });
console.log(booking);
  // Handle Stripe payment
  const handlePayment = async () => {
    setIsProcessing(true);

    const paymentInfo = {
      price: booking.price,
      bookingId: booking._id,
      serviceId: booking.serviceId,
      serviceName: booking.serviceName,
      userEmail: booking.userEmail,
    };

    try {
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      console.log("Stripe session response:", res.data);
      if (res.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = res.data.url;
        toast.success("Payment initiation successful!");
      } else {
        toast.error("Stripe checkout URL is missing!");
      }

    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Payment initiation failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading state
  if (isLoading) return <RoundedLoader />;

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <FindError />
        <p className="text-error mt-4">{error?.message || "Something went wrong"}</p>
        <button className="btn btn-primary mt-4" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  // Booking not found
  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
          <button
            onClick={() => navigate("/dashboard/book-services")}
            className="btn btn-primary"
          >
            Go to Bookings
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/dashboard/book-services")}
        className="btn btn-ghost mb-6 gap-2"
      >
        <FaArrowLeft /> Back to Bookings
      </motion.button>

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-primary/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Order Summary
            </h3>

            {/* Image */}
            <div className="mb-6">
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
              />
            </div>

            {/* Service Info */}
            <h4 className="font-bold text-xl">{booking.serviceName}</h4>

            <div className="flex items-center gap-2 text-sm text-base-content/70 mt-2">
              <FaMapMarkerAlt className="text-secondary" />
              <span>{booking.address}</span>
            </div>

            <div className="divider"></div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              <div>
                <p className="text-sm text-base-content/60">Service Date</p>
                <p className="font-semibold">
                  {new Date(booking.serviceDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-base-content/70">Subtotal</span>
                <span className="font-semibold">${booking.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-base-content/70">Service Fee</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="divider my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${booking.price}</span>
              </div>
            </div>

            {/* Payment Button */}
            <div className="mt-6 p-4 bg-primary/10 rounded-xl">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn btn-primary w-full"
              >
                {isProcessing ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock /> Pay ${booking.price}
                  </>
                )}
              </button>
            </div>

            {/* Security */}
            <div className="mt-4 text-center flex items-center justify-center gap-6 text-sm text-base-content/60">
              <FaShieldAlt className="text-primary" /> Secure Payment by Stripe
              <FaCheckCircle className="text-success" /> Money Back Guarantee
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
