# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary (first contact): technical recruiters.** They arrive from a LinkedIn profile or an outbound message with a short attention budget, skimming for stack keywords, seniority signal, and whether this person is credible enough to forward. They do not read paragraphs and will not click into a GitHub repo.

**Secondary (the decision): hiring managers and engineering leaders** for Platform / Platform Security / Cloud Infrastructure roles. They receive the link from the recruiter and read deeper — they want to know whether the platform claims are real, and some will open the source repos and judge the actual cluster design.

The same page serves two very different attention budgets: a keyword-and-signal skim, then a verification read. Both audiences are evaluating a person, not buying a product.

## Product Purpose

A personal portfolio site for Sean Johnson that proves platform-engineering capability by exposing a live, running Kubernetes cluster rather than describing one. It is a claim with its own evidence attached: the metrics on the page are read from the real cluster at load time, so the page is only as healthy as the infrastructure behind it.

Success, in priority order:

1. **Repositioning belief.** The visitor arrives reading Sean as "WAF / application-security support" and leaves reading him as "platform engineer who does security." Moving that label is the single most important job of the site.
2. **Inbound contact.** A recruiter or hiring manager reaches out about a specific role.
3. **Deep-dive into the source.** A technical reader clicks through to the GitOps / reference-platform repository and inspects real infrastructure code.

## Positioning

Most engineering portfolios assert experience; this one runs. The differentiating mechanism is a live telemetry path — browser → Cloudflare Worker → Grafana → Prometheus → K3s — that a competing portfolio cannot copy without actually operating a cluster and exposing it safely. The security posture of that path (public aggregated metrics only, no inbound ports, sanitized heartbeat JSON) is itself part of the demonstration: it shows judgment about *what not to expose*, not just the ability to expose something.

Supporting credentials: CISSP, AWS Security Specialty. Current role: F5 Distributed Cloud.

## Operating Context

- Reached primarily as a link — from a LinkedIn profile, a recruiter message, or an application. Rarely found by search.
- Read on both desktop and phone; a recruiter skim frequently happens on mobile.
- Read in short sessions, often in a browser tab alongside a LinkedIn profile and a job description.
- The live data is a load-bearing part of the experience: if the cluster is down or the worker is unreachable, the page must degrade to an honest, legible state rather than a blank or fabricated one. A visitor seeing a stale indicator is acceptable; a visitor seeing invented numbers is not.

## Capabilities and Constraints

