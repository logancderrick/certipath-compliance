import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'Understanding the New EU Medical Device Regulation (MDR)',
    excerpt: 'The EU Medical Device Regulation (MDR) represents a significant overhaul of the regulatory framework for medical devices in Europe. This article explores the key changes and what manufacturers need to know.',
    date: 'March 5, 2024',
    category: 'Regulatory Updates',
    slug: 'understanding-eu-mdr'
  },
  {
    id: 2,
    title: 'Navigating China CCC Certification: A Step-by-Step Guide',
    excerpt: "China's Compulsory Certification (CCC) is required for many products sold in the Chinese market. Learn about the certification process, requirements, and best practices for a smooth application.",
    date: 'February 20, 2024',
    category: 'Certification Guides',
    slug: 'navigating-china-ccc-certification'
  },
  {
    id: 3,
    title: 'The Impact of RoHS 3 on Electronics Manufacturing',
    excerpt: 'RoHS 3 introduces new restricted substances and compliance requirements for electronic products. Discover how these changes affect your manufacturing processes and what steps to take for compliance.',
    date: 'February 8, 2024',
    category: 'Environmental Compliance',
    slug: 'impact-rohs-3-electronics-manufacturing'
  },
  {
    id: 4,
    title: 'Preparing for India BIS Certification: Essential Tips',
    excerpt: "India's Bureau of Indian Standards (BIS) certification is mandatory for various electronic products. This guide provides essential tips for preparing your application and navigating the certification process.",
    date: 'January 25, 2024',
    category: 'Certification Guides',
    slug: 'preparing-india-bis-certification'
  },
  {
    id: 5,
    title: 'Global Market Access: Strategies for Multi-Region Compliance',
    excerpt: 'Entering multiple markets requires a strategic approach to regulatory compliance. Learn effective strategies for managing certifications across different regions while minimizing costs and delays.',
    date: 'January 12, 2024',
    category: 'Market Access',
    slug: 'global-market-access-strategies'
  },
  {
    id: 6,
    title: 'The Transition to IEC 62368-1: What You Need to Know',
    excerpt: 'IEC 62368-1 is replacing IEC 60950-1 and IEC 60065 as the safety standard for audio/video and IT equipment. Understand the key differences and how to prepare for this important transition.',
    date: 'December 28, 2023',
    category: 'Safety Standards',
    slug: 'transition-iec-62368-1'
  }
];

export default function Articles() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Articles & Resources</h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Stay up to date with the latest regulatory compliance news, certification guides, and industry insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-3">{article.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3">
                    <Link href={`/articles/${article.slug}`} className="hover:text-blue-600 transition-colors">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <Link 
                    href={`/articles/${article.slug}`} 
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
              Load More Articles
            </button>
          </div>
          
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