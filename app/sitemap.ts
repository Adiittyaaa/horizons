import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://horizons.example.com'; // Change this to your actual production URL

  // Define only public routes that search engines should index
  const publicRoutes = [
    '',
    '/about',
    '/faq',
    '/resource-center',
    '/success-stories',
    '/legal',
    '/login',
    '/register',
    '/progress'
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
