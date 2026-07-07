"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle Mount and Unmount for Animations
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Ensure the browser paints the initial state before adding the transition classes
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    } else {
      setIsAnimating(false);
      // Wait for transition to finish before unmounting
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape Key Close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Focus Trap and Restore
  useEffect(() => {
    if (!isOpen) {
      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    // Save previous focus when modal opens
    if (!previousFocusRef.current) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    const modalEl = modalRef.current;
    if (!modalEl) return;

    const focusableElements = modalEl.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      // Focus after a short delay to allow rendering
      setTimeout(() => firstElement.focus(), 10);
    } else {
      modalEl.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (!focusableElements.length) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement || document.activeElement === modalEl) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    modalEl.addEventListener("keydown", handleTabKey);
    return () => modalEl.removeEventListener("keydown", handleTabKey);
  }, [isOpen, isMounted]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Content */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cn(
            "relative w-[calc(100vw-2rem)] sm:w-full max-w-[500px]",
            "bg-[#16130D] border border-primary/30",
            "p-6 sm:p-12 text-left",
            "flex flex-col items-center",
            "overflow-hidden break-words",
            "shadow-2xl",
            // Animation classes
            "transition-all duration-300 ease-out",
            isAnimating
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
