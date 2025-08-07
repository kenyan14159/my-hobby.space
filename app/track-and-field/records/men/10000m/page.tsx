"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
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
  { name: "池田 燿平", highSchool: "島田高校", record: "27'58\"52", year: 4, recordYear: "2020年" },
  { name: "北村 聡", highSchool: "西脇工業", record: "28'00\"22", year: 4, recordYear: "2007年" },
  { name: "藤本 珠輝", highSchool: "西脇工業", record: "28'08\"58", year: 3, recordYear: "2021年" },
  { name: "田島 駿介", highSchool: "旭野高校", record: "28'11\"41", year: 3, recordYear: "2024年" },
  { name: "山崎 丞", highSchool: "中越高校", record: "28'19\"33", year: 3, recordYear: "2024年" },
  { name: "平島 龍斗", highSchool: "相洋高校", record: "28'20\"32", year: 3, recordYear: "2024年" },
  { name: "服部 翔大", highSchool: "埼玉栄", record: "28'22\"79", year: 4, recordYear: "2013年" },
  { name: "森 賢大", highSchool: "鹿児島実", record: "28'25\"08", year: 2, recordYear: "2007年" },
  { name: "野口 拓也", highSchool: "東北高校", record: "28'25\"27", year: 4, recordYear: "2010年" },
  { name: "山中 秀仁", highSchool: "興国高校", record: "28'26\"03", year: 2, recordYear: "2013年" },
  { name: "保科 光作", highSchool: "東北高校", record: "28'28\"20", year: 4, recordYear: "2006年" },
  { name: "出口 和也", highSchool: "藤代高校", record: "28'34\"02", year: 3, recordYear: "2009年" },
  { name: "大内 宏樹", highSchool: "松山高校", record: "28'36\"58", year: 4, recordYear: "2021年" },
  { name: "四辻 聖", highSchool: "報徳学園", record: "28'40\"07", year: 3, recordYear: "2003年" },
  { name: "住原 聡太", highSchool: "豊川工業", record: "28'41\"88", year: 4, recordYear: "2024年" },
  { name: "中川 翔太", highSchool: "九州学院", record: "28'41\"91", year: 4, recordYear: "2019年" },
  { name: "漆畑 徳輝", highSchool: "山梨学院", record: "28'42\"26", year: 4, recordYear: "2023年" },
  { name: "野田 道胤", highSchool: "上野工業", record: "28'43\"27", year: 2, recordYear: "1994年" },
  { name: "中村 孝生", highSchool: "前橋工業", record: "28'45\"4", year: 3, recordYear: "1978年" },
  { name: "本田 匠", highSchool: "九州学院", record: "28'46\"38", year: 3, recordYear: "2012年" },
  { name: "山口 和也", highSchool: "世羅高校", record: "28'46\"82", year: 4, recordYear: "2019年" },
  { name: "名村 樹哉", highSchool: "四日市工", record: "28'46\"96", year: 2, recordYear: "2020年" },
  { name: "矢野 圭吾", highSchool: "佐久長聖", record: "28'47\"79", year: 4, recordYear: "2013年" },
  { name: "小町 昌矢", highSchool: "藤沢翔陵", record: "28'48\"75", year: 2, recordYear: "2015年" },
  { name: "大塚 正美", highSchool: "水戸工業", record: "28'48\"9", year: 3, recordYear: "1981年" },
  { name: "分須 尊紀", highSchool: "東農大二", record: "28'49\"01", year: 4, recordYear: "2024年" },
  { name: "廣澤 優斗", highSchool: "真岡高校", record: "28'49\"47", year: 4, recordYear: "2022年" },
  { name: "富安 央", highSchool: "豊川工業", record: "28'49\"53", year: 2, recordYear: "2015年" },
  { name: "九嶋 大雅", highSchool: "伊賀白鳳", record: "28'50\"25", year: 4, recordYear: "2022年" },
  { name: "森下 滉太", highSchool: "豊橋南", record: "-", year: 4, recordYear: "2020年" }
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

export default function Men10000mRecordPage() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedPageHeader
        title="男子10000m 歴代ランキング"
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
        <div className="font-bold text-base text-blue-900 mb-2">男子10000m歴代ランキングTOP30</div>
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
            <span className="text-blue-900 text-xl font-bold">男子10000m歴代ランキングTOP30</span>
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