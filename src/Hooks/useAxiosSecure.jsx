import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor - attach Firebase token
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        try {
          const auth = getAuth();
          const currentUser = auth.currentUser;

          if (currentUser) {
            // Get fresh token for each request
            const token = await currentUser.getIdToken(true);
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error getting Firebase token:", error);
        }
        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.massage || error?.response?.data?.message;

        console.error("Axios Secure Error:", {
          status,
          message,
          url: error?.config?.url,
        });

        // Handle unauthorized (401) or forbidden (403) errors
        if (status === 401 || status === 403) {
          toast.error(message || "Unauthorized access. Please login again.");

          try {
            await signOutUser();
          } catch (signOutError) {
            console.error("Error signing out:", signOutError);
          } finally {
            navigate("/login", { replace: true });
          }
        }

        // Handle other errors
        if (status === 404) {
          toast.error("Resource not found");
        } else if (status >= 500) {
          toast.error("Server error. Please try again later.");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
