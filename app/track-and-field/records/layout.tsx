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

// 種目名の英語→日本語マッピング
const eventNameMap: { [key: string]: string } = {
  "100m": "100m",
  "200m": "200m",
  "400m": "400m",
  "800m": "800m",
  "1500m": "1500m",
  "5000m": "5000m",
  "10000m": "10000m",
  "110mh": "110mH",
  "400mh": "400mH",
  "100mh": "100mH",
  "3000msc": "3000m障害",
  "20kmwalk": "20km競歩",
  "10000mwalk": "10000m競歩",
  "halfmarathon": "ハーフマラソン",
  "marathon": "マラソン",
  "high-jump": "走高跳",
  "pole-vault": "棒高跳",
  "long-jump": "走幅跳",
  "triple-jump": "三段跳",
  "shot-put": "砲丸投",
  "discus-throw": "円盤投",
  "hammer-throw": "ハンマー投",
  "javelin-throw": "やり投",
  "decathlon": "十種競技",
  "heptathlon": "七種競技",
};

// 全記録から選手情報を取得
const getAllRecordHolders = (): Map<string, RecordHolderInfo> => {
  const holderMap = new Map<string, RecordHolderInfo>();
  
  // 男子データファイル
  const mensDir = path.join(process.cwd(), 'public', 'data', 'track-field-records', 'men');
  const womensDir = path.join(process.cwd(), 'public', 'data', 'track-field-records', 'women');
  
  // 男子データを読み込み
  if (fs.existsSync(mensDir)) {
    const mensFiles = fs.readdirSync(mensDir).filter(file => file.endsWith('.json'));
    
    mensFiles.forEach((file) => {
      try {
        const filePath = path.join(mensDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        const eventKey = Object.keys(data)[0];
        const eventName = eventNameMap[eventKey] || eventKey;
        
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
              if (!info.events.includes(eventName)) {
                info.events.push(eventName);
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
      } catch (err) {
        console.warn(`Failed to load men's ${file}:`, err);
      }
    });
  }
  
  // 女子データを読み込み
  if (fs.existsSync(womensDir)) {
    const womensFiles = fs.readdirSync(womensDir).filter(file => file.endsWith('.json'));
    
    womensFiles.forEach((file) => {
      try {
        const filePath = path.join(womensDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        const eventKey = Object.keys(data)[0];
        const eventName = eventNameMap[eventKey] || eventKey;
        
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
              if (!info.events.includes(eventName)) {
                info.events.push(eventName);
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
      } catch (err) {
        console.warn(`Failed to load women's ${file}:`, err);
      }
    });
  }
  
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
  let description = `日本体育大学陸上競技部の種目別歴代記録ページ。${displayNames.join('、')}`;
  if (remainingCount > 0) {
    description += `ほか${remainingCount}名を含む全${recordHolders.length}名の歴代記録保持者`;
  }
  description += 'の記録を掲載。短距離（100m、200m、400m）、中距離（800m、1500m）、長距離（5000m、10000m）、跳躍（走幅跳、三段跳、走高跳、棒高跳）、投擲（砲丸投、円盤投、やり投、ハンマー投）、混成競技の男女別記録を掲載しています。選手名で検索して記録を確認できます。';
  return description;
};

export const metadata: Metadata = {
  title: '種目別歴代記録 | 日本体育大学陸上競技部',
  description: generateDescription(),
  keywords: [
    'NSSU',
    'NASU',
    '日本体育大学',
    '日体大',
    '日体',
    '日体陸上',
    'エッサッサ',
    '陸上競技部',
    '陸上部',
    '種目別記録',
    '歴代記録',
    '自己ベスト',
    '短距離',
    '100m',
    '200m',
    '400m',
    '中距離',
    '800m',
    '1500m',
    '長距離',
    '5000m',
    '10000m',
    '跳躍',
    '走幅跳',
    '三段跳',
    '走高跳',
    '棒高跳',
    '投擲',
    '砲丸投',
    '円盤投',
    'やり投',
    'ハンマー投',
    '混成競技',
    '十種競技',
    '七種競技',
    'トラック競技',
    'フィールド競技',
    '男子陸上',
    '女子陸上',
    ...recordHolders, // 全記録保持者名を追加
    // 選手名と「日体大」の組み合わせも追加
    ...recordHolders.map(name => `${name} 日体大`),
    ...recordHolders.map(name => `${name} 日本体育大学`),
    ...recordHolders.map(name => `日体大 ${name}`),
    ...recordHolders.map(name => `${name} 記録`),
    ...recordHolders.map(name => `${name} 陸上競技部`),
  ],
  openGraph: {
    title: '種目別歴代記録 | 日本体育大学陸上競技部',
    description: generateDescription(),
    url: 'https://nssu-ekiden.works/track-and-field/records',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.works/track-and-field/records',
  },
};

export default function TrackRecordsLayout({
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
        item: 'https://nssu-ekiden.works',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '陸上競技部',
        item: 'https://nssu-ekiden.works/track-and-field',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '種目別歴代記録',
        item: 'https://nssu-ekiden.works/track-and-field/records',
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
          name: '日本体育大学陸上競技部',
        },
        url: `https://nssu-ekiden.works/track-and-field/records#${encodeURIComponent(holder.name)}`,
        description: `日本体育大学陸上競技部の歴代記録保持者。${holder.events.join('、')}の記録を保持。${holder.years.length > 0 ? `${holder.years.join('、')}に記録。` : ''}${holder.school ? `${holder.school}出身。` : ''}`,
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
    name: '日本体育大学陸上競技部歴代記録保持者一覧',
    description: '日本体育大学陸上競技部の種目別歴代記録保持者リスト',
    itemListElement: recordHolders.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: name,
      url: `https://nssu-ekiden.works/track-and-field/records#${encodeURIComponent(name)}`,
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
