import { api } from "./api";

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface MeResponse {
  id: number;
  name: string;
  phone: string;
  email?: string;
  role: "CLIENT" | "BUSINESS" | "DELIVERY" | "ADMIN";
}

export interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export async function register(data: RegisterRequest) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function login(data: LoginRequest): Promise<MeResponse> {
  const loginRes = await api.post<LoginResponse>("/auth/login", data);

  const token = loginRes.data.token;
  localStorage.setItem("token", token);

  const meRes = await api.get<MeResponse>("/me");
  return meRes.data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function redirectByRole(role: MeResponse["role"]) {
  if (role === "CLIENT") {
    window.location.assign("/dashboard");
    return;
  }

  if (role === "BUSINESS") {
    window.location.assign("/negocio/dashboard");
    return;
  }

  if (role === "DELIVERY") {
    window.location.assign("/domiciliario/dashboard");
    return;
  }

  if (role === "ADMIN") {
    window.location.assign("/admin");
    return;
  }

  window.location.assign("/");
}
