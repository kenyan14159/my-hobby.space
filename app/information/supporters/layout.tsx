import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サポーター情報 - 支援者・スポンサー',
  description: '日本体育大学駅伝部を支えるサポーターの皆様。企業スポンサー、個人サポーター、支援方法、寄付についての情報。チームと共に箱根駅伝出場を目指しませんか。',
  keywords: [
    '日体大駅伝 サポーター',
    '駅伝 スポンサー',
    'チーム支援',
    '寄付',
    '協賛企業',
    '駅伝部 応援',
  ],
  openGraph: {
    title: 'サポーター情報 - 支援者・スポンサー | 日本体育大学駅伝部',
    description: '日体大駅伝部を支えるサポーター情報。支援方法、スポンサー、寄付についてご案内。',
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
