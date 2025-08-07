'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function Adizero5KResult2025() {
  const athletesData = [
    { name: '池沢 悠矢④', time: "14'21", rank: '62着' },
    { name: '倉村 空④', time: "14'46", rank: '99着' },
    { name: '西坂 侑④', time: "14'49", rank: '105着' },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
  ];

  return (
    <ResultPageLayout
      title="ADIZERO 5K OFFICIAL RACE"
      subtitle="アディゼロ 5Kオフィシャルレース"
      date="2025年4月13日"
      gradient="from-gray-50 to-gray-100"
    >
      {/* 5K結果 */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Clock size={20} />} title="5K結果" />
        <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
      </ResultCard>
    </ResultPageLayout>
  );
} 