"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BubbleText, SlideCard } from "./ui/BubbleText";
import { Squiggle, Starburst, PaginationDots } from "./Decorations";
import { fireMiniConfetti } from "./Confetti";

const projectTypes = [
  "Brand Collaboration",
  "Content Creation",
  "Social Media Strategy",
  "Campaign Management",
  "Other",
];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", projectType: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      fireMiniConfetti();
      setForm({ name: "", email: "", message: "", projectType: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <SlideCard id="contact">
        <Starburst className="absolute -left-2 bottom-8 rotate-45 opacity-60" size={44} />
        <Squiggle className="absolute right-8 top-8 rotate-180 opacity-50" />

        <BubbleText as="h2" size="lg" className="mb-2 text-center">
          Contact Me
        </BubbleText>
        <p className="mb-8 text-center font-body text-sm text-black/50">
          Let&apos;s create something amazing together
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-12 text-center"
            >
              <span className="text-5xl">💌</span>
              <BubbleText as="h3" size="md">
                Message Sent!
              </BubbleText>
              <p className="font-body text-black/60">Thanks for reaching out — I&apos;ll get back to you soon!</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 font-body text-sm text-hot-pink underline hover:no-underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="mx-auto max-w-lg space-y-5"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block font-body text-sm font-medium text-black/70">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-body text-sm transition-colors focus:border-hot-pink"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block font-body text-sm font-medium text-black/70">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-body text-sm transition-colors focus:border-hot-pink"
                  placeholder="you@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="projectType" className="mb-1.5 block font-body text-sm font-medium text-black/70">
                  Project Type
                </label>
                <select
                  id="projectType"
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-body text-sm transition-colors focus:border-hot-pink"
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block font-body text-sm font-medium text-black/70">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 font-body text-sm transition-colors focus:border-hot-pink"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {status === "error" && errorMsg && (
                <p className="font-body text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-hot-pink py-3.5 font-body text-base font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message 💌"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <PaginationDots total={6} active={4} className="mt-10" />
      </SlideCard>
    </section>
  );
}
