import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部へのお問い合わせ。取材依頼、応援メッセージはこちらから。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'お問い合わせ',
    '取材依頼',
    '連絡先'
  ],
  openGraph: {
    title: 'お問い合わせ | 日本体育大学駅伝部',
    description: '日体大駅伝部へのお問い合わせ。取材依頼、応援メッセージはこちらから。',
    url: 'https://nssu-ekiden.com/information/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/information/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
