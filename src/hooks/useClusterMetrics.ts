"use client";

import useSWR from "swr";
import { fetchClusterMetrics } from "@/lib/api";
import { POLL_INTERVAL_MS } from "@/lib/constants";
import { readControl, readSignal } from "@/lib/service";
import { useEffect, useState } from "react";

function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const id = setInterval(tick, intervalMs);
    const first = setTimeout(tick, 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, [intervalMs]);
  return now;
}

async function fetchReading() {
  const metrics = await fetchClusterMetrics();
  return { metrics, fetchedAt: Date.now() };
}

export function useClusterMetrics() {
  const now = useNow();
  const { data: reading, isLoading } = useSWR("cluster-metrics", fetchReading, {
    refreshInterval: POLL_INTERVAL_MS,
    revalidateOnFocus: true,
    keepPreviousData: true,
  });

  const data = reading?.metrics;
  const lastUpdated = reading?.fetchedAt ?? null;
  const signal = readSignal({ data, isLoading, lastUpdated, now });
  const control = readControl(data, signal);
  const age = lastUpdated && now > 0 ? Math.max(0, now - lastUpdated) : null;

  return { data, signal, control, lastUpdated, age };
}
