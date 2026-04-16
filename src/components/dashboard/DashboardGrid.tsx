"use client";

import { useClusterMetrics } from "@/hooks/useClusterMetrics";
import { ClusterStatus } from "./ClusterStatus";
import { MetricCard } from "./MetricCard";
import { RadialGauge } from "./RadialGauge";
import { PodDonut } from "./PodDonut";
import { UptimeCounter } from "./UptimeCounter";
import { StorageWidget } from "./StorageWidget";

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

export function DashboardGrid() {
  const { data, error, isLoading, isStale, lastUpdated } =
    useClusterMetrics();

  const status = isLoading
    ? "loading"
    : error && !data
      ? "error"
      : isStale
        ? "stale"
        : "online";

  return (
    <section id="dashboard" className="mx-auto w-full max-w-5xl px-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Cluster Heartbeat</h2>
          <ClusterStatus status={status} />
        </div>
        {lastUpdated && (
          <span className={`font-mono text-xs ${isStale ? "text-warning" : "text-muted"}`}>
            Updated {formatTimeAgo(lastUpdated)}
          </span>
        )}
      </div>

      {error && !data ? (
        <div className="rounded-lg border border-danger/30 bg-danger/5 p-6 text-center">
          <p className="text-sm text-danger">Cluster metrics unavailable</p>
          <p className="mt-1 text-xs text-muted">
            The monitoring pipeline may be offline. Check back shortly.
          </p>
        </div>
      ) : (
        <div className=\"grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4\">
          <MetricCard
            label=\"Nodes\"
            value={data?.node_count ?? \"—\"}
            isLoading={isLoading}
          />
          <PodDonut
            running={data?.running_pods ?? 0}
            succeeded={data?.succeeded_pods ?? 0}
            total={data?.total_pods ?? 0}
            isLoading={isLoading}
          />
          <RadialGauge
            label=\"CPU\"
            value={data?.cpu_usage_pct ?? 0}
            isLoading={isLoading}
          />
          <RadialGauge
            label=\"Memory\"
            value={data?.memory_usage_pct ?? 0}
            isLoading={isLoading}
          />
          <UptimeCounter
            seconds={data?.cluster_uptime_seconds ?? 0}
            isLoading={isLoading}
          />
          <StorageWidget
            count={data?.pvc_bound ?? 0}
            isLoading={isLoading}
          />
        </div>
      )}
    </section>
  );
}
