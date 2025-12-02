import { MetadataRoute } from 'next';
import { getAllNews } from '@/lib/news';
import { getAllResults } from '@/lib/results';

// Static export用の設定
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nssu-ekiden.works';
  const currentDate = new Date().toISOString();
  
  // 基本的な静的ページ
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/information', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/information/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/information/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/information/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/information/for-fans', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/information/supporters', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/messages', priority: 0.8, changeFrequency: 'daily' as const },
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
    { url: '/track-and-field/recruitment', priority: 0.8, changeFrequency: 'monthly' as const },
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

  // ニュース記事を動的に追加（実際の日付を使用）
  const allNews = getAllNews();
  allNews.forEach(news => {
    const dateStr = typeof news.date === 'string' ? news.date : news.date.toISOString().split('T')[0];
    const lastModified = new Date(dateStr).toISOString();
    
    sitemapEntries.push({
      url: `${baseUrl}/topics/news/${news.slug}`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // リザルト記事を動的に追加（実際の日付を使用）
  const allResults = getAllResults();
  allResults.forEach(result => {
    const dateStr = typeof result.date === 'string' ? result.date : result.date.toISOString().split('T')[0];
    const lastModified = new Date(dateStr).toISOString();
    
    sitemapEntries.push({
      url: `${baseUrl}/topics/results/${result.slug}`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}