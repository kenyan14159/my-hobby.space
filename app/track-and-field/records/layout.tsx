import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '種目別歴代記録 | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部の種目別歴代記録。短距離（100m、200m、400m）、中距離（800m、1500m）、長距離（5000m、10000m）、跳躍（走幅跳、三段跳、走高跳、棒高跳）、投擲（砲丸投、円盤投、やり投、ハンマー投）、混成競技の男女別記録を掲載しています。',
  keywords: [
    'NSSU',
    'NASU',
    '日本体育大学',
    '日体大',
    '日体',
    '日体陸上',
    'エッサッサ',
    '陸上競技部',
    '陸上部',
    '種目別記録',
    '歴代記録',
    '自己ベスト',
    '短距離',
    '100m',
    '200m',
    '400m',
    '中距離',
    '800m',
    '1500m',
    '長距離',
    '5000m',
    '10000m',
    '跳躍',
    '走幅跳',
    '三段跳',
    '走高跳',
    '棒高跳',
    '投擲',
    '砲丸投',
    '円盤投',
    'やり投',
    'ハンマー投',
    '混成競技',
    '十種競技',
    '七種競技',
    'トラック競技',
    'フィールド競技',
    '男子陸上',
    '女子陸上'
  ],
  openGraph: {
    title: '種目別歴代記録 | 日本体育大学陸上競技部',
    description: '日体大陸上競技部の種目別歴代記録。短距離、中距離、長距離、跳躍、投擲、混成の全種目記録を掲載。',
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
