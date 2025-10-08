'use client';

import React from 'react';
import { Medal } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';
import { PhotoGallery } from '@/components/photo-gallery';

export default function NSSU323rdLongDistanceResult2025() {
  // ギャラリー画像
  const galleryImages = [
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite1.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite2.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite3.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite4.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite5.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite6.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite7.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite8.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite9.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite10.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite11.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite12.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite13.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite14.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite15.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite16.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite17.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite18.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite19.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/323-nittai-favorite20.jpeg',
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  const event5000m5 = [
    { name: '松田 進①', time: "15'49\"27", rank: '12着', note: '' },
    { name: '只隈 昂大①', time: "16'15\"53", rank: '17着', note: '' },
  ];

  const event5000m6 = [
    { name: '渡邊 晄月①', time: "15'32\"43", rank: '11着', note: '' },
    { name: '中條 隆太③', time: "15'55\"63", rank: '17着', note: '' },
  ];

  const event5000m7 = [
    { name: '佐藤 翼②', time: "14'45\"64", rank: '2着', note: 'PB', isPB: true },
    { name: '近藤 琳太郎②', time: "14'53\"72", rank: '5着', note: '' },
    { name: '中川 絢太②', time: "15'01\"24", rank: '8着', note: '' },
    { name: '水谷 柊斗④', time: "15'14\"21", rank: '13着', note: '' },
    { name: '勝又 大介①', time: "15'17\"13", rank: '16着', note: '' },
    { name: '稗村 泰吾①', time: "15'20\"84", rank: '18着', note: '' },
    { name: '小野里 琉生③', time: "15'45\"80", rank: '28着', note: '' },
    { name: '阿知和 優汰③', time: 'DNS', rank: '', note: 'DNS', _className: 'bg-red-50' },
  ];

  const event5000m8 = [
    { name: '大宮 健治①', time: "14'35\"31", rank: '3着', note: '' },
    { name: '村上 愛祈①', time: "14'38\"58", rank: '8着', note: 'PB', isPB: true },
    { name: '池田 優也③', time: "14'51\"59", rank: '12着', note: '' },
    { name: '安田 大翔②', time: "14'54\"05", rank: '15着', note: '' },
    { name: '大下 翼③', time: 'DQ', rank: '', note: 'T3', _className: 'bg-red-50' },
  ];

  const event5000m9 = [
    { name: '佐々木 快斗①', time: "14'39\"55", rank: '9着', note: 'PB', isPB: true },
    { name: '鳥羽 恭平①', time: "14'43\"96", rank: '16着', note: 'PB', isPB: true },
    { name: '纓坂 倭人③', time: "14'54\"83", rank: '23着', note: '' },
    { name: '花城 欄斗③', time: "15'26\"73", rank: '28着', note: '' },
  ];

  const event5000m10 = [
    { name: '佐藤 輝歩③', time: "14'26\"01", rank: '5着', note: 'PB', isPB: true },
    { name: '伊藤 航④', time: "14'32\"50", rank: '11着', note: '' },
    { name: '西坂 侑④', time: "14'41\"00", rank: '21着', note: '' },
    { name: '山本 琉生①', time: 'DQ', rank: '', note: 'T3', _className: 'bg-red-50' },
  ];

  return (
    <ResultPageLayout
      title="第323回 日本体育大学長距離競技会兼第17回NCG"
      date="2025年10月5日"
      place="日本体育大学健志台キャンパス"
      gradient="from-gray-50 to-gray-100"
    >
      {/* フォトギャラリー */}
      <PhotoGallery 
        images={galleryImages} 
        showTitle={true}
        enableShuffle={false}
        maxImages={20}
        title="フォトギャラリー"
        subtitle="大会当日のスナップショット"
      />

      {/* 5000m 種目 */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Medal size={20} />} title="5000m" />

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">5組</h4>
            <ResponsiveTable columns={columns} data={event5000m5} delay={0.6} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">6組</h4>
            <ResponsiveTable columns={columns} data={event5000m6} delay={0.8} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">7組</h4>
            <ResponsiveTable columns={columns} data={event5000m7} delay={1.0} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">8組</h4>
            <ResponsiveTable columns={columns} data={event5000m8} delay={1.2} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">9組</h4>
            <ResponsiveTable columns={columns} data={event5000m9} delay={1.4} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">10組</h4>
            <ResponsiveTable columns={columns} data={event5000m10} delay={1.6} />
          </div>
        </div>
      </ResultCard>
    </ResultPageLayout>
  );
}


