"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsDetailLayout } from '@/components/news-detail-layout';
import { Button } from '@/components/ui/button';

export default function GiftsOctNovPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const gifts = [
    { provider: "纓坂の祖母", gift: "梅干し" },
    { provider: "國井のご実家", gift: "お米" },
    { provider: "佐藤大和のご実家", gift: "お米" },
    { provider: "OB青井様", gift: "お米" },
    { provider: "OB別府様、能條様", gift: "ボディメンテ" },
    { provider: "OB小柳様", gift: "ジュース" },
    { provider: "小野木コーチのご実家", gift: "里芋" },
    { provider: "本島のご実家", gift: "シャインマスカット" },
    { provider: "山光館様", gift: "キャベツ、レタス、とうもろこし" },
    { provider: "つばくら館様", gift: "とうもろこし" },
    { provider: "浦上の祖父母", gift: "栄養ドリンク" },
    { provider: "瀬戸のご実家", gift: "梨、のど飴" },
    { provider: "OB植松様のご実家", gift: "野菜" },
    { provider: "山本のご実家", gift: "お米" },
    { provider: "野手のご実家", gift: "さつまいも" },
    { provider: "日体大職員 飯沼様", gift: "ポカリスエット" },
    { provider: "近藤のご実家", gift: "アクエリアス" },
    { provider: "今野のご実家", gift: "ジャガイモ、お米" },
    { provider: "瀬戸の高校のコーチ", gift: "りんご" },
    { provider: "OB矢島様", gift: "シャインマスカット" },
    { provider: "小野木コーチのご実家", gift: "里芋" },
    { provider: "OB小嶋様のご実家", gift: "お菓子" },
    { provider: "OB漆畑様、高村様", gift: "R1" },
    { provider: "相洋高校 小池先生", gift: "みかん" },
    { provider: "瀬戸の祖母", gift: "りんご" },
    { provider: "OB渡邊様", gift: "みかん" },
    { provider: "中條のご実家", gift: "柿" },
    { provider: "大宮のご実家", gift: "柿" },
    { provider: "豊川の藤田様", gift: "柿" },
    { provider: "伊藤様（治療関係者）", gift: "みかん" },
    { provider: "吉岡のご実家", gift: "りんご" },
    { provider: "渡邊晄月のご実家", gift: "R1" },
  ];

  const giftImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages19.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages20.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages21.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages22.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages23.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages24.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages25.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages26.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages27.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages28.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages29.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages30.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages31.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages32.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages33.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages34.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages35.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages36.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages37.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages38.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages39.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages40.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/11/october_and_november_care_packages41.jpg",
  ];

  const handlePrevious = useCallback(() => {
    if (selectedImage !== null) {
      const newIndex = selectedImage > 0 ? selectedImage - 1 : giftImages.length - 1;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, giftImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImage !== null) {
      const newIndex = selectedImage < giftImages.length - 1 ? selectedImage + 1 : 0;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, giftImages.length]);

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
      title="10、11月の差し入れ"
      date="2025年11月30日"
    >
      {/* 感謝メッセージ */}
      <p className="text-gray-700 leading-relaxed mb-8">
        日頃より、日本体育大学陸上競技部 男子駅伝ブロックへのご声援、誠にありがとうございます。10・11月に下記の方々よりたくさんの差し入れを頂戴いたしました。部員一同、大変美味しくいただき、日々の練習の励みにしております。心より感謝申し上げます。
      </p>

      {/* 写真ギャラリー */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">写真</h2>
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {giftImages.map((imagePath, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={imagePath}
                alt={"差し入れ写真 " + (index + 1)}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                className="object-cover"
              />
            </div>
          ))}
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
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={giftImages[selectedImage]}
                alt={"差し入れ写真 " + (selectedImage + 1)}
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                sizes="(max-width: 768px) 90vw, 1000px"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {giftImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 差し入れ一覧 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">差し入れ一覧</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">ご提供者</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">差し入れ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {gifts.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-800">{item.provider}</td>
                  <td className="px-4 py-2.5 text-gray-600">{item.gift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 感謝の締め */}
      <p className="text-gray-600 text-center mt-8 text-sm">
        皆様の温かいご支援に心より感謝申し上げます。
      </p>
    </NewsDetailLayout>
  );
}
