import Link from 'next/link';
import * as fs from 'fs';
import * as path from 'path';

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

function getArticles(): Article[] {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const articles: Article[] = [];
  
  // Read all JSON files in the data directory
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('-articles.json'));
    
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const sourceArticles: Article[] = JSON.parse(fileContent);
      articles.push(...sourceArticles);
    }
  }
  
  // Sort articles by date (most recent first)
  return articles
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function Articles() {
  const displayArticles = getArticles();

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Articles & Resources</h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Stay up to date with the latest regulatory compliance news, certification guides, and industry insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3">
                    <Link href={`/articles/${article.slug}`} className="hover:text-blue-600 transition-colors">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/articles/${article.slug}`} 
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      Read more →
                    </Link>
                    {article.source && (
                      <span className="text-xs text-gray-500">
                        Source: {article.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {displayArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles available at the moment.</p>
            </div>
          )}
          
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mb-6">
              Stay informed about the latest regulatory updates, certification news, and industry insights. Subscribe to our newsletter for monthly updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 