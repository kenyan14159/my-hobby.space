import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技ニュース - 最新情報',
  description: '日本体育大学陸上競技部のトラック＆フィールド最新ニュース。大会結果、選手の活躍、記録更新、合宿レポートなど、陸上競技に関する情報をタイムリーにお届けします。',
  keywords: [
    '陸上競技 ニュース',
    '日体大 陸上 最新',
    '大会結果',
    '記録更新',
    '選手 活躍',
    'トラック ニュース',
  ],
  openGraph: {
    title: '陸上競技ニュース - 最新情報 | 日本体育大学駅伝部',
    description: '日体大陸上競技部の最新ニュース。大会結果、選手の活躍、記録更新などをタイムリーにお届け。',
    url: 'https://nssu-ekiden.com/track-and-field/news',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/news',
  },
};

export default function TrackNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
