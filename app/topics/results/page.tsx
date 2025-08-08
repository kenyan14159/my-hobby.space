'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';
import { CardImage } from '@/components/ui/card-image';
import { AnimatedPageHeader } from '@/components/ui/animated-page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TopicsQuickAccess } from '@/components/topics-quick-access';
import { getAllResults, ResultMeta } from '@/lib/results';
import { usePagination } from '@/lib/hooks/use-pagination';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// 年一覧取得
const getYears = (items: ResultMeta[]) => {
  const yrs = Array.from(new Set(items.map((i) => {
    const dateStr = typeof i.date === 'string' ? i.date : i.date.toISOString();
    return dateStr.slice(0, 4);
  })));
  return yrs.sort((a, b) => b.localeCompare(a));
};

function ResultsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [yearFilter, setYearFilter] = useState<'all' | string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const results = getAllResults();

  const years = useMemo(() => getYears(results), [results]);
  
  // 検索とフィルタリング
  const filtered = useMemo(() => {
    let filteredResults = results;

    // 年別フィルター
    if (yearFilter !== 'all') {
      filteredResults = filteredResults.filter((r: ResultMeta) => {
        const dateStr = typeof r.date === 'string' ? r.date : r.date.toISOString();
        return dateStr.startsWith(yearFilter);
      });
    }

    // 検索フィルター
    if (searchQuery.trim()) {
      filteredResults = filteredResults.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredResults;
  }, [yearFilter, results, searchQuery]);
  
  const sorted = useMemo(() => [...filtered].sort((a, b) => b.id - a.id), [filtered]);

  // ページネーション
  const pagination = usePagination({
    items: sorted,
    itemsPerPage: 12
  });

  // クエリ→状態 初期同期
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const y = (searchParams.get('year') as string) || 'all';
    const p = parseInt(searchParams.get('page') || '1', 10);
    setSearchQuery(q);
    setYearFilter((y === 'all' || /^\d{4}$/.test(y)) ? (y as 'all' | string) : 'all');
    if (!Number.isNaN(p) && p > 0) {
      pagination.goToPage(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 状態→クエリ 同期
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (yearFilter !== 'all') params.set('year', yearFilter);
    if (pagination.currentPage > 1) params.set('page', String(pagination.currentPage));
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '?', { scroll: false });
  }, [searchQuery, yearFilter, pagination.currentPage, router]);

  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatedPageHeader
          title="リザルト"
          subtitle="大会、記録会の成績をご覧いただけます。"
        />
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'トピックス', href: '/topics' }, { label: 'リザルト' }]} />
        </div>

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
                placeholder="リザルトを検索..."
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
              onClick={() => { setYearFilter('all'); pagination.goToPage(1); }}
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
                onClick={() => { setYearFilter(year); pagination.goToPage(1); }}
                className={yearFilter === year 
                  ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                  : 'text-sky-600 border-sky-600 hover:bg-sky-50'
                }
              >
                {year}年
              </Button>
            ))}
          </div>
        </div>

        {/* 検索・フィルター結果表示 */}
        <div className="text-center text-sm text-gray-600 mb-6">
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
              全 {pagination.totalItems}件のリザルト
              {pagination.totalPages > 1 && (
                <span className="ml-2">
                  (ページ {pagination.currentPage} / {pagination.totalPages})
                </span>
              )}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {pagination.currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/topics/results/${item.slug}`} className="block h-full">
                <SpotlightCard className="h-48 sm:h-56 md:h-64 flex flex-col text-white relative overflow-hidden">
                  <CardImage src={item.image} alt={item.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />

                  <div className="relative flex flex-col flex-1 justify-end p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 drop-shadow-md leading-tight">{item.title}</h3>
                    <p className="text-xs text-gray-200">
                      {typeof item.date === 'string' ? item.date : item.date.toISOString().split('T')[0]}
                    </p>
                    <p className="text-xs text-white mt-1 self-end">詳細 →</p>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
        
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
      </motion.div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">読み込み中...</div>}>
      <ResultsPageContent />
    </Suspense>
  );
}
