"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// 記録データの型定義
interface Record {
  name: string;
  highSchool: string;
  record: string;
  year: number | null;
  recordYear: string;
}

// 男子20km競歩の記録データ
const recordsData: Record[] = [
    { name: "山本 陽平", highSchool: "清風", record: "1:26'39\"", year: 4, recordYear: "2010" },
    { name: "井上 宗治", highSchool: "名張西", record: "1:28'22\"", year: 1, recordYear: "2010" },
    { name: "大家 義浩", highSchool: "金沢", record: "1:29'15\"", year: 4, recordYear: "1985" },
    { name: "土田 信夫", highSchool: "長岡大手", record: "1:29'23\"", year: null, recordYear: "1983" },
    { name: "中野 誠也", highSchool: "大成", record: "1:30'20\"", year: 3, recordYear: "1989" },
    { name: "奥野 浩", highSchool: "清風", record: "1:31'59\"", year: null, recordYear: "1987" },
    { name: "前田 輝秀", highSchool: "京都商業", record: "1:32'51\"", year: null, recordYear: "1986" },
    { name: "籠島 信行", highSchool: "柿崎", record: "1:34'04\"", year: 4, recordYear: "1980" },
    { name: "山下 昌毅", highSchool: "東海工業", record: "1:34'21\"", year: null, recordYear: "1991" },
    { name: "清水 孝", highSchool: "十日町", record: "1:34'45\"", year: 3, recordYear: "1999" },
    { name: "安部 哲司", highSchool: "松原", record: "1:36'14\"", year: null, recordYear: "1988" },
    { name: "堀尾 正弘", highSchool: "倉敷", record: "1:37'06\"", year: 2, recordYear: "1989" },
    { name: "西 一博", highSchool: "松原", record: "1:37'08\"", year: 2, recordYear: "1989" },
    { name: "遠山 浩治", highSchool: "倉敷", record: "1:37'39\"", year: null, recordYear: "1987" },
    { name: "岩田 佳久", highSchool: "日大三島", record: "1:37'40\"", year: null, recordYear: "1984" },
    { name: "沢柳 良太", highSchool: "浜松日体", record: "1:38'24\"", year: 2, recordYear: "2008" },
    { name: "伊西 繁利", highSchool: "八戸", record: "1:39'18\"", year: null, recordYear: "1975" },
    { name: "猪股 哲崇", highSchool: "三好", record: "1:43'59\"", year: 2, recordYear: "2015" },
    { name: "金沢 孝志", highSchool: "恵庭南", record: "1:44'46\"", year: 2, recordYear: "2004" },
    { name: "仁科", highSchool: "", record: "1:49'35\"", year: null, recordYear: "1957" },
];

const menEvents = [
  "100m",
  "200m",
  "400m",
  "800m",
  "1500m",
  "3000msc",
  "110mh",
  "400mh",
  "5000m",
  "10000m",
  "20kmwalk",
  "half-marathon",
  "marathon",
  "relay",
  "triple-jump",
  "long-jump",
  "pole-vault",
  "high-jump",
  "shot-put",
  "discus",
  "javelin-throw",
  "hammer-throw",
  "decathlon"
];

// 表示用の種目名
const menEventDisplayNames = [
  "100m",
  "200m",
  "400m",
  "800m",
  "1500m",
  "3000m障害",
  "110mH",
  "400mH",
  "5000m",
  "10000m",
  "20km競歩",
  "ハーフマラソン",
  "マラソン",
  "リレー",
  "三段跳",
  "走幅跳",
  "棒高跳",
  "走高跳",
  "砲丸投",
  "円盤投",
  "やり投",
  "ハンマー投",
  "十種競技"
];

export default function MensTwentyKilometersWalkPage() {
  // タイムでソート + 同タイムの場合の順位計算
  const rankedRecords = useMemo(() => {
    const parseRecordToSeconds = (recordStr: string) => {
      // 例: "1:26'39\"" または "26'39\""
      let hours = 0, minutes = 0, seconds = 0;
      let main = recordStr.replace('"', '');
      if (main.includes(":")) {
        // "1:26'39"" → ["1", "26", "39"]
        const [h, rest] = main.split(":");
        hours = Number(h);
        if (rest.includes("'")) {
          const [m, s] = rest.split("'");
          minutes = Number(m);
          seconds = Number(s);
        } else {
          minutes = Number(rest);
        }
      } else {
        // "26'39"" → ["26", "39"]
        const [m, s] = main.split("'");
        minutes = Number(m);
        seconds = Number(s);
      }
      return hours * 3600 + minutes * 60 + seconds;
    };

    const sortedRecords = [...recordsData].sort((a, b) => {
      const totalSecondsA = parseRecordToSeconds(a.record);
      const totalSecondsB = parseRecordToSeconds(b.record);
      return totalSecondsA - totalSecondsB;
    });

    let rank = 1;
    let prevRecord: string | null = null; // 前の記録
    // ソートされた配列に rank を追加
    return sortedRecords.map((record, index) => {
      if (record.record !== prevRecord) {
        rank = index + 1; // 現在のインデックス + 1 を新しい順位とする
      }
      prevRecord = record.record; // 前の記録を更新
      return { ...record, rank }; // rank プロパティを追加
    });
  }, []);


  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'ホーム', href: '/' },
            { label: '陸上競技部', href: '/track-and-field' },
            { label: '歴代記録', href: '/track-and-field/records' },
            { label: '男子20km競歩 歴代ランキング' }
          ]} />
        </div>
        <AnimatedPageHeader title="男子20km競歩 歴代ランキング" />

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 font-medium">順位</th>
                    <th className="text-left py-2 px-2 font-medium">氏名</th>
                    <th className="text-left py-2 px-2 font-medium">出身高校</th>
                    <th className="text-left py-2 px-2 font-medium">記録</th>
                    <th className="text-left py-2 px-2 font-medium">学年</th>
                    <th className="text-left py-2 px-2 font-medium">記録年</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedRecords.map((record, index) => (
                    <tr
                      key={record.name + record.record}
                      className={`border-b hover:bg-muted/50 text-xs sm:text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="py-2 px-2">
                        {record.rank}
                      </td>
                      <td className="py-2 px-2 font-medium flex items-center gap-1">
                        {record.name}
                        {record.recordYear === "2025年" && (
                          <span className="ml-1 px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs font-bold">New</span>
                        )}
                      </td>
                      <td className="py-2 px-2">{record.highSchool}</td>
                      <td className="py-2 px-2 font-medium">{record.record}</td>
                      <td className="py-2 px-2">
                        {record.year ? `${record.year}年` : "-"}
                      </td>
                      <td className="py-2 px-2">{record.recordYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 種目一覧 */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">男子種目一覧</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {menEventDisplayNames.map((displayName, index) => (
              <Button key={displayName} variant="outline" asChild className="justify-start">
                <Link href={`/records/men/${menEvents[index]}`}>
                  {displayName}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}