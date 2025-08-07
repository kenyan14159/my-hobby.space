'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SpotlightCard from '@/components/SpotlightCard';
import type { NewsMeta } from '@/lib/news';

interface Props {
  items: NewsMeta[];
}

// Date型かどうかを判定するヘルパー関数
function isDateObject(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

export default function NewsGrid({ items }: Props) {
  const [yearFilter, setYearFilter] = useState<'all' | string>('all');

  const years = useMemo(
    () => {
      const yearsSet = new Set<string>();
      items.forEach(item => {
        if (typeof item.date === 'string' && item.date.length >= 4) {
          yearsSet.add(item.date.slice(0, 4));
        } else if (isDateObject(item.date)) {
          yearsSet.add(item.date.getFullYear().toString());
        }
      });
      return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
    },
    [items]
  );

  const filtered = useMemo(
    () => {
      if (yearFilter === 'all') return items;
      
      return items.filter((item) => {
        if (typeof item.date === 'string' && item.date.length >= 4) {
          return item.date.startsWith(yearFilter);
        } else if (isDateObject(item.date)) {
          return item.date.getFullYear().toString() === yearFilter;
        }
        return false;
      });
    },
    [items, yearFilter]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mt-4 mb-8">
        <button
          onClick={() => setYearFilter('all')}
          className={`h-9 px-4 rounded-full border transition-colors text-sm font-medium ${
            yearFilter === 'all'
              ? 'bg-sky-500 text-white border-sky-500'
              : 'bg-white text-sky-700 border-sky-300 hover:bg-sky-50'
          }`}
        >
          すべて
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYearFilter(y)}
            className={`h-9 px-4 rounded-full border transition-colors text-sm font-medium ${
              yearFilter === y
                ? 'bg-sky-500 text-white border-sky-500'
                : 'bg-white text-sky-700 border-sky-300 hover:bg-sky-50'
            }`}
          >
            {y}年
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {filtered.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/topics/news/${item.slug}`} className="block h-full">
              <SpotlightCard
                className="h-48 sm:h-56 md:h-64 flex flex-col text-white"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative flex flex-col flex-1 justify-end p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 drop-shadow-md leading-tight">{item.title}</h3>
                  <p className="text-xs text-gray-200">
                    {typeof item.date === 'string' 
                      ? item.date 
                      : isDateObject(item.date) 
                        ? item.date.toISOString().split('T')[0] 
                        : ''}
                  </p>
                  <p className="text-xs text-white mt-1 self-end">続きを読む →</p>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
} 