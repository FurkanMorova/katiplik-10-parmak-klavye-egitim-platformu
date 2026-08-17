import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://onparmakakademi.com.tr';

  const blogPosts = [
    '3-dakikada-90-kelime-yazma-teknikleri',
    'klavyede-hata-oranini-dusurme-ve-hizlanma',
    'f-klavye-ogrenme-rehberi-ve-alistirmalar',
    'dogru-oturus-ve-bilek-ergonomisi',
    '10-parmak-klavye-nasil-ogrenilir',
    'zabit-katipligi-sinavi-tuyolari',
    'f-klavye-vs-q-klavye',
  ];

  const now = new Date();

  return [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/nasil-calisir`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
