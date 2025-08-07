'use client';

import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function NationalMixedEkidenResult2025() {
  const runnersData = [
    { section: '1区 (男子)', distance: '3km', name: '高村 比呂飛', time: "8:08", rank: '6位', note: 'NSR' },
    { section: '2区 (女子)', distance: '2km', name: '飯田 和代', time: "6:11", rank: '3位', note: 'NSR' },
    { section: '3区 (男子)', distance: '5km', name: '富永 椋太', time: "13:45", rank: '1位', note: 'NSR', _highlight: true },
    { section: '4区 (女子)', distance: '3km', name: '山﨑 りさ', time: "9:21", rank: '2位', note: 'NSR' },
    { section: '5区 (男子)', distance: '2km', name: '分須 尊紀', time: "5:20", rank: '1位タイ', note: 'NSR', _highlight: true },
    { section: '6区 (女子)', distance: '5km', name: '尾方 唯莉', time: "15:42", rank: '1位', note: 'NSR', _highlight: true },
  ];

  const columns = [
    { key: 'section', header: '区間' },
    { key: 'distance', header: '距離' },
    { key: 'name', header: '選手' },
    { key: 'rank', header: '区間順位' },
    { key: 'time', header: '区間記録' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第5回 全国大学対校男女混合駅伝競走大会"
      date="2025年2月16日"
      place="埼玉県熊谷市"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 総合結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Trophy size={20} />} title="総合結果" />
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Medal size={24} />
              <div className="text-3xl font-bold">総合優勝</div>
              <Medal size={24} />
            </div>
            <div className="text-lg mb-2">58分27秒 (大会新)</div>
            <div className="text-sm">日本体育大学</div>
          </div>
        </ResultCard>

        {/* 区間結果 */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Trophy size={20} />} title="区間結果" />
          <ResponsiveTable columns={columns} data={runnersData} delay={0.8} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.0}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">NSR</span>
              <span className="text-sm text-gray-600">日本体育大学記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">大会新</span>
              <span className="text-sm text-gray-600">大会新記録</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 