import { ArrowDown, ArrowOut, ArrowRight } from "@/components/icons";
import { ServiceBoard, StatusLine } from "@/components/live/ServiceBoard";
import { LINKEDIN_URL, PLATFORM_REPO_URL } from "@/content/links";
import { CareerStrip } from "./CareerStrip";

export function Hero() {
  return (
    <section id="top" aria-labelledby="name" className="mx-auto max-w-[1200px] px-6 pt-10 md:px-12 md:pt-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="inline-block rounded-[3px] border-2 border-ink bg-board">
            <h1
              id="name"
              className="px-5 pt-4 pb-3 text-[clamp(3.25rem,11vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.01em] md:px-7 md:pt-6 md:pb-4"
            >
              Sean Johnson
            </h1>
            <div aria-hidden="true" className="flex h-[10px]">
              <span className="flex-1 bg-career" />
              <span className="flex-1 bg-platform" />
              <span className="flex-1 bg-control" />
              <span className="flex-1 bg-signal" />
            </div>
          </div>

          <p className="mt-8 text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.05] font-extrabold tracking-[-0.02em]">
            Platform engineer who does security.
          </p>
          <div className="mt-5 lg:hidden">
            <StatusLine />
          </div>
          <p className="mt-5 max-w-[60ch] text-ink-soft">
            Ten years securing application delivery at F5, most recently WAF and API protection across 100+ enterprise
            environments in a FedRAMP managed service. Alongside it I run a platform line: a GitOps-managed Kubernetes
            cluster with admission policy, private observability, and a public heartbeat you can watch on the map below.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group on-ink inline-flex items-center gap-3 rounded-[3px] bg-ink px-5 py-3.5 text-[0.9375rem] font-bold text-white no-underline transition-colors hover:bg-[#2a2f37]"
            >
              Contact on LinkedIn
              <ArrowRight className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </a>
            <a
              href={PLATFORM_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-[3px] border-2 border-ink bg-board px-5 py-3 text-[0.9375rem] font-bold no-underline transition-colors hover:bg-zone"
            >
              Read the platform source
              <ArrowOut />
            </a>
            <a href="#network" className="group inline-flex items-center gap-2 px-2 py-3 text-[0.9375rem] font-bold underline underline-offset-[6px]">
              Ride the Signal line
              <ArrowDown className="transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 lg:pt-2">
          <ServiceBoard />
        </div>
      </div>

      <CareerStrip />
    </section>
  );
}
