"use client";

import { BirthdayHero } from "@/components/BirthdayHero";

export default function WishPage() {
  return (
    <main>
      <BirthdayHero
        name="Priya"
        photoSrc="/priya.jpg"
        onExplore={() => {
          document.getElementById("next")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      {/* Placeholder next section so the "Explore My Journey" / scroll cue has somewhere to go */}
      <section
        id="next"
        className="flex min-h-screen items-center justify-center bg-cream px-6 text-center"
      >
        <p className="font-script text-4xl text-hot-pink">
          Your journey continues here… 💖
        </p>
      </section>
    </main>
  );
}
