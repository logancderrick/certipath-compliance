import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/firebase/articles';
import { formatDate } from '@/lib/utils/date';
import { getSourceLogo } from '@/lib/utils/source';

export const metadata: Metadata = {
  title: 'Latest News - CertiPath Compliance',
  description: 'Stay up to date with the latest compliance and certification news from CertiPath Compliance.',
};

const ARTICLES_PER_PAGE = 5;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const articles = await getAllArticles();
  
  // Calculate pagination
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[var(--primary-color)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Latest News</h1>
            <p className="text-white/80">
              Stay up to date with the latest compliance and certification news
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {currentArticles.map(article => {
              const logoPath = getSourceLogo(article.source);
              
              return (
                <Link 
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Article Logo */}
                  <div className="relative w-full md:w-48 flex items-center justify-center shrink-0 self-stretch">
                    {logoPath && (
                      <div className="relative w-32 h-32">
                        <Image
                          src={logoPath}
                          alt={`${article.source} Logo`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                  </div>

                  {/* Article Content */}
                  <div className="p-6 flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <time dateTime={article.date}>
                        {formatDate(article.date)}
                      </time>
                      <span className="text-gray-300">|</span>
                      <span>{article.source}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[var(--primary-color)] transition-colors mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/news?page=${currentPage - 1}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/news?page=${pageNum}`}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    pageNum === currentPage
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={`/news?page=${currentPage + 1}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 