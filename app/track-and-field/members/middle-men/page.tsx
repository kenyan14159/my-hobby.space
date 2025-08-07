"use client";
import { useState } from "react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { UserRound } from "lucide-react"; // 元のコードの構造に合わせ、このimport文を維持します。
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
        name: "市川 慶吾",
        furigana: "イチカワ ケイゴ",
        role: "-",
        event: "800m",
        pb: "1:51.57",
        school: "東海大山形",
        from: "-",
      },
      {
        name: "川端 大輝",
        furigana: "カワバタ ダイキ",
        role: "本部会計",
        event: "800m / 1500m",
        pb: "800m: 2:00.02<br>1500m: 4:04.98",
        school: "実践学園",
        from: "東京",
      },
      {
        name: "楠元 翔大",
        furigana: "クスモト ショウタ",
        role: "-",
        event: "800m",
        pb: "2:03.53",
        school: "神奈川県立川崎高校",
        from: "神奈川",
      },
      {
        name: "城田 晃佑",
        furigana: "シロタ コウスケ",
        role: "-",
        event: "800m",
        pb: "1:55.56",
        school: "湘南工科大付属",
        from: "-",
      },
      {
        name: "曽我 皓世",
        furigana: "ソガ コウセイ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 1:55.36<br>1500m: 4:02.14",
        school: "八戸西",
        from: "-",
      },
      {
        name: "長沢 匠人",
        furigana: "ナガサワ タクト",
        role: "-",
        event: "800m",
        pb: "1:48.66",
        school: "東大和",
        from: "-",
      },
      {
        name: "根岸 悠斗",
        furigana: "ネギシ ユウト",
        role: "-",
        event: "800m",
        pb: "1:54.23",
        school: "文星芸大付属",
        from: "-",
      },
      {
        name: "根地嶋 映人",
        furigana: "ネジシマ エイト",
        role: "-",
        event: "400m / 800m / 1500m",
        pb: "400m: 51.50<br>800m: 1:56.42<br>1500m: 4:03.62",
        school: "浜松日体",
        from: "-",
      },
      {
        name: "丸 昴生",
        furigana: "マル コウセイ",
        role: "-",
        event: "800m",
        pb: "3:56.33",
        school: "日体大柏",
        from: "-",
      },
      {
        name: "領塚 脩太",
        furigana: "リョウヅカ ユウタ",
        role: "-",
        event: "800m",
        pb: "1:55.67",
        school: "那須拓陽",
        from: "-",
      },
    ],
  },
  {
    grade: "3年生",
    members: [
      {
        name: "居鶴 颯一郎",
        furigana: "イヅル ソウイチロウ",
        role: "-",
        event: "800m",
        pb: "2:04.29",
        school: "山形中央高校",
        from: "山形",
      },
      {
        name: "遠藤 煌斗",
        furigana: "エンドウ アキト",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 2:04.29<br>1500m: 3:56.93",
        school: "北越高校",
        from: "新潟",
      },
      {
        name: "須藤 光貴",
        furigana: "スドウ コウキ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 2:01.63<br>1500m: 4:05.04",
        school: "浜松日体高校",
        from: "静岡",
      },
      {
        name: "橋本 陽太",
        furigana: "ハシモト ヒナタ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 1:55.85<br>1500m: 3:56.36",
        school: "比叡山高校",
        from: "滋賀",
      },
      {
        name: "東村 航明",
        furigana: "ヒガシムラ コウメイ",
        role: "-",
        event: "800m",
        pb: "1:51.26",
        school: "京都府立乙訓高校",
        from: "京都",
      },
      {
        name: "堀 翼",
        furigana: "ホリ ツバサ",
        role: "-",
        event: "1500m",
        pb: "4:14.35",
        school: "日体大荏原高校",
        from: "東京",
      },
      {
        name: "山田 勇斗",
        furigana: "ヤマダ ハヤト",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 2:01.62<br>1500m: 4:07.84",
        school: "日体大荏原高校",
        from: "神奈川",
      },
      {
        name: "渡邉 睦樹",
        furigana: "ワタナベ ノブキ",
        role: "-",
        event: "400m / 800m",
        pb: "400m: 49.96<br>800m: 1:50.63",
        school: "東京都立板橋高等学校",
        from: "東京",
      },
    ],
  },
  {
    grade: "2年生",
    members: [
      {
        name: "青木 颯太",
        furigana: "アオキ ソウタ",
        role: "-",
        event: "1500m",
        pb: "4:09.40",
        school: "日体大荏原",
        from: "東京",
      },
      {
        name: "小黒 慧",
        furigana: "オグロ ケイ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 1:55.83<br>1500m: 3:56.80",
        school: "長岡商業",
        from: "新潟",
      },
      {
        name: "小野 太廊",
        furigana: "オノ タロウ",
        role: "-",
        event: "800m",
        pb: "1:54.31",
        school: "荏田",
        from: "神奈川",
      },
      {
        name: "倉田 壱晟",
        furigana: "クラタ イッセイ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 1:51.30<br>1500m: 4:03.71",
        school: "浜松日体",
        from: "静岡",
      },
      {
        name: "小泉 惺",
        furigana: "コイズミ サトシ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 1:52.21<br>1500m: 3:57.01",
        school: "都立板橋",
        from: "東京",
      },
      {
        name: "坂元 龍晟",
        furigana: "サカモト リュウセイ",
        role: "-",
        event: "800m",
        pb: "1:49.92",
        school: "鹿児島南",
        from: "鹿児島",
      },
      {
        name: "畠山 弦樹",
        furigana: "ハタケヤマ ゲンキ",
        role: "-",
        event: "1500m",
        pb: "1:59.02",
        school: "浜松日体",
        from: "静岡",
      },
      {
        name: "松本 陽路",
        furigana: "マツモト ヒロ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 1:53.70<br>1500m: 3:47.32",
        school: "韮崎高校",
        from: "山梨",
      },
    ],
  },
  {
    grade: "1年生",
    members: [
      {
        name: "安藤 佑馬",
        furigana: "アンドウ ユウマ",
        role: "-",
        event: "1500m",
        pb: "4:02.32",
        school: "東京実業",
        from: "神奈川",
      },
      {
        name: "岩下 知真",
        furigana: "イワシタ トモマサ",
        role: "-",
        event: "800m",
        pb: "1:57.80",
        school: "森村学園",
        from: "神奈川",
      },
      {
        name: "倉島 志津稀",
        furigana: "クラシマ シズキ",
        role: "-",
        event: "800m",
        pb: "2:13.24",
        school: "星稜",
        from: "石川",
      },
      {
        name: "組田 敦也",
        furigana: "クミタ アツヤ",
        role: "-",
        event: "800m",
        pb: "1:59.75",
        school: "舞岡",
        from: "神奈川",
      },
      {
        name: "末吉 琉衣",
        furigana: "スエヨシ ルイ",
        role: "-",
        event: "800m",
        pb: "1:51.68",
        school: "保土ヶ谷",
        from: "神奈川",
      },
      {
        name: "杉林 良現",
        furigana: "スギバヤシ リョウゲン",
        role: "-",
        event: "1500m",
        pb: "4:00.07",
        school: "和歌山北",
        from: "和歌山",
      },
      {
        name: "鈴木 駿太郎",
        furigana: "スズキ シュンタロウ",
        role: "-",
        event: "800m",
        pb: "1:58.63",
        school: "中部大春日丘",
        from: "愛知",
      },
      {
        name: "吉田 太士",
        furigana: "ヨシダ タイシ",
        role: "-",
        event: "800m",
        pb: "1:58.87",
        school: "東海大山形",
        from: "山形",
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

export default function MiddleMenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <AnimatedPageHeader
        title="中距離男子メンバー"
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