"use client";

interface RadialGaugeProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  isLoading?: boolean;
}

function getColor(pct: number): string {
  if (pct >= 80) return "var(--color-danger)";
  if (pct >= 60) return "var(--color-warning)";
  return "var(--color-accent)";
}

export function RadialGauge({
  label,
  value,
  max = 100,
  unit = "%",
  isLoading,
}: RadialGaugeProps) {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min((value / max) * 100, 100);
  const offset = circumference - (pct / 100) * circumference;
  const color = getColor(pct);

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-card-border bg-card p-4 transition-shadow hover:shadow-[0_0_20px_var(--color-accent-glow)]">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      {isLoading ? (
        <div className="flex h-[120px] w-[120px] items-center justify-center">
          <div className="h-16 w-16 animate-pulse rounded-full bg-card-border" />
        </div>
      ) : (
        <svg
          width={size}
          height={size}
          className="rotate-[-90deg]"
        >
          <defs>
            <filter id={`glow-${label}`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-card-border)"
            strokeWidth={strokeWidth}
          />
          {/* Value arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter={`url(#glow-${label})`}
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.5s ease" }}
          />
          {/* Center text */}
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--color-foreground)"
            fontSize="20"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            transform={`rotate(90 ${size / 2} ${size / 2})`}
          >
            {value.toFixed(1)}
            <tspan fontSize="12" fill="var(--color-muted)">
              {unit}
            </tspan>
          </text>
        </svg>
      )}
    </div>
  );
}
