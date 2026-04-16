"use client";

import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface RadialGaugeProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  isLoading?: boolean;
}

function getColor(pct: number): string {
  if (pct >= 80) return "var(--color-danger)";
  if (pct >= 60) return "var(--color-warning)";
  return "var(--color-accent)";
}

export function RadialGauge({
  label,
  value,
  max = 100,
  unit = "%",
  isLoading,
}: RadialGaugeProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    stiffness: 80, 
    damping: 15,
    mass: 0.8 
  });
  const displayValue = useTransform(springValue, (latest) => latest.toFixed(1));
  const [displayText, setDisplayText] = useState(value.toFixed(1));
  useMotionValueEvent(displayValue, "change", setDisplayText);

  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const pct = Math.min((value / max) * 100, 100);
  const targetOffset = circumference - (pct / 100) * circumference;
  const animatedOffset = useTransform(springValue, (latest) => {
    const animatedPct = (latest / max) * 100;
    return circumference - (Math.min(animatedPct, 100) / 100) * circumference;
  });

  const color = getColor(pct);

  useEffect(() => {
    if (!isLoading) {
      motionValue.set(value);
    }
  }, [value, isLoading, motionValue]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-card-border bg-card p-4 transition-shadow hover:shadow-[0_0_20px_var(--color-accent-glow)]">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      {isLoading ? (
        <div className="flex h-[120px] w-[120px] items-center justify-center">
          <div className="h-16 w-16 animate-pulse rounded-full bg-card-border" />
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          <svg
            width={size}
            height={size}
            className="rotate-[-90deg]"
          >
            <defs>
              <filter id={`glow-${label}`}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              style={{ stroke: "var(--color-card-border)" }}
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              style={{ stroke: color }}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animatedOffset}
              filter={`url(#glow-${label})`}
              initial={{ strokeDashoffset: circumference }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono font-semibold leading-none text-foreground" style={{ fontSize: 20 }}>
              {displayText}
              <span className="text-muted" style={{ fontSize: 12 }}> {unit}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
