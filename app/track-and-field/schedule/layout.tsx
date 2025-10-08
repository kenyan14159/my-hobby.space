import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技スケジュール - 大会予定',
  description: '日本体育大学陸上競技部の年間スケジュール。インカレ、日本選手権、記録会など、トラック＆フィールド競技の出場予定大会を月別・種目別に掲載。応援にお役立てください。',
  keywords: [
    '陸上 スケジュール',
    '大会予定',
    'インカレ 予定',
    '記録会 日程',
    '陸上競技 カレンダー',
    '日体大 陸上 予定',
  ],
  openGraph: {
    title: '陸上競技スケジュール - 大会予定 | 日本体育大学駅伝部',
    description: '日体大陸上競技部の年間スケジュール。インカレ、日本選手権、記録会などの出場予定。',
    url: 'https://nssu-ekiden.com/track-and-field/schedule',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/schedule',
  },
};

export default function TrackScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
