import { Metadata } from 'next';
import hakoneHistory from '@/data/ekiden/hakone-history.json';
import allJapanHistory from '@/data/ekiden/all-japan-history.json';
import fujisanHistory from '@/data/ekiden/fujisan-history.json';
import womensAllJapanHistory from '@/data/ekiden/womens-all-japan-history.json';
import mixedHistory from '@/data/ekiden/mixed-history.json';

// 全駅伝履歴から選手名を取得
const getAllRunnerNames = () => {
  const allRunners = new Set<string>();
  
  // 各駅伝の履歴データから選手名を抽出
  const histories = [
    hakoneHistory['hakone-history'],
    allJapanHistory['all-japan-history'],
    fujisanHistory['fujisan-history'],
    womensAllJapanHistory['womens-all-japan-history'],
    mixedHistory['mixed-history']
  ];
  
  histories.forEach((history: any) => {
    if (Array.isArray(history)) {
      history.forEach((record: any) => {
        if (record.runners && Array.isArray(record.runners)) {
          record.runners.forEach((runner: any) => {
            if (runner.name) {
              allRunners.add(runner.name);
            }
          });
        }
      });
    }
  });
  
  return Array.from(allRunners);
};

const runnerNames = getAllRunnerNames();

export const metadata: Metadata = {
  title: '駅伝の歴史 | 日本体育大学駅伝部',
  description: `日本体育大学駅伝部の駅伝出場歴史と戦績。${runnerNames.slice(0, 5).join('、')}をはじめとする歴代メンバーの活躍を掲載。箱根駅伝、全日本大学駅伝、富士山女子駅伝、全日本大学女子駅伝（杜の都駅伝）、男女混合駅伝の歴代成績、出場回数、各区間記録を詳しく掲載しています。`,
  keywords: [
    'NSSU',
    'NASU',
    '日本体育大学',
    '日体大',
    '日体',
    '日体駅伝',
    'エッサッサ',
    '陸上競技部',
    '駅伝部',
    '駅伝の歴史',
    '駅伝戦績',
    '出場歴',
    '箱根駅伝',
    '箱根駅伝出場歴',
    '全日本大学駅伝',
    '全日本駅伝',
    '富士山女子駅伝',
    '富士山駅伝',
    '全日本大学女子駅伝',
    '杜の都駅伝',
    '男女混合駅伝',
    '大学駅伝',
    '学生駅伝',
    '駅伝成績',
    '歴代成績',
    'シード権',
    '総合順位',
    '区間記録',
    ...runnerNames // 全選手名を追加
  ],
  openGraph: {
    title: '駅伝の歴史 | 日本体育大学駅伝部',
    description: '日体大駅伝部の駅伝出場歴史。箱根駅伝、全日本大学駅伝、富士山女子駅伝、杜の都駅伝、男女混合駅伝の歴代成績を掲載。',
    url: 'https://nssu-ekiden.com/ekiden',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/ekiden',
  },
};

export default function EkidenLayout({
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
        name: '駅伝情報',
        item: 'https://nssu-ekiden.com/ekiden',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
