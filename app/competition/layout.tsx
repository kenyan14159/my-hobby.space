import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日体大記録会 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部が主催する日体大記録会。大会情報、エントリー方法を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '日体大記録会',
    '日本体育大学長距離競技会',
    '記録会',
    '日体記録会',
    '大会情報'
  ],
  openGraph: {
    title: '日体大記録会 | 日本体育大学駅伝部',
    description: '日体大駅伝部主催の日体大記録会。大会情報、エントリー方法。',
    url: 'https://nssu-ekiden.works/competition',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/competition',
  },
};

export default function CompetitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}