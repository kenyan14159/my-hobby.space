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

  // デバッグ用
  console.log('Current pathname:', pathname);

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 mb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {items.map(({ title, href }) => {
        // 末尾のスラッシュを考慮してアクティブ判定
        const isActive = pathname === href || pathname === `${href}/`;
        
        // デバッグ用
        console.log(`${title}: pathname="${pathname}", href="${href}", isActive=${isActive}`);

        return (
          <Link key={href} href={href} className="w-full">
            {isActive ? (
              // アクティブな状態：青色で塗りつぶし
              <motion.div
                className="h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border-2 flex items-center justify-center transition-all duration-200 bg-sky-500 text-white border-sky-500 shadow-lg"
              >
                {title}
              </motion.div>
            ) : (
              // 非アクティブな状態：白背景
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border-2 flex items-center justify-center transition-all duration-200 text-sky-700 bg-white border-sky-200 hover:bg-sky-50 hover:border-sky-300 hover:shadow-md"
              >
                {title}
              </motion.div>
            )}
          </Link>
        );
      })}
    </motion.div>
  );
} 