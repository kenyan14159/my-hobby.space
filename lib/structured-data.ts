// 構造化データ（JSON-LD）を生成するユーティリティ関数

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * BreadcrumbList構造化データを生成
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Article/NewsArticle構造化データを生成
 */
export interface ArticleData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
  url: string;
}

export function generateArticleSchema(data: ArticleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Organization',
      name: data.author || '日本体育大学陸上競技部男子駅伝ブロック',
    },
    publisher: {
      '@type': 'Organization',
      name: '日本体育大学陸上競技部男子駅伝ブロック',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu192.jpg',
      },
    },
    image: data.image || 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssuimageog.jpeg',
    url: data.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };
}

/**
 * Person構造化データを生成
 */
export interface PersonData {
  name: string;
  affiliation: string;
  alumniOf?: string;
  url: string;
  image?: string;
}

export function generatePersonSchema(data: PersonData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    affiliation: {
      '@type': 'Organization',
      name: data.affiliation,
    },
    ...(data.alumniOf && {
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: data.alumniOf,
      },
    }),
    ...(data.image && { image: data.image }),
    url: data.url,
  };
}

/**
 * SportsTeam構造化データを生成
 */
export interface SportsTeamData {
  name: string;
  sport: string;
  url: string;
  memberOf?: string;
}

export function generateSportsTeamSchema(data: SportsTeamData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: data.name,
    sport: data.sport,
    url: data.url,
    ...(data.memberOf && {
      memberOf: {
        '@type': 'Organization',
        name: data.memberOf,
      },
    }),
  };
}

/**
 * SportsEvent構造化データを生成
 */
export interface SportsEventData {
  name: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
  description?: string;
}

export function generateSportsEventSchema(data: SportsEventData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: data.name,
    startDate: data.startDate,
    ...(data.endDate && { endDate: data.endDate }),
    location: {
      '@type': 'Place',
      name: data.location,
    },
    url: data.url,
    ...(data.description && { description: data.description }),
    organizer: {
      '@type': 'Organization',
      name: '日本体育大学陸上競技部男子駅伝ブロック',
    },
  };
}
