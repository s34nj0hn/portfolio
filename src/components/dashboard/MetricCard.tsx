interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  isLoading?: boolean;
}

export function MetricCard({ label, value, unit, isLoading }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-card-border bg-card p-4 transition-shadow hover:shadow-[0_0_20px_var(--color-accent-glow)]">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      {isLoading ? (
        <div className="mt-2 h-8 w-20 animate-pulse rounded bg-card-border" />
      ) : (
        <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
          {value}
          {unit && (
            <span className="ml-1 text-sm font-normal text-muted">{unit}</span>
          )}
        </p>
      )}
    </div>
  );
}
