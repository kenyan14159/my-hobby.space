'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function KanagawaEkidenResult2025() {
  const exhibitionData = [
    { section: '1区', distance: '10km', name: '天瀬 海斗②', time: "31'04", rank: '1位〈区間新〉', _highlight: true },
    { section: '2区', distance: '3km', name: '水谷 柊斗③', time: "8'48", rank: '1位', _highlight: true },
    { section: '3区', distance: '8.1075km', name: '倉村 空③', time: "25'46", rank: '1位〈区間新〉', _highlight: true },
    { section: '4区', distance: '8.0875km', name: '松本 悠真②', time: "24'30", rank: '1位〈区間新〉', _highlight: true },
    { section: '5区', distance: '3km', name: '近藤 琳太郎①', time: "8'44", rank: '1位', _highlight: true },
    { section: '6区', distance: '5km', name: '岩崎 壮也④', time: "15'35", rank: '2位〈区間新〉' },
    { section: '7区', distance: '5km', name: '小野里 琉生②', time: "15'20", rank: '1位', _highlight: true },
  ];

  const municipalData = [
    { section: '1区', distance: '10km', name: '樋村 銀河①', time: "30'18", rank: '1位', _highlight: true },
  ];

  const columns = [
    { key: 'section', header: '区間' },
    { key: 'distance', header: '距離' },
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '区間順位' },
  ];

  return (
    <ResultPageLayout
      title="第79回市町村対抗かながわ駅伝競走大会"
      date="2025年2月9日"
      place="神奈川県"
      gradient="from-gray-50 to-gray-100"
    >

        {/* エキシビションレース結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Trophy size={20} />} title="エキシビションレース" />
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-6 text-center mb-6">
            <div className="text-sm font-medium mb-2">日本体育大学</div>
            <div className="text-3xl font-bold mb-2">第1位</div>
            <div className="text-lg">2時間09分47秒</div>
          </div>
          <ResponsiveTable columns={columns} data={exhibitionData} delay={0.6} />
        </ResultCard>

        {/* 市町村対抗レース結果 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Clock size={20} />} title="市町村対抗レース: 川崎市" />
          <ResponsiveTable columns={columns} data={municipalData} delay={1.0} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.2}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">区間新</span>
              <span className="text-sm text-gray-600">区間新記録</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 