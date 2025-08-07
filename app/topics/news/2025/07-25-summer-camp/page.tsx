"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  MapPin,
  Calendar,
  Flag
} from 'lucide-react';
import { NewsDetailLayout } from '@/components/news-detail-layout';

export default function SummerCampPage() {
  return (
    <NewsDetailLayout
      title="夏合宿がスタートしました！"
      date="2025年7月25日"
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
              className="bg-gradient-to-r from-blue-500 to-sky-500 p-3 rounded-full"
            >
              <Mountain className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <div className="flex items-center justify-center text-sky-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">富士見高原</span>
          </div>
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>2025年7月25日より開始</span>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="prose prose-lg max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              2025年7月25日より、選抜メンバーによる富士見高原での合宿が始まりました！
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              高地トレーニングの環境を活かし、チーム一丸となって練習に励んでいます。標高の高い環境での練習により、心肺機能の向上と持久力の強化を図っています。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              これから私たちが目指すのは、箱根駅伝予選会での10位以内入賞による本選出場権獲得、箱根駅伝でのシード権獲得、そして全日本大学駅伝でのシード権獲得です。この大きな目標に向かって、全員が一致団結して取り組んでいます。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              8月2日からは、信濃町の野尻湖にて全体合宿も予定しています。美しい自然環境の中で、さらなるチーム力向上を図ります。野尻湖の清らかな水と周囲の山々に囲まれた環境で、集中した練習を行います。
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              チーム全員で目標達成に向けて全力で頑張って参ります。皆様の温かいご声援とサポートを、どうぞよろしくお願いいたします！
            </p>

            {/* 署名部分 */}
            <div className="text-center pt-6 border-t border-gray-200">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                <Flag className="w-5 h-5" />
                <span>日本体育大学駅伝部</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </NewsDetailLayout>
  );
} 