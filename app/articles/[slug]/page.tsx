import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { getArticleBySlug, getAllArticles } from "@/content/lib/articles";

// Test-only: force a server-side delay so the PreNav skeleton stays
// visible long enough to evaluate. Toggle via MORPH_SLOW_NAV in
// .env.local. Without it the static page renders instantly and
// there's nothing to skeleton over.
const SLOW_NAV_MS = process.env.MORPH_SLOW_NAV
  ? parseInt(process.env.MORPH_SLOW_NAV, 10)
  : 0;

// `force-dynamic` is test-only — needed so the artificial delay runs
// on every navigation. Next.js requires this export to be a literal
// static string, not a runtime expression, so it stays hardcoded
// during the testing window. Switch back to "auto" (or remove this
// export) when SLOW_NAV is disabled and you want SSG behavior again.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (SLOW_NAV_MS > 0) {
    await new Promise((r) => setTimeout(r, SLOW_NAV_MS));
  }
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleLayout article={article} />;
}
