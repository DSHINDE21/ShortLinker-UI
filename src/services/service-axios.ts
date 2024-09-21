import { config } from "@ShortLinker/config/config";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL = config.BASE_API_URL;
const THREE_MINUTES = 3 * 60 * 1000; // 3 seconds timeout

// Create an Axios instance
const axiosService = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});

// Request interceptor
axiosService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      // Calling refresh token apis like login
      // Todo: handle it for access & refresh token logics
      console.log("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosService;
