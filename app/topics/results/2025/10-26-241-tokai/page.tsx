'use client';

import React, { useState } from 'react';
import { Clock, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function Tokai1026ResultPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai1.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai2.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai3.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai4.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai5.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai6.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai7.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai8.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai9.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai10.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai11.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai12.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai13.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/10/241-tokai14.jpg",
  ];

  const columns = [
    { key: 'name', header: '選手名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  const data10000m = [
    { name: '天瀬 海斗③', time: "29'57\"12", rank: '3着', note: '' },
    { name: '佐藤 輝歩③', time: "30'19\"59", rank: '7着', note: '' },
    { name: '松本 悠真③', time: "30'30\"39", rank: '10着', note: 'PB', isPB: true },
    { name: '山本 琉生①', time: "30'47\"37", rank: '14着', note: '' },
    { name: '鳥羽 恭平①', time: "31'03\"53", rank: '17着', note: '初' },
    { name: '西坂 侑④', time: "31'13\"75", rank: '18着', note: '' },
    { name: '中辻 健斗②', time: "31'19\"45", rank: '20着', note: '初' },
    { name: '倉村 空④', time: "31'31\"58", rank: '21着', note: '' },
    { name: '大下 翼③', time: "31'43\"09", rank: '23着', note: '' },
  ];

  return (
    <ResultPageLayout
      title="第241回東海大学長距離競技会"
      date="2025年10月26日"
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

      {/* 男子10000m */}
      <ResultCard delay={0.2}>
        <SectionHeader icon={<Clock size={20} />} title="男子10000m" />
        <ResponsiveTable columns={columns} data={data10000m} delay={0.3} />
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

