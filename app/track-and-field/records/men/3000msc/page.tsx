"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Medal } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 男子3000m障害の記録データ
const recordsData = [
  { name: "新宅 雅也", affiliation: "西条農業 / 4年", recordYear: "1979年", time: "8'25\"88" },
  { name: "大塚 正美", affiliation: "水戸工業 / 3年", recordYear: "1981年", time: "8'39\"11" },
  { name: "梅枝 裕吉", affiliation: "稲生高校 / 4年", recordYear: "2005年", time: "8'40\"63" },
  { name: "中村 孝生", affiliation: "前橋工業 / 3年", recordYear: "1978年", time: "8'43\"8" },
  { name: "岡 俊博", affiliation: "高松商業 / 4年", recordYear: "1982年", time: "8'47\"2" },
  { name: "照井 典勝", affiliation: "花巻商業 / 4年", recordYear: "1978年", time: "8'48\"7" },
  { name: "村上 邦弘", affiliation: "世羅高校 / 3年", recordYear: "1973年", time: "8'49\"2" },
  { name: "天瀬 海斗", affiliation: "盛岡大附 / 3年", recordYear: "2025年", time: "8'49\"23" },
  { name: "溜井 浩章", affiliation: "東海浦安 / 3年", recordYear: "1991年", time: "8'49\"60" },
  { name: "川島 伸次", affiliation: "飯能高校 / 4年", recordYear: "1987年", time: "8'50\"70" },
  { name: "小暮 守雄", affiliation: "/ 2年", recordYear: "1966年", time: "8'50\"8" },
  { name: "奈良 真太郎", affiliation: "東北高校 / 1年", recordYear: "2008年", time: "8'51\"23" },
  { name: "岩渕 仁", affiliation: "大船渡 / 4年", recordYear: "1971年", time: "8'52\"8" },
  { name: "九嶋 大雅", affiliation: "伊賀白鳳 / 3年", recordYear: "2021年", time: "8'52\"99" },
  { name: "分須 尊紀", affiliation: "東農大二 / 2年", recordYear: "2022年", time: "8'53\"04" },
  { name: "木村 友泰", affiliation: "清風高校 / 2年", recordYear: "1997年", time: "8'53\"3" },
  { name: "荒野 吉之", affiliation: "鉾田第一 / 2年", recordYear: "1974年", time: "8'53\"8" },
  { name: "佐藤 和也", affiliation: "仙台育英 / 3年", recordYear: "2004年", time: "8'55\"57" },
  { name: "沼井 俊輔", affiliation: "札幌山手 / 2年", recordYear: "2010年", time: "8'55\"84" },
  { name: "田口 篤", affiliation: "本荘高校 / 1年", recordYear: "1995年", time: "8'56\"25" },
  { name: "野呂 進", affiliation: "弘前高校 / 4年", recordYear: "1968年", time: "8'57\"0" },
  { name: "北中 純一", affiliation: "由良育英 / 3年", recordYear: "1976年", time: "8'57\"0" },
  { name: "山口 和也", affiliation: "世羅高校 / 2年", recordYear: "2017年", time: "8'57\"25" },
  { name: "知念 真吾", affiliation: "沖縄工業 / 4年", recordYear: "2004年", time: "8'57\"91" },
  { name: "白永 真彦", affiliation: "洛南高校 / 3年", recordYear: "2016年", time: "8'58\"30" },
  { name: "瀬戸口 直樹", affiliation: "報徳学園 / 2年", recordYear: "1999年", time: "8'58\"45" },
  { name: "富永 椋太", affiliation: "鉾田第一 / 2年", recordYear: "2022年", time: "8'59\"55" },
  { name: "今井 武紀", affiliation: "松山商業 / 4年", recordYear: "1986年", time: "8'59\"59" },
  { name: "高橋 良和", affiliation: "五領ケ台 / 4年", recordYear: "1999年", time: "8'59\"6" },
  { name: "小松 力歩", affiliation: "学法石川 / 3年", recordYear: "2018年", time: "8'59\"63" },
];

// テンプレートのキー名に合わせてデータを変換
const records = recordsData.map(r => {
    const affiliationParts = r.affiliation.split(' / ');
    const school = affiliationParts[0].trim() || "-";
    const year = affiliationParts.length > 1 ? affiliationParts[1].trim() : "-";
    const formattedTime = r.time.replace("'", ":").replace('"', '.').replace('"', '');
    
    return {
        name: r.name,
        school: school,
        time: formattedTime,
        year: year,
        recordYear: r.recordYear,
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

export default function Men3000mscRecordPage() {
  const [showLinks, setShowLinks] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedPageHeader
        title="男子3000m障害 歴代ランキング"
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
        <div className="font-bold text-base text-blue-900 mb-2">男子3000m障害 歴代ランキング</div>
        {records.map((rec, i) => {
          const isNew = parseInt(rec.recordYear) >= currentYear;
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
            <span className="text-blue-900 text-xl font-bold">男子3000m障害 歴代ランキング</span>
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
                  const isNew = parseInt(rec.recordYear) >= currentYear;
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