import { Metadata } from 'next';
import grade1Data from '@/data/members/grade1.json';
import grade2Data from '@/data/members/grade2.json';
import grade3Data from '@/data/members/grade3.json';
import grade4Data from '@/data/members/grade4.json';
import staffData from '@/data/members/staff.json';

// 全メンバーの名前を取得
const getAllMemberNames = () => {
  const allMembers: string[] = [];
  
  // 各学年のメンバー名を取得
  [grade1Data, grade2Data, grade3Data, grade4Data].forEach((data: any) => {
    Object.values(data).forEach((gradeMembers: any) => {
      if (Array.isArray(gradeMembers)) {
        gradeMembers.forEach((member: any) => {
          if (member.name) {
            allMembers.push(member.name);
          }
        });
      }
    });
  });
  
  // スタッフの名前を取得
  const staffDataObj = staffData as any;
  Object.values(staffDataObj).forEach((staffCategory: any) => {
    if (Array.isArray(staffCategory)) {
      staffCategory.forEach((staff: any) => {
        if (staff.name) {
          allMembers.push(staff.name);
        }
      });
    }
  });
  
  return allMembers;
};

const memberNames = getAllMemberNames();

export const metadata: Metadata = {
  title: 'メンバー・ブロック紹介 | 日本体育大学陸上競技部',
  description: `日本体育大学陸上競技部のメンバー・ブロック紹介。短距離、中距離、駅伝、跳躍、投擲、混成、パラ、トレーナー、本部スタッフなど各ブロックの選手情報。${memberNames.slice(0, 15).join('、')}ほか全メンバーの自己ベスト記録、出身校を掲載。`,
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
    ...memberNames // 全選手名をキーワードに追加
  ],
  openGraph: {
    title: 'メンバー・ブロック紹介 | 日本体育大学陸上競技部',
    description: `日体大陸上競技部の各ブロックメンバー紹介。短距離、中距離、駅伝、跳躍、投擲、混成、パラ、トレーナー、スタッフの選手情報を掲載。${memberNames.slice(0, 10).join('、')}ほか全メンバーの自己ベスト記録を公開。`,
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
      {children}
    </>
  );
}
