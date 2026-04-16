import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-24 pb-24 pt-28">
        {/* Hero */}
        <section
          id="about"
          className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sean Johnson
          </h1>
          <p className="max-w-2xl text-lg text-muted">
            Cloud Security Engineer building enterprise-grade infrastructure
            with Zero Trust architecture. CISSP &amp; AWS Security Specialty
            certified.
          </p>
          <p className="max-w-2xl text-sm text-muted">
            This site is a live window into a production K3s cluster — every
            metric below is pulled in real time through a Cloudflare Worker,
            with zero inbound ports exposed.
          </p>
          <div className="mt-2 flex gap-3">
            <a
              href="#dashboard"
              className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
            >
              View Cluster Metrics
            </a>
            <a
              href="https://linkedin.com/in/s34nj0hnson/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-card-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/s34nj0hn/lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-card-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* Dashboard */}
        <DashboardGrid />

        {/* Tech Stack (Phase 2 placeholder) */}
        <section className="mx-auto w-full max-w-5xl px-6">
          <h2 className="mb-6 text-lg font-semibold">Infrastructure Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "K3s",
              "FluxCD",
              "Longhorn",
              "Traefik",
              "Authentik",
              "Cloudflare Tunnels",
              "Prometheus",
              "Grafana",
              "SOPS",
              "Terraform",
              "Helm",
              "NetworkPolicies",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-card-border bg-card px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
