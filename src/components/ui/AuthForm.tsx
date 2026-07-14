"use client";

import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";

interface AuthFormProps {
  loginLabel?: string;
  registerLabel?: string;
  onSuccess?: () => void;
}

export function AuthForm({
  loginLabel = "SIGN IN",
  registerLabel = "REGISTER NOW",
  onSuccess,
}: AuthFormProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputCls = cn(
    "w-full h-11 bg-[#1F1B16] border border-primary/20 rounded px-4",
    "text-sm font-inter text-foreground focus:outline-none focus:border-primary/60 transition-colors",
  );
  const labelCls =
    "block text-xs font-inter font-bold tracking-wider uppercase text-foreground-muted mb-1.5";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (mode === "login") {
        if (!identifier || !password)
          throw new Error("Please enter your identifier and password.");
        await login(identifier, password);
      } else {
        if (!fullName || !username || !password)
          throw new Error("Full name, username, and password are required.");
        await register({
          fullName,
          username,
          password,
          email: email || undefined,
          phone: phone || undefined,
        });
      }
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "An unexpected authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError(null);
  };

  return (
    <>
      {error && (
        <div className="w-full mb-4 p-3 bg-red-950/40 border border-red-500/30 text-red-400 text-xs sm:text-sm font-inter rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {mode === "register" && (
          <>
            <div>
              <label className={labelCls}>Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sisay Kebede"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Username *</label>
              <input
                type="text"
                required
                placeholder="e.g. sisay"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input
                type="email"
                placeholder="e.g. sk@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. +2519..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputCls}
              />
            </div>
          </>
        )}

        {mode === "login" && (
          <div>
            <label className={labelCls}>Username, Email, or Phone *</label>
            <input
              type="text"
              required
              placeholder="Enter username, email, or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={inputCls}
            />
          </div>
        )}

        <div>
          <label className={labelCls}>Password *</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />
        </div>

        <Button
          type="submit"
          size="md"
          className="w-full bg-primary text-[#402D00] hover:bg-primary/90 tracking-wider font-semibold font-inter mt-2"
          disabled={isLoading}
        >
          {isLoading
            ? "AUTHENTICATING..."
            : mode === "login"
              ? loginLabel
              : registerLabel}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm font-inter text-foreground-muted">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:underline font-bold transition-colors cursor-pointer"
            >
              Register here
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:underline font-bold transition-colors cursor-pointer"
            >
              Sign in here
            </button>
          </>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-[#4E46374D] w-full text-center">
        <p className="font-inter text-foreground-muted text-[10px] uppercase tracking-[3px] leading-none">
          ERA 2026
        </p>
      </div>
    </>
  );
}
