import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技記録 - 種目別ベスト記録',
  description: '日本体育大学陸上競技部の種目別記録データベース。100m、200m、400m、800m、1500m、5000m、10000m、跳躍、投擲など全種目の歴代記録と現役選手のベスト記録を掲載。',
  keywords: [
    '陸上 記録',
    '種目別記録',
    '自己ベスト',
    '歴代記録',
    '日体大 陸上 記録',
    'トラック記録',
  ],
  openGraph: {
    title: '陸上競技記録 - 種目別ベスト記録 | 日本体育大学駅伝部',
    description: '日体大陸上競技部の種目別記録データベース。全種目の歴代記録と現役選手のベスト記録。',
    url: 'https://nssu-ekiden.com/track-and-field/records',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/records',
  },
};

export default function TrackRecordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
