import { Link, useNavigate, useLocation } from "react-router-dom";
import logo3 from "../../../public/assets/logo3.png";
import Logo from "../../Component/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import GoogleSignIn from "./SocialLogIn/GoogleSignIn";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Get the route user was trying to access before login
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ====== Handle Form Submit ======
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        // Show success toast
        toast.success("Login successful! Welcome back! 🎉");

        // Navigate to the route user was trying to access, or home page
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((error) => {
        console.log("Login error:", error.message);
        toast.error(error.message || "Login failed! Please try again.");
      });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-base-100 shadow-2xl">
        {/* Left/Graphic Side */}
        <aside className="relative hidden md:flex items-center justify-center bg-base-200">
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
        </aside>

        {/* Right/Form Side */}
        <aside className="flex flex-col justify-center p-6 bg-base-100">
          <Logo />
          <div className="mb-8">
            <h1 className="text-base-content text-[32px] font-bold mb-2">
              Log in to your account
            </h1>
            <p className="text-base-content/70">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-6"
          >
            {/* Email Field */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Email Address
              </span>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`input input-bordered w-full pr-12 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-primary transition-colors"
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
                  {errors.password.message}
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
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
            {/* Login Button */}

            <GoogleSignIn />

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
        </aside>
      </div>
    </div>
  );
};

export default LoginPage;
