import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9090",
});

// =====================
// Request interceptor
// =====================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =====================
// Response interceptor
// =====================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token inválido o expirado
      localStorage.removeItem("token");

      // Evitar loop si ya estamos en login
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      // No autorizado (ej: no admin)
      console.warn("Acceso denegado (403)");
      // opcional: redirigir a dashboard o página segura
      // window.location.href = "/";
    }

    return Promise.reject(error);
  },
);
