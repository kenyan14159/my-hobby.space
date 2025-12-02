"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ExternalLink, Calendar, ChevronDown, Images, Loader2 } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ErrorDisplay } from "@/components/ui/error-display";
import Image from "next/image";
import { logger } from "@/lib/logger";

// --- 型定義 ---
interface AlbumItem {
  title: string;
  url: string;
}

interface AlbumYear {
  year: string;
  items: AlbumItem[];
}

// --- アニメーション設定 ---
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
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const accordionVariants = {
  closed: { height: 0, opacity: 0 },
  open: { 
    height: "auto", 
    opacity: 1,
    transition: { 
      height: { duration: 0.4, ease: "easeInOut" },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  }
};

// --- アコーディオンコンポーネント ---
const AccordionSection = ({ year, items, isOpen, onToggle }: {
  year: string;
  items: AlbumItem[];
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    variants={itemVariants}
    className="mb-6"
  >
    <Card className="overflow-hidden border-none shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
      <CardHeader 
        className="cursor-pointer bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 transition-all duration-500 p-6"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center justify-between text-2xl text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="font-bold tracking-wide">{year}</span>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {items.length}枚
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </CardTitle>
      </CardHeader>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={accordionVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
          >
            <CardContent className="p-6 bg-gradient-to-b from-slate-50 to-white">
              <div className="grid gap-3">
                {items.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between p-5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-100 hover:border-slate-300 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] hover:-translate-y-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center flex-1 gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-all duration-300 shadow-sm">
                          <Images className="h-6 w-6 text-slate-600 group-hover:text-slate-700 transition-colors" />
                        </div>
                      </div>
                      <span className="text-gray-800 group-hover:text-slate-900 font-medium text-lg transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                        開く
                      </span>
                      <ExternalLink className="h-5 w-5 text-slate-500 group-hover:text-slate-700 transition-all duration-300 transform group-hover:scale-110" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  </motion.div>
);

// --- メインページコンポーネント ---
export default function AlbumPage() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [albumData, setAlbumData] = useState<AlbumYear[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // JSONファイルからデータを読み込み
  useEffect(() => {
    const loadAlbumData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/data/albums/albums.json');
        if (!response.ok) {
          throw new Error('アルバムデータの読み込みに失敗しました');
        }
        
        const data = await response.json();
        setAlbumData(data);
      } catch (err) {
        logger.error('Error loading album data:', err);
        setError('データの読み込みに失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbumData();
  }, []);

  const toggleSection = (year: string) => {
    setOpenSections(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  // ローディング状態
  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-b from-slate-50 via-gray-50 to-slate-50 min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-6">
            <Loader2 className="h-16 w-16 text-slate-600 animate-spin mx-auto" />
          </div>
          <p className="text-gray-700 text-lg font-medium">読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <ErrorDisplay 
        message={error}
        onRetry={() => {
          setError(null);
          setIsLoading(true);
          // データ再読み込みはuseEffectで自動実行される
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-gray-50 to-slate-50 min-h-screen py-16 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '限定コンテンツ', href: '/limited-content' }, { label: 'アルバム' }]} />
          </div>
          
          {/* ヘッダーセクション */}
          <div className="text-center mb-12">
            <AnimatedPageHeader 
              title="アルバム"
              subtitle="Photo Album"
            />
          </div>
            
          {/* アルバムコンテンツ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {albumData.map((yearData) => (
              <AccordionSection
                key={yearData.year}
                year={yearData.year}
                items={yearData.items}
                isOpen={openSections[yearData.year] || false}
                onToggle={() => toggleSection(yearData.year)}
              />
            ))}
          </motion.div>

          {/* 写真提供者プロフィール */}
          <motion.div
            className="mt-20 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 shadow-xl">
              <CardContent className="p-8 relative">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                    <Image
                      src="https://nssu-ekiden.works/wp-content/uploads/2025/02/photo194-300x300-1.jpg"
                      alt="saya"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-2xl text-slate-800">saya</h3>
                      <span className="bg-slate-700 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Photographer
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">公式フォトグラファー</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  日体大駅伝部の活動を撮影し続けているフォトグラファー。選手たちの瞬間を記録しています。
                </p>
                <a
                  href="https://www.instagram.com/saya_sports_films?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-slate-700 hover:bg-slate-800 text-white transition-all px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl"
                >
                  <Camera className="h-5 w-5" />
                  Instagram
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>

          {/* 著作権に関する注意 */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl shadow-lg">
              <div className="text-left max-w-2xl mx-auto">
                <h3 className="font-bold text-amber-900 mb-2 text-lg">写真の利用について</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  掲載されている写真の無断転載・二次利用・商用利用は固くお断りします。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
