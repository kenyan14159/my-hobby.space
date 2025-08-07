'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  hasNextPage,
  hasPrevPage,
  className
}: PaginationControlsProps) {
  // ページ番号の表示範囲を計算
  const getVisiblePages = () => {
    const delta = 2; // 現在のページの前後何ページまで表示するか
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {/* 最初のページに移動 */}
      <Button
        variant="outline"
        size="sm"
        onClick={onFirst}
        disabled={!hasPrevPage}
        className="text-sky-600 border-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      {/* 前のページに移動 */}
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={!hasPrevPage}
        className="text-sky-600 border-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* ページ番号 */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={
                currentPage === page
                  ? 'bg-sky-600 hover:bg-sky-700 text-white'
                  : 'text-sky-600 border-sky-600 hover:bg-sky-50'
              }
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      {/* 次のページに移動 */}
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!hasNextPage}
        className="text-sky-600 border-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* 最後のページに移動 */}
      <Button
        variant="outline"
        size="sm"
        onClick={onLast}
        disabled={!hasNextPage}
        className="text-sky-600 border-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}