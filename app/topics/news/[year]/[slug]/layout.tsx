import type { Metadata } from 'next';
import { getAllNews } from '@/lib/news';
import Script from 'next/script';

type Params = { params: { year: string; slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const fullSlug = `${params.year}/${params.slug}`;
  const item = getAllNews().find((n) => n.slug === fullSlug);

  const title = item ? `${item.title} | 日体大駅伝部ニュース` : 'ニュース';
  const description = item
    ? `${item.title}。日本体育大学駅伝部の最新情報、チーム活動、選手の活躍、大会出場情報を掲載。日体大駅伝部の公式ニュースページです。`
    : '日本体育大学駅伝部のニュース一覧。最新情報、チーム活動、選手の活躍を掲載。';
  const images = item?.image ? [item.image] : [];

  return {
    title,
    description,
    keywords: [
      'NSSU',
      '日本体育大学',
      '日体大',
      '陸上競技部',
      '陸上部',
      '駅伝部',
      '大学駅伝',
      '駅伝競走',
      'ニュース',
      '最新情報'
    ],
    openGraph: {
      title,
      description,
      images,
      type: 'article',
      publishedTime: item?.date ? new Date(item.date).toISOString() : undefined,
      authors: ['日本体育大学駅伝部'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    alternates: {
      canonical: `https://nssu-ekiden.works/topics/news/${fullSlug}`,
    },
  };
}

export default function NewsDetailLayoutRoute({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: { year: string; slug: string };
}) {
  const fullSlug = `${params.year}/${params.slug}`;
  const item = getAllNews().find((n) => n.slug === fullSlug);

  // NewsArticle 構造化データ
  const articleJsonLd = item ? {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    image: item.image,
    datePublished: item.date ? new Date(item.date).toISOString() : undefined,
    dateModified: item.date ? new Date(item.date).toISOString() : undefined,
    author: {
      '@type': 'Organization',
      name: '日本体育大学陸上競技部男子駅伝ブロック',
      url: 'https://nssu-ekiden.works'
    },
    publisher: {
      '@type': 'Organization',
      name: '日本体育大学駅伝部',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nssu-ekiden.works/wp-content/uploads/2025/02/nssu192.jpg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nssu-ekiden.works/topics/news/${fullSlug}`
    },
    description: `${item.title}。日本体育大学駅伝部の最新情報、チーム活動、選手の活躍、大会出場情報を掲載。日体大駅伝部の公式ニュースページです。`
  } : null;

  return (
    <>
      {articleJsonLd && (
        <Script
          id="article-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {children}
    </>
  );
}


