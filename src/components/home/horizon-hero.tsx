"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

type HorizonPosition = "ground" | "horizon" | "sky";

export function HorizonHero() {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState<HorizonPosition>("horizon");

  const cyclePosition = useCallback(() => {
    setPosition((current) => {
      if (current === "ground") return "horizon";
      if (current === "horizon") return "sky";
      return "ground";
    });
  }, []);

  const skyOffset =
    position === "ground" ? 70 : position === "horizon" ? 35 : 0;

  return (
    <section
      className="relative flex min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border"
      aria-label="Living Atlas horizon"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ y: prefersReducedMotion ? 0 : `${skyOffset}%` }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--sky-midnight)] via-[var(--sky-atmosphere)] to-[var(--sky-violet)]"
          aria-hidden
        />
        <div
          className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[var(--ground-asphalt)] via-[var(--ground-mineral)] to-[var(--ground-vegetation)]"
          aria-hidden
        />
      </motion.div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--sky-lunar)]">
          Living Atlas SA
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[var(--sky-starlight)] sm:text-5xl">
          Everything around you has a story
        </h1>
        <p className="max-w-xl text-lg text-[var(--sky-lunar)]">
          Explore the roads beneath you, the sky above you, and the history
          connecting them.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="ground" asChild>
            <Link href="/ground">Explore the Ground</Link>
          </Button>
          <Button variant="sky" asChild>
            <Link href="/sky">Explore the Sky</Link>
          </Button>
        </div>
        <button
          type="button"
          onClick={cyclePosition}
          className="mt-4 text-sm text-[var(--sky-lunar)] underline-offset-4 hover:underline"
          aria-label="Shift horizon between ground and sky"
        >
          Drag the horizon — tap to preview
        </button>
      </div>
    </section>
  );
}
