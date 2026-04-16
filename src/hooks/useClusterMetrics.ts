"use client";

import useSWR from "swr";
import { fetchClusterMetrics } from "@/lib/api";
import { POLL_INTERVAL_MS, STALE_THRESHOLD_MS } from "@/lib/constants";
import { useState, useCallback } from "react";

export function useClusterMetrics() {
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const onSuccess = useCallback(() => {
    setLastUpdated(Date.now());
  }, []);

  const { data, error, isLoading } = useSWR(
    "cluster-metrics",
    fetchClusterMetrics,
    {
      refreshInterval: POLL_INTERVAL_MS,
      revalidateOnFocus: true,
      keepPreviousData: true,
      onSuccess,
    }
  );

  const isStale =
    lastUpdated !== null && Date.now() - lastUpdated > STALE_THRESHOLD_MS;

  return { data, error, isLoading, isStale, lastUpdated };
}
