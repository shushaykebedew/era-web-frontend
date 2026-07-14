"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "./ease";
import { AnimationProps } from "@/types/ui";

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
