"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InfraNode {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  type: "entry" | "gateway" | "security" | "compute" | "storage";
  tags: string[];
  abbrev: string;
  isSecurityFocus: boolean;
}

const NODES: InfraNode[] = [
  { id: "internet",    name: "Internet",       description: "Public inbound traffic",       x: 65,  y: 105, type: "entry",    tags: ["Public"],          abbrev: "NET", isSecurityFocus: true },
  { id: "cloudflare",  name: "Cloudflare",      description: "WAF, DDoS & Tunnel",           x: 200, y: 105, type: "gateway",  tags: ["SASE", "Edge"],    abbrev: "CF",  isSecurityFocus: true },
  { id: "traefik",     name: "Traefik",         description: "Ingress Controller",           x: 345, y: 105, type: "gateway",  tags: ["L7 LB"],           abbrev: "TR",  isSecurityFocus: true },
  { id: "netpol",      name: "NetPolicies",     description: "Zero-Trust Segments",         x: 490, y: 105, type: "security", tags: ["L4 Firewall"],     abbrev: "NP",  isSecurityFocus: true },
  { id: "k3s",         name: "K3s",             description: "Production Workloads",        x: 635, y: 105, type: "compute",  tags: ["K8s", "Alpine"],   abbrev: "K3s", isSecurityFocus: true },
  { id: "authentik",   name: "Authentik",       description: "Identity Provider (IdP)",     x: 345, y: 225, type: "security", tags: ["OIDC", "SSO"],     abbrev: "IdP", isSecurityFocus: true },
  { id: "sops",        name: "SOPS/Age",        description: "Secrets-as-Code",             x: 490, y: 225, type: "security", tags: ["Encryption"],      abbrev: "ENC", isSecurityFocus: true },
  { id: "longhorn",    name: "Longhorn",        description: "Distributed Block Storage",  x: 635, y: 225, type: "storage",  tags: ["CSI", "NFS"],      abbrev: "PVC", isSecurityFocus: false },
  { id: "metallb",     name: "MetalLB",         description: "L2 Load Balancer",            x: 712, y: 105, type: "gateway",  tags: ["BGP", "ARP"],      abbrev: "LB",  isSecurityFocus: false },
];

const CONNECTIONS = [
  { from: "internet",   to: "cloudflare" },
  { from: "cloudflare", to: "traefik"    },
  { from: "traefik",    to: "netpol"     },
  { from: "netpol",     to: "k3s"        },
  { from: "traefik",    to: "authentik"  },
  { from: "authentik",  to: "k3s"        },
  { from: "sops",       to: "k3s"        },
  { from: "k3s",        to: "longhorn"   },
  { from: "k3s",        to: "metallb"    },
];

const NODE_COLORS: Record<InfraNode["type"], { fill: string; stroke: string; text: string }> = {
  security: { fill: "rgba(0,212,255,0.12)", stroke: "rgba(0,212,255,0.7)",    text: "#00d4ff" },
  gateway:  { fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0.3)", text: "#e4e4e7" },
  compute:  { fill: "rgba(139,92,246,0.15)", stroke: "rgba(139,92,246,0.6)",  text: "#c4b5fd" },
  storage:  { fill: "rgba(251,146,60,0.10)", stroke: "rgba(251,146,60,0.5)",  text: "#fdba74" },
  entry:    { fill: "rgba(255,255,255,0.03)", stroke: "rgba(255,255,255,0.15)", text: "#71717a" },
};

const NODE_R = 20;

function trimLine(ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return { x1: ax, y1: ay, x2: bx, y2: by };
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: ax + ux * (NODE_R + 2),
    y1: ay + uy * (NODE_R + 2),
    x2: bx - ux * (NODE_R + 8),
    y2: by - uy * (NODE_R + 8),
  };
}

