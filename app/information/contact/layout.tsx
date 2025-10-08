import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ - 取材・応援・その他',
  description: '日本体育大学駅伝部へのお問い合わせ。取材依頼、応援メッセージ、イベント協力、その他のご連絡はこちらから。公式サイト運営チームが対応いたします。',
  keywords: [
    '日体大駅伝 お問い合わせ',
    '取材依頼',
    '応援メッセージ',
    '駅伝部 連絡先',
    'メディア対応',
  ],
  openGraph: {
    title: 'お問い合わせ - 取材・応援・その他 | 日本体育大学駅伝部',
    description: '日体大駅伝部へのお問い合わせ。取材依頼、応援メッセージなどはこちらから。',
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
