"use client";

interface ClusterStatusProps {
  status: "online" | "error" | "stale" | "loading";
}

const config = {
  online: { color: "bg-success", label: "Cluster Online", animate: true },
  error: { color: "bg-danger", label: "Unreachable", animate: false },
  stale: { color: "bg-warning", label: "Stale Data", animate: false },
  loading: { color: "bg-muted", label: "Connecting...", animate: true },
} as const;

export function ClusterStatus({ status }: ClusterStatusProps) {
  const { color, label, animate } = config[status];

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        {animate && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${color}`}
          />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`}
        />
      </span>
      <span className="font-mono text-xs text-muted">{label}</span>
    </div>
  );
}
