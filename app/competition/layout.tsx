import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '競技情報 - 大会・レース情報',
  description: '日本体育大学駅伝部が出場する各種競技大会の情報。箱根駅伝、全日本大学駅伝、出雲駅伝などの主要大会から記録会まで、最新の競技スケジュールと結果をお届けします。',
  keywords: [
    '日体大 競技情報',
    '大学駅伝 大会',
    '駅伝 レース情報',
    '箱根駅伝 出場',
    '記録会',
    '陸上競技 大会',
  ],
  openGraph: {
    title: '競技情報 - 大会・レース情報 | 日本体育大学駅伝部',
    description: '日体大駅伝部が出場する各種競技大会の情報。箱根駅伝、全日本、出雲などの最新スケジュールと結果。',
    url: 'https://nssu-ekiden.com/competition',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/competition',
  },
};

export default function CompetitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}