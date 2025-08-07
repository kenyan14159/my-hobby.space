'use client';

import React from 'react';
import { Trophy, Clock, Medal, Award, Users } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function HoseiUniversityResult2025() {
  const event1500m2 = [
    { name: '花城 欄斗（③）', time: "3'58\"26", rank: '12位', note: 'PB', isPB: true },
    { name: '荻野 桂輔（②）', time: "3'59\"60", rank: '16位', note: '' },
    { name: '渡辺 和志（①）', time: "4'06\"87", rank: '17位', note: '' },
    { name: '佐藤 翼（②）', time: "4'09\"02", rank: '19位', note: '' },
  ];

  const event1500m3_tamagawa = [
    { name: '加藤 大地（②）', time: "3'51\"46", rank: '2位', note: 'PB', isPB: true, isSecond: true },
    { name: '佐々木 快斗（①）', time: "4'05\"45", rank: '16位', note: '' },
  ];

  const event3000mSC3_tamagawa = [
    { name: '西坂 侑（④）', time: "9'07\"17", rank: '6位', note: '' },
    { name: '佐藤 輝歩（③）', time: "9'07\"53", rank: '7位', note: 'PB', isPB: true },
  ];

  const event5000m2_tamagawa = [
    { name: '樋村 銀河（②）', time: "14'20\"82", rank: '12位', note: 'PB', isPB: true },
  ];

  const columns = [
    { key: 'name', header: '選手（学年）' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第86回 法政大学競技会"
      date="2025年4月19日"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 1500m 2組 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="1500m 2組" />
          <ResponsiveTable columns={columns} data={event1500m2} delay={0.6} />
        </ResultCard>

        {/* 1500m 3組（多摩川会） */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Users size={20} />} title="1500m 3組（多摩川会）" />
          <ResponsiveTable columns={columns} data={event1500m3_tamagawa} delay={1.0} />
        </ResultCard>

        {/* 3000mSC 3組（多摩川会） */}
        <ResultCard delay={1.2}>
          <SectionHeader icon={<Trophy size={20} />} title="3000mSC 3組（多摩川会）" />
          <ResponsiveTable columns={columns} data={event3000mSC3_tamagawa} delay={1.4} />
        </ResultCard>

        {/* 5000m 2組（多摩川会） */}
        <ResultCard delay={1.6}>
          <SectionHeader icon={<Medal size={20} />} title="5000m 2組（多摩川会）" />
          <ResponsiveTable columns={columns} data={event5000m2_tamagawa} delay={1.8} />
        </ResultCard>

        {/* ハイライト */}
        <ResultCard delay={2.0}>
          <SectionHeader icon={<Award size={20} />} title="大会ハイライト" />
          <div className="space-y-4 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-indigo-700">PB更新多数</h4>
                <p>花城選手（1500m）、加藤選手（1500m）、佐藤輝歩選手（3000mSC）、樋村選手（5000m）の4名がパーソナルベストを更新しました。</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-indigo-700">加藤選手好走</h4>
                <p>加藤大地選手が1500m多摩川会組で2位入賞とパーソナルベスト更新の素晴らしい走りを見せました。</p>
              </div>
            </div>
          </div>
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={2.2}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-silver-100 text-silver-800">2位</span>
              <span className="text-sm text-gray-600">準優勝</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">多摩川会</span>
              <span className="text-sm text-gray-600">多摩川長距離記録会</span>
            </div>
          </div>
        </ResultCard>

        {/* 大会概要 */}
        <ResultCard delay={2.4}>
          <SectionHeader icon={<Clock size={20} />} title="大会概要" />
          <div className="space-y-4 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-indigo-700">大会名</h4>
                <p>第86回 法政大学競技会</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-indigo-700">開催日</h4>
                <p>2025年4月19日</p>
              </div>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 