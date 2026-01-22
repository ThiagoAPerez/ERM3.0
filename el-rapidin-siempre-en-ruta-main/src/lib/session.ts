import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { MeResponse } from "@/lib/auth";

export function useSession() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSession = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get<MeResponse>("/me");
      setUser(res.data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    refreshSession: loadSession, // ✅ AQUÍ
  };
}
