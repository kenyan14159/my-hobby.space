import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ニュース一覧 | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部のニュース一覧。トラック・フィールド競技の大会結果、選手の活躍を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'ニュース',
    '大会結果',
    'トラック競技'
  ],
  openGraph: {
    title: 'ニュース一覧 | 日本体育大学陸上競技部',
    description: '日体大陸上競技部のニュース一覧。大会結果、選手の活躍を掲載。',
    url: 'https://nssu-ekiden.works/track-and-field/news',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/track-and-field/news',
  },
};

export default function TrackNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