**Delivery**
- Next.js 16 + TypeScript + Tailwind v4, static export (`output: 'export'`), no server runtime.
- Hosted on Cloudflare Pages (https://portfolio-4j6.pages.dev/); custom domain s34nj0hn.dev not yet bound.
- All data fetching is client-side via SWR, 30s poll (`POLL_INTERVAL_MS`), stale after 120s (`STALE_THRESHOLD_MS`).
- Deploys are currently manual (`wrangler pages deploy`); GitHub auto-deploy not yet wired.

**Data**
- Single endpoint: `NEXT_PUBLIC_WORKER_URL`, defaulting to `https://api.s34nj0hn.dev/cluster/heartbeat` (Cloudflare Worker `throbbing-mouse-98cf`). Worker source: `~/lab/workers/cluster-metrics/throbbing-mouse-98cf/src/index.ts`.
- Response: `status`, `running_pods`, `total_pods`, `succeeded_pods`, `node_count`, `cluster_uptime_seconds`, `cpu_usage_pct`, `memory_usage_pct`, `pvc_bound`, `flux_ready`, `gatekeeper_constraints`, `gatekeeper_violations`, `last_reconcile_age_seconds`. Error: `{ "status": "error", "code": number }` at HTTP 502.
- The Worker serves one fixed route with a 30-second response cache and a per-IP rate limit. CORS allows only `https://s34nj0hn.dev`, so the pages.dev mirror and localhost cannot read the heartbeat.
- Only aggregated, non-sensitive cluster metrics ever cross the worker boundary. No workload names, no app inventory, no internal addresses.

**Content scope**
- Sections currently shipped: hero with live service board and career strip map, the network map, what the heartbeat will not tell you and planned works, timetable, stack index.
- The infrastructure map shows platform and security components only — never the applications running on the cluster.

**Open / undecided**
- The Cloudflare Web Analytics beacon in `layout.tsx` is a placeholder (`YOUR_BEACON_TOKEN`) and is not collecting anything.

## Brand Commitments

- Identity is the person: **Sean Johnson**. The site wordmark is `s34nj0hn.dev`; the handle `s34nj0hn` is the consistent identity across GitHub and the domain.
- Voice is engineer-to-engineer: specific, measured, unembellished. Claims are stated with the mechanism attached. No hype adjectives, no growth-marketing tone, no "passionate about."
- Contact routes to LinkedIn (linkedin.com/in/s34nj0hnson/). There is no downloadable CV or resume PDF, by decision.
- Source links point to `github.com/s34nj0hn/k8s-platform-reference` (the platform) and `github.com/s34nj0hn/portfolio` (this site).
- **Employer-safe, passive posture.** Sean is currently employed at F5. Nothing may read as an active job hunt — no "open to work," no availability banners, no "looking for my next role." No F5 customer names, environment specifics, or any confidential detail.

## Evidence on Hand

**Real and usable:**
- Live cluster telemetry via the worker heartbeat endpoint — the site's central proof. The dashboard reads the single-node K3s reference cluster (`k8s-platform-reference`); the 4-node bare-metal home cluster appears only in the work history.
- Work history with concrete, quantified detail, held in `src/content/career.ts`: F5 Distributed Cloud (Aug 2024–present, WAF/API protection across 100+ enterprise environments in a FedRAMP managed service), F5 Application Delivery (Oct 2016–Aug 2024, Advanced WAF/ASM, APM federation, 100+ KCS articles deflecting ~2,000 cases / ~$400K savings, mentored 10 engineers), independent platform lab (Oct 2022–present), Covestic/Microsoft Xbox Operations (Jan 2014–Mar 2016).
- Certifications: CISSP, AWS Security Specialty.
- Named real infrastructure: K3s, FluxCD, Cloudflare Tunnels, Traefik, NetworkPolicies, Authentik, SOPS, Longhorn, MetalLB, Prometheus, Grafana, OPA Gatekeeper, Ansible, Helm, Kustomize. Manifests live in `~/lab/GitOps/infrastructure/base/`.
- Public repositories a reader can actually open and inspect.

**Absent — must never be fabricated:**
- No testimonials, references, quotes, or endorsements.
- No client work, case studies, logos, or named customers.
- No uptime SLAs, benchmark figures, traffic numbers, or cost savings beyond the KCS figure already documented above.
- No CV file exists at `~/career-ops/cv.md`; `src/content/career.ts` is the current source of truth for work history.
- No photography or portrait assets are in the repo today.

## Product Principles

1. **Show the running system, don't describe it.** Every claim the site makes should have a mechanism, a number, or a repository behind it. When there's nothing real to point at, say less.
2. **Two readers, one page.** The skim must deliver stack, level, and repositioning within seconds; the deep read must reward verification. Neither can be sacrificed for the other.
3. **Honest under failure.** Degraded, stale, and error states are part of the product and are themselves evidence of engineering judgment. Never fake data to keep the page looking good.
4. **Restraint is the security argument.** What the site declines to expose — workloads, internals, customer detail — demonstrates the same judgment the role requires.
5. **Employed, not searching.** The site reads as a working engineer's public reference platform that happens to make hiring easy, never as a job application.

## Accessibility & Inclusion

- Target: Lighthouse Accessibility > 90, Performance > 90.
- Responsive down to 375px; recruiter skims routinely happen on a phone.
- Data is visualized heavily (gauges, donuts, maps): every metric must also be legible as text, and no state may be communicated by color alone — the status color shifts (green/amber/red) need a label or shape companion.
- Motion is used throughout (Framer Motion scroll reveals, ticking counters, animated connection lines); it must respect `prefers-reduced-motion`.
