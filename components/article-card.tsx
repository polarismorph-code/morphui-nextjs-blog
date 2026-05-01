import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@/content/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      prefetch={false}
      className="group card card-hover block p-7 relative"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="px-2.5 py-1 rounded-md bg-primary-soft text-primary text-[11px] font-semibold uppercase tracking-wider">
          {article.category}
        </span>
        <span className="text-[11px] text-tertiary-foreground tabular-nums">
          {article.readingTime} min
        </span>
      </div>

      <h3 className="text-[19px] font-bold mb-3 leading-snug tracking-tight group-hover:text-primary transition-colors">
        {article.title}
      </h3>

      <p className="text-[14px] text-muted-foreground line-clamp-3 leading-relaxed mb-6">
        {article.description}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-border">
        <span className="text-xs text-tertiary-foreground tabular-nums">
          {format(article.date, "MMM d, yyyy")}
        </span>
        <span className="grid place-items-center w-7 h-7 rounded-full bg-elevated group-hover:bg-primary-soft transition-colors">
          <ArrowUpRight
            className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors"
            strokeWidth={2.5}
          />
        </span>
      </div>
    </Link>
  );
}
