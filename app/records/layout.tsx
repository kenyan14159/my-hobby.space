import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

// 選手情報の型定義
interface RecordHolderInfo {
  name: string;
  events: string[];
  years: string[];
  school?: string;
}

// 全記録から選手情報を取得
const getAllRecordHolders = (): Map<string, RecordHolderInfo> => {
  const holderMap = new Map<string, RecordHolderInfo>();
  
  // 男子データファイル
  const mensFiles = [
    { file: '1500m.json', event: '1500m' },
    { file: '3000msc.json', event: '3000mSC' },
    { file: '5000m.json', event: '5000m' },
    { file: '10000m.json', event: '10000m' },
    { file: 'half-marathon.json', event: 'ハーフマラソン' },
    { file: 'marathon.json', event: 'マラソン' },
  ];
  
  // 女子データファイル
  const womensFiles = [
    { file: '1500m.json', event: '1500m' },
    { file: '5000m.json', event: '5000m' },
    { file: '10000m.json', event: '10000m' },
  ];
  
  // 男子データを読み込み
  mensFiles.forEach(({ file, event }) => {
    try {
      const filePath = path.join(process.cwd(), 'data', 'records', 'men', file);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        const eventKey = Object.keys(data)[0];
        
        if (eventKey && Array.isArray(data[eventKey])) {
          data[eventKey].forEach((record: any) => {
            if (record.name) {
              const name = record.name.trim();
              if (!holderMap.has(name)) {
                holderMap.set(name, {
                  name,
                  events: [],
                  years: [],
                  school: record.school,
                });
              }
              const info = holderMap.get(name)!;
              if (!info.events.includes(event)) {
                info.events.push(event);
              }
              if (record.recordYear && !info.years.includes(record.recordYear)) {
                info.years.push(record.recordYear);
              }
              if (record.school && !info.school) {
                info.school = record.school;
              }
            }
          });
        }
      }
    } catch (err) {
      console.warn(`Failed to load men's ${file}:`, err);
    }
  });
  
  // 女子データを読み込み
  womensFiles.forEach(({ file, event }) => {
    try {
      const filePath = path.join(process.cwd(), 'data', 'records', 'women', file);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        const eventKey = Object.keys(data)[0];
        
        if (eventKey && Array.isArray(data[eventKey])) {
          data[eventKey].forEach((record: any) => {
            if (record.name) {
              const name = record.name.trim();
              if (!holderMap.has(name)) {
                holderMap.set(name, {
                  name,
                  events: [],
                  years: [],
                  school: record.school,
                });
              }
              const info = holderMap.get(name)!;
              if (!info.events.includes(event)) {
                info.events.push(event);
              }
              if (record.recordYear && !info.years.includes(record.recordYear)) {
                info.years.push(record.recordYear);
              }
              if (record.school && !info.school) {
                info.school = record.school;
              }
            }
          });
        }
      }
    } catch (err) {
      console.warn(`Failed to load women's ${file}:`, err);
    }
  });
  
  return holderMap;
};

// 全選手名を取得
const getAllRecordHolderNames = (): string[] => {
  const holderMap = getAllRecordHolders();
  return Array.from(holderMap.keys());
};

const recordHolderMap = getAllRecordHolders();
const recordHolders = getAllRecordHolderNames();

// 選手名を含む詳細な説明文を生成（最大30名まで）
const generateDescription = (): string => {
  const displayNames = recordHolders.slice(0, 30);
  const remainingCount = recordHolders.length - displayNames.length;
  let description = `日本体育大学駅伝部の歴代記録一覧ページ。${displayNames.join('、')}`;
  if (remainingCount > 0) {
    description += `ほか${remainingCount}名を含む全${recordHolders.length}名の歴代選手`;
  }
  description += 'の記録を掲載。1500m、3000mSC、5000m、10000m、ハーフマラソン、マラソンの歴代トップタイムを学年別に掲載。選手の自己ベスト記録、出身校、学年情報を詳しく紹介しています。選手名で検索して記録を確認できます。';
  return description;
};

export const metadata: Metadata = {
  title: '歴代記録 | 日本体育大学駅伝部',
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
    ...recordHolders, // 全記録保持者名を追加
    // 選手名と「日体大」の組み合わせも追加
    ...recordHolders.map(name => `${name} 日体大`),
    ...recordHolders.map(name => `${name} 日本体育大学`),
    ...recordHolders.map(name => `日体大 ${name}`),
    ...recordHolders.map(name => `${name} 記録`),
  ],
  openGraph: {
    title: '歴代記録 | 日本体育大学駅伝部',
    description: generateDescription(),
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

  // 各選手のPerson構造化データを生成
  const personSchemas = Array.from(recordHolderMap.values())
    .filter(holder => holder.name) // 名前があるもののみ
    .map((holder) => {
      const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: holder.name,
        affiliation: {
          '@type': 'Organization',
          name: '日本体育大学陸上競技部男子駅伝ブロック',
        },
        url: `https://nssu-ekiden.com/records#${encodeURIComponent(holder.name)}`,
        description: `日本体育大学駅伝部の歴代記録保持者。${holder.events.join('、')}の記録を保持。${holder.years.length > 0 ? `${holder.years.join('、')}に記録。` : ''}${holder.school ? `${holder.school}出身。` : ''}`,
      };
      
      if (holder.school) {
        schema.alumniOf = {
          '@type': 'EducationalOrganization',
          name: holder.school,
        };
      }
      
      return schema;
    });

  // ItemList構造化データ（全選手をリスト化）
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '日本体育大学駅伝部歴代記録保持者一覧',
    description: '日本体育大学駅伝部の歴代記録保持者リスト',
    itemListElement: recordHolders.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: name,
      url: `https://nssu-ekiden.com/records#${encodeURIComponent(name)}`,
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
