import { Metadata } from 'next';
import { TopicsNavigation } from "@/components/ui/topics-navigation";

export const metadata: Metadata = {
  title: 'トピックス | 最新ニュース・試合結果・スケジュール',
  description: '日体大駅伝部の最新ニュース、試合結果、今後のスケジュールを配信。箱根駅伝予選会や三大駅伝の速報、選手の活躍、チーム情報をリアルタイムで更新。駅伝ファンは要チェック！',
  keywords: [
    '日体大 ニュース',
    '駅伝 ニュース',
    '試合結果',
    '箱根駅伝 速報',
    '大会スケジュール',
    '駅伝 最新情報',
    'トピックス',
    '結果速報'
  ],
  openGraph: {
    title: 'トピックス | 最新ニュース・試合結果・スケジュール',
    description: '日体大駅伝部の最新ニュース、試合結果、スケジュールをリアルタイムで配信。',
    url: 'https://nssu-ekiden.com/topics',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/topics',
  },
};

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // BreadcrumbList構造化データ
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://nssu-ekiden.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'トピックス',
        item: 'https://nssu-ekiden.com/topics',
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
}