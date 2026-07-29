"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { AnimatedWish } from "./AnimatedWish";
import { fireConfetti } from "./Confetti";
import { useAudioPlayer } from "./AudioPlayer";
import { Sparkle } from "./Decorations";
import { birthdayWish } from "@/lib/data";

type CardPhase = "closed" | "opening" | "open" | "transitioning";

export function BirthdayCard() {
  const [phase, setPhase] = useState<CardPhase>("closed");
  const router = useRouter();
  const audio = useAudioPlayer();

  const handleOpen = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    fireConfetti();
    audio.play();

    setTimeout(() => setPhase("open"), 800);
  };

  const handleGoToPortfolio = () => {
    setPhase("transitioning");
    audio.fadeOut(1500);
    setTimeout(() => router.push("/portfolio"), 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden stipple-bg">
      {/* Floating sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${8 + (i * 7.5) % 85}%`,
            top: `${10 + (i * 11) % 80}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkle />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {phase !== "transitioning" && (
          <motion.div
            key="card"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
            transition={{ duration: 1 }}
            className="relative z-10 px-4"
          >
            {/* Closed / Opening envelope */}
            {(phase === "closed" || phase === "opening") && (
              <motion.div
                className="relative cursor-pointer"
                onClick={handleOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Pulsing glow */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl bg-hot-pink/20 blur-xl"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Envelope */}
                <div className="relative w-[min(90vw,380px)]">
                  {/* Envelope body */}
                  <div className="relative overflow-hidden rounded-2xl bg-cream shadow-card">
                    <div className="aspect-[4/3] flex flex-col items-center justify-center p-8">
                      <motion.div
                        animate={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mb-4 text-6xl"
                      >
                        🎂
                      </motion.div>
                      <p className="font-display text-2xl font-bold text-hot-pink bubble-text-sm">
                        For You
                      </p>
                      <motion.p
                        className="mt-6 font-body text-sm font-medium text-black/60"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Tap to Open 🎂
                      </motion.p>
                    </div>

                    {/* Envelope flap */}
                    <motion.div
                      className="absolute inset-x-0 top-0 origin-top"
                      style={{ perspective: 800 }}
                      animate={
                        phase === "opening"
                          ? { rotateX: -180, zIndex: 0 }
                          : { rotateX: 0 }
                      }
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <div
                        className="h-24 w-full"
                        style={{
                          background:
                            "linear-gradient(135deg, #F45B9E 0%, #F9D9DE 50%, #F45B9E 100%)",
                          clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Open card with wish message */}
            {phase === "open" && (
              <motion.div
                initial={{ opacity: 0, y: 40, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
                className="w-[min(90vw,480px)]"
              >
                <div className="relative overflow-hidden rounded-3xl bg-cream p-8 shadow-card md:p-10">
                  {/* Decorative corner hearts */}
                  <span className="absolute right-4 top-4 text-2xl opacity-60">💖</span>
                  <span className="absolute bottom-4 left-4 text-xl opacity-40">✨</span>

                  <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="font-display mb-6 text-center text-3xl font-bold text-hot-pink bubble-text-sm md:text-4xl"
                  >
                    Happy Birthday {birthdayWish.name}! 🎉
                  </motion.h1>

                  <AnimatedWish text={birthdayWish.message} className="mb-8 text-center" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={handleGoToPortfolio}
                      className="group relative overflow-hidden rounded-full bg-hot-pink px-8 py-3 font-body text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      <span className="relative z-10">Open Your Gift 🎁</span>
                      <motion.span
                        className="absolute inset-0 bg-black/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition overlay */}
      <AnimatePresence>
        {phase === "transitioning" && (
          <motion.div
            initial={{ scale: 0, borderRadius: "50%" }}
            animate={{ scale: 4, borderRadius: "0%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 origin-center bg-blush"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
