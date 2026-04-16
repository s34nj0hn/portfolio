export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span className="font-mono text-sm font-semibold tracking-tight text-accent">
          s34nj0hn.dev
        </span>
        <nav className="flex gap-6 text-sm text-muted">
          <a href="#dashboard" className="transition-colors hover:text-foreground">
            Dashboard
          </a>
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a
            href="https://linkedin.com/in/s34nj0hnson/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/s34nj0hn/lab"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
