import { 
  collection, 
  getDocs,
  doc, 
  query, 
  orderBy, 
  addDoc,
  updateDoc,
  where,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  FirestoreDataConverter
} from 'firebase/firestore';
import { db } from './config';

export interface Article {
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
  htmlContent: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  timestamp: number;
  imageUrl?: string;
}

const articleConverter: FirestoreDataConverter<Article> = {
  toFirestore(article: Article): DocumentData {
    return {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      date: article.date,
      category: article.category,
      source: article.source,
      originalUrl: article.originalUrl,
      published: article.published,
      htmlContent: article.htmlContent,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      timestamp: article.timestamp,
      imageUrl: article.imageUrl
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Article {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date,
      category: data.category,
      source: data.source,
      originalUrl: data.originalUrl,
      published: data.published,
      htmlContent: data.htmlContent,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      timestamp: data.timestamp,
      imageUrl: data.imageUrl
    };
  }
};

const COLLECTION_NAME = 'articles';

export async function getAllArticles(): Promise<Article[]> {
  const articlesRef = collection(db, COLLECTION_NAME).withConverter(articleConverter);
  const q = query(
    articlesRef,
    orderBy('date', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articlesRef = collection(db, COLLECTION_NAME).withConverter(articleConverter);
  const q = query(articlesRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  return querySnapshot.docs[0].data();
}

export async function createArticle(article: Omit<Article, 'id'>): Promise<string> {
  const articlesRef = collection(db, COLLECTION_NAME).withConverter(articleConverter);
  const docRef = await addDoc(articlesRef, article as Article);
  return docRef.id;
}

export async function updateArticle(id: string, article: Partial<Article>): Promise<void> {
  const articleRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(articleRef, article);
}

// Helper function to clean article content
export function cleanArticleContent(content: string): string {
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

// Helper function to format excerpt
export function formatExcerpt(content: string): string {
  // First clean the content
  const cleanedContent = cleanArticleContent(content);
  
  // Remove any HTML tags
  const cleanText = cleanedContent.replace(/<[^>]*>/g, '');
  // Remove extra whitespace and newlines
  const trimmedText = cleanText.replace(/\s+/g, ' ').trim();
  // Get first 200 characters and add ellipsis if needed
  return trimmedText.length > 200 ? trimmedText.substring(0, 200) + '...' : trimmedText;
} 