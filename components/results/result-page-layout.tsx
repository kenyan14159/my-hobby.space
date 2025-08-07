'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ResultPageLayoutProps {
  /** 大会名 (メインタイトル) */
  title: string;
  /** サブタイトル (大会の別名や併催大会名など) */
  subtitle?: string;
  /** 開催日 (YYYY年MM月DD日 など自由形式) */
  date?: string;
  /** 開催地 */
  place?: string;
  /** 背景グラデーション (Tailwind の from- / to- クラスを想定) */
  gradient?: string;
  /** ページ固有の表示内容 (テーブルやカードなど) */
  children: React.ReactNode;
}

/**
 * 成績ページ共通レイアウト。
 * ヘッダ (タイトル・日付・場所) と背景グラデーション、
 * アニメーション付きのコンテナをまとめて提供する。
 */
export default function ResultPageLayout({
  title,
  subtitle,
  date,
  place,
  gradient = 'from-gray-50 to-gray-100',
  children,
}: ResultPageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} py-16`}>
      <motion.div
        className="container mx-auto px-4 max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ヘッダー */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          {subtitle && <h2 className="text-lg md:text-xl text-gray-600 mb-4">{subtitle}</h2>}

          {(date || place) && (
            <div className="flex items-center justify-center gap-6 text-gray-600 text-sm">
              {date && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{date}</span>
                </div>
              )}
              {place && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{place}</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {children}

        {/* 戻るボタン */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link
            href="/topics/results"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            <ArrowLeft size={18} />
            リザルト一覧へ戻る
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 