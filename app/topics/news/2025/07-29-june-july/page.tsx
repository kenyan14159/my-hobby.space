"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Gift, Heart, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight } from '@/components/news-detail-layout';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { Button } from '@/components/ui/button';

export default function GiftsJuneJulyPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const gifts = [
    { provider: "OB松崎様", gift: "新玉ねぎ" },
    { provider: "平島の叔父", gift: "トマト🍅" },
    { provider: "OB廻谷様", gift: "お米🌾" },
    { provider: "OB植松様のご実家", gift: "野菜ジュース、甘酒、たくさんのお野菜🥬" },
    { provider: "永見のご実家", gift: "トマト🍅" },
    { provider: "野田のご実家", gift: "お菓子😋" },
    { provider: "倉村のご実家", gift: "スイカ🍉" },
    { provider: "大宮(左)のご実家", gift: "さくらんぼ🍒" },
    { provider: "OBの富永様", gift: "ソルティーライチ✨" },
    { provider: "大金様", gift: "塩分チャージ、アクエリアスの粉💧" },
    { provider: "OBの渡辺様、前山様、小田様、木田様、早瀬様", gift: "バナナ🍌" },
    { provider: "池田のご実家", gift: "お菓子😋" },
    { provider: "荻野のご実家", gift: "じゃがいも🥔、きゅうり🥒、醤油" },
    { provider: "山形の板垣様", gift: "さくらんぼ🍒" },
    { provider: "ライラック治療院様", gift: "ジュース😊" },
    { provider: "つばくら館様", gift: "ポカリスエットの粉💦" },
    { provider: "OB植松様のご実家", gift: "野菜🥔、あんず" },
    { provider: "日体大OB様", gift: "ポカリスエットの粉💧" },
    { provider: "平島の祖母", gift: "スイカ🍉" },
    { provider: "小野木コーチのご実家", gift: "茄子🍆" },
    { provider: "尾上のご実家", gift: "お菓子🍓" },
    { provider: "富士見高原リゾートの社長様、石井整骨院様", gift: "スポーツドリンク💧" },
    { provider: "丸山農園様", gift: "りんごジュース🍎" },
    { provider: "黒宮のご実家", gift: "ボディメンテ🏃‍♂️" },
    { provider: "OB植松様のご実家", gift: "スイカ🍉、バナナ🍌" },
    { provider: "黒葛原のご実家", gift: "お肉🥩" }
  ];

  const giftImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00001.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00002.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00003.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00004.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00005.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00006.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00007.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00008.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00009.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00010.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00011.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00012.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00013.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00014.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00015.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00016.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00017.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00018.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00019.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00020.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00021.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00022.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00023.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00024.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/07/June-and-July-gifts00025.jpg"
  ];

  const columns = [
    { key: 'provider', header: 'ご提供者' },
    { key: 'gift', header: '差し入れ内容' },
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
      title="6、7月の差し入れ"
      date="2025年7月29日"
    >
      {/* 感謝メッセージ */}
      <NewsHighlight theme="blue" delay={0.2}>
        <div className="text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            皆様からの温かいご支援、ありがとうございます！
          </h2>
        </div>
      </NewsHighlight>

      {/* メッセージセクション */}
      <NewsHighlight theme="gray" delay={0.4}>
        <p className="text-gray-700 leading-relaxed text-center">
          日頃より、日本体育大学陸上競技部 男子駅伝ブロックへのご声援、誠にありがとうございます。6・7 月に下記の方々よりたくさんの差し入れを頂戴いたしました。部員一同、大変美味しくいただき、日々の練習の励みにしております。心より感謝申し上げます。
        </p>
      </NewsHighlight>

      {/* 差し入れ写真ギャラリー */}
      <NewsSection 
        title="差し入れ写真ギャラリー"
        icon={Camera}
        theme="yellow"
        delay={0.5}
      >
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {giftImages.map((imagePath, index) => (
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
                  alt={`差し入れ写真 ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110 image-protection"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
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
                    src={giftImages[selectedImage]}
                    alt={`差し入れ写真 ${selectedImage + 1}`}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
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
                  {selectedImage + 1} / {giftImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </NewsSection>

      {/* 差し入れ一覧セクション */}
      <NewsSection 
        title="6・7月の差し入れ一覧"
        icon={Gift}
        theme="green"
        delay={0.7}
      >
        <ResponsiveTable 
          columns={columns} 
          data={gifts} 
          delay={0.8}
        />
        
        {/* 合計と感謝 */}
        <NewsHighlight theme="green" delay={1.5}>
          <div className="text-center">
            <p className="text-green-800 font-semibold text-lg">
              合計 {gifts.length} 件のご支援をいただきました
            </p>
            <p className="text-green-700 mt-2">
              皆様の温かいご支援が、選手たちの大きな励みとなっております
            </p>
          </div>
        </NewsHighlight>
      </NewsSection>
    </NewsDetailLayout>
  );
}
