import axios from "axios";

// In the browser, use the Next.js proxy (/api → backend).
// On the server, use the backend URL directly (relative URLs have no host in Node).
const baseURL =
  typeof window === "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api")
    : "/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken =
        typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

      if (!refreshToken) {
        isRefreshing = false;
        // No refresh token — session is gone, clear auth state
        if (typeof window !== "undefined") {
          window.__authClearSession?.();
        }
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });

        if (res.data?.success && res.data?.data?.accessToken) {
          const { accessToken, refreshToken: newRefreshToken } = res.data.data;

          localStorage.setItem("accessToken", accessToken);
          if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          processQueue(null, accessToken);
          isRefreshing = false;
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Refresh failed — clear auth state so UI reflects logged-out
        if (typeof window !== "undefined") {
          window.__authClearSession?.();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
