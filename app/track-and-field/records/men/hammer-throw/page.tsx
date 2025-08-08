"use client";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const menEvents = [
  "100m","200m","400m","800m","1500m","3000msc","110mh","400mh","5000m","10000m","20kmwalk","half-marathon","marathon","relay","triple-jump","long-jump","pole-vault","high-jump","shot-put","discus","javelin-throw","hammer-throw","decathlon"
];
const menEventDisplayNames = [
  "100m","200m","400m","800m","1500m","3000m障害","110mH","400mH","5000m","10000m","20km競歩","ハーフマラソン","マラソン","リレー","三段跳","走幅跳","棒高跳","走高跳","砲丸投","円盤投","やり投","ハンマー投","十種競技"
];

export default function MenHammerThrowRecordPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'ホーム', href: '/' },
            { label: '陸上競技部', href: '/track-and-field' },
            { label: '歴代記録', href: '/track-and-field/records' },
            { label: '男子ハンマー投 歴代ランキング' }
          ]} />
        </div>
        <AnimatedPageHeader title="男子ハンマー投 歴代ランキング" />
        <div className="overflow-x-auto mb-8">
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
              {/* データ未入力 */}
            </tbody>
          </table>
        </div>
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