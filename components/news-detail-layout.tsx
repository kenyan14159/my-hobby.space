import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, LucideIcon } from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { PrevNextNav } from '@/components/ui/prev-next-nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NewsDetailLayoutProps {
  /** ニュースのタイトル */
  title: string;
  /** 公開日 (YYYY年MM月DD日 など自由形式) */
  date?: string;
  /** 背景グラデーション (Tailwind の from- / to- クラスを想定) */
  gradient?: string;
  /** ニュース本文とその他のコンテンツ */
  children: React.ReactNode;
}

interface NewsSectionProps {
  /** セクションタイトル */
  title: string;
  /** アイコン */
  icon?: LucideIcon;
  /** セクション内容 */
  children: React.ReactNode;
  /** アニメーションの遅延時間 */
  delay?: number;
  /** 背景色のテーマ */
  theme?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'gray';
}

interface NewsHighlightProps {
  /** ハイライトの内容 */
  children: React.ReactNode;
  /** 背景色のテーマ */
  theme?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'gray';
  /** アニメーションの遅延時間 */
  delay?: number;
}

interface NewsListProps {
  /** リストアイテムの配列 */
  items: Array<{
    title: string;
    subtitle?: string;
    description?: string;
    badge?: string;
  }>;
  /** 列数（グリッドレイアウト用） */
  columns?: 1 | 2 | 3;
  /** アニメーションの遅延時間 */
  delay?: number;
}

/**
 * ニュース記事内のセクション用コンポーネント
 */
export function NewsSection({ 
  title, 
  icon: Icon, 
  children, 
  delay = 0,
  theme = 'blue' 
}: NewsSectionProps) {
  const themeClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600', 
    purple: 'text-purple-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    gray: 'text-gray-600'
  };

  return (
    <motion.section
      className="my-10 sm:my-14"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-3">
        {Icon && <Icon className={`w-6 h-6 ${themeClasses[theme]}`} />}
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

/**
 * ニュース記事内のハイライト表示用コンポーネント
 */
export function NewsHighlight({ 
  children, 
  theme = 'blue',
  delay = 0 
}: NewsHighlightProps) {
  const themeClasses = {
    blue: 'from-blue-50 to-indigo-50 border-blue-200',
    green: 'from-green-50 to-emerald-50 border-green-200',
    purple: 'from-purple-50 to-violet-50 border-purple-200',
    red: 'from-red-50 to-pink-50 border-red-200',
    yellow: 'from-yellow-50 to-amber-50 border-yellow-200',
    gray: 'from-gray-50 to-slate-50 border-gray-200'
  };

  return (
    <motion.div
      className={`p-6 bg-gradient-to-br ${themeClasses[theme]} rounded-xl border my-8 sm:my-10`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ニュース記事内のリスト表示用コンポーネント
 */
export function NewsList({ 
  items, 
  columns = 2,
  delay = 0 
}: NewsListProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-4`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.1 }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
              {item.subtitle && (
                <p className="text-sm text-gray-600 mb-2">{item.subtitle}</p>
              )}
              {item.description && (
                <p className="text-gray-700">{item.description}</p>
              )}
              {item.badge && (
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * ニュース詳細ページ共通レイアウト。
 * ヘッダ (タイトル・日付) と背景グラデーション、戻るボタン、
 * アニメーション付きのコンテナをまとめて提供する。
 */
export function NewsDetailLayout({ 
  title, 
  date, 
  gradient = 'from-gray-50 to-gray-100',
  children
}: NewsDetailLayoutProps) {
  const pathname = usePathname();
  const pageUrl = `https://nssu-ekiden.works${pathname || ''}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'トピックス', href: '/topics' },
    { label: 'ニュース', href: '/topics/news' },
    { label: title },
  ];
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    datePublished: date || undefined,
    dateModified: date || undefined,
    mainEntityOfPage: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: '日本体育大学陸上競技部男子駅伝ブロック',
      url: 'https://nssu-ekiden.works',
    },
  } as const;
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トピックス', item: 'https://nssu-ekiden.works/topics' },
      { '@type': 'ListItem', position: 2, name: 'ニュース', item: 'https://nssu-ekiden.works/topics/news' },
      { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
    ],
  } as const;
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} py-16`}>
      <motion.div
        className="container mx-auto px-4 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 構造化データ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
        {/* パンくず */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        {/* ヘッダー（モバイルでも表示） */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">{title}</h1>
          
          {date && (
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <Calendar size={18} />
              <span>{date}</span>
            </div>
          )}
        </motion.div>

        {/* ニュース本文 */}
        <motion.article
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {children}
        </motion.article>

        {/* 戻るボタン */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/topics/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            <ArrowLeft size={18} />
            ニュース一覧へ戻る
          </Link>
        </motion.div>

        {/* 前後ナビゲーション（モバイル非表示） */}
        <div className="mt-6 hidden sm:block">
          <PrevNextNav type="news" />
        </div>
      </motion.div>
    </div>
  );
} 