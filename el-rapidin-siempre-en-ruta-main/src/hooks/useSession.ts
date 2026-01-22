import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { MeResponse } from "@/lib/auth";

export function useSession() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get<MeResponse>("/me");
      setUser(res.data);
    } catch (error) {
      // Token inválido o expirado
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    refreshSession,
  };
}
