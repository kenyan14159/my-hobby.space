"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Medal } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RecordData = {
  name: string;
  highSchool: string;
  record: string;
  year: number | string | null;
  recordYear: string;
};

// 男子十種競技の記録データ
const recordsData: RecordData[] = [
  { name: "平田 卓朗", highSchool: "八潮高校", record: "7527", year: 3, recordYear: "2001年" },
  { name: "武富 祐二", highSchool: "久留米", record: "7048", year: 4, recordYear: "2005年" },
  { name: "田中 廉人", highSchool: "川崎橘", record: "7018", year: 3, recordYear: "2019年" },
  { name: "照 光次郎", highSchool: "洛南高校", record: "6970", year: 3, recordYear: "1997年" },
  { name: "清水 陽春", highSchool: "前橋育英", record: "6957", year: 2, recordYear: "2016年" },
  { name: "黒岩 俊克", highSchool: "太成高校", record: "6916", year: null, recordYear: "1989年" },
  { name: "関川 晋哉", highSchool: "茨城キリスト教学園", record: "6909", year: null, recordYear: "1990年" },
  { name: "小野瀬 翼", highSchool: "七尾東雲", record: "6909", year: 4, recordYear: "2016年" },
  { name: "武川 幸司", highSchool: "御殿場南", record: "6893", year: null, recordYear: "1992年" },
  { name: "内藤 重人", highSchool: "小諸高校", record: "6888", year: null, recordYear: "1990年" },
  { name: "日光 忍", highSchool: "石川県立工業", record: "6865", year: null, recordYear: "1987年" },
  { name: "宮内 夏葵", highSchool: "東京高校", record: "6862", year: 2, recordYear: "2024年" },
  { name: "家永 晴郎", highSchool: "大塚高校", record: "6858", year: 3, recordYear: "2005年" },
  { name: "中川 一紀", highSchool: "草加南", record: "6857", year: "M1", recordYear: "1995年" },
  { name: "原田 恭宏", highSchool: "天草工業", record: "6849", year: 3, recordYear: "1995年" },
  { name: "塚本 義貴", highSchool: "勢多農林", record: "6814", year: 4, recordYear: "2017年" },
  { name: "熊崎 大和", highSchool: "美濃加茂", record: "6762", year: 3, recordYear: "2019年" },
  { name: "猪狩 大輔", highSchool: "平工業", record: "6759", year: 4, recordYear: "2013年" },
  { name: "會田 裕亮", highSchool: "八潮高校", record: "6713", year: 4, recordYear: "2009年" },
  { name: "山本 学", highSchool: "盛岡南", record: "6629", year: 4, recordYear: "2008年" },
  { name: "遊佐 祥太", highSchool: "利府高校", record: "6620", year: 3, recordYear: "2024年" },
  { name: "山田 剛", highSchool: "東海大浦安", record: "6597", year: 3, recordYear: "1994年" },
  { name: "畑山 茂雄", highSchool: "黒石高校", record: "6584", year: 2, recordYear: "1996年" },
  { name: "宋 強賢", highSchool: "東京高校", record: "6578", year: 4, recordYear: "2007年" },
  { name: "山田 海太", highSchool: "相洋高校", record: "6576", year: 4, recordYear: "2012年" },
  { name: "柿沼 厚吏", highSchool: "西邑楽", record: "6561", year: 3, recordYear: "2007年" },
  { name: "高梨 博文", highSchool: "西武台千葉", record: "6547", year: 4, recordYear: "1996年" },
  { name: "大野 慎一郎", highSchool: "山口高校", record: "6522", year: 3, recordYear: "2012年" },
  { name: "大橋 一耀", highSchool: "会津学鳳", record: "6514", year: 4, recordYear: "2024年" },
  { name: "九鬼 正光", highSchool: "添上高校", record: "6489", year: null, recordYear: "1995年" }
];

// データをコンポーネントで使いやすい形式に整形
const records = recordsData.map(data => {
  let formattedYear: string;
  if (data.year === null) {
    formattedYear = "-";
  } else if (typeof data.year === 'number') {
    formattedYear = `${data.year}年`;
  } else {
    formattedYear = data.year; // "M1" などをそのまま使用
  }

  return {
    name: data.name,
    school: data.highSchool,
    time: data.record, // 構造を合わせるため'time'を使用するが、内容は得点
    year: formattedYear,
    recordYear: data.recordYear,
  };
});

const events = [
    { label: "100m", path: "100m" },
    { label: "200m", path: "200m" },
    { label: "400m", path: "400m" },
    { label: "800m", path: "800m" },
    { label: "1500m", path: "1500m" },
    { label: "3000m障害", path: "3000msc" },
    { label: "110mH", path: "110mh" },
    { label: "100mH", path: "100mh" },
    { label: "400mH", path: "400mh" },
    { label: "5000m", path: "5000m" },
    { label: "10000m", path: "10000m" },
    { label: "20km競歩", path: "20kmwalk" },
    { label: "10000m競歩", path: "10000mwalk" },
    { label: "ハーフマラソン", path: "half-marathon" },
    { label: "マラソン", path: "marathon" },
    { label: "リレー", path: "relay" },
    { label: "三段跳", path: "triple-jump" },
    { label: "走幅跳", path: "long-jump" },
    { label: "棒高跳", path: "pole-vault" },
    { label: "走高跳", path: "high-jump" },
    { label: "砲丸投", path: "shot-put" },
    { label: "円盤投", path: "discus" },
    { label: "十種競技", path: "decathlon" },
    { label: "七種競技", path: "heptathlon" },
];

