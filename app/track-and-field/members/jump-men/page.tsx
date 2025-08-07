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
    grade: "4年生",
    members: [
      {
        name: "太田 薫",
        furigana: "オオタ カオル",
        role: "-",
        event: "走幅跳",
        pb: "7m42",
        school: "市立橘高校",
        from: "-",
      },
      {
        name: "川端 優太",
        furigana: "カワバタ ユウタ",
        role: "-",
        event: "走高跳",
        pb: "2m06",
        school: "皇學館高校",
        from: "-",
      },
      {
        name: "橘田 孝成",
        furigana: "キッタ コウセイ",
        role: "-",
        event: "走高跳",
        pb: "2m06",
        school: "-",
        from: "-",
      },
      {
        name: "杉本 遼",
        furigana: "スギモト リョウ",
        role: "-",
        event: "棒高跳",
        pb: "5m10",
        school: "北陵高校",
        from: "-",
      },
      {
        name: "富田 隆之",
        furigana: "トミタ タカユキ",
        role: "-",
        event: "走高跳",
        pb: "1m98",
        school: "市立松戸高校",
        from: "-",
      },
      {
        name: "町田 蒼馬",
        furigana: "マチダ ソウマ",
        role: "-",
        event: "棒高跳",
        pb: "4m90",
        school: "樹徳高校",
        from: "-",
      },
      {
        name: "松井 楓雅",
        furigana: "マツイ フウガ",
        role: "-",
        event: "棒高跳",
        pb: "5m35",
        school: "南陽工業高校",
        from: "-",
      },
      {
        name: "本村 孝太",
        furigana: "モトムラ コウタ",
        role: "-",
        event: "走幅跳",
        pb: "7m26",
        school: "福岡第一高校",
        from: "-",
      },
      {
        name: "山中 涼聖",
        furigana: "ヤマナカ リョウセイ",
        role: "-",
        event: "棒高跳",
        pb: "4m40",
        school: "沼田高校",
        from: "-",
      },
    ],
  },
  {
    grade: "3年生",
    members: [
      {
        name: "江戸 飛雄馬",
        furigana: "エド ヒュウマ",
        role: "-",
        event: "三段跳",
        pb: "14m53",
        school: "橘",
        from: "神奈川",
      },
      {
        name: "川端 皓斗",
        furigana: "カワバタ ヒロト",
        role: "-",
        event: "棒高跳",
        pb: "4m45",
        school: "柏崎",
        from: "新潟",
      },
      {
        name: "北田琉緯 オスカー誠治郎",
        furigana: "キタダルイ オスカーセイジロウ",
        role: "-",
        event: "棒高跳",
        pb: "5m42",
        school: "大塚",
        from: "大阪",
      },
      {
        name: "黒田 勘太",
        furigana: "クロダ カンタ",
        role: "-",
        event: "走幅跳",
        pb: "7m00",
        school: "八千代",
        from: "千葉",
      },
      {
        name: "児玉 成輝",
        furigana: "コダマ ナルキ",
        role: "-",
        event: "走幅跳",
        pb: "7m59",
        school: "沼田",
        from: "広島",
      },
      {
        name: "菅野 航太",
        furigana: "スガノ コウタ",
        role: "-",
        event: "棒高跳",
        pb: "5m20",
        school: "黒沢尻工業",
        from: "岩手",
      },
      {
        name: "髙橋 颯太",
        furigana: "タカハシ ソウタ",
        role: "-",
        event: "走幅跳<br>三段跳",
        pb: "走幅跳: 7m13<br>三段跳: 14m55",
        school: "座間",
        from: "神奈川",
      },
      {
        name: "門田 吉平",
        furigana: "モンダ キッペイ",
        role: "-",
        event: "走幅跳",
        pb: "7m05",
        school: "星稜",
        from: "石川",
      },
      {
        name: "渡辺 大和",
        furigana: "ワタナベ ヤマト",
        role: "-",
        event: "棒高跳",
        pb: "4m60",
        school: "日本体育大学柏",
        from: "千葉",
      },
      {
        name: "横塚 昴",
        furigana: "ヨコツカ スバル",
        role: "-",
        event: "走幅跳",
        pb: "6m16",
        school: "昌平高校",
        from: "埼玉県",
      },
    ],
  },
  {
    grade: "2年生",
    members: [
      {
        name: "安藤 翼",
        furigana: "アンドウ ツバサ",
        role: "-",
        event: "棒高跳",
        pb: "4m80",
        school: "法政大学第二高等学校",
        from: "神奈川県",
      },
      {
        name: "石松 優",
        furigana: "イシマツ ユウ",
        role: "-",
        event: "走幅跳",
        pb: "6m20",
        school: "福翔高等学校",
        from: "福岡県",
      },
      {
        name: "大塚 洸明",
        furigana: "オオツカ ヒロアキ",
        role: "-",
        event: "走高跳",
        pb: "2m03",
        school: "片倉高等学校",
        from: "東京都",
      },
      {
        name: "岡田 麗",
        furigana: "オカダ レイ",
        role: "-",
        event: "走幅跳",
        pb: "6m50",
        school: "東京都立紅葉川高等学校",
        from: "千葉県",
      },
      {
        name: "岡本 茂靖",
        furigana: "オカモト シゲヤス",
        role: "-",
        event: "走幅跳<br>三段跳",
        pb: "走幅跳: 6m96<br>三段跳: 14m67",
        school: "洛南高等学校",
        from: "大阪府",
      },
      {
        name: "奥平 大星",
        furigana: "オクヒラ ダイセイ",
        role: "-",
        event: "棒高跳",
        pb: "4m40",
        school: "桐朋高等学校",
        from: "東京都",
      },
      {
        name: "小畑 優真",
        furigana: "オバタ ユウマ",
        role: "-",
        event: "棒高跳",
        pb: "4m70",
        school: "杵築高等学校",
        from: "大分県",
      },
      {
        name: "小野 紘太郎",
        furigana: "オノ コウタロウ",
        role: "-",
        event: "走幅跳",
        pb: "7m18",
        school: "静岡県立浜名高等学校",
        from: "静岡県",
      },
      {
        name: "葛西 璃空",
        furigana: "カサイ リク",
        role: "-",
        event: "走高跳",
        pb: "2m11",
        school: "八戸西高等学校",
        from: "青森県",
      },
      {
        name: "北濱 凛太郎",
        furigana: "キタハマ リンタロウ",
        role: "-",
        event: "棒高跳",
        pb: "4m60",
        school: "川崎市立橘高等学校",
        from: "神奈川県",
      },
      {
        name: "佐藤 琉也",
        furigana: "サトウ リュウヤ",
        role: "-",
        event: "走高跳",
        pb: "1m95",
        school: "旭丘高等学校",
        from: "神奈川県",
      },
      {
        name: "中澤 優",
        furigana: "ナカザワ ユウ",
        role: "-",
        event: "走高跳",
        pb: "2m01",
        school: "東京高等学校",
        from: "東京都",
      },
      {
        name: "西村 光太郎",
        furigana: "ニシムラ コウタロウ",
        role: "-",
        event: "走高跳",
        pb: "1m90",
        school: "高岡工芸高校",
        from: "富山県",
      },
      {
        name: "人見 圭紀",
        furigana: "ヒトミ ケイキ",
        role: "-",
        event: "三段跳",
        pb: "14m21",
        school: "栃木県立真岡高等学校",
        from: "栃木県",
      },
      {
        name: "星 泰成",
        furigana: "ホシ タイセイ",
        role: "-",
        event: "走高跳",
        pb: "2m03",
        school: "十日町高等学校",
        from: "新潟県",
      },
      {
        name: "松沢 雄大",
        furigana: "マツザワ ユウダイ",
        role: "-",
        event: "走高跳",
        pb: "2m08",
        school: "三浦学苑高等学校",
        from: "神奈川県",
      },
      {
        name: "三本 耕平",
        furigana: "ミモト コウヘイ",
        role: "-",
        event: "走幅跳",
        pb: "6m84",
        school: "埼玉栄高等学校",
        from: "埼玉県",
      },
      {
        name: "宮嵜 裕大",
        furigana: "ミヤザキ ユウタ",
        role: "-",
        event: "棒高跳",
        pb: "5m10",
        school: "日体大柏高等学校",
        from: "千葉県",
      },
      {
        name: "八道 律貴",
        furigana: "ヤジ リツキ",
        role: "-",
        event: "三段跳",
        pb: "13m88",
        school: "東京高等学校",
        from: "東京都",
      },
      {
        name: "吉田 輝",
        furigana: "ヨシダ ヒカル",
        role: "-",
        event: "三段跳",
        pb: "15m41",
        school: "堀越高校",
        from: "東京都",
      },
    ],
  },
  {
    grade: "1年生",
    members: [
      {
        name: "井川 稜斗",
        furigana: "イカワ リクト",
        role: "-",
        event: "走高跳",
        pb: "2m08",
        school: "近畿大学工業高等専門学校",
        from: "三重県",
      },
      {
        name: "上田 鍵",
        furigana: "ウエダ ケン",
        role: "-",
        event: "走幅跳",
        pb: "7m22",
        school: "八潮高校",
        from: "埼玉県",
      },
      {
        name: "大橋 空知",
        furigana: "オオハシ ソラチ",
        role: "-",
        event: "走幅跳",
        pb: "6m81",
        school: "那覇西高校",
        from: "沖縄県",
      },
      {
        name: "木戸 瑛大",
        furigana: "キド エイタ",
        role: "-",
        event: "三段跳",
        pb: "15m01",
        school: "越谷南高校",
        from: "埼玉県",
      },
      {
        name: "小林 大翼",
        furigana: "コバヤシ オオスケ",
        role: "-",
        event: "棒高跳",
        pb: "4m80",
        school: "明星学園高校",
        from: "東京都",
      },
      {
        name: "大道寺 悠翔",
        furigana: "ダイドウジ ユウト",
        role: "-",
        event: "走高跳",
        pb: "1m85",
        school: "桶川高校",
        from: "埼玉県",
      },
      {
        name: "髙橋 海吏",
        furigana: "タカハシ カイリ",
        role: "-",
        event: "走高跳",
        pb: "1m99",
        school: "座間高校",
        from: "神奈川県",
      },
      {
        name: "西谷 綾真",
        furigana: "ニシタニ リョウマ",
        role: "-",
        event: "棒高跳",
        pb: "4m80",
        school: "宇治山田商業高校",
        from: "三重県",
      },
      {
        name: "村田 宇哉",
        furigana: "ムラタ ノキヤ",
        role: "-",
        event: "棒高跳",
        pb: "4m90",
        school: "近畿大学工業高等専門学校",
        from: "三重県",
      },
      {
        name: "横山 陽斗",
        furigana: "ヨコヤマ ハルト",
        role: "-",
        event: "走高跳",
        pb: "1m93",
        school: "相模原弥栄高校",
        from: "神奈川県",
      },
    ],
  },
];

// pbを配列化する関数
function parsePB(pb: string): string[] {
  return pb.replace(/<br\s*\/?>/g, "\n").split("\n").map(s => s.trim()).filter(Boolean);
}

// タブ順を1年生→4年生に固定
const gradeOrder = ["1年生", "2年生", "3年生", "4年生"];
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

export default function JumpMenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <AnimatedPageHeader
        title="跳躍男子メンバー"
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
          <div key={m.name} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
            <div className="font-bold text-lg text-gray-900 mb-1">{m.name}</div>
            <div className="text-xs text-gray-500 mb-1">（{m.furigana.replace(/\s+/g, " ")}）</div>
            <div className="text-xs text-gray-400 mb-2">{m.school}・{m.from}</div>
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