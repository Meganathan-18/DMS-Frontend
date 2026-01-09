import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * 🔥 REQUEST INTERCEPTOR
 * Attach logged-in userId to every request
 */
api.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      config.headers["X-USER-ID"] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🔥 RESPONSE INTERCEPTOR
 * Handle blocked / unauthorized access
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data;

    // 🚫 BLOCKED USER
    if (status === 403 && message === "User is blocked by admin") {
      alert("Your account is blocked by admin");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    // 🚫 NOT LOGGED IN / INVALID USER
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    return Promise.reject(error);
  }
);

export default api;
