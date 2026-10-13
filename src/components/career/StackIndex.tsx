import { STACK } from "@/content/stack";

export function StackIndex() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-[1200px] px-6 pt-24 md:px-12 md:pt-32">
      <h2 id="stack-title" className="text-[clamp(2rem,5vw,3rem)] leading-none font-extrabold tracking-[-0.025em]">
        Stack
      </h2>
      <dl className="mt-10 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((cat) => (
          <div key={cat.name} className="border-b border-rule py-6 sm:pr-8">
            <dt className="text-[1.0625rem] font-extrabold">{cat.name}</dt>
            <dd className="mt-2 text-ink-soft">{cat.skills.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
