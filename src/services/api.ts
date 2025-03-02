import axios from "axios";
import { loginUrl } from "@/contants/urls";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access");
      if (typeof window !== "undefined") {
        window.location.href = loginUrl;
      }
      return null;
    }
    return Promise.reject(error);
  }
);

export default api;
