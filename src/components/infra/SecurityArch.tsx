"use client";

import React from "react";

interface SecurityLayer {
  name: string;
  description: string;
  icon: string;
}

const LAYERS: SecurityLayer[] = [
  { 
    name: "Cloudflare Edge", 
    description: "WAF, DDoS Protection & Access Tunnel", 
    icon: "🌐" 
  },
  { 
    name: "Traefik Ingress", 
    description: "Dynamic Routing & TLS Termination", 
    icon: "🚦" 
  },
  { 
    name: "NetworkPolicies", 
    description: "Default-Deny / Zero-Trust Segmentation", 
    icon: "🛡️" 
  },
  { 
    name: "Authentik", 
    description: "IdP / SSO & Identity Verification", 
    icon: "🔑" 
  },
  { 
    name: "SOPS / age", 
    description: "Encrypted Secrets-as-Code", 
    icon: "🔒" 
  },
];

export function SecurityArch() {
  return (
    <section className="py-12 border-t border-white/10">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold mb-2">Security Architecture</h3>
        <p className="text-muted text-sm max-w-2xl mx-auto">
          A layered defense-in-depth strategy ensuring only authenticated, 
          authorized traffic reaches the core workloads.
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-6 md:gap-8">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent -translate-x-1/2" />

        {LAYERS.map((layer, idx) => (
          <div key={layer.name} className="relative z-10 flex items-center gap-4 w-full max-w-md group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:border-accent/50 transition-colors duration-300 shadow-lg shadow-black/50">
              {layer.icon}
            </div>
            <div className="flex-1 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group-hover:bg-white/[0.05] transition-all duration-300">
              <h4 className="font-semibold text-accent">{layer.name}</h4>
              <p className="text-xs text-muted">{layer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
