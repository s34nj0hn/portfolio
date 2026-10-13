import { STALE_THRESHOLD_MS } from "./constants";
import type { ClusterMetrics } from "@/types/metrics";

export type ServiceState = "checking" | "good" | "delays" | "suspended";

export interface Service {
  state: ServiceState;
  word: string;
  reason: string;
}

interface SignalInput {
  data: ClusterMetrics | undefined;
  isLoading: boolean;
  lastUpdated: number | null;
  now: number;
}

/* The Signal line is the telemetry path itself: its state is whether readings arrive and how fresh they are. */
export function readSignal({ data, isLoading, lastUpdated, now }: SignalInput): Service {
  if (!data && isLoading) {
    return { state: "checking", word: "Checking", reason: "Asking the Worker for a reading." };
  }
  if (!data) {
    return {
      state: "suspended",
      word: "Suspended",
      reason: "The Worker is not answering. No reading is shown rather than a guessed one.",
    };
  }
  if (lastUpdated && now > 0 && now - lastUpdated > STALE_THRESHOLD_MS) {
    return {
      state: "delays",
      word: "Minor delays",
      reason: `Last good reading ${formatAge(now - lastUpdated)} ago. Retrying every 30 seconds.`,
    };
  }
  return { state: "good", word: "Good service", reason: "Readings arriving every 30 seconds." };
}

/* The Control line is GitOps and admission: its state comes from what the cluster reports about Flux and Gatekeeper. */
export function readControl(data: ClusterMetrics | undefined, signal: Service): Service {
  if (!data) {
    return signal.state === "checking"
      ? { state: "checking", word: "Checking", reason: "Waiting for the first reading." }
      : { state: "suspended", word: "No reading", reason: "No reading without the Signal line." };
  }
  if (!data.flux_ready) {
    return { state: "delays", word: "Minor delays", reason: "Flux reports it is not ready." };
  }
  if (data.gatekeeper_violations > 0) {
    const n = data.gatekeeper_violations;
    return { state: "delays", word: "Minor delays", reason: `Gatekeeper reports ${n} violation${n === 1 ? "" : "s"}.` };
  }
  return { state: "good", word: "Good service", reason: "Flux ready, no policy violations." };
}

export function formatAge(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${String(s % 60).padStart(2, "0")}s`;
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
}

export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  if (days >= 1) return `${days} day${days === 1 ? "" : "s"}`;
  return `${Math.floor(seconds / 3600)}h`;
}
