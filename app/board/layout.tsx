import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '匿名掲示板 | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部の匿名掲示板。応援メッセージ、試合の感想、質問などを投稿できます。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '掲示板',
    'ファン交流',
    '応援',
    '匿名掲示板',
    'コミュニティ'
  ],
  openGraph: {
    title: '匿名掲示板 | 日本体育大学駅伝部',
    description: '日体大駅伝部の匿名掲示板。応援メッセージや試合の感想を投稿できます。',
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