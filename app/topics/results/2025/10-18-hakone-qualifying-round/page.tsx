'use client';

import React from 'react';
import { Trophy, Medal, Users } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';
import { PhotoGallery } from '@/components/photo-gallery';

export default function HakoneQualifyingRound2025() {
  // ギャラリー画像
  const galleryImages: string[] = [
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite1.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite2.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite3.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite4.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite5.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite6.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite7.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite8.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite9.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite10.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite11.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite12.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite13.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/10/102-hakone-yosen-favorite14.jpeg',
  ];

  // チーム総合成績（上位10校）
  const teamResultColumns = [
    { key: 'rank', header: '順位' },
    { key: 'team', header: 'チーム名' },
    { key: 'time', header: '総合タイム' },
  ];

  const teamResults = [
    { rank: '1位', team: '中央学院大学', time: '10:32:23' },
    { rank: '2位', team: '順天堂大学', time: '10:32:35' },
    { rank: '3位', team: '山梨学院大学', time: '10:32:44' },
    { rank: '4位', team: '日本大学', time: '10:32:57' },
    { rank: '5位', team: '東海大学', time: '10:34:07' },
    { rank: '6位', team: '東京農業大学', time: '10:34:59' },
    { rank: '7位', team: '神奈川大学', time: '10:36:07' },
    { rank: '8位', team: '大東文化大学', time: '10:36:12' },
    { rank: '9位', team: '日本体育大学', time: '10:36:14', _className: 'bg-blue-50 font-bold' },
    { rank: '10位', team: '立教大学', time: '10:36:56' },
  ];

  // 日本体育大学 個人成績
  const individualColumns = [
    { key: 'rank', header: '個人順位' },
    { key: 'name', header: '選手名' },
    { key: 'time', header: 'タイム' },
    { key: 'note', header: '備考' },
  ];

  const individualResults = [
    { rank: '8位', name: '平島 龍斗④', time: '1:02:06', note: '' },
    { rank: '16位', name: '田島 駿介④', time: '1:02:15', note: '' },
    { rank: '57位', name: '山崎 丞④', time: '1:03:16', note: '' },
    { rank: '89位', name: '佐藤 大和②', time: '1:03:44', note: 'PB', isPB: true },
    { rank: '108位', name: '荻野 桂輔②', time: '1:03:56', note: '初' },
    { rank: '110位', name: '二村 昇太朗④', time: '1:03:58', note: 'PB', isPB: true },
    { rank: '112位', name: '大竹 雄大④', time: '1:03:58', note: 'PB', isPB: true },
    { rank: '127位', name: '吉田 黎大③', time: '1:04:08', note: 'PB', isPB: true },
    { rank: '145位', name: '夏見 虹郎①', time: '1:04:17', note: 'PB', isPB: true },
    { rank: '177位', name: '水津 勇人①', time: '1:04:36', note: '初' },
    { rank: '232位', name: '樋村 銀河②', time: '1:05:11', note: 'PB', isPB: true },
    { rank: '292位', name: '天瀬 海斗③', time: '1:06:05', note: '' },
  ];

  return (
    <ResultPageLayout
      title="第102回東京箱根間往復大学駅伝競走予選会"
      date="2025年10月18日"
      place="陸上自衛隊立川駐屯地～立川市街地～国営昭和記念公園"
      gradient="from-blue-50 to-cyan-50"
    >
      {/* フォトギャラリー */}
      <PhotoGallery 
        images={galleryImages} 
        showTitle={true}
        enableShuffle={false}
        maxImages={14}
        title="フォトギャラリー"
        subtitle="大会当日のスナップショット"
      />

      {/* 大会結果サマリー */}
      <ResultCard delay={0.2}>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-xl mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={32} />
            <h2 className="text-3xl font-bold">総合9位</h2>
          </div>
          <p className="text-center text-xl font-semibold mb-2">10時間36分14秒</p>
          <p className="text-center text-lg opacity-90">第102回箱根駅伝 本戦出場権獲得！</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            総合9位という結果で、第102回東京箱根間往復大学駅伝競走の出場権を勝ち取ることができました。
            これで78年連続78回目の出場となります。
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            箱根駅伝本戦では、この連続出場の継承を力に変え、10位以内のシード権獲得を目指してチーム一丸となって挑みます。
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            また、2週間後に控える全日本大学駅伝でも、8位以内のシード権獲得を目標に全力で戦います。
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            暑さの中、現地まで足を運び、熱い声援を送ってくださった皆様、本当にありがとうございました。
            皆様の応援が選手たちの大きな力となりました。引き続き、温かいご声援をよろしくお願いいたします。
          </p>
        </div>
      </ResultCard>

      {/* チーム総合成績（上位10校） */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Users size={20} />} title="チーム総合成績（上位10校）" />
        <ResponsiveTable columns={teamResultColumns} data={teamResults} delay={0.6} />
      </ResultCard>

      {/* 日本体育大学 個人成績 */}
      <ResultCard delay={0.8}>
        <SectionHeader icon={<Medal size={20} />} title="日本体育大学 個人成績" />
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-center text-lg font-semibold text-blue-900">
            チーム総合結果：9位 ／ 10時間36分14秒
          </p>
        </div>
        <ResponsiveTable columns={individualColumns} data={individualResults} delay={1.0} />
      </ResultCard>
    </ResultPageLayout>
  );
}
