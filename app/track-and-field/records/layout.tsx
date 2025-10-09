import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '種目別歴代記録 | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部の種目別記録。100m、400m、1500m、跳躍、投擲の歴代記録を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '記録',
    '歴代記録',
    'トラック競技',
    'フィールド競技'
  ],
  openGraph: {
    title: '種目別歴代記録 | 日本体育大学陸上競技部',
    description: '日体大陸上競技部の種目別記録。全種目の歴代記録を掲載。',
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
