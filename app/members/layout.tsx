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
  title: 'メンバー紹介 | 日本体育大学駅伝部',
  description: `日本体育大学駅伝部の選手紹介。${memberNames.slice(0, 10).join('、')}ほか全メンバーの学年別一覧、自己ベスト記録、出身校を掲載。`,
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
    '選手一覧',
    '自己ベスト',
    '箱根駅伝',
    ...memberNames // 全選手名をキーワードに追加
  ],
  openGraph: {
    title: 'メンバー紹介 | 日本体育大学駅伝部',
    description: '日体大駅伝部の選手紹介。学年別メンバー一覧、自己ベスト記録を掲載。',
    url: 'https://nssu-ekiden.com/members',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/members',
  },
};

export default function MemberLayout({
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
        name: '部員紹介',
        item: 'https://nssu-ekiden.com/members',
      },
    ],
  };

  // SportsTeam構造化データ
  const sportsTeamSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: '日本体育大学陸上競技部男子駅伝ブロック',
    sport: '駅伝',
    url: 'https://nssu-ekiden.com/members',
    memberOf: {
      '@type': 'Organization',
      name: '日本体育大学',
    },
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