"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

const EXPERIENCE: TimelineItem[] = [
  {
    id: "f5-dc",
    role: "Cloud Security Engineer",
    company: "F5 Distributed Cloud",
    location: "Seattle, WA",
    period: "Aug 2024 — Present",
    bullets: [
      "Manage WAF and identity policies (SAML, OAuth) for 100+ enterprise customers across multi-cloud environments.",
      "Drive programmatic policy changes via API for auditable, consistent security configurations.",
      "Design secure delivery architectures translating compliance requirements like NIST and FedRAMP into deployable controls.",
      "Lead incident response for managed security controls, strengthening policy via cross-environment attack pattern analysis."
    ]
  },
  {
    id: "f5-app",
    role: "Security Engineer, App Delivery & Identity",
    company: "F5",
    location: "Seattle, WA",
    period: "Oct 2016 — Aug 2024",
    bullets: [
      "Engineered SAML, OAuth, and Kerberos federation on F5 APM as a zero-trust gateway with adaptive MFA.",
      "Designed Advanced WAF policies covering OWASP Top 10, bot defense, and behavioral analysis.",
      "Authored 100+ KCS articles deflecting 20,000+ support cases (estimated $12M in savings).",
      "Early adopter for BIG-IP Next (Kubernetes) and r-Series, maintaining full operational workload."
    ]
  },
  {
    id: "covestic",
    role: "Infrastructure Operations Engineer",
    company: "Covestic (Microsoft)",
    location: "Redmond, WA",
    period: "Jan 2014 — Mar 2016",
    bullets: [
      "Provided Tier 2–3 infrastructure support for Xbox Operations Center.",
      "Maintained global service availability for Xbox Live serving millions of users."
    ]
  }
];

export function Timeline() {
  return (
    <section className="py-12 border-t border-white/10">
      <h3 className="text-2xl font-bold mb-10">Experience</h3>
      
      <div className="relative border-l border-white/10 ml-4 md:ml-6 pb-4">
        {EXPERIENCE.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1 }}
            className="mb-12 ml-6 relative group"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent shadow-[0_0_8px_var(--color-accent-glow)] z-10 
                            group-hover:scale-125 transition-transform duration-300" />
            
            <div className="mb-1 flex flex-col md:flex-row md:items-baseline justify-between gap-1">
              <h4 className="text-lg font-bold text-foreground leading-none">{item.role}</h4>
              <span className="text-xs font-mono text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/20">
                {item.period}
              </span>
            </div>
            
            <div className="mb-4 text-sm text-muted font-medium">
              {item.company} <span className="mx-2 opacity-30">|</span> {item.location}
            </div>
            
            <ul className="space-y-2">
              {item.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="text-sm text-muted flex gap-2">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
