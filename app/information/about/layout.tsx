import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ホームページについて | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部の公式ホームページについて。運営方針、お問い合わせ先を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'ホームページ',
    '公式サイト',
    '運営方針'
  ],
  openGraph: {
    title: 'ホームページについて | 日本体育大学駅伝部',
    description: '日体大駅伝部の公式ホームページについて。運営方針、お問い合わせ先を掲載。',
    url: 'https://nssu-ekiden.works/information/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/information/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
