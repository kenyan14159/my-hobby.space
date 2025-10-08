import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大会スケジュール - 年間予定',
  description: '日本体育大学駅伝部の年間大会スケジュール。箱根駅伝予選会、全日本大学駅伝、出雲駅伝の三大駅伝から、記録会、合宿まで。応援に役立つ詳細な日程情報を掲載。',
  keywords: [
    '駅伝 スケジュール',
    '大会予定',
    '箱根駅伝 日程',
    '全日本 予定',
    '出雲 日程',
    '記録会 スケジュール',
  ],
  openGraph: {
    title: '大会スケジュール - 年間予定 | 日本体育大学駅伝部',
    description: '日体大駅伝部の年間大会スケジュール。箱根、全日本、出雲など主要大会の詳細日程。',
    url: 'https://nssu-ekiden.com/topics/schedule',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/topics/schedule',
  },
};

export default function ScheduleListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
