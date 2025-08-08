"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalendarDays, ListOrdered, Newspaper } from "lucide-react";
import Image from "next/image";

// トピックスナビゲーション項目の定義
const topicsItems = [
  {
    name: "スケジュール",
    href: "/topics/schedule",
    icon: CalendarDays,
    color: "text-sky-600",
    bgColor: "from-sky-500/10 to-sky-600/10",
    description: "大会・イベントの日程",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite297.jpg"
  },
  {
    name: "リザルト",
    href: "/topics/results",
    icon: ListOrdered,
    color: "text-emerald-600",
    bgColor: "from-emerald-500/10 to-emerald-600/10",
    description: "大会結果",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/06/saya-img6.jpg"
  },
  {
    name: "ニュース",
    href: "/topics/news",
    icon: Newspaper,
    color: "text-orange-600",
    bgColor: "from-orange-500/10 to-orange-600/10",
    description: "最新ニュース",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite195.jpeg"
  },
];

export default function TopicsPage() {
  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'トピックス' }]} />
        </div>
        <AnimatedPageHeader title="トピックス" subtitle="Topics" />

        {/* トピックスカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {topicsItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={`relative overflow-hidden h-64 rounded-2xl shadow-lg border border-white/50`}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 画像背景 */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {/* オーバーレイ（透明度を下げて画像をより濃く表示） */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} backdrop-blur-[1px]`}></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-full mb-4 shadow-md">
                      <Icon className={`w-10 h-10 ${item.color}`} />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 text-white drop-shadow-lg`}>
                      {item.name}
                    </h2>
                    <p className="text-white drop-shadow-lg font-medium">{item.description}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
} 