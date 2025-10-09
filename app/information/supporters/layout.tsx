import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サポーターの皆様 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部を支えるサポーターの皆様。企業スポンサー、個人サポーター、支援方法を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'サポーター',
    'スポンサー',
    '支援'
  ],
  openGraph: {
    title: 'サポーターの皆様 | 日本体育大学駅伝部',
    description: '日体大駅伝部を支えるサポーターの皆様。支援方法、スポンサー情報を掲載。',
    url: 'https://nssu-ekiden.com/information/supporters',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/information/supporters',
  },
};

export default function SupportersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
