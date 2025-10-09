import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メンバー紹介 | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部のメンバー紹介。トラック・フィールド選手のプロフィール、自己ベストを掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'メンバー',
    '選手一覧',
    'トラック競技',
    'フィールド競技'
  ],
  openGraph: {
    title: 'メンバー紹介 | 日本体育大学陸上競技部',
    description: '日体大陸上競技部のメンバー紹介。トラック・フィールド選手を掲載。',
    url: 'https://nssu-ekiden.com/track-and-field/members',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/members',
  },
};

export default function TrackMembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
