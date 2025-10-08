import { MetadataRoute } from 'next';

// Static export用の設定
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nssu-ekiden.com';
  
  // 基本的な静的ページ
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/information', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/information/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/information/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/information/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/information/for-fans', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/information/supporters', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ekiden', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/ekiden/hakone', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/ekiden/izumo', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/ekiden/all-japan', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/ekiden/fujisan', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/ekiden/mixed', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/ekiden/womens-all-japan', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/track-and-field', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/track-and-field/competition', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/track-and-field/members', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/track-and-field/news', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/track-and-field/records', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/track-and-field/records/data/men', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/track-and-field/records/data/women', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/track-and-field/schedule', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/track-and-field/supporters', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/members', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/records', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/topics', priority: 0.8, changeFrequency: 'daily' as const },
    { url: '/topics/news', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/topics/results', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/topics/schedule', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/board', priority: 0.6, changeFrequency: 'daily' as const },
    { url: '/competition', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/web', priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  // 記録ページ（男子） - 統合ページに変更したため個別ページは削除
  const menRecordEvents: string[] = [];

  // 記録ページ（女子） - 統合ページに変更したため個別ページは削除
  const womenRecordEvents: string[] = [];

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
      url: `${baseUrl}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
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

  // 限定コンテンツページを追加（クロール対象外）
  // これらは robots.txt で Disallow に設定するため、サイトマップからは除外

  // 2025年ニュース記事を追加
  const newsPages = [
    '03-15-new-system',
    '03-30-gifts-feb-mar',
    '04-04-new-members',
    '05-19-alljapan-members',
    '05-25-gifts-apr-may',
    '07-23-arinamin-sponsor',
    '07-25-summer-camp',
    '07-29-june-july',
    '08-04-nojiriko-camp',
    '08-19-sugadaira-camp',
    '08-31-fujimi-camp',
    '09-07-sugadaira-camp',
    '09-20-summer-camp-end',
    '09-20-august-september',
    '10-06-hakone-qualifying-event-roster-announcement',
    '10-18-all-japan-entry',
  ];

  // 2025年試合結果記事を追加
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
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  resultPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}/topics/results/${currentYear}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}