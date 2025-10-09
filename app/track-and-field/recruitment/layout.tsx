import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '入部案内 | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部の入部案内。各ブロック紹介、練習日程、施設情報を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '入部案内',
    '新入生',
    '部員募集'
  ],
  openGraph: {
    title: '入部案内 | 日本体育大学陸上競技部',
    description: '日体大陸上競技部の入部案内。各ブロック紹介、練習日程、施設情報を掲載。',
    url: 'https://nssu-ekiden.com/track-and-field/recruitment',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/recruitment',
  },
};

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
