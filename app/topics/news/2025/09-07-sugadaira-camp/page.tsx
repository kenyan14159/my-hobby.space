"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { NewsDetailLayout } from '@/components/news-detail-layout';
import { Mountain, MapPin, Calendar, Flag } from 'lucide-react';

export default function SugadairaCamp0907Page() {
  return (
    <NewsDetailLayout
      title="菅平高原・最後の選抜合宿スタート"
      date="2025年9月7日"
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
              className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full"
            >
              <Mountain className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <div className="flex items-center justify-center text-emerald-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">長野県 菅平高原</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>2025年9月7日 〜</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              箱根駅伝予選会に向けた実践的な強化に取り組みます。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              2025年9月7日より、つばくら館にて最後の選抜合宿を開始しました。
              大会本番を見据え、実戦に直結するメニューを中心に、日々のトレーニングを積み重ねていきます。
              各選手が一つひとつの動作に緊張感を持ち、細部の質にこだわって取り組んでいます。
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              現在、全体チームはトレックレースに向けた準備を、選抜チームは箱根駅伝予選会に向けた最終調整を、
              それぞれ別々の場所で実施しています。役割と目標を明確に分けることで、チーム全体の底上げと個々の完成度向上を同時に狙います。
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              締めくくりの合宿として、練習だけでなく生活面まで気を引き締め、コンディション管理と規律を徹底していきます。
              日々の小さな積み重ねを大切に、最高の状態で本番を迎えられるよう努めます。
            </p>

            <div className="text-center pt-6 border-t border-gray-200">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
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


