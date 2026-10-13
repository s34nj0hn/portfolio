"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowOut } from "@/components/icons";
import { BreakablePath } from "@/components/BreakablePath";
import { StateBar } from "@/components/live/ServiceBoard";
import { useClusterMetrics } from "@/hooks/useClusterMetrics";
import type { ServiceState } from "@/lib/service";
import type { ClusterMetrics } from "@/types/metrics";
import {
  CONTROL_PATH,
  LINES,
  MAP_H,
  MAP_W,
  SIGNAL_PATH,
  STATIONS,
  ZONES,
  type LineId,
  type Station,
  type StationId,
  type Zone,
} from "@/content/network";

const GREEN = "var(--color-control)";
const RED = "var(--color-signal)";
const IDLE = "var(--color-track-idle)";
const INK = "var(--color-ink)";

const ZONE_NAME: Record<Zone, string> = {
  public: "Public internet",
  private: "Private network",
  edge: "Cloudflare edge",
};

interface Live {
  data: ClusterMetrics | undefined;
  age: number | null;
  state: ServiceState;
  control: ServiceState;
}

function signalLook(state: ServiceState) {
  return {
    color: state === "good" || state === "delays" ? RED : IDLE,
    dash: state === "delays" ? "16 12" : undefined,
  };
}

function lineColor(line: LineId, state: ServiceState) {
  return line === "control" ? GREEN : signalLook(state).color;
}

/* ---------- wide map ---------- */

function useTrain(lastUpdated: number | null) {
  const pathRef = useRef<SVGPathElement>(null);
  const trainRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const train = trainRef.current;
    if (!lastUpdated || !path || !train) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const total = path.getTotalLength();
    const duration = 2400;
    const start = performance.now();
    let frame = 0;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const pt = path.getPointAtLength(eased * total);
      train.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      train.style.opacity = p < 1 ? "1" : "0";
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [lastUpdated]);

  return { pathRef, trainRef };
}

function StationMark({ s, state, selected }: { s: Station; state: ServiceState; selected: boolean }) {
  const halo = selected ? <circle cx={s.x} cy={s.y} r={24} fill="var(--color-yellow)" /> : null;

  if (s.lines.length > 1) {
    return (
      <g>
        {halo}
        <circle cx={s.x} cy={s.y} r={14} fill="var(--color-board)" stroke={INK} strokeWidth={5} />
      </g>
    );
  }

  const color = lineColor(s.lines[0], state);
  if (s.id === "github" || s.id === "page") {
    return (
      <g>
        {halo}
        <rect x={s.x - 4} y={s.y - 17} width={8} height={34} fill={color} />
      </g>
    );
  }
  const sideways = s.labelSide === "right" || s.labelSide === "below-right";
  const up = s.labelSide === "above";
  return (
    <g>
      {halo}
      {sideways ? (
        <rect x={s.x} y={s.y - 3.5} width={16} height={7} fill={color} />
      ) : (
        <rect x={s.x - 3.5} y={up ? s.y - 16 : s.y} width={7} height={16} fill={color} />
      )}
    </g>
  );
}

const LABEL_TRANSFORM: Record<Station["labelSide"], string> = {
  above: "translate(-50%, calc(-100% - 20px))",
  below: "translate(-50%, 20px)",
  right: "translate(26px, -50%)",
  "below-right": "translate(22px, 6px)",
};

function readingOf(s: Station, live: Live): string[] | null {
  if (!s.read) return [];
  return live.state === "checking" ? null : s.read(live.data, live.age);
}

function StationLabel({ s, live, selected, onSelect }: { s: Station; live: Live; selected: boolean; onSelect: () => void }) {
  const centered = s.labelSide === "above" || s.labelSide === "below";
  const reading = readingOf(s, live);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-controls="station-board"
      className={`group absolute rounded-[3px] border-2 px-2 py-1 whitespace-nowrap transition-colors ${
        centered ? "text-center" : "text-left"
      } ${selected ? "border-ink bg-board" : "border-transparent hover:border-ink/30 hover:bg-board/70"}`}
      style={{ left: `${(s.x / MAP_W) * 100}%`, top: `${(s.y / MAP_H) * 100}%`, transform: LABEL_TRANSFORM[s.labelSide] }}
    >
      <span className="block text-[1.0625rem] leading-tight font-extrabold">{s.name}</span>
      {s.facts?.map((f) => (
        <span key={f} className="block text-[0.875rem] leading-[1.3] text-ink-soft">
          {f}
        </span>
      ))}
      {reading ? (
        reading.map((r) => (
          <span key={r} className="readout block text-[0.8125rem] leading-[1.35] text-ink-soft">
            {r}
          </span>
        ))
      ) : (
        <span className={`skeleton mt-1 block h-2.5 w-16 rounded-sm bg-rule ${centered ? "mx-auto" : ""}`} />
      )}
    </button>
  );
}

