'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function NiigataHalfResult2025() {
  const athletesData = [
    { name: '佐藤 大和①', time: "1'04\"15", rank: '4着', note: 'PB', isPB: true, _highlight: true },
    { name: '市丸 健太①', time: "1'04\"39", rank: '7着', note: '初' },
    { name: '伊藤 航③', time: "1'04\"42", rank: '9着', note: 'PB', isPB: true },
    { name: '永見 進之介①', time: "1'04\"48", rank: '10着', note: 'PB', isPB: true },
    { name: '大島 脩太②', time: "1'06\"04", rank: '15着', note: 'PB', isPB: true },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="新潟ハーフマラソン"
      date="2025年3月16日"
      place="新潟県"
      gradient="from-gray-50 to-gray-100"
    >
      {/* ハーフマラソン結果 */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Clock size={20} />} title="ハーフマラソン結果" />
        <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
      </ResultCard>

      {/* 凡例 */}
      <ResultCard delay={0.8}>
        <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
            <span className="text-sm text-gray-600">自己新記録</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">初</span>
            <span className="text-sm text-gray-600">初出場</span>
          </div>
        </div>
      </ResultCard>
    </ResultPageLayout>
  );
} 