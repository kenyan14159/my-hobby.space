import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'チーム情報 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部のチーム情報。サポーター情報、応援ガイド、ホームページについて、お問い合わせ先を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'チーム情報',
    'サポーター',
    '応援',
    'お問い合わせ',
    '連絡先'
  ],
  openGraph: {
    title: 'チーム情報 | 日本体育大学駅伝部',
    description: '日体大駅伝部のチーム情報。サポーター情報、応援ガイド、お問い合わせ先を掲載。',
    url: 'https://nssu-ekiden.com/information',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/information',
  },
};

export default function InformationLayout({
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
        name: 'チーム情報',
        item: 'https://nssu-ekiden.com/information',
      },
    ],
  };

  // CollectionPage構造化データ
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'チーム情報',
    description: '日本体育大学駅伝部のチーム情報ページ',
    url: 'https://nssu-ekiden.com/information',
    mainEntity: {
      '@type': 'ItemList',
      name: 'チーム情報メニュー',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'サポーターの皆様',
          url: 'https://nssu-ekiden.com/information/supporters',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '応援してくださる皆様へ',
          url: 'https://nssu-ekiden.com/information/for-fans',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'ホームページについて',
          url: 'https://nssu-ekiden.com/information/about',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'お問い合わせ',
          url: 'https://nssu-ekiden.com/information/contact',
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