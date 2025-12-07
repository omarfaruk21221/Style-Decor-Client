import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Component/Logo";
import logo3 from "../../../public/assets/logo3.png";

const ForgetPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate email
      if (!email.trim()) {
        setError("Email address is required");
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success message
      setSuccess("Password reset link has been sent to your email!");
      setEmail("");

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center p-4 sm:p-6 lg:p-8  overflow-x-hidden">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-base-100  shadow-2xl">
        {/* Left/Graphic Side */}
        <div className="relative hidden md:flex items-center justify-center bg-base-100 dark:bg-background-dark">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="z-10 flex flex-col items-center text-center p-12">
            <img
              src={logo3}
              alt="Forget Password Graphic"
              className="w-75 h-45 mb-6 rounded-4xl object-cover shadow-lg"
            />
            <h2 className="text-3xl font-bold text-secondary">
              Reset Your Password
            </h2>
            <p className="text-lg text-accent my-2">
              Don't worry, we've got you covered!
            </p>
            <p className="text-secondary-content">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>
        </div>

        {/* Right/Form Side */}
        <div className="flex flex-col justify-center p-6">
          <Logo />
          <div className="mb-8">
            <h1 className="text-text-light text-4xl font-bold mb-2">
              Forgot Password?
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-100  border border-red-400 dark:border-red-700">
                <p className="text-red-600 dark:text-red-400 font-medium text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700">
                <p className="text-green-600 dark:text-green-400 font-medium text-sm">
                  ✓ {success}
                </p>
              </div>
            )}

            {/* Email Field */}
            <label className="flex flex-col">
              <span className="text-text-light  font-medium mb-2">
                Email Address
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 dark:border-slate-600 bg-white  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Enter your email"
                disabled={loading}
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 px-5 rounded-lg bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold transition-colors"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Back to Login Link */}
            <p className="text-center text-text-secondary-light dark:text-text-secondary-dark text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-bold text-primary hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPage;
