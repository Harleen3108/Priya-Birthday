"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BubbleText, PillBadge, SlideCard } from "./ui/BubbleText";
import { Starburst, Squiggle, DottedRing, PaginationDots } from "./Decorations";
import { creator, journey } from "@/lib/data";

export function JourneyTimeline() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <SlideCard id="journey">
        <Starburst className="absolute right-4 top-4 rotate-45 opacity-80" size={40} />
        <Squiggle className="absolute bottom-6 left-4 rotate-12 opacity-70" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* Profile + bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-1 flex-col gap-6"
          >
            <BubbleText as="h2" size="lg">
              About Me
            </BubbleText>

            <p className="font-body text-base leading-relaxed text-black/75 md:text-lg">
              {creator.bio}
            </p>

            <div>
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wider text-black/50">
                Specialized In
              </p>
              <div className="flex flex-wrap gap-2">
                {creator.specialties.map((skill) => (
                  <PillBadge key={skill}>{skill}</PillBadge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Circular profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto shrink-0 lg:mx-0"
          >
            <DottedRing className="absolute -inset-2" />
            <div className="profile-ring relative h-48 w-48 overflow-hidden rounded-full md:h-52 md:w-52">
              <Image
                src="/images/profile-photo.svg"
                alt={`${creator.name} profile`}
                fill
                className="object-cover"
                sizes="208px"
              />
            </div>
          </motion.div>
        </div>

        {/* Timeline milestones */}
        <div className="relative mt-12">
          <BubbleText as="h3" size="md" className="mb-8 text-center">
            Her Journey
          </BubbleText>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-hot-pink/30 md:left-1/2 md:block md:-translate-x-px" />

            <div className="flex flex-col gap-6">
              {journey.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 top-6 hidden h-3 w-3 rounded-full border-2 border-hot-pink bg-cream md:left-1/2 md:block md:-translate-x-1/2" />

                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="rounded-2xl bg-blush/50 p-5 md:inline-block">
                      <PillBadge className="mb-2">{item.year}</PillBadge>
                      <h4 className="font-body text-lg font-semibold text-black">{item.title}</h4>
                      <p className="mt-1 font-body text-sm text-black/65">{item.desc}</p>
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <PaginationDots total={6} active={1} className="mt-10" />
      </SlideCard>
    </section>
  );
}
