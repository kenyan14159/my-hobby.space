"use client";
import { useState } from "react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import Link from "next/link";

type Member = {
  name: string;
  furigana: string;
  role: string;
  event: string;
  pb: string;
  school: string;
  from: string;
};

const membersByGrade: { grade: string; members: Member[] }[] = [
  {
    grade: "博士課程",
    members: [
      {
        name: "山手 勇一",
        furigana: "ヤマテ ユウイチ",
        role: "博士3年 / コーチ",
        event: "やり投げ",
        pb: "34.91m",
        school: "生駒",
        from: "奈良県",
      },
    ],
  },
  {
    grade: "修士課程",
    members: [
      {
        name: "福永 凌太",
        furigana: "フクナガ リョウタ",
        role: "院2年",
        event: "100m<br>400m<br>走幅跳",
        pb: "100m: 10.89<br>400m: 47.79<br>走幅跳: 7.03m",
        school: "中京大学",
        from: "滋賀県",
      },
    ],
  },
  {
    grade: "4年生",
    members: [
      {
        name: "坂井 陸剛",
        furigana: "サカイ リクト",
        role: "4年",
        event: "やり投げ",
        pb: "54.01m",
        school: "私立創成館高等学校",
        from: "長崎県",
      },
      {
        name: "古屋 元気",
        furigana: "フルヤ モトキ",
        role: "4年 / 主任",
        event: "やり投げ",
        pb: "30.64m",
        school: "千葉県立千葉商業高等学校",
        from: "千葉県",
      },
    ],
  },
  {
    grade: "3年生",
    members: [
      {
        name: "熱田 笙馬",
        furigana: "アツタ ショウマ",
        role: "3年",
        event: "100m<br>200m",
        pb: "100m: 11.27<br>200m: 23.36",
        school: "埼玉県立特別支援学校<br>大宮ろう学園",
        from: "埼玉県",
      },
    ],
  },
  {
    grade: "2年生",
    members: [
      {
        name: "花牟 禮潔",
        furigana: "ハナムレ キヨシ",
        role: "2年",
        event: "400m",
        pb: "54.52",
        school: "樟南高等学校",
        from: "鹿児島県",
      },
    ],
  },
  {
    grade: "1年生",
    members: [
      {
        name: "四方 遥輝",
        furigana: "シカタ ハルキ",
        role: "1年",
        event: "100m",
        pb: "11.67",
        school: "京都共栄学園高校",
        from: "京都府",
      },
    ],
  },
];

// pbを配列化する関数
function parsePB(pb: string): string[] {
  return pb.replace(/<br\s*\/?>/g, "\n").split("\n").map(s => s.trim()).filter(Boolean);
}

// タブの順序を定義
const gradeOrder = ["博士課程", "修士課程", "4年生", "3年生", "2年生", "1年生"];
const gradeTabs = gradeOrder.filter(g => membersByGrade.some(mg => mg.grade === g && mg.members.length > 0));

const blocks = [
  { label: "短距離男子", path: "sprint-men", color: "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100" },
  { label: "短距離女子", path: "sprint-women", color: "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100" },
  { label: "中距離男子", path: "middle-men", color: "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100" },
  { label: "中距離女子", path: "middle-women", color: "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100" },
  { label: "駅伝男子", path: "ekiden-men", color: "bg-yellow-50 text-yellow-900 border-yellow-200 hover:bg-yellow-100" },
  { label: "駅伝女子", path: "ekiden-women", color: "bg-yellow-50 text-yellow-900 border-yellow-200 hover:bg-yellow-100" },
  { label: "跳躍男子", path: "jump-men", color: "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100" },
  { label: "跳躍女子", path: "jump-women", color: "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100" },
  { label: "投擲男子", path: "throw-men", color: "bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100" },
  { label: "投擲女子", path: "throw-women", color: "bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100" },
  { label: "混成男子", path: "combined-men", color: "bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100" },
  { label: "混成女子", path: "combined-women", color: "bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100" },
  { label: "パラ", path: "para", color: "bg-green-50 text-green-900 border-green-200 hover:bg-green-100" },
  { label: "トレーナー男子", path: "trainer-men", color: "bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100" },
  { label: "トレーナー女子", path: "trainer-women", color: "bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100" },
  { label: "本部スタッフ", path: "staff", color: "bg-gray-50 text-gray-900 border-gray-200 hover:bg-gray-100" },
];

export default function ParaAthletePage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <AnimatedPageHeader
        title="パラアスリート 選手・スタッフ"
      />
      {/* ブロックリンクボタン */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {blocks.map((block) => (
          <Link
            key={block.path}
            href={`/track-and-field/members/${block.path}`}
            className={`block border font-semibold rounded-lg px-3 py-3 text-center transition ${block.color}`}
          >
            {block.label}
          </Link>
        ))}
      </div>
      {/* タブ切り替え */}
      <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-8">
        {gradeTabs.map((grade) => (
          <button
            key={grade}
            className={`px-4 py-2 rounded-t-lg border-b-2 font-bold text-base sm:text-lg transition-all ${selectedGrade === grade ? "border-gray-700 bg-white text-gray-900" : "border-transparent bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
            onClick={() => setSelectedGrade(grade)}
          >
            {grade}
          </button>
        ))}
      </div>
      {/* カード型グリッド表示 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selectedMembers.map((m) => (
          <div key={m.name} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
            <div className="font-bold text-lg text-gray-900 mb-1">{m.name}</div>
            <div className="text-xs text-gray-500 mb-1">（{m.furigana.replace(/\s+/g, " ")}）</div>
            <div className="text-xs text-gray-400 mb-2">
                {parsePB(m.school).map((s, i) => <div key={i}>{s}</div>)}・{m.from}
            </div>
            {m.role && m.role !== "-" && (
              <div className="text-gray-600 text-xs font-semibold mb-2 bg-gray-100 px-2 py-0.5 rounded-full">{m.role}</div>
            )}
            {m.pb && m.pb !== "-" && (
              <div className="text-xs text-gray-600 w-full mt-2">
                {parsePB(m.pb).map((pb, i) => (
                  <div key={i}>{pb}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 text-xs text-gray-500 text-center">
        ※自己ベストは誤りがある可能性があります。
      </div>
    </main>
  );
}