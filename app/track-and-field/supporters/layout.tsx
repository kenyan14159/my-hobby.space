import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OB・OGの皆様へ | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部創部100周年記念事業のご案内。OB・OGの皆様へのアンケート、記念パーティのお知らせ。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'OB',
    'OG',
    '創部100周年',
    '記念事業'
  ],
  openGraph: {
    title: 'OB・OGの皆様へ | 日本体育大学陸上競技部',
    description: '日体大陸上競技部創部100周年記念事業のご案内。記念パーティは2026年3月7日開催。',
    url: 'https://nssu-ekiden.com/track-and-field/supporters',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/supporters',
  },
};

export default function TrackSupportersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
