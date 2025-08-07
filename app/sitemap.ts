import { MetadataRoute } from 'next';

// Static export用の設定
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nssu-ekiden.com';
  
  // 基本的な静的ページ
  const staticPages = [
    '',
    '/information',
    '/information/about',
    '/information/contact',
    '/information/for-fans',
    '/information/supporters',
    '/ekiden',
    '/ekiden/hakone',
    '/ekiden/izumo',
    '/ekiden/all-japan',
    '/ekiden/fujisan',
    '/ekiden/mixed',
    '/ekiden/womens-all-japan',
    '/track-and-field',
    '/track-and-field/competition',
    '/track-and-field/members',
    '/track-and-field/news',
    '/track-and-field/records',
    '/track-and-field/schedule',
    '/track-and-field/supporters',
    '/members',
    '/records',
    '/topics',
    '/topics/news',
    '/topics/results',
    '/topics/schedule',
    '/board',
    '/competition',
    '/web',
  ];

  // 記録ページ（男子）
  const menRecordEvents = [
    '100m', '200m', '400m', '800m', '1500m', '5000m', '10000m', '3000msc',
    '110mh', '400mh', 'high-jump', 'pole-vault', 'long-jump', 'triple-jump',
    'shot-put', 'discus', 'hammer-throw', 'javelin-throw', 'decathlon',
    'relay', 'half-marathon', 'marathon', '10000mwalk', '20kmwalk'
  ];

  // 記録ページ（女子）
  const womenRecordEvents = [
    '100m', '200m', '400m', '800m', '1500m', '5000m', '10000m', '3000msc',
    '100mh', '400mh', 'high-jump', 'pole-vault', 'long-jump', 'triple-jump',
    'shot-put', 'discus', 'half-marathon', 'marathon', '10000mwalk', '20kmwalk',
    'relay'
  ];

  // メンバーページ
  const memberCategories = [
    'ekiden-men', 'ekiden-women', 'sprint-men', 'sprint-women',
    'middle-men', 'middle-women', 'jump-men', 'jump-women',
    'throw-men', 'throw-women', 'combined-men', 'combined-women',
    'trainer-men', 'trainer-women', 'staff', 'para'
  ];

  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toISOString();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 静的ページを追加
  staticPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    });
  });

  // 男子記録ページを追加
  menRecordEvents.forEach(event => {
    sitemapEntries.push({
      url: `${baseUrl}/track-and-field/records/men/${event}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // 女子記録ページを追加
  womenRecordEvents.forEach(event => {
    sitemapEntries.push({
      url: `${baseUrl}/track-and-field/records/women/${event}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // メンバーページを追加
  memberCategories.forEach(category => {
    sitemapEntries.push({
      url: `${baseUrl}/track-and-field/members/${category}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // 限定コンテンツページを追加
  const limitedContentPages = [
    '/limited-content',
    '/limited-content/content',
    '/limited-content/album',
    '/limited-content/records/1500m',
    '/limited-content/records/5000m',
    '/limited-content/records/10000m',
    '/limited-content/records/3000msc',
    '/limited-content/records/half-marathon',
    '/limited-content/analysis/hakone',
  ];

  limitedContentPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  });

  // ニュース・結果ページを追加（2025年のみ動的に生成）
  const newsPages = [
    '03-15-new-system',
    '03-30-gifts-feb-mar',
    '04-04-new-members',
    '05-19-alljapan-members',
    '05-25-gifts-apr-may',
    '07-23-arinamin-sponsor',
    '07-25-summer-camp',
    '07-29-june-july',
  ];

  const resultPages = [
    '02-02-kagawa-marugame-half',
    '02-02-osawa-ekiden',
    '02-09-kanagawa-ekiden',
    '02-16-national-university-mixed-ekiden',
    '03-08-sagamihara-cross-country',
    '03-09-tachikawa-city-half',
    '03-16-niigata-half',
    '03-29-30-nssu-319th-long-distance',
    '04-05-four-universities-track',
    '04-13-adizero-5k',
    '04-19-hosei-university',
    '04-20-kokushikan-university',
    '04-25-japan-student-individual',
    '04-26-27-nssu-320th-long-distance',
    '05-08-11-kanto-student-track',
    '05-24-all-japan-university-ekiden-qualifier',
    '05-31-nssu-long-distance',
    '06-09-japan-student',
    '06-21-nssu-track',
    '06-28-oga-ekiden',
    '07-20-hokuren-gakuren',
  ];

  newsPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}/topics/news/${currentYear}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  });

  resultPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}/topics/results/${currentYear}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  });

  return sitemapEntries;
}