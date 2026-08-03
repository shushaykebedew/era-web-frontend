"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { invitationsService } from "@/services/invitations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function InviteCompleteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    position: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const { data: validationResult, isLoading: isValidating, error: validationError } = useQuery({
    queryKey: ["validateInviteToken", token],
    queryFn: () => invitationsService.validateToken(token!),
    enabled: !!token,
    retry: false,
  });

  const completeMutation = useMutation({
    mutationFn: invitationsService.completeInvite,
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token, router]);

  if (!token) return null;

  if (isValidating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-foreground-muted font-inter text-sm animate-pulse">Verifying secure token...</p>
      </div>
    );
  }

  if (validationError) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-8 text-center"
      >
        <AlertCircle className="w-12 h-12 text-danger mb-4" />
        <h3 className="text-xl font-bold font-display text-foreground mb-2">Invalid or Expired Link</h3>
        <p className="text-foreground-muted font-inter mb-6">
          {(validationError as any)?.response?.data?.message || "The invitation link is no longer valid or has already been used."}
        </p>
        <Button onClick={() => router.push("/")} variant="outline">
          Return Home
        </Button>
      </motion.div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-8 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-success mb-6" />
        <h3 className="text-2xl font-bold font-display text-primary mb-3">Request Received</h3>
        <p className="text-foreground-muted font-inter mb-8">
          Thank you! Your information has been submitted successfully. We will review your request and notify you once your invitation is approved.
        </p>
        <Button onClick={() => router.push("/")} variant="primary">
          Return to Homepage
        </Button>
      </motion.div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeMutation.mutate({
      token,
      ...formData,
    });
  };

  const fieldBase = "border-b border-[#4E4637] bg-transparent py-2.5 text-base text-foreground outline-none placeholder:text-[#9A8F7E] focus:border-primary w-full font-inter";

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 text-left">
        <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
          Email Address
        </label>
        <Input
          value={validationResult?.data?.email || ""}
          disabled
          className={cn(fieldBase, "opacity-70 bg-transparent border-[#4E4637]/40 cursor-not-allowed")}
        />
        <p className="text-[10px] text-foreground-muted mt-1 font-inter">
          Email cannot be changed for this invitation.
        </p>
      </div>

      <div className="flex flex-col gap-2 text-left">
        <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
          Full Name
        </label>
        <Input
          name="fullName"
          placeholder="e.g. John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
          className={fieldBase}
        />
      </div>

      <div className="flex flex-col gap-2 text-left">
        <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
          Phone Number
        </label>
        <Input
          name="phone"
          placeholder="e.g. +251 911 234 567"
          value={formData.phone}
          onChange={handleChange}
          required
          className={fieldBase}
        />
      </div>

      <div className="flex flex-col gap-2 text-left">
        <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
          Company / Organization
        </label>
        <Input
          name="company"
          placeholder="e.g. Ethio Real Estate"
          value={formData.company}
          onChange={handleChange}
          required
          className={fieldBase}
        />
      </div>

      <div className="flex flex-col gap-2 text-left">
        <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
          Position / Title
        </label>
        <Input
          name="position"
          placeholder="e.g. CEO"
          value={formData.position}
          onChange={handleChange}
          required
          className={fieldBase}
        />
      </div>

      {completeMutation.isError && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded text-danger text-sm font-inter flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            {(completeMutation.error as any)?.response?.data?.message || "An error occurred while submitting your information."}
          </span>
        </div>
      )}

      <Button
        type="submit"
        isLoading={completeMutation.isPending}
        className="mt-4 w-full h-12 text-base"
      >
        Submit Invitation Details
      </Button>
    </motion.form>
  );
}
