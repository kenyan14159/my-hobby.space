'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { AnimatedPageHeader } from '@/components/ui/animated-page-header';
import { TopicsQuickAccess } from '@/components/topics-quick-access';
import { getAllNews, NewsMeta } from '@/lib/news';
import NewsGrid from '@/components/news-grid';
import NewsPageLayout from '@/components/news-page-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/lib/hooks/use-pagination';
import { PaginationControls } from '@/components/ui/pagination-controls';

// 年一覧取得
const getYears = (items: NewsMeta[]) => {
  const yrs = Array.from(new Set(items.map((i) => {
    const dateStr = typeof i.date === 'string' ? i.date : i.date.toISOString();
    return dateStr.slice(0, 4);
  })));
  return yrs.sort((a, b) => b.localeCompare(a));
};

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<'all' | string>('all');
  const newsItems = getAllNews();

  const years = useMemo(() => getYears(newsItems), [newsItems]);

  // 検索とフィルタリング
  const filteredNews = useMemo(() => {
    let filtered = newsItems;

    // 年別フィルター
    if (yearFilter !== 'all') {
      filtered = filtered.filter((item) => {
        const dateStr = typeof item.date === 'string' ? item.date : item.date.toISOString();
        return dateStr.startsWith(yearFilter);
      });
    }

    // 検索フィルター
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.id - a.id);
  }, [newsItems, searchQuery, yearFilter]);

  // ページネーション
  const pagination = usePagination({
    items: filteredNews,
    itemsPerPage: 12
  });

  return (
    <NewsPageLayout>
      <AnimatedPageHeader
        title="ニュース"
        subtitle="駅伝部に関する最新ニュースをお届けします。"
      />

      {/* クイックアクセスボタン */}
      <TopicsQuickAccess />

      {/* 検索バーとフィルター */}
      <div className="max-w-4xl mx-auto mb-8">
        {/* 検索バー */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="ニュースを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* 年別フィルター */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Button
            variant={yearFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setYearFilter('all')}
            className={yearFilter === 'all' 
              ? 'bg-sky-600 hover:bg-sky-700 text-white' 
              : 'text-sky-600 border-sky-600 hover:bg-sky-50'
            }
          >
            すべて
          </Button>
          {years.map((year) => (
            <Button
              key={year}
              variant={yearFilter === year ? 'default' : 'outline'}
              size="sm"
              onClick={() => setYearFilter(year)}
              className={yearFilter === year 
                ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                : 'text-sky-600 border-sky-600 hover:bg-sky-50'
              }
            >
              {year}年
            </Button>
          ))}
        </div>

        {/* 検索・フィルター結果表示 */}
        <div className="text-center text-sm text-gray-600">
          {(searchQuery || yearFilter !== 'all') && (
            <p>
              {searchQuery && `"${searchQuery}"`}
              {searchQuery && yearFilter !== 'all' && ' × '}
              {yearFilter !== 'all' && `${yearFilter}年`}
              の検索結果: {pagination.totalItems}件
              {pagination.totalPages > 1 && (
                <span className="ml-2">
                  (ページ {pagination.currentPage} / {pagination.totalPages})
                </span>
              )}
            </p>
          )}
          {!searchQuery && yearFilter === 'all' && (
            <p>
              全 {pagination.totalItems}件のニュース
              {pagination.totalPages > 1 && (
                <span className="ml-2">
                  (ページ {pagination.currentPage} / {pagination.totalPages})
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      <NewsGrid items={pagination.currentItems} />
      
      {/* ページネーション */}
      {pagination.totalPages > 1 && (
        <div className="mt-12 mb-8">
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            onPrevious={pagination.prevPage}
            onNext={pagination.nextPage}
            onFirst={pagination.goToFirstPage}
            onLast={pagination.goToLastPage}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            className="justify-center"
          />
        </div>
      )}
    </NewsPageLayout>
  );
}
