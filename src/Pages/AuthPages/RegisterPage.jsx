import { useState } from "react";
import { Link } from "react-router-dom";
import logo3 from "../../../public/assets/logo3.png";
import Logo from "../../Component/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageFile: null,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file input
    if (name === "imageFile" && files && files[0]) {
      const file = files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          imageFile: "Please select an image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          imageFile: "File size must be less than 5MB",
        }));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));

      // Clear error
      if (errors.imageFile) {
        setErrors((prev) => ({
          ...prev,
          imageFile: "",
        }));
      }
    } else {
      // Handle text inputs
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
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Image validation (optional field)
    // File validation is done during upload, no validation needed here

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      // Add your registration logic here
      console.log("Registration data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle successful registration
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center p-4 sm:p-6 lg:p-8  overflow-x-hidden">
      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-4xl shadow-2xl">
        {/* Left/Graphic Side */}
        <div className="relative hidden md:flex items-center justify-center bg-base-200">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="z-10 flex flex-col items-center text-center p-12">
            <img
              src={logo3}
              alt="Register Graphic"
              className="w-75 h-45 mb-6 rounded-4xl object-cover shadow-lg"
            />
            <h2 className="text-3xl font-bold text-secondary mb-2">
              Join Our Community
            </h2>
            <p className="text-lg text-accent my-2">
              Create your account with Style Decor.
            </p>
            <p className="text-base-content/70">
              Let&apos;s get you started on your journey.
            </p>
          </div>
        </div>

        {/* Right/Form Side */}
        <div className="flex flex-col justify-center p-6 bg-base-100">
          <section className=" grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <aside>
              <Logo />
              <div className="mb-6">
                <h1 className="text-base-content text-[32px] font-bold mb-2">
                  Create an account
                </h1>
                <p className="text-base-content/70">
                  Let&apos;s get you started with a new account.
                </p>
              </div>
            </aside>
            {/* Image Preview */}
            <aside>
              {imagePreview && (
                <div className=" flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 rounded-lg object-cover border-2 border-primary shadow-md"
                  />
                </div>
              )}
            </aside>
          </section>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {/* Error Message */}
            {errors.submit && (
              <div className="alert alert-error">
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Name and Image URL - Same Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <label className="flex flex-col">
                <span className="text-base-content font-medium mb-2">
                  Full Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <span className="text-error text-sm mt-1">{errors.name}</span>
                )}
              </label>
              {/* Image File Upload Field (Optional) */}
              <label className="flex flex-col">
                <span className="text-base-content font-medium mb-2">
                  Profile Image (Optional)
                </span>

                <input
                  type="file"
                  name="imageFile"
                  onChange={handleChange}
                  accept="image/*"
                  className={`file-input file-input-bordered w-full ${
                    errors.imageFile ? "file-input-error" : ""
                  }`}
                />
                <span className="text-xs text-base-content/50 mt-1">
                  Accepted formats: PNG, JPG, GIF (Max 5MB)
                </span>
                {errors.imageFile && (
                  <span className="text-error text-sm mt-1">
                    {errors.imageFile}
                  </span>
                )}
              </label>
            </div>

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
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">{errors.email}</span>
              )}
            </label>

            {/* Password and Confirm Password - Same Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className={`input input-bordered w-full pr-12 ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="Create a password (min 6 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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

              {/* Confirm Password Field */}
              <label className="flex flex-col">
                <span className="text-base-content font-medium mb-2">
                  Confirm Password
                </span>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input input-bordered w-full pr-12 ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="z-10 absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-primary transition-colors"
                    title={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-lg" />
                    ) : (
                      <FaEye className="text-lg" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-error text-sm mt-1">
                    {errors.confirmPassword}
                  </span>
                )}
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full mt-2"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-base-content/70 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-lg text-warning hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
