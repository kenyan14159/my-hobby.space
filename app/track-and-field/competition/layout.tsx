import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技大会情報 - 出場予定・結果',
  description: '日本体育大学陸上競技部が出場する各種トラック＆フィールド大会の情報。インカレ、日本選手権、記録会など、出場予定の大会スケジュールと結果速報をお届けします。',
  keywords: [
    '陸上競技 大会',
    'インカレ',
    '日本選手権',
    '記録会',
    '陸上 結果',
    '日体大 陸上 大会',
  ],
  openGraph: {
    title: '陸上競技大会情報 - 出場予定・結果 | 日本体育大学駅伝部',
    description: '日体大陸上競技部が出場する各種大会の情報。インカレ、日本選手権、記録会などの最新情報。',
    url: 'https://nssu-ekiden.com/track-and-field/competition',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/competition',
  },
};

export default function TrackCompetitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