function WideMap({
  live,
  lastUpdated,
  selected,
  onSelect,
}: {
  live: Live;
  lastUpdated: number | null;
  selected: StationId;
  onSelect: (id: StationId) => void;
}) {
  const { pathRef, trainRef } = useTrain(live.state === "good" || live.state === "delays" ? lastUpdated : null);
  const look = signalLook(live.state);
  const suspended = live.state === "suspended";

  return (
    <div className="relative hidden w-full lg:block" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect
          x={ZONES.private.x}
          y={ZONES.private.y}
          width={ZONES.private.w}
          height={ZONES.private.h}
          rx={20}
          fill="var(--color-zone)"
          stroke="var(--color-ink-soft)"
          strokeWidth={1.5}
          strokeDasharray="7 6"
        />
        <rect
          x={ZONES.edge.x}
          y={ZONES.edge.y}
          width={ZONES.edge.w}
          height={ZONES.edge.h}
          rx={20}
          fill="none"
          stroke="var(--color-ink-soft)"
          strokeWidth={1.5}
          strokeDasharray="7 6"
        />
        <text x={ZONES.private.x + 20} y={ZONES.private.y + ZONES.private.h - 18} className="zone-label">
          {ZONES.private.label}
        </text>
        <text x={ZONES.edge.x + ZONES.edge.w - 20} y={ZONES.edge.y + ZONES.edge.h - 16} textAnchor="end" className="zone-label">
          {ZONES.edge.label}
        </text>
        <text x={24} y={MAP_H - 16} className="zone-label">
          Public internet
        </text>

        <path d={CONTROL_PATH} stroke={GREEN} strokeWidth={10} strokeLinecap="round" strokeDasharray={live.control === "delays" ? "16 12" : undefined} fill="none" />
        {suspended ? (
          <>
            <path d="M720 180 H940 L1000 240 V340 L940 400 H690" stroke={IDLE} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M600 400 H450" stroke={IDLE} strokeWidth={10} strokeLinecap="round" fill="none" />
            <rect x={676} y={382} width={7} height={36} fill={RED} />
            <rect x={607} y={382} width={7} height={36} fill={RED} />
            <text x={645} y={372} textAnchor="middle" className="zone-label" style={{ fill: RED }}>
              Suspended
            </text>
          </>
        ) : (
          <path
            ref={pathRef}
            d={SIGNAL_PATH}
            stroke={look.color}
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={look.dash}
            fill="none"
          />
        )}

        {STATIONS.map((s) => (
          <StationMark key={s.id} s={s} state={live.state} selected={selected === s.id} />
        ))}

        <g ref={trainRef} style={{ opacity: 0 }}>
          <rect x={-17} y={-9} width={34} height={18} rx={9} fill="var(--color-board)" stroke={RED} strokeWidth={4} />
          <circle cx={7} cy={0} r={3} fill={RED} />
        </g>
      </svg>

      {STATIONS.map((s) => (
        <StationLabel key={s.id} s={s} live={live} selected={selected === s.id} onSelect={() => onSelect(s.id)} />
      ))}
    </div>
  );
}

/* ---------- station detail ---------- */

function LineBadges({ s, state }: { s: Station; state: ServiceState }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      {s.lines.map((l) => (
        <li key={l} className="flex items-center gap-2 text-[0.8125rem] font-bold">
          <span aria-hidden="true" className="h-[6px] w-6 rounded-full" style={{ background: lineColor(l, state) }} />
          {LINES[l].name}
        </li>
      ))}
    </ul>
  );
}

