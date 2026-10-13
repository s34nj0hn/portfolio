import { ROLES } from "@/content/career";

const LINE = {
  career: { name: "Career line", className: "bg-career" },
  platform: { name: "Platform line", className: "bg-platform" },
};

function Bullet({ text }: { text: string }) {
  return (
    <li className="relative pl-5">
      <span aria-hidden="true" className="absolute top-[0.62em] left-0 h-[3px] w-2.5 bg-ink" />
      {text}
    </li>
  );
}

export function Timetable() {
  return (
    <section id="timetable" aria-labelledby="timetable-title" className="mx-auto max-w-[1200px] px-6 pt-24 md:px-12 md:pt-32">
      <h2 id="timetable-title" className="text-[clamp(2rem,5vw,3rem)] leading-none font-extrabold tracking-[-0.025em]">
        Timetable
      </h2>
      <p className="mt-4 max-w-[60ch] text-ink-soft">Every stop on the Career and Platform lines, newest first.</p>

      <ol className="mt-10 border-t-2 border-ink">
        {ROLES.map((r) => {
          const rest = r.bullets.filter((_, i) => i !== r.lead);
          return (
            <li key={r.id} className="grid gap-x-12 gap-y-3 border-b border-rule py-7 lg:grid-cols-12">
              <div className="lg:col-span-9 lg:col-start-4 lg:row-start-1">
                <h3 className="text-[1.375rem] leading-tight font-extrabold tracking-[-0.01em]">{r.role}</h3>
                <p className="mt-1 font-bold text-ink-soft">
                  {r.company}, {r.location}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:block">
                <p className="readout text-[0.9375rem]">{r.period}</p>
                <p className="flex items-center gap-2 text-[0.8125rem] font-bold lg:mt-2">
                  <span aria-hidden="true" className={`h-[6px] w-6 rounded-full ${LINE[r.line].className}`} />
                  {LINE[r.line].name}
                </p>
              </div>
              <div className="lg:col-span-9 lg:col-start-4">
                <ul className="max-w-[68ch]">
                  <Bullet text={r.bullets[r.lead]} />
                </ul>
                {rest.length > 0 && (
                  <details className="group mt-3 max-w-[68ch]">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-[3px] py-1 text-[0.9375rem] font-bold underline underline-offset-[6px] [&::-webkit-details-marker]:hidden">
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="transition-transform group-open:rotate-90">
                        <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                      <span className="group-open:hidden">
                        {rest.length} more from this stop
                      </span>
                      <span className="hidden group-open:inline">Show less</span>
                    </summary>
                    <ul className="mt-3 space-y-2.5">
                      {rest.map((b) => (
                        <Bullet key={b} text={b} />
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
