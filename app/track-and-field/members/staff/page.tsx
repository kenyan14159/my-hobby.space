"use client";
import { useState } from "react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import Link from "next/link";

type Member = {
  name: string;
  furigana: string;
  role: string; // 本部役職
  event: string; // 所属ブロック
  pb: string;
  school: string;
  from: string;
};

const membersByGrade: { grade: string; members: Member[] }[] = [
  {
    grade: "4年生",
    members: [
      { name: "上田 紗椰", furigana: "ウエダ サヤ", role: "本部会計", event: "跳躍ブロック", pb: "-", school: "-", from: "-" },
      { name: "角田 穏紅", furigana: "カクタ シズク", role: "本部主務", event: "跳躍ブロック", pb: "-", school: "-", from: "-" },
      { name: "加藤 美奈", furigana: "カトウ ミナ", role: "本部主務", event: "投擲ブロック", pb: "-", school: "-", from: "-" },
      { name: "川端 大輝", furigana: "カワバタ ダイキ", role: "本部会計", event: "中距離ブロック", pb: "-", school: "-", from: "-" },
      { name: "城野 伽奈恵", furigana: "シロノ カナエ", role: "本部庶務", event: "投擲ブロック", pb: "-", school: "-", from: "-" },
      { name: "島田 康平", furigana: "シマダ コウヘイ", role: "本部庶務", event: "混成ブロック", pb: "-", school: "-", from: "-" },
      { name: "日景 裕由", furigana: "ヒカゲ ユウ", role: "本部主務", event: "短距離ブロック", pb: "-", school: "-", from: "-" },
    ],
  },
  {
    grade: "3年生",
    members: [
      { name: "大木 詩織", furigana: "オオキ シオリ", role: "庶務補佐", event: "短距離ブロック", pb: "-", school: "-", from: "-" },
      { name: "佐藤 れいら", furigana: "サトウ レイラ", role: "会計補佐", event: "混成ブロック", pb: "-", school: "-", from: "-" },
      { name: "中野 萌人", furigana: "ナカノ メイト", role: "会計補佐", event: "短距離ブロック", pb: "-", school: "-", from: "-" },
      { name: "古田 匠馬", furigana: "フルタ ショウマ", role: "本部主務補佐", event: "混成ブロック", pb: "-", school: "-", from: "-" },
      { name: "湯本 万結", furigana: "ユモト マユ", role: "主務補佐", event: "投擲ブロック", pb: "-", school: "-", from: "-" },
    ],
  },
];

// pbを配列化する関数 (このページでは使用しないが、テンプレートとして保持)
function parsePB(pb: string): string[] {
  return pb.replace(/<br\s*\/?>(\s*)?/g, "\n").split("\n").map(s => s.trim()).filter(Boolean);
}

// タブ順を1年生→4年生に固定
const gradeOrder = ["1年生", "2年生", "3年生", "4年生"];
const gradeTabs = gradeOrder.filter(g => membersByGrade.some(mg => mg.grade === g));

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

export default function StaffPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <AnimatedPageHeader
        title="本部スタッフメンバー"
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
      <div className="flex justify-center gap-2 sm:gap-4 mb-8">
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
          <div key={m.name + m.role} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
            <div className="font-bold text-lg text-gray-900 mb-1">{m.name}</div>
            <div className="text-xs text-gray-500 mb-2">（{m.furigana.replace(/\s+/g, " ")}）</div>
            
            {/* 本部役職 */}
            {m.role && m.role !== "-" && (
              <div className="text-gray-800 text-sm font-semibold mb-1 bg-gray-100 rounded-full px-3 py-1">{m.role}</div>
            )}
            
            {/* 所属ブロック */}
            {m.event && m.event !== "-" && (
              <div className="text-xs text-gray-500 mt-1">{m.event}</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 text-xs text-gray-500 text-center">
        ※情報には誤りがある可能性があります。
      </div>
    </main>
  );
}