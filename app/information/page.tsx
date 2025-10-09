"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ExternalLink, Users, Heart, Globe, MessageCircle } from "lucide-react";
import Image from "next/image";

const infoItems = [
  { 
    title: "サポーターの皆様", 
    href: "/information/supporters", 
    description: "支えてくださる方々",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite284.jpg",
    color: "text-blue-600",
    bgColor: "from-blue-500/10 to-blue-600/10",
    icon: Users
  },
  { 
    title: "応援してくださる皆様へ", 
    href: "/information/for-fans", 
    description: "皆様へのメッセージ",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite141.jpg",
    color: "text-red-600",
    bgColor: "from-red-500/10 to-red-600/10",
    icon: Heart
  },
  { 
    title: "ホームページに関して", 
    href: "/information/about", 
    description: "本サイトについて",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite295.jpg",
    color: "text-emerald-600",
    bgColor: "from-emerald-500/10 to-emerald-600/10",
    icon: Globe
  },
  { 
    title: "お問い合わせ", 
    href: "/information/contact", 
    description: "ご質問はこちら",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite294.jpg",
    color: "text-amber-600",
    bgColor: "from-amber-500/10 to-amber-600/10",
    icon: MessageCircle
  },
];

export default function InformationPage() {
  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'チーム情報' }]} />
        </div>
        <AnimatedPageHeader title="チーム情報" subtitle="Team Information" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-4 mt-8 sm:mt-12">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.href}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={item.href}>
                  <motion.div
                    className="relative overflow-hidden h-36 sm:h-44 md:h-48 rounded-xl sm:rounded-2xl shadow-lg border border-white/50"
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
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover"
                      />
                      {/* オーバーレイ（文字の視認性向上のため少し濃く） */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/60 backdrop-blur-[2px]`}></div>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 text-center z-10">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <div className={`bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg mr-3`}>
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
                        </div>
                        <h2 className="text-sm sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
                          {item.title}
                        </h2>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-white/90 drop-shadow-md mb-3">
                        {item.description}
                      </p>
                      
                      <div className={`inline-flex items-center ${item.color} bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md text-xs sm:text-sm`}>
                        <span className="font-medium">詳細</span>
                        <ExternalLink className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
} 