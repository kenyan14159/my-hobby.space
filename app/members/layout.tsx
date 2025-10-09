import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メンバー紹介 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部の選手紹介。学年別メンバー一覧、自己ベスト記録、出身校を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'メンバー紹介',
    '選手一覧',
    '自己ベスト',
    '箱根駅伝'
  ],
  openGraph: {
    title: 'メンバー紹介 | 日本体育大学駅伝部',
    description: '日体大駅伝部の選手紹介。学年別メンバー一覧、自己ベスト記録を掲載。',
    url: 'https://nssu-ekiden.com/members',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/members',
  },
};

export default function MemberLayout({
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
        name: '部員紹介',
        item: 'https://nssu-ekiden.com/members',
      },
    ],
  };

  // SportsTeam構造化データ
  const sportsTeamSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: '日本体育大学陸上競技部男子駅伝ブロック',
    sport: '駅伝',
    url: 'https://nssu-ekiden.com/members',
    memberOf: {
      '@type': 'Organization',
      name: '日本体育大学',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamSchema) }}
      />
      {children}
    </>
  );
}