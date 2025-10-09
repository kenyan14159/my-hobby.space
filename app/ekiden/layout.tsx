import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '駅伝の歴史 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部の駅伝歴史。箱根駅伝、全日本大学駅伝、出雲駅伝、富士山女子駅伝、杜の都駅伝、男女混合駅伝の出場歴と戦績を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '三大駅伝',
    '箱根駅伝',
    '全日本大学駅伝',
    '出雲駅伝',
    '富士山女子駅伝',
    '富士山',
    '全日本大学女子駅伝',
    '杜の都駅伝',
    '杜の都',
    '全日本駅伝',
    '学生三大駅伝',
    '男女混合駅伝',
    '男子駅伝',
    '女子駅伝',
    '女子駅伝部',
    '長距離'
  ],
  openGraph: {
    title: '駅伝の歴史 | 日本体育大学駅伝部',
    description: '日体大駅伝部の駅伝歴史。箱根、全日本、出雲、富士山女子、杜の都、男女混合駅伝の出場歴と戦績を掲載。',
    url: 'https://nssu-ekiden.com/ekiden',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/ekiden',
  },
};

export default function EkidenLayout({
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
        name: '駅伝情報',
        item: 'https://nssu-ekiden.com/ekiden',
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
