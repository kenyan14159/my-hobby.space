'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// スケジュール / リザルト / ニュース のページ間を移動するピル型ナビゲーション
export function TopicsQuickAccess() {
  const pathname = usePathname();
  const items = [
    { title: 'スケジュール', href: '/topics/schedule' },
    { title: 'リザルト', href: '/topics/results' },
    { title: 'ニュース', href: '/topics/news' },
  ];

  return (
    <motion.div
      className="grid grid-cols-3 gap-4 mt-6 mb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {items.map(({ title, href }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} className="w-full">
            <div
              className={`h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border flex items-center justify-center transition-colors ${isActive ? 'bg-sky-500 text-white border-sky-500' : 'text-sky-700 bg-white border-sky-300 hover:bg-sky-50'}`}
            >
              {title}
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
} 