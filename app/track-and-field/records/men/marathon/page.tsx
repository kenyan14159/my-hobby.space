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

// 男子マラソンの記録データ
const recordsData: RecordData[] = [
    { name: "千葉 祐一", highSchool: "東北高校", record: "2時間13分54秒", year: 4, recordYear: "1991年" },
    { name: "大塚 正美", highSchool: "水戸工業", record: "2時間16分03秒", year: 3, recordYear: "1982年" },
    { name: "坂本 亘", highSchool: "島原工業", record: "2時間17分31秒", year: 2, recordYear: "1979年" },
    { name: "関 英雄", highSchool: "水戸工業", record: "2時間17分36秒", year: 3, recordYear: "1976年" },
    { name: "植松 孝太", highSchool: "佐久長聖", record: "2時間17分57秒", year: 3, recordYear: "2024年" },
    { name: "盛本 聖也", highSchool: "洛南高校", record: "2時間19分35秒", year: 4, recordYear: "2023年" },
    { name: "大内 宏樹", highSchool: "松山商業", record: "2時間20分32秒", year: 2, recordYear: "2020年" },
    { name: "小塚 慎一", highSchool: "豊橋商業", record: "2時間21分27秒", year: 2, recordYear: "1978年" },
    { name: "田ノ上 貢一", highSchool: "大濠高校", record: "2時間22分30秒", year: 4, recordYear: "1974年" },
    { name: "関口 孝久", highSchool: "秩父農工", record: "2時間22分32秒", year: 4, recordYear: "1975年" },
    { name: "古謝 将大", highSchool: "那覇西", record: "2時間22分51秒", year: 4, recordYear: "2021年" },
    { name: "岡野 章", highSchool: "-", record: "2時間22分54秒", year: 4, recordYear: "1963年" },
    { name: "中田 盛之", highSchool: "清水市立", record: "2時間23分04秒", year: 4, recordYear: "1985年" },
    { name: "中田 一吉", highSchool: "呉工業", record: "2時間23分14秒", year: 2, recordYear: "1976年" },
    { name: "田中 弘一", highSchool: "大谷高校", record: "2時間23分28秒", year: 2, recordYear: "1969年" },
    { name: "大見 治夫", highSchool: "-", record: "2時間23分43秒", year: 3, recordYear: "1963年" },
    { name: "伊藤 保", highSchool: "神戸高校", record: "2時間24分24秒", year: 3, recordYear: "1970年" },
    { name: "石倉 義隆", highSchool: "五日市", record: "2時間24分30秒", year: 1, recordYear: "1969年" },
    { name: "小泉 雄輝", highSchool: "藤沢翔陵", record: "2時間24分46秒", year: 3, recordYear: "2014年" },
    { name: "宮崎 龍彦", highSchool: "中央農業", record: "2時間25分15秒", year: 3, recordYear: "1981年" },
    { name: "小松 巧弥", highSchool: "倉敷南", record: "2時間25分20秒", year: 2, recordYear: "2014年" },
    { name: "奥野 翔弥", highSchool: "豊川工業", record: "2時間25分28秒", year: 3, recordYear: "2014年" },
    { name: "富安 央", highSchool: "豊川工業", record: "2時間25分38秒", year: 3, recordYear: "2014年" },
    { name: "水金 大亮", highSchool: "報徳学園", record: "2時間25分41秒", year: 4, recordYear: "2024年" },
    { name: "住田 優範", highSchool: "西京高校", record: "2時間25分55秒", year: 1, recordYear: "2014年" },
    { name: "竹林 昌広", highSchool: "丸亀商業", record: "2時間26分01秒", year: 1, recordYear: "2014年" },
    { name: "坂本 充", highSchool: "島原工業", record: "2時間26分40秒", year: 2, recordYear: "1975年" },
    { name: "金井 勝政", highSchool: "-", record: "2時間27分05秒", year: 4, recordYear: "1980年" },
    { name: "小町 昌矢", highSchool: "藤沢翔陵", record: "2時間27分32秒", year: 2, recordYear: "1966年" },
    { name: "越尾 咲男", highSchool: "川口高校", record: "2時間27分38秒", year: 1, recordYear: "1969年" },
];

// データをコンポーネントで使いやすい形式に整形
const records = recordsData.map(data => {
  let formattedYear: string;
  if (data.year === null) {
    formattedYear = "-";
  } else if (typeof data.year === 'number') {
    formattedYear = `${data.year}年`;
  } else {
    formattedYear = data.year;
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
  { label: "十種競技", path: "decathlon" },
  { label: "七種競技", path: "heptathlon" },
];

export default function MenMarathonRecordPage() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs items={[
          { label: 'ホーム', href: '/' },
          { label: '陸上競技部', href: '/track-and-field' },
          { label: '歴代記録', href: '/track-and-field/records' },
          { label: '男子マラソン 歴代ランキング' }
        ]} />
      </div>
      <AnimatedPageHeader
        title="男子マラソン 歴代ランキング"
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
        <div className="font-bold text-base text-blue-900 mb-2">男子マラソン歴代ランキングTOP30</div>
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
            <span className="text-blue-900 text-xl font-bold">男子マラソン歴代ランキングTOP30</span>
          </div>
          <div className="px-6 pb-6">
            <table className="w-full table-fixed text-sm border-separate border-spacing-y-1">
              <thead>
                <tr className="text-gray-800 bg-gray-200">
                  <th className="px-3 py-2 text-left rounded-l-lg w-12">順位</th>
                  <th className="px-3 py-2 text-left w-40">氏名</th>
                  <th className="px-3 py-2 text-left w-36">学校</th>
                  <th className="px-3 py-2 text-center w-16">学年</th>
                  <th className="px-3 py-2 text-center w-28">記録</th>
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