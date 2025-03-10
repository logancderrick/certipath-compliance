import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import ArticleImage from '../../components/ArticleImage';
import matter from 'gray-matter';

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
  try {
    const date = new Date(dateString);
    // Use UTC methods to ensure consistent output
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return dateString; // Return original string if parsing fails
  }
}

// Helper function to clean and format article excerpt
function formatExcerpt(content: string): string {
  // Remove any HTML tags
  const cleanText = content.replace(/<[^>]*>/g, '');
  // Remove extra whitespace
  const trimmedText = cleanText.replace(/\s+/g, ' ').trim();
  // Get first 200 characters and add ellipsis if needed
  return trimmedText.length > 200 ? trimmedText.substring(0, 200) + '...' : trimmedText;
}

async function getArticles() {
  const draftsDir = path.join(process.cwd(), 'src', 'data', 'drafts');
  const files = await fs.readdir(draftsDir);
  const articleFiles = files.filter(file => file.endsWith('.md'));
  
  let allArticles: Article[] = [];
  
  for (const file of articleFiles) {
    const filePath = path.join(draftsDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    const { data, content: articleContent } = matter(content);
    
    // Create article object from markdown frontmatter and content
    const article: Article = {
      id: path.basename(file, '.md'),
      title: data.title,
      slug: path.basename(file, '.md'),
      excerpt: formatExcerpt(articleContent),
      content: articleContent,
      date: data.date,
      category: data.category,
      source: data.source,
      originalUrl: data.originalUrl,
      published: !data.draft
    };
    
    allArticles.push(article);
  }
  
  // Sort articles by date, most recent first
  return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function NewsPage() {
  const articles = await getArticles();
  
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Industry News & Updates</h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Stay informed with the latest regulatory updates, industry news, and compliance insights from trusted sources.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1"
              >
                <Link href={`/news/${article.slug}`} className="block h-full">
                  <div className="relative h-48">
                    <ArticleImage
                      src={`/images/article-images/${article.slug}.jpg`}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">Source: {article.source}</span>
                      <span className="text-blue-600 font-medium">Read more →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 