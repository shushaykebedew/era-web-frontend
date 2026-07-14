"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<any>;
  register: (payload: {
    fullName: string;
    username: string;
    password?: string;
    email?: string;
    phone?: string;
  }) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
          setAccessToken(storedToken);
          if (storedUser) setUser(JSON.parse(storedUser));

          const res = await api.get("/auth/me");
          if (res.data?.success) {
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));
          }
        }
      } catch (err) {
        console.warn("Session restore failed:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { identifier, password });

      if (res.data?.success) {
        const { accessToken: newAccessToken, refreshToken, user: loggedUser } = res.data.data;

        localStorage.setItem("accessToken", newAccessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

        let finalUser = loggedUser;
        try {
          const meRes = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          if (meRes.data?.success) finalUser = meRes.data.data;
        } catch (meErr) {
          console.warn("Failed to fetch full user info during login:", meErr);
        }

        localStorage.setItem("user", JSON.stringify(finalUser));
        setAccessToken(newAccessToken);
        setUser(finalUser);
        return res.data;
      }

      throw new Error(res.data?.message || "Login failed");
    } catch (err: any) {
      const apiData = err.response?.data;
      throw new Error(
        apiData?.message ?? apiData?.error ?? err.message ?? "Login failed. Please check your credentials.",
      );
    }
  };

  const register = async (payload: {
    fullName: string;
    username: string;
    password?: string;
    email?: string;
    phone?: string;
  }) => {
    try {
      const res = await api.post("/auth/register", payload);
      if (res.data?.success) {
        if (payload.password) return await login(payload.username, payload.password);
        return res.data;
      }
      throw new Error(res.data?.message || "Registration failed");
    } catch (err: any) {
      const apiData = err.response?.data;
      throw new Error(
        apiData?.message ?? apiData?.error ?? err.message ?? "Registration failed. Please try again.",
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
    clearNomineesCache();
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isAuthenticated: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
