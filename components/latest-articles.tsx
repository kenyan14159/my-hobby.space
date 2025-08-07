"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllNews, NewsMeta } from "@/lib/news";
import { getAllResults, ResultMeta } from "@/lib/results";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Article {
  id: number;
  slug: string;
  title: string;
  date: string | Date;
  image: string;
  type: 'news' | 'result';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    y: 60, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // モバイル判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const news = getAllNews();
    const results = getAllResults();
    
    // ニュースとリザルトを統合
    const combinedArticles: Article[] = [
      ...news.map((item: NewsMeta) => ({
        ...item,
        type: 'news' as const
      })),
      ...results.map((item: ResultMeta) => ({
        ...item,
        type: 'result' as const
      }))
    ];

    // 日付順でソート（新しい順）
    const sortedArticles = combinedArticles.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    // モバイルは2件、それ以外は3件を取得
    const articleCount = isMobile ? 2 : 3;
    setArticles(sortedArticles.slice(0, articleCount));
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const formatDate = (date: string | Date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getArticleUrl = (article: Article) => {
    if (article.type === 'news') {
      return `/topics/news/${article.slug}`;
    } else {
      return `/topics/results/${article.slug}`;
    }
  };

  const getBadgeColor = (type: string) => {
    return type === 'news' 
      ? 'bg-blue-500 hover:bg-blue-600' 
      : 'bg-green-500 hover:bg-green-600';
  };

  const getBadgeText = (type: string) => {
    return type === 'news' ? 'ニュース' : 'リザルト';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            最新トピックス
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            最新ニュースとリザルト情報をお届けします
          </p>
        </motion.div>

        {/* 記事カード */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {articles.map((article, index) => (
            <motion.div
              key={`${article.type}-${article.id}`}
              variants={cardVariants}
            >
              <Link href={getArticleUrl(article)}>
                <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white h-full flex flex-col">
                  {/* 画像部分 */}
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* バッジ */}
                    <div className="absolute top-2 left-2 md:top-4 md:left-4">
                      <Badge className={`${getBadgeColor(article.type)} text-white border-0 px-2 py-1 md:px-3 md:py-1 font-medium text-xs md:text-sm`}>
                        {getBadgeText(article.type)}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-3 md:p-6 flex-1 flex flex-col">
                    {/* 日付 */}
                    <div className="flex items-center text-gray-500 text-xs md:text-sm mb-2 md:mb-3">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {formatDate(article.date)}
                    </div>

                    {/* タイトル */}
                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 md:mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 flex-1">
                      {article.title}
                    </h3>

                    {/* 読む */}
                    <div className="flex items-center text-blue-600 text-xs md:text-sm font-medium group-hover:text-blue-700 transition-colors duration-300 mt-auto">
                      記事を読む
                      <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* リザルトへ・ニュースへのリンク */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/topics/news" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
          >
            ニュースへ
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
          <Link 
            href="/topics/results" 
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
          >
            リザルトへ
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 