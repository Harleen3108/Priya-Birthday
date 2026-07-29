"use client";

import confetti from "canvas-confetti";

export function fireConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  const colors = ["#F45B9E", "#F9D9DE", "#FBF8F3", "#1a1a1a", "#FFD700"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors,
  });
}

export function fireMiniConfetti() {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.7 },
    colors: ["#F45B9E", "#F9D9DE", "#FFD700"],
  });
}
