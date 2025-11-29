// 拡張構造化データ（JSON-LD）を生成するユーティリティ関数

/**
 * SportsEvent構造化データを生成
 */
export interface SportsEventData {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address?: string;
  };
  competitor?: {
    name: string;
    url?: string;
  };
  image?: string;
  url?: string;
}

export function generateSportsEventSchema(data: SportsEventData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    location: {
      '@type': 'Place',
      name: data.location.name,
      address: data.location.address ? {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        streetAddress: data.location.address,
      } : undefined,
    },
    competitor: data.competitor ? {
      '@type': 'SportsTeam',
      name: data.competitor.name,
      url: data.competitor.url,
    } : undefined,
    image: data.image,
    url: data.url,
  };
}

/**
 * FAQPage構造化データを生成
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Person（選手）構造化データを生成
 */
export interface AthleteData {
  name: string;
  description?: string;
  image?: string;
  birthDate?: string;
  height?: string;
  weight?: string;
  memberOf?: string;
  url?: string;
}

export function generateAthleteSchema(data: AthleteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    description: data.description,
    image: data.image,
    birthDate: data.birthDate,
    height: data.height,
    weight: data.weight,
    memberOf: data.memberOf ? {
      '@type': 'SportsTeam',
      name: data.memberOf,
    } : undefined,
    url: data.url,
  };
}

/**
 * WebSite構造化データを生成（サイト検索対応）
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '日本体育大学駅伝部',
    alternateName: ['日体大駅伝部', 'NSSU駅伝部'],
    url: 'https://nssu-ekiden.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nssu-ekiden.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 箱根駅伝イベント構造化データ
 */
export function generateHakoneEkidenSchema(year: number = 2026) {
  const edition = 102 + (year - 2026); // 2026年が102回
  return generateSportsEventSchema({
    name: `第${edition}回東京箱根間往復大学駅伝競走`,
    description: `${year}年1月2日・3日開催の箱根駅伝。日本体育大学駅伝部が出場。`,
    startDate: `${year}-01-02T08:00:00+09:00`,
    endDate: `${year}-01-03T14:00:00+09:00`,
    location: {
      name: '東京大手町〜箱根芦ノ湖',
      address: '東京都千代田区大手町',
    },
    competitor: {
      name: '日本体育大学駅伝部',
      url: 'https://nssu-ekiden.com',
    },
    image: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssuimageog.jpeg',
    url: 'https://nssu-ekiden.com/ekiden/hakone',
  });
}

/**
 * 全日本大学駅伝イベント構造化データ
 */
export function generateAllJapanEkidenSchema(year: number = 2025) {
  const edition = 56 + (year - 2024); // 2024年が56回
  return generateSportsEventSchema({
    name: `第${edition}回全日本大学駅伝対校選手権大会`,
    description: `${year}年11月開催の全日本大学駅伝。熱田神宮〜伊勢神宮間で開催。`,
    startDate: `${year}-11-03T08:05:00+09:00`,
    location: {
      name: '熱田神宮〜伊勢神宮',
      address: '愛知県名古屋市熱田区',
    },
    competitor: {
      name: '日本体育大学駅伝部',
      url: 'https://nssu-ekiden.com',
    },
    url: 'https://nssu-ekiden.com/ekiden/all-japan',
  });
}

/**
 * 出雲駅伝イベント構造化データ
 */
export function generateIzumoEkidenSchema(year: number = 2025) {
  const edition = 36 + (year - 2024); // 2024年が36回
  return generateSportsEventSchema({
    name: `第${edition}回出雲全日本大学選抜駅伝競走`,
    description: `${year}年10月開催の出雲駅伝。出雲大社正面鳥居前〜出雲ドーム前間で開催。`,
    startDate: `${year}-10-14T13:05:00+09:00`,
    location: {
      name: '出雲大社正面鳥居前〜出雲ドーム前',
      address: '島根県出雲市',
    },
    competitor: {
      name: '日本体育大学駅伝部',
      url: 'https://nssu-ekiden.com',
    },
    url: 'https://nssu-ekiden.com/ekiden/izumo',
  });
}
