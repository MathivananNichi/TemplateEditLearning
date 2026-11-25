import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.example.com",
  timeout: 15 * 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
apiClient.interceptors.response.use(
  (response) => {
    
    return response;
  },
  async (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;

    // Example: Session expired / unauthorized
    if (status === 401) {
      //   useAuthState.getState().logout();
    }

    // Normalize error message for your Repository / ViewModel
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  },
);

apiClient.interceptors;
