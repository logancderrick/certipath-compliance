import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://certipath-compliance.com';
  
  // Define your routes
  const routes = [
    '',
    '/request-quote',
    '/services',
    '/about',
    '/news',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/news' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1 : route === '/request-quote' ? 0.9 : 0.8,
  }));

  // Add dynamic routes here if needed
  // For example, if you have blog posts or news articles
  // const posts = await fetchPosts();
  // const postRoutes = posts.map(post => ({
  //   url: `${baseUrl}/news/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly' as 'weekly',
  //   priority: 0.7,
  // }));

  return [
    ...routes,
    // ...postRoutes,
  ];
} 