"use client";

import { Modal } from "../ui/Modal";
import { AuthForm } from "./AuthForm";
import { cn } from "@/utils/cn";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-100 2xl:max-w-150"
    >
      <div className="w-full">
        <h2
          className={cn(
            "font-display text-center text-[24px] sm:text-[32px]",
            "2xl:text-[36px] font-semibold leading-10 text-foreground mb-4",
          )}
        >
          Welcome Back
        </h2>
        <p
          className={cn(
            "font-inter text-center text-foreground-muted text-sm sm:text-base",
            "2xl:text-[20px] leading-relaxed mb-8 max-w-85 2xl:max-w-100 mx-auto",
          )}
        >
          Sign in to access your dashboard and cast your vote.
        </p>
        <AuthForm
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
        />
      </div>
    </Modal>
  );
}
