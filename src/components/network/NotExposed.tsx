import { NoEntry, Works } from "@/components/icons";
import { NOT_EXPOSED, PLANNED_WORKS } from "@/content/network";
import { PLATFORM_REPO_URL } from "@/content/links";

export function NotExposed() {
  return (
    <section aria-labelledby="restraint-title" className="mx-auto max-w-[1200px] px-6 pt-20 md:px-12">
      <div className="grid gap-px overflow-hidden rounded-[3px] border-2 border-ink bg-ink lg:grid-cols-2">
        <div className="bg-board p-6 md:p-8">
          <h2 id="restraint-title" className="text-[1.5rem] leading-tight font-extrabold tracking-[-0.015em]">
            What the heartbeat will not tell you
          </h2>
          <p className="mt-3 max-w-[52ch] text-ink-soft">
            The Worker runs fixed queries and hand-builds its response. What it leaves out is the point.
          </p>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {NOT_EXPOSED.map((item) => (
              <li key={item} className="flex items-center gap-3 font-bold">
                <NoEntry className="shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-board p-6 md:p-8">
          <h2 className="text-[1.5rem] leading-tight font-extrabold tracking-[-0.015em]">Planned works</h2>
          <p className="mt-3 max-w-[52ch] text-ink-soft">
            This is a reference platform, not a production program. The repo lists its gaps in the open, and so does this
            page.
          </p>
          <ul className="mt-6 space-y-3">
            {PLANNED_WORKS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Works className="mt-[3px] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={`${PLATFORM_REPO_URL}/blob/main/docs/roadmap.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-[0.9375rem] font-bold underline underline-offset-[6px]"
          >
            Read the roadmap
          </a>
        </div>
      </div>
    </section>
  );
}
