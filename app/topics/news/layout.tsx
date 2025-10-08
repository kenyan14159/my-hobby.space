import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ニュース一覧 - 最新情報',
  description: '日本体育大学駅伝部の最新ニュース一覧。チーム情報、選手の活躍、練習レポート、イベント告知など、駅伝部に関する最新情報を随時更新。箱根駅伝への道のりを追いかけよう。',
  keywords: [
    '日体大駅伝 ニュース',
    '最新情報',
    'チーム情報',
    '選手 活躍',
    '練習レポート',
    '駅伝 速報',
  ],
  openGraph: {
    title: 'ニュース一覧 - 最新情報 | 日本体育大学駅伝部',
    description: '日体大駅伝部の最新ニュース一覧。チーム情報、選手の活躍、練習レポートなどを随時更新。',
    url: 'https://nssu-ekiden.com/topics/news',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/topics/news',
  },
};

export default function NewsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
