"use client";

import { useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";

interface AudioPlayerHandle {
  play: () => void;
  pause: () => void;
  fadeOut: (duration?: number) => void;
  fadeIn: (duration?: number) => void;
  setVolume: (volume: number) => void;
}

let globalHowl: Howl | null = null;

export function useAudioPlayer(src = "/audio/birthday-song.mp3"): AudioPlayerHandle {
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!globalHowl) {
      globalHowl = new Howl({
        src: [src],
        loop: true,
        volume: 0.6,
        html5: true,
        preload: true,
        onloaderror: () => {
          console.warn("Birthday song not found — add public/audio/birthday-song.mp3");
        },
      });
    }
    howlRef.current = globalHowl;

    return () => {
      // Keep instance alive for page transition fade
    };
  }, [src]);

  const play = useCallback(() => {
    howlRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const fadeOut = useCallback((duration = 1500) => {
    const howl = howlRef.current;
    if (!howl) return;
    const currentVol = howl.volume();
    howl.fade(currentVol, 0, duration);
    setTimeout(() => howl.pause(), duration);
  }, []);

  const fadeIn = useCallback((duration = 1000) => {
    const howl = howlRef.current;
    if (!howl) return;
    howl.volume(0);
    howl.play();
    howl.fade(0, 0.3, duration);
  }, []);

  const setVolume = useCallback((volume: number) => {
    howlRef.current?.volume(volume);
  }, []);

  return { play, pause, fadeOut, fadeIn, setVolume };
}
