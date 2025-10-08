'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function Tokai0928ResultPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite1.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite2.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite3.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite4.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite5.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite6.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite7.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite8.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite9.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite10.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite11.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite12.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite13.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite14.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite15.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite16.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite17.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite18.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite19.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/240-tokai-favorite20.jpeg",
  ];
  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  const data3000mHeat8 = [
    { name: '佐藤 輝歩③', time: "8'28\"04", rank: '1着', note: '' },
    { name: '安田 大翔②', time: "8'30\"35", rank: '2着', note: '' },
    { name: '中川 絢太②', time: "8'36\"69", rank: '5着', note: '' },
    { name: '小野里 琉生③', time: "8'38\"00", rank: '6着', note: '' },
    { name: '勝又 大介①', time: "8'38\"41", rank: '8着', note: '' },
    { name: '近藤 琳太郎②', time: "8'40\"39", rank: '10着', note: '' },
    { name: '渡邊 晄月①', time: "8'44\"35", rank: '14着', note: '' },
    { name: '野村 汰輝①', time: '—', rank: '', note: 'DNF', _className: 'bg-red-50' },
  ];

  const data3000mHeat9 = [
    { name: '佐々木 快斗①', time: "8'23\"21", rank: '2着', note: '' },
    { name: '花城 欄斗③', time: "8'25\"49", rank: '3着', note: '' },
    { name: '村上 愛祈①', time: "8'27\"05", rank: '5着', note: '' },
    { name: '山本 琉生①', time: "8'27\"91", rank: '7着', note: '' },
    { name: '佐藤 翼②', time: "8'30\"81", rank: '9着', note: '' },
    { name: '池田 優也③', time: "8'34\"62", rank: '11着', note: '' },
    { name: '大宮 健治①', time: "8'34\"91", rank: '12着', note: '' },
    { name: '纓坂 倭人③', time: "8'39\"69", rank: '14着', note: '' },
    { name: '稗村 泰吾①', time: "8'43\"80", rank: '17着', note: '' },
    { name: '阿知和 優汰③', time: "8'47\"21", rank: '21着', note: '' },
  ];

  return (
    <ResultPageLayout
      title="第240回東海大学長距離競技会"
      date="2025年9月28日"
      place="東海大学湘南校舎 陸上競技場"
      gradient="from-gray-50 to-gray-100"
    >
      {/* フォトギャラリー */}
      <div className="mb-8">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Camera className="w-6 h-6 text-gray-700 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">フォトギャラリー</h2>
            </div>
            <p className="text-gray-600">大会当日のスナップショット</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((imagePath, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <Image
                    src={imagePath}
                    alt={`大会写真 ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 男子3000m 8組 */}
      <ResultCard delay={0.2}>
        <SectionHeader icon={<Clock size={20} />} title="男子3000m 8組" />
        <ResponsiveTable columns={columns} data={data3000mHeat8} delay={0.3} />
      </ResultCard>

      {/* 男子3000m 9組 */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Clock size={20} />} title="男子3000m 9組" />
        <ResponsiveTable columns={columns} data={data3000mHeat9} delay={0.5} />
      </ResultCard>
      {/* ライトボックス */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={galleryImages[selectedImage]}
                alt={`大会写真 ${selectedImage + 1}`}
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
              onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev !== null ? (prev > 0 ? prev - 1 : galleryImages.length - 1) : prev)); }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev !== null ? (prev < galleryImages.length - 1 ? prev + 1 : 0) : prev)); }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </ResultPageLayout>
  );
}


