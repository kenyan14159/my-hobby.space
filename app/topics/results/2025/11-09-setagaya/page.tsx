'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function Setagaya246HalfResult2025() {
  const athletesData = [
    { name: '大宮 健治①', time: "1'05\"49", rank: '49位', note: '初' },
    { name: '近藤 琳太郎②', time: "1'05\"49", rank: '50位', note: '',},
    { name: '大下 翼③', time: "1'05\"55", rank: '51位', note: '' },
    { name: '花城 欄斗③', time: "1'06\"18", rank: '58位', note: '初' },
    { name: '池田 優也③', time: "1'06\"25", rank: '59位', note: 'PB', isPB: true },
    { name: '中條 隆太③', time: "1'06\"29", rank: '64位', note: '初' },
    { name: '纓坂 倭人③', time: "1'06\"40", rank: '65位', note: '初' },
    { name: '佐藤 翼②', time: "1'06\"58", rank: '67位', note: 'PB', isPB: true },
    { name: '佐々木 快斗①', time: "1'07\"05", rank: '68位', note: '初' },
    { name: '稗村 泰吾①', time: "1'07\"28", rank: '71位', note: '初' },
    { name: '安田 大翔②', time: "1'08\"33", rank: '78位', note: '初' },
    { name: '小野里 琉生③', time: "1'09\"51", rank: '82位', note: 'PB', isPB: true },
    { name: '勝又 大介①', time: "1'10\"07", rank: '90位', note: '初' },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第20回世田谷246ハーフマラソン"
      date="2025年11月9日"
      place="東京都世田谷区"
      gradient="from-gray-50 to-gray-100"
    >
      {/* ハーフマラソン結果 */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Clock size={20} />} title="ハーフマラソン結果" />
        <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
      </ResultCard>
    </ResultPageLayout>
  );
}

