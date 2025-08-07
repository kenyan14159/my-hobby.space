'use client';

import React from 'react';
import { Trophy, Clock, Medal } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function KantoStudentTrackResult2025() {
  const event1500mQualifiers = [
    { group: '1組目', name: '加藤 大地②', time: "3'50\"96", rank: '8位', note: '' },
  ];

  const event10000mFinal = [
    { name: '山崎 丞④', time: "28'53\"27", rank: '4位', note: '' },
    { name: '浦上 和樹④', time: "29'27\"43", rank: '11位', note: '' },
  ];

  const event3000mSCQualifiers = [
    { group: '1組目', name: '佐藤 輝歩③', time: "9'16\"08", rank: '7位', note: 'qR' },
    { group: '2組目', name: '天瀬 海斗③', time: "8'59\"14", rank: '3位', note: 'Q' },
    { group: '2組目', name: '西坂 侑④', time: "9'17\"01", rank: '10位', note: '' },
  ];

  const eventHalfMarathonFinal = [
    { name: '永見 進之介②', time: "65'05", rank: '7位', note: '' },
    { name: '大竹 雄大④', time: "66'06", rank: '14位', note: '' },
    { name: '伊藤 航④', time: "70'38", rank: '29位', note: '' },
  ];

  const event3000mSCFinal = [
    { name: '天瀬 海斗③', time: "9'04\"52", rank: '9位', note: '' },
    { name: '佐藤 輝歩③', time: "9'11\"07", rank: '10位', note: '' },
  ];

  const event5000mFinal = [
    { name: '平島 龍斗④', time: "13'46\"30", rank: '6位', note: 'PB', isPB: true },
    { name: '田島 駿介④', time: "13'50\"50", rank: '9位', note: 'PB', isPB: true },
    { name: '二村 昇太朗④', time: "14'23\"48", rank: '18位', note: '' },
  ];

  const columnsGroup = [
    { key: 'group', header: '組' },
    { key: 'name', header: '選手（学年）' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  const columns = [
    { key: 'name', header: '選手（学年）' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第104回 関東学生陸上競技対校選手権大会"
      date="2025年5月8日〜11日"
      place="国立競技場"
      gradient="from-blue-50 to-cyan-100"
    >
        {/* 男子1部 1500m 予選 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="男子1部 1500m 予選" />
          <ResponsiveTable columns={columnsGroup} data={event1500mQualifiers} delay={0.6} />
        </ResultCard>

        {/* 男子1部 10000m 決勝 */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Trophy size={20} />} title="男子1部 10000m 決勝" />
          <ResponsiveTable columns={columns} data={event10000mFinal} delay={0.8} />
        </ResultCard>

        {/* 男子1部 3000mSC 予選 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Clock size={20} />} title="男子1部 3000mSC 予選" />
          <ResponsiveTable columns={columnsGroup} data={event3000mSCQualifiers} delay={1.0} />
        </ResultCard>

        {/* 男子1部 ハーフマラソン 決勝 */}
        <ResultCard delay={1.0}>
          <SectionHeader icon={<Trophy size={20} />} title="男子1部 ハーフマラソン 決勝" />
          <ResponsiveTable columns={columns} data={eventHalfMarathonFinal} delay={1.2} />
        </ResultCard>

        {/* 男子1部 3000mSC 決勝 */}
        <ResultCard delay={1.2}>
          <SectionHeader icon={<Medal size={20} />} title="男子1部 3000mSC 決勝" />
          <ResponsiveTable columns={columns} data={event3000mSCFinal} delay={1.4} />
        </ResultCard>

        {/* 男子1部 5000m 決勝 */}
        <ResultCard delay={1.4}>
          <SectionHeader icon={<Trophy size={20} />} title="男子1部 5000m 決勝" />
          <ResponsiveTable columns={columns} data={event5000mFinal} delay={1.6} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.8}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Q</span>
              <span className="text-sm text-gray-600">決勝進出</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-900">qR</span>
              <span className="text-sm text-gray-600">記録による決勝進出</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 