import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大会スケジュール | 日本体育大学陸上競技部',
  description: '日本体育大学陸上競技部の大会スケジュール。インカレ、日本選手権、記録会の出場予定を掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'スケジュール',
    '大会予定',
    'インカレ',
    '記録会'
  ],
  openGraph: {
    title: '大会スケジュール | 日本体育大学陸上競技部',
    description: '日体大陸上競技部の大会スケジュール。インカレ、日本選手権、記録会の出場予定を掲載。',
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
