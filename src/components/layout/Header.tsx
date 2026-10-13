import { LINKEDIN_URL, PLATFORM_REPO_URL } from "@/content/links";

const SECTIONS = [
  { href: "#network", label: "The network" },
  { href: "#timetable", label: "Timetable" },
  { href: "#stack", label: "Stack" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-map">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-6 px-6 md:px-12">
        <a href="#top" className="flex shrink-0 items-center gap-2 text-[0.9375rem] font-extrabold tracking-[-0.01em] no-underline">
          <span aria-hidden="true" className="flex h-5 items-stretch gap-[3px]">
            <span className="w-[5px] bg-career" />
            <span className="w-[5px] bg-platform" />
            <span className="w-[5px] bg-control" />
            <span className="w-[5px] bg-signal" />
          </span>
          s34nj0hn.dev
        </a>
        <nav aria-label="Sections" className="flex flex-1 items-center justify-end gap-5 text-[0.875rem] font-bold whitespace-nowrap">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className="hidden py-2 underline-offset-[6px] hover:underline md:inline">
              {s.label}
            </a>
          ))}
          <span aria-hidden="true" className="hidden h-5 w-px bg-rule md:block" />
          <a href={PLATFORM_REPO_URL} target="_blank" rel="noopener noreferrer" className="py-2 underline-offset-[6px] hover:underline">
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="py-2 underline-offset-[6px] hover:underline">
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
