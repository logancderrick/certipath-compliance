import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/firebase/articles';

// Helper function for consistent date formatting
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

// Helper function to get logo path based on source
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

export default async function NewsPage() {
  const articles = await getAllArticles();
  
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
            {articles.map((article) => {
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
        </div>
      </div>
    </div>
  );
} 