export default function MenDecathlonRecordPage() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedPageHeader
        title="男子十種競技 歴代ランキング"
      />
      {/* 他の記録へボタン */}
      <div className="mb-6 flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
          onClick={() => setShowLinks((prev) => !prev)}
          aria-expanded={showLinks}
        >
          他の記録へ
          {showLinks ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      {/* 種目リンクボタン（男子・女子） */}
      <div
        className={`transition-all duration-300 overflow-hidden ${showLinks ? 'max-h-[2000px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}
        aria-hidden={!showLinks}
      >
        <div className="flex flex-col gap-4">
          {/* 男子カテゴリ */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-blue-800 text-lg">男子</span>
              <span className="text-blue-400"><Medal className="w-5 h-5" /></span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {events.map((event) => (
                <Link
                  key={"men-" + event.path}
                  href={`/track-and-field/records/men/${event.path}`}
                  className="flex items-center justify-between px-3 py-2 bg-white border border-blue-200 rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md transition group"
                >
                  <span className="text-blue-900 font-medium text-sm">{event.label}</span>
                  <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              ))}
            </div>
          </div>
          {/* 女子カテゴリ */}
          <div className="bg-pink-50/60 border border-pink-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-pink-700 text-lg">女子</span>
              <span className="text-pink-400"><Medal className="w-5 h-5" /></span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {events.map((event) => (
                <Link
                  key={"women-" + event.path}
                  href={`/track-and-field/records/women/${event.path}`}
                  className="flex items-center justify-between px-3 py-2 bg-white border border-pink-200 rounded-lg shadow-sm hover:bg-pink-100 hover:shadow-md transition group"
                >
                  <span className="text-pink-800 font-medium text-sm">{event.label}</span>
                  <ArrowRight className="w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* モバイル用カード型ランキング */}
      <div className="block md:hidden max-w-2xl mx-auto space-y-3">
        <div className="font-bold text-base text-blue-900 mb-2">男子十種競技歴代ランキングTOP30</div>
        {records.map((rec, i) => {
          const isNew = rec.recordYear === "2024年";
          return (
            <div
              key={rec.name + rec.time}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
            >
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold text-lg mr-1">{i + 1}.</span>
                  <span className="font-bold text-base text-gray-900">{rec.name}</span>
                  {isNew && (
                    <span className="ml-1 px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs font-bold">New</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 truncate">
                  {rec.school} / {rec.year} / {rec.recordYear}
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="font-extrabold text-lg text-gray-900 font-mono">{rec.time}</span>
              </div>
            </div>
          );
        })}
        <p className="text-xs text-gray-500 mt-4">情報に誤りがある可能性があります。お気づきの点があればご連絡ください。</p>
      </div>
      {/* PC用テーブル型ランキング */}
      <div className="hidden md:block max-w-3xl mx-auto">
        <div className="mb-8 border-gray-200 bg-gray-50 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 px-6 pt-6 pb-2">
            <Medal className="w-6 h-6 text-yellow-500" strokeWidth={2} />
            <span className="text-blue-900 text-xl font-bold">男子十種競技歴代ランキングTOP30</span>
          </div>
          <div className="px-6 pb-6">
            <table className="w-full table-fixed text-sm border-separate border-spacing-y-1">
              <thead>
                <tr className="text-gray-800 bg-gray-200">
                  <th className="px-3 py-2 text-left rounded-l-lg w-12">順位</th>
                  <th className="px-3 py-2 text-left w-40">氏名</th>
                  <th className="px-3 py-2 text-left w-36">学校</th>
                  <th className="px-3 py-2 text-center w-16">学年</th>
                  <th className="px-3 py-2 text-center w-24">記録</th>
                  <th className="px-3 py-2 text-center rounded-r-lg w-20">年</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, i) => {
                  const isNew = rec.recordYear === "2024年";
                  let rowClass = "";
                  if (i < 3) {
                    rowClass = "bg-yellow-50 font-bold";
                  } else if (i % 2 === 0) {
                    rowClass = "bg-white";
                  } else {
                    rowClass = "bg-gray-50";
                  }
                  return (
                    <tr
                      key={rec.name + rec.time}
                      className={rowClass}
                    >
                      <td className="px-3 py-2 text-center rounded-l-lg">{i + 1}</td>
                      <td className="px-3 py-2 flex items-center gap-2">
                        {rec.name}
                        {isNew && (
                          <span className="ml-1 px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs font-bold">New</span>
                        )}
                      </td>
                      <td className="px-3 py-2">{rec.school}</td>
                      <td className="px-3 py-2 text-center">{rec.year}</td>
                      <td className="px-3 py-2 text-center font-mono">{rec.time}</td>
                      <td className="px-3 py-2 text-center rounded-r-lg">{rec.recordYear}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-4">情報に誤りがある可能性があります。</p>
          </div>
        </div>
      </div>
    </div>
  );
}