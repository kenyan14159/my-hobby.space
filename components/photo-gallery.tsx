"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";

const imagePaths = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite308.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite320.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite6.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite283.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite255.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite296.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite170.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite282.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite309.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite189.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite323.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite150.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite294.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite280.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite257.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite281.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite22.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite34.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite326.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite332.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite184.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite35.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite23.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite285.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite291.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite252.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite192.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite253.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite290.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite19.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite327.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite167.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite325.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite1-scaled.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite286.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite171.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite292.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite251.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite279.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite250.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite293.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite318.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite324.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite357.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite343.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite156.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite24.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite32.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite342.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite356.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite368.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite354.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite220.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite176.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite28.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite355.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite341.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite160.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite161.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite345.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite29.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite177.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite218.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite185.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite194.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite157.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite347.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite353.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite181.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite362.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite210.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite30.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite26.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite178.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite154.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite363.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite162.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite349.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite361.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite174.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite158.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite360.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite348.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite364.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite358.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite3.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite159.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite238.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite175.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite239.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite198.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite359.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite365.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite163.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite367.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite155.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite143.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite27.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite31.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite366.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite164.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite329.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite172.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite261.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite275.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite274.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite260.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite4.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite314.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite187.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite168.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite302.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite36.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite20.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite289.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite191.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite276.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite262.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite277.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite288.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite152.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite144.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite317.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite303.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite307.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite313.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite145.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite153.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite298.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite273.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite190.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite272.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite179.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite219.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite249.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite180.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite335.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite351.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite195.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite141.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite330.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite278.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite319.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite151.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite284.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite247.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite295.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite256.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite146.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite166.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite254.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite297.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite299.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite186.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite169.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite306.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite310.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite304.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite149.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite270.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite264.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite258.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite259.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite271.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite265.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite173.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite305.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite165.jpeg"
].filter(path => path.trim() !== ""); // 空の文字列を除去

// Fisher-Yates シャッフルアルゴリズム
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

interface PhotoGalleryProps {
  showTitle?: boolean;
  maxImages?: number;
  images?: string[]; // 外部から画像リストを渡せるようにする
  enableShuffle?: boolean; // シャッフル機能を有効/無効にする
  title?: string; // カスタムタイトル
  subtitle?: string; // カスタムサブタイトル
}

export function PhotoGallery({ 
  showTitle = true, 
  maxImages = 30, 
  images, 
  enableShuffle = true,
  title = "ギャラリー",
  subtitle = "チームの活動を写真で振り返る、思い出深い瞬間の数々"
}: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  
  // 使用する画像リストを決定（propsで渡された場合はそれを使用、なければデフォルト）
  const sourceImages = images || imagePaths;

  // 初回マウント時とシャッフルボタン押下時に画像をシャッフル
  const shuffleImages = useCallback(() => {
    const shuffled = enableShuffle ? shuffleArray(sourceImages) : sourceImages;
    const selectedImages = shuffled.slice(0, maxImages);
    setDisplayImages(selectedImages);
    setSelectedImage(null); // ライトボックスを閉じる
  }, [maxImages, sourceImages, enableShuffle]);

  // 初回マウント時にシャッフル
  useEffect(() => {
    shuffleImages();
  }, [maxImages, shuffleImages]);

  const handlePrevious = useCallback(() => {
    if (selectedImage !== null && displayImages.length > 0) {
      const currentIndex = selectedImage;
      const newIndex = currentIndex > 0 ? currentIndex - 1 : displayImages.length - 1;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, displayImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImage !== null && displayImages.length > 0) {
      const currentIndex = selectedImage;
      const newIndex = currentIndex < displayImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(newIndex);
    }
  }, [selectedImage, displayImages.length]);

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
  }, [selectedImage, displayImages.length, handlePrevious, handleNext]);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <AnimatedPageHeader
            title={title}
            subtitle={subtitle}
            underlineColor="bg-gray-500"
            titleClassName="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight mb-3"
            subtitleClassName="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mt-6"
          />
        )}

        {/* シャッフルボタン */}
        {enableShuffle && (
          <div className="text-center mb-8">
            <Button
              onClick={shuffleImages}
              variant="outline"
              size="lg"
              className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700 px-6 py-3 rounded-xl"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              画像をシャッフル
            </Button>
          </div>
        )}

        <motion.div
          className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          key={displayImages.join(',')} // シャッフル時にアニメーションを再実行
        >
          {displayImages.map((imagePath, index) => (
            <motion.div
              key={`${imagePath}-${index}`}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <Image
                  src={imagePath}
                  alt={`チームフォト ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16.67vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>



        {/* ライトボックス */}
        <AnimatePresence>
          {selectedImage !== null && displayImages.length > 0 && selectedImage < displayImages.length && (
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
                    src={displayImages[selectedImage]}
                    alt={`チームフォト ${selectedImage + 1}`}
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
                  {selectedImage + 1} / {displayImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 