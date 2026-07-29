"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti } from "./Confetti";

/**
 * Animated "Happy Birthday" hero that plays through 5 timed steps:
 *  1. Initial Load     — soft particles & gradient background appears
 *  2. Text Reveal      — "Happy Birthday <name>" fades & slides in
 *  3. Image & Elements — profile photo, balloons, cake & polaroid animate in
 *  4. Full Celebration — everything visible + confetti burst
 *  5. Smooth Hold & Fade — settles, then a gentle "scroll down" cue
 */

const STEP_TIMINGS = {
  particles: 0, // step 1 — "Priya♡" intro on gradient + particles
  textCenter: 1500, // step 2a — "Happy Birthday" appears centered
  text: 2700, // step 2b — heading glides to its left position
  elements: 3800, // step 3 — photo, balloons, cake animate in
  celebration: 4700, // step 4 — confetti burst
  settled: 6400, // step 5 — hold & settle
} as const;

type Stage = "load" | "textCenter" | "text" | "elements" | "celebration" | "settled";

interface BirthdayHeroProps {
  name?: string;
  photoSrc?: string;
  message?: string;
  onExplore?: () => void;
}

export function BirthdayHero({
  name = "Priya",
  photoSrc = "/images/hero-photo.svg",
  message = "To the creator who inspires thousands every day, may this year bring more happiness, success, adventures, and millions more smiles! ✨",
  onExplore,
}: BirthdayHeroProps) {
  const [stage, setStage] = useState<Stage>("load");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage("textCenter"), STEP_TIMINGS.textCenter),
      setTimeout(() => setStage("text"), STEP_TIMINGS.text),
      setTimeout(() => setStage("elements"), STEP_TIMINGS.elements),
      setTimeout(() => {
        setStage("celebration");
        fireConfetti();
      }, STEP_TIMINGS.celebration),
      setTimeout(() => setStage("settled"), STEP_TIMINGS.settled),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const intro = stage === "load";
  const headingCentered = stage === "textCenter";
  const showText = stage === "text" || stage === "elements" || stage === "celebration" || stage === "settled";
  const showElements = stage === "elements" || stage === "celebration" || stage === "settled";

  const exploreButton = (displayClass: string) => (
    <motion.button
      onClick={onExplore}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`group items-center gap-3 rounded-full bg-hot-pink px-8 py-4 font-body text-base font-semibold text-white shadow-lg shadow-hot-pink/30 ${displayClass}`}
    >
      Explore My Journey
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </motion.button>
  );

  return (
    <section className="birthday-hero relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* ── Step 1: gradient background + soft particles ── */}
      <div className="pointer-events-none absolute inset-0 birthday-gradient" />
      <FloatingParticles />
      {/* scattered balloons/flowers reveal together with the elements (steps 3+) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: showElements ? 1 : 0 }}
      >
        <BackgroundDecor />
      </div>

      {/* left-side decorative column (fills the empty space on the left) */}
      <AnimatePresence>
        {showElements && (
          <motion.div
            key="left-decor"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="pointer-events-none absolute bottom-0 left-0 z-0 hidden w-[280px] min-[1760px]:block"
          >
            <Image
              src="/bb11.png"
              alt=""
              width={320}
              height={580}
              className="h-auto w-full object-contain drop-shadow-md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Step 1: "Priya♡" centered intro splash ── */}
      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <span className="font-script text-6xl text-black md:text-7xl">
              {name}
              <span className="text-hot-pink">♡</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Step 2a: "Happy Birthday <name>" appears centered, then glides left ── */}
      {headingCentered && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <motion.div
            layoutId="bday-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, layout: { duration: 0.8, ease: "easeInOut" } }}
            className="text-center"
          >
            <p className="font-script text-4xl text-black md:text-5xl">Happy</p>
            <h1 className="font-script -mt-2 text-7xl leading-none text-hot-pink drop-shadow-sm md:text-8xl">
              Birthday
            </h1>
            <p className="font-script mt-1 text-5xl text-black md:text-6xl">
              {name}
              <span className="text-hot-pink">♡</span>
            </p>
          </motion.div>
        </div>
      )}

      {/* ── Top navigation (appears once heading settles left) ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6"
      >
        <span className="font-script text-3xl text-black">
          {name}
          <span className="text-hot-pink">♡</span>
        </span>
        <div className="flex items-center gap-3 text-lg">
          <span className="cursor-pointer opacity-70 transition-opacity hover:opacity-100">📷</span>
          <span className="cursor-pointer opacity-70 transition-opacity hover:opacity-100">▶️</span>
          <span className="cursor-pointer opacity-70 transition-opacity hover:opacity-100">💬</span>
        </div>
      </motion.nav>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-8 px-6 pb-10 md:grid-cols-2 md:gap-10">
        {/* Left: birthday text (Step 2) */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {showText && (
            <div className="w-full">
              {/* heading shares layoutId with the centered version → glides into place */}
              <motion.div
                layoutId="bday-heading"
                transition={{ layout: { duration: 0.8, ease: "easeInOut" } }}
                className="text-center md:text-left"
              >
                <p className="font-script text-4xl text-black md:text-5xl">Happy</p>
                <h1 className="font-script -mt-2 text-7xl leading-none text-hot-pink drop-shadow-sm md:text-8xl">
                  Birthday
                </h1>
                <p className="font-script mt-1 text-5xl text-black md:text-6xl">
                  {name}
                  <span className="text-hot-pink">♡</span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-black/60 md:mx-0 md:text-base"
              >
                {message}
              </motion.p>

              {/* desktop: button under the text */}
              {exploreButton("mt-8 hidden md:inline-flex")}
            </div>
          )}

        </div>

        {/* Right: photo + balloons + cake + polaroid (Step 3) */}
        <div className="relative flex flex-col items-center justify-center">
          <AnimatePresence>
            {showElements && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 90 }}
                className="relative h-[360px] w-[360px] md:h-[440px] md:w-[440px]"
              >
                {/* Luxury layered portrait frame */}
                <div className="lux-frame absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 md:h-[380px] md:w-[380px]">
                  {/* glow layers */}
                  <div className="lux-bloom" />
                  <div className="lux-halo" />
                  <div className="lux-shimmer" />

                  {/* metallic gold ring → pink ring → white ring → photo */}
                  <div className="lux-ring-gold relative z-10 h-full w-full rounded-full p-[7px]">
                    <div className="lux-ring-pink h-full w-full rounded-full p-[6px]">
                      <div className="h-full w-full rounded-full bg-white/85 p-[4px]">
                        <div className="relative h-full w-full overflow-hidden rounded-full shadow-inner">
                          <Image
                            src={photoSrc}
                            alt={name}
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="380px"
                          />
                          {/* glossy glass reflection + inner glow */}
                          <div className="lux-glass pointer-events-none absolute inset-0 rounded-full" />
                          <div className="lux-inner-glow pointer-events-none absolute inset-0 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* twinkling sparkles + floating hearts around the frame */}
                  <FrameSparkles />
                </div>

                {/* Balloon bunch — top right */}
                <FloatingImage
                  src="/b1.png"
                  alt="Balloons"
                  className="-right-6 -top-6 z-20 w-28 md:w-36"
                  delay={0.2}
                />

                {/* Single pink balloon — top left */}
                <FloatingImage
                  src="/b2.png"
                  alt="Balloon"
                  className="-left-4 top-0 z-20 w-16 md:w-20"
                  delay={0.45}
                />

                {/* Cake — bottom right */}
                <FloatingImage
                  src="/cake.png"
                  alt="Cake"
                  className="-bottom-6 -right-4 z-20 w-28 md:w-36"
                  delay={0.55}
                />

                {/* Flower bouquet — bottom left */}
                <FloatingImage
                  src="/flower.png"
                  alt="Flowers"
                  className="left-10 -bottom-4 z-20 w-20 md:w-24"
                  delay={0.65}
                />

                {/* Soft cloud — behind, top-left backdrop */}
                <FloatingImage
                  src="/cloud.png"
                  alt=""
                  className="-left-16 -top-8 z-0 w-28 opacity-70 md:w-36"
                  delay={0.15}
                />

                {/* Bow — sitting on top of the frame */}
                <FloatingImage
                  src="/bow.png"
                  alt="Bow"
                  className="left-[38%] -top-10 z-30 w-16 md:w-20"
                  delay={0.75}
                />

                {/* Camera — left side */}
                <FloatingImage
                  src="/camera.png"
                  alt="Camera"
                  className="-left-8 top-[38%] z-20 w-14 md:w-16"
                  delay={0.85}
                />

                {/* Cocktail — right side */}
                <FloatingImage
                  src="/drink.png"
                  alt="Drink"
                  className="-right-7 top-[46%] z-20 w-12 md:w-14"
                  delay={0.95}
                />

                {/* Polaroid */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotate: -12 }}
                  animate={{ opacity: 1, x: 0, rotate: -8 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                  className="absolute -left-2 bottom-4 w-28 rounded-sm bg-white p-2 pb-6 shadow-lg md:-left-6"
                >
                  <div className="flex aspect-square items-center justify-center rounded-sm bg-blush/60">
                    <span className="text-center font-script text-sm leading-tight text-black/70">
                      Grateful
                      <br />
                      Thankful
                      <br />
                      Blessed
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* mobile: button after the image */}
          {showText && exploreButton("mt-10 inline-flex md:hidden")}
        </div>
      </div>
    </section>
  );
}

