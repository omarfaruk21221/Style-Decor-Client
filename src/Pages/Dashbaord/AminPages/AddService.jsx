import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const AddService = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Create Service
  const handleCreateService = async (data) => {
    setLoading(true);

    const profileImg = data.image?.[0];
    if (!profileImg) {
      toast.error("Please select a service image");
      setLoading(false);
      return;
    }

    // Validate image size (Max 5MB)
    if (profileImg.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      setLoading(false);
      return;
    }

    // Upload image — ImgBB
    const formData = new FormData();
    formData.append("image", profileImg);

    try {
      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        formData
      );

      if (!imageResponse.data.success) {
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }

      const serviceImage = imageResponse.data.data.url;

      // ---- FINAL SERVICE DATA (this goes to backend) ----
      const serviceData = {
        service_name: data.service_name,
        cost: parseFloat(data.cost),
        service_category: data.service_category,
        included_items: data.included_items,
        description: data.description,
        image: serviceImage,
        createdByEmail: user?.email,
        createdByName: user?.displayName,
        createdByPhoto: user?.photoURL,
      };

      //  Save to Database
      const dbRes = await axiosSecure.post("/services", serviceData);

      if (dbRes.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Service added successfully!",
          icon: "success",
          confirmButtonColor: "#00b894",
        });

        reset();
        navigate("/dashboard/manage-service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary/10 max-w-7xl mx-auto rounded-2xl p-10">
      {/* Header */}
      <header className="text-center py-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Create New Service
        </h1>
        <p className="text-base-content/60">
          Fill in the details to add a new decoration service
        </p>
      </header>

      {/* Form */}
      <main className="mt-8">
        <form
          onSubmit={handleSubmit(handleCreateService)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Service Name */}
          <label className="flex flex-col">
            <span className="font-medium mb-2">Service Name *</span>
            <input
              type="text"
              {...register("service_name", {
                required: "Service name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className="input input-bordered w-full"
              placeholder="Luxury Wedding Stage Decoration"
            />
            {errors.service_name && (
              <span className="text-error text-sm">
                {errors.service_name.message}
              </span>
            )}
          </label>

          {/* Cost */}
          <label className="flex flex-col">
            <span className="font-medium mb-2">Cost (BDT) *</span>
            <input
              type="number"
              {...register("cost", { required: "Cost is required" })}
              className="input input-bordered w-full"
              placeholder="15000"
            />
            {errors.cost && (
              <span className="text-error text-sm">
                {errors.cost.message}
              </span>
            )}
          </label>

          {/* Category */}
          <label className="flex flex-col">
            <span className="font-medium mb-2">Category *</span>
            <select
              {...register("service_category", {
                required: "Category is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="home">🏠 Home</option>
              <option value="wedding">💒 Wedding</option>
              <option value="office">🏢 Office</option>
              <option value="seminar">🎓 Seminar</option>
              <option value="party">🎉 Party</option>
            </select>
            {errors.service_category && (
              <span className="text-error text-sm">
                {errors.service_category.message}
              </span>
            )}
          </label>

          {/* Included Items */}
          <label className="flex flex-col">
            <span className="font-medium mb-2">Included Items *</span>
            <input
              type="text"
              {...register("included_items", { required: "Required" })}
              className="input input-bordered w-full"
              placeholder="20 flowers, 10 candles"
            />
            {errors.included_items && (
              <span className="text-error text-sm">
                {errors.included_items.message}
              </span>
            )}
          </label>

          {/* Description */}
          <label className="col-span-2">
            <span className="font-medium mb-2">Description *</span>
            <textarea
              {...register("description", {
                required: "Description required",
                minLength: {
                  value: 20,
                  message: "Minimum 20 characters",
                },
              })}
              className="textarea textarea-bordered h-32 w-full"
              placeholder="Premium wedding stage decoration with lighting and fresh flowers..."
            ></textarea>
            {errors.description && (
              <span className="text-error text-sm">
                {errors.description.message}
              </span>
            )}
          </label>

          {/* Image */}
          <label className="flex flex-col">
            <span className="font-medium mb-2">Service Image *</span>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image required" })}
              className="file-input file-input-bordered file-input-primary w-full"
            />
            {errors.image && (
              <span className="text-error text-sm">{errors.image.message}</span>
            )}
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 btn-lg"
            disabled={loading}
          >
            {loading ? "Creating Service..." : "Create Service"}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary w-full mt-4 btn-lg"
          >
            <FaBackspace /> Back
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddService;
