import { api } from "@/lib/api";

export interface LoginRequest {
  phone: string;
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export async function login(data: LoginRequest) {
  const res = await api.post("/auth/login", data);
  return res.data; // { token }
}

export async function register(data: RegisterRequest) {
  const res = await api.post("/auth/register", data);
  return res.data; // { token }
}

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/register", data);
    return res.data;
  },

  async login(data: {
    phone: string;
    password: string;
  }): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
  },
};
