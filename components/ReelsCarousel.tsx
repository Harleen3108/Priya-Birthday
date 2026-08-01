"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BubbleText } from "./ui/BubbleText";
import { reels } from "@/lib/data";

/** Pull the shortcode out of any Instagram permalink (/reel/, /reels/, /p/, /tv/). */
function reelCode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

const OVERSCAN = 0.06; // slack at each end so the rail never sits flush to the edge

export function ReelsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState({ from: 0, to: 0 });
  const reduceMotion = useReducedMotion();

  // How far the rail travels: its overflow past the container, plus a little slack.
  useEffect(() => {
    const measure = () => {
      const view = viewportRef.current;
      const track = trackRef.current;
      if (!view || !track) return;
      const slack = view.clientWidth * OVERSCAN;
      const overflow = Math.max(0, track.scrollWidth - view.clientWidth);
      setRange({ from: slack, to: -(overflow + slack) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 0 as the section enters the viewport, 1 as it leaves. No pinning, no spacer.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // The inertia: the rail eases toward the scroll position instead of snapping to it.
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const x = useTransform(progress, [0, 1], [range.from, range.to]);
  const glowA = useTransform(progress, [0, 1], [40, -120]);
  const glowB = useTransform(progress, [0, 1], [120, -60]);

  if (reels.length === 0) return null;

  // Reduced motion: a plain swipeable strip, no scroll-linked movement at all.
  if (reduceMotion) {
    return (
      <section id="reels" className="mx-auto w-full max-w-6xl px-4 py-16">
        <BubbleText as="h2" size="lg" className="mb-8 text-center">
          Famous Reels
        </BubbleText>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2">
          {reels.map((reel, i) => (
            <div key={reel.url} className="w-[290px] shrink-0 snap-start sm:w-[320px]">
              <ReelFrame reel={reel} index={i} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="reels" className="relative overflow-hidden py-16 md:py-24">
      {/* depth layer — drifts slower than the rail */}
      <motion.div
        aria-hidden
        style={{ x: glowA }}
        className="pointer-events-none absolute -left-32 top-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(244,91,158,0.14),transparent_70%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ x: glowB }}
        className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,214,165,0.22),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto mb-10 w-full max-w-6xl px-4">
        <BubbleText as="h2" size="lg" className="text-center">
          Famous Reels
        </BubbleText>
        <p className="mt-2 text-center font-body text-sm tracking-wide text-black/45">
          The ones everyone keeps sending back 💖
        </p>
      </div>

      <div ref={viewportRef} className="relative">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-6 px-6 will-change-transform md:gap-10 md:px-12"
        >
          {reels.map((reel, i) => (
            <ReelCard key={reel.url} reel={reel} index={i} progress={progress} />
          ))}
        </motion.div>

        {/* edge fades, so cards dissolve out rather than getting chopped */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent md:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent md:w-24"
        />
      </div>
    </section>
  );
}

/** One card. The frame rides the rail; the media inside lags slightly — that's the parallax. */
function ReelCard({
  reel,
  index,
  progress,
}: {
  reel: { url: string; title?: string };
  index: number;
  progress: MotionValue<number>;
}) {
  // Staggered by index so the row breathes instead of moving as one rigid block.
  const depth = 0.4 + (index % 3) * 0.3;
  const y = useTransform(progress, [0, 1], [18 * depth, -18 * depth]);

  return (
    <motion.div style={{ y }} className="w-[290px] shrink-0 sm:w-[320px]">
      <ReelFrame reel={reel} index={index} />
    </motion.div>
  );
}

/** The card shell + Instagram embed. Shared by both paths. */
function ReelFrame({
  reel,
  index,
}: {
  reel: { url: string; title?: string };
  index: number;
}) {
  const code = reelCode(reel.url);

  return (
    <div className="group relative rounded-2xl bg-white p-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.04] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_64px_-24px_rgba(244,91,158,0.45)]">
      <div className="relative overflow-hidden rounded-xl bg-blush/30">
        {code ? (
          <iframe
            src={`https://www.instagram.com/reel/${code}/embed`}
            title={reel.title ?? `Reel ${index + 1}`}
            loading="lazy"
            allowFullScreen
            scrolling="no"
            className="block h-[540px] w-full border-0"
          />
        ) : (
          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[540px] w-full items-center justify-center px-6 text-center font-body text-sm text-black/60 underline"
          >
            Open this reel on Instagram ↗
          </a>
        )}
      </div>
      {reel.title && (
        <p className="mt-2 px-1 pb-1 font-body text-sm font-semibold text-black">{reel.title}</p>
      )}
    </div>
  );
}
