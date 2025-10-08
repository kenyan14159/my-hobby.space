import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '駅伝情報 - 箱根・全日本・出雲',
  description: '日本体育大学駅伝部の大学三大駅伝情報。箱根駅伝、全日本大学駅伝、出雲駅伝の出場歴、戦績、展望を掲載。富士山女子駅伝、全日本大学女子駅伝の情報も。',
  keywords: [
    '箱根駅伝',
    '全日本大学駅伝',
    '出雲駅伝',
    '日体大 駅伝',
    '三大駅伝',
    '富士山女子',
  ],
  openGraph: {
    title: '駅伝情報 - 箱根・全日本・出雲 | 日本体育大学駅伝部',
    description: '日体大駅伝部の大学三大駅伝情報。箱根、全日本、出雲の出場歴、戦績、展望。',
    url: 'https://nssu-ekiden.com/ekiden',
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
