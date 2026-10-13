import type { ClusterMetrics } from "@/types/metrics";
import { formatAge, formatUptime } from "@/lib/service";
import { PLATFORM_REPO_URL, PORTFOLIO_REPO_URL, platformPath } from "./links";

export type LineId = "control" | "signal";
export type Zone = "public" | "private" | "edge";
export type StationId =
  | "github"
  | "flux"
  | "gatekeeper"
  | "k3s"
  | "prometheus"
  | "grafana"
  | "tunnel"
  | "worker"
  | "page";

export interface Source {
  label: string;
  href: string;
}

export interface Station {
  id: StationId;
  name: string;
  lines: LineId[];
  zone: Zone;
  x: number;
  y: number;
  labelSide: "above" | "below" | "right" | "below-right";
  does: string;
  sources: Source[];
  facts?: string[];
  read?: (m: ClusterMetrics | undefined, age: number | null) => string[];
}

export const MAP_W = 1200;
export const MAP_H = 500;

export const CONTROL_PATH = "M90 180 H720";
export const SIGNAL_PATH = "M720 180 H940 L1000 240 V340 L940 400 H450";

export const ZONES = {
  private: { x: 200, y: 60, w: 990, h: 245, label: "Private network" },
  edge: { x: 640, y: 305, w: 550, h: 180, label: "Cloudflare edge" },
};

export const LINES: Record<LineId, { name: string; route: string }> = {
  control: { name: "Control line", route: "Git to cluster" },
  signal: { name: "Signal line", route: "Cluster to this page" },
};

const none = "No reading";

