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

export default function SummerCampEndPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp1.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp2.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp3.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp4.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp5.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp6.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp7.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp8.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp9.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp10.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp11.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp12.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp13.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp14.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp15.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp16.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp17.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp18.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp19.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp20.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp21.jpeg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp22.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-summer-camp23.jpg"
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

  return (
    <NewsDetailLayout
      title="今夏の合宿をすべて終了しました"
      date="2025年9月20日"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full"
            >
              <Mountain className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <div className="flex items-center justify-center text-emerald-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">富士見・黒姫・菅平（三拠点）</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>2025年9月20日</span>
          </div>
        </div>

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
                <h2 className="text-xl font-bold text-gray-800">夏合宿フォトギャラリー</h2>
              </div>
              <p className="text-gray-600">三拠点での取り組みと成長の記録</p>
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
                      alt={`夏合宿写真 ${index + 1}`}
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

        <div className="prose prose-lg max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              2025年9月20日をもちまして、今夏の合宿をすべて終了しました。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              富士見・黒姫・菅平の三拠点での取り組みを通じて、走力の土台づくりと実戦強度の両面を着実に強化。
              日々の規律とコンディション管理を徹底し、個々の課題に向き合いながら、チームとしての一体感も一段と高まりました。
              月間1000kmを走破した選手も例年以上に多く、量と質の双方で充実した夏となりました。
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              ここからはトラックレース、そして箱根駅伝予選会に向けて仕上げの段階に入ります。
              応援してくださる皆さまへの感謝を胸に、引き続き一つひとつの積み重ねを大切に、最高の準備を進めてまいります。
            </p>

            <div className="text-center pt-6 border-t border-gray-200">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                <Flag className="w-5 h-5" />
                <span>日本体育大学駅伝部</span>
              </div>
            </div>
          </motion.div>
        </div>

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
                    alt={`夏合宿写真 ${selectedImage + 1}`}
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


