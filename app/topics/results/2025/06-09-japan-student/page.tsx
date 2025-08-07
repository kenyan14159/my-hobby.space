'use client';

import React from 'react';
import { Trophy, Medal, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function JapanStudentResult2025() {
  const event1500mQualifier = [
    { name: '加藤 大地②', time: "3'51\"07", rank: '8位', note: '' },
  ];

  const event3000mSCFinal = [
    { name: '天瀬 海斗③', time: "8'49\"23", rank: '10位', note: 'PB', isPB: true },
  ];

  const event5000mFinal = [
    { name: '平島 龍斗④', time: "13'42\"84", rank: '3位', note: 'PB', isPB: true, _highlight: true },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第94回日本学生陸上競技対校選手権大会"
      date="2025年6月5日〜8日"
      place="国立競技場"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 1500m 予選 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="1500m 予選 3組目" />
          <ResponsiveTable columns={columns} data={event1500mQualifier} delay={0.6} />
        </ResultCard>

        {/* 3000mSC 決勝 */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Medal size={20} />} title="3000mSC 決勝" />
          <ResponsiveTable columns={columns} data={event3000mSCFinal} delay={0.8} />
        </ResultCard>

        {/* 5000m 決勝 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Trophy size={20} />} title="5000m 決勝" />
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-4">
              <Trophy size={24} />
              <div>
                <div className="text-lg font-semibold">平島 龍斗④</div>
                <div className="text-2xl font-bold">3位入賞！</div>
                <div className="text-sm">13&apos;42&quot;84 (PB)</div>
              </div>
            </div>
          </div>
          <ResponsiveTable columns={columns} data={event5000mFinal} delay={1.0} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.2}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">入賞</span>
              <span className="text-sm text-gray-600">3位以内入賞</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 