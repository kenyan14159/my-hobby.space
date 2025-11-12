import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

// メンバー情報の型定義
interface TrackFieldMember {
  name: string;
  school?: string;
  from?: string;
  role?: string;
  event?: string;
  pb?: string;
  '画像URL'?: string;
}

interface MembersData {
  [grade: string]: TrackFieldMember[];
}

// 全カテゴリのメンバーデータを取得
const getAllTrackFieldMembers = (): TrackFieldMember[] => {
  const allMembers: TrackFieldMember[] = [];
  const categories = [
    'sprint-men',
    'sprint-women',
    'middle-men',
    'middle-women',
    'ekiden-men',
    'ekiden-women',
    'jump-men',
    'jump-women',
    'throw-men',
    'throw-women',
    'combined-men',
    'combined-women',
    'para',
    'trainer-men',
    'trainer-women',
    'staff',
  ];

  categories.forEach((category) => {
    try {
      const filePath = path.join(process.cwd(), 'public', 'data', 'track-field-members', `${category}.json`);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data: MembersData = JSON.parse(fileContent);
        
        Object.values(data).forEach((gradeMembers) => {
          if (Array.isArray(gradeMembers)) {
            gradeMembers.forEach((member) => {
              if (member.name) {
                allMembers.push({
                  name: member.name,
                  school: member.school,
                  from: member.from,
                  role: member.role,
                  event: member.event,
                  pb: member.pb,
                  '画像URL': member['画像URL'],
                });
              }
            });
          }
        });
      }
    } catch (err) {
      // ファイルが存在しない場合はスキップ
      console.warn(`Failed to load ${category}.json:`, err);
    }
  });

  return allMembers;
};

// 全メンバーの名前を取得
const getAllMemberNames = (): string[] => {
  const members = getAllTrackFieldMembers();
  return members.map(m => m.name).filter((name, index, self) => self.indexOf(name) === index); // 重複を除去
};

const allMembers = getAllTrackFieldMembers();
const memberNames = getAllMemberNames();

// 選手名を含む詳細な説明文を生成（最大30名まで）
const generateDescription = (): string => {
  const displayNames = memberNames.slice(0, 30);
  const remainingCount = memberNames.length - displayNames.length;
  let description = `日本体育大学陸上競技部のメンバー・ブロック紹介ページ。短距離、中距離、駅伝、跳躍、投擲、混成、パラ、トレーナー、本部スタッフなど各ブロックの選手情報。${displayNames.join('、')}`;
  if (remainingCount > 0) {
    description += `ほか${remainingCount}名を含む全${memberNames.length}名のメンバー`;
  }
  description += 'の自己ベスト記録、出身校を掲載。選手名で検索してプロフィールを確認できます。';
  return description;
};

export const metadata: Metadata = {
  title: 'メンバー・ブロック紹介 | 日本体育大学陸上競技部',
  description: generateDescription(),
  keywords: [
    'NSSU',
    '日本体育大学',
    '日体大',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    'メンバー紹介',
    'ブロック紹介',
    '選手一覧',
    '自己ベスト',
    'トラック競技',
    'フィールド競技',
    '短距離男子',
    '短距離女子',
    '中距離男子',
    '中距離女子',
    '駅伝男子',
    '駅伝女子',
    '跳躍男子',
    '跳躍女子',
    '投擲男子',
    '投擲女子',
    '混成男子',
    '混成女子',
    'パラ',
    'トレーナー男子',
    'トレーナー女子',
    '本部スタッフ',
    '陸上競技部 短距離',
    '陸上競技部 中距離',
    '陸上競技部 駅伝',
    '陸上競技部 跳躍',
    '陸上競技部 投擲',
    '陸上競技部 混成',
    '陸上部 短距離',
    '陸上部 中距離',
    '陸上部 駅伝',
    '陸上部 跳躍',
    '陸上部 投擲',
    '陸上部 混成',
    '箱根駅伝',
    '全日本大学駅伝',
    '出雲駅伝',
    ...memberNames, // 全選手名をキーワードに追加
    // 選手名と「日体大」の組み合わせも追加
    ...memberNames.map(name => `${name} 日体大`),
    ...memberNames.map(name => `${name} 日本体育大学`),
    ...memberNames.map(name => `日体大 ${name}`),
    ...memberNames.map(name => `${name} 陸上競技部`),
  ],
  openGraph: {
    title: 'メンバー・ブロック紹介 | 日本体育大学陸上競技部',
    description: generateDescription(),
    url: 'https://nssu-ekiden.com/track-and-field/members',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/track-and-field/members',
  },
};

export default function TrackMembersLayout({
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
        name: '陸上競技部',
        item: 'https://nssu-ekiden.com/track-and-field',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'メンバー・ブロック紹介',
        item: 'https://nssu-ekiden.com/track-and-field/members',
      },
    ],
  };

  // SportsTeam構造化データ
  const sportsTeamSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: '日本体育大学陸上競技部',
    sport: '陸上競技',
    url: 'https://nssu-ekiden.com/track-and-field/members',
    memberOf: {
      '@type': 'Organization',
      name: '日本体育大学',
    },
    description: '日本体育大学陸上競技部の各ブロック(短距離、中距離、駅伝、跳躍、投擲、混成、パラ、トレーナー、スタッフ)のメンバー紹介',
  };

  // 各メンバーのPerson構造化データを生成
  const personSchemas = allMembers
    .filter(member => member.name) // 名前があるもののみ
    .map((member) => {
      const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: member.name,
        affiliation: {
          '@type': 'Organization',
          name: '日本体育大学陸上競技部',
        },
        url: `https://nssu-ekiden.com/track-and-field/members#${encodeURIComponent(member.name)}`,
        description: `日本体育大学陸上競技部${member.role ? ` ${member.role}。` : ''}${member.event ? `種目: ${member.event.replace(/<br>/g, '、')}。` : ''}${member.school ? `${member.school}出身。` : ''}${member.from ? `${member.from}。` : ''}`,
      };
      
      if (member.school) {
        schema.alumniOf = {
          '@type': 'EducationalOrganization',
          name: member.school,
        };
      }
      
      if (member['画像URL']) {
        schema.image = member['画像URL'];
      }
      
      if (member.role && member.role !== '-') {
        schema.jobTitle = member.role;
      }
      
      return schema;
    });

  // ItemList構造化データ（全メンバーをリスト化）
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '日本体育大学陸上競技部メンバー一覧',
    description: '日本体育大学陸上競技部の全メンバーリスト',
    itemListElement: memberNames.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: name,
      url: `https://nssu-ekiden.com/track-and-field/members#${encodeURIComponent(name)}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* 各メンバーのPerson構造化データ */}
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
