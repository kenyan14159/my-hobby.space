export interface NewsMeta {
  id: number;
  slug: string;
  title: string;
  date: string | Date;
  image: string;
  type: 'tsx';
}

// TSXページのメタデータ（手動定義）
const TSX_ARTICLES: Record<string, Omit<NewsMeta, 'slug' | 'type'>> = {
  '03-15-new-system': {
    id: 1,
    title: '2025年度の目標と新体制発表',
    date: '2025-03-15',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/news.jpg'
  },
  '03-30-gifts-feb-mar': {
    id: 2,
    title: '2,3月の差し入れ',
    date: '2025-03-30',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/February-and-March-gifts11.jpg'
  },
  '04-04-new-members': {
    id: 3,
    title: '22名の新入生が入学しました!',
    date: '2025-04-04',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/04/school-entrance-ceremony.jpg'
  },
  '05-19-alljapan-members': {
    id: 4,
    title: '第57回 全日本大学駅伝予選会 メンバー発表!',
    date: '2025-05-19',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/2024zennihon2.jpg'
  },
  '05-25-gifts-apr-may': {
    id: 5,
    title: '4、5月の差し入れ',
    date: '2025-05-25',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/05/Gifts-April-and-May7.jpg'
  },
  '07-23-arinamin-sponsor': {
    id: 6,
    title: 'アリナミン製薬株式会社とのスポンサー契約締結のお知らせ',
    date: '2025-07-23',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/07/arinamin00002.png'
  },
  '07-25-summer-camp': {
    id: 7,
    title: '夏合宿がスタートしました！',
    date: '2025-07-25',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite169.jpeg'
  },
  '07-29-june-july': {
    id: 8,
    title: '6,7月の差し入れ',
    date: '2025-07-29',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00024.jpg'
  },
  '08-04-nojiriko-camp': {
    id: 9,
    title: '野尻湖全体合宿がスタートしました！',
    date: '2025-08-04',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-kurohime-camp00001-scaled.jpg'
  },
  '08-19-sugadaira-camp': {
    id: 10,
    title: '菅平高原選抜合宿がスタートしました！',
    date: '2025-08-19',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-sugadaira-camp-favorite1-scaled.jpeg'
  },
  '08-31-fujimi-camp': {
    id: 11,
    title: '富士見全体合宿がスタートしました！',
    date: '2025-08-31',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-fujimi-camp00001.jpg'
  },
  '09-07-sugadaira-camp': {
    id: 13,
    title: '菅平選抜合宿がスタートしました！',
    date: '2025-09-07',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-sugadaria2-camp-scaled.jpg'
  },
  '09-20-summer-camp-end': {
    id: 14,
    title: '夏合宿が終了しました!',
    date: '2025-09-20',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp8.jpg'
  },
  '09-20-august-september': {
    id: 15,
    title: '8,9月の差し入れ',
    date: '2025-09-20',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september13.jpg'
  },
  '10-06-hakone-qualifying-event-roster-announcement': {
    id: 17,
    title: '箱根駅伝予選会メンバー発表',
    date: '2025-10-06',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-fujimi-whole-camp151.jpg'
  },
  '10-18-all-japan-entry': {
    id: 18,
    title: '全日本大学駅伝エントリー決定！',
    date: '2025-10-18',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/2024zennihonekiden178.jpeg'
  },
};

export function getAllNews(): NewsMeta[] {
  const allNews: NewsMeta[] = [];
  
  // すべてのTSX記事を登録（ファイルシステムチェックなし）
  Object.entries(TSX_ARTICLES).forEach(([slug, meta]) => {
    allNews.push({
      ...meta,
      slug: `2025/${slug}`, // 2025フォルダを含むパスに更新
      type: 'tsx' as const,
    });
  });
  
  // 日付順でソート（新しい順）
  return allNews.sort((a, b) => b.id - a.id);
}

// 新しいTSX記事を登録する関数
export function registerTSXArticle(slug: string, meta: Omit<NewsMeta, 'slug' | 'type'>) {
  TSX_ARTICLES[slug] = meta;
} 