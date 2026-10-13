interface IconProps {
  className?: string;
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2 9h12M9.5 4.5 14 9l-4.5 4.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2v12M4.5 9.5 9 14l4.5-4.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowOut({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 3h7v7M11 3 3 11" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function NoEntry({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="var(--color-signal)" />
      <rect x="4.5" y="8.25" width="11" height="3.5" fill="var(--color-board)" />
    </svg>
  );
}

export function Works({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.5 19 18H1z" fill="var(--color-yellow)" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 7v5" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="14.75" r="1.1" fill="var(--color-ink)" />
    </svg>
  );
}
