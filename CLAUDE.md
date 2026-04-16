# Platform Proof Portfolio Site

## Project Overview
A portfolio site that serves as a live window into a production K3s cluster. Pulls real-time metrics through a Cloudflare Worker. Target audience: hiring managers for Platform/Cloud Security Engineer roles.

- **Owner:** Sean Johnson (Cloud Security Engineer, F5 — CISSP, AWS Security Specialty)
- **Stack:** Next.js 16 + TypeScript + Tailwind v4 + SWR
- **Hosting:** Cloudflare Pages (static export) at https://portfolio-4j6.pages.dev/
- **API:** CF Worker `throbbing-mouse-98cf` at https://throbbing-mouse-98cf.seannotpdiddyjohnson.workers.dev
- **GitHub:** https://github.com/s34nj0hn/portfolio
- **Domain (pending):** s34nj0hn.dev (bind via CF Pages custom domains)
- **Worker source:** ~/lab/workers/cluster-metrics/throbbing-mouse-98cf/src/index.ts

## Architecture
```
Browser -> CF Pages (static Next.js) -> CF Worker -> Grafana -> Prometheus -> K3s
```
- Static export (`output: 'export'`), all data fetching is client-side via SWR (30s polling)
- Worker has no caching — every request hits Grafana fresh
- CORS wide open on worker (`Access-Control-Allow-Origin: *`)

## API Response Shape
```json
{
  "status": "online",
  "running_pods": number,
  "total_pods": number,
  "succeeded_pods": number,
  "node_count": number,
  "cluster_uptime_seconds": number,
  "cpu_usage_pct": number,
  "memory_usage_pct": number,
  "pvc_bound": number
}
```
Error: `{ "status": "error", "code": number }` (HTTP 502)

## Resolved Decisions
1. **Domain:** s34nj0hn.dev (apex)
2. **Infra map:** Security-focused default (CF Tunnels, Traefik, NetworkPolicies, Authentik, SOPS, Longhorn, MetalLB) with toggle to expand to full infra. No apps shown.
3. **Resume:** No PDF download. Link to LinkedIn (linkedin.com/in/s34nj0hnson/).
4. **Analytics:** Cloudflare Web Analytics (add beacon script to layout).
5. **Repo:** Standalone `s34nj0hn/portfolio` (separate from `s34nj0hn/lab`). `portfolio/` is in lab's .gitignore.

## Content Source
- CV/bio/skills/work history: ~/career-ops/cv.md
- Infra components for map: ~/lab/GitOps/infrastructure/base/ (authentik, traefik, longhorn, metallb, etc.)
- No apps shown in infra map

## Dev Server
```bash
cd ~/lab/portfolio && npm run dev -- -p 3456
```
Launch config also in .claude/launch.json (name: "portfolio", port 3456).

---

## Implementation Status

### Phase 1: Skeleton — COMPLETE
- [x] Project scaffolded (Next.js 16, Tailwind v4, SWR)
- [x] Static export configured (`next.config.ts`)
- [x] Dark theme: background #0a0a0f, accent #00d4ff, Inter + JetBrains Mono
- [x] Types (`src/types/metrics.ts`), constants, API fetcher, SWR hook
- [x] Components: Header, Footer, ClusterStatus, MetricCard, DashboardGrid
- [x] Page assembled with Hero + Dashboard + basic tech stack badges
- [x] Build passes, deployed to CF Pages
- [x] Live at https://portfolio-4j6.pages.dev/

### Phase 2: Chops — IN PROGRESS (widgets built, not yet wired up)

**Built but NOT yet integrated into DashboardGrid or page.tsx:**
- [x] `src/components/dashboard/RadialGauge.tsx` — SVG radial gauge with stroke-dasharray arc, color shifts (green/amber/red), glow filter. For CPU and Memory.
- [x] `src/components/dashboard/PodDonut.tsx` — SVG donut chart with Running/Succeeded/Other segments, legend below.
- [x] `src/components/dashboard/UptimeCounter.tsx` — Live ticking counter (dd:hh:mm:ss), ticks locally via setInterval between API polls.
- [x] `src/components/dashboard/StorageWidget.tsx` — PVC count with "Longhorn distributed storage" callout.
- [x] `src/components/about/TechStack.tsx` — Categorized badge grid (6 categories from CV: Identity and Access, Cloud Security, Infrastructure, SecOps, Observability, Compliance).

**Still TODO for Phase 2:**
- [ ] **Wire up new widgets:** Rewrite `DashboardGrid.tsx` to replace the 6 MetricCards with: 2x RadialGauge (CPU, Memory), 1x PodDonut, 1x UptimeCounter, 1x StorageWidget, 1x MetricCard (Nodes). The new widgets are already built — just need to import and use them.
- [ ] **SecurityArch component** (`src/components/infra/SecurityArch.tsx`): Static layered diagram showing the security path: Cloudflare Edge then Traefik then NetworkPolicies then Authentik then SOPS. Build as styled HTML/CSS or simple SVG. Not data-driven.
- [ ] **Update page.tsx:** Replace the inline tech stack badges with the TechStack component. Add SecurityArch section below it.
- [ ] **Verify build and deploy**

### Phase 3: Wow — NOT STARTED

- [ ] `npm install framer-motion`
- [ ] Scroll-triggered staggered fade-up on sections (Framer Motion `whileInView`)
- [ ] Smooth number interpolation on metric value changes
- [ ] Gauge arc animation on mount (0 to current value)
- [ ] Glassmorphism on all cards: `bg: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06)`
- [ ] Interactive Infrastructure Map (`src/components/infra/InfraMap.tsx`):
  - Hand-crafted SVG: Internet to CF Tunnel to Traefik to K3s Pods
  - GitOps loop: Flux to Git to Cluster
  - Observability loop: Prometheus to Grafana to CF Worker to This Site (self-referential)
  - Default view (security-focused): CF Tunnels/Access, Traefik, NetworkPolicies, Authentik, SOPS, Longhorn, MetalLB
  - Expanded view (toggle): Adds docker-registry, external-mdns, traefik-config, renovate
  - Hover tooltips, animated connection lines (stroke-dasharray animation)
- [ ] Career Timeline (`src/components/about/Timeline.tsx`): Vertical left-aligned from CV work history, Framer Motion whileInView stagger
- [ ] Mobile responsive pass (2-col mobile, 3-4 desktop)
- [ ] SEO: JSON-LD Person schema, robots.txt, sitemap.xml in public/
- [ ] CF Web Analytics beacon script in layout.tsx

### Post-Build:
- [ ] Set up GitHub integration for CF Pages auto-deploy on push (currently manual `wrangler pages deploy`)
- [ ] Bind s34nj0hn.dev custom domain in CF Pages

## Verification Criteria
1. Site loads, metrics update every 30s, "Last updated" timestamp advances
2. Error handling: stale indicator when worker unreachable, not blank page
3. Security: only worker URL visible in DevTools (public, aggregated metrics only)
4. Signal: stack identifiable (K3s/Longhorn/CF) within 30s of landing
5. Mobile: responsive at 375px, 768px, 1024px+
6. Lighthouse: Performance >90, Accessibility >90
