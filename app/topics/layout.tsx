import { Metadata } from 'next';
import { TopicsNavigation } from "@/components/ui/topics-navigation";

export const metadata: Metadata = {
  title: 'トピックス | 日本体育大学駅伝部',
  description: '日本体育大学駅伝部のトピックス。最新ニュース、試合結果、大会スケジュールを掲載。',
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'トピックス',
    'ニュース',
    '試合結果',
    'スケジュール'
  ],
  openGraph: {
    title: 'トピックス | 日本体育大学駅伝部',
    description: '日体大駅伝部のトピックス。最新ニュース、試合結果、スケジュールを掲載。',
    url: 'https://nssu-ekiden.com/topics',
    type: 'website',
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