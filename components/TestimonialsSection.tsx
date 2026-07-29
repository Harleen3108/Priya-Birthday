"use client";

import { motion } from "framer-motion";
import { BubbleText, PillBadge, SlideCard } from "./ui/BubbleText";
import { Starburst, PaginationDots } from "./Decorations";
import { testimonials, mediaKitStats } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <SlideCard id="testimonials">
        <Starburst className="absolute right-4 top-4 rotate-12 opacity-70" size={36} />

        <BubbleText as="h2" size="lg" className="mb-8 text-center">
          Kind Words
        </BubbleText>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-blush/50 p-6"
            >
              <p className="font-body text-sm italic leading-relaxed text-black/75">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <PillBadge variant="cream" className="text-xs">
                  {t.author} — {t.company}
                </PillBadge>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Media Kit Stats */}
        <div className="mt-10 rounded-2xl border border-hot-pink/20 bg-blush/30 p-6">
          <p className="mb-4 text-center font-body text-sm font-semibold uppercase tracking-wider text-black/50">
            Media Kit Highlights
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {mediaKitStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-display text-2xl font-bold text-hot-pink md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-body text-xs text-black/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <PaginationDots total={6} active={5} className="mt-10" />
      </SlideCard>
    </section>
  );
}
