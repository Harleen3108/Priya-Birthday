"use client";

import { motion } from "framer-motion";
import { BubbleText, SlideCard } from "./ui/BubbleText";
import { Squiggle, PaginationDots } from "./Decorations";
import { channels } from "@/lib/data";

const platformIcons: Record<string, string> = {
  Instagram: "📸",
  TikTok: "🎵",
  YouTube: "▶️",
  LinkedIn: "💼",
};

export function ChannelsGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <SlideCard id="channels">
        <Squiggle className="absolute right-6 top-6 -rotate-12 opacity-60" />

        <BubbleText as="h2" size="lg" className="mb-8 text-center">
          Find Me Online
        </BubbleText>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {channels.map((channel, i) => (
            <motion.a
              key={channel.platform}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 + i * 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 + i * 2 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="sticker-hover flex flex-col items-center gap-3 rounded-full bg-blush/60 p-6 text-center shadow-md"
              style={{ transform: `rotate(${-4 + i * 2.5}deg)` }}
            >
              <span className="text-4xl">{platformIcons[channel.platform] ?? "🔗"}</span>
              <span className="font-body text-sm font-semibold text-black">
                {channel.platform}
              </span>
              <span className="font-script text-lg text-hot-pink">{channel.handle}</span>
              {channel.followers && (
                <span className="font-body text-xs text-black/50">{channel.followers} followers</span>
              )}
            </motion.a>
          ))}
        </div>

        <PaginationDots total={6} active={2} className="mt-10" />
      </SlideCard>
    </section>
  );
}
