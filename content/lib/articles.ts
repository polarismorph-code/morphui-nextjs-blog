import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  readingTime: number;
  summary: string;
  html: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

const processor = remark()
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: { className: ["anchor-link"], "aria-label": "Permalink" },
    content: { type: "text", value: "#" },
  })
  .use(rehypeStringify);

export async function getAllArticles(): Promise<Article[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  const articles = await Promise.all(
    files.filter((f) => f.endsWith(".mdx")).map(parseArticle),
  );
  return articles.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    return await parseArticle(`${slug}.mdx`);
  } catch {
    return null;
  }
}

async function parseArticle(filename: string): Promise<Article> {
  const filepath = path.join(ARTICLES_DIR, filename);
  const raw = await fs.readFile(filepath, "utf-8");
  const { data, content } = matter(raw);

  const slug = filename.replace(/\.mdx$/, "");
  const file = await processor.process(content);
  const html = String(file);

  // First-paragraph TL;DR — Morph's auto-TLDR (Pro+) replaces this with
  // a Claude-generated summary. The inline strip handles the demo path.
  const summary =
    content
      .replace(/^#.*$/gm, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/[*_`>]/g, "")
      .trim()
      .slice(0, 280)
      .trim() + "…";

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    category: String(data.category ?? "Article"),
    date: new Date(data.date ?? Date.now()),
    readingTime: Math.max(1, Math.ceil(readingTime(content).minutes)),
    summary,
    html,
  };
}
