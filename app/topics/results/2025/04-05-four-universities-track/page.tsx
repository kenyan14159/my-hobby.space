'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function FourUniversitiesTrackResult2025() {
  const event5000mData = [
    { name: '田島 駿介④', time: "13'58\"04", rank: '1着', note: 'PB', participation: 'OP参加', isPB: true, _highlight: true },
    { name: '山崎 丞④', time: "14'12\"12", rank: '2着', note: '', participation: 'OP参加' },
    { name: '樋村 銀河②', time: "14'39\"21", rank: '10着', note: '', participation: '対抗選手' },
    { name: '伊藤 航④', time: "14'59\"66", rank: '16着', note: '', participation: '対抗選手' },
    { name: '永見 進之介②', time: "15'10\"83", rank: '12着', note: '', participation: 'OP参加' },
    { name: '平島 龍斗④', time: 'DNF', rank: '–', note: '', participation: 'OP参加' },
  ];

  const event1500mData = [
    { name: '加藤 大地②', time: "4'01\"88", rank: '7着', note: '', participation: 'OP参加' },
  ];

  const event3000mSCData = [
    { name: '天瀬 海斗③', time: "8'56\"39", rank: '2着', note: '', participation: '対抗選手' },
    { name: '西坂 侑④', time: "9'09\"87", rank: '5着', note: '', participation: '対抗選手' },
    { name: '佐藤 輝歩③', time: "9'16\"68", rank: '8着', note: '', participation: 'OP参加' },
    { name: '佐藤 翼②', time: "9'30\"40", rank: '13着', note: '', participation: 'OP参加' },
  ];

  const event10000mData = [
    { name: '浦上 和樹④', time: "30'02\"87", rank: '3着', note: '', participation: '対抗選手' },
    { name: '佐藤 大和②', time: "30'04\"83", rank: '4着', note: '', participation: '対抗選手' },
    { name: '市丸 健太②', time: "30'11\"76", rank: '5着', note: '初', participation: 'OP参加' },
    { name: '近藤 琳太郎②', time: "30'45\"81", rank: '11着', note: 'PB', participation: 'OP参加', isPB: true },
    { name: '大下 翼③', time: "30'59\"83", rank: '12着', note: '', participation: 'OP参加' },
    { name: '松本 悠真③', time: "31'04\"58", rank: '14着', note: '', participation: 'OP参加' },
  ];

  const columns = [
    { key: 'name', header: '氏名 (学年)' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'participation', header: '参加区分' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第61回四大学対校陸上競技大会"
      date="2025年4月5日"
      place="相模原ギオンスタジアム"
      gradient="from-gray-50 to-gray-100"
    >

        {/* 5000m */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="5000m" />
          <ResponsiveTable columns={columns} data={event5000mData} delay={0.6} />
        </ResultCard>

        {/* 1500m */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Clock size={20} />} title="1500m" />
          <ResponsiveTable columns={columns} data={event1500mData} delay={0.8} />
        </ResultCard>

        {/* 3000mSC */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Clock size={20} />} title="3000mSC" />
          <ResponsiveTable columns={columns} data={event3000mSCData} delay={1.0} />
        </ResultCard>

        {/* 10000m */}
        <ResultCard delay={1.0}>
          <SectionHeader icon={<Clock size={20} />} title="10000m" />
          <ResponsiveTable columns={columns} data={event10000mData} delay={1.2} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.4}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">初</span>
              <span className="text-sm text-gray-600">初出場</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">対抗選手</span>
              <span className="text-sm text-gray-600">対抗戦選手</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">OP参加</span>
              <span className="text-sm text-gray-600">オープン参加</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 