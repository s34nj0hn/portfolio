import { CERTIFICATIONS } from "@/content/stack";
import { LINKEDIN_URL, PLATFORM_REPO_URL, PORTFOLIO_REPO_URL } from "@/content/links";
import { WORKER_URL } from "@/lib/constants";
import { BreakablePath } from "@/components/BreakablePath";

const linkClass = "underline decoration-white/40 underline-offset-4 hover:decoration-white";

export function Footer() {
  const endpoint = WORKER_URL.replace(/^https?:\/\//, "");
  return (
    <footer className="on-ink mt-28 bg-ink text-white">
      <div aria-hidden="true" className="flex h-[10px]">
        <span className="flex-1 bg-career" />
        <span className="flex-1 bg-platform" />
        <span className="flex-1 bg-control" />
        <span className="flex-1 bg-signal" />
      </div>
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-12">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-[0.8125rem] font-bold text-white/70">Contact</dt>
            <dd className="mt-2 font-bold">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] font-bold text-white/70">Certifications</dt>
            {CERTIFICATIONS.map((c) => (
              <dd key={c} className="mt-2 font-bold">
                {c}
              </dd>
            ))}
          </div>
          <div>
            <dt className="text-[0.8125rem] font-bold text-white/70">Source</dt>
            <dd className="mt-2 font-bold">
              <a href={PLATFORM_REPO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                k8s-platform-reference
              </a>
            </dd>
            <dd className="mt-2 font-bold">
              <a href={PORTFOLIO_REPO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                portfolio
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] font-bold text-white/70">Telemetry</dt>
            <dd className="readout mt-2 text-[0.875rem]">
              GET <BreakablePath text={endpoint} />
            </dd>
          </div>
        </dl>
        <p className="mt-12 border-t border-white/20 pt-6 text-[0.875rem] text-white/70">
          © {new Date().getFullYear()} Sean Johnson
        </p>
      </div>
    </footer>
  );
}