function Sources({ s }: { s: Station }) {
  return (
    <ul className="space-y-1.5">
      {s.sources.map((src) => (
        <li key={src.href}>
          <a
            href={src.href}
            target="_blank"
            rel="noopener noreferrer"
            className="readout inline-flex items-baseline gap-1.5 text-[0.8125rem] underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            <span>
              <BreakablePath text={src.label} />
            </span>
            <ArrowOut className="shrink-0 translate-y-[1px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function StationBoard({ s, live }: { s: Station; live: Live }) {
  const reading = readingOf(s, live);
  return (
    <div
      id="station-board"
      aria-live="polite"
      className="mt-6 hidden rounded-[3px] border-2 border-ink bg-board lg:grid lg:grid-cols-12"
    >
      <div className="col-span-4 border-r-2 border-ink p-6">
        <h3 className="text-[2rem] leading-none font-extrabold tracking-[-0.01em]">{s.name}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <LineBadges s={s} state={live.state} />
          <span className="text-[0.8125rem] font-bold text-ink-soft">{ZONE_NAME[s.zone]}</span>
        </div>
      </div>
      <div className="col-span-5 p-6">
        <h4 className="text-[0.8125rem] font-bold text-ink-soft">How it works</h4>
        <p className="mt-2 max-w-[56ch]">{s.does}</p>
      </div>
      <div className="col-span-3 border-l border-rule p-6">
        <h4 className="text-[0.8125rem] font-bold text-ink-soft">{s.read ? "Live reading" : "Fixed by design"}</h4>
        <ul className="mt-2 space-y-0.5">
          {s.facts?.map((f) => (
            <li key={f} className="text-[0.9375rem]">
              {f}
            </li>
          ))}
          {reading ? (
            reading.map((r) => (
              <li key={r} className="readout text-[0.9375rem]">
                {r}
              </li>
            ))
          ) : (
            <li className="skeleton h-3 w-24 rounded-sm bg-rule" />
          )}
        </ul>
        <h4 className="mt-5 text-[0.8125rem] font-bold text-ink-soft">Source</h4>
        <div className="mt-2">
          <Sources s={s} />
        </div>
      </div>
    </div>
  );
}

/* ---------- narrow strip map ---------- */

function rail(color: string, dashed: boolean) {
  return dashed
    ? { background: `repeating-linear-gradient(to bottom, ${color} 0 14px, transparent 14px 24px)` }
    : { background: color };
}

function StripRow({
  s,
  live,
  open,
  onToggle,
}: {
  s: Station;
  live: Live;
  open: boolean;
  onToggle: () => void;
}) {
  const look = signalLook(live.state);
  const dashed = live.state === "delays";
  const isSignal = s.lines.includes("signal") && s.lines.length === 1;
  const color = isSignal ? look.color : GREEN;
  const reading = readingOf(s, live);
  const first = s.id === "github";
  const last = s.id === "page";
  const interchange = s.lines.length > 1;
  const breakBefore = last && live.state === "suspended";

  return (
    <div role="listitem" className="relative grid grid-cols-[52px_1fr]">
      <div aria-hidden="true" className="relative">
        {interchange ? (
          <>
            <span className="absolute top-0 left-[22px] h-1/2 w-2" style={rail(GREEN, live.control === "delays")} />
            <span className="absolute top-1/2 bottom-0 left-[22px] w-2" style={rail(look.color, dashed)} />
            <span className="absolute top-[26px] left-[13px] h-[26px] w-[26px] rounded-full border-[5px] border-ink bg-board" />
          </>
        ) : (
          <>
            <span
              className="absolute left-[22px] w-2"
              style={{ ...rail(color, isSignal ? dashed : live.control === "delays"), top: first ? 36 : 0, bottom: last ? "calc(100% - 40px)" : 0 }}
            />
            {first || last ? (
              <span className="absolute top-[36px] left-[12px] h-2 w-7" style={{ background: color }} />
            ) : (
              <span className="absolute top-[36px] left-[30px] h-[7px] w-3.5" style={{ background: color }} />
            )}
            {breakBefore && <span className="absolute top-[10px] left-[14px] h-[6px] w-6" style={{ background: RED }} />}
          </>
        )}
      </div>
      <div className="pt-5 pb-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-3 rounded-[3px] text-left"
        >
          <span>
            <span className="block text-[1.125rem] leading-tight font-extrabold">{s.name}</span>
            {s.facts && <span className="block text-[0.875rem] text-ink-soft">{s.facts.join(" · ")}</span>}
            {reading ? (
              reading.length > 0 && <span className="readout block text-[0.8125rem] text-ink-soft">{reading.join(" · ")}</span>
            ) : (
              <span className="skeleton mt-1.5 block h-2.5 w-24 rounded-sm bg-rule" />
            )}
          </span>
          <span className="mt-0.5 shrink-0 text-[0.8125rem] font-bold underline underline-offset-4">{open ? "Close" : "How it works"}</span>
        </button>
        {open && (
          <div className="mt-3 space-y-3 pr-1">
            <p className="text-[0.9375rem]">{s.does}</p>
            <Sources s={s} />
          </div>
        )}
      </div>
    </div>
  );
}

function StripMap({ live }: { live: Live }) {
  const [open, setOpen] = useState<StationId | null>(null);
  const groups: { zone: Zone; stations: Station[] }[] = [];
  for (const s of STATIONS) {
    const g = groups[groups.length - 1];
    if (g && g.zone === s.zone) g.stations.push(s);
    else groups.push({ zone: s.zone, stations: [s] });
  }
  const look = signalLook(live.state);

  return (
    <div role="list" aria-label="Stations on the network, in order" className="lg:hidden">
      {groups.map((g, gi) => {
        const afterInterchange = gi > 1;
        const railColor = afterInterchange ? look.color : GREEN;
        return (
          <div
            key={`${g.zone}-${gi}`}
            className={`relative rounded-[14px] ${
              g.zone === "private" ? "border-[1.5px] border-dashed border-ink-soft bg-zone" : g.zone === "edge" ? "border-[1.5px] border-dashed border-ink-soft" : ""
            }`}
          >
            {gi > 0 && (
              <div aria-hidden="true" className="relative grid h-9 grid-cols-[52px_1fr] items-end">
                <span className="absolute top-0 bottom-0 left-[22px] w-2" style={rail(railColor, afterInterchange && live.state === "delays")} />
                <span className="col-start-2 pb-1 text-[0.8125rem] font-bold text-ink-soft">{ZONE_NAME[g.zone]}</span>
              </div>
            )}
            {g.stations.map((s) => (
              <StripRow key={s.id} s={s} live={live} open={open === s.id} onToggle={() => setOpen(open === s.id ? null : s.id)} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- section ---------- */

export function NetworkSection() {
  const { data, signal, control, age, lastUpdated } = useClusterMetrics();
  const [selected, setSelected] = useState<StationId>("worker");
  const live: Live = { data, age, state: signal.state, control: control.state };
  const station = STATIONS.find((s) => s.id === selected) ?? STATIONS[0];

  return (
    <section id="network" aria-labelledby="network-title" className="mx-auto max-w-[1200px] px-6 pt-24 md:px-12 md:pt-32">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="network-title" className="text-[clamp(2rem,5vw,3rem)] leading-none font-extrabold tracking-[-0.025em]">
            The network
          </h2>
          <p className="mt-4 max-w-[60ch] text-ink-soft">
            Every station is a component running in the reference cluster now. The Control line is how a change reaches the
            cluster. The Signal line is how this page learns the cluster is healthy, and the numbers on it are live.
            <span className="hidden lg:inline"> Select a station to see how it works.</span>
          </p>
        </div>
        <div className="space-y-3 text-[0.8125rem] font-bold lg:col-span-5 lg:justify-self-end">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="w-full text-ink-soft sm:w-auto lg:w-28">Lines</span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-[6px] w-7 rounded-full bg-control" />
              Control
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-[6px] w-7 rounded-full bg-signal" />
              Signal
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="w-full text-ink-soft sm:w-auto lg:w-28">Signal line status</span>
            {(["good", "delays", "suspended", "checking"] as const).map((st) => (
              <span key={st} className="flex items-center gap-2">
                <StateBar state={st} />
                {{ good: "Good service", delays: "Minor delays", suspended: "Suspended", checking: "No reading" }[st]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <WideMap live={live} lastUpdated={lastUpdated} selected={selected} onSelect={setSelected} />
        <StationBoard s={station} live={live} />
        <StripMap live={live} />
      </div>
    </section>
  );
}
