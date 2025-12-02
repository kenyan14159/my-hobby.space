import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日体大競技会 | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部が主催している日体大競技会の情報を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '大会情報',
    'インカレ',
    '日本選手権',
    '記録会'
  ],
  openGraph: {
    title: '日体大競技会 | 日本体育大学陸上競技部',
    description: '日本体育大学陸上競技部が主催している日体大競技会の情報を掲載。',
    url: 'https://nssu-ekiden.works/track-and-field/competition',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/track-and-field/competition',
  },
};

export default function TrackCompetitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
