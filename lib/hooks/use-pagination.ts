import { useMemo, useState } from 'react';

export interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

export interface UsePaginationReturn<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export function usePagination<T>({ 
  items, 
  itemsPerPage = 12 
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { currentItems, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    
    return { currentItems, totalPages };
  }, [items, currentPage, itemsPerPage]);

  // ページが変わった時に1ページ目に戻る
  useMemo(() => {
    if (currentPage > Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [items.length, itemsPerPage, currentPage]);

  const goToPage = (page: number) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const goToFirstPage = () => {
    goToPage(1);
  };

  const goToLastPage = () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    goToPage(totalPages);
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    totalItems: items.length,
    itemsPerPage,
    hasNextPage: currentPage < Math.ceil(items.length / itemsPerPage),
    hasPrevPage: currentPage > 1,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
  };
}