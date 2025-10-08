import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '駅伝部記録 - 5000m・10000m・ハーフマラソン',
  description: '日本体育大学駅伝部の公式記録データベース。5000m、10000m、ハーフマラソンの選手別ベスト記録を掲載。箱根駅伝出場に向けた記録更新の軌跡を追いかけよう。',
  keywords: [
    '日体大 駅伝 記録',
    '5000m',
    '10000m',
    'ハーフマラソン',
    '自己ベスト',
    '駅伝 タイム',
  ],
  openGraph: {
    title: '駅伝部記録 - 5000m・10000m・ハーフマラソン | 日本体育大学駅伝部',
    description: '日体大駅伝部の公式記録データベース。5000m、10000m、ハーフの選手別ベスト記録。',
    url: 'https://nssu-ekiden.com/records',
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
