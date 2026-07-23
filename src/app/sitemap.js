import { siteConfig } from '@/lib/config';

export default function sitemap() {
  const baseUrl = siteConfig.url;

  const routes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/katalog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/testimoni`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/keranjang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ].map(route => ({
    ...route,
    changeFrequency: route.changeFrequency,
  }));

  return routes;
}
