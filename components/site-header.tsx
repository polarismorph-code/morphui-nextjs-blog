import Link from "next/link";
import { Sparkles } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.17.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.48 3.18-1.17 3.18-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.41-2.7 5.36-5.27 5.65.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[15px] tracking-tight"
        >
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-primary-soft border border-[color:color-mix(in_srgb,var(--primary)_22%,transparent)]">
            <Sparkles className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
          </span>
          Morph Blog
        </Link>

        <nav className="flex items-center gap-2">
          <a
            href="https://morphui.dev"
            target="_blank"
            rel="noreferrer"
            className="px-3 h-9 hidden sm:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Get Morph
          </a>
          <a
            href="https://github.com/morphuiapp/morphui-nextjs-blog"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2 h-9 px-3.5 rounded-lg text-sm font-medium"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
