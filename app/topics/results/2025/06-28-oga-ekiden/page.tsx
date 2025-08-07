'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function OgaEkidenResult2025() {
  const runnersData = [
    { section: '1区', distance: '8.7km', name: '夏見 虹郎①', time: "28'10", rank: '10位' },
    { section: '2区', distance: '6.0km', name: '佐藤 大和②', time: "19'47", rank: '6位' },
    { section: '3区', distance: '8.1km', name: '野手 駈①', time: "23'41", rank: '4位', _highlight: true },
    { section: '4区', distance: '9.2km', name: '加藤 大地②', time: "28'40", rank: '7位' },
    { section: '5区', distance: '7.5km', name: '樋村 銀河②', time: "24'19", rank: '6位' },
    { section: '6区', distance: '11.8km', name: '永見 進之介②', time: "37'08", rank: '6位' },
    { section: '7区', distance: '13.5km', name: '水津 勇人①', time: "42'58", rank: '8位' },
  ];

  const columns = [
    { key: 'section', header: '区間' },
    { key: 'distance', header: '距離' },
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '区間順位' },
  ];

  return (
    <ResultPageLayout
      title="第72回（2025年）全国男鹿駅伝競走大会"
      date="2025年6月28日"
      place="秋田県男鹿市"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 総合結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Trophy size={20} />} title="総合結果" />
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center">
            <div className="text-sm font-medium mb-2">大学の部</div>
            <div className="text-3xl font-bold mb-2">7位</div>
            <div className="text-lg">記録：3時間24分46秒</div>
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