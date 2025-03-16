import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

  const resolvedParams = await params;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${resolvedParams.slug}`,
    },
  };
}

// Helper functions
function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return dateString;
  }
}

function getSourceLogo(source: string = '') {
  const sourceLower = source.toLowerCase();
  if (sourceLower.includes('ul') || sourceLower.includes('underwriters')) {
    return '/images/logos/ul-logo.png';
  }
  if (sourceLower.includes('compliance') || sourceLower.includes('incompliance')) {
    return '/images/logos/incompliance-logo.png';
  }
  return null;
}

function textToHtml(text: string): string {
  const sections = text.split(/\n\n+/);
  
  return sections.map(section => {
    const lines = section.split('\n');
    
    if (lines.some(line => line.startsWith('-') || line.startsWith('•'))) {
      const contextLine = lines.find(line => !line.startsWith('-') && !line.startsWith('•') && line.length > 0);
      const listItems = lines
        .filter(line => line.startsWith('-') || line.startsWith('•'))
        .map(line => {
          const itemText = line.replace(/^[-•]\s*/, '').trim();
          const textWithLinks = itemText.replace(
            /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">$1</a>'
          );
          return `<li>${textWithLinks}</li>`;
        })
        .join('\n');
      
      return `${contextLine ? `<p class="mb-4">${contextLine}</p>` : ''}<ul class="list-disc pl-6 mb-6">${listItems}</ul>`;
    }
    
    const textWithLinks = section.replace(
      /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">$1</a>'
    );
    
    return `<p class="mb-6">${textWithLinks}</p>`;
  }).join('\n');
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

  const logoPath = getSourceLogo(article.source);
  
  return (
    <div className="bg-gray-50">
      <div className="bg-[var(--primary-color)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link 
                href="/news"
                className="text-white hover:text-white/80 flex items-center gap-2 group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transform transition-transform group-hover:-translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
              <span className="text-white/30">|</span>
              <span className="px-3 py-1 text-sm font-medium bg-white/10 text-white rounded-full">
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-white/80">
              <time dateTime={article.date}>
                {formatDate(article.date)}
              </time>
              <span className="text-white/30">|</span>
              <span>Source: {article.source}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {logoPath && (
            <div className="relative h-[150px] mb-8 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <Image
                  src={logoPath}
                  alt={`${article.source} Logo`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          )}
          
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[var(--primary-color)] prose-a:no-underline hover:prose-a:text-[var(--primary-dark)]"
            dangerouslySetInnerHTML={{ __html: textToHtml(article.content) }}
          />
          
          {article.originalUrl && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                Original article:{' '}
                <a 
                  href={article.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-color)] hover:text-[var(--primary-dark)] inline-flex items-center group"
                >
                  Read on {article.source}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 