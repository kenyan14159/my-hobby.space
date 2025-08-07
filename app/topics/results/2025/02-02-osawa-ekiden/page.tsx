'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function OsawaEkidenResult2025() {
  const runnersData = [
    { section: '1区', distance: '10km', name: '伊藤 航③', time: "29'49", rank: '4位' },
    { section: '2区', distance: '3km', name: '荻野 桂輔①', time: "8'40", rank: '1位', _highlight: true },
    { section: '3区', distance: '8.1075km', name: '大下 翼②', time: "24'37", rank: '2位' },
    { section: '4区', distance: '8.0875km', name: '市丸 健太①', time: "24'07", rank: '1位', _highlight: true },
    { section: '5区', distance: '3km', name: '佐藤 翼①', time: "8'49", rank: '1位', _highlight: true },
    { section: '6区', distance: '5km', name: '樋村 銀河①', time: "14'37", rank: '1位', _highlight: true },
    { section: '7区', distance: '5km', name: '纓坂 倭人②', time: "14'35", rank: '1位', _highlight: true },
  ];

  const columns = [
    { key: 'section', header: '区間' },
    { key: 'distance', header: '距離' },
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '区間順位' },
  ];

  return (
    <ResultPageLayout
      title="第75回大澤駅伝競走大会"
      date="2025年2月2日"
      place="東京都世田谷区"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 総合結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Trophy size={20} />} title="総合結果" />
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-6 text-center">
            <div className="text-sm font-medium mb-2">一般男子の部（42.195km）</div>
            <div className="text-3xl font-bold mb-2">第1位</div>
            <div className="text-lg">2時間05分14秒</div>
          </div>
        </ResultCard>

        {/* 区間結果 */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Trophy size={20} />} title="区間結果" />
          <ResponsiveTable columns={columns} data={runnersData} delay={0.8} />
        </ResultCard>
    </ResultPageLayout>
  );
} 