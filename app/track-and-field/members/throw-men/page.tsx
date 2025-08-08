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
      { name: "東 史音", furigana: "アズマ シオン", role: "-", event: "やり投げ", pb: "64.44m", school: "城南静岡高校", from: "-" },
      { name: "口丸 優太朗", furigana: "クチマル ユウタロウ", role: "-", event: "砲丸投げ", pb: "11.72m", school: "東京都立片倉高校", from: "-" },
      { name: "中村 厘紅", furigana: "ナカムラ リク", role: "-", event: "やり投げ", pb: "54.51m", school: "東京都立片倉高校", from: "-" },
      { name: "原田 優飛", furigana: "ハラダ ユウヒ", role: "-", event: "円盤投げ", pb: "48.20m", school: "明石市立明石商業高校", from: "-" },
    ],
  },
  {
    grade: "3年生",
    members: [
      { name: "上原 奏汰", furigana: "ウエハラ カナタ", role: "-", event: "円盤投げ", pb: "43.96m", school: "鹿児島南高等学校", from: "鹿児島県" },
      { name: "越智 奏太", furigana: "オチ カナタ", role: "-", event: "円盤投げ", pb: "39.00m", school: "愛媛県立今治北高等学校", from: "愛媛県" },
      { name: "齋藤 肇", furigana: "サイトウ ハジメ", role: "-", event: "やり投げ", pb: "53.71m", school: "酒田南高等学校", from: "山形県" },
      { name: "杉山 俊介", furigana: "スギヤマ シュンスケ", role: "-", event: "砲丸投げ", pb: "11.99m", school: "旭丘高等学校", from: "神奈川県" },
      { name: "外島 大翔", furigana: "ソトジマ ハルト", role: "-", event: "やり投げ", pb: "66.98m", school: "東京高等学校", from: "東京都" },
      { name: "永山 バシナカン", furigana: "ナガヤマ バシナカン", role: "-", event: "砲丸投げ", pb: "13.27m", school: "川崎市立橘高等学校", from: "神奈川県" },
      { name: "藤下 勇真", furigana: "フジシタ ユウマ", role: "-", event: "円盤投げ", pb: "46.05m", school: "花園中学高等学校", from: "滋賀県" },
      { name: "安國 裕", furigana: "ヤスクニ ユタカ", role: "-", event: "砲丸投げ", pb: "14.28m", school: "東京高等学校", from: "神奈川県" },
    ],
  },
  {
    grade: "2年生",
    members: [
      { name: "櫟原 裕太", furigana: "イチハラ ユウタ", role: "-", event: "砲丸投げ", pb: "11.83m", school: "科学技術高校", from: "静岡県" },
      { name: "岩城 辰政", furigana: "イワキ タツマサ", role: "-", event: "やり投げ", pb: "54.73m", school: "板橋高校", from: "東京都" },
      { name: "岩永 大輝", furigana: "イワナガ タイキ", role: "-", event: "円盤投げ", pb: "46.31m", school: "熊本国府", from: "熊本県" },
      { name: "枝松 倖太郎", furigana: "エダマツ コウタロウ", role: "-", event: "やり投げ", pb: "55.11m", school: "東京高校", from: "東京都" },
      { name: "大和田 康平", furigana: "オオワダ コウヘイ", role: "-", event: "やり投げ", pb: "51.11m", school: "郡山東高校", from: "福島県" },
      { name: "奥川 波音", furigana: "オクカワ ナオト", role: "-", event: "やり投げ", pb: "11.64m", school: "日本体育大学柏", from: "千葉県" },
      { name: "葛城 葉太", furigana: "カツラギ ヨウタ", role: "-", event: "円盤投げ", pb: "38.39m", school: "日本大学三島高校", from: "静岡県" },
      { name: "渋谷 知輝", furigana: "シブヤ トモキ", role: "-", event: "やり投げ", pb: "44.62m", school: "柏崎高校", from: "新潟県" },
      { name: "廣瀬 悠三郎", furigana: "ヒロセ ユウザブロウ", role: "-", event: "やり投げ", pb: "65.32m", school: "東京成徳大学高校", from: "東京都" },
      { name: "古家 徳真", furigana: "フルヤ トクマ", role: "-", event: "円盤投げ", pb: "38.52m", school: "堀越高校", from: "東京都" },
      { name: "丸田 脩人", furigana: "マルタ シュウト", role: "-", event: "やり投げ", pb: "49.28m", school: "大島高校", from: "鹿児島県" },
    ],
  },
  {
    grade: "1年生",
    members: [
      { name: "今泉 光陽", furigana: "イマイズミ コウヨウ", role: "-", event: "やり投げ", pb: "51.48m", school: "郡山高等学校", from: "福島県" },
      { name: "奥間 政和", furigana: "オクマ マサト", role: "-", event: "円盤投げ", pb: "44.82m", school: "那覇西高等学校", from: "沖縄県" },
      { name: "田中 亮", furigana: "タナカ リョウ", role: "-", event: "円盤投げ", pb: "45.53m", school: "苅田工業高等学校", from: "福岡県" },
      { name: "長浦 蓮太", furigana: "ナガウラ レンタ", role: "-", event: "砲丸投げ", pb: "13.57m", school: "鵬学園高等学校", from: "石川県" },
      { name: "西澤 大海", furigana: "ニシザワ オオミ", role: "-", event: "円盤投げ", pb: "35.17m", school: "保土ヶ谷高等学校", from: "神奈川県" },
      { name: "二羽 遥生", furigana: "ニワ ハルキ", role: "-", event: "円盤投げ", pb: "28.29m", school: "厚木北高等学校", from: "神奈川県" },
      { name: "増田 健人", furigana: "マスダ ケント", role: "-", event: "やり投げ", pb: "56.28m", school: "片倉高等学校", from: "東京都" },
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

export default function ThrowMenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: 'メンバー・ブロック紹介', href: '/track-and-field/members' }, { label: '投擲男子メンバー' }]} />
      </div>
      <AnimatedPageHeader
        title="投擲男子メンバー"
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