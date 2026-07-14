"use client";

import { Modal } from "./Modal";
import { AuthForm } from "./AuthForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-120">
      <div className="w-full">
        <h2 className="font-display text-[28px] sm:text-[32px] font-semibold text-foreground leading-10 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="font-inter text-foreground-muted text-sm sm:text-base leading-relaxed text-center mb-6">
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
