import { Metadata } from 'next';
import grade1Data from '@/data/members/grade1.json';
import grade2Data from '@/data/members/grade2.json';
import grade3Data from '@/data/members/grade3.json';
import grade4Data from '@/data/members/grade4.json';
import staffData from '@/data/members/staff.json';

// メンバー情報の型定義
interface Member {
  name: string;
  highSchool?: string;
  imageUrl?: string;
  grade?: number;
  faculty?: string;
  department?: string;
}

interface Staff {
  name: string;
  role?: string;
  imageUrl?: string;
  highSchool?: string;
}

// 全メンバーのデータを取得
const getAllMembers = (): Member[] => {
  const allMembers: Member[] = [];
  
  // 各学年のメンバーデータを取得
  [grade1Data, grade2Data, grade3Data, grade4Data].forEach((data: any) => {
    Object.values(data).forEach((gradeMembers: any) => {
      if (Array.isArray(gradeMembers)) {
        gradeMembers.forEach((member: any) => {
          if (member.name) {
            allMembers.push({
              name: member.name,
              highSchool: member.highSchool,
              imageUrl: member.imageUrl,
              grade: member.grade,
              faculty: member.faculty,
              department: member.department,
            });
          }
        });
      }
    });
  });
  
  return allMembers;
};

// 全スタッフのデータを取得
const getAllStaff = (): Staff[] => {
  const allStaff: Staff[] = [];
  const staffDataObj = staffData as any;
  
  Object.values(staffDataObj).forEach((staffCategory: any) => {
    if (Array.isArray(staffCategory)) {
      staffCategory.forEach((staff: any) => {
        if (staff.name) {
          allStaff.push({
            name: staff.name,
            role: staff.role,
            imageUrl: staff.imageUrl,
            highSchool: staff.highSchool,
          });
        }
      });
    }
  });
  
  return allStaff;
};

// 全メンバーの名前を取得
const getAllMemberNames = (): string[] => {
  const members = getAllMembers();
  const staff = getAllStaff();
  return [...members.map(m => m.name), ...staff.map(s => s.name)];
};

const allMembers = getAllMembers();
const allStaff = getAllStaff();
const memberNames = getAllMemberNames();

// 選手名を含む詳細な説明文を生成（最大30名まで）
const generateDescription = (): string => {
  const displayNames = memberNames.slice(0, 30);
  const remainingCount = memberNames.length - displayNames.length;
  let description = `日本体育大学駅伝部の選手紹介ページ。${displayNames.join('、')}`;
  if (remainingCount > 0) {
    description += `ほか${remainingCount}名を含む全${memberNames.length}名のメンバー`;
  }
  description += 'の学年別一覧、自己ベスト記録、出身校を掲載。選手名で検索してプロフィールを確認できます。';
  return description;
};

export const metadata: Metadata = {
  title: 'メンバー紹介 | 日本体育大学駅伝部',
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
    '選手一覧',
    '自己ベスト',
    '箱根駅伝',
    ...memberNames, // 全選手名をキーワードに追加
    // 選手名と「日体大」の組み合わせも追加
    ...memberNames.map(name => `${name} 日体大`),
    ...memberNames.map(name => `${name} 日本体育大学`),
    ...memberNames.map(name => `日体大 ${name}`),
  ],
  openGraph: {
    title: 'メンバー紹介 | 日本体育大学駅伝部',
    description: generateDescription(),
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

  // 各選手のPerson構造化データを生成
  const personSchemas = allMembers
    .filter(member => member.name) // 名前があるもののみ
    .map((member) => {
      const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: member.name,
        affiliation: {
          '@type': 'Organization',
          name: '日本体育大学陸上競技部男子駅伝ブロック',
        },
        url: `https://nssu-ekiden.com/members#${encodeURIComponent(member.name)}`,
        description: `日本体育大学駅伝部${member.grade ? `${member.grade}年生。` : ''}${member.highSchool ? `${member.highSchool}出身。` : ''}${member.faculty && member.department ? `${member.faculty}学部${member.department}学科。` : ''}`,
      };
      
      if (member.highSchool) {
        schema.alumniOf = {
          '@type': 'EducationalOrganization',
          name: member.highSchool,
        };
      }
      
      if (member.imageUrl) {
        schema.image = member.imageUrl;
      }
      
      return schema;
    });

  // スタッフのPerson構造化データを生成
  const staffPersonSchemas = allStaff
    .filter(staff => staff.name) // 名前があるもののみ
    .map((staff) => {
      const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: staff.name,
        affiliation: {
          '@type': 'Organization',
          name: '日本体育大学陸上競技部男子駅伝ブロック',
        },
        url: `https://nssu-ekiden.com/members#${encodeURIComponent(staff.name)}`,
        description: `日本体育大学駅伝部${staff.role || 'スタッフ'}。${staff.highSchool ? `${staff.highSchool}出身。` : ''}`,
      };
      
      if (staff.role) {
        schema.jobTitle = staff.role;
      }
      
      if (staff.highSchool) {
        schema.alumniOf = {
          '@type': 'EducationalOrganization',
          name: staff.highSchool,
        };
      }
      
      if (staff.imageUrl) {
        schema.image = staff.imageUrl;
      }
      
      return schema;
    });

  // ItemList構造化データ（全選手をリスト化）
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '日本体育大学駅伝部メンバー一覧',
    description: '日本体育大学駅伝部の全メンバーリスト',
    itemListElement: memberNames.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: name,
      url: `https://nssu-ekiden.com/members#${encodeURIComponent(name)}`,
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
      {/* 各選手のPerson構造化データ */}
      {personSchemas.map((schema, index) => (
        <script
          key={`person-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* 各スタッフのPerson構造化データ */}
      {staffPersonSchemas.map((schema, index) => (
        <script
          key={`staff-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}