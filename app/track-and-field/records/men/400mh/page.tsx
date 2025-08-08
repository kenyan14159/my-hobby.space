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
  { name: "渡邊 修", highSchool: "十日町高校", record: "48\"51", year: 3, recordYear: "2024年" },
  { name: "水野 龍彦", highSchool: "桐蔭学園", record: "49\"99", year: 4, recordYear: "2012年" },
  { name: "木村 大輔", highSchool: "倉敷工業", record: "50\"05", year: 3, recordYear: "2008年" },
  { name: "米田 太陽", highSchool: "九州学院", record: "50\"33", year: 3, recordYear: "2022年" },
  { name: "江田 茂行", highSchool: "長岡高校", record: "50\"56", year: "M1", recordYear: "1993年" },
  { name: "蜷川 知秀", highSchool: "牛久高校", record: "50\"59", year: "S1", recordYear: "2005年" },
  { name: "崎山 仁", highSchool: "杵築高校", record: "50\"72", year: 4, recordYear: "2003年" },
  { name: "飯塚 啓伍", highSchool: "東北高校", record: "50\"74", year: 4, recordYear: "2017年" },
  { name: "山本 健太", highSchool: "宇治山田商業", record: "50\"92", year: 3, recordYear: "2009年" },
  { name: "山崎 高人", highSchool: "相洋高校", record: "50\"96", year: 4, recordYear: "1996年" },
  { name: "渡辺 航平", highSchool: "福岡城南", record: "51\"15", year: 4, recordYear: "2004年" },
  { name: "大串 卓也", highSchool: "東京高校", record: "51\"22", year: 1, recordYear: "2013年" },
  { name: "成松 伸朗", highSchool: "佐伯鶴城", record: "51\"36", year: 2, recordYear: "1993年" },
  { name: "宮田 正美", highSchool: "六日町高校", record: "51\"46", year: null, recordYear: "1984年" },
  { name: "木全 広大", highSchool: "愛工大名電", record: "51\"47", year: 3, recordYear: "2013年" },
  { name: "中野 萌人", highSchool: "八戸西", record: "51\"55", year: 2, recordYear: "2024年" },
  { name: "高橋 竜成", highSchool: "つくば秀英", record: "51\"65", year: 1, recordYear: "2019年" },
  { name: "鈴木 勇人", highSchool: "下妻二", record: "51\"69", year: 3, recordYear: "2015年" },
  { name: "宮内 夏葵", highSchool: "東京高校", record: "51\"76", year: 2, recordYear: "2024年" },
  { name: "赤木 健太郎", highSchool: "姫路商業", record: "51\"78", year: 4, recordYear: "2013年" },
  { name: "佐々木 啓人", highSchool: "浜松商", record: "51\"86", year: 3, recordYear: "2024年" },
  { name: "山中 辰男", highSchool: "柏日体", record: "51\"88", year: 4, recordYear: "1985年" },
  { name: "山田 泰雅", highSchool: "岡山一宮", record: "51\"90", year: 2, recordYear: "2019年" },
  { name: "甲斐 政人", highSchool: "延岡東", record: "51\"94", year: 3, recordYear: "2004年" },
  { name: "柴沼 貴文", highSchool: "笠間高校", record: "51\"96", year: null, recordYear: "1984年" },
  { name: "古賀 翔吾", highSchool: "相洋高校", record: "51\"97", year: 3, recordYear: "2022年" },
  { name: "大西 真仁", highSchool: "大町高校", record: "52\"16", year: 3, recordYear: "2005年" },
  { name: "槙 浩二", highSchool: "西条農業", record: "52\"24", year: 2, recordYear: "1989年" },
  { name: "小野 浩介", highSchool: "日立工業", record: "52\"24", year: 1, recordYear: "2017年" },
  { name: "北村 貴嗣", highSchool: "福島成蹊", record: "52\"36", year: 4, recordYear: "2018年" }
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

export default function Men400mhRecordPage() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs items={[
          { label: 'ホーム', href: '/' },
          { label: '陸上競技部', href: '/track-and-field' },
          { label: '歴代記録', href: '/track-and-field/records' },
          { label: '男子400mH 歴代ランキング' }
        ]} />
      </div>
      <AnimatedPageHeader
        title="男子400mH 歴代ランキング"
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
        <div className="font-bold text-base text-blue-900 mb-2">男子400mH歴代ランキングTOP30</div>
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
            <span className="text-blue-900 text-xl font-bold">男子400mH歴代ランキングTOP30</span>
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