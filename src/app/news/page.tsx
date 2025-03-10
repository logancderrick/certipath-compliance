import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/firebase/articles';

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