import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '掲示板 - ファン交流掲示板',
  description: '日本体育大学駅伝部ファンの交流掲示板。応援メッセージ、試合の感想、質問などを投稿できます。ルールを守って楽しくコミュニケーションしましょう。',
  keywords: [
    '日体大駅伝 掲示板',
    '駅伝 ファン交流',
    '応援メッセージ',
    '駅伝 コミュニティ',
    '日体大 応援',
  ],
  openGraph: {
    title: '掲示板 - ファン交流掲示板 | 日本体育大学駅伝部',
    description: '日体大駅伝部ファンの交流掲示板。応援メッセージや試合の感想を投稿できます。',
    url: 'https://nssu-ekiden.com/board',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/board',
  },
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-sky-100 min-h-screen">
      {children}
    </div>
  );
} 