import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技部 | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部の活動情報。トラック競技、フィールド競技の選手情報、大会結果を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'トラック競技',
    'フィールド競技',
    '短距離',
    '跳躍',
    '投擲'
  ],
  openGraph: {
    title: '陸上競技部 | 日本体育大学陸上競技部',
    description: '日体大陸上競技部の活動情報。トラック・フィールド競技の選手情報、大会結果を掲載。',
    url: 'https://nssu-ekiden.com/track-and-field',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field',
  },
};

export default function TrackAndFieldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
