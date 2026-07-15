"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMismatch =
    mode === "register" &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const inputCls = cn(
    "w-full h-11 2xl:h-14 bg-[#1F1B16] border border-primary/20 rounded px-4 2xl:px-5",
    "text-sm 2xl:text-lg font-inter text-foreground focus:outline-none focus:border-primary/60 transition-colors",
  );
  const labelCls =
    "block text-xs 2xl:text-base font-inter font-bold tracking-wider capitalize text-foreground-muted mb-1.5 2xl:mb-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
      const status = err.response?.status;
      const apiData = err.response?.data;
      setError(
        status >= 500
          ? "Something went wrong on our end. Please try again later."
          : (apiData?.message ??
              apiData?.error ??
              err.message ??
              "An unexpected error occurred."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError(null);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {error && (
        <div className="w-full mb-4 p-3 2xl:p-4 bg-red-950/40 border border-red-500/30 text-red-400 text-xs sm:text-sm 2xl:text-base font-inter rounded">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 2xl:gap-5"
      >
        {mode === "register" && (
          <>
            <div>
              <Label className={labelCls}>Full Name *</Label>
              <Input
                type="text"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label className={labelCls}>Username *</Label>
              <Input
                type="text"
                required
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label className={labelCls}>Email Address</Label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label className={labelCls}>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputCls}
              />
            </div>
          </>
        )}

        {mode === "login" && (
          <div>
            <Label className={labelCls}>Username, Email, or Phone *</Label>
            <Input
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
          <Label className={labelCls}>Password *</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(inputCls, "pr-11 2xl:pr-14")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-0 h-11 w-11 2xl:h-14 2xl:w-14 flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 2xl:w-5 2xl:h-5" />
              ) : (
                <Eye className="w-4 h-4 2xl:w-5 2xl:h-5" />
              )}
            </button>
          </div>
        </div>

        {mode === "register" && (
          <div>
            <Label className={labelCls}>Confirm Password *</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={passwordsMismatch}
                className={cn(
                  inputCls,
                  "pr-11 2xl:pr-14",
                  passwordsMismatch && "border-red-500/60 focus:border-red-500",
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-2 top-0 h-11 w-11 2xl:h-14 2xl:w-14 flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 2xl:w-5 2xl:h-5" />
                ) : (
                  <Eye className="w-4 h-4 2xl:w-5 2xl:h-5" />
                )}
              </button>
            </div>
            {passwordsMismatch && (
              <p className="mt-1.5 text-xs 2xl:text-sm font-inter text-red-400">
                Passwords do not match.
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          size="md"
          isLoading={isLoading}
          disabled={passwordsMismatch}
          spinnerColor="white"
          spinnerClassName="w-7 h-7"
          className="w-full bg-primary text-[#402D00] hover:bg-primary/90 tracking-wider font-semibold font-inter mt-2"
        >
          {mode === "login" ? loginLabel : registerLabel}
        </Button>
      </form>

      <div className="mt-6 2xl:mt-8 text-center text-sm 2xl:text-lg font-inter text-foreground-muted">
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

      <div className="mt-8 2xl:mt-10 pt-4 2xl:pt-5 border-t border-[#4E46374D] w-full text-center">
        <p className="font-inter text-foreground-muted text-[10px] 2xl:text-xs uppercase tracking-[3px] leading-none">
          ERA 2026
        </p>
      </div>
    </>
  );
}
