import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      data-morph-pin
      className="border-t border-border mt-24 py-10"
    >
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <a
              href="https://morphui.dev"
              target="_blank"
              rel="noreferrer"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Morph SDK
            </a>{" "}
            · Open source example
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/playground"
              className="hover:text-foreground transition-colors"
            >
              Playground
            </Link>
            <a
              href="https://github.com/polarismorph-code/morphui-nextjs-blog"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://morphui.dev/docs/react"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Docs
            </a>
            <a
              href="https://morphui.dev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              morphui.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
