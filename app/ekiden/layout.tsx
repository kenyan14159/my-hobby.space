import { Metadata } from 'next';
import hakoneHistory from '@/data/ekiden/hakone-history.json';
import allJapanHistory from '@/data/ekiden/all-japan-history.json';
import fujisanHistory from '@/data/ekiden/fujisan-history.json';
import womensAllJapanHistory from '@/data/ekiden/womens-all-japan-history.json';
import mixedHistory from '@/data/ekiden/mixed-history.json';

// 選手情報の型定義
interface RunnerInfo {
  name: string;
  tournaments: string[];
  years: number[];
}

// 全駅伝履歴から選手情報を取得
const getAllRunnerInfo = (): Map<string, RunnerInfo> => {
  const runnerMap = new Map<string, RunnerInfo>();
  
  // 各駅伝の履歴データから選手情報を抽出
  const histories = [
    { data: hakoneHistory['hakone-history'], tournament: '箱根駅伝' },
    { data: allJapanHistory['all-japan-history'], tournament: '全日本大学駅伝' },
    { data: fujisanHistory['fujisan-history'], tournament: '富士山女子駅伝' },
    { data: womensAllJapanHistory['womens-all-japan-history'], tournament: '全日本大学女子駅伝' },
    { data: mixedHistory['mixed-history'], tournament: '男女混合駅伝' }
  ];
  
  histories.forEach(({ data, tournament }) => {
    if (Array.isArray(data)) {
      data.forEach((record: any) => {
        if (record.runners && Array.isArray(record.runners)) {
          const year = record.year || record.kai;
          record.runners.forEach((runner: any) => {
            if (runner.name) {
              const name = runner.name.trim();
              if (!runnerMap.has(name)) {
                runnerMap.set(name, {
                  name,
                  tournaments: [],
                  years: []
                });
              }
              const info = runnerMap.get(name)!;
              if (!info.tournaments.includes(tournament)) {
                info.tournaments.push(tournament);
              }
              if (year && !info.years.includes(year)) {
                info.years.push(year);
              }
            }
          });
        }
      });
    }
  });
  
  return runnerMap;
};

// 全選手名を取得
const getAllRunnerNames = (): string[] => {
  const runnerMap = getAllRunnerInfo();
  return Array.from(runnerMap.keys());
};

const runnerInfoMap = getAllRunnerInfo();
const runnerNames = getAllRunnerNames();

// 選手名を含む詳細な説明文を生成（最大30名まで）
const generateDescription = (): string => {
  const displayNames = runnerNames.slice(0, 30);
  const remainingCount = runnerNames.length - displayNames.length;
  let description = `日本体育大学駅伝部の駅伝出場歴史と戦績ページ。${displayNames.join('、')}`;
  if (remainingCount > 0) {
    description += `ほか${remainingCount}名を含む全${runnerNames.length}名の歴代メンバー`;
  }
  description += 'の活躍を掲載。箱根駅伝、全日本大学駅伝、富士山女子駅伝、全日本大学女子駅伝（杜の都駅伝）、男女混合駅伝の歴代成績、出場回数、各区間記録を詳しく掲載しています。選手名で検索して出場歴を確認できます。';
  return description;
};

export const metadata: Metadata = {
  title: '駅伝の歴史 | 日本体育大学駅伝部',
  description: generateDescription(),
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
    ...runnerNames, // 全選手名を追加
    // 選手名と「日体大」の組み合わせも追加
    ...runnerNames.map(name => `${name} 日体大`),
    ...runnerNames.map(name => `${name} 日本体育大学`),
    ...runnerNames.map(name => `日体大 ${name}`),
    ...runnerNames.map(name => `${name} 駅伝`),
    ...runnerNames.map(name => `${name} 箱根駅伝`),
  ],
  openGraph: {
    title: '駅伝の歴史 | 日本体育大学駅伝部',
    description: generateDescription(),
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

  // 各選手のPerson構造化データを生成
  const personSchemas = Array.from(runnerInfoMap.values())
    .filter(runner => runner.name) // 名前があるもののみ
    .map((runner) => {
      const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: runner.name,
        affiliation: {
          '@type': 'Organization',
          name: '日本体育大学陸上競技部男子駅伝ブロック',
        },
        url: `https://nssu-ekiden.com/ekiden#${encodeURIComponent(runner.name)}`,
        description: `日本体育大学駅伝部の歴代メンバー。${runner.tournaments.join('、')}に出場。${runner.years.length > 0 ? `${Math.min(...runner.years)}年から${Math.max(...runner.years)}年にかけて` : ''}活躍。`,
      };
      
      return schema;
    });

  // ItemList構造化データ（全選手をリスト化）
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '日本体育大学駅伝部歴代メンバー一覧',
    description: '日本体育大学駅伝部の駅伝出場歴代メンバーリスト',
    itemListElement: runnerNames.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: name,
      url: `https://nssu-ekiden.com/ekiden#${encodeURIComponent(name)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* 各選手のPerson構造化データ */}
      {personSchemas.map((schema, index) => (
        <script
          key={`person-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
