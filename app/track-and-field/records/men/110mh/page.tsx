"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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

// 男子110mHの記録データ
const recordsData: RecordData[] = [
  { name: "栄田 竜生", highSchool: "諫早農業", record: "13\"73", year: 3, recordYear: "2021年" },
  { name: "粟野 祐弥", highSchool: "山形中央", record: "13\"86", year: "M1", recordYear: "2013年" },
  { name: "江田 茂行", highSchool: "長岡高校", record: "13\"87", year: "M2", recordYear: "1997年" },
  { name: "中村 兼希", highSchool: "野々市明倫", record: "13\"88", year: 2, recordYear: "2004年" },
  { name: "隈元 康太", highSchool: "宇治山田商業", record: "13\"89", year: 4, recordYear: "2005年" },
  { name: "吉川 善崇", highSchool: "新栄高校", record: "13\"94", year: 3, recordYear: "2002年" },
  { name: "柘植 雄介", highSchool: "名古屋学院", record: "13\"95", year: 3, recordYear: "1992年" },
  { name: "北木 裕太", highSchool: "広島皆実", record: "13\"99", year: 2, recordYear: "2019年" },
  { name: "福本 廉", highSchool: "広島皆実", record: "13\"99", year: 3, recordYear: "2021年" },
  { name: "渡部 信人", highSchool: "津川高校", record: "14\"01", year: 4, recordYear: "1998年" },
  { name: "伊藤 充貴", highSchool: "恵那北", record: "14\"02", year: null, recordYear: "1991年" },
  { name: "佐々木 啓人", highSchool: "浜松商業", record: "14\"04", year: 4, recordYear: "2024年" },
  { name: "向原 洋一", highSchool: "山北高校", record: "14\"06", year: null, recordYear: "1992年" },
  { name: "大久保 然", highSchool: "長岡大手", record: "14\"07", year: 1, recordYear: "2024年" },
  { name: "植草 雄貴", highSchool: "磯辺高校", record: "14\"11", year: 3, recordYear: "2021年" },
  { name: "鉄口 蓮", highSchool: "広島皆実", record: "14\"11", year: "M2", recordYear: "2022年" },
  { name: "下鳥 達也", highSchool: "高田工業", record: "14\"12", year: null, recordYear: "1994年" },
  { name: "吉村 健吾", highSchool: "豊田北", record: "14\"13", year: 4, recordYear: "2013年" },
  { name: "小沢 茂", highSchool: "佐原高校", record: "14\"16", year: null, recordYear: "1988年" },
  { name: "渡邉 悠希", highSchool: "開志国際", record: "14\"18", year: 2, recordYear: "2022年" },
  { name: "水野 増彦", highSchool: "平工業", record: "14\"21", year: 4, recordYear: "1982年" },
  { name: "阿部 秀幸", highSchool: "湯本高校", record: "14\"22", year: 3, recordYear: "1992年" },
  { name: "高木 大悟", highSchool: "安房農業", record: "14\"22", year: 4, recordYear: "2000年" },
  { name: "江口 悠貴", highSchool: "九里学園", record: "14\"23", year: 1, recordYear: "2013年" },
  { name: "馬場 成史", highSchool: "中越高校", record: "14\"27", year: 3, recordYear: "2001年" },
  { name: "佐々木 悠佑", highSchool: "高田高校", record: "14\"29", year: 4, recordYear: "2007年" },
  { name: "松本 翔太郎", highSchool: "大阪高校", record: "14\"30", year: 2, recordYear: "2003年" },
  { name: "鈴木 秀幸", highSchool: "相洋高校", record: "14\"30", year: 4, recordYear: "2009年" },
  { name: "河北 柊真", highSchool: "皇學館", record: "14\"33", year: 2, recordYear: "2024年" },
  { name: "福本 吉勝", highSchool: "富山商業", record: "14\"34", year: 4, recordYear: "1996年" }
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
    time: data.record,
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
];

export default function Men110mHRecordPage() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs items={[
          { label: 'ホーム', href: '/' },
          { label: '陸上競技部', href: '/track-and-field' },
          { label: '歴代記録', href: '/track-and-field/records' },
          { label: '男子110mH 歴代ランキング' }
        ]} />
      </div>
      <AnimatedPageHeader
        title="男子110mH 歴代ランキング"
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
        <div className="font-bold text-base text-blue-900 mb-2">男子110mH歴代ランキングTOP30</div>
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
            <span className="text-blue-900 text-xl font-bold">男子110mH歴代ランキングTOP30</span>
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