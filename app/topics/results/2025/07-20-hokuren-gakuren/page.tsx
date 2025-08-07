'use client';

import React from 'react';
import { Trophy, Calendar, MapPin } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function HokurenGakurenResult2025() {
  const chitoseData = [
    { name: '田島 駿介④', time: "13'46\"12", rank: '11着', note: 'PB' },
  ];

  const kitamiData = [
    { name: '山崎 丞④', time: "14'04\"91", rank: '1着' },
  ];

  const abashiriData = [
    { name: '山崎 丞④', time: "28'58\"65", rank: '12着' },
    { name: '田島 駿介④', time: "29'33\"22", rank: '19着' },
  ];

  const kantoAbashiriData = [
    { name: '夏見 虹郎①', time: "29'19\"91", rank: '1着', note: 'PB' },
    { name: '天瀬 海斗③', time: "30'08\"29", rank: '11着' },
    { name: '佐藤 大和②', time: "30'37\"25", rank: '19着' },
    { name: '樋村 銀河②', time: "30'37\"43", rank: '20着' },
    { name: '永見 進之介②', time: "30'41\"20", rank: '23着' },
    { name: '野手 駈①', time: "31'14\"94", rank: '25着' },
  ];

  const kantoAbashiriData2 = [
    { name: '二村 昇太朗④', time: "29'06\"17", rank: '4着' },
  ];

  const columns = [
    { key: 'name', header: '選手名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="ホクレンディスタンスチャレンジ 2025"
      date="2025年7月12日・16日・19日・20日"
      place="千歳・北見・網走"
      gradient="from-blue-50 to-indigo-100"
    >
      {/* 千歳大会 */}
      <ResultCard delay={0.2}>
        <SectionHeader 
          icon={<Calendar size={20} />} 
          title="千歳大会（2025年7月12日・土）｜5000m B組" 
        />
        <ResponsiveTable columns={columns} data={chitoseData} delay={0.4} />
      </ResultCard>

      {/* 北見大会 */}
      <ResultCard delay={0.4}>
        <SectionHeader 
          icon={<Calendar size={20} />} 
          title="北見大会（2025年7月16日・水）｜5000m C組" 
        />
        <ResponsiveTable columns={columns} data={kitamiData} delay={0.6} />
      </ResultCard>

      {/* 網走大会 */}
      <ResultCard delay={0.6}>
        <SectionHeader 
          icon={<Calendar size={20} />} 
          title="網走大会（2025年7月19日・土）｜10000m A組" 
        />
        <ResponsiveTable columns={columns} data={abashiriData} delay={0.8} />
      </ResultCard>

      {/* 関東学生網走夏季記録挑戦競技 */}
      <ResultCard delay={0.8}>
        <SectionHeader 
          icon={<Trophy size={20} />} 
          title="関東学生網走夏季記録挑戦競技（2025年7月20日・日）" 
        />
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">10000m 2組目</h4>
          <ResponsiveTable columns={columns} data={kantoAbashiriData} delay={1.0} />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800">10000m 4組目</h4>
          <ResponsiveTable columns={columns} data={kantoAbashiriData2} delay={1.2} />
        </div>
      </ResultCard>
    </ResultPageLayout>
  );
} 