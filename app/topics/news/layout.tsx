import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ニュース一覧 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部のニュース一覧。チーム情報、選手の活躍を掲載。',
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
    'チーム情報',
    '選手情報'
  ],
  openGraph: {
    title: 'ニュース一覧 | 日本体育大学駅伝部',
    description: '日体大駅伝部のニュース一覧。チーム情報、選手の活躍を掲載。',
    url: 'https://nssu-ekiden.works/topics/news',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/topics/news',
  },
};

export default function NewsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