export function InfraMap() {
  const [isSecurityOnly, setIsSecurityOnly] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<InfraNode | null>(null);

  const filteredNodes = isSecurityOnly ? NODES.filter(n => n.isSecurityFocus) : NODES;
  const filteredConnections = CONNECTIONS.filter(c =>
    filteredNodes.some(n => n.id === c.from) && filteredNodes.some(n => n.id === c.to)
  );

  return (
    <section className="py-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">Infrastructure Map</h3>
          <p className="text-muted text-sm max-w-md">
            Interactive view of the cluster architecture from edge to core.
          </p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setIsSecurityOnly(true)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${isSecurityOnly ? "bg-accent text-background" : "text-muted hover:text-foreground"}`}
          >
            Security Focused
          </button>
          <button
            onClick={() => setIsSecurityOnly(false)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${!isSecurityOnly ? "bg-accent text-background" : "text-muted hover:text-foreground"}`}
          >
            Full Infra
          </button>
        </div>
      </div>

      <div className="relative w-full bg-black/30 rounded-2xl border border-white/10 overflow-hidden">
        <svg viewBox="0 0 800 320" className="w-full h-auto" style={{ minHeight: 200 }}>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(0,212,255,0.5)" />
            </marker>
            <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <pattern id="dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.04)" />
            </pattern>
          </defs>

          {/* Background dot grid */}
          <rect width="800" height="320" fill="url(#dot-grid)" />

          {/* Row labels */}
          <text x="8" y="110" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="monospace">EDGE →</text>
          <text x="8" y="230" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="monospace">AUTH →</text>

          {/* Horizontal guide lines */}
          <line x1="0" y1="105" x2="800" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="225" x2="800" y2="225" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          {/* Connection lines */}
          <AnimatePresence>
            {filteredConnections.map(conn => {
              const from = NODES.find(n => n.id === conn.from)!;
              const to   = NODES.find(n => n.id === conn.to)!;
              const { x1, y1, x2, y2 } = trimLine(from.x, from.y, to.x, to.y);
              const isSecurity = from.type === "security" || to.type === "security";
              return (
                <motion.line
                  key={`${conn.from}-${conn.to}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isSecurity ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.2)"}
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                  className="dash-flow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}
          </AnimatePresence>

          {/* Nodes */}
          <AnimatePresence>
            {filteredNodes.map(node => {
              const c = NODE_COLORS[node.type];
              const isHovered = hoveredNode?.id === node.id;
              return (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: "help" }}
                  filter={isHovered ? "url(#node-glow)" : node.type === "security" ? "url(#subtle-glow)" : undefined}
                >
                  {/* Outer ring for security nodes */}
                  {node.type === "security" && (
                    <circle
                      cx={node.x} cy={node.y} r={NODE_R + 5}
                      fill="none"
                      stroke="rgba(0,212,255,0.15)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  )}
                  {/* Main circle */}
                  <circle
                    cx={node.x} cy={node.y} r={NODE_R}
                    fill={c.fill}
                    stroke={isHovered ? c.stroke : c.stroke.replace(/[\d.]+\)$/, "0.5)")}
                    strokeWidth={node.type === "security" ? 1.5 : 1}
                  />
                  {/* Abbrev text */}
                  <text
                    x={node.x} y={node.y + 4}
                    textAnchor="middle"
                    fill={c.text}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="700"
                    pointerEvents="none"
                  >
                    {node.abbrev}
                  </text>
                  {/* Name label below */}
                  <text
                    x={node.x} y={node.y + NODE_R + 14}
                    textAnchor="middle"
                    fill={node.type === "security" ? "rgba(228,228,231,0.8)" : "rgba(113,113,122,0.9)"}
                    fontSize="9"
                    fontFamily="monospace"
                    pointerEvents="none"
                  >
                    {node.name}
                  </text>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-4 left-4 p-3 rounded-xl bg-background/90 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-none max-w-xs"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: NODE_COLORS[hoveredNode.type].stroke }}
                />
                <span className="font-bold text-sm" style={{ color: NODE_COLORS[hoveredNode.type].text }}>
                  {hoveredNode.name}
                </span>
              </div>
              <p className="text-xs text-muted mb-2">{hoveredNode.description}</p>
              <div className="flex flex-wrap gap-1">
                {hoveredNode.tags.map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
