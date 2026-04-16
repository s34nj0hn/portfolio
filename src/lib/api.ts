import { WORKER_URL } from "./constants";
import type { ClusterMetrics } from "@/types/metrics";

export async function fetchClusterMetrics(): Promise<ClusterMetrics> {
  const res = await fetch(WORKER_URL);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  if (data.status === "error") throw new Error(`Upstream error: ${data.code}`);
  return data as ClusterMetrics;
}
