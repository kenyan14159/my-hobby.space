import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '応援メッセージ | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部への応援メッセージ一覧。在校生、卒業生、ファンの皆様からの応援メッセージを掲載しています。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '応援メッセージ',
    'ファンメッセージ',
    '応援',
    'メッセージ',
    'サポート'
  ],
  openGraph: {
    title: '応援メッセージ | 日本体育大学駅伝部',
    description: '日体大駅伝部への応援メッセージ一覧。在校生、卒業生、ファンの皆様からの応援メッセージを掲載。',
    url: 'https://nssu-ekiden.com/messages',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/messages',
  },
};

export default function MessagesLayout({
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
        name: '応援メッセージ',
        item: 'https://nssu-ekiden.com/messages',
      },
    ],
  };

  // CollectionPage構造化データ
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '応援メッセージ一覧',
    description: '日本体育大学駅伝部への応援メッセージ一覧ページ',
    url: 'https://nssu-ekiden.com/messages',
    mainEntity: {
      '@type': 'ItemList',
      name: '応援メッセージリスト',
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

