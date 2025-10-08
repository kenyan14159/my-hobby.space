import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技部 - トラック＆フィールド',
  description: '日本体育大学陸上競技部の活動情報。トラック競技、フィールド競技、駅伝以外の種目で活躍する選手たちの情報、大会結果、記録を掲載。短距離、中距離、長距離、跳躍、投擲など各種目の最新情報。',
  keywords: [
    '日体大 陸上競技',
    'トラック競技',
    'フィールド競技',
    '陸上部',
    '日本体育大学 陸上',
    '記録会',
    '陸上 大会',
  ],
  openGraph: {
    title: '陸上競技部 - トラック＆フィールド | 日本体育大学駅伝部',
    description: '日体大陸上競技部の活動情報。トラック・フィールド競技の選手情報、大会結果、記録を掲載。',
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
