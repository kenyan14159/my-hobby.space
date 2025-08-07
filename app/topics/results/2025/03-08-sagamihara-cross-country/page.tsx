'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function SagamiharaCrossCountryResult2025() {
  const athletesData = [
    { name: '中條 隆太②', time: "26'02", rank: '9着' },
    { name: '今井 結斗①', time: "28'11", rank: '16着' },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
  ];

  return (
    <ResultPageLayout
      title="相模原クロスカントリー大会"
      date="2025年3月8日"
      place="神奈川県相模原市"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 8km結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="8km" />
          <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
        </ResultCard>
    </ResultPageLayout>
  );
} 