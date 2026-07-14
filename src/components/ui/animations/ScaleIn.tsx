"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "./ease";
import { AnimationProps } from "@/types/ui";

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
