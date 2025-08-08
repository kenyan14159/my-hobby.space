'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AnimatedPageHeader } from '@/components/ui/animated-page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Image as ImageIcon, Sparkles, Info, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

export default function LimitedContent() {
  const limitedContentCategories = [
    {
      title: "アルバム",
      description: "チームの写真アルバム - 大会や合宿の様子を写真でご覧いただけます",
      link: "/limited-content/album",
      icon: <ImageIcon className="h-12 w-12 text-white drop-shadow-md" />,
      bgImage: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite200.jpg",
      bgPosition: "center"
    },
    {
      title: "限定コンテンツ",
      description: "会員限定のコンテンツ",
      link: "/limited-content/content",
      icon: <Lock className="h-12 w-12 text-white drop-shadow-md" />,
      bgImage: "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite33.jpeg",
      bgPosition: "center"
    }
  ];

  // アニメーション用バリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen">
      <motion.div 
        className="container mx-auto px-4 py-12 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatedPageHeader 
          title="限定コンテンツ"
          subtitle="駅伝部員の特別なコンテンツ"
          underlineColor="bg-sky-500"
        />
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '限定コンテンツ' }]} />
        </div>

        <motion.div 
          className="max-w-4xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Alert className="bg-sky-50 border-sky-200">
            <Info className="h-5 w-5 text-sky-600" />
            <AlertDescription className="text-gray-700">
              限定コンテンツには在学駅伝部員のPBランキングや目標などが掲載されているため、パスワードによる保護がかかっています。
              パスワードをお持ちの方のみご利用いただけます。
            </AlertDescription>
          </Alert>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {limitedContentCategories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={category.link} className="block h-full">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                  {/* 背景画像 */}
                  <div className="absolute inset-0">
                    <Image 
                      src={category.bgImage} 
                      alt={category.title} 
                      fill 
                      style={{objectFit: 'cover', objectPosition: category.bgPosition}}
                      className="transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                  </div>
                  
                  {/* コンテンツ */}
                  <div className="relative h-full flex flex-col justify-between p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="bg-sky-600/80 backdrop-blur-sm p-3 rounded-full">
                        {category.icon}
                      </div>
                      <div className="bg-sky-900/60 backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium">
                        限定コンテンツ
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{category.title}</h3>
                      <p className="text-white/90 text-sm drop-shadow-md">{category.description}</p>
                      
                      <div className="mt-4 flex items-center text-white/90 text-sm font-medium">
                        <span>詳細を見る</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
