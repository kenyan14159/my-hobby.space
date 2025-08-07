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
      { name: "阿部 天馬", furigana: "アベ テンマ", role: "-", event: "110mH", pb: "14.91", school: "船橋高校", from: "千葉県" },
      { name: "上釜 隼司", furigana: "ウエカマ シュンジ", role: "-", event: "400m", pb: "47.89", school: "霧ヶ丘", from: "神奈川県" },
      { name: "江上 開成", furigana: "エガミ カイセイ", role: "-", event: "100m / 200m", pb: "100m: 10.73<br>200m: 21.83", school: "明星学園", from: "東京都" },
      { name: "勝田 己太郎", furigana: "カツタ コタロウ", role: "-", event: "100m / 200m", pb: "100m: 10.65<br>200m: 22.47", school: "沼津東", from: "静岡県" },
      { name: "木塚 晟太", furigana: "キズカ ジョウタ", role: "-", event: "100m / 200m", pb: "100m: 11.22<br>200m: 22.60", school: "芦花", from: "東京都" },
      { name: "木村 誠", furigana: "キムラ マコト", role: "-", event: "100m / 200m", pb: "100m: 11.89<br>200m: 22.16", school: "高田", from: "三重県" },
      { name: "佐々木 啓人", furigana: "ササキ ケイト", role: "-", event: "100m / 110mH / 400mH", pb: "100m: 10.72<br>110mH: 14.04<br>400mH: 51.86", school: "浜松商業", from: "静岡県" },
      { name: "新佛 流生", furigana: "シンブツ リュウキ", role: "-", event: "100m / 200m / 400m", pb: "100m: 10.39<br>200m: 20.93<br>400m: 47.73", school: "片倉", from: "東京都" },
      { name: "土田 心", furigana: "ツチダ シン", role: "-", event: "100m / 200m", pb: "100m: 10.39<br>200m: 21.49", school: "相模原弥栄", from: "神奈川県" },
      { name: "日景 裕由", furigana: "ヒカゲ ユウ", role: "本部主務", event: "200m / 400m", pb: "200m: 23.14<br>400m: 50.34", school: "大館鳳鳴", from: "秋田県" },
      { name: "八木沼 亜音", furigana: "ハチキヌマ アオン", role: "-", event: "100m / 200m / 400m", pb: "100m: 11.03<br>200m: 21.73<br>400m: 48.49", school: "葛西南", from: "東京都" },
      { name: "道音 陸", furigana: "ミチオト リク", role: "-", event: "100m / 200m / 400m", pb: "100m: 11.15<br>200m: 22.95<br>400m: 50.65", school: "水橋", from: "-" },
      { name: "峰岸 慧", furigana: "ミネギシ サトル", role: "男子主務 (マネージャー)", event: "-", pb: "-", school: "羽生第一", from: "埼玉県" },
      { name: "宮武 サリームラリー", furigana: "ミヤタケ サリームラリー", role: "-", event: "100m / 200m / 400m", pb: "100m: 10.64<br>200m: 21.62<br>400m: 49.71", school: "朝霞西", from: "埼玉県" },
      { name: "谷田部 智貴", furigana: "ヤタベ トモキ", role: "-", event: "100m / 200m", pb: "100m: 11.28<br>200m: 22.99", school: "いなべ総合学園", from: "-" },
      { name: "矢吹 慶太", furigana: "ヤブキ ケイタ", role: "-", event: "100m / 200m", pb: "100m: 10.71<br>200m: 21.70", school: "東北", from: "福島県" },
      { name: "渡邉 幹太", furigana: "ワタナベ カンタ", role: "-", event: "400m", pb: "47.94", school: "相模原弥栄", from: "-" },
      { name: "渡邊 脩", furigana: "ワタナベ シュウ", role: "-", event: "100m / 400m / 400mH", pb: "100m: 11.30<br>400m: 48.51<br>400mH: 48.51", school: "十日町", from: "-" },
    ],
  },
  {
    grade: "3年生",
    members: [
      { name: "阿部 天馬", furigana: "アベ テンマ", role: "-", event: "110mH", pb: "14.91", school: "船橋", from: "-" },
      { name: "安保 祐希", furigana: "アボ ユウキ", role: "-", event: "100m / 200m / 400m", pb: "100m: 11.2<br>200m: 22.48<br>400m: 48.53", school: "滝川第二", from: "兵庫県" },
      { name: "新井 寛康", furigana: "アライ モトヤス", role: "-", event: "100m / 200m", pb: "100m: 11.32<br>200m: 22.56", school: "水戸工業", from: "茨城県" },
      { name: "石田 亮太", furigana: "イシダ リョウタ", role: "-", event: "100m / 200m / 110mH", pb: "100m: 10.69<br>200m: 22.2<br>110mH: 14.83", school: "広島皆実", from: "広島県" },
      { name: "大谷 介人", furigana: "オオタニ カイト", role: "-", event: "100m / 200m / 400m", pb: "100m: 10.41<br>200m: 20.93<br>400m: 47.54", school: "帝京安積", from: "福島県" },
      { name: "大山 健", furigana: "オオヤマ ケン", role: "-", event: "200m / 400m / 400mH", pb: "200m: 23.25<br>400m: 50.18<br>400mH: 55.56", school: "埼玉栄", from: "埼玉県" },
      { name: "小川 輝", furigana: "オガワ ヒカル", role: "-", event: "110mH", pb: "14.69", school: "所沢北", from: "埼玉県" },
      { name: "小澤 拓真", furigana: "オザワ タクマ", role: "-", event: "100m / 400m", pb: "100m: 10.86<br>400m: 47.83", school: "西湘", from: "神奈川県" },
      { name: "甲斐 快風", furigana: "カイ カムイ", role: "-", event: "400mH", pb: "52.61", school: "熊本工業", from: "熊本県" },
      { name: "河北 柊真", furigana: "カワキタ トウマ", role: "-", event: "100m / 110mH", pb: "100m: 11.10<br>110mH: 14.18", school: "皇學館", from: "三重県" },
      { name: "久保 翔", furigana: "クボ ツバサ", role: "-", event: "100m / 200m", pb: "100m: 10.71<br>200m: 21.84", school: "観音寺総合", from: "香川県" },
      { name: "佐藤 聖也", furigana: "サトウ セイヤ", role: "-", event: "200m / 400m", pb: "200m: 21.94<br>400m: 48.28", school: "千葉黎明", from: "千葉県" },
      { name: "島戸 心", furigana: "シマト シン", role: "-", event: "200m / 400m", pb: "200m: 21.46<br>400m: 47.44", school: "東筑紫", from: "福岡県" },
      { name: "清野 嘉人", furigana: "セイノ ヨシト", role: "-", event: "100m / 200m", pb: "100m: 10.87<br>200m: 21.76", school: "相模原弥栄", from: "神奈川県" },
      { name: "高野 雄斗", furigana: "タカノ ユウト", role: "-", event: "100m / 200m", pb: "100m: 10.81<br>200m: 22.27", school: "上溝南", from: "神奈川県" },
      { name: "滝内 翔太", furigana: "タキウチ ショウタ", role: "-", event: "200m / 110mH", pb: "200m: 22.18<br>110mH: 14.33", school: "いわき光洋", from: "福島県" },
      { name: "竹本 光希", furigana: "タケモト コウキ", role: "-", event: "100m / 200m / 400m", pb: "100m: 11.26<br>200m: 21.90<br>400m: 47.92", school: "相模原弥栄", from: "神奈川県" },
      { name: "豊岡 紘太", furigana: "トヨオカ コウタ", role: "-", event: "100m / 200m", pb: "100m: 11.32<br>200m: 22.43", school: "日本体育大学荏原", from: "東京都" },
      { name: "中野 萌人", furigana: "ナカノ メイト", role: "-", event: "200m / 400m / 400mH", pb: "200m: 22.93<br>400m: 48.93<br>400mH: 51.55", school: "八戸西", from: "青森県" },
      { name: "服部 悠", furigana: "ハットリ ユウ", role: "-", event: "200m / 400m", pb: "200m: 21.63<br>400m: 47.03", school: "橘", from: "神奈川県" },
      { name: "真壁 鈴空", furigana: "マカベ リク", role: "-", event: "100m / 200m", pb: "100m: 10.58<br>200m: 21.78", school: "日本体育大学柏", from: "埼玉県" },
      { name: "山本 莉久", furigana: "ヤマモト リク", role: "-", event: "100m / 200m", pb: "100m: 11.32<br>200m: 23.17", school: "鹿沼東", from: "栃木県" },
      { name: "吉川 柊真", furigana: "ヨシカワ シュウマ", role: "-", event: "100m / 200m / 400m", pb: "100m: 10.87<br>200m: 22.15<br>400m: 48.79", school: "相模原弥栄", from: "神奈川県" },
    ],
  },
  {
    grade: "2年生",
    members: [
      { name: "岩井 光大", furigana: "イワイ コウタ", role: "-", event: "100m / 200m / 400m", pb: "100m: 10.62<br>200m: 21.53<br>400m: 47.63", school: "鳥取城北高等学校", from: "鳥取県" },
      { name: "内田 雄斗", furigana: "ウチダ ユウト", role: "-", event: "100m / 200m", pb: "100m: 10.73<br>200m: 22.14", school: "花咲徳栄高等学校", from: "埼玉県" },
      { name: "内野 晃成", furigana: "ウチノ コウセイ", role: "-", event: "100m / 200m", pb: "100m: 11.40<br>200m: 23.40", school: "知徳高等学校", from: "静岡県" },
      { name: "上田 麗音", furigana: "ウエダ レオン", role: "-", event: "400m", pb: "49.55", school: "豊岡高等学校", from: "埼玉県" },
      { name: "大久保 然", furigana: "オオクボ ゼン", role: "-", event: "110mH", pb: "14.07", school: "長岡大手高等学校", from: "新潟県" },
      { name: "垣内 蓮", furigana: "カキウチ レン", role: "-", event: "100m / 200m", pb: "100m: 10.90<br>200m: 22.36", school: "和歌山北高等学校", from: "和歌山県" },
      { name: "加来 優斗", furigana: "カク ユウト", role: "-", event: "100m / 200m", pb: "100m: 10.7<br>200m: 21.66", school: "埼玉栄高等学校", from: "埼玉県" },
      { name: "櫛橋 怜介", furigana: "クシハシ リョウスケ", role: "-", event: "400mH", pb: "52.51", school: "東福岡高等学校", from: "福岡県" },
      { name: "齋藤 玄樹", furigana: "サイトウ ゲンキ", role: "-", event: "200m / 400m", pb: "200m: 21.98<br>400m: 48.19", school: "松が谷高等学校", from: "東京都" },
      { name: "齋藤 征大", furigana: "サイトウ セイダイ", role: "-", event: "100m / 200m", pb: "100m: 10.67<br>200m: 21.46", school: "東京高等学校", from: "神奈川県" },
      { name: "清水 琉成", furigana: "シミズ リュウセイ", role: "-", event: "100m / 200m", pb: "100m: 10.73<br>200m: 22.18", school: "日体大柏高等学校", from: "千葉県" },
      { name: "白崎 要", furigana: "シラサキ カナメ", role: "-", event: "110mH", pb: "14.72", school: "北陸高等学校", from: "福井県" },
      { name: "髙木 柚希", furigana: "タカギ ユズキ", role: "-", event: "100m / 200m / 400m", pb: "100m: 10.89<br>200m: 22.21<br>400m: 51.31", school: "飯山高等学校", from: "長野県" },
      { name: "髙松 怜音", furigana: "タカマツ レオン", role: "-", event: "100m / 200m / 400m", pb: "100m: 11.56<br>200m: 23.24<br>400m: 52.02", school: "真岡高等学校", from: "栃木県" },
      { name: "高山 景", furigana: "タカヤマ ケイ", role: "-", event: "200m / 400m", pb: "200m: 22.59<br>400m: 50.06", school: "つばさ総合高等学校", from: "東京都" },
      { name: "長野 史歩", furigana: "ナガノ シノブ", role: "-", event: "100m / 200m", pb: "100m: 11.00<br>200m: 22.60", school: "日体大柏高等学校", from: "東京都" },
      { name: "中山 七緒", furigana: "ナカヤマ ナオ", role: "-", event: "400mH", pb: "52.66", school: "橘高等学校", from: "神奈川県" },
      { name: "花輪 宙直", furigana: "ハナワ ソナ", role: "-", event: "100m / 200m", pb: "100m: 11.2<br>200m: 23.51", school: "片倉高等学校", from: "東京都" },
      { name: "平澤 大翔", furigana: "ヒラサワ ヤマト", role: "-", event: "100m / 200m", pb: "100m: 11.46<br>200m: 22.85", school: "葛飾野高等学校", from: "東京都" },
      { name: "緑川 唯斗", furigana: "ミドリカワ ユイト", role: "-", event: "100m / 200m / 400m", pb: "100m: 10.98<br>200m: 22.2<br>400m: 50.86", school: "帝京安積高等学校", from: "福島県" },
      { name: "武藏 大地", furigana: "ムサシ ダイチ", role: "-", event: "100m / 200m", pb: "100m: 10.35<br>200m: 21.78", school: "板橋高等学校", from: "東京都" },
      { name: "森 海斗", furigana: "モリ カイト", role: "-", event: "100m / 200m", pb: "100m: 10.77<br>200m: 21.83", school: "広島皆実高等学校", from: "広島県" },
      { name: "吉原 杏", furigana: "ヨシハラ キョウ", role: "-", event: "100m / 200m", pb: "100m: 10.68<br>200m: 21.51", school: "橘高等学校", from: "神奈川県" },
      { name: "渡部 楓", furigana: "ワタナベ カエデ", role: "-", event: "100m / 200m", pb: "100m: 11.26<br>200m: 22.68", school: "八王子学園高等学校", from: "東京都" },
    ],
  },
  {
    grade: "1年生",
    members: [
      { name: "青木 大知", furigana: "アオキ ダイチ", role: "-", event: "100m / 200m", pb: "100m: 10.69<br>200m: 21.50", school: "伊奈学園総合高等学校", from: "埼玉県" },
      { name: "赤松 陽太", furigana: "アカマツ ヨウタ", role: "-", event: "100m / 200m / 400m", pb: "100m: 11.29<br>200m: 22.65<br>400m: 50.75", school: "日本体育大学荏原高等学校", from: "神奈川県" },
      { name: "飯島 雅也", furigana: "イイジマ マサヤ", role: "-", event: "100m / 200m / 400m", pb: "100m: 11.4<br>200m: 23.0<br>400m: 51.0", school: "日本体育大学柏高等学校", from: "千葉県" },
      { name: "板橋 俊", furigana: "イタバシ シュン", role: "-", event: "100m", pb: "10.92", school: "相洋高等学校", from: "神奈川県" },
      { name: "井原 波月", furigana: "イハラ ナヅキ", role: "-", event: "400mH", pb: "52.41", school: "相模原弥栄高等学校", from: "神奈川県" },
      { name: "岡 秀磨", furigana: "オカ シュウマ", role: "-", event: "100m / 200m", pb: "100m: 10.54<br>200m: 21.46", school: "皇學館高等学校", from: "三重県" },
      { name: "小野 浬空", furigana: "オノ リク", role: "-", event: "110mH / 400mH", pb: "110mH: 14.97<br>400mH: 53.85", school: "明星学園高等学校", from: "東京都" },
      { name: "金川 恭悟", furigana: "カナガワ キョウゴ", role: "-", event: "400m", pb: "50.57", school: "いわき光洋高校", from: "福島県" },
      { name: "川上 大翔", furigana: "カワカミ ヒロト", role: "-", event: "100m / 200m", pb: "100m: 11.40<br>200m: 23.35", school: "会津学鳳高等学校", from: "福島県" },
      { name: "川嵜 蓮", furigana: "カワサキ レン", role: "-", event: "100m / 200m", pb: "100m: 10.72<br>200m: 21.78", school: "西条農業高等学校", from: "広島県" },
      { name: "菊池 健太", furigana: "キクチ ケンタ", role: "-", event: "100m / 200m", pb: "100m: 11.23<br>200m: 22.06", school: "下妻第二高等学校", from: "茨城県" },
      { name: "櫻井 響", furigana: "サクライ ヒビキ", role: "-", event: "100m / 200m", pb: "100m: 10.81<br>200m: 21.74", school: "日本体育大学柏高等学校", from: "東京都" },
      { name: "佐藤 颯祐", furigana: "サトウ ソウスケ", role: "-", event: "100m / 200m", pb: "100m: 10.81<br>200m: 21.90", school: "旭川志峯高等学校", from: "北海道" },
      { name: "四方 遥輝", furigana: "シカタ ハルキ", role: "-", event: "100m", pb: "11.67", school: "京都共栄学園高等学校", from: "京都府" },
      { name: "宍戸 暸太", furigana: "シシド リョウタ", role: "-", event: "200m / 400m", pb: "200m: 21.35<br>400m: 47.87", school: "広島井口高等学校", from: "広島県" },
      { name: "白鳥 由清", furigana: "シラトリ ユウセイ", role: "-", event: "400mH", pb: "55.75", school: "和歌山北高等学校", from: "和歌山県" },
      { name: "髙水 明", furigana: "タカミズ メイ", role: "-", event: "400m", pb: "47.96", school: "帝京安積高等学校", from: "福島県" },
      { name: "田中 日向太", furigana: "タナカ ヒナタ", role: "-", event: "100m / 200m", pb: "100m: 11.65<br>200m: 23.52", school: "八王子学園八王子高等学校", from: "東京都" },
      { name: "塚越 瑛祐", furigana: "ツカコシ エイスケ", role: "-", event: "100m", pb: "11.25", school: "つくば秀英高等学校", from: "茨城県" },
      { name: "西川 侑吾", furigana: "ニシカワ ユウゴ", role: "-", event: "100m", pb: "11.06", school: "紅葉川高等学校", from: "東京都" },
      { name: "福峯 純一郎", furigana: "フクミネ ジュンイチロウ", role: "-", event: "100m", pb: "10.81", school: "鹿児島南高等学校", from: "鹿児島県" },
      { name: "星野 光輝", furigana: "ホシノ コウキ", role: "-", event: "100m / 200m", pb: "100m: 11.39<br>200m: 22.46", school: "日本体育大学荏原高等学校", from: "東京都" },
      { name: "本池 拓夢", furigana: "モトイケ タクム", role: "-", event: "100m", pb: "10.76", school: "境高等学校", from: "岡山県" },
      { name: "三浦 利矩", furigana: "ミウラ リク", role: "-", event: "100m / 200m", pb: "100m: 10.93<br>200m: 21.49", school: "板橋高等学校", from: "東京都" },
      { name: "三浦 悠太", furigana: "ミウラ ユウタ", role: "-", event: "100m / 200m", pb: "100m: 10.88<br>200m: 22.18", school: "日川高等学校", from: "山梨県" },
      { name: "森口 匠真", furigana: "モリグチ ショウマ", role: "-", event: "400m", pb: "49.27", school: "比叡山高等学校", from: "滋賀県" },
      { name: "若尾 龍弥", furigana: "ワカオ リュウヤ", role: "-", event: "400m", pb: "51.45", school: "巨摩高等学校", from: "山梨県" },
      { name: "渡邉 陽大", furigana: "ワタナベ アキヒロ", role: "-", event: "400m", pb: "48.31", school: "九州産業大学付属九州産業高等学校", from: "福岡県" },
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

export default function SprintMenPage() {
  const [selectedGrade, setSelectedGrade] = useState(gradeTabs[0]);
  const selectedMembers = membersByGrade.find(g => g.grade === selectedGrade)?.members || [];

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <AnimatedPageHeader
        title="短距離男子メンバー"
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