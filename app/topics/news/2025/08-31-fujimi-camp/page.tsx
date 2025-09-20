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

export default function FujimiCampPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const campImages = [
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-fujimi-camp00001.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-fujimi-camp00002.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-fujimi-camp00003.jpg",
    "https://nssu-ekiden.com/wp-content/uploads/2025/09/2025-fujimi-camp00004.jpg"
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
      title="富士見全体合宿がスタートしました！"
      date="2025年8月31日"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl mx-auto"
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
            <span className="font-medium">長野県 富士見</span>
          </div>
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>2025年8月31日 〜 2025年9月7日</span>
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
                <h2 className="text-xl font-bold text-gray-800">富士見合宿写真ギャラリー</h2>
              </div>
              <p className="text-gray-600">恵まれた環境でのトレーニングの様子をご覧ください</p>
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
                      alt={`富士見合宿写真 ${index + 1}`}
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
              2025年8月31日より、部員全体での富士見合宿がスタートしました！
              9月7日までの期間、恵まれた環境のもとで日々トレーニングに励みます。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              人も少なく集中しやすい環境で練習できることに感謝し、
              それぞれが高い意識を持って取り組んでいきます。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              これまで各チームで積み重ねてきた取り組みを合わせ、
              相乗効果を生み出せるような合宿にしていきたいと考えています。
              チーム内での良い刺激と連携を通じて、さらなる底上げを図ります。
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              改めてチーム一丸となって、箱根駅伝予選会に向けて準備を進めていきます。
              応援してくださる皆さまへの感謝を胸に、日々の積み重ねを大切にしてまいります。
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
                    src={campImages[selectedImage]}
                    alt={`富士見合宿写真 ${selectedImage + 1}`}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    sizes="(max-width: 768px) 90vw, 1200px"
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


