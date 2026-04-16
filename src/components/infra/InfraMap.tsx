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
  isSecurityFocus: boolean;
}

const NODES: InfraNode[] = [
  { id: "internet", name: "Internet", description: "Public inbound traffic", x: 50, y: 50, type: "entry", tags: ["Public"], isSecurityFocus: true },
  { id: "cloudflare", name: "Cloudflare", description: "WAF, DDoS & Tunnel", x: 150, y: 50, type: "gateway", tags: ["SASE", "Edge"], isSecurityFocus: true },
  { id: "traefik", name: "Traefik", description: "Ingress Controller", x: 300, y: 50, type: "gateway", tags: ["L7 Load Balancer"], isSecurityFocus: true },
  { id: "authentik", name: "Authentik", description: "Identity Provider (IdP)", x: 300, y: 150, type: "security", tags: ["OIDC", "SAML", "SSO"], isSecurityFocus: true },
  { id: "k3s", name: "K3s Cluster", description: "Production Workloads", x: 500, y: 100, type: "compute", tags: ["K8s", "Alpine"], isSecurityFocus: true },
  { id: "netpol", name: "NetworkPolicies", description: "Zero-Trust Segments", x: 400, y: 50, type: "security", tags: ["L4 Firewall"], isSecurityFocus: true },
  { id: "longhorn", name: "Longhorn", description: "Distributed Block Storage", x: 500, y: 200, type: "storage", tags: ["CSI", "NFS"], isSecurityFocus: false },
  { id: "sops", name: "SOPS/Age", description: "Secrets-as-Code", x: 400, y: 150, type: "security", tags: ["Encryption"], isSecurityFocus: true },
  { id: "metallb", name: "MetalLB", description: "L2 Load Balancer", x: 650, y: 50, type: "gateway", tags: ["BGP", "ARP"], isSecurityFocus: false },
];

const CONNECTIONS = [
  { from: "internet", to: "cloudflare" },
  { from: "cloudflare", to: "traefik" },
  { from: "traefik", to: "netpol" },
  { from: "netpol", to: "k3s" },
  { from: "traefik", to: "authentik" },
  { from: "k3s", to: "longhorn" },
  { from: "authentik", to: "k3s" },
  { from: "sops", to: "k3s" },
  { from: "k3s", to: "metallb" },
];

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
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${isSecurityOnly ? 'bg-accent text-background' : 'text-muted hover:text-foreground'}`}
          >
            Security Focused
          </button>
          <button 
            onClick={() => setIsSecurityOnly(false)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${!isSecurityOnly ? 'bg-accent text-background' : 'text-muted hover:text-foreground'}`}
          >
            Full Infra
          </button>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full bg-black/20 rounded-2xl border border-white/10 overflow-hidden group">
        <svg viewBox="0 0 800 300" className="w-full h-full">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orientation="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" opacity="0.5" />
            </marker>
          </defs>
          
          {/* Connection Lines */}
          <AnimatePresence>
            {filteredConnections.map((conn, idx) => {
              const fromNode = NODES.find(n => n.id === conn.from)!;
              const toNode = NODES.find(n => n.id === conn.to)!;
              return (
                <motion.line
                  key={`${conn.from}-${conn.to}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  markerEnd="url(#arrowhead)"
                  className="transition-all"
                />
              );
            })}
          </AnimatePresence>

          {/* Nodes */}
          <AnimatePresence>
            {filteredNodes.map((node) => (
              <motion.g
                key={node.id}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-help"
              >
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r="6" 
                  fill={node.type === "security" ? "var(--color-accent)" : "white"}
                  className="drop-shadow-[0_0_8px_var(--color-accent-glow)]"
                />
                <text 
                  x={node.x} 
                  y={node.y + 20} 
                  textAnchor="middle" 
                  className="fill-muted text-[10px] font-mono pointer-events-none select-none"
                >
                  {node.name}
                </text>
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-6 left-6 p-4 rounded-xl bg-background/80 border border-white/10 backdrop-blur-md shadow-2xl max-w-xs pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${hoveredNode.type === 'security' ? 'bg-accent' : 'bg-white'}`} />
                <h4 className="font-bold text-accent">{hoveredNode.name}</h4>
              </div>
              <p className="text-xs text-muted mb-3">{hoveredNode.description}</p>
              <div className="flex flex-wrap gap-1">
                {hoveredNode.tags.map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono">
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
