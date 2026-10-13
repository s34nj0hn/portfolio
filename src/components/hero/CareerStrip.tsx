const BLUE = "var(--color-career)";
const PURPLE = "var(--color-platform)";
const INK = "var(--color-ink)";
const SOFT = "var(--color-ink-soft)";

function Interchange({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="var(--color-board)" stroke={INK} strokeWidth="4" />;
}

function Tick({ x, y, dir, color }: { x: number; y: number; dir: 1 | -1; color: string }) {
  return <rect x={x - 3} y={dir === 1 ? y : y - 13} width="6" height="13" fill={color} />;
}

function Label({
  x,
  y,
  year,
  lines,
  anchor = "middle",
  size = 18,
}: {
  x: number;
  y: number;
  year: string;
  lines: string[];
  anchor?: "start" | "middle" | "end";
  size?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={INK} style={{ fontFamily: "var(--font-sans)" }}>
      <tspan x={x} fontSize={size * 0.8} fill={SOFT} style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
        {year}
      </tspan>
      {lines.map((l, i) => (
        <tspan key={l} x={x} dy={i === 0 ? size * 1.15 : size * 1.1} fontSize={size} fontWeight={700}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

function Wide() {
  return (
    <svg viewBox="0 0 1200 230" className="hidden w-full lg:block" role="img" aria-labelledby="career-strip-title">
      <title id="career-strip-title">
        Career line from Xbox Live operations in 2014 through F5 application delivery from 2016 to F5 Distributed Cloud in 2024.
        The platform line branches off in 2022 for the platform lab and the 2026 reference cluster, and both lines meet now.
      </title>
      <path className="draw" pathLength={1} d="M30 140 H1100" stroke={BLUE} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path
        className="draw draw-late"
        pathLength={1}
        d="M600 140 L660 80 H1040 L1100 140"
        stroke={PURPLE}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Tick x={110} y={140} dir={1} color={BLUE} />
      <Tick x={360} y={140} dir={1} color={BLUE} />
      <Tick x={840} y={140} dir={1} color={BLUE} />
      <Tick x={760} y={80} dir={-1} color={PURPLE} />
      <Tick x={950} y={80} dir={-1} color={PURPLE} />
      <Interchange x={1100} y={140} r={13} />

      <Label x={110} y={176} year="2014" lines={["Xbox Live operations"]} />
      <Label x={360} y={176} year="2016" lines={["F5 application delivery"]} />
      <Label x={840} y={176} year="2024" lines={["F5 Distributed Cloud"]} />
      <Label x={760} y={22} year="2022" lines={["Platform lab"]} />
      <Label x={950} y={22} year="2026" lines={["Reference cluster"]} />
      <Label x={1124} y={176} year="Now" lines={["Platform engineer", "who does security"]} anchor="end" />

      <text x={500} y={128} fontSize="14" fontWeight="700" fill={BLUE} textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>
        Career line
      </text>
      <text x={630} y={58} fontSize="14" fontWeight="700" fill={PURPLE} textAnchor="end" style={{ fontFamily: "var(--font-sans)" }}>
        Platform line
      </text>
    </svg>
  );
}

function Narrow() {
  const bx = 150;
  const px = 186;
  return (
    <svg viewBox="0 0 340 560" className="w-full max-w-[420px] lg:hidden" role="img" aria-labelledby="career-strip-title-narrow">
      <title id="career-strip-title-narrow">
        Career line from Xbox Live operations in 2014 through F5 application delivery from 2016 to F5 Distributed Cloud in 2024.
        The platform line branches off in 2022 for the platform lab and the 2026 reference cluster, and both lines meet now.
      </title>
      <path className="draw" pathLength={1} d={`M${bx} 16 V470`} stroke={BLUE} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path
        className="draw draw-late"
        pathLength={1}
        d={`M${bx} 196 L${px} 232 V434 L${bx} 470`}
        stroke={PURPLE}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x={bx - 13} y={46} width="13" height="6" fill={BLUE} />
      <rect x={bx - 13} y={126} width="13" height="6" fill={BLUE} />
      <rect x={bx - 13} y={372} width="13" height="6" fill={BLUE} />
      <rect x={px} y={268} width="13" height="6" fill={PURPLE} />
      <rect x={px} y={338} width="13" height="6" fill={PURPLE} />
      <Interchange x={bx} y={470} r={12} />

      <Label x={bx - 22} y={44} year="2014" lines={["Xbox Live", "operations"]} anchor="end" size={15} />
      <Label x={bx - 22} y={124} year="2016" lines={["F5 application", "delivery"]} anchor="end" size={15} />
      <Label x={bx - 22} y={370} year="2024" lines={["F5 Distributed", "Cloud"]} anchor="end" size={15} />
      <Label x={px + 24} y={266} year="2022" lines={["Platform lab"]} anchor="start" size={15} />
      <Label x={px + 24} y={336} year="2026" lines={["Reference", "cluster"]} anchor="start" size={15} />
      <Label x={bx} y={502} year="Now" lines={["Platform engineer who does security"]} size={15} />
    </svg>
  );
}

export function CareerStrip() {
  return (
    <div className="mt-14 border-t-2 border-ink pt-8 lg:mt-20">
      <Wide />
      <Narrow />
    </div>
  );
}
