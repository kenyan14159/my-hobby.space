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
        name: "新垣 藍子",
        furigana: "アラカキ アイコ",
        role: "マネージャー",
        event: "-",
        pb: "-",
        school: "-",
        from: "-",
      },
      {
        name: "越川 美咲",
        furigana: "コシカワ ミサキ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.14<br>200m 25.00",
        school: "成田",
        from: "千葉",
      },
      {
        name: "白濱 陽奈",
        furigana: "シラハマ ヒナ",
        role: "-",
        event: "100mH",
        pb: "100mH 14.26",
        school: "駒澤",
        from: "東京",
      },
      {
        name: "高岡 亜生",
        furigana: "タカオカ アオ",
        role: "-",
        event: "100mH<br>200m<br>400m",
        pb: "100mH 14.30<br>200m 27.17<br>400m 62.01",
        school: "中村学園女子",
        from: "-",
      },
      {
        name: "塚本 萌乃",
        furigana: "ツカモト モエノ",
        role: "-",
        event: "100m<br>200m<br>100mH<br>400mH",
        pb: "100m 12.37<br>200m 26.17<br>100mH 13.89<br>400mH 58.84",
        school: "成田",
        from: "-",
      },
      {
        name: "堀部 優衣",
        furigana: "ホリベ ユイ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.18<br>200m 25.14",
        school: "韮崎",
        from: "-",
      },
      {
        name: "綿貫 真尋",
        furigana: "ワタヌキ マヒロ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 11.90<br>200m 24.77",
        school: "城西大城西",
        from: "-",
      },
    ],
  },
  {
    grade: "3年生",
    members: [
      {
        name: "泉谷 尚希",
        furigana: "イズタニ ナオキ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.23<br>200m 25.29",
        school: "成田",
        from: "千葉県",
      },
      {
        name: "大木 詩織",
        furigana: "オオキ シオリ",
        role: "-",
        event: "100m",
        pb: "100m 12.49",
        school: "東京",
        from: "千葉県",
      },
      {
        name: "小出 未空",
        furigana: "コイデ ミク",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.73<br>200m 25.48",
        school: "東海大学附属浦安",
        from: "千葉県",
      },
      {
        name: "佐々木 真歩",
        furigana: "ササキ マホ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.04<br>200m 25.58",
        school: "鳥取中央育英",
        from: "鳥取県",
      },
      {
        name: "佐藤 瑠南",
        furigana: "サトウ ルナ",
        role: "マネージャー",
        event: "-",
        pb: "-",
        school: "深谷第一",
        from: "埼玉県",
      },
      {
        name: "綱脇 桜子",
        furigana: "ツナワキ サクラコ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.58<br>200m 25.92",
        school: "九州国際大学付属",
        from: "福岡県",
      },
      {
        name: "田中 伊万里",
        furigana: "タナカ イマリ",
        role: "-",
        event: "100mH",
        pb: "100mH 14.42",
        school: "日本体育大学柏高等学校",
        from: "-",
      },
      {
        name: "中村 真琴",
        furigana: "ナカムラ マコト",
        role: "-",
        event: "200m<br>400m<br>400mH",
        pb: "200m 25.21<br>400m 56.66<br>400mH 58.76",
        school: "光",
        from: "山口",
      },
      {
        name: "中野 まな",
        furigana: "ナカノ マナ",
        role: "-",
        event: "400m<br>400mH",
        pb: "400m 61.46<br>400mH 67.63",
        school: "富士宮北",
        from: "静岡県",
      },
      {
        name: "夏目 紗彩",
        furigana: "ナツメ サアヤ",
        role: "-",
        event: "400m<br>400mH",
        pb: "400m 59.12<br>400mH 60.03",
        school: "豊川",
        from: "愛知県",
      },
      {
        name: "八田 さくら",
        furigana: "ハッタ サクラ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.09<br>200m 24.93",
        school: "港北",
        from: "神奈川県",
      },
      {
        name: "濵野 美咲",
        furigana: "ハマノ ミサキ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 11.83<br>200m 24.49",
        school: "八千代",
        from: "千葉県",
      },
      {
        name: "平井 万結",
        furigana: "ヒライ マユ",
        role: "マネージャー",
        event: "-",
        pb: "-",
        school: "横浜",
        from: "神奈川県",
      },
      {
        name: "フロレス アリエ",
        furigana: "フロレス アリエ",
        role: "-",
        event: "100m<br>200m<br>400m",
        pb: "100m 11.62<br>200m 23.73<br>400m 53.03",
        school: "東海大学附属静岡翔洋",
        from: "静岡県",
      },
      {
        name: "松谷 知晴",
        furigana: "マツタニ チハル",
        role: "-",
        event: "100m<br>400m",
        pb: "100m 12.37<br>400m 56.43",
        school: "相模原弥栄",
        from: "神奈川県",
      },
      {
        name: "渡邊 陽",
        furigana: "ワタナベ ミナミ",
        role: "-",
        event: "400m<br>400mH",
        pb: "400m 55.58<br>400mH 61.38",
        school: "長崎南",
        from: "長崎",
      },
    ],
  },
  {
    grade: "2年生",
    members: [
      {
        name: "新井 華子",
        furigana: "アライ ハナコ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.67<br>200m 25.78",
        school: "伊奈学園総合高等学校",
        from: "埼玉県",
      },
      {
        name: "綾目 ひなの",
        furigana: "アヤメ ヒナノ",
        role: "-",
        event: "100mH",
        pb: "100mH 13.66",
        school: "神辺旭高等学校",
        from: "広島県",
      },
      {
        name: "石川 莉彩",
        furigana: "イシカワ リサ",
        role: "-",
        event: "400mH",
        pb: "400mH 64.37",
        school: "横須賀高等学校",
        from: "愛知県",
      },
      {
        name: "宇佐美 乃彩",
        furigana: "ウサミ ノア",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.18<br>200m 24.96",
        school: "茨城キリスト教学園高等学校",
        from: "茨城県",
      },
      {
        name: "川島 響姫",
        furigana: "カワシマ ヒビキ",
        role: "マネージャー",
        event: "-",
        pb: "-",
        school: "藤沢清流",
        from: "神奈川県",
      },
      {
        name: "河崎 愛美",
        furigana: "カワサキ メグミ",
        role: "-",
        event: "100m",
        pb: "100m 12.59",
        school: "龍谷大学付属平安高等学校",
        from: "滋賀県",
      },
      {
        name: "佐藤 優李迦",
        furigana: "サトウ ユイカ",
        role: "-",
        event: "100mH<br>400mH",
        pb: "100mH 14.32<br>400mH 1:01.55",
        school: "橘高等学校",
        from: "神奈川県",
      },
      {
        name: "澁谷 美海",
        furigana: "シブヤ ミウ",
        role: "-",
        event: "100mH",
        pb: "100mH 14.25",
        school: "港北高等学校",
        from: "神奈川県",
      },
      {
        name: "中地 彩乃",
        furigana: "ナカチ アヤノ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.09<br>200m 24.30",
        school: "橘高等学校",
        from: "神奈川県",
      },
      {
        name: "橋本 琉衣",
        furigana: "ハシモト ルイ",
        role: "マネージャー",
        event: "-",
        pb: "-",
        school: "京都先端科学大学附属",
        from: "京都",
      },
      {
        name: "山本 佳那",
        furigana: "ヤマモト カナ",
        role: "-",
        event: "100mH",
        pb: "100mH 13.96",
        school: "東京高等学校",
        from: "埼玉県",
      },
    ],
  },
  {
    grade: "1年生",
    members: [
      {
        name: "荒木 美月",
        furigana: "アラキ ミヅキ",
        role: "-",
        event: "100m",
        pb: "100m 12.86",
        school: "焼津中央高等学校",
        from: "静岡県",
      },
      {
        name: "大槻 さくら",
        furigana: "オオツキ サクラ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.66<br>200m 25.46",
        school: "八王子学園八王子高等学校",
        from: "埼玉県",
      },
      {
        name: "亀山 美南",
        furigana: "カメヤマ ミナミ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.07<br>200m 24.74",
        school: "船橋市立船橋高等学校",
        from: "千葉県",
      },
      {
        name: "川口 穂乃夏",
        furigana: "カワグチ ホノカ",
        role: "-",
        event: "100m<br>200m<br>400m",
        pb: "100m 12.13<br>200m 24.68<br>400m 55.86",
        school: "相洋高等学校",
        from: "神奈川県",
      },
      {
        name: "神田 明果",
        furigana: "カンダ ハルカ",
        role: "-",
        event: "100m<br>200m",
        pb: "100m 12.31<br>200m 26.06",
        school: "広島皆実高等学校",
        from: "広島県",
      },
      {
        name: "木村 愛子",
        furigana: "キムラ アイコ",
        role: "-",
        event: "400m",
        pb: "400m 57.46",
        school: "旭川志峯高等学校",
        from: "北海道",
      },
      {
        name: "眞田 あこ",
        furigana: "サナダ アコ",
        role: "-",
        event: "100m<br>200m<br>400m",
        pb: "100m 12.08<br>200m 24.57<br>400m 56.67",
        school: "豊橋南高等学校",
        from: "愛知県",
      },
      {
        name: "谷本 実優",
        furigana: "タニモト ミユ",
        role: "-",
        event: "100m<br>200m<br>400m",
        pb: "100m 11.83<br>200m 24.35<br>400m 55.51",
        school: "九州国際大学付属高等学校",
        from: "福岡県",
      },
      {
        name: "畑 優希",
        furigana: "ハタ ユウキ",
        role: "-",
        event: "100mH<br>400mH",
        pb: "100mH 13.88<br>400mH 59.62",
        school: "相洋高等学校",
        from: "神奈川県",
      },
      {
        name: "福岡 胡碧",
        furigana: "フクオカ コダマ",
        role: "-",
        event: "100m",
        pb: "100m 12.28",
        school: "熊本工業高等学校",
        from: "熊本県",
      },
      {
        name: "本城谷 結愛",
        furigana: "ホンジョウヤ ユア",
        role: "-",
        event: "400m",
        pb: "400m 58.59",
        school: "日本体育大学柏高等学校",
        from: "千葉県",
      },
      {
        name: "増田 優月",
        furigana: "マスダ ユヅキ",
        role: "-",
        event: "100mH",
        pb: "100mH 13.80",
        school: "松阪商業高等学校",
        from: "三重県",
      },
      {
        name: "山本 由菜",
        furigana: "ヤマモト ユナ",
        role: "-",
        event: "100m",
        pb: "100m 12.53",
        school: "大館鳳鳴高等学校",
        from: "秋田県",
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

export default function SprintWomenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <AnimatedPageHeader
        title="短距離女子メンバー"
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