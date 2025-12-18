import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error?.message;

        if (status === 401 || status === 403) {
          toast.error(message || "Unauthorized access. Please login again.");
          await signOutUser();
          navigate("/login", { replace: true });
        } else {
          toast.error(message || "Something went wrong. Please try again.");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
