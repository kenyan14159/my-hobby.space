"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { 
  Mountain, 
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

export default function SugadairaCampPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const campImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-sugadaira-camp-favorite1-scaled.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-sugadaira-camp-favorite2.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-sugadaira-camp-favorite3.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-sugadaira-camp-favorite4.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-sugadaira-camp-favorite5.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/08/2025-sugadaira-camp-favorite6.jpeg"
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
      title="菅平高原選抜合宿がスタートしました！"
      date="2025年8月19日"
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
              className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full"
            >
              <Mountain className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <div className="flex items-center justify-center text-emerald-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">上田市 菅平高原</span>
          </div>
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>2025年8月19日より開始</span>
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
                <Camera className="w-6 h-6 text-emerald-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">菅平高原合宿写真ギャラリー</h2>
              </div>
              <p className="text-gray-600">高原の爽やかな環境での練習風景をご覧ください</p>
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
                      alt={`菅平高原合宿写真 ${index + 1}`}
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
              2025年8月19日より、上田市の菅平高原にて選抜メンバーによる合宿が始まりました！
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              野尻湖での全体合宿での成果を踏まえ、今度は選抜メンバーによる1回目の菅平高原合宿が本格的にスタートしました。今回の合宿では、野尻湖合宿で培った足作りをさらに発展させ、シーズンに向けた基礎体力の向上を最重要目標に掲げています。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              菅平高原は標高1,300メートルを超える高地環境が特徴で、この恵まれた環境での練習により心肺機能の強化を図ります。様々なコースを選択して走ることができるこの環境は、野尻湖合宿で築いた土台をさらに発展させるのに最適な条件が整っています。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              高地特有の澄んだ空気の中で行うトレーニングは決して楽なものではありませんが、菅平高原の雄大な自然に囲まれたこの素晴らしい環境で練習できることに、メンバー一同心から感謝しています。緑豊かな高原と青い空を背景に、集中して質の高い練習に取り組める環境は本当に恵まれていると感じています。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              私たちの目標は箱根駅伝予選会での10位以内本選出場権獲得、そして箱根駅伝でのシード権獲得、さらには全日本大学駅伝でのシード権獲得です。これらの大きな目標を実現するため、この1回目の菅平高原合宿でしっかりとした基盤をさらに強化し、次の合宿につなげていきたいと思います。
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              いつも温かく見守ってくださる皆様からのたくさんのサポートや応援を力に変えて、メンバー一丸となって目標達成に向けて頑張ってまいります。引き続き応援のほど、よろしくお願いいたします！
            </p>

            {/* 署名部分 */}
            <div className="text-center pt-6 border-t border-gray-200">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
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
                    alt={`菅平高原合宿写真 ${selectedImage + 1}`}
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
