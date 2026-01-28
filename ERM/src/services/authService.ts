import { api } from "@/lib/api";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", {
      identifier: data.identifier,
      password: data.password,
    });

    localStorage.setItem("token", res.data.token);
    return res.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/register", data);

    localStorage.setItem("token", res.data.token);
    return res.data;
  },
};
