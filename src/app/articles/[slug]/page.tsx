import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/firebase/articles';

type PageParams = {
  slug: string;
};

async function getArticleData(params: Promise<PageParams>) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);
  if (!article) {
    return null;
  }
  return article;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const article = await getArticleData(params);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const article = await getArticleData(params);
  
  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.htmlContent }} />
    </article>
  );
} 