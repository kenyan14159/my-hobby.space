"use client";
import { useState } from "react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
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
        name: "伊藤 楓",
        furigana: "イトウ カエデ",
        role: "-",
        event: "走高跳",
        pb: "1m80",
        school: "東京",
        from: "-",
      },
      {
        name: "上田 紗椰",
        furigana: "ウエダ サヤ",
        role: "-",
        event: "走幅跳",
        pb: "5m84",
        school: "八千代高校",
        from: "-",
      },
      {
        name: "角田 穏紅",
        furigana: "カクタ シズク",
        role: "-",
        event: "走幅跳",
        pb: "5m18",
        school: "大宮東高校",
        from: "-",
      },
      {
        name: "佐々木 琳音",
        furigana: "ササキ リオ",
        role: "-",
        event: "棒高跳",
        pb: "4m01",
        school: "東京高校",
        from: "-",
      },
      {
        name: "島田 夢蘭",
        furigana: "シマダ ユラ",
        role: "-",
        event: "走幅跳",
        pb: "5m47",
        school: "日本体育大学桜華",
        from: "-",
      },
      {
        name: "永井 陽",
        furigana: "ナガイ ミナミ",
        role: "-",
        event: "走幅跳",
        pb: "5m91",
        school: "日本工業大学駒場",
        from: "-",
      },
      {
        name: "吉田 花鈴",
        furigana: "ヨシダ カリン",
        role: "-",
        event: "走幅跳",
        pb: "6m12",
        school: "摂津",
        from: "-",
      },
    ],
  },
  {
    grade: "3年生",
    members: [
      {
        name: "小林 美月",
        furigana: "コバヤシ ミツキ",
        role: "-",
        event: "棒高跳",
        pb: "4m15",
        school: "明星学園高校",
        from: "東京都",
      },
      {
        name: "玉澤 七海",
        furigana: "タマサワ ナナミ",
        role: "-",
        event: "走高跳",
        pb: "1m60",
        school: "東北高校",
        from: "宮城県",
      },
      {
        name: "矢羽田 澪央",
        furigana: "ヤハタ ミオ",
        role: "-",
        event: "三段跳",
        pb: "12m15",
        school: "横須賀学院高校",
        from: "神奈川県",
      },
    ],
  },
  {
    grade: "2年生",
    members: [
      {
        name: "海老原 有緯子",
        furigana: "エビハラ アイコ",
        role: "-",
        event: "棒高跳",
        pb: "3m80",
        school: "皇學館高等学校",
        from: "三重県",
      },
      {
        name: "岡田 莉歩",
        furigana: "オカダ リホ",
        role: "-",
        event: "棒高跳",
        pb: "4m00",
        school: "佐久長聖高校",
        from: "長野県",
      },
      {
        name: "本田 玖妃",
        furigana: "ホンダ ヒサキ",
        role: "-",
        event: "三段跳",
        pb: "11m48",
        school: "郡山商業高校",
        from: "福島県",
      },
      {
        name: "宮本 里乃亜",
        furigana: "ミヤモト リノア",
        role: "-",
        event: "走幅跳",
        pb: "6m12",
        school: "東京高校",
        from: "東京都",
      },
      {
        name: "吉田 果由",
        furigana: "ヨシダ カユ",
        role: "-",
        event: "走幅跳",
        pb: "5m75",
        school: "咲くやこの花高校",
        from: "大阪府",
      },
      {
        name: "渡邊 冴璃",
        furigana: "ワタナベ サイリ",
        role: "-",
        event: "棒高跳",
        pb: "3m82",
        school: "大宮東高校",
        from: "埼玉県",
      },
    ],
  },
  {
    grade: "1年生",
    members: [
      {
        name: "飯島 香撫",
        furigana: "イイジマ カナデ",
        role: "-",
        event: "走幅跳 / 三段跳",
        pb: "走幅跳: 5m80<br>三段跳: 12m20",
        school: "市立船橋高校",
        from: "千葉県",
      },
      {
        name: "石井 瑠那",
        furigana: "イシイ ルナ",
        role: "-",
        event: "走幅跳",
        pb: "5m35",
        school: "埼玉栄高校",
        from: "埼玉県",
      },
      {
        name: "石橋 知歩",
        furigana: "イシバシ チホ",
        role: "-",
        event: "走幅跳",
        pb: "5m11",
        school: "前橋市立前橋高等学校",
        from: "群馬県",
      },
      {
        name: "今井 颯希",
        furigana: "イマイ サツキ",
        role: "-",
        event: "棒高跳",
        pb: "3m70",
        school: "山形市立商業高等学校",
        from: "山形県",
      },
      {
        name: "越野 友",
        furigana: "コシノ トモ",
        role: "-",
        event: "走高跳",
        pb: "-",
        school: "愛知高等学校",
        from: "愛知県",
      },
      {
        name: "篠山 那弥子",
        furigana: "シノヤマ ナミコ",
        role: "-",
        event: "走幅跳",
        pb: "5m67",
        school: "八王子学園八王子高等学校",
        from: "神奈川県",
      },
      {
        name: "進藤 天羽",
        furigana: "シンドウ アマハ",
        role: "-",
        event: "三段跳",
        pb: "11m31",
        school: "東京都立狛江高等学校",
        from: "東京都",
      },
      {
        name: "土屋 美潤",
        furigana: "ツチヤ ミウ",
        role: "-",
        event: "走幅跳 / 三段跳",
        pb: "走幅跳: 6m03<br>三段跳: 12m52",
        school: "成田高等学校",
        from: "千葉県",
      },
      {
        name: "眞志田 りこ",
        furigana: "マシダ リコ",
        role: "-",
        event: "走幅跳",
        pb: "5m72",
        school: "広島市立沼田高等学校",
        from: "広島県",
      },
      {
        name: "松本 穂乃果",
        furigana: "マツモト ホノカ",
        role: "-",
        event: "走幅跳",
        pb: "5m11",
        school: "市立尼崎高等学校",
        from: "兵庫県",
      },
      {
        name: "山田 愛咲",
        furigana: "ヤマダ アイラ",
        role: "-",
        event: "走幅跳",
        pb: "5m28",
        school: "北海高等学校",
        from: "北海道",
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

export default function JumpWomenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <AnimatedPageHeader
        title="跳躍女子メンバー"
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