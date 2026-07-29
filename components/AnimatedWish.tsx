"use client";

import { motion } from "framer-motion";

interface AnimatedWishProps {
  text: string;
  className?: string;
}

export function AnimatedWish({ text, className = "" }: AnimatedWishProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 16, rotate: -2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 15 },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      className={`font-body text-base leading-relaxed text-black/80 md:text-lg ${className}`}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariant} className="mr-[0.3em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
