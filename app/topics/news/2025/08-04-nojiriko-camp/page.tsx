"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { 
  Waves, 
  MapPin,
  Calendar,
  Flag,
  Camera,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NewsDetailLayout } from '@/components/news-detail-layout';
import { Button } from '@/components/ui/button';

export default function NojirikoCampPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const campImages = [
    "https://nssu-ekiden.works/wp-content/uploads/2025/08/2025-kurohime-camp00001-scaled.jpg",
    "https://nssu-ekiden.works/wp-content/uploads/2025/08/2025-kurohime-camp00002-scaled.jpg",
    "https://nssu-ekiden.works/wp-content/uploads/2025/08/2025-kurohime-camp00003-scaled.jpg",
    "https://nssu-ekiden.works/wp-content/uploads/2025/08/2025-kurohime-camp00004-scaled.jpg",
    "https://nssu-ekiden.works/wp-content/uploads/2025/08/2025-kurohime-camp00005-scaled.jpg",
    "https://nssu-ekiden.works/wp-content/uploads/2025/08/2025-kurohime-camp00006-scaled.jpg"
  ];

  const handlePrevious = useCallback(() => {
    if (selectedImage !== null) {
      const newIndex = selectedImage > 0 ? selectedImage - 1 : campImages.length - 1;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, campImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImage !== null) {
      const newIndex = selectedImage < campImages.length - 1 ? selectedImage + 1 : 0;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, campImages.length]);

  // キーボードイベントハンドラー
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') setSelectedImage(null);
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handlePrevious, handleNext]);

  return (
    <NewsDetailLayout
      title="野尻湖全体合宿がスタートしました！"
      date="2025年8月4日"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* ヘッダー部分 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="bg-gradient-to-r from-blue-500 to-sky-500 p-3 rounded-full"
            >
              <Waves className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <div className="flex items-center justify-center text-sky-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">信濃町 野尻湖</span>
          </div>
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>2025年8月2日より開始</span>
          </div>
        </div>

        {/* 合宿写真ギャラリー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <Camera className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">野尻湖合宿写真ギャラリー</h2>
              </div>
              <p className="text-gray-600">美しい自然環境での練習風景をご覧ください</p>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {campImages.map((imagePath, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <Image
                      src={imagePath}
                      alt={`野尻湖合宿写真 ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110 image-protection"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* メインコンテンツ */}
        <div className="prose prose-lg max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              2025年8月2日より、信濃町の野尻湖にて全体メンバーによる合宿が始まりました！
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              富士見高原での選抜合宿に続き、今度は全チームが一堂に会しての本格的な強化期間となります。今回の野尻湖合宿では、シーズンに向けた土台づくりを最重要目標に掲げています。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              野尻湖周辺は起伏に富んだ地形が特徴で、このアップダウンの激しいコースを活用してトレーニングをしっかりと積んでいきます。平坦なコースでは得られない負荷をかけることで、脚力強化はもちろん、精神面でのタフネスも養っていく予定です。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              約2週間という長期間の合宿は決して楽なものではありませんが、野尻湖の美しい自然に囲まれたこの素晴らしい環境で練習できることに、部員一同心から感謝しています。清らかな湖水と緑豊かな山々を眺めながら、集中して練習に取り組める環境は本当に恵まれていると感じています。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              私たちの目標は箱根駅伝予選会での10位以内入賞による本選出場権獲得、そして箱根駅伝でのシード権獲得、さらには全日本大学駅伝でのシード権獲得です。これらの大きな目標を実現するため、この野尻湖合宿でしっかりとした基盤を築いていきたいと思います。
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              いつも温かく見守ってくださる皆様からのたくさんのサポートや差し入れを力に変えて、チーム一丸となって頑張ってまいります。引き続き応援のほど、よろしくお願いいたします！
            </p>

            {/* 署名部分 */}
            <div className="text-center pt-6 border-t border-gray-200">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                <Flag className="w-5 h-5" />
                <span>日本体育大学駅伝部</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ライトボックス */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-7xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={campImages[selectedImage]}
                    alt={`野尻湖合宿写真 ${selectedImage + 1}`}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    sizes="(max-width: 768px) 90vw, 1200px"
                  />
                </div>

                {/* コントロールボタン */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* 画像カウンター */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {campImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </NewsDetailLayout>
  );
} 