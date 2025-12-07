import { Link } from "react-router-dom";
import logo3 from "../../../public/assets/logo3.png";
import Logo from "../../Component/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Add your login logic here
            console.log("Login data:", formData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Handle successful login
            alert("Login successful!");
        } catch (error) {
            console.error("Login error:", error);
            setErrors({ submit: "Login failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4 sm:p-6 lg:p-8  overflow-x-hidden">
            <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-base-100 shadow-2xl">
                {/* Left/Graphic Side */}
                <div className="relative hidden md:flex items-center justify-center bg-base-200">
                    <div className="absolute inset-0 bg-primary/10"></div>
                    <div className="z-10 flex flex-col items-center text-center p-12">
                        <img
                            src={logo3}
                            alt="Login Graphic"
                            className="w-75 h-45 mb-6 rounded-4xl object-cover shadow-lg"
                        />
                        <h2 className="text-3xl font-bold text-secondary">
                            Unlock Your Potential
                        </h2>
                        <p className="text-lg text-accent my-2">
                            Welcome back! Style Decor.
                        </p>
                        <p className="text-base-content/70">
                            Let&apos;s get you signed in.
                        </p>
                    </div>
                </div>

                {/* Right/Form Side */}
                <div className="flex flex-col justify-center p-6 bg-base-100">
                    <Logo />

                    <div className="mb-8">
                        <h1 className="text-base-content text-[32px] font-bold mb-2">
                            Log in to your account
                        </h1>
                        <p className="text-base-content/70">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Error Message */}
                        {errors.submit && (
                            <div className="alert alert-error">
                                <span>{errors.submit}</span>
                            </div>
                        )}

                        {/* Email Field */}
                        <label className="flex flex-col">
                            <span className="text-base-content font-medium mb-2">
                                Email Address
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`input input-bordered w-full ${errors.email ? "input-error" : ""
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <span className="text-error text-sm mt-1">{errors.email}</span>
                            )}
                        </label>

                        {/* Password Field */}
                        <label className="flex flex-col">
                            <span className="text-base-content font-medium mb-2">
                                Password
                            </span>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`input input-bordered w-full pr-12 ${errors.password ? "input-error" : ""
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="z-10 absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-primary transition-colors"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-lg" />
                                    ) : (
                                        <FaEye className="text-lg" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-error text-sm mt-1">
                                    {errors.password}
                                </span>
                            )}
                        </label>

                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-secondary text-sm font-medium hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Login"
                            )}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center text-base-content/70 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="font-bold text-lg text-warning hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
