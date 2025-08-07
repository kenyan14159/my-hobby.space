'use client';

import React from 'react';
import { Trophy, Clock, Medal, Award } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function NSSU320thLongDistanceResult2025() {
  const event1500m2 = [
    { name: '佐藤 輝歩（③）', time: "4'03\"75", rank: '1位', note: '', isFirst: true },
    { name: '西坂 侑（④）', time: "4'05\"01", rank: '3位', note: '' },
  ];

  const event1500m3 = [
    { name: '天瀬 海斗（③）', time: "3'58\"15", rank: '1位', note: 'PB', isFirst: true, isPB: true },
  ];

  const event1500m4 = [
    { name: '西坂 侑（④）', time: "4'02\"77", rank: '6位', note: '' },
    { name: '佐藤 輝歩（③）', time: "4'02\"24", rank: '20位', note: '' },
  ];

  const event1500m5 = [
    { name: '天瀬 海斗（③）', time: "4'18\"66", rank: '23位', note: '' },
  ];

  const event1500m8 = [
    { name: '加藤 大地（②）', time: "3'47\"85", rank: '1位', note: 'PB', isFirst: true, isPB: true },
  ];

  const event10000m8 = [
    { name: '犬童 慧真（④）', time: "29'31\"00", rank: '11位', note: 'PB', isPB: true },
    { name: '樋村 銀河（②）', time: "29'46\"99", rank: '18位', note: 'PB', isPB: true },
    { name: '吉田 黎大（③）', time: "30'04\"23", rank: '24位', note: '' },
  ];

  const event5000m7 = [
    { name: '佐藤 翼（②）', time: "14'54\"94", rank: '7位', note: '' },
    { name: '佐々木快斗（①）', time: "14'59\"28", rank: '10位', note: 'PB', isPB: true },
    { name: '村上 愛祈（①）', time: "15'00\"97", rank: '11位', note: '' },
    { name: '平木 仁（①）', time: "15'13\"42", rank: '19位', note: '' },
    { name: '小野里 琉生（③）', time: "15'36\"49", rank: '33位', note: '' },
  ];

  const event5000m8 = [
    { name: '吉岡 斗真（②）', time: "14'40\"33", rank: '1位', note: '', isFirst: true },
    { name: '水津 勇人（①）', time: "14'47\"63", rank: '2位', note: '' },
    { name: '荻野 桂輔（②）', time: "14'56\"24", rank: '10位', note: '' },
    { name: '大下 翼（③）', time: "15'05\"98", rank: '16位', note: '' },
    { name: '今野 健太（①）', time: "15'14\"50", rank: '20位', note: '' },
  ];

  const event5000m11 = [
    { name: '市丸 健太（②）', time: "14'39\"78", rank: '6位', note: '' },
    { name: '山本 琉生（①）', time: "14'43\"53", rank: '11位', note: '' },
  ];

  const event5000m13 = [
    { name: '佐藤 大和（②）', time: "14'09\"99", rank: '2位', note: 'PB', isPB: true },
    { name: '二村 昇太朗（④）', time: "14'20\"37", rank: '12位', note: '' },
  ];

  const columns = [
    { key: 'name', header: '選手（学年）' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第320回日本体育大学長距離競技会・第14回NCG"
      date="2025年4月26日〜27日"
      place="日本体育大学健志台キャンパス"
      gradient="from-gray-50 to-gray-100"
    >
        {/* 1500m 種目 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="1500m" />
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">2組</h4>
              <ResponsiveTable columns={columns} data={event1500m2} delay={0.6} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">3組</h4>
              <ResponsiveTable columns={columns} data={event1500m3} delay={0.8} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">4組</h4>
              <ResponsiveTable columns={columns} data={event1500m4} delay={1.0} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">5組</h4>
              <ResponsiveTable columns={columns} data={event1500m5} delay={1.2} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">8組</h4>
              <ResponsiveTable columns={columns} data={event1500m8} delay={1.4} />
            </div>
          </div>
        </ResultCard>

        {/* 10000m 種目 */}
        <ResultCard delay={1.6}>
          <SectionHeader icon={<Trophy size={20} />} title="10000m" />
          
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">8組</h4>
            <ResponsiveTable columns={columns} data={event10000m8} delay={1.8} />
          </div>
        </ResultCard>

        {/* 5000m 種目 */}
        <ResultCard delay={2.0}>
          <SectionHeader icon={<Medal size={20} />} title="5000m" />
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">7組</h4>
              <ResponsiveTable columns={columns} data={event5000m7} delay={2.2} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">8組</h4>
              <ResponsiveTable columns={columns} data={event5000m8} delay={2.4} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">11組</h4>
              <ResponsiveTable columns={columns} data={event5000m11} delay={2.6} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">13組</h4>
              <ResponsiveTable columns={columns} data={event5000m13} delay={2.8} />
            </div>
          </div>
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={3.0}>
          <SectionHeader icon={<Award size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">1位</span>
              <span className="text-sm text-gray-600">組優勝</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-silver-100 text-silver-800">2位</span>
              <span className="text-sm text-gray-600">組準優勝</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 