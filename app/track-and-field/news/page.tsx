"use client";

import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackFieldQuickAccess } from "@/components/track-field-quick-access";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ImageModal } from "@/components/bulletin-board/image-modal";

const newsList = [
  {
    title: "第109回日本陸上競技選手権大会",
    date: "2025-07-04",
    category: "リザルト",
    images: [
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/第109回日本陸上競技選手権大会00001.png",
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/第109回日本陸上競技選手権大会00002.png"
    ]
  },
  {
    title: "第94回日本学生陸上競技対校選手権大会",
    date: "2025-06-05",
    category: "リザルト",
    images: [
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/第94回日本学生陸上競技対校選手権大会00001.png",
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/第94回日本学生陸上競技対校選手権大会00002.png"
    ]
  },
  {
    title: "関東学生陸上競技対校選手権大会",
    date: "2025-05-08",
    category: "リザルト",
    images: [
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/関東学生陸上競技対校選手権大会00001.png",
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/関東学生陸上競技対校選手権大会00002.png"
    ]
  },
  {
    title: "日本学生陸上競技個人選手権大会",
    date: "2025-04-25",
    category: "リザルト",
    images: [
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/日本学生陸上競技個人選手権大会00001.png",
      "https://nssu-ekiden.com/wp-content/uploads/2025/07/日本学生陸上競技個人選手権大会00002.png"
    ]
  },
];

export default function TrackAndFieldNewsPage() {
  // 画像表示状態を管理（各ニュースごとに）
  const [openImages, setOpenImages] = useState<{ [key: number]: boolean }>({});
  // モーダルで表示する画像のURL
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleToggleImages = (idx: number) => {
    setOpenImages((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleImageClick = (img: string) => {
    setModalImage(img);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: 'ニュース' }]} />
      </div>
      <AnimatedPageHeader title="ニュース" subtitle="News" />
      
      {/* クイックアクセスボタン */}
      <TrackFieldQuickAccess />
      
      <section className="mt-8 space-y-6">
        {newsList.map((item, idx) => (
          <Card key={item.title + item.date} className="hover:shadow-md transition-shadow">
            <CardContent className="py-5 px-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline">{item.category}</Badge>
                <span className="text-xs text-gray-500">{item.date.replace(/-/g, "/")}</span>
              </div>
              <h2 className="text-lg font-bold text-blue-900 mb-3">
                {item.title}
              </h2>
              <button
                className="mb-3 px-4 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
                onClick={() => handleToggleImages(idx)}
              >
                {openImages[idx] ? "結果を隠す" : "結果を見る"}
              </button>
              {openImages[idx] && (
                <div className="flex flex-col gap-4">
                  {item.images.map((img, imgIdx) => (
                    <div
                      key={img}
                      className="w-full relative aspect-[4/3] bg-gray-100 rounded overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(img)}
                    >
                      <Image
                        src={img}
                        alt={item.title + ` 結果画像${imgIdx + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </section>
      {/* モーダル表示 */}
      <ImageModal src={modalImage ?? ""} isOpen={!!modalImage} onClose={handleCloseModal} />
    </main>
  );
} 