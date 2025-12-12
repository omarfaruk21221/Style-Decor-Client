import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo3 from "../../../public/assets/logo3.png";
import Logo from "../../Component/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import GoogleSignIn from "./SocialLogIn/GoogleSignIn";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = watch("password");

  // ====== Handle Image Upload and Preview ======
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("File size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
    setImageError("");
  };

  // ====== Handle Form Submit ======
  const handleRegister = async (data) => {
    const profileImg = imageFile || data.photo?.[0];
    if (!profileImg) {
      toast.error("Please select a profile image");
      setImageError("Profile image is required");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Firebase user create
      console.log("Step 1: Creating Firebase user...");
      const result = await registerUser(data.email, data.password);
      const user = result.user;
      console.log(" Firebase user created:", user.uid);
      toast.success("Registration successful! Welcome!");

      // Step 2: Upload image to imgBB
      console.log("Step 2: Uploading image...");
      const formData = new FormData();
      formData.append("image", profileImg);

      let imageUrl = "";
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host_key
          }`,
          formData
        );
        imageUrl = res.data.data.display_url;
        console.log(" Image uploaded:", imageUrl);
      } catch (imgErr) {
        console.error("Image upload failed:", imgErr);
        toast.warning("Image upload failed, using empty image.");
        imageUrl = "";
      }

      const userInfo = {
        name: data.name,
        email: user.email,
        image: imageUrl,
        uid: user.uid,
      };

      console.log("Sending to backend:", userInfo);

      const dbRes = await axiosSecure.post("/users", userInfo);
      console.log(" User saved to DB:", dbRes.data);

      // Step 4: Firebase profile update
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      // Step 5: success message and redirect
      toast.success("Account created! Redirecting to login...");
      navigate("/");
      // setTimeout(() => {
      // }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message || "Registration failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center p-4 sm:p-6 lg:p-8 overflow-x-hidden">
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
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 rounded-lg object-cover border-2 border-primary shadow-md"
                  />
                </div>
              )}
            </aside>
          </section>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-4"
          >
            {/* Name Field */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Full Name
              </span>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className="text-error text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </label>

            {/* Image File Upload Field (Optional) */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Profile Image
              </span>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                {...register("photo", { required: "Image is required" })}
                className={`file-input file-input-bordered w-full ${
                  imageError ? "file-input-error" : ""
                }`}
              />
              <span className="text-xs text-base-content/50 mt-1">
                Accepted formats: PNG, JPG, GIF (Max 5MB)
              </span>
              {imageError && (
                <span className="text-error text-sm mt-1">{imageError}</span>
              )}
            </label>

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
                    pattern: {
                      value: /(?=.*[A-Z])/,
                      message:
                        "Password must contain at least one uppercase letter",
                    },
                  })}
                  className={`input input-bordered w-full pr-12 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Create a password (min 6 characters)"
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

            {/* Confirm Password Field */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Confirm Password
              </span>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watchPassword || "Passwords do not match",
                  })}
                  className={`input input-bordered w-full pr-12 ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-primary transition-colors"
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
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
            {/* Google Register Button */}
            <GoogleSignIn />

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
