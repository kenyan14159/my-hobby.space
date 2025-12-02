import type { Metadata } from 'next';
import { getAllResults } from '@/lib/results';
import Script from 'next/script';

type Params = { params: { year: string; slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const fullSlug = `${params.year}/${params.slug}`;
  const item = getAllResults().find((n) => n.slug === fullSlug);

  const title = item ? item.title : 'リザルト';
  const dateStr = item && typeof item.date === 'string' ? item.date : '';
  const description = item
    ? `${item.title}${dateStr ? `（${dateStr}）` : ''}。日本体育大学駅伝部の試合結果、大会成績、選手の記録を掲載。日体大駅伝部の公式リザルトページです。`
    : '日本体育大学駅伝部の試合結果一覧。大会成績、選手の記録を掲載。';
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
      '試合結果',
      '大会結果'
    ],
    openGraph: {
      title,
      description,
      images,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    alternates: {
      canonical: `https://nssu-ekiden.works/topics/results/${fullSlug}`,
    },
  };
}

export default function ResultDetailLayoutRoute({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: { year: string; slug: string };
}) {
  const fullSlug = `${params.year}/${params.slug}`;
  const item = getAllResults().find((n) => n.slug === fullSlug);

  // SportsEvent 構造化データ
  const sportsEventJsonLd = item ? {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: item.title,
    startDate: item.date && typeof item.date === 'string' ? new Date(item.date).toISOString() : undefined,
    sport: '駅伝・陸上競技',
    organizer: {
      '@type': 'Organization',
      name: '日本体育大学陸上競技部男子駅伝ブロック',
      url: 'https://nssu-ekiden.works'
    },
    image: item.image,
    description: `${item.title}${item.date && typeof item.date === 'string' ? `（${item.date}）` : ''}。日本体育大学駅伝部の試合結果。`,
    url: `https://nssu-ekiden.works/topics/results/${fullSlug}`,
  } : null;

  // BreadcrumbList構造化データ
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://nssu-ekiden.works',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'トピックス',
        item: 'https://nssu-ekiden.works/topics',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'リザルト',
        item: 'https://nssu-ekiden.works/topics/results',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: item?.title || '試合結果',
        item: `https://nssu-ekiden.works/topics/results/${fullSlug}`,
      },
    ],
  };

  return (
    <>
      {sportsEventJsonLd && (
        <Script
          id="sports-event-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventJsonLd) }}
        />
      )}
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}


