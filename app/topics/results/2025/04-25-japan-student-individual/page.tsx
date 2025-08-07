'use client';

import React from 'react';
import { Trophy, Clock, Users } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function JapanStudentIndividualResult2025() {
  const event10000m = [
    { name: '山崎 丞④', time: "29'00\"16", rank: '4位', note: '' },
    { name: '平島 龍斗④', time: "29'02\"17", rank: '9位', note: '' },
    { name: '田島 駿介④', time: 'DNS', rank: 'DNS', note: '', isDNS: true },
  ];

  const columns = [
    { key: 'name', header: '氏名（学年）' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
  ];

  return (
    <ResultPageLayout
      title="2025日本学生陸上競技個人選手権大会"
      date="2025年4月25日"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 10000m 結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Trophy size={20} />} title="男子 10000m" />
          <ResponsiveTable columns={columns} data={event10000m} delay={0.6} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Users size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">DNS</span>
              <span className="text-sm text-gray-600">Did Not Start（欠場）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">4位</span>
              <span className="text-sm text-gray-600">入賞圏内</span>
            </div>
          </div>
        </ResultCard>

        {/* 大会概要 */}
        <ResultCard delay={1.0}>
          <SectionHeader icon={<Clock size={20} />} title="大会概要" />
          <div className="space-y-4 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-green-700">大会名</h4>
                <p>2025日本学生陸上競技個人選手権大会</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-green-700">開催日</h4>
                <p>2025年4月25日</p>
              </div>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 