"use client";

import React from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';
import { NewsDetailLayout } from '@/components/news-detail-layout';

export default function TorchAlinaminPage() {
  return (
    <NewsDetailLayout 
      title="日本体育大学男子駅伝ブロック × アリナミン製薬の取り組みがTORCHに掲載"
      date="2025年10月14日"
    >
      <div className="prose prose-neutral max-w-none text-gray-900">
        <div className="flex items-center gap-2 mb-2">
          <Newspaper className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg text-blue-900">メディア掲載のお知らせ</span>
        </div>

        <p>
          日本体育大学男子駅伝ブロックとアリナミン製薬の取り組みが、スポーツメディア「TORCH（トーチ）」に掲載されました。
        </p>

        <p>
          &ldquo;学生主体&rdquo;で挑む日体大駅伝部の裏側や、アリナミン製薬とのパートナーシップについて詳しく紹介されています。
        </p>

        <p>
          チームの日々の取り組みや選手たちの想いなど、普段見ることのできない貴重な内容となっています。
        </p>

        <div className="flex items-center gap-2 mt-8 mb-2">
          <ExternalLink className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg text-blue-900">記事はこちら</span>
        </div>

        <p>
          記事は以下のリンクからご覧いただけます。
        </p>

        <div className="mt-4 p-6 border-2 border-blue-200 rounded-lg bg-blue-50/50">
          <a 
            href="https://torch-sports.jp/article/pr20251013-alinamin-nittaidai-ekiden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-lg underline"
          >
            <ExternalLink className="w-5 h-5" />
            TORCH掲載記事を読む
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-700">
            引き続き、温かいご声援をよろしくお願いいたします。
          </p>
        </div>
      </div>
    </NewsDetailLayout>
  );
}
