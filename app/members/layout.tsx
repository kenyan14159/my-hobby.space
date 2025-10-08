import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日体大駅伝部メンバー2025 | 選手一覧・プロフィール・記録',
  description: '日本体育大学駅伝部の選手紹介。学年別メンバー一覧、自己ベスト記録、出身校、箱根駅伝出走歴を掲載。新入生から主力選手まで全メンバーのプロフィールを網羅。部員情報を随時更新中。',
  keywords: [
    '日体大 駅伝 メンバー',
    '日体大 選手',
    '箱根駅伝 メンバー',
    '日本体育大学 陸上部',
    '駅伝 プロフィール',
    '自己ベスト記録',
    '出身高校',
    '学年別'
  ],
  openGraph: {
    title: '日体大駅伝部メンバー2025 | 選手一覧・プロフィール・記録',
    description: '日本体育大学駅伝部の選手紹介。学年別メンバー一覧、自己ベスト記録、出身校を掲載。',
    url: 'https://nssu-ekiden.com/members',
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