export const STATIONS: Station[] = [
  {
    id: "github",
    name: "GitHub",
    lines: ["control"],
    zone: "public",
    x: 90,
    y: 180,
    labelSide: "above",
    does: "The only way in. Every manifest, policy, and the Worker's code live in a public repo, and nothing reaches the cluster except through Git.",
    sources: [{ label: "k8s-platform-reference", href: PLATFORM_REPO_URL }],
    facts: ["Public repo", "main branch"],
  },
  {
    id: "flux",
    name: "Flux",
    lines: ["control"],
    zone: "private",
    x: 300,
    y: 180,
    labelSide: "above",
    does: "Pulls the repo and reconciles the cluster from GitOps/clusters/reference/ across five Kustomizations covering infrastructure, apps, monitoring, and policy.",
    sources: [{ label: "GitOps/clusters/reference/flux-system", href: platformPath("GitOps/clusters/reference/flux-system") }],
    read: (m) =>
      m
        ? [m.flux_ready ? "Ready" : "Not ready", `Synced ${formatAge(m.last_reconcile_age_seconds * 1000)} ago`]
        : [none],
  },
  {
    id: "gatekeeper",
    name: "Gatekeeper",
    lines: ["control"],
    zone: "private",
    x: 510,
    y: 180,
    labelSide: "above",
    does: "Admission control in deny mode. One constraint blocks privileged containers and the other requires labels on every namespace. A fixture in the repo proves the webhook rejects a privileged pod.",
    sources: [
      { label: "GitOps/policies/base/gatekeeper/constraints", href: platformPath("GitOps/policies/base/gatekeeper/constraints") },
      { label: "tests/gatekeeper/privileged-pod.yaml", href: `${PLATFORM_REPO_URL}/blob/main/tests/gatekeeper/privileged-pod.yaml` },
    ],
    read: (m) =>
      m
        ? [
            `${m.gatekeeper_constraints} enforced`,
            `${m.gatekeeper_violations} violation${m.gatekeeper_violations === 1 ? "" : "s"}`,
          ]
        : [none],
  },
  {
    id: "k3s",
    name: "K3s",
    lines: ["control", "signal"],
    zone: "private",
    x: 720,
    y: 180,
    labelSide: "above",
    does: "A single-node K3s cluster in its own VM, kept separate from everything else I run so it stays easy to review, rebuild, and explain. The demo workload starts from a default-deny NetworkPolicy and opens two paths: DNS egress and its one port.",
    sources: [
      { label: "GitOps/clusters/reference", href: platformPath("GitOps/clusters/reference") },
      { label: "GitOps/apps/base/demo-app", href: platformPath("GitOps/apps/base/demo-app") },
    ],
    read: (m) =>
      m
        ? [
            `${m.node_count} node${m.node_count === 1 ? "" : "s"}, ${m.running_pods}/${m.total_pods} pods`,
            `Up ${formatUptime(m.cluster_uptime_seconds)}`,
          ]
        : [none],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    lines: ["signal"],
    zone: "private",
    x: 900,
    y: 180,
    labelSide: "above",
    does: "kube-prometheus-stack scrapes the node, Flux, and Gatekeeper, with seven days of retention sized for a small node.",
    sources: [{ label: "GitOps/monitoring/base/kube-prometheus-stack", href: platformPath("GitOps/monitoring/base/kube-prometheus-stack") }],
    read: (m) => (m ? [`CPU ${m.cpu_usage_pct.toFixed(1)}%`, `Memory ${m.memory_usage_pct.toFixed(1)}%`] : [none]),
  },
  {
    id: "grafana",
    name: "Grafana",
    lines: ["signal"],
    zone: "private",
    x: 1000,
    y: 250,
    labelSide: "right",
    does: "Answers the Worker's fixed queries through a dedicated service account. The public internet never gets a window into it.",
    sources: [{ label: "docs/security/public-telemetry-contract.md", href: `${PLATFORM_REPO_URL}/blob/main/docs/security/public-telemetry-contract.md` }],
    facts: ["Private", "Fixed queries"],
  },
  {
    id: "tunnel",
    name: "Tunnel",
    lines: ["signal"],
    zone: "edge",
    x: 1000,
    y: 305,
    labelSide: "below-right",
    does: "cloudflared runs inside the cluster and dials out to Cloudflare, so the private network opens no inbound port for it.",
    sources: [{ label: "GitOps/infrastructure/base/cloudflared", href: platformPath("GitOps/infrastructure/base/cloudflared") }],
    facts: ["cloudflared", "Outbound only"],
  },
  {
    id: "worker",
    name: "Worker",
    lines: ["signal"],
    zone: "edge",
    x: 800,
    y: 400,
    labelSide: "below",
    does: "Accepts one route, GET /cluster/heartbeat, runs fixed server-side queries, and returns a small hand-built JSON. A 30-second cache and a per-IP rate limit bound the load, and a caller cannot send PromQL or pick a datasource.",
    sources: [{ label: "workers/public-telemetry/src", href: platformPath("workers/public-telemetry/src") }],
    facts: ["GET /cluster/heartbeat", "30s cache, rate limited"],
  },
  {
    id: "page",
    name: "This page",
    lines: ["signal"],
    zone: "public",
    x: 450,
    y: 400,
    labelSide: "below",
    does: "Your browser polls the Worker every 30 seconds. When the reading goes stale or the Worker stops answering, the line shows it instead of guessing.",
    sources: [{ label: "s34nj0hn/portfolio", href: PORTFOLIO_REPO_URL }],
    read: (m, age) => (m && age !== null ? [`Checked ${formatAge(age)} ago`] : [none]),
  },
];

export const NOT_EXPOSED = [
  "Node names",
  "Pod and namespace names",
  "Internal IP addresses",
  "Ingress hosts",
  "Labels and annotations",
  "Prometheus queries",
  "Logs and trace IDs",
];

export const PLANNED_WORKS = [
  "No CI yet. Every check in the repo runs by hand.",
  "Alertmanager routes to a null receiver, so no alert reaches anyone.",
  "SOPS does not cover every secret yet.",
  "No runtime detection, image scanning, or tested restore.",
];
