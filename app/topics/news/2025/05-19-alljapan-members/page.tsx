"use client";

import React from 'react';
import { Medal, Clock, Users } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight } from '@/components/news-detail-layout';

export default function AllJapanMembersPage() {
  const members = [
    { name: "大童 慧真", furigana: "インドウ ケイマ", year: "④", pb5000: "14'27\"78", pb10000: "29'31\"00" },
    { name: "浦上 和樹", furigana: "ウラガミ カズキ", year: "④", pb5000: "14'16\"87", pb10000: "29'11\"28" },
    { name: "田島 駿介", furigana: "タジマ シュンスケ", year: "④", pb5000: "13'50\"50", pb10000: "28'11\"41" },
    { name: "平島 龍斗", furigana: "ヒラシマ リュウト", year: "④", pb5000: "13'46\"30", pb10000: "28'20\"32" },
    { name: "二村 昇太朗", furigana: "フタムラ ショウタロウ", year: "④", pb5000: "14'00\"01", pb10000: "29'04\"88" },
    { name: "山崎 丞", furigana: "ヤマザキ タスク", year: "④", pb5000: "13'52\"09", pb10000: "28'19\"33" },
    { name: "天瀬 海斗", furigana: "アマセ カイト", year: "③", pb5000: "14'25\"74", pb10000: "29'32\"38" },
    { name: "吉田 黎大", furigana: "ヨシダ レオ", year: "③", pb5000: "14'15\"16", pb10000: "29'39\"34" },
    { name: "市丸 健太", furigana: "イチマル ケンタ", year: "②", pb5000: "14'35\"33", pb10000: "30'11\"76" },
    { name: "佐藤 大和", furigana: "サトウ ヤマト", year: "②", pb5000: "14'09\"99", pb10000: "29'53\"10" },
    { name: "樋村 銀河", furigana: "ヒムラ ギンガ", year: "②", pb5000: "14'20\"82", pb10000: "29'46\"99" },
    { name: "吉岡 斗真", furigana: "ヨシオカ トウマ", year: "②", pb5000: "13'56\"99", pb10000: "30'08\"31" },
    { name: "夏見 虹汰", furigana: "ナツミ ジジロウ", year: "①", pb5000: "14'15\"75", pb10000: "29'32\"63" }
  ];

  const getYearColor = (year: string) => {
    switch (year) {
      case "④": return "from-red-50 to-pink-50 border-red-200 text-red-800";
      case "③": return "from-blue-50 to-indigo-50 border-blue-200 text-blue-800";
      case "②": return "from-green-50 to-emerald-50 border-green-200 text-green-800";
      case "①": return "from-yellow-50 to-amber-50 border-yellow-200 text-yellow-800";
      default: return "from-gray-50 to-slate-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <NewsDetailLayout
      title="第57回 全日本大学駅伝予選会 メンバー発表!"
      date="2025年5月19日"
    >
      {/* 大会情報 */}
      <NewsHighlight theme="purple" delay={0.2}>
        <div className="text-center">
          <Medal className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-purple-900 mb-2">
            第57回 全日本大学駅伝予選会
          </h2>
          <p className="text-purple-700">
            登録メンバーが決定いたしました
          </p>
        </div>
      </NewsHighlight>

      {/* 登録メンバー一覧セクション */}
      <NewsSection
        title="登録メンバー"
        icon={Users}
        theme="purple"
        delay={0.4}
      >
        <div className="space-y-4">
          {members.map((member, index) => (
            <div
              key={index}
              className={`p-6 bg-gradient-to-r ${getYearColor(member.year)} rounded-xl border hover:shadow-md transition-all duration-300`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* 選手情報 */}
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm opacity-80 mb-1">{member.furigana}</p>
                  <span className="inline-block bg-white bg-opacity-60 px-2 py-1 rounded-full text-sm font-semibold">
                    {member.year}年生
                  </span>
                </div>
                
                {/* 5000m記録 */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">5000m PB</span>
                  </div>
                  <p className="text-lg font-bold">{member.pb5000}</p>
                </div>
                
                {/* 10000m記録 */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">10000m PB</span>
                  </div>
                  <p className="text-lg font-bold">{member.pb10000}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NewsSection>

      {/* 統計情報 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
          <p className="text-red-600 font-semibold">4年生</p>
          <p className="text-2xl font-bold text-red-800">
            {members.filter(m => m.year === "④").length}名
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-blue-600 font-semibold">3年生</p>
          <p className="text-2xl font-bold text-blue-800">
            {members.filter(m => m.year === "③").length}名
          </p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-green-600 font-semibold">2年生</p>
          <p className="text-2xl font-bold text-green-800">
            {members.filter(m => m.year === "②").length}名
          </p>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-yellow-600 font-semibold">1年生</p>
          <p className="text-2xl font-bold text-yellow-800">
            {members.filter(m => m.year === "①").length}名
          </p>
        </div>
      </div>

      {/* メッセージ */}
      <NewsHighlight theme="gray" delay={2.5}>
        <div className="text-center">
          <p className="text-gray-700 font-semibold text-lg mb-2">
            総勢 {members.length} 名で予選会に挑みます
          </p>
          <p className="text-gray-600">
            チーム一丸となって全日本大学駅伝本戦出場を目指します
          </p>
        </div>
      </NewsHighlight>
    </NewsDetailLayout>
  );
} 