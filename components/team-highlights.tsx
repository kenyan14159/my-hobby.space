"use client";

import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import { CardImage } from "@/components/ui/card-image";
import { Users, BarChart3, Trophy, CalendarCheck2, Gift, Camera, Landmark, HelpCircle } from "lucide-react";
import Link from "next/link";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";

// --- 表示項目の定義 (ご指定の8項目に更新) ---
const highlights = [
  {
    icon: Users,
    title: "メンバー紹介",
    description: "選手・スタッフの紹介",
    href: "/members",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite254.jpg"
  },
  {
    icon: BarChart3,
    title: "歴代記録",
    description: "チームの輝かしい記録",
    href: "/records",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite337.jpg"
  },
  {
    icon: Trophy,
    title: "駅伝の歴史",
    description: "箱根駅伝などの出場実績",
    href: "/ekiden",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite339.jpg"
  },
  {
    icon: CalendarCheck2,
    title: "日体大記録会",
    description: "主催競技会の情報",
    href: "/competition",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite289.jpg"
  },
  {
    icon: Gift,
    title: "限定コンテンツ",
    description: "限定情報など",
    href: "/limited-content/content",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/06/saya-img1.jpg"
  },
  {
    icon: Camera,
    title: "アルバム",
    description: "活動写真アルバム集",
    href: "/limited-content/album",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite350.jpg"
  },
  {
    icon: Landmark,
    title: "サポーターの皆様",
    description: "ご支援いただいている皆様",
    href: "/information/supporters",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite257.jpg"
  },
  {
    icon: HelpCircle,
    title: "お問い合わせ",
    description: "チームへのお問い合わせはこちら",
    href: "/information/contact",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite171.jpeg"
  }
];

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export function TeamHighlights() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* セクションタイトル */}
          <AnimatedPageHeader
            title="チームを知る"
            subtitle="主要コンテンツへアクセス"
            underlineColor="bg-gray-500"
            titleClassName="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 tracking-tight mb-3"
            subtitleClassName="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          />

          {/* ハイライトグリッド */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {highlights.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link href={item.href} className="block h-full group">
                  <SpotlightCard className="h-full relative overflow-hidden" spotlightColor="rgba(156, 163, 175, 0.2)">
                    <CardImage src={item.image} alt={item.title} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw" overlayClassName="bg-black/60" />
                    <div className="relative z-10 flex flex-col items-start h-full p-3 sm:p-4">
                      <div className="mb-2 sm:mb-4 inline-flex items-center justify-center p-1.5 sm:p-2 rounded-lg bg-white/20">
                        <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <h3 className="text-sm sm:text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm font-medium text-white">
                        詳細を見る
                        <svg
                          className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}