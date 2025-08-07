export interface ResultMeta {
  id: number;
  slug: string;
  title: string;
  date: string | Date;
  image: string;
  type: 'tsx';
}

const TSX_RESULTS: Record<string, Omit<ResultMeta, 'slug' | 'type'>> = {
  '02-02-osawa-ekiden': {
    id: 1,
    title: '第75回大澤駅伝競走大会',
    date: '2025-02-02',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/race5.jpg'
  },
  '02-02-kagawa-marugame-half': {
    id: 2,
    title: '第77回香川丸亀国際ハーフマラソン',
    date: '2025-02-02',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/race4.jpg'
  },
  '02-09-kanagawa-ekiden': {
    id: 3,
    title: '第79回市町村対抗かながわ駅伝競走大会',
    date: '2025-02-09',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/race6.jpg'
  },
  '02-16-national-university-mixed-ekiden': {
    id: 4,
    title: '第5回 全国大学対校男女混合駅伝競走大会',
    date: '2025-02-16',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/race3.jpg'
  },
  '03-08-sagamihara-cross-country': {
    id: 5,
    title: '相模原クロスカントリー大会',
    date: '2025-03-08',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/race1.jpg'
  },
  '03-09-tachikawa-city-half': {
    id: 6,
    title: '立川シティハーフマラソン',
    date: '2025-03-09',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/race2.jpg'
  },
  '03-16-niigata-half': {
    id: 7,
    title: '新潟ハーフマラソン',
    date: '2025-03-16',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite295.jpg'
  },
  '03-29-30-nssu-319th-long-distance': {
    id: 8,
    title: '第319回 日本体育大学長距離競技会',
    date: '2025-03-29',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/03/319nittai104.jpeg'
  },
  '04-05-four-universities-track': {
    id: 9,
    title: '第61回四大学対校陸上競技大会',
    date: '2025-04-05',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/04/2025-yondai65.jpeg'
  },
  '04-13-adizero-5k': {
    id: 10,
    title: 'ADIZERO 5K OFFICIAL RACE アディゼロ 5Kオフィシャルレース',
    date: '2025-04-13',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/2023adidasroad3.jpeg'
  },
  '04-19-hosei-university': {
    id: 11,
    title: '第86回 法政大学競技会',
    date: '2025-04-19',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/78hosei157.jpg'
  },
  '04-20-kokushikan-university': {
    id: 12,
    title: '第1回 国士舘大学学内競技会',
    date: '2025-04-20',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/04/86hosei4.jpg'
  },
  '04-25-japan-student-individual': {
    id: 13,
    title: '2025日本学生陸上競技個人選手権大会',
    date: '2025-04-25',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/04/kojin.jpg'
  },
  '04-26-27-nssu-320th-long-distance': {
    id: 14,
    title: '第320回日本体育大学長距離競技会・第14回NCG',
    date: '2025-04-26',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/04/320favorite23.jpeg'
  },
  '05-08-11-kanto-student-track': {
    id: 15,
    title: '第104回 関東学生陸上競技対校選手権大会',
    date: '2025-05-08',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/05/2025kantoIC108.jpeg'
  },
  '05-24-all-japan-university-ekiden-qualifier': {
    id: 16,
    title: '秩父宮賜杯第57回全日本大学駅伝対校選手権大会関東学生陸上競技連盟推薦校選考会',
    date: '2025-05-24',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-zennihonyosen-main1.jpeg'
  },
  '05-31-nssu-long-distance': {
    id: 17,
    title: '第321回日本体育大学長距離競技会兼第15回NCG',
    date: '2025-05-31',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/06/321nittai260.jpeg'
  },
  '06-09-japan-student': {
    id: 18,
    title: '第94回日本学生陸上競技対校選手権大会',
    date: '2025-06-09',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/06/2025-japan-ic1.jpg'
  },
  '06-21-nssu-track': {
    id: 19,
    title: '第151回日本体育大学陸上競技会',
    date: '2025-06-21',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/06/151nittai-favorite4.jpeg'
  },
  '06-28-oga-ekiden': {
    id: 20,
    title: '第72回（2025年）全国男鹿駅伝競走大会',
    date: '2025-06-28',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite296.jpg'
  },
  '07-20-hokuren-gakuren': {
    id: 21,
    title: 'ホクレンディスタンスチャレンジ  関東学生網走夏季記録挑戦競技会 2025 ',
    date: '2025-07-20',
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/07/gakuren-scaled.jpg'
  }
};

export function getAllResults(): ResultMeta[] {
  const allResults: ResultMeta[] = [];
  
  // すべてのTSX記事を登録（ファイルシステムチェックなし）
  Object.entries(TSX_RESULTS).forEach(([slug, meta]) => {
    allResults.push({
      ...meta,
      slug: `2025/${slug}`, // 2025フォルダを含むパスに更新
      type: 'tsx' as const,
    });
  });
  
  // 日付順でソート（新しい順）
  return allResults.sort((a, b) => b.id - a.id);
}

// 新しいTSX記事を登録する関数
export function registerTSXResult(slug: string, meta: Omit<ResultMeta, 'slug' | 'type'>) {
  TSX_RESULTS[slug] = meta;
} 