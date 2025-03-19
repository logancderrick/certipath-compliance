import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/firebase/articles';
import { globalStandards } from '@/data/global-standards';

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
    '/global-standards',
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
  
  // Get all global standards country pages
  const standardsRoutes = globalStandards.flatMap(region => 
    region.countries.map(country => ({
      url: `${baseUrl}/global-standards/${region.slug}/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...articleRoutes, ...standardsRoutes];
} 