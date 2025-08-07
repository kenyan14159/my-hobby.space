'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function NSSUTrackResult2025() {
  const athletesData = [
    { name: '平島 龍斗④', time: '29\'28"17', note: 'PM', isPB: false },
    { name: '加藤 大地②', time: '29\'45"89', note: '初', isPB: false },
    { name: '天瀬 海斗③', time: '29\'56"89', note: '', isPB: false },
    { name: '瀬戸 雅史③', time: '30\'17"28', note: '', isPB: false },
    { name: '大竹 雄大④', time: '30\'42"87', note: '', isPB: false },
    { name: '松本 悠真③', time: '30\'45"09', note: 'PB', isPB: true, _highlight: true },
    { name: '國井 飛慎②', time: '30\'54"03', note: '', isPB: false },
    { name: '二村 昇太朗④', time: '30\'59"00', note: 'PM', isPB: false },
    { name: '佐藤 輝歩③', time: '31\'09"30', note: '', isPB: false },
    { name: '水津 勇人①', time: '31\'31"81', note: '初', isPB: false },
    { name: '近藤 琳太郎②', time: '31\'49"13', note: '', isPB: false },
    { name: '今野 健太①', time: '31\'49"74', note: '初', isPB: false },
    { name: '佐藤 翼②', time: '32\'07"17', note: '', isPB: false },
    { name: '池田 優也③', time: '32\'14"03', note: '', isPB: false },
    { name: '勝又 大介①', time: '32\'14"62', note: '初', isPB: false },
    { name: '稗村 泰吾①', time: '32\'30"74', note: '初', isPB: false },
    { name: '花城 欄斗③', time: '32\'34"02', note: '初', isPB: false },
    { name: '渡邊 晄月①', time: '33\'09"57', note: '初', isPB: false },
    { name: '野手 駈①', time: '6000mまで', note: 'DNF', isPB: false, _className: 'bg-red-50' },
    { name: '夏見 虹郎①', time: '6000mまで', note: 'DNF', isPB: false, _className: 'bg-red-50' },
    { name: '荻野 桂輔②', time: '6000mまで', note: 'DNF', isPB: false, _className: 'bg-red-50' },
    { name: '樋村 銀河②', time: '6000mまで', note: 'PM', isPB: false, _className: 'bg-red-50' },
    { name: '佐藤 大和②', time: '6000mまで', note: 'PM', isPB: false, _className: 'bg-red-50' },
    { name: '山崎 丞④', time: '6000mまで', note: 'PM', isPB: false, _className: 'bg-red-50' },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第151回日本体育大学陸上競技会"
      date="2025年6月21日"
      place="日本体育大学健志台キャンパス"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 10000m結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="10000m" />
          <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Clock size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">初</span>
              <span className="text-sm text-gray-600">初出場</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">PM</span>
              <span className="text-sm text-gray-600">ペースメーカー</span>
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