'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function NSSU319thLongDistanceResult2025() {
  const steeplechaseData = [
    { name: '天瀬 海斗②', time: "8'54\"99", rank: '2着', note: 'PB', isPB: true, _highlight: true },
    { name: '佐藤 輝歩②', time: "9'13\"63", rank: '6着', note: 'PB', isPB: true },
    { name: '佐藤 翼①', time: "9'23\"23", rank: '7着', note: '' },
  ];

  const event1500mData = [
    { group: '3組', name: '花城 欄斗②', time: "3'58\"41", rank: '4着', note: 'PB', isPB: true },
    { group: '4組', name: '田島 駿介③', time: "3'52\"33", rank: '2着', note: 'PB', isPB: true, _highlight: true },
    { group: '4組', name: '加藤 大地①', time: "3'54\"95", rank: '9着', note: 'PB', isPB: true },
  ];

  const event3000m2 = [
    { name: '大竹 雄大③', time: "8'31\"83", rank: '1着', note: 'PB', isPB: true, _highlight: true },
    { name: '中條 隆太②', time: "8'31\"83", rank: '2着', note: 'PB', isPB: true, _highlight: true }
  ];

  const event3000m3 = [
    { name: '小野里 琉生②', time: "8'34\"88", rank: '3着', note: 'PB', isPB: true, _highlight: true },
    { name: '今野 健太 新', time: "8'39\"64", rank: '8着', note: 'PB', isPB: true },
    { name: '水津 勇人 新', time: "8'40\"80", rank: '11着', note: '' }
  ];

  const event3000m4 = [
    { name: '野手 駈 新', time: "8'20\"48", rank: '1着', note: 'PB', isPB: true, _highlight: true },
    { name: '山本 琉生 新', time: "8'34\"45", rank: '12着', note: '' }
  ];

  const event3000m5 = [
    { name: '田島 駿介③', time: "8'04\"18", rank: '3着', note: 'PB', isPB: true, _highlight: true },
    { name: '樋村 銀河①', time: "8'12\"23", rank: '7着', note: 'PB', isPB: true },
    { name: '夏見 虹郎 新', time: "8'14\"80", rank: '10着', note: 'PB', isPB: true }
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  const columns1500m = [
    { key: 'group', header: '組' },
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第319回 日本体育大学長距離競技会"
      date="2025年3月29日〜30日"
      place="日本体育大学健志台キャンパス"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 3000mSC 2組 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="3000mSC 2組" />
          <ResponsiveTable columns={columns} data={steeplechaseData} delay={0.6} />
        </ResultCard>

        {/* 1500m */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Clock size={20} />} title="1500m" />
          <ResponsiveTable columns={columns1500m} data={event1500mData} delay={0.8} />
        </ResultCard>

        {/* 3000m */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Trophy size={20} />} title="3000m" />
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">2組</h4>
              <ResponsiveTable columns={columns} data={event3000m2} delay={1.0} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">3組</h4>
              <ResponsiveTable columns={columns} data={event3000m3} delay={1.2} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">4組</h4>
              <ResponsiveTable columns={columns} data={event3000m4} delay={1.4} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">5組</h4>
              <ResponsiveTable columns={columns} data={event3000m5} delay={1.6} />
            </div>
          </div>
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.8}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">新</span>
              <span className="text-sm text-gray-600">新入生</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 