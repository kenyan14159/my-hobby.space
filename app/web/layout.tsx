import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webサイト集 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部に関連するWebサイトのリンク集。陸上競技部公式ページ、駅伝リザルト、スコアリングテーブルなどの関連サイトを掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'リンク集',
    '関連サイト',
    '駅伝リザルト',
    'スコアリングテーブル',
    '陸上競技'
  ],
  openGraph: {
    title: 'Webサイト集 | 日本体育大学駅伝部',
    description: '日体大駅伝部に関連するWebサイトのリンク集。関連サイトへのリンクを掲載。',
    url: 'https://nssu-ekiden.works/web',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/web',
  },
};

export default function WebLayout({
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
        item: 'https://nssu-ekiden.works',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Webサイト集',
        item: 'https://nssu-ekiden.works/web',
      },
    ],
  };

  // CollectionPage構造化データ
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Webサイト集',
    description: '日本体育大学駅伝部に関連するWebサイトのリンク集',
    url: 'https://nssu-ekiden.works/web',
    mainEntity: {
      '@type': 'ItemList',
      name: '関連Webサイトリスト',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '陸上競技部',
          url: 'https://nssu-ekiden.works/track-and-field',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '駅伝リザルト',
          url: 'https://www.ekiden-results.com/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'スコアリングテーブル',
          url: 'https://ekiden-results.com/information/scoring-table/',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      {children}
    </>
  );
}

