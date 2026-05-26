export interface ClusterMetrics {
  status: "online";
  running_pods: number;
  total_pods: number;
  succeeded_pods: number;
  node_count: number;
  cluster_uptime_seconds: number;
  cpu_usage_pct: number;
  memory_usage_pct: number;
  pvc_bound: number;
  flux_ready: boolean;
  gatekeeper_constraints: number;
  gatekeeper_violations: number;
  last_reconcile_age_seconds: number;
}

export interface ClusterError {
  status: "error";
  code: number;
}

export type ClusterResponse = ClusterMetrics | ClusterError;
