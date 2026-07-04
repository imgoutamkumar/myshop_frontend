"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "w-fit" | "w-full";
  delay?: number; // Allows us to stagger animations if needed
}

export const ScrollReveal = ({ children, width = "w-full", delay = 0 }: ScrollRevealProps) => {
  return (
    <div className={`relative ${width}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 }, // Starts invisible and 40px down
          visible: { opacity: 1, y: 0 }, // Fades in and slides up to 0px
        }}
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: true }} means the animation only plays the first time they scroll past
        // margin: "-10%" means it waits until the element is 10% into the screen before animating
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.8, // Slow, premium duration
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a buttery smooth stop
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};