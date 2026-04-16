"use client";

import { useState, useEffect, useRef } from "react";

interface UptimeCounterProps {
  baseSeconds: number;
  lastUpdated: number | null;
  isLoading?: boolean;
}

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return { d, h, m, s };
}

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-2xl font-semibold text-foreground">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}

export function UptimeCounter({
  baseSeconds,
  lastUpdated,
  isLoading,
}: UptimeCounterProps) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    setElapsed(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [baseSeconds, lastUpdated]);

  const totalSeconds = baseSeconds + elapsed;
  const { d, h, m, s } = formatUptime(totalSeconds);

  return (
    <div className="rounded-lg border border-card-border bg-card p-4 transition-shadow hover:shadow-[0_0_20px_var(--color-accent-glow)]">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
        Cluster Uptime
      </p>
      {isLoading ? (
        <div className="h-10 w-40 animate-pulse rounded bg-card-border" />
      ) : (
        <div className="flex items-baseline gap-1">
          <Segment value={d} label="days" />
          <span className="pb-4 font-mono text-lg text-muted">:</span>
          <Segment value={h} label="hrs" />
          <span className="pb-4 font-mono text-lg text-muted">:</span>
          <Segment value={m} label="min" />
          <span className="pb-4 font-mono text-lg text-muted">:</span>
          <Segment value={s} label="sec" />
        </div>
      )}
    </div>
  );
}
