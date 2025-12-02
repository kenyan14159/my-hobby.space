import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'リザルト | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部の試合結果一覧。駅伝、記録会の結果を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '試合結果',
    'レース',
    '箱根駅伝',
    'リザルト',
    '記録会'
  ],
  openGraph: {
    title: 'リザルト | 日本体育大学駅伝部',
    description: '日本体育大学駅伝部の試合結果一覧。駅伝、記録会の結果を掲載。',
    url: 'https://nssu-ekiden.works/topics/results',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/topics/results',
  },
};

export default function ResultsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
