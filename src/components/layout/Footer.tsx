export function Footer() {
  return (
    <footer className="border-t border-card-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-sm text-muted">
        <p>
          Powered by{" "}
          <span className="font-mono text-foreground">K3s</span>
          {" / "}
          <span className="font-mono text-foreground">FluxCD</span>
          {" / "}
          <span className="font-mono text-foreground">Cloudflare</span>
        </p>
        <p>&copy; {new Date().getFullYear()} Sean Johnson</p>
      </div>
    </footer>
  );
}
