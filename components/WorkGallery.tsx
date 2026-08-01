"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BubbleText, PillBadge, SlideCard } from "./ui/BubbleText";
import { Starburst, WashiTape, PaginationDots } from "./Decorations";
import { workSamples } from "@/lib/data";

export function WorkGallery() {
  const [lightbox, setLightbox] = useState<(typeof workSamples)[0] | null>(null);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <SlideCard id="work">
        <Starburst className="absolute left-4 top-4 -rotate-12 opacity-70" size={36} />
        <WashiTape id="work-tape" className="absolute right-6 top-4 rotate-[-10deg]" />

        <BubbleText as="h2" size="lg" className="mb-2 text-center">
          Selected Work
        </BubbleText>
        <p className="mb-8 text-center font-body text-sm text-black/50">
          Campaigns, collabs & content that made noise
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {workSamples.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setLightbox(item)}
              className="group cursor-pointer text-left"
              style={{ "--rotate": `${-2 + (i % 3) * 2}deg` } as React.CSSProperties}
            >
              <div className="polaroid">
                <div className="relative aspect-[4/3] overflow-hidden bg-blush">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-3 px-1">
                  <PillBadge className="mb-2 text-xs">{item.category}</PillBadge>
                  <h3 className="font-body text-base font-semibold text-black">{item.title}</h3>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <PaginationDots total={6} active={3} className="mt-10" />

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-3xl bg-cream p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 font-body text-sm hover:bg-black/20"
                  aria-label="Close"
                >
                  ✕
                </button>
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-blush">
                  <Image
                    src={lightbox.image}
                    alt={lightbox.title}
                    fill
                    className="object-cover object-top"
                    sizes="512px"
                  />
                </div>
                <PillBadge className="mb-2">{lightbox.category}</PillBadge>
                <h3 className="font-body text-xl font-bold text-black">{lightbox.title}</h3>
                <p className="mt-2 font-body text-sm text-black/70">{lightbox.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </SlideCard>
    </section>
  );
}
