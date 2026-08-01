"use client";

import { Hero } from "@/components/Hero";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { ChannelsGrid } from "@/components/ChannelsGrid";
import { ReelsCarousel } from "@/components/ReelsCarousel";
import { WorkGallery } from "@/components/WorkGallery";
import { ContactForm } from "@/components/ContactForm";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { creator, channels } from "@/lib/data";

export default function PortfolioPage() {
  return (
    <main className="page-bg pb-16">
      <Hero />
      <JourneyTimeline />
      <ChannelsGrid />
      <ReelsCarousel />
      <WorkGallery />
      <TestimonialsSection />
      <ContactForm />

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 pt-8 text-center">
        <p className="font-script text-2xl text-hot-pink">Thanks for stopping by! ✨</p>
        <p className="mt-2 font-body text-sm text-black/40">
          © {new Date().getFullYear()} {creator.name} — {creator.tagline}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          {channels.map((ch) => (
            <a
              key={ch.platform}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-black/40 transition-colors hover:text-hot-pink"
            >
              {ch.platform}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
