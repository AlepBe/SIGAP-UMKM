"use client";

import { motion, useReducedMotion } from "motion/react";

interface GrowthBarsProps {
  items: { label: string; value: number; display: string }[];
  summary: string;
}

export function GrowthBars({ items, summary }: GrowthBarsProps) {
  const reduceMotion = useReducedMotion();
  const max = Math.max(...items.map((item) => item.value));

  return (
    <div role="img" aria-label={summary}>
      <div className="flex h-52 items-end gap-3">
        {items.map((item, index) => {
          const height = `${(item.value / max) * 100}%`;
          return (
            <motion.div
              key={item.label}
              className="flex-1 rounded-t-2xl bg-sigap-light"
              initial={{ height: reduceMotion ? height : 0 }}
              whileInView={{ height }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex gap-3 text-sm text-sigap-light/80">
        {items.map((item) => (
          <div key={item.label} className="flex-1">
            <p>{item.label}</p>
            <p className="font-semibold text-white">{item.display}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
