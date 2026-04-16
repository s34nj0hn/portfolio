interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  isLoading?: boolean;
}

export function MetricCard({ label, value, unit, isLoading }: MetricCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-card-border bg-card p-4 transition-shadow hover:shadow-[0_0_20px_var(--color-accent-glow)]">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      {isLoading ? (
        <div className="h-16 w-16 animate-pulse rounded-full bg-card-border" />
      ) : (
        <p className="font-mono text-6xl font-semibold text-foreground leading-none">
          {value}
          {unit && (
            <span className="ml-1 text-sm font-normal text-muted">{unit}</span>
          )}
        </p>
      )}
    </div>
  );
}
