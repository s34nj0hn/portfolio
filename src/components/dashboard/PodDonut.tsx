"use client";

interface PodDonutProps {
  running: number;
  succeeded: number;
  total: number;
  isLoading?: boolean;
}

interface Segment {
  label: string;
  value: number;
  color: string;
}

export function PodDonut({
  running,
  succeeded,
  total,
  isLoading,
}: PodDonutProps) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const other = Math.max(0, total - running - succeeded);
  const segments: Segment[] = [
    { label: "Running", value: running, color: "var(--color-accent)" },
    { label: "Succeeded", value: succeeded, color: "var(--color-success)" },
    { label: "Other", value: other, color: "var(--color-muted)" },
  ].filter((s) => s.value > 0);

  let cumulativeOffset = 0;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-card-border bg-card p-4 transition-shadow hover:shadow-[0_0_20px_var(--color-accent-glow)]">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        Pod Status
      </p>
      {isLoading ? (
        <div className="flex h-[120px] w-[120px] items-center justify-center">
          <div className="h-16 w-16 animate-pulse rounded-full bg-card-border" />
        </div>
      ) : (
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-card-border)"
            strokeWidth={strokeWidth}
          />
          {/* Segments */}
          {segments.map((seg) => {
            const segLength = total > 0 ? (seg.value / total) * circumference : 0;
            const dashOffset = circumference - segLength;
            const rotation = (cumulativeOffset / circumference) * 360;
            cumulativeOffset += segLength;
            return (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
                strokeDasharray={`${segLength} ${circumference - segLength}`}
                transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
                style={{ transition: "stroke-dasharray 0.8s ease" }}
              />
            );
          })}
          {/* Center text */}
          <text
            x={size / 2}
            y={size / 2 - 6}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--color-foreground)"
            fontSize="18"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            transform={`rotate(90 ${size / 2} ${size / 2})`}
          >
            {running}/{total}
          </text>
          <text
            x={size / 2}
            y={size / 2 + 12}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--color-muted)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            transform={`rotate(90 ${size / 2} ${size / 2})`}
          >
            pods
          </text>
        </svg>
      )}
      {/* Legend */}
      {!isLoading && (
        <div className="flex gap-3 text-[10px] text-muted">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              {seg.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
