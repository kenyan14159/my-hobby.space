"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { NewsDetailLayout } from '@/components/news-detail-layout';
import { Button } from '@/components/ui/button';
import { GiftTable, GiftTableRow } from '@/components/ui/gift-table';
import { Gift, Calendar, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AugustSeptemberGiftsPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september1.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september2.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september3.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september4.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september5.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september6.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september7.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september8.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september9.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september10.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september11.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september12.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september13.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september14.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september15.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september16.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september17.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september18.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september19.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september20.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september21.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september22.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september23.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september24.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september25.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september26.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september27.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september28.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september29.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september30.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september31.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september32.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/gifts-for-august-and-september33.jpg",
  ];

  const handlePrevious = useCallback(() => {
    if (selectedImage !== null) {
      const newIndex = selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, galleryImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImage !== null) {
      const newIndex = selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, galleryImages.length]);

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

  const rows: { provider: string; gift: string }[] = [
    { provider: 'OB松尾様', gift: 'お菓子' },
    { provider: 'OG北原様', gift: '野菜ジュース' },
    { provider: 'OB谷口浩美様', gift: 'お菓子' },
    { provider: 'OB植松様のご実家', gift: 'フルーツ大福' },
    { provider: 'OB岩崎様', gift: 'ソルティライチ' },
    { provider: 'OB佐藤慎巴様', gift: '塩分チャージ、アクエリアスの粉' },
    { provider: 'OB富永様', gift: 'フルーツジュース' },
    { provider: 'OB佐藤様', gift: '麦茶' },
    { provider: 'OB前山様', gift: 'スポーツドリンク' },
    { provider: 'OB輿水様、松浦様、分須様、OG宮内様、吉田様', gift: 'ドリンク' },
    { provider: 'OB分須様(左)', gift: 'ふりかけ' },
    { provider: 'OB橋本様', gift: 'ビタミンレモン' },
    { provider: 'OB漆畑様、高村様', gift: 'ジュース' },
    { provider: 'OB杉本様', gift: 'キレートレモン' },
    { provider: 'OB石川様、住原様', gift: 'メロン' },
    { provider: 'OG佐々木様', gift: '梨' },
    { provider: 'OB太田様', gift: 'ドリンク' },
    { provider: 'OB北村様', gift: 'アクエリ、ゼリー' },
    { provider: 'OB 秋山様、住田様、山口様', gift: 'ドリンク' },
    { provider: 'OB河合様', gift: 'SOYJOY' },
    { provider: 'OB中澤様、分須様の叔父様、田島の祖父', gift: 'お米' },
    { provider: '濵野の祖母', gift: 'ビタミンレモン' },
    { provider: '大竹（左）のご実家', gift: 'スイカ' },
    { provider: '西坂のご実家', gift: '梨' },
    { provider: '吉岡のご実家', gift: 'スイカ、スポーツドリンク' },
    { provider: '平島の祖母', gift: 'カステラ' },
    { provider: '阿知和のご実家', gift: 'ポカリスエット' },
    { provider: '阿知和の祖母', gift: '海苔' },
    { provider: 'OB植松様のお母様', gift: 'プルーン' },
    { provider: '濵野のご実家', gift: 'お菓子' },
    { provider: '杉久保ハウス様', gift: 'スポーツドリンク' },
    { provider: '伊那駅伝事務局、伊那市職員の下平様、高松様', gift: 'アクエリ、トマト、桃、かんてんぱぱ' },
    { provider: '山光館様', gift: '飴' },
    { provider: 'カメラマンの紗耶様', gift: 'フルーツジュース、お菓子' },
  ];

  return (
    <NewsDetailLayout
      title="8・9月の差し入れ一覧"
      date="2025年9月20日"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-emerald-600">
            <Gift className="w-5 h-5" />
            <span className="font-medium">皆さまからの温かいご支援</span>
          </div>
          <div className="flex items-center justify-center text-gray-600 mt-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>2025年8月〜9月</span>
          </div>
        </div>

        {/* ギャラリー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <Camera className="w-6 h-6 text-emerald-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">差し入れギャラリー</h2>
              </div>
              <p className="text-gray-600">温かいお心遣いに心より感謝申し上げます</p>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {galleryImages.map((imagePath, index) => (
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
                      alt={`差し入れギャラリー ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110 image-protection"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* テーブル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <GiftTable>
            {rows.map(({ provider, gift }, idx) => (
              <GiftTableRow key={idx} provider={provider} gift={gift} />
            ))}
          </GiftTable>
        </motion.div>

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
                    src={galleryImages[selectedImage]}
                    alt={`差し入れギャラリー ${selectedImage + 1}`}
                    width={1400}
                    height={933}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    sizes="(max-width: 768px) 90vw, 1400px"
                  />
                </div>

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

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </NewsDetailLayout>
  );
}


