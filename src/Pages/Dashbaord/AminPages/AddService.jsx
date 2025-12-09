import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import LoaderWithLogo from "../../../Component/Spiners/LoaderWithLogo";
import { FaUserShield } from "react-icons/fa";

const AddService = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [includedItems, setIncludedItems] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setImageError("Please select an image file");
        setImageFile(null);
        setImagePreview(null);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size must be less than 5MB");
        setImageFile(null);
        setImagePreview(null);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  // Handle add included item
  const handleAddIncludedItem = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value !== "") {
        setIncludedItems([...includedItems, value]);
        e.target.value = "";
      }
    }
  };

  // Handle remove included item
  const handleRemoveIncludedItem = (index) => {
    const newItems = includedItems.filter((_, i) => i !== index);
    setIncludedItems(newItems);
  };

  // Handle form submission
  const handleCreateService = async (data) => {
    console.log("=== FORM DATA ===");
    console.log("Form Data:", data);
    console.log("Included Items:", includedItems);
    console.log("Image File:", imageFile);

    // Validate image
    if (!imageFile) {
      setImageError("Service image is required");
      toast.error("Please select a service image");
      return;
    }

    // Confirm action
    const result = await Swal.fire({
      title: "Create Service?",
      text: `Are you sure you want to create "${data.service_name}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);

    try {
      // Step 1: Upload image to imgBB
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      let imageUrl = "";
      try {
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          imageFormData
        );
        imageUrl = imgRes.data.data.display_url;
        console.log("✅ Image uploaded:", imageUrl);
      } catch (imgError) {
        console.error("❌ Image upload failed:", imgError);
        toast.error("Failed to upload image. Please try again.");
        setIsLoading(false);
        return;
      }

      // Step 2: Prepare service data
      const serviceData = {
        service_name: data.service_name.trim(),
        cost: parseFloat(data.cost),
        unit: data.unit,
        service_category: data.service_category,
        description: data.description.trim(),
        included_items: includedItems,
        duration: data.duration?.trim() || "Not specified",
        isFeatured: data.isFeatured || false,
        image: imageUrl,
        rating: 5,
        reviews_count: 0,
        createdByEmail: user?.email || "admin@gmail.com",
        createdAt: new Date().toISOString(),
      };

      console.log("=== SERVICE DATA TO SEND ===");
      console.log(JSON.stringify(serviceData, null, 2));

      // Step 3: Send to backend
      const res = await axiosSecure.post("/services", serviceData);

      if (res.data.insertedId) {
        toast.success("Service created successfully!");

        // Show success message
        await Swal.fire({
          title: "Success!",
          text: `${data.service_name} has been created successfully!`,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        // Reset form
        reset();
        setIncludedItems([]);
        setImagePreview(null);
        setImageFile(null);
        setImageError("");

        console.log("✅ Service created with ID:", res.data.insertedId);
      }
    } catch (error) {
      console.error("❌ Error creating service:", error);
      const message =
        error?.response?.data?.massage ||
        error?.response?.data?.message ||
        "Failed to create service";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (roleLoading) {
    return <LoaderWithLogo />;
  }

  // Admin verification
  if (role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <FaUserShield className="text-error text-6xl" />
        <h2 className="text-2xl font-bold text-error">Access Denied</h2>
        <p className="text-base-content/70">
          You need admin privileges to access this page
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary/10 max-w-7xl mx-auto rounded-2xl p-10">
      <header className="text-center py-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Create New Service
        </h1>
        <p className="text-base-content/60">
          Fill in the details to add a new decoration service
        </p>
      </header>

      <main className="mt-8">
        <form
          onSubmit={handleSubmit(handleCreateService)}
          className="flex flex-col gap-6"
        >
          {/* Service Name & Cost Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Name */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Service Name *
              </span>
              <input
                type="text"
                {...register("service_name", {
                  required: "Service name is required",
                  minLength: {
                    value: 3,
                    message: "Service name must be at least 3 characters",
                  },
                })}
                className={`input input-bordered w-full ${errors.service_name ? "input-error" : ""
                  }`}
                placeholder="e.g., Luxury Wedding Stage Decoration"
              />
              {errors.service_name && (
                <span className="text-error text-sm mt-1">
                  {errors.service_name.message}
                </span>
              )}
            </label>

            {/* Cost */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Cost (BDT) *
              </span>
              <input
                type="number"
                {...register("cost", {
                  required: "Cost is required",
                  min: {
                    value: 1,
                    message: "Cost must be greater than 0",
                  },
                })}
                className={`input input-bordered w-full ${errors.cost ? "input-error" : ""
                  }`}
                placeholder="e.g., 15000"
                step="0.01"
              />
              {errors.cost && (
                <span className="text-error text-sm mt-1">
                  {errors.cost.message}
                </span>
              )}
            </label>
          </div>

          {/* Unit & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unit */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Unit *
              </span>
              <select
                {...register("unit", {
                  required: "Please select a unit",
                })}
                className={`select select-bordered w-full ${errors.unit ? "select-error" : ""
                  }`}
              >
                <option value="">Select Unit</option>
                <option value="per sqft">Per Sqft</option>
                <option value="per event">Per Event</option>
                <option value="per day">Per Day</option>
                <option value="per meter">Per Meter</option>
              </select>
              {errors.unit && (
                <span className="text-error text-sm mt-1">
                  {errors.unit.message}
                </span>
              )}
            </label>

            {/* Category */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Category *
              </span>
              <select
                {...register("service_category", {
                  required: "Please select a category",
                })}
                className={`select select-bordered w-full ${errors.service_category ? "select-error" : ""
                  }`}
              >
                <option value="">Select Category</option>
                <option value="home">🏠 Home</option>
                <option value="wedding">💒 Wedding</option>
                <option value="office">🏢 Office</option>
                <option value="seminar">🎓 Seminar</option>
                <option value="party">🎉 Party</option>
              </select>
              {errors.service_category && (
                <span className="text-error text-sm mt-1">
                  {errors.service_category.message}
                </span>
              )}
            </label>
          </div>

          {/* Description */}
          <label className="flex flex-col">
            <span className="text-base-content font-medium mb-2">
              Service Description *
            </span>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
              className={`textarea textarea-bordered h-32 ${errors.description ? "textarea-error" : ""
                }`}
              placeholder="Premium luxury wedding stage decoration with lighting and fresh flowers..."
            ></textarea>
            {errors.description && (
              <span className="text-error text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </label>

          {/* Included Items */}
          <label className="flex flex-col">
            <span className="text-base-content font-medium mb-2">
              Included Items (Optional)
            </span>
            <input
              type="text"
              onKeyDown={handleAddIncludedItem}
              className="input input-bordered w-full"
              placeholder="Type an item and press Enter (e.g., LED Lighting)"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {includedItems.map((item, i) => (
                <div
                  key={i}
                  className="badge badge-lg badge-primary gap-2 cursor-pointer hover:badge-error transition-all"
                  onClick={() => handleRemoveIncludedItem(i)}
                >
                  {item}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              ))}
            </div>
            {includedItems.length > 0 && (
              <span className="text-xs text-base-content/50 mt-2">
                {includedItems.length} item(s) added. Click to remove.
              </span>
            )}
          </label>

          {/* Duration & Featured Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Duration (Optional)
              </span>
              <input
                type="text"
                {...register("duration")}
                className="input input-bordered w-full"
                placeholder="e.g., 4-6 hours"
              />
              <span className="text-xs text-base-content/50 mt-1">
                Estimated time to complete the service
              </span>
            </label>

            {/* Featured */}
            <label className="flex flex-col">
              <span className="text-base-content font-medium mb-2">
                Options
              </span>
              <label className="label cursor-pointer justify-start gap-3 bg-base-200 rounded-lg p-4 hover:bg-base-300 transition-colors">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-warning"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Mark as Featured Service
                </span>
              </label>
            </label>
          </div>

          {/* Image Upload */}
          <label className="flex flex-col">
            <span className="text-base-content font-medium mb-2">
              Service Image *
            </span>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className={`file-input file-input-bordered file-input-primary w-full ${imageError ? "file-input-error" : ""
                }`}
            />
            <span className="text-xs text-base-content/50 mt-1">
              Accepted formats: PNG, JPG, GIF (Max 5MB)
            </span>
            {imageError && (
              <span className="text-error text-sm mt-1">{imageError}</span>
            )}
            {imagePreview && (
              <div className="mt-4 relative group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border-4 border-primary shadow-xl"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">
                    Image Preview
                  </span>
                </div>
              </div>
            )}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating Service...
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Service
              </>
            )}
          </button>
        </form>
      </main>

      {/* Info Alert */}
      <div className="alert alert-info mt-6 shadow-lg">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold">Tips for creating a great service</h3>
          <div className="text-sm">
            • Use high-quality images • Write detailed descriptions • Set
            competitive pricing
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
