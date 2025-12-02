import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大会スケジュール | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部の大会スケジュール。箱根駅伝、全日本大学駅伝、記録会の日程を掲載。',
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
    '大会日程',
    '箱根駅伝',
    '記録会'
  ],
  openGraph: {
    title: '大会スケジュール | 日本体育大学駅伝部',
    description: '日体大駅伝部の大会スケジュール。箱根、全日本、記録会の日程を掲載。',
    url: 'https://nssu-ekiden.works/topics/schedule',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/topics/schedule',
  },
};

export default function ScheduleListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
