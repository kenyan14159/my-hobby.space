import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陸上競技サポーター - 支援・協賛',
  description: '日本体育大学陸上競技部を支えるサポーターの皆様。トラック＆フィールド活動への支援、協賛、寄付についての情報。選手の成長と記録更新を一緒に応援しませんか。',
  keywords: [
    '陸上 サポーター',
    '陸上競技 支援',
    'スポンサー',
    '協賛',
    '陸上部 応援',
    '寄付',
  ],
  openGraph: {
    title: '陸上競技サポーター - 支援・協賛 | 日本体育大学駅伝部',
    description: '日体大陸上競技部を支えるサポーター情報。トラック＆フィールド活動への支援について。',
    url: 'https://nssu-ekiden.com/track-and-field/supporters',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/supporters',
  },
};

export default function TrackSupportersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
