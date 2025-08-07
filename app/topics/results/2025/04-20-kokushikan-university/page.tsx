'use client';

import React from 'react';
import { Trophy, Clock, Star, Medal, Award } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function KokushikanUniversityResult2025() {
  const event10000m1 = [
    { name: '夏見 虹郎（①）', time: "29'32\"63", rank: '1位', note: 'PB', isFirst: true, isPB: true },
    { name: '野手 駈（①）', time: "29'43\"35", rank: '2位', note: '初', isSecond: true, isDebut: true },
    { name: '大竹 雄大（④）', time: "29'54\"25", rank: '3位', note: '', isThird: true },
    { name: '永見 進之介（②）', time: "30'08\"79", rank: '6位', note: 'PB', isPB: true },
    { name: '伊藤 航（④）', time: "30'40\"24", rank: '10位', note: 'PB', isPB: true },
    { name: '大島 脩太（③）', time: "30'48\"15", rank: '11位', note: '' },
    { name: '近藤 琳太郎（②）', time: "31'23\"40", rank: '13位', note: '' },
  ];

  const columns = [
    { key: 'name', header: '選手（学年）' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第1回 国士舘大学学内競技会"
      date="2025年4月20日"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 10000m 1組 結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Trophy size={20} />} title="10000m 1組" />
          <ResponsiveTable columns={columns} data={event10000m1} delay={0.6} />
        </ResultCard>

        {/* 特記事項 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Star size={20} />} title="特記事項" />
          <div className="space-y-4 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-orange-700">1年生の活躍</h4>
                <p>夏見虹郎（①）が1位でパーソナルベスト更新、野手駈（①）が10000m初挑戦で2位という素晴らしい結果を残しました。</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-orange-700">PB更新多数</h4>
                <p>夏見選手、永見選手、伊藤選手の3名がパーソナルベストを更新しました。</p>
              </div>
            </div>
          </div>
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.0}>
          <SectionHeader icon={<Award size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">初</span>
              <span className="text-sm text-gray-600">初挑戦</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">1位</span>
              <span className="text-sm text-gray-600">優勝</span>
            </div>
          </div>
        </ResultCard>

        {/* 大会概要 */}
        <ResultCard delay={1.2}>
          <SectionHeader icon={<Medal size={20} />} title="大会概要" />
          <div className="space-y-4 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-orange-700">大会名</h4>
                <p>第1回 国士舘大学学内競技会</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-orange-700">開催日</h4>
                <p>2025年4月20日</p>
              </div>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 