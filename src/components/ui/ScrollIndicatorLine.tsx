"use client";

import { motion } from "framer-motion";

// Single-use scroll indicator: the gold line itself travels down through a
// taller invisible track, fading out as it reaches the bottom, then resets
// and repeats — reads as a continuous "scroll down" cue.
export function ScrollIndicatorLine() {
  return (
    <div className="relative h-20 w-0.5 overflow-hidden 2xl:h-28 2xl:w-1">
      <motion.div
        className="absolute inset-x-0 top-0 h-8 w-full bg-linear-to-b from-primary to-transparent 2xl:h-12"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "220%", opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.7, 1],
        }}
      />
    </div>
  );
}
