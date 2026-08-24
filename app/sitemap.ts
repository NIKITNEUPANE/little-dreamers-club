import { MetadataRoute } from 'next';
import { db } from '../lib/db/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://littledreamersclub.com';
  const [products, categories, collections] = await Promise.all([
    db.getProducts(),
    db.getCategories(),
    db.getCollections(),
  ]);

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/shop?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionUrls = collections.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...productUrls,
    ...categoryUrls,
    ...collectionUrls,
  ];
}
