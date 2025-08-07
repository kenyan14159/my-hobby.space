'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// チーム情報関連ページへのクイックアクセスボタンを表示するコンポーネント
export function InfoQuickAccess() {
  const pathname = usePathname();

  const items = [
    { title: "サポーターの皆様", href: "/information/supporters" },
    { title: "応援してくださる皆様へ", href: "/information/for-fans" },
    { title: "ホームページについて", href: "/information/about" },
    { title: "お問い合わせ", href: "/information/contact" },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {items.map(({ title, href }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} className="w-full">
            <div
              className={`h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border flex items-center justify-center transition-colors
                ${isActive ? 'bg-sky-500 text-white border-sky-500' : 'text-sky-700 bg-white border-sky-300 hover:bg-sky-50'}`}
            >
              {title}
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
} 