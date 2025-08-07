'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function KagawaMarugameHalfResult2025() {
  const athletesData = [
    { name: '富永 椋太④', time: "1:00'56", rank: '11着', note: '日体大記録', isPB: true, _highlight: true },
    { name: '平島 龍斗③', time: "1:01'02", rank: '13着', note: '日体大記録', isPB: true, _highlight: true },
    { name: '田島 駿介③', time: "1:02'04", rank: '48着', note: '', isPB: true },
    { name: '住原 聡太④', time: "1:02'19", rank: '58着', note: '', isPB: false },
    { name: '分須 尊紀④', time: "1:02'39", rank: '70着', note: '', isPB: false },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第77回香川丸亀国際ハーフマラソン"
      subtitle="第28回日本学生ハーフマラソン選手権大会"
      date="2025年2月2日"
      place="香川県丸亀市"
    >

        {/* 結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="ハーフマラソン結果" />
          <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">大学記録</span>
              <span className="text-sm text-gray-600">日本体育大学記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">U20日本記録</span>
              <span className="text-sm text-gray-600">U20日本記録</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 