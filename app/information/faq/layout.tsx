import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'よくある質問（FAQ）| 日体大駅伝部',
  description: '日本体育大学駅伝部に関するよくある質問と回答。入部方法、練習内容、試合観戦、応援方法、部員の生活など、ファンや入部希望者の疑問にお答えします。',
  keywords: [
    '日体大駅伝 FAQ',
    '日体大 入部',
    '駅伝部 練習',
    '箱根駅伝 応援',
    '日体大 駅伝 質問',
    'よくある質問'
  ],
  openGraph: {
    title: 'よくある質問（FAQ）| 日体大駅伝部',
    description: '日本体育大学駅伝部に関するよくある質問と回答集',
    url: 'https://nssu-ekiden.com/information/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
