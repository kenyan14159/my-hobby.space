'use client';

import React from 'react';
import { Medal, ExternalLink } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';
import { Button } from '@/components/ui/button';

export default function NSSU324thLongDistanceResult2025() {
  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  // 男子10000m (4組) - 時間順に並び替え済み
  const event10000m4 = [
    { name: '佐藤 輝歩③', time: "29'45\"42", rank: '22着', note: 'PB', isPB: true },
    { name: '國井 飛慎②', time: "29'49\"75", rank: '25着', note: 'PB', isPB: true },
    { name: '樋村 銀河②', time: "30'05\"59", rank: '27着', note: '' },
    { name: '松本 悠真③', time: "30'14\"22", rank: '29着', note: 'PB', isPB: true },
    { name: '永見 進之介②', time: "30'21\"04", rank: '31着', note: '' },
    { name: '水津 勇人①', time: 'DNS', rank: '', note: 'DNS', _className: 'bg-red-50' },
  ];

  // 男子5000m (5組)
  const event5000m5 = [
    { name: '島村 真登①', time: "15'55\"43", rank: '32着', note: '' },
  ];

  // 男子5000m (6組)
  const event5000m6 = [
    { name: '松田 進①', time: "15'09\"76", rank: '7着', note: ''},
    { name: '藤原 想太①', time: "15'31\"44", rank: '23着', note: '' },
    { name: '只隈 昂大①', time: "15'36\"57", rank: '25着', note: '' },
  ];

  // 男子5000m (7組)
  const event5000m7 = [
    { name: '平木 仁①', time: "15'37\"45", rank: '25着', note: '' },
  ];

  // 男子5000m (10組)
  const event5000m10 = [
    { name: '阿知和 優汰③', time: "14'47\"68", rank: '2着', note: '' },
    { name: '勝又 大介①', time: "14'59\"40", rank: '9着', note: '' },
  ];

  // 男子5000m (13組)
  const event5000m13 = [
    { name: '加藤 大地②', time: "14'29\"01", rank: '1着', note: '' },
    { name: '水谷 柊斗④', time: "14'30\"51", rank: '2着', note: '' },
    { name: '稗村 泰吾①', time: "14'56\"71", rank: '23着', note: 'PB', isPB: true },
    { name: '安田 大翔②', time: "14'57\"42", rank: '26着', note: '' },
    { name: '小野里 琉生③', time: "15'09\"94", rank: '32着', note: '' },
  ];

  // 男子5000m (16組)
  const event5000m16 = [
    { name: '山上 勇希②', time: "14'19\"05", rank: '1着', note: 'PB', isPB: true },
    { name: '野村 汰輝①', time: "14'28\"00", rank: '3着', note: 'PB', isPB: true },
    { name: '纓坂 倭人③', time: "14'30\"17", rank: '7着', note: '' },
    { name: '今野 健太①', time: "14'33\"75", rank: '11着', note: 'PB', isPB: true },
    { name: '池田 優也③', time: "14'34\"57", rank: '12着', note: 'PB', isPB: true },
    { name: '佐藤 翼②', time: "14'38\"77", rank: '16着', note: 'PB', isPB: true },
    { name: '中條 隆太③', time: "14'43\"08", rank: '20着', note: 'PB', isPB: true },
    { name: '山本 琉生①', time: "14'46\"34", rank: '23着', note: '' },
    { name: '大下 翼③', time: "14'46\"87", rank: '24着', note: '' },
    { name: '花城 欄斗③', time: "14'49\"08", rank: '27着', note: 'PB', isPB: true },
    { name: '瀬戸 雅史③', time: 'DNF', rank: '', note: 'PM(3000mまで)', _className: 'bg-red-50' },
    { name: '近藤 琳太郎②', time: 'DNS', rank: '', note: 'DNS', _className: 'bg-red-50' },
  ];

  // 男子5000m (17組)
  const event5000m17 = [
    { name: '大宮 健治①', time: "14'29\"13", rank: '15着', note: 'PB', isPB: true },
    { name: '鳥羽 恭平①', time: "14'31\"01", rank: '18着', note: 'PB', isPB: true },
    { name: '渡辺 和志①', time: "14'39\"75", rank: '28着', note: '' },
    { name: '佐々木 快斗①', time: "14'43\"23", rank: '30着', note: '' },
    { name: '瀬戸 雅史③', time: 'DNF', rank: '', note: '3000mまで', _className: 'bg-red-50' },
  ];

  // 男子5000m (19組)
  const event5000m19 = [
    { name: '吉岡 斗真②', time: "14'08\"36", rank: '1着', note: '' },
    { name: '中辻 健人②', time: "14'51\"40", rank: '34着', note: '' },
  ];

  // 男子5000m (22組)
  const event5000m22 = [
    { name: '山崎 丞④', time: "13'56\"48", rank: '2着', note: '' },
  ];

  return (
    <ResultPageLayout
      title="第324回 日本体育大学長距離競技会兼第18回NCG"
      date="2025年11月15-16日"
      place="日本体育大学健志台グラウンド"
      gradient="from-gray-50 to-gray-100"
    >
      {/* ギャラリーリンク */}
      <ResultCard delay={0.1}>
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg"
          >
            <a
              href="https://nssu-ekiden.com/the-324th-nippon-sport-science-university-long-distance-track-meet-the-18th-ncg/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>ギャラリーはこちら</span>
              <ExternalLink size={18} />
            </a>
          </Button>
        </div>
      </ResultCard>

      {/* 男子10000m */}
      <ResultCard delay={0.2}>
        <SectionHeader icon={<Medal size={20} />} title="男子10000m" />

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">4組</h4>
            <ResponsiveTable columns={columns} data={event10000m4} delay={0.4} />
          </div>
        </div>
      </ResultCard>

      {/* 男子5000m */}
      <ResultCard delay={0.6}>
        <SectionHeader icon={<Medal size={20} />} title="男子5000m" />

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">5組</h4>
            <ResponsiveTable columns={columns} data={event5000m5} delay={0.8} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">6組</h4>
            <ResponsiveTable columns={columns} data={event5000m6} delay={1.0} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">7組</h4>
            <ResponsiveTable columns={columns} data={event5000m7} delay={1.2} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">10組</h4>
            <ResponsiveTable columns={columns} data={event5000m10} delay={1.4} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">13組</h4>
            <ResponsiveTable columns={columns} data={event5000m13} delay={1.6} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">16組</h4>
            <ResponsiveTable columns={columns} data={event5000m16} delay={1.8} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">17組</h4>
            <ResponsiveTable columns={columns} data={event5000m17} delay={2.0} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">19組</h4>
            <ResponsiveTable columns={columns} data={event5000m19} delay={2.2} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">22組</h4>
            <ResponsiveTable columns={columns} data={event5000m22} delay={2.4} />
          </div>
        </div>
      </ResultCard>
    </ResultPageLayout>
  );
}
