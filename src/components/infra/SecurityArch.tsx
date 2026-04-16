"use client";

import React from "react";

interface SecurityLayer {
  name: string;
  description: string;
  icon: "globe" | "server" | "shield" | "user" | "lock";
}

const LAYERS: SecurityLayer[] = [
  { name: "Cloudflare Edge",   description: "WAF, DDoS Protection & Access Tunnel",      icon: "globe"   },
  { name: "Traefik Ingress",   description: "Dynamic Routing & TLS Termination",          icon: "server"  },
  { name: "NetworkPolicies",   description: "Default-Deny / Zero-Trust Segmentation",     icon: "shield"  },
  { name: "Authentik",         description: "IdP / SSO & Identity Verification",           icon: "user"    },
  { name: "SOPS / age",        description: "Encrypted Secrets-as-Code",                  icon: "lock"    },
];

function LayerIcon({ name }: { name: SecurityLayer["icon"] }) {
  const cls = "w-5 h-5";
  switch (name) {
    case "globe":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "server":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "user":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "lock":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
  }
}

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

      <div className="relative flex flex-col items-center gap-3">
        {/* Vertical connecting line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/15 to-transparent -translate-x-1/2 pointer-events-none" />

        {LAYERS.map((layer, idx) => (
          <div
            key={layer.name}
            className="relative z-10 flex items-center gap-4 w-full max-w-sm group"
            style={{ opacity: 1 - idx * 0.04 }}
          >
            <div
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-accent
                         bg-accent/8 border border-accent/20
                         group-hover:bg-accent/15 group-hover:border-accent/40
                         transition-all duration-300 shadow-[0_0_12px_rgba(0,212,255,0.06)]
                         group-hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
            >
              <LayerIcon name={layer.icon} />
            </div>
            <div
              className="flex-1 px-4 py-3 rounded-xl
                         bg-white/[0.03] border border-white/[0.07]
                         backdrop-blur-sm
                         group-hover:bg-white/[0.06] group-hover:border-accent/20
                         transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-sm text-accent">{layer.name}</h4>
                <span className="text-[9px] font-mono text-muted/60 tabular-nums">L{idx + 1}</span>
              </div>
              <p className="text-xs text-muted mt-0.5">{layer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
