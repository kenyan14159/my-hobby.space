'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function NSSULongDistanceResult2025() {
  const event1500m7 = [
    { name: '瀬戸 雅史③', time: "3'55\"25", rank: '12位', note: '' },
  ];

  const event10000m4 = [
    { name: '大竹 雄大④', time: "29'58\"92", rank: '9位', note: '' },
  ];

  const event10000m5 = [
    { name: '樋村 銀河②', time: "29'39\"84", rank: '11位', note: 'PB', isPB: true },
    { name: '市丸 健太②', time: 'DNF', rank: '–', note: '', isPB: false },
  ];

  const event5000m10 = [
    { name: '國井 飛慎②', time: "15'03\"66", rank: '19位', note: '' },
    { name: '佐藤 翼②', time: "15'11\"45", rank: '22位', note: '' },
    { name: '勝又 大介①', time: "15'14\"58", rank: '24位', note: '' },
    { name: '稗村 泰吾①', time: "15'29\"21", rank: '27位', note: '' },
  ];

  const event5000m12 = [
    { name: '永見 進之介②', time: "14'34\"49", rank: '5位', note: 'PB', isPB: true },
    { name: '水津 勇人①', time: "14'45\"79", rank: '11位', note: '' },
    { name: '松本 悠真③', time: "14'47\"49", rank: '16位', note: '' },
    { name: '今野 健太①', time: "14'57\"90", rank: '20位', note: '' },
    { name: '渡辺 和志①', time: "15'14\"97", rank: '33位', note: '' },
  ];

  const event5000m14 = [
    { name: '瀬戸 雅史③', time: "14'23\"32", rank: '4位', note: 'PB', isPB: true },
    { name: '佐藤 輝歩③', time: "14'28\"46", rank: '12位', note: '' },
  ];

  const event5000m19 = [
    { name: '二村 昇太朗④', time: "13'56\"57", rank: '9位', note: 'PB', isPB: true },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第321回日本体育大学長距離競技会"
      subtitle="兼第15回NCG"
      date="2025年5月31日, 6月1日"
      place="日本体育大学健志台キャンパス"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 1500m 7組 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="1500m 7組" />
          <ResponsiveTable columns={columns} data={event1500m7} delay={0.6} />
        </ResultCard>

        {/* 10000m */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Trophy size={20} />} title="10000m" />
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">4組</h4>
              <ResponsiveTable columns={columns} data={event10000m4} delay={0.8} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">5組</h4>
              <ResponsiveTable columns={columns} data={event10000m5} delay={1.0} />
            </div>
          </div>
        </ResultCard>

        {/* 5000m */}
        <ResultCard delay={1.2}>
          <SectionHeader icon={<Clock size={20} />} title="5000m" />
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">10組</h4>
              <ResponsiveTable columns={columns} data={event5000m10} delay={1.4} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">12組</h4>
              <ResponsiveTable columns={columns} data={event5000m12} delay={1.6} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">14組</h4>
              <ResponsiveTable columns={columns} data={event5000m14} delay={1.8} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">19組</h4>
              <ResponsiveTable columns={columns} data={event5000m19} delay={2.0} />
            </div>
          </div>
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={2.2}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">DNF</span>
              <span className="text-sm text-gray-600">途中棄権</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 