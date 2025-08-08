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
        name: "小島 彩乃",
        furigana: "コジマ アヤノ",
        role: "-",
        event: "5000m",
        pb: "800m: 2:21.55<br>1500m: 4:36.52<br>3000m: 9:21.29<br>5000m: 16:32.26<br>10000m: 34:42.27",
        school: "学校法人石川",
        from: "福島県",
      },
      {
        name: "小島 さくら",
        furigana: "コジマ サクラ",
        role: "-",
        event: "5000m",
        pb: "800m: 2:21.23<br>1500m: 4:37.18<br>3000m: 9:20.44<br>5000m: 16:33.02",
        school: "学校法人石川",
        from: "福島県",
      },
      {
        name: "塩入 百葉",
        furigana: "シオイリ モモハ",
        role: "-",
        event: "5000m",
        pb: "800m: 2:13.90<br>1500m: 4:26.87<br>3000m: 9:25.34<br>5000m: 16:36.20",
        school: "錦城学園",
        from: "東京都",
      },
      {
        name: "中村 綾花",
        furigana: "ナカムラ アヤカ",
        role: "-",
        event: "10000mW / 20kmW",
        pb: "5000mW: 22:30.43<br>10000mW: 47:56.37<br>10kmW: 46:53<br>ハーフマラソンW: 1:38:28",
        school: "長野東",
        from: "長野県",
      },
      {
        name: "柳井 桜子",
        furigana: "ヤナイ サクラコ",
        role: "-",
        event: "5000m",
        pb: "800m: 2:12.49<br>1500m: 4:21.22<br>3000m: 9:20.60<br>5000m: 15:57.83<br>10000m: 33:05.27<br>ハーフマラソン: 1:15:39",
        school: "大阪薫英",
        from: "大阪府",
      },
    ],
  },
  {
    grade: "3年生",
    members: [
      {
        name: "佐藤 悠花",
        furigana: "サトウ ユウカ",
        role: "-",
        event: "3000m / 5000m",
        pb: "800m: 2:15.35<br>1500m: 4:22.83<br>3000m: 9:28.05<br>5000m: 16:59.82",
        school: "長野東",
        from: "長野県",
      },
      {
        name: "菅原 ひまわり",
        furigana: "スガワラ ヒマワリ",
        role: "-",
        event: "5000m / 10000m",
        pb: "800m: 2:18.83<br>1500m: 4:33.88<br>3000m: 9:32.52<br>5000m: 17:23.65",
        school: "錦城学園",
        from: "東京都",
      },
      {
        name: "髙杢 光希",
        furigana: "タカモク ミツキ",
        role: "-",
        event: "1500m / 5000m",
        pb: "800m: 2:16.91<br>1500m: 4:36.53<br>3000m: 9:36.95<br>5000m: 16:31.50",
        school: "九州国際大学付属",
        from: "福岡県",
      },
      {
        name: "田中 希実",
        furigana: "タナカ ノゾミ",
        role: "-",
        event: "5000m / 10000m",
        pb: "800m: 2:26.25<br>1500m: 4:33.22<br>3000m: 9:31.65<br>5000m: 16:20.61<br>10000m: 34:59.23<br>ハーフマラソン: 1:16:48",
        school: "埼玉栄",
        from: "埼玉県",
      },
      {
        name: "西村 真里奈",
        furigana: "ニシムラ マリナ",
        role: "主務",
        event: "-",
        pb: "-",
        school: "小林",
        from: "宮崎県",
      },
      {
        name: "林 凜華",
        furigana: "ハヤシ リンカ",
        role: "マネージャー",
        event: "-",
        pb: "1500m: 4:35.89<br>3000m: 9:37.74<br>5000m: 16:27.28",
        school: "順天",
        from: "東京都",
      },
      {
        name: "渡邉 珠有",
        furigana: "ワタナベ シュウ",
        role: "マネージャー",
        event: "3000mSC / 5000m",
        pb: "800m: 2:16.25<br>1500m: 4:35.16<br>3000m: 9:25.13<br>5000m: 16:11.66<br>3000mSC: 10:37.36",
        school: "茨城キリスト教学園",
        from: "茨城県",
      },
    ],
  },
  {
    grade: "2年生",
    members: [
      {
        name: "飯田 和代",
        furigana: "イイダ カズヨ",
        role: "-",
        event: "1500m / 3000m",
        pb: "800m: 2:17.69<br>1500m: 4:31.24<br>3000m: 9:37.96<br>5000m: 16:11.49",
        school: "市立船橋",
        from: "千葉県",
      },
      {
        name: "齋藤 一乃",
        furigana: "サイトウ イチノ",
        role: "-",
        event: "3000m / 5000m",
        pb: "800m: 2:24.50<br>1500m: 4:39.99<br>3000m: 9:44.67<br>5000m: 16:33.61<br>10000m: 34:21.32<br>ハーフマラソン: 1:14:03",
        school: "長生",
        from: "千葉県",
      },
      {
        name: "関本 遥",
        furigana: "セキモト ハルカ",
        role: "-",
        event: "800m / 1500m",
        pb: "800m: 2:10.26<br>1500m: 4:21.36<br>3000m: 9:34.29<br>5000m: 16:46.00<br>3000mSC: 10:50.80",
        school: "須磨",
        from: "兵庫県",
      },
      {
        name: "野村 夏希",
        furigana: "ノムラ ナツキ",
        role: "マネージャー",
        event: "3000m / 5000m",
        pb: "800m: 2:20.91<br>1500m: 4:41.96<br>3000m: 9:35.82<br>5000m: 16:52.47",
        school: "諫早",
        from: "長崎県",
      },
      {
        name: "向井 友希",
        furigana: "ムカイ ユウキ",
        role: "-",
        event: "1500m / 3000m",
        pb: "800m: 2:16.81<br>1500m: 4:27.78<br>3000m: 9:26.80<br>5000m: 17:47.31",
        school: "大阪薫英",
        from: "大阪府",
      },
    ],
  },
  {
    grade: "1年生",
    members: [
      {
        name: "佐藤 柚優",
        furigana: "サトウ ユズユ",
        role: "-",
        event: "800m/1500m/3000m<br>5000m/2000mSC/3000mSC",
        pb: "800m: 2:19.96<br>1500m: 4:31.25<br>3000m: 9:23.49<br>5000m: 16:27.91<br>2000mSC: 6:45.62<br>3000mSC: 10:26.84",
        school: "仙台育英学園高等学校",
        from: "埼玉県",
      },
      {
        name: "中尾 夕菜",
        furigana: "ナカオ ユナ",
        role: "-",
        event: "800m / 1500m / 3000m",
        pb: "800m: 2:12.94<br>1500m: 4:32.81<br>3000m: 9:43.55",
        school: "駒澤大学高等学校",
        from: "東京都",
      },
      {
        name: "日置 澪",
        furigana: "ヒオキ ミオ",
        role: "-",
        event: "800m/1500m/3000m/10km",
        pb: "800m: 2:24.44<br>1500m: 4:39.48<br>3000m: 9:56.71<br>10km: 36:26",
        school: "ルーテル学院高等学校",
        from: "熊本県",
      },
      {
        name: "増田 七菜",
        furigana: "マスダ ナナ",
        role: "-",
        event: "800m / 1500m / 3000m",
        pb: "800m: 2:21.76<br>1500m: 4:35.50<br>3000m: 9:44.13",
        school: "常葉大学附属菊川高等学校",
        from: "静岡県",
      },
      {
        name: "村瀬 音ヶ羽",
        furigana: "ムラセ ネネハ",
        role: "-",
        event: "800m / 1500m / 3000m",
        pb: "800m: 2:11.20<br>1500m: 4:26.12<br>3000m: 9:31.81",
        school: "川崎市立橘高等学校",
        from: "神奈川県",
      },
      {
        name: "山村 弥央",
        furigana: "ヤマムラ ミオ",
        role: "-",
        event: "800m/1500m/3000m<br>2000mSC/3000mSC/マラソン",
        pb: "800m: 2:23.81<br>1500m: 4:37.41<br>3000m: 9:40.09<br>2000mSC: 7:04.06<br>3000mSC: 10:52.79<br>マラソン: 3:02:27",
        school: "大阪薫英女学院高等学校",
        from: "大阪府",
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

export default function EkidenWomenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: 'メンバー・ブロック紹介', href: '/track-and-field/members' }, { label: '駅伝女子メンバー' }]} />
      </div>
      <AnimatedPageHeader
        title="駅伝女子メンバー"
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