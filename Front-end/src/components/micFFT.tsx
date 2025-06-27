"use client";

import { cn } from "../utils";
import { motion } from "framer-motion";
import { AutoSizer } from "react-virtualized";

export default function MicFFT({
  fft,
  className,
}: {
  fft: number[];
  className?: string;
}) {
  return (
    <div className={"relative size-full"}>
      <AutoSizer>
        {({ width, height }) => (
          <motion.svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className={cn("absolute !inset-0 !size-full", className)}
          >
            {Array.from({ length: Math.min(24, fft.length) }).map((_, index) => {
              const value = (fft[index] ?? 0) / 4;
              const h = Math.max(Math.min(height * value, height), 2);
              const yOffset = height * 0.5 - h * 0.5;
              return (
                <motion.rect
                  key={`mic-fft-${index}`}
                  animate={{ height: h, y: yOffset }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  height={h}
                  width={2}
                  x={2 + (index * width - 4) / 24}
                  y={yOffset}
                  rx={4}
                  fill="currentColor"
                />
              );
            })}
          </motion.svg>
        )}
      </AutoSizer>
    </div>
  );
}
