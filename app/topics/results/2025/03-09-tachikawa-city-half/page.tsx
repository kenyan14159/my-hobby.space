'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function TachikawaHalfResult2025() {
  const athletesData = [
    { name: '大下 翼②', time: "1'05\"07", rank: '97着', note: '🌟' },
    { name: '近藤 琳太郎①', time: "1'05\"49", rank: '146着', note: '初' },
    { name: '松本 悠真②', time: "1'05\"54", rank: '152着', note: '🌟' },
    { name: '佐藤 輝歩②', time: "1'06\"11", rank: '171着', note: '' },
    { name: '水谷 柊斗③', time: "1'06\"21", rank: '181着', note: '🌟' },
    { name: '倉村 空③', time: "1'06\"57", rank: '202着', note: '' },
    { name: '花城 欄斗②', time: "1'07\"14", rank: '232着', note: '初' },
    { name: '阿知和 優汰②', time: "1'07\"57", rank: '280着', note: '🌟' },
    { name: '伊藤 航③', time: "1'08\"17", rank: '302着', note: '初' },
    { name: '佐藤 翼①', time: "1'08\"37", rank: '317着', note: '初' },
    { name: '永見 進之介①', time: "1'08\"39", rank: '320着', note: '初' },
    { name: '西坂 侑③', time: "1'08\"59", rank: '331着', note: '' },
    { name: '大竹 雄大③', time: "1'11\"46", rank: '429着', note: '' },
    { name: '加藤 大地①', time: "1'11\"48", rank: '432着', note: '初' },
    { name: '池田 優也②', time: "1'12\"42", rank: '462着', note: '初' },
    { name: '池沢 悠矢③', time: "1'13\"05", rank: '475着', note: '' },
    { name: '小野里 琉生②', time: "1'13\"43", rank: '483着', note: '初' },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="立川シティハーフマラソン"
      date="2025年3月9日"
      place="東京都立川市"
      gradient="from-gray-50 to-gray-100"
    >

        {/* ハーフマラソン結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="ハーフマラソン結果" />
          <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">記録</span>
              <span className="text-sm text-gray-600">注目記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">初</span>
              <span className="text-sm text-gray-600">初出場</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 