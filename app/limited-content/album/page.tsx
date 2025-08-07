"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ExternalLink, Calendar, ChevronDown, ChevronUp, Image as ImageIcon, Loader2 } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import Image from "next/image";

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
    className="mb-4"
  >
    <Card className="overflow-hidden border-sky-100 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader 
        className="cursor-pointer bg-gradient-to-r from-sky-50 to-sky-100/70 hover:from-sky-100 hover:to-sky-200/70 transition-all duration-300 p-6"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center justify-between text-2xl text-sky-800">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 mr-3" />
            {year}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-6 w-6 text-sky-600" />
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
            <CardContent className="p-0">
              <div className="grid gap-2 p-6">
                {items.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-white to-sky-50/30 hover:from-sky-50 hover:to-sky-100/50 border border-sky-100/50 hover:border-sky-200 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center flex-1">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-sky-100 group-hover:bg-sky-200 flex items-center justify-center transition-colors">
                          <ImageIcon className="h-4 w-4 text-sky-600 group-hover:text-sky-700" />
                        </div>
                      </div>
                      <span className="text-gray-700 group-hover:text-sky-800 font-medium transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-sky-500 group-hover:text-sky-700 transition-colors flex-shrink-0 ml-2" />
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
        console.error('Error loading album data:', err);
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
      <div className="bg-gradient-to-b from-white via-sky-50/30 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">アルバムデータを読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="bg-gradient-to-b from-white via-sky-50/30 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-sky-50/30 to-white min-h-screen py-16">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <AnimatedPageHeader 
            title="アルバム"
            subtitle="活動アルバムを大会別にご覧いただけます"
            titleClassName="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent tracking-tight mb-3"
            subtitleClassName="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            underlineWidth="250px"
          />
            
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
            className="mt-16 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-300 shadow-md">
                    <Image
                      src="https://nssu-ekiden.com/wp-content/uploads/2025/02/photo194-300x300-1.jpg"
                      alt="saya"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-purple-800">saya</h3>
                    <p className="text-purple-600 text-sm">フォトグラファー</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  日体大駅伝部の活動を長年にわたって撮影し続けているフォトグラファー。選手たちの努力と成長の瞬間を美しく切り取り、多くの感動的な写真を提供してくださっています。
                </p>
                <a
                  href="https://www.instagram.com/saya_sports_films?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all px-4 py-2 rounded-full font-medium text-sm transform hover:scale-105"
                >
                  <Camera className="h-4 w-4" />
                  Instagram で作品を見る
                </a>
              </CardContent>
            </Card>
          </motion.div>

          {/* フッターメッセージ */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-8 rounded-2xl border border-sky-200">
              <div className="flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-sky-600 mr-3" />
                <h3 className="text-2xl font-bold text-sky-800">思い出の瞬間</h3>
              </div>
              <p className="text-sky-700 mb-4 leading-relaxed">
                これらの写真は、選手たちの努力と成長の軌跡を記録した貴重な瞬間です。<br />
                皆様の応援と共に歩んできた道のりを、ぜひご覧ください。
              </p>
              <p className="text-lg font-semibold text-sky-900">
                日本体育大学 陸上競技部 男子駅伝ブロック
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
