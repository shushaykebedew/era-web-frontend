"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { AnimationProps, StaggerContainerProps } from "@/types/ui";

// Default easing curve for a smooth, premium feel
export const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0]; // cubic-bezier

// ============================================================================
// FADE IN
// ============================================================================
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration, delay, ease },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={shouldReduceMotion ? {} : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SLIDE UP
// ============================================================================
export function SlideUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease },
    },
  };

  // Fallback to simple fade if reduced motion is preferred
  const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay, ease } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={shouldReduceMotion ? reducedMotionVariants : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SCALE IN
// ============================================================================
export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay, ease },
    },
  };

  const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay, ease } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={shouldReduceMotion ? reducedMotionVariants : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// PAGE TRANSITION
// ============================================================================
export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.3, ease },
    },
  };

  const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={shouldReduceMotion ? reducedMotionVariants : variants}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

export function StaggerContainer({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.1,
  once = true,
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Item to be used inside StaggerContainer
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease },
    },
  };

  const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease } },
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionVariants : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
