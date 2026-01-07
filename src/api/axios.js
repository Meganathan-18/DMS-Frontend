import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const message = error.response?.data;

    // 🔐 ONLY logout if backend EXPLICITLY says blocked
    if (status === 403 && message === "User is blocked by admin") {
      alert("Your account is blocked by admin");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    // ❗ For all other 403s → DO NOT LOGOUT
    return Promise.reject(error);
  }
);

export default api;