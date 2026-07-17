"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ease } from "./animations";
import { ModalProps } from "@/types/ui";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export function Modal({ isOpen, onClose, children, className, ariaLabel }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Body Scroll Lock
  useBodyScrollLock(isOpen);

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
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
        if (
          document.activeElement === firstElement ||
          document.activeElement === modalEl
        ) {
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
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease } },
    exit: { opacity: 0, transition: { duration: 0.2, ease } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.3, ease },
    },
  };

  const reducedMotionModalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease } },
    exit: { opacity: 0, transition: { duration: 0.2, ease } },
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
            {/* Backdrop */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal Content */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              tabIndex={-1}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={
                shouldReduceMotion ? reducedMotionModalVariants : modalVariants
              }
              className={cn(
                "relative w-[calc(100vw-2rem)] sm:w-full max-w-110 2xl:max-w-150",
                "bg-[#16130D] border border-primary/30",
                "p-6 sm:p-12 text-left",
                "flex flex-col items-center",
                "overflow-hidden wrap-break-word",
                "shadow-2xl",
                className,
              )}
            >
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
