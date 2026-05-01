"use client";

import { MorphZone } from "@morphuiapp/morphui";
import { ReadingProgress } from "./reading-progress";
import { ArticleTOC } from "./article-toc";
import { TLDRSummary } from "./tldr-summary";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@/content/lib/articles";

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <article className="relative">
      <ReadingProgress targetSelector="article" />

      <div className="container max-w-6xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-16">
        <div className="min-w-0">
          <MorphZone id="article-header" priority={0}>
            <header className="mb-10">
              <div className="flex items-center gap-2.5 text-[13px] text-tertiary-foreground mb-6 flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-primary-soft text-primary text-[11px] font-semibold uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-tertiary-foreground" />
                <span className="inline-flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {format(article.date, "MMM d, yyyy")}
                </span>
                <span className="w-1 h-1 rounded-full bg-tertiary-foreground" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime} min read
                </span>
              </div>

              <h1 className="text-4xl md:text-[3rem] font-black tracking-[-0.03em] leading-[1.05] mb-6">
                {article.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {article.description}
              </p>
            </header>
          </MorphZone>

          <MorphZone id="article-tldr" priority={1}>
            <TLDRSummary summary={article.summary} />
          </MorphZone>

          <MorphZone id="article-content" priority={2}>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </MorphZone>

          <MorphZone id="article-cta" priority={3}>
            <div className="card mt-20 p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-10 w-60 h-60 rounded-full bg-primary-soft blur-3xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 tracking-tight">
                  Build this with Morph
                </h3>
                <p className="text-muted-foreground mb-5 max-w-lg leading-relaxed">
                  Auto dark mode, AI TL;DR, reading progress, behavioral
                  tracking — all from one Morph integration.
                </p>
                <a
                  href="https://morphui.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold"
                >
                  Get a free license key
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </MorphZone>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ArticleTOC />
          </div>
        </aside>
      </div>
    </article>
  );
}
