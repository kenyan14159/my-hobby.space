"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Medal } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Record = {
  name: string;
  school: string;
  time: string;
  yearRaw: number | string | null;
  recordYear: string;
};

const recordsData: { name: string; highSchool: string; record: string; year: number | string | null; recordYear: string; }[] = [
  { name: "田島 宣弘", highSchool: "稲生高校", record: "10\"13", year: 4, recordYear: "2002年" },
  { name: "奈良 賢司", highSchool: "土浦日大", record: "10\"22", year: 4, recordYear: "2001年" },
  { name: "林 拓優", highSchool: "龍谷大付属平安", record: "10\"25", year: "M1", recordYear: "2022年" },
  { name: "井盛 雅", highSchool: "伊奈学園", record: "10\"26", year: 4, recordYear: "1999年" },
  { name: "佐分 慎弥", highSchool: "荏田高校", record: "10\"33", year: 1, recordYear: "2005年" },
  { name: "武藏 大地", highSchool: "板橋高校", record: "10\"35", year: 1, recordYear: "2024年" },
  { name: "伊藤 喜剛", highSchool: "水戸短大附属", record: "10\"38", year: null, recordYear: "1992年" },
  { name: "山本 悠史", highSchool: "明星高校", record: "10\"39", year: 2, recordYear: "2014年" },
  { name: "土田 心", highSchool: "相模原弥栄", record: "10\"39", year: 2, recordYear: "2023年" },
  { name: "大谷 介人", highSchool: "帝京安積", record: "10\"41", year: 1, recordYear: "2023年" },
  { name: "海老沢 雅人", highSchool: "日立商業", record: "10\"42", year: 3, recordYear: "1995年" },
  { name: "中島 健翔", highSchool: "小倉東", record: "10\"43", year: 4, recordYear: "2022年" },
  { name: "福本 廉", highSchool: "広島皆実", record: "10\"44", year: 4, recordYear: "2022年" },
  { name: "浦田 敬祐", highSchool: "育英高校", record: "10\"47", year: 4, recordYear: "2006年" },
  { name: "羽根 聖也", highSchool: "藤枝明誠", record: "10\"48", year: 4, recordYear: "2011年" },
  { name: "上田 正人", highSchool: "上野工業", record: "10\"49", year: 3, recordYear: "2002年" },
  { name: "吉田 碧生", highSchool: "柴田高校", record: "10\"49", year: 4, recordYear: "2024年" },
  { name: "川瀬 孝則", highSchool: "桑名高校", record: "10\"50", year: 4, recordYear: "2016年" },
  { name: "高橋 敏之", highSchool: "東北高校", record: "10\"52", year: null, recordYear: "1991年" },
  { name: "今村 憲一", highSchool: "相良高校", record: "10\"52", year: 2, recordYear: "2005年" },
  { name: "田中 壮一郎", highSchool: "埼玉栄", record: "10\"52", year: 3, recordYear: "2019年" },
  { name: "新佛 流生", highSchool: "片倉高校", record: "10\"52", year: 3, recordYear: "2024年" },
  { name: "田宮 慎吾", highSchool: "洛南高校", record: "10\"54", year: 2, recordYear: "2022年" },
  { name: "正川 雄一", highSchool: "本郷高校", record: "10\"55", year: 1, recordYear: "2004年" },
  { name: "筒井 健裕", highSchool: "白石高校", record: "10\"56", year: 4, recordYear: "2001年" },
  { name: "井澤 竜二", highSchool: "広島皆実", record: "10\"56", year: 4, recordYear: "2022年" },
  { name: "児矢野 佑都", highSchool: "つくば秀英", record: "10\"56", year: 4, recordYear: "2024年" },
  { name: "福本 昂", highSchool: "大和広陵", record: "10\"57", year: 3, recordYear: "2012年" },
  { name: "駒村 亮", highSchool: "小牧南", record: "10\"58", year: null, recordYear: "1996年" },
  { name: "藤本 裕也", highSchool: "佐野日大", record: "10\"58", year: 4, recordYear: "2001年" },
  { name: "島村 亮", highSchool: "洛南高校", record: "10\"58", year: 3, recordYear: "2015年" },
  { name: "山根 達矢", highSchool: "西武台千葉", record: "10\"58", year: 3, recordYear: "2016年" },
  { name: "銭谷 昂", highSchool: "八王子高校", record: "10\"58", year: 1, recordYear: "2018年" }
];

const records: Record[] = recordsData.map(r => ({
  name: r.name,
  school: r.highSchool,
  time: r.record,
  yearRaw: r.year,
  recordYear: r.recordYear,
}));

const formatYear = (year: number | string | null): string => {
  if (year === null) return "-";
  if (typeof year === 'number') return `${year}年`;
  return year;
};

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
];

export default function Men100mRecordPage() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs items={[
          { label: 'ホーム', href: '/' },
          { label: '陸上競技部', href: '/track-and-field' },
          { label: '歴代記録', href: '/track-and-field/records' },
          { label: '男子100m 歴代ランキング' }
        ]} />
      </div>
      <AnimatedPageHeader
        title="男子100m 歴代ランキング"
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
        <div className="font-bold text-base text-blue-900 mb-2">男子100m歴代ランキング</div>
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
                  {rec.school} / {formatYear(rec.yearRaw)} / {rec.recordYear}
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
      <div className="hidden md:block max-w-4xl mx-auto">
        <div className="mb-8 border-gray-200 bg-gray-50 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 px-6 pt-6 pb-2">
            <Medal className="w-6 h-6 text-yellow-500" strokeWidth={2} />
            <span className="text-blue-900 text-xl font-bold">男子100m歴代ランキング</span>
          </div>
          <div className="px-6 pb-6">
            <table className="w-full table-fixed text-sm border-separate border-spacing-y-1">
              <thead>
                <tr className="text-gray-800 bg-gray-200">
                  <th className="px-3 py-2 text-left rounded-l-lg w-12">順位</th>
                  <th className="px-3 py-2 text-left w-40">氏名</th>
                  <th className="px-3 py-2 text-left w-36">出身校</th>
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
                      <td className="px-3 py-2 text-center">{formatYear(rec.yearRaw)}</td>
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