/* ── Step 1 helper: drifting soft particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 5.4) % 100;
        const size = 4 + (i % 4) * 3;
        const duration = 6 + (i % 5);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/70 blur-[1px]"
            style={{
              left: `${left}%`,
              top: `${(i * 7) % 100}%`,
              width: size,
              height: size,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration, repeat: Infinity, delay: i * 0.2 }}
          />
        );
      })}
    </div>
  );
}

/* ── scattered, faded balloons & flowers across the whole background ── */
const BG_DECOR = [
  { src: "/b2.png", left: "6%", top: "12%", size: 70, rotate: -8, opacity: 0.35 },
  { src: "/flower.png", left: "14%", top: "68%", size: 80, rotate: 6, opacity: 0.3 },
  { src: "/b2.png", left: "32%", top: "82%", size: 55, rotate: 10, opacity: 0.28 },
  { src: "/flower.png", left: "44%", top: "8%", size: 60, rotate: -10, opacity: 0.3 },
  { src: "/b2.png", left: "60%", top: "72%", size: 65, rotate: 8, opacity: 0.3 },
  { src: "/b1.png", left: "2%", top: "40%", size: 90, rotate: 0, opacity: 0.22 },
  { src: "/flower.png", left: "88%", top: "18%", size: 70, rotate: 12, opacity: 0.28 },
  { src: "/b2.png", left: "78%", top: "4%", size: 50, rotate: -12, opacity: 0.3 },
];

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {BG_DECOR.map((d, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            opacity: d.opacity,
            transform: `rotate(${d.rotate}deg)`,
          }}
        >
          <Image src={d.src} alt="" width={120} height={140} className="h-auto w-full" />
        </div>
      ))}
    </div>
  );
}

/* ── reusable floating decoration image (balloons, cake, flowers) ── */
function FloatingImage({
  src,
  alt,
  className = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 110 }}
      className={`absolute ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={220}
        className="h-auto w-full drop-shadow-md"
      />
    </motion.div>
  );
}

/* ── twinkling sparkles + floating hearts hugging the luxury frame ── */
const FRAME_SPARKLES = [
  { left: "48%", top: "-4%", size: 8, delay: 0 },
  { left: "88%", top: "10%", size: 6, delay: 0.6 },
  { left: "102%", top: "44%", size: 9, delay: 1.1 },
  { left: "90%", top: "82%", size: 6, delay: 0.3 },
  { left: "50%", top: "102%", size: 8, delay: 0.9 },
  { left: "10%", top: "86%", size: 7, delay: 1.4 },
  { left: "-3%", top: "46%", size: 9, delay: 0.5 },
  { left: "8%", top: "10%", size: 6, delay: 1.7 },
  { left: "70%", top: "-2%", size: 5, delay: 1.2 },
  { left: "28%", top: "96%", size: 5, delay: 0.2 },
];

const FRAME_HEARTS = [
  { left: "-6%", top: "30%", size: 16, delay: 0 },
  { left: "96%", top: "24%", size: 14, delay: 1.6 },
  { left: "94%", top: "66%", size: 18, delay: 3.1 },
  { left: "2%", top: "68%", size: 13, delay: 2.2 },
];

function FrameSparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {FRAME_SPARKLES.map((s, i) => (
        <span
          key={`s${i}`}
          className="lux-sparkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {FRAME_HEARTS.map((h, i) => (
        <span
          key={`h${i}`}
          className="lux-heart"
          style={{
            left: h.left,
            top: h.top,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
