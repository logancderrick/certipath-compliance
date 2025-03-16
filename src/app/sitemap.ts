import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/firebase/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://certipath-compliance.com';
  
  // Define your static routes
  const staticRoutes = [
    '',
    '/request-quote',
    '/services',
    '/about',
    '/news',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/news' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : route === '/request-quote' ? 0.9 : 0.8,
  }));

  // Get all articles for dynamic routes
  const articles = await getAllArticles();
  const articleRoutes = articles.map(article => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
} 