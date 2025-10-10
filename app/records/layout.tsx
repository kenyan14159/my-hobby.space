import { Metadata } from 'next';
import records5000m from '@/data/records/men/5000m.json';
import records10000m from '@/data/records/men/10000m.json';
import recordsHalf from '@/data/records/men/half-marathon.json';

// 全記録から選手名を取得
const getAllRecordHolders = () => {
  const allNames = new Set<string>();
  
  // 5000m
  if (records5000m['5000m'] && Array.isArray(records5000m['5000m'])) {
    records5000m['5000m'].forEach((record: any) => {
      if (record.name) allNames.add(record.name);
    });
  }
  
  // 10000m
  if (records10000m['10000m'] && Array.isArray(records10000m['10000m'])) {
    records10000m['10000m'].forEach((record: any) => {
      if (record.name) allNames.add(record.name);
    });
  }
  
  // ハーフマラソン
  if (recordsHalf['ハーフマラソン'] && Array.isArray(recordsHalf['ハーフマラソン'])) {
    recordsHalf['ハーフマラソン'].forEach((record: any) => {
      if (record.name) allNames.add(record.name);
    });
  }
  
  return Array.from(allNames);
};

const recordHolders = getAllRecordHolders();

export const metadata: Metadata = {
  title: '歴代記録 | 日本体育大学駅伝部',
  description: `日本体育大学駅伝部の歴代記録一覧。${recordHolders.slice(0, 5).join('、')}をはじめとする歴代選手の記録を掲載。5000m、10000m、ハーフマラソンの歴代トップタイムを学年別に掲載。選手の自己ベスト記録、出身校、学年情報を詳しく紹介しています。`,
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
    '歴代記録',
    '駅伝部記録',
    '自己ベスト',
    '5000m',
    '5000メートル',
    '10000m',
    '10000メートル',
    'ハーフマラソン',
    'ハーフ',
    '長距離記録',
    '学年別記録',
    '出身校',
    'タイム',
    'ベストタイム',
    '持ちタイム',
    ...recordHolders // 全記録保持者名を追加
  ],
  openGraph: {
    title: '歴代記録 | 日本体育大学駅伝部',
    description: '日体大駅伝部の歴代記録。5000m、10000m、ハーフマラソンの選手別自己ベストタイムを掲載。',
    url: 'https://nssu-ekiden.com/records',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/records',
  },
};

export default function RecordsLayout({
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
        name: '駅伝部記録',
        item: 'https://nssu-ekiden.com/records',
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
