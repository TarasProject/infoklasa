"use client";

import { useEffect, useRef } from "react";
import { createSort, stepSort, type SortState } from "@/lib/bubble-sort";
import { parseA11y } from "@/lib/prefs";
import { useStored, useSystemReducedMotion } from "./browser-store";

const BARS = 14;
const STEP_MS = 170;
const PAUSE_BEFORE_RESTART_MS = 1400;

const randomValues = () => Array.from({ length: BARS }, () => 0.15 + Math.random() * 0.85);

function finished(values: number[]): SortState {
  let state = createSort(values);
  while (!state.done) state = stepSort(state);
  return { ...state, active: null };
}

/** Banner animation: bubble sort on bars, one comparison per tick (lib/bubble-sort.ts). */
export default function SortViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useStored("theme");
  const a11y = useStored("a11y");
  const still = useSystemReducedMotion() || parseA11y(a11y).includes("motion");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    let state = still ? finished(randomValues()) : createSort(randomValues());

    const draw = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(box.width * ratio);
      canvas.height = Math.round(box.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, box.width, box.height);

      const pad = 28;
      const barWidth = (box.width - pad * 2) / BARS;
      const base = box.height - pad;
      const maxHeight = box.height - pad * 2 - 20;
      const count = state.values.length;
      state.values.forEach((value, index) => {
        const isActive = state.active?.includes(index);
        const isSorted = index >= count - state.sorted;
        ctx.fillStyle = isActive ? token("--accent") : isSorted ? token("--c-prog") : "rgba(255,255,255,.28)";
        ctx.beginPath();
        ctx.roundRect(pad + index * barWidth + 3, base - value * maxHeight, barWidth - 6, value * maxHeight, 4);
        ctx.fill();
      });
      ctx.fillStyle = "rgba(255,255,255,.55)";
      ctx.font = `12px ${token("--font-mono")}`;
      ctx.fillText(`bubble_sort · sorted=${state.sorted}/${count}`, pad, pad - 6);
    };

    draw();
    window.addEventListener("resize", draw);

    let restart: ReturnType<typeof setTimeout> | undefined;
    const timer = still
      ? undefined
      : setInterval(() => {
          if (state.done) {
            restart ??= setTimeout(() => {
              state = createSort(randomValues());
              restart = undefined;
              draw();
            }, PAUSE_BEFORE_RESTART_MS);
            return;
          }
          state = stepSort(state);
          draw();
        }, STEP_MS);

    return () => {
      window.removeEventListener("resize", draw);
      clearInterval(timer);
      clearTimeout(restart);
    };
    // `theme` is here so the bars are repainted with the new colours.
  }, [still, theme]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
