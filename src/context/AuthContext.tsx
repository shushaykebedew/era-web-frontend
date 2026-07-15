"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "@/services/api";
import { clearNomineesCache } from "@/services/nominees";

export interface AuthUser {
  id: string;
  fullName: string;
  username: string;
  email?: string | null;
  phone?: string | null;
  roleId?: string;
  role?: { id: string; name: string } | null;
  status?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (payload: {
    fullName: string;
    username: string;
    password?: string;
    email?: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

function safeParseUser(raw: string | null): AuthUser | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && typeof parsed.id === "string") {
      return parsed as AuthUser;
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    clearTokens();
    setUser(null);
    clearNomineesCache();
  }, []);

  useEffect(() => {
    // Expose clearSession so api.ts can call it on unrecoverable 401
    (window as any).__authClearSession = clearSession;
    return () => {
      delete (window as any).__authClearSession;
    };
  }, [clearSession]);

  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      // Optimistically restore from storage while we verify
      const storedUser = safeParseUser(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);

      try {
        const res = await api.get("/auth/me");
        if (res.data?.success) {
          const freshUser: AuthUser = res.data.data;
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
        } else {
          clearSession();
        }
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, [clearSession]);

  const login = async (identifier: string, password: string): Promise<void> => {
    const res = await api.post("/auth/login", { identifier, password });

    if (!res.data?.success)
      throw new Error(res.data?.message || "Login failed");

    const { accessToken, refreshToken, user: loggedUser } = res.data.data;

    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    // Fetch full profile — login response may return a partial user object
    let finalUser: AuthUser = loggedUser;
    try {
      const meRes = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (meRes.data?.success) finalUser = meRes.data.data;
    } catch {
      /* use loggedUser as-is */
    }

    localStorage.setItem("user", JSON.stringify(finalUser));
    setUser(finalUser);
  };

  const register = async (payload: {
    fullName: string;
    username: string;
    password?: string;
    email?: string;
    phone?: string;
  }): Promise<void> => {
    const res = await api.post("/auth/register", payload);
    if (!res.data?.success)
      throw new Error(res.data?.message || "Registration failed");
    if (payload.password) await login(payload.username, payload.password);
  };

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
