import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '歴代記録 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部の歴代記録。5000m、10000m、ハーフマラソンの歴代記録を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '歴代記録',
    '自己ベスト',
    '5000m',
    '10000m',
    'ハーフマラソン'
  ],
  openGraph: {
    title: '歴代記録 | 日本体育大学駅伝部',
    description: '日体大駅伝部の歴代記録。5000m、10000m、ハーフの選手別歴代記録を掲載。',
    url: 'https://nssu-ekiden.com/records',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/records',
  },
};

export default function RecordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // BreadcrumbList構造化データ
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://nssu-ekiden.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '駅伝部記録',
        item: 'https://nssu-ekiden.com/records',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
