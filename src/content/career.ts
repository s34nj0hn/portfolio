export type CareerLine = "career" | "platform";

export interface Role {
  id: string;
  line: CareerLine;
  role: string;
  company: string;
  location: string;
  period: string;
  /** Index of the bullet shown before the rest are expanded. */
  lead: number;
  bullets: string[];
}

export const ROLES: Role[] = [
  {
    id: "f5-dc",
    line: "career",
    role: "Cloud Security Engineer",
    company: "F5 Distributed Cloud",
    location: "Hybrid",
    period: "Aug 2024 – now",
    lead: 0,
    bullets: [
      "Manage WAF and API protection policy across 100+ enterprise customer environments spanning AWS, Azure, and GCP as part of a FedRAMP managed security service.",
      "Drive configuration changes programmatically via the F5 Distributed Cloud API for consistent, auditable, repeatable changes across multi-tenant environments.",
      "Custom-tune detection logic to reduce false positives without degrading production availability.",
      "Analyze cross-environment incident patterns, document recurring attack signatures, and apply findings to accelerate resolution across the customer base.",
      "Manage DNS strategy, TLS certificate lifecycle, and traffic distribution policies across multi-cloud infrastructure.",
    ],
  },
  {
    id: "independent-lab",
    line: "platform",
    role: "Independent Security & Platform Engineering Lab",
    company: "Self-directed",
    location: "Self-employed",
    period: "Oct 2022 – now",
    lead: 0,
    bullets: [
      "Designed and operate a 4-node bare-metal Kubernetes cluster running production workloads with GitOps, SOPS-encrypted secrets, default-deny NetworkPolicy, VLAN segmentation, and full observability.",
      "Use Ansible for node provisioning and Cloudflare Tunnels for zero-port-forwarding external access.",
      "Apply defense-in-depth and compliance thinking to cloud-native infrastructure, including the separate single-node reference cluster this page reads from.",
    ],
  },
  {
    id: "f5-app",
    line: "career",
    role: "Security Engineer, Application Delivery",
    company: "F5",
    location: "Greater Seattle Area",
    period: "Oct 2016 – Aug 2024",
    lead: 3,
    bullets: [
      "Built and tuned Advanced WAF/ASM policies combining positive and negative security models, OWASP Top 10 coverage, bot defense, credential-stuffing protections, and behavioral analysis.",
      "Configured and maintained F5 APM access policies implementing SAML, OAuth, OIDC, and Kerberos federation with adaptive MFA and contextual access controls across enterprise applications.",
      "Implemented federated identity solutions for applications lacking native support for modern auth protocols, bridging legacy and modern authentication patterns across hybrid and multi-cloud environments.",
      "Selected as an early support resource for F5 BIG-IP Next and r-Series hardware, rapidly upskilling in Kubernetes-based infrastructure and AS3 declarative automation.",
      "Authored 100+ KCS articles deflecting an estimated 2,000+ support cases and generating approximately $400K in operational cost savings through self-service enablement.",
      "Mentored 10 engineers in security troubleshooting methodology and documentation standards.",
    ],
  },
  {
    id: "covestic",
    line: "career",
    role: "Infrastructure Operations Engineer",
    company: "Covestic (Microsoft)",
    location: "Redmond, WA",
    period: "Jan 2014 – Mar 2016",
    lead: 1,
    bullets: [
      "Provided Tier 2–3 infrastructure support for Xbox Operations Center.",
      "Maintained global service availability for Xbox Live serving millions of users.",
    ],
  },
];
