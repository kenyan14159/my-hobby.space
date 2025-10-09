import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '応援してくださる皆様へ | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部を応援する皆様へ。観戦ガイド、応援マナー、公式SNSの情報を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '応援',
    '観戦ガイド',
    '応援マナー'
  ],
  openGraph: {
    title: '応援してくださる皆様へ | 日本体育大学駅伝部',
    description: '日体大駅伝部を応援する皆様へ。観戦ガイド、応援マナーを掲載。',
    url: 'https://nssu-ekiden.com/information/for-fans',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/information/for-fans',
  },
};

export default function ForFansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
