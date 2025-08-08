"use client";
import { useState } from "react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { UserRound } from "lucide-react";
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
      {
        name: "石澤 美菜海",
        furigana: "イシザワ ミナミ",
        role: "-",
        event: "円盤投",
        pb: "44.39m",
        school: "弘前実業高校",
        from: "-",
      },
      {
        name: "大内 瑛莉夏",
        furigana: "オオウチ エリカ",
        role: "-",
        event: "円盤投",
        pb: "38.57m",
        school: "茨城キリスト教学園高校",
        from: "-",
      },
      {
        name: "加藤 美奈",
        furigana: "カトウ ミナ",
        role: "-",
        event: "やり投",
        pb: "41.09m",
        school: "町田高校",
        from: "-",
      },
      {
        name: "亀谷 采生",
        furigana: "カメタニ アミ",
        role: "-",
        event: "やり投",
        pb: "49.65m",
        school: "茨城キリスト教学園",
        from: "-",
      },
      {
        name: "山道 萌衣",
        furigana: "サンドウ メイ",
        role: "-",
        event: "円盤投",
        pb: "45.99m",
        school: "太田女子高校",
        from: "-",
      },
      {
        name: "城野 伽奈恵",
        furigana: "シロノ カナエ",
        role: "-",
        event: "やり投",
        pb: "43.71m",
        school: "埼玉栄高校",
        from: "-",
      },
      {
        name: "滝 ほのか",
        furigana: "タキ ホノカ",
        role: "-",
        event: "ハンマー投げ",
        pb: "51.40m",
        school: "茨城キリスト教学園高校",
        from: "-",
      },
      {
        name: "村上 碧海",
        furigana: "ムラカミ アオイ",
        role: "-",
        event: "やり投",
        pb: "57.72m",
        school: "西条農業高校",
        from: "-",
      },
      {
        name: "山形 ゆあ",
        furigana: "ヤマガタ ユア",
        role: "-",
        event: "やり投",
        pb: "41.46m",
        school: "東京高校",
        from: "-",
      },
    ],
  },
  {
    grade: "3年生",
    members: [
      {
        name: "入江 遥菜",
        furigana: "イリエ ハルナ",
        role: "-",
        event: "やり投げ",
        pb: "49.87m",
        school: "茨城キリスト教学園高等学校",
        from: "茨城県",
      },
      {
        name: "大熊 紗弥",
        furigana: "オオクマ サヤ",
        role: "-",
        event: "円盤投げ",
        pb: "46.57m",
        school: "横須賀大津高校",
        from: "神奈川県",
      },
      {
        name: "阪本 海月華",
        furigana: "サカモト カルナ",
        role: "-",
        event: "円盤投げ",
        pb: "48.19m",
        school: "紀央館高等学校",
        from: "和歌山県",
      },
      {
        name: "宮崎 梨緒",
        furigana: "ミヤザキ リオ",
        role: "-",
        event: "ハンマー投げ",
        pb: "51.68m",
        school: "東京学館高校",
        from: "千葉県",
      },
      {
        name: "湯本 万結",
        furigana: "ユモト マユ",
        role: "-",
        event: "砲丸投げ",
        pb: "12.61m",
        school: "日体大桜華高等学校",
        from: "群馬県",
      },
      {
        name: "吉沢 花菜",
        furigana: "ヨシザワ ハナ",
        role: "-",
        event: "砲丸投げ",
        pb: "14.75m",
        school: "川崎市立橘高等学校",
        from: "神奈川県",
      },
    ],
  },
  {
    grade: "2年生",
    members: [
      {
        name: "近藤 杏音",
        furigana: "コンドウ アノン",
        role: "-",
        event: "やり投げ",
        pb: "42.66m",
        school: "足柄高校",
        from: "神奈川県",
      },
      {
        name: "柳澤 羽那",
        furigana: "ヤナギサワ ハナ",
        role: "-",
        event: "円盤投げ",
        pb: "40.02m",
        school: "札幌藻岩高校",
        from: "北海道",
      },
    ],
  },
  {
    grade: "1年生",
    members: [
      {
        name: "清水 優風",
        furigana: "シミズ ユウカ",
        role: "-",
        event: "ハンマー投げ",
        pb: "34.80m",
        school: "日本体育大学桜華高等学校",
        from: "東京都",
      },
      {
        name: "鈴木 里樹",
        furigana: "スズキ リナ",
        role: "-",
        event: "やり投げ",
        pb: "37.19m",
        school: "横須賀高等学校",
        from: "愛知県",
      },
      {
        name: "角谷 りょう",
        furigana: "スミヤ リョウ",
        role: "-",
        event: "砲丸投げ",
        pb: "9.29m",
        school: "立西遠女子学園",
        from: "静岡県",
      },
      {
        name: "谷 飛香里",
        furigana: "タニ ヒカリ",
        role: "-",
        event: "やり投げ",
        pb: "47.67m",
        school: "白鴎大学足利高等学校",
        from: "栃木県",
      },
      {
        name: "棗田 莉紗",
        furigana: "ナツメダ リサ",
        role: "-",
        event: "円盤投げ",
        pb: "34.46m",
        school: "福山暁の星女子高等学校",
        from: "広島県",
      },
      {
        name: "畑山 夏凛",
        furigana: "ハタケヤマ カリン",
        role: "-",
        event: "円盤投げ",
        pb: "40.38m",
        school: "相模原弥栄高等学校",
        from: "神奈川県",
      },
      {
        name: "増宮 朋子",
        furigana: "マスミヤ ユウコ",
        role: "-",
        event: "円盤投げ",
        pb: "32.46m",
        school: "幕張総合高等学校",
        from: "千葉県",
      },
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

export default function ThrowWomenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: 'メンバー・ブロック紹介', href: '/track-and-field/members' }, { label: '投擲女子メンバー' }]} />
      </div>
      <AnimatedPageHeader
        title="投擲女子メンバー"
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
          <div key={m.name} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col items-center">
            <div className="font-bold text-lg text-gray-900 mb-1">{m.name}</div>
            <div className="text-xs text-gray-500 mb-1">（{m.furigana.replace(/\s+/g, " ")}）</div>
            <div className="text-xs text-gray-400 mb-2">{m.school}・{m.from}</div>
            {m.role && m.role !== "-" && (
              <div className="text-gray-600 text-xs font-semibold mb-1">{m.role}</div>
            )}
            {m.pb && m.pb !== "-" && (
              <ul className="text-xs text-gray-600 mb-2 w-full list-disc list-inside">
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