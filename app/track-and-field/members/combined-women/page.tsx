"use client";
import { useState } from "react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
    grade: "4年生",
    members: [
      { name: "大塚 紗輝", furigana: "オオツカ サキ", role: "-", event: "七種競技", pb: "3605点", school: "相模原弥栄高等学校", from: "-" },
      { name: "髙橋 想", furigana: "タカハシ ココロ", role: "-", event: "七種競技", pb: "4964点", school: "川崎市立橘高等学校", from: "-" },
    ],
  },
  {
    grade: "3年生",
    members: [
      { name: "大森 里香", furigana: "オオモリ サトカ", role: "-", event: "七種競技", pb: "4661点", school: "佐久長聖", from: "長野県" },
      { name: "佐藤 れいら", furigana: "サトウ レイラ", role: "-", event: "七種競技", pb: "3737点", school: "旭", from: "神奈川県" },
      { name: "福留 舞", furigana: "フクドメ マイ", role: "-", event: "七種競技", pb: "4281点", school: "鹿児島女子", from: "鹿児島県" },
      { name: "水野 泰葉", furigana: "ミズノ ヤスハ", role: "-", event: "七種競技", pb: "4863点", school: "伊奈学園総合", from: "埼玉県" },
    ],
  },
  {
    grade: "2年生",
    members: [
      { name: "小野澤 佳乃", furigana: "オノザワ カノ", role: "-", event: "七種競技", pb: "-", school: "駒澤", from: "東京都" },
      { name: "貴家 ありさ", furigana: "サスガ アリサ", role: "-", event: "七種競技", pb: "5188点", school: "伊豆中央高校", from: "静岡県" },
    ],
  },
  {
    grade: "1年生",
    members: [
      { name: "仮屋 愛優", furigana: "カリヤ アユ", role: "-", event: "七種競技 / 100mH", pb: "七種競技: 5212点<br>100mH: 13.40", school: "東京高等学校", from: "東京都" },
      { name: "半田 瑞姫", furigana: "ハンダ ミズキ", role: "-", event: "七種競技", pb: "4673点", school: "川崎市立橘高校", from: "神奈川県" },
      { name: "勇知 美羽", furigana: "ユウチ ミウ", role: "-", event: "七種競技", pb: "4105点", school: "広島皆実高校", from: "広島県" },
    ],
  },
];

// pbを配列化する関数
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

export default function CombinedWomenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: 'メンバー・ブロック紹介', href: '/track-and-field/members' }, { label: '混成女子メンバー' }]} />
      </div>
      <AnimatedPageHeader
        title="混成女子メンバー"
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
          <div key={m.name + m.school} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
            <div className="font-bold text-lg text-gray-900 mb-1">{m.name}</div>
            <div className="text-xs text-gray-500 mb-1">（{m.furigana.replace(/\s+/g, " ")}）</div>
            <div className="text-xs text-gray-400 mb-2">{m.school}・{m.from}</div>
            {m.role && m.role !== "-" && (
              <div className="text-gray-600 text-xs font-semibold mb-1">{m.role}</div>
            )}
            {m.event && m.event !== "-" && (
              <div className="text-gray-600 text-xs font-semibold mb-1">{m.event}</div>
            )}
            {m.pb && m.pb !== "-" && (
              <ul className="text-xs text-gray-600 mb-2 w-full list-disc list-inside text-left">
                {parsePB(m.pb).map((pb, i) => (
                  <li key={i}>{pb}</li>
                ))}
              </ul>
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