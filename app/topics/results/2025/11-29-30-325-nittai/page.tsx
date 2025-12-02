'use client';

import React from 'react';
import { Medal, ExternalLink } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';
import { Button } from '@/components/ui/button';

export default function NSSU325thLongDistanceResult2025() {
  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  // 男子10000m (1組)
  const event10000m1 = [
    { name: '小野里 琉生③', time: 'DQ', rank: '', note: 'DQ', _className: 'bg-red-50' },
  ];

  // 男子10000m (4組)
  const event10000m4 = [
    { name: '中條 隆太③', time: "30'26\"87", rank: '24着', note: '', isFirst: true },
    { name: '花城 欄斗③', time: "30'40\"56", rank: '31着', note: '', isPB: true },
    { name: '大下 翼③', time: "31'33\"37", rank: '43着', note: '' },
  ];

  // 男子10000m (5組)
  const event10000m5 = [
    { name: '鳥羽 恭平①', time: "29'56\"61", rank: '11着', note: '', isPB: true },
    { name: '纓坂 倭人③', time: "30'25\"89", rank: '28着', note: '', isPB: true },
    { name: '池田 優也③', time: "30'38\"07", rank: '33着', note: '', isPB: true },
    { name: '近藤 琳太郎②', time: "30'51\"74", rank: '38着', note: '' },
  ];

  // 男子10000m (8組)
  const event10000m8 = [
    { name: '野村 汰輝①', time: "29'17\"61", rank: '7着', note: '', isFirst: true },
    { name: '永見 進之介②', time: "29'37\"11", rank: '18着', note: '', isPB: true },
    { name: '國井 飛慎②', time: "29'38\"61", rank: '21着', note: '', isPB: true },
    { name: '西坂 侑④', time: "29'40\"45", rank: '22着', note: '', isPB: true },
    { name: '大宮 健治①', time: "29'42\"46", rank: '24着', note: '', isFirst: true },
    { name: '佐藤 輝歩③', time: "29'46\"24", rank: '27着', note: '' },
    { name: '水津 勇人①', time: "29'46\"58", rank: '28着', note: '', isPB: true },
    { name: '松本 悠真③', time: "29'48\"70", rank: '31着', note: '', isPB: true },
    { name: '水谷 柊斗④', time: "29'48\"64", rank: '30着', note: '', isPB: true },
    { name: '伊藤 航④', time: "29'52\"35", rank: '34着', note: '', isPB: true },
    { name: '野手 駈①', time: "30'16\"87", rank: '42着', note: '' },
    { name: '倉村 空④', time: "30'35\"95", rank: '47着', note: '' },
  ];

  // 男子10000m (9組)
  const event10000m9 = [
    { name: '山上 勇希②', time: "29'05\"65", rank: '11着', note: '', isPB: true },
    { name: '加藤 大地②', time: "29'20\"30", rank: '14着', note: '', isPB: true },
    { name: '吉岡 斗真②', time: "29'34\"06", rank: '18着', note: '', isPB: true },
    { name: '大竹 雄大④', time: "29'34\"48", rank: '19着', note: '', isPB: true },
    { name: '樋村 銀河②', time: "29'34\"98", rank: '20着', note: '', isPB: true },
    { name: '瀬戸 雅史③', time: "29'49\"21", rank: '30着', note: '' },
  ];

  // 男子10000m (10組)
  const event10000m10 = [
    { name: '𠮷田 黎大③', time: "29'09\"64", rank: '14着', note: '', isPB: true },
    { name: '天瀬 海斗③', time: "29'13\"14", rank: '16着', note: '', isPB: true },
  ];

  // 男子10000m (11組)
  const event10000m11 = [
    { name: '夏見 虹郎①', time: "28'29\"82", rank: '4着', note: '10000m歴代12位', isPB: true },
    { name: '佐藤 大和②', time: "28'37\"62", rank: '13着', note: '10000m歴代16位', isPB: true },
  ];

  // 男子10000m (12組)
  const event10000m12 = [
    { name: '荻野 桂輔②', time: "29'14\"81", rank: '32着', note: '', isPB: true },
  ];

  // 男子10000m (13組)
  const event10000m13 = [
    { name: '二村 昇太朗④', time: "28'31\"64", rank: '13着', note: '10000m歴代13位', isPB: true },
  ];

  // NCG 10000m (1組)
  const eventNCG10000m1 = [
    { name: '山崎 丞④', time: "28'19\"16", rank: '14着', note: '10000m歴代6位', isPB: true },
  ];

  // NCG 10000m (2組)
  const eventNCG10000m2 = [
    { name: '平島 龍斗④', time: "27'56\"84", rank: '13着', note: '日体大記録', isPB: true },
  ];

  // 男子5000m (7組)
  const event5000m7 = [
    { name: '大島 脩太③', time: "14'59\"16", rank: '1着', note: '' },
    { name: '島村 真登①', time: "15'48\"16", rank: '34着', note: '' },
    { name: '今井 結斗②', time: "15'50\"41", rank: '36着', note: '' },
    { name: '平木 仁①', time: "16'05\"18", rank: '39着', note: '' },
  ];

  // 男子5000m (13組)
  const event5000m13 = [
    { name: '松田 進①', time: "14'57\"59", rank: '1着', note: '', isPB: true },
    { name: '渡邉 晄月①', time: "15'11\"51", rank: '10着', note: '' },
    { name: '藤原 想太①', time: "16'07\"31", rank: '38着', note: '' },
  ];

  // 男子5000m (18組)
  const event5000m18 = [
    { name: '安田 大翔②', time: "14'56\"60", rank: '14着', note: '' },
    { name: '阿知和 優汰③', time: "15'04\"62", rank: '17着', note: '' },
    { name: '稗村 泰吾①', time: "15'12\"61", rank: '20着', note: '' },
    { name: '勝又 大介①', time: "15'22\"87", rank: '27着', note: '' },
  ];

  // 男子5000m (23組)
  const event5000m23 = [
    { name: '嶋野 太海（コーチ）', time: "14'26\"95", rank: '3着', note: '' },
    { name: '佐々木 快斗①', time: "14'40\"95", rank: '14着', note: '' },
    { name: '中辻 健斗②', time: 'DNF', rank: '', note: 'DNF', _className: 'bg-red-50' },
  ];

  // 男子5000m (26組)
  const event5000m26 = [
    { name: '渡辺 和志①', time: "15'00\"81", rank: '34着', note: '' },
  ];

  return (
    <ResultPageLayout
      title="第325回 日本体育大学長距離競技会兼第19回NCG"
      date="2025年11月29-30日"
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
              href="https://nssu-ekiden.com/the-325th-nippon-sport-science-university-long-distance-track-meet-and-the-19th-ncg/"
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
            <h4 className="text-lg font-semibold text-gray-700 mb-3">1組</h4>
            <ResponsiveTable columns={columns} data={event10000m1} delay={0.3} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">4組</h4>
            <ResponsiveTable columns={columns} data={event10000m4} delay={0.4} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">5組</h4>
            <ResponsiveTable columns={columns} data={event10000m5} delay={0.5} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">8組</h4>
            <ResponsiveTable columns={columns} data={event10000m8} delay={0.6} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">9組</h4>
            <ResponsiveTable columns={columns} data={event10000m9} delay={0.7} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">10組</h4>
            <ResponsiveTable columns={columns} data={event10000m10} delay={0.8} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">11組</h4>
            <ResponsiveTable columns={columns} data={event10000m11} delay={0.9} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">12組</h4>
            <ResponsiveTable columns={columns} data={event10000m12} delay={1.0} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">13組</h4>
            <ResponsiveTable columns={columns} data={event10000m13} delay={1.1} />
          </div>
        </div>
      </ResultCard>

      {/* NCG 10000m */}
      <ResultCard delay={1.2}>
        <SectionHeader icon={<Medal size={20} />} title="NCG 10000m" />

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">1組</h4>
            <ResponsiveTable columns={columns} data={eventNCG10000m1} delay={1.3} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">2組</h4>
            <ResponsiveTable columns={columns} data={eventNCG10000m2} delay={1.4} />
          </div>
        </div>
      </ResultCard>

      {/* 男子5000m */}
      <ResultCard delay={1.5}>
        <SectionHeader icon={<Medal size={20} />} title="男子5000m" />

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">7組</h4>
            <ResponsiveTable columns={columns} data={event5000m7} delay={1.6} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">13組</h4>
            <ResponsiveTable columns={columns} data={event5000m13} delay={1.7} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">18組</h4>
            <ResponsiveTable columns={columns} data={event5000m18} delay={1.8} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">23組</h4>
            <ResponsiveTable columns={columns} data={event5000m23} delay={1.9} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">26組</h4>
            <ResponsiveTable columns={columns} data={event5000m26} delay={2.0} />
          </div>
        </div>
      </ResultCard>
    </ResultPageLayout>
  );
}
