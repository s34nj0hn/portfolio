"use client";

import { useClusterMetrics } from "@/hooks/useClusterMetrics";
import { formatAge } from "@/lib/service";
import type { Service, ServiceState } from "@/lib/service";

export function StateBar({ state, className = "" }: { state: ServiceState; className?: string }) {
  if (state === "suspended") {
    return (
      <svg className={className} width="40" height="10" viewBox="0 0 40 10" aria-hidden="true">
        <path d="M2 5h14" stroke="var(--color-track-idle)" strokeWidth="6" strokeLinecap="round" />
        <path d="M19 0v10M27 0v10" stroke="var(--color-signal)" strokeWidth="3" />
        <path d="M30 5h8" stroke="var(--color-track-idle)" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={className} width="40" height="10" viewBox="0 0 40 10" aria-hidden="true">
      <path
        d="M3 5h34"
        stroke={state === "checking" ? "var(--color-track-idle)" : "var(--color-signal)"}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={state === "delays" ? "6 6" : undefined}
      />
    </svg>
  );
}

function LineRow({
  name,
  plate,
  service,
  facts,
}: {
  name: string;
  plate: string;
  service: Service;
  facts: string | null;
}) {
  const delayed = service.state === "delays";
  return (
    <div className="border-t border-white/20 py-4 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-[3px] px-2.5 py-1 text-[0.875rem] font-extrabold text-white ${plate}`}>{name}</span>
        <span
          className={`text-[1.0625rem] font-extrabold ${delayed ? "rounded-[3px] bg-yellow px-2 py-0.5 text-ink" : ""} ${
            service.state === "suspended" || service.state === "checking" ? "text-white/75" : ""
          }`}
        >
          {service.word}
        </span>
      </div>
      <p className="mt-2 text-[0.875rem] leading-snug text-white/80">
        {facts ? <span className="readout">{facts}</span> : service.state === "checking" ? (
          <span className="skeleton inline-block h-3 w-40 rounded-sm bg-white/30 align-middle" />
        ) : (
          service.reason
        )}
      </p>
      {delayed && facts && <p className="mt-1 text-[0.875rem] text-white/80">{service.reason}</p>}
    </div>
  );
}

export function ServiceBoard() {
  const { data, signal, control, age } = useClusterMetrics();

  return (
    <section aria-labelledby="board-title" className="on-ink rounded-[3px] bg-ink p-5 text-white">
      <div className="flex items-baseline justify-between gap-3 border-b-2 border-white/80 pb-3">
        <h2 id="board-title" className="text-[1.25rem] font-extrabold">
          Reference cluster
        </h2>
        <span className="text-[0.8125rem] font-bold text-white/75">Live status</span>
      </div>
      <div role="status" aria-live="polite" className="pt-4">
        <LineRow
          name="Control line"
          plate="bg-control"
          service={control}
          facts={
            data
              ? `Flux ${data.flux_ready ? "ready" : "not ready"}, ${data.gatekeeper_constraints} policies, ${data.gatekeeper_violations} violations`
              : null
          }
        />
        <LineRow
          name="Signal line"
          plate="bg-signal"
          service={signal}
          facts={data ? `${data.running_pods}/${data.total_pods} pods, checked ${age !== null ? formatAge(age) : "0s"} ago` : null}
        />
      </div>
    </section>
  );
}

export function StatusLine() {
  const { data, signal, age } = useClusterMetrics();
  return (
    <a
      href="#network"
      className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[3px] border-2 border-ink bg-board px-3 py-2.5 text-[0.9375rem] font-bold no-underline lg:hidden"
    >
      <StateBar state={signal.state} />
      <span>Cluster: {signal.word}</span>
      {data && age !== null && (
        <span className="readout text-[0.8125rem] text-ink-soft">
          {data.running_pods}/{data.total_pods} pods, {formatAge(age)} ago
        </span>
      )}
    </a>
  );
}
