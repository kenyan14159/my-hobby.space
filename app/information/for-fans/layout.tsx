import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ファンの方へ - 応援ガイド・観戦情報',
  description: '日体大駅伝部を応援するファンの皆様へ。試合観戦ガイド、応援マナー、グッズ情報、SNS公式アカウント、ファンクラブ情報など、応援に役立つ情報をまとめています。',
  keywords: [
    '日体大駅伝 応援',
    '駅伝 観戦ガイド',
    '応援マナー',
    'ファンクラブ',
    '駅伝 グッズ',
    '公式SNS',
  ],
  openGraph: {
    title: 'ファンの方へ - 応援ガイド・観戦情報 | 日本体育大学駅伝部',
    description: '日体大駅伝部の応援ガイド。試合観戦情報、応援マナー、グッズ情報などをご紹介。',
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
