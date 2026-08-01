"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BubbleText, PillBadge } from "./ui/BubbleText";
import { Starburst, Flower, WashiTape, PaginationDots } from "./Decorations";
import { creator } from "@/lib/data";

export function Hero() {
  return (
    <section id="hero" className="relative mx-auto w-full max-w-6xl px-4 pt-8 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-cream p-6 shadow-card md:p-10 lg:p-14"
      >
        {/* Corner decorations */}
        <Starburst className="absolute -left-2 -top-2 rotate-12 opacity-90 md:left-2 md:top-2" size={60} />
        <Starburst className="absolute -bottom-2 -right-2 -rotate-45 opacity-90 md:bottom-2 md:right-2" size={50} />
        <WashiTape id="hero-tape" className="absolute -right-2 top-6 rotate-[-8deg] md:right-8 md:top-8" />

        <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-end md:gap-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative shrink-0"
          >
            <div className="relative h-64 w-52 overflow-hidden rounded-2xl md:h-80 md:w-64">
              <Image
                src="/images/hero-photo.jpg"
                alt={creator.name}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 208px, 256px"
              />
            </div>
          </motion.div>

          {/* Wordmark */}
          <div className="flex flex-1 flex-col items-center md:items-start">
            <div className="relative">
              <Flower className="absolute -right-4 -top-2 md:-right-6 md:-top-4" size={28} />
              <BubbleText as="h1" size="hero" className="text-center md:text-left">
                <span className="block">PORT</span>
                <span className="block">FOLIO</span>
              </BubbleText>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-script mt-4 text-3xl text-hot-pink md:text-4xl"
            >
              {creator.name}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              {creator.roles.map((role, i) => (
                <span key={role} className="flex items-center gap-2">
                  {i > 0 && <span className="text-hot-pink">•</span>}
                  <PillBadge>{role}</PillBadge>
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-3 font-body text-sm text-black/60 md:text-base"
            >
              {creator.tagline}
            </motion.p>
          </div>
        </div>

        <PaginationDots total={6} active={0} className="mt-8" />
      </motion.div>
    </section>
  );
}
