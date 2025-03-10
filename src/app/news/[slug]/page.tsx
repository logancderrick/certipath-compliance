import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleImage from '../../../components/ArticleImage';
import { getArticleBySlug, Article } from '@/lib/firebase/articles';

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
      return '\n' + items
        .map((item: string) => {
          const text = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1').trim();
          return `- ${text}`;
        })
        .join('\n') + '\n';
    }
  );

  // Split content into sections while preserving list context
  const sections = contentWithTextLists.split(/\n\n+/);
  
  // Filter out unwanted sections and clean content
  const cleanedSections = sections
    .map(section => {
      const lines = section.split('\n').map(line => line.trim());
      
      // Check if this section is a list
      const isList = lines.some(line => line.startsWith('-') || line.startsWith('•'));
      
      if (isList) {
        // For lists, preserve the context line if it exists
        const contextLine = lines.find(line => !line.startsWith('-') && !line.startsWith('•') && line.length > 0);
        const listItems = lines.filter(line => line.startsWith('-') || line.startsWith('•'));
        
        if (contextLine) {
          return contextLine + '\n' + listItems.join('\n');
        }
        return listItems.join('\n');
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

// Helper function to convert text to HTML with links and lists
function textToHtml(text: string): string {
  // Split into sections while preserving list context
  const sections = text.split(/\n\n+/);
  
  return sections.map(section => {
    const lines = section.split('\n');
    
    // Check if this section contains a list
    if (lines.some(line => line.startsWith('-') || line.startsWith('•'))) {
      const contextLine = lines.find(line => !line.startsWith('-') && !line.startsWith('•') && line.length > 0);
      const listItems = lines
        .filter(line => line.startsWith('-') || line.startsWith('•'))
        .map(line => {
          const itemText = line.replace(/^[-•]\s*/, '').trim();
          // Convert URLs to links within list items
          const textWithLinks = itemText.replace(
            /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">$1</a>'
          );
          return `<li>${textWithLinks}</li>`;
        })
        .join('\n');
      
      return `${contextLine ? `<p class="mb-4">${contextLine}</p>` : ''}<ul class="list-disc pl-6 mb-6">${listItems}</ul>`;
    }
    
    // Convert URLs to links in regular paragraphs
    const textWithLinks = section.replace(
      /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">$1</a>'
    );
    
    return `<p class="mb-6">${textWithLinks}</p>`;
  }).join('\n');
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
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
          {/* Article Image */}
          <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
            <ArticleImage
              src={`/images/article-images/${article.slug}.jpg`}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[var(--primary-color)] prose-a:no-underline hover:prose-a:text-[var(--primary-dark)]"
            dangerouslySetInnerHTML={{ __html: textToHtml(article.content) }}
          />
          
          {/* Source Link */}
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