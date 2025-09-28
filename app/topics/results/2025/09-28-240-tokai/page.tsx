'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function Tokai0928ResultPage() {
  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  const data3000mHeat8 = [
    { name: '佐藤 輝歩③', time: "8'28\"04", rank: '1着', note: '' },
    { name: '安田 大翔②', time: "8'30\"35", rank: '2着', note: '' },
    { name: '中川 絢太②', time: "8'36\"69", rank: '5着', note: '' },
    { name: '小野里 琉生③', time: "8'38\"00", rank: '6着', note: '' },
    { name: '勝又 大介①', time: "8'38\"41", rank: '8着', note: '' },
    { name: '近藤 琳太郎②', time: "8'40\"39", rank: '10着', note: '' },
    { name: '渡邊 晄月①', time: "8'44\"35", rank: '14着', note: '' },
    { name: '野村 汰輝①', time: '—', rank: '', note: 'DNF', _className: 'bg-red-50' },
  ];

  const data3000mHeat9 = [
    { name: '佐々木 快斗①', time: "8'23\"21", rank: '2着', note: '' },
    { name: '花城 欄斗③', time: "8'25\"49", rank: '3着', note: '' },
    { name: '村上 愛祈①', time: "8'27\"05", rank: '5着', note: '' },
    { name: '山本 琉生①', time: "8'27\"91", rank: '7着', note: '' },
    { name: '佐藤 翼②', time: "8'30\"81", rank: '9着', note: '' },
    { name: '池田 優也③', time: "8'34\"62", rank: '11着', note: '' },
    { name: '大宮 健治①', time: "8'34\"91", rank: '12着', note: '' },
    { name: '纓坂 倭人③', time: "8'39\"69", rank: '14着', note: '' },
    { name: '稗村 泰吾①', time: "8'43\"80", rank: '17着', note: '' },
    { name: '阿知和 優汰③', time: "8'47\"21", rank: '21着', note: '' },
  ];

  return (
    <ResultPageLayout
      title="第240回東海大学長距離競技会"
      date="2025年9月28日"
      place="東海大学湘南校舎 陸上競技場"
      gradient="from-gray-50 to-gray-100"
    >
      {/* 男子3000m 8組 */}
      <ResultCard delay={0.2}>
        <SectionHeader icon={<Clock size={20} />} title="男子3000m 8組" />
        <ResponsiveTable columns={columns} data={data3000mHeat8} delay={0.3} />
      </ResultCard>

      {/* 男子3000m 9組 */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Clock size={20} />} title="男子3000m 9組" />
        <ResponsiveTable columns={columns} data={data3000mHeat9} delay={0.5} />
      </ResultCard>
    </ResultPageLayout>
  );
}


