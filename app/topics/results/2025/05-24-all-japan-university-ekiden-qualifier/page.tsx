'use client';

import React from 'react';
import { Trophy, Medal, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';

export default function AllJapanUniversityEkidenQualifierResult2025() {
  const qualifierResults = [
    { group: '1組目', name: '浦上 和樹④', time: "29'05\"97", rank: '5位', note: 'PB', isPB: true },
    { group: '1組目', name: '犬童 慧真④', time: "30'02\"05", rank: '28位', note: '' },
    { group: '2組目', name: '佐藤 大和②', time: "29'24\"60", rank: '9位', note: 'PB', isPB: true },
    { group: '2組目', name: '夏見 虹郎①', time: "29'26\"53", rank: '11位', note: 'PB', isPB: true },
    { group: '3組目', name: '田島 駿介④', time: "28'39\"95", rank: '4位', note: '' },
    { group: '3組目', name: '二村 昇太朗④', time: "29'03\"74", rank: '17位', note: 'PB', isPB: true },
    { group: '4組目', name: '平島 龍斗④', time: "28'30\"10", rank: '10位', note: '' },
    { group: '4組目', name: '山崎 丞④', time: "28'47\"89", rank: '24位', note: '' },
  ];

  const columns = [
    { key: 'group', header: '組' },
    { key: 'name', header: '氏名' },
    { key: 'time', header: '記録' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="秩父宮賜杯第57回全日本大学駅伝対校選手権大会"
      subtitle="関東学生陸上競技連盟推薦校選考会"
      date="2025年5月24日"
      place="埼玉県熊谷市"
      gradient="from-gray-50 to-gray-100"
    >
        {/* 総合結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Trophy size={20} />} title="総合結果" />
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Medal size={24} />
              <div className="text-2xl font-bold">総合7位</div>
            </div>
            <div className="text-lg mb-2">3時間53分00秒83</div>
            <div className="text-sm bg-white/20 rounded-full px-4 py-1 inline-block">
              全日本大学駅伝出場権獲得 (2大会連続)
            </div>
          </div>
        </ResultCard>

        {/* 選考会結果 */}
        <ResultCard delay={0.6}>
          <SectionHeader icon={<Clock size={20} />} title="10000m 選考会結果" />
          <ResponsiveTable columns={columns} data={qualifierResults} delay={0.8} />
        </ResultCard>

        {/* メッセージ */}
        <ResultCard delay={1.0}>
          <SectionHeader icon={<Medal size={20} />} title="大会メッセージ" />
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              秩父宮賜杯第57回全日本大学駅伝対校選手権大会関東学生陸上競技連盟推薦校選考会に出場し、総合3時間53分00秒83、総合7位という結果を残すことができました。
            </p>
            <p className="mb-4">
              この結果により、第57回全日本大学駅伝の出場権を2大会連続で獲得いたしました。選手たちの日頃の厳しい練習の成果と、当日の粘り強い走りが実を結んだ瞬間でした。
            </p>
            <p className="mb-4">
              皆様からの温かいご声援とご支援のおかげで、チーム全員が一致団結し、憧れの伊勢路への切符を勝ち取ることができました。応援してくださった全ての皆様、本当にありがとうございました。
            </p>
            <p>
              11月の全日本大学駅伝本戦でも、皆様の期待に応えられるよう、チーム一同さらなる飛躍を目指して頑張ります。引き続き、温かいご声援をよろしくお願いいたします。
            </p>
          </div>
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={1.2}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">自己新</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
} 