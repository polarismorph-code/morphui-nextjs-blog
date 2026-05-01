import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { ThemeIndicator } from "@/components/theme-indicator";
import { getAllArticles } from "@/content/lib/articles";

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <div className="container max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col">
      <section data-morph-pin className="hero-aurora text-center mb-24">
        <div className="pill mx-auto mb-7">
          <Image
            src="/morph-icon-transparent.svg"
            alt=""
            width={14}
            height={14}
            className="w-3.5 h-3.5"
          />
          <span>Powered by Morph SDK</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-7 tracking-[-0.035em] leading-[1.02]">
          The blog that
          <br />
          <span className="bg-gradient-to-br from-brand-intelligence via-brand-adapt to-brand-signal bg-clip-text text-transparent">
            adapts to you
          </span>
        </h1>

        <p className="text-[17px] md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
          A real Next.js blog demonstrating Morph&apos;s intelligent UI —
          auto dark mode, AI TL;DR, reading mode adaptation, and behavioral
          tracking. Same code, your blog.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/articles/${articles[0]?.slug ?? "building-intelligent-uis"}`}
            className="btn-primary inline-flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold"
          >
            Read the first article
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
          <a
            href="https://github.com/polarismorph-code/morphui-nextjs-blog"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold"
          >
            View on GitHub
          </a>
        </div>

        <ThemeIndicator className="mt-10" />
      </section>

      <section data-morph-pin>
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Latest articles</h2>
          <span className="text-sm text-tertiary-foreground tabular-nums">
            {articles.length} posts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section data-morph-pin className="mt-24 card p-10 text-center">
        <h3 className="text-2xl font-bold mb-3 tracking-tight">
          Build this for your own app
        </h3>
        <p className="text-muted-foreground mb-7 max-w-xl mx-auto leading-relaxed">
          The whole blog is one Morph integration. Clone the repo, add your
          content, ship.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://morphui.dev"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold"
          >
            Get free Morph license
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
          <a
            href="https://morphui.dev/docs/react"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold"
          >
            Read the docs
          </a>
        </div>
      </section>
    </div>
  );
}
