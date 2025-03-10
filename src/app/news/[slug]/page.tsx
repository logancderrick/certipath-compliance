import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleImage from '../../../components/ArticleImage';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  source: string;
  originalUrl: string;
  published: boolean;
}

// Helper function for consistent date formatting
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

async function getArticle(slug: string): Promise<Article | null> {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = await fs.readdir(dataDir);
  const articleFiles = files.filter(file => file.endsWith('-articles.json'));
  
  for (const file of articleFiles) {
    const filePath = path.join(dataDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    const articles: Article[] = JSON.parse(content);
    const article = articles.find(a => a.slug === slug);
    if (article) return article;
  }
  
  return null;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <article className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/news"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                ← Back to News
              </Link>
              <span className="text-gray-300">|</span>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <time dateTime={article.date}>
                {formatDate(article.date)}
              </time>
              <span className="text-gray-300">|</span>
              <span>Source: {article.source}</span>
            </div>
          </div>
          
          {/* Article Image */}
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <ArticleImage
              src={`/images/article-images/${article.slug}.jpg`}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Source Link */}
          {article.originalUrl && (
            <div className="mt-8 pt-8 border-t">
              <p className="text-gray-600">
                Original article:{' '}
                <a 
                  href={article.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Read on {article.source} →
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
} 