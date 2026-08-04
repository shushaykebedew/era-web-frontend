"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  validateRequiredName,
  validateUsername,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  sanitizePhone,
} from "@/utils/validation";

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const is2xl = useMediaQuery("(min-width: 1536px)");

  const passwordsMismatch =
    mode === "register" &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const inputCls = cn(
    "w-full h-11 2xl:h-16 bg-[#1F1B16] border border-primary/20 rounded px-4 2xl:px-5",
    "text-sm 2xl:text-[20px] font-inter text-foreground focus:outline-none focus:border-primary/60 transition-colors",
  );
  const labelCls =
    "block text-xs 2xl:text-[20px] font-inter font-medium tracking-wider capitalize text-foreground-muted mb-1.5 2xl:mb-2";
  const errorCls = "mt-1.5 text-xs 2xl:text-sm font-inter text-red-400";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      const errors: Record<string, string> = {};

      const nameErr = validateRequiredName(fullName, "Full Name");
      if (nameErr) errors.fullName = nameErr;

      const usernameErr = validateUsername(username);
      if (usernameErr) errors.username = usernameErr;

      const emailErr = validateEmail(email);
      if (emailErr) errors.email = emailErr;

      const phoneErr = validatePhone(phone);
      if (phoneErr) errors.phone = phoneErr;

      const passwordErr = validatePassword(password, true);
      if (passwordErr) errors.password = passwordErr;

      const confirmErr = validateConfirmPassword(password, confirmPassword);
      if (confirmErr) errors.confirmPassword = confirmErr;

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
    } else {
      if (!identifier) {
        setFieldErrors({ identifier: "Please enter your identifier" });
        return;
      }
      if (!password) {
        setFieldErrors({ password: "Password is required" });
        return;
      }
      setFieldErrors({});
    }

    setIsLoading(true);
    try {
      if (mode === "login") {
        await login(identifier, password);
      } else {
        await register({
          fullName,
          username,
          password,
          email: email || undefined,
          phone: phone || undefined,
        });
      }
      onSuccess?.();
    } catch (err) {
      const axiosErr = err as any;
      const status = axiosErr.response?.status;
      const apiData = axiosErr.response?.data;
      setError(
        status >= 500
          ? "Something went wrong on our end. Please try again later."
          : (apiData?.message ??
              apiData?.error ??
              axiosErr.message ??
              "An unexpected error occurred."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError(null);
    setFieldErrors({});
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
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                className={cn(
                  inputCls,
                  fieldErrors.fullName && "border-red-500/60",
                )}
              />
              {fieldErrors.fullName && (
                <p className={errorCls}>{fieldErrors.fullName}</p>
              )}
            </div>
            <div>
              <Label className={labelCls}>Username *</Label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, username: "" }));
                }}
                className={cn(
                  inputCls,
                  fieldErrors.username && "border-red-500/60",
                )}
              />
              {fieldErrors.username && (
                <p className={errorCls}>{fieldErrors.username}</p>
              )}
            </div>
            <div>
              <Label className={labelCls}>Email Address</Label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={cn(
                  inputCls,
                  fieldErrors.email && "border-red-500/60",
                )}
              />
              {fieldErrors.email && (
                <p className={errorCls}>{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <Label className={labelCls}>Phone Number</Label>
              <Input
                type="tel"
                placeholder="e.g. +2519... or 09..."
                value={phone}
                onChange={(e) => {
                  setPhone(sanitizePhone(e.target.value));
                  setFieldErrors((prev) => ({ ...prev, phone: "" }));
                }}
                className={cn(
                  inputCls,
                  fieldErrors.phone && "border-red-500/60",
                )}
              />
              {fieldErrors.phone && (
                <p className={errorCls}>{fieldErrors.phone}</p>
              )}
            </div>
          </>
        )}

        {mode === "login" && (
          <div>
            <Label className={labelCls}>Username, Email, or Phone *</Label>
            <Input
              type="text"
              placeholder="Enter username, email, or phone"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setFieldErrors((prev) => ({ ...prev, identifier: "" }));
              }}
              className={cn(
                inputCls,
                fieldErrors.identifier && "border-red-500/60",
              )}
            />
            {fieldErrors.identifier && (
              <p className={errorCls}>{fieldErrors.identifier}</p>
            )}
          </div>
        )}

        <div>
          <Label className={labelCls}>Password *</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={cn(
                inputCls,
                "pr-11 2xl:pr-14",
                fieldErrors.password && "border-red-500/60",
              )}
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
          {fieldErrors.password && (
            <p className={errorCls}>{fieldErrors.password}</p>
          )}
        </div>

        {mode === "register" && (
          <div>
            <Label className={labelCls}>Confirm Password *</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                aria-invalid={passwordsMismatch}
                className={cn(
                  inputCls,
                  "pr-11 2xl:pr-14",
                  (passwordsMismatch || fieldErrors.confirmPassword) &&
                    "border-red-500/60 focus:border-red-500",
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
            {(passwordsMismatch || fieldErrors.confirmPassword) && (
              <p className={errorCls}>
                {fieldErrors.confirmPassword || "Passwords do not match."}
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          size={is2xl ? "lg" : "md"}
          isLoading={isLoading}
          disabled={passwordsMismatch}
          spinnerColor="white"
          spinnerClassName="w-7 h-7"
          className="w-full bg-primary text-[#402D00] hover:bg-primary/90 tracking-wider font-semibold font-inter mt-2"
        >
          {mode === "login" ? loginLabel : registerLabel}
        </Button>
      </form>

      <div className="mt-6 2xl:mt-8 text-center text-sm 2xl:text-[20px] font-inter text-foreground-muted">
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
        <p className="font-inter text-foreground-muted text-[10px] 2xl:text-sm uppercase tracking-[3px] leading-none">
          ERA 2026
        </p>
      </div>
    </>
  );
}
