import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技部メンバー - 選手一覧',
  description: '日本体育大学陸上競技部のトラック＆フィールド選手一覧。短距離、中距離、長距離、跳躍、投擲など各種目で活躍する選手のプロフィール、自己ベスト記録を掲載。',
  keywords: [
    '日体大 陸上 メンバー',
    '陸上競技 選手',
    'トラック選手',
    'フィールド選手',
    '自己ベスト',
    '陸上部 名簿',
  ],
  openGraph: {
    title: '陸上競技部メンバー - 選手一覧 | 日本体育大学駅伝部',
    description: '日体大陸上競技部のトラック＆フィールド選手一覧。各種目で活躍する選手のプロフィールと記録。',
    url: 'https://nssu-ekiden.com/track-and-field/members',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/members',
  },
};

export default function TrackMembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
