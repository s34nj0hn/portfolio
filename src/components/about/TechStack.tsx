const categories = [
  {
    name: "Identity & Access",
    skills: [
      "SAML", "OAuth/OIDC", "Kerberos", "Active Directory",
      "Azure AD", "Okta", "Authentik", "RBAC", "Zero Trust",
    ],
  },
  {
    name: "Cloud Security",
    skills: [
      "AWS", "Azure", "GCP", "WAF",
      "Multi-cloud Architecture", "VPC Design", "Security Groups",
    ],
  },
  {
    name: "Infrastructure",
    skills: [
      "Kubernetes", "K3s", "Docker", "Terraform", "Helm",
      "GitOps/FluxCD", "CI/CD", "Cloudflare Tunnels",
    ],
  },
  {
    name: "Security Operations",
    skills: [
      "SIEM", "IDS/IPS", "Incident Response",
      "Vulnerability Assessment", "Threat Analysis",
    ],
  },
  {
    name: "Observability",
    skills: ["Prometheus", "Grafana", "SOPS", "Longhorn", "NetworkPolicies"],
  },
  {
    name: "Compliance",
    skills: ["SOC 2", "PCI DSS", "NIST", "ISO 27001", "FedRAMP"],
  },
];

export function TechStack() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      <h2 className="mb-8 text-lg font-semibold">Technical Skills</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-card-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-accent/30 hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
