import Link from 'next/link';
import ArticleImage from '../../components/ArticleImage';
import { getAllArticles } from '@/lib/firebase/articles';

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

// Helper function to clean article content
function cleanArticleContent(content: string): string {
  // First, extract any HTML lists and convert them to text lists
  const contentWithTextLists = content.replace(
    /<ul[^>]*>([\s\S]*?)<\/ul>/g,
    (match: string, listContent: string) => {
      const items = listContent.match(/<li[^>]*>([\s\S]*?)<\/li>/g) || [];
      return items
        .map((item: string) => {
          const text = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1').trim();
          return `- ${text}`;
        })
        .join('\n');
    }
  );

  // Split content into sections (paragraphs and lists)
  const sections = contentWithTextLists.split('\n\n');
  
  // Filter out unwanted sections and clean content
  const cleanedSections = sections
    .map(section => {
      const lines = section.split('\n').map(line => line.trim());
      
      // Check if this section is a list
      const isList = lines.some(line => line.startsWith('-') || line.startsWith('•'));
      
      if (isList) {
        // For lists in excerpts, join items with commas
        return lines
          .filter(line => line.startsWith('-') || line.startsWith('•'))
          .map(line => line.replace(/^[-•]\s*/, '').trim())
          .join(', ');
      }
      
      // For non-list sections, join lines with space
      return lines.join(' ').trim();
    })
    .filter(section => {
      // Skip empty sections
      if (!section) return false;
      
      // Skip common form and promotional content
      const unwantedPhrases = [
        "Thanks for your interest",
        "Let's collect some information",
        "We'll review your message",
        "Test your consumer products",
        "Contact us",
        "Sign up for",
        "Subscribe to",
        "Fill out",
        "Learn more about",
        "@insights.ul.com",
        "Become a Sponsor",
        "Get our email updates",
        "From Our Sponsors",
        "Discover new products",
        "review technical whitepapers",
        "check out trending",
        "engineering news",
        "compliance news"
      ];
      
      return !unwantedPhrases.some(phrase => 
        section.toLowerCase().includes(phrase.toLowerCase())
      );
    });
  
  return cleanedSections.join('\n\n');
}

// Helper function to clean and format article excerpt
function formatExcerpt(content: string): string {
  // First clean the content
  const cleanedContent = cleanArticleContent(content);
  
  // Remove any HTML tags
  const cleanText = cleanedContent.replace(/<[^>]*>/g, '');
  // Remove extra whitespace and newlines
  const trimmedText = cleanText.replace(/\s+/g, ' ').trim();
  // Get first 200 characters and add ellipsis if needed
  return trimmedText.length > 200 ? trimmedText.substring(0, 200) + '...' : trimmedText;
}

export default async function NewsPage() {
  const articles = await getAllArticles();
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[var(--primary-color)] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Industry News & Updates</h1>
            <p className="text-lg opacity-90">
              Stay informed with the latest regulatory updates, industry news, and compliance insights from trusted sources.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
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
                      <time 
                        dateTime={article.date}
                        className="text-sm text-gray-500"
                      >
                        {formatDate(article.date)}
                      </time>
                      <span className="px-3 py-1 text-xs font-medium bg-[var(--primary-color)] text-white rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2 hover:text-[var(--primary-color)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">Source: {article.source}</span>
                      <span className="text-[var(--primary-color)] font-medium inline-flex items-center group">
                        Read more 
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
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