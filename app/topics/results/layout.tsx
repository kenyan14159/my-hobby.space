import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '試合結果一覧 - レース速報',
  description: '日本体育大学駅伝部の試合結果一覧。箱根駅伝予選会、全日本大学駅伝、出雲駅伝、記録会など、全ての大会結果と選手の走行記録を詳しく掲載。レース速報をチェック。',
  keywords: [
    '試合結果',
    'レース速報',
    '箱根駅伝 結果',
    '全日本 結果',
    '記録会 結果',
    '日体大 駅伝 成績',
  ],
  openGraph: {
    title: '試合結果一覧 - レース速報 | 日本体育大学駅伝部',
    description: '日体大駅伝部の試合結果一覧。箱根駅伝予選会、全日本、出雲など全ての大会結果を掲載。',
    url: 'https://nssu-ekiden.com/topics/results',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/topics/results',
  },
};

export default function ResultsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
