import Link from "next/link";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  { label: "100m", path: "100m" },
  { label: "200m", path: "200m" },
  { label: "400m", path: "400m" },
  { label: "800m", path: "800m" },
  { label: "1500m", path: "1500m" },
  { label: "3000m障害", path: "3000msc" },
  { label: "110mH", path: "110mh" },
  { label: "100mH", path: "100mh" },
  { label: "400mH", path: "400mh" },
  { label: "5000m", path: "5000m" },
  { label: "10000m", path: "10000m" },
  { label: "20km競歩", path: "20kmwalk" },
  { label: "10000m競歩", path: "10000mwalk" },
  { label: "ハーフマラソン", path: "half-marathon" },
  { label: "マラソン", path: "marathon" },
  { label: "リレー", path: "relay" },
  { label: "三段跳", path: "triple-jump" },
  { label: "走幅跳", path: "long-jump" },
  { label: "棒高跳", path: "pole-vault" },
  { label: "走高跳", path: "high-jump" },
  { label: "砲丸投", path: "shot-put" },
  { label: "円盤投", path: "discus" },
];

const categories = [
  { label: "男子", prefix: "men", color: "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100" },
  { label: "女子", prefix: "women", color: "bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100" },
];

export default function TrackAndFieldRecordsPage() {
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: '歴代記録' }]} />
      </div>
      <AnimatedPageHeader title="歴代記録" subtitle="歴代記録・ランキングを種目別に掲載" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {categories.map((cat) => (
          <div key={cat.label}>
            <h2 className={`text-lg font-bold mb-4 ${cat.prefix === "men" ? "text-blue-800" : "text-pink-700"}`}>{cat.label}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {events.map((event) => (
                <Link
                  key={event.path}
                  href={`/track-and-field/records/${cat.prefix}/${event.path}`}
                  className="block"
                >
                  <Card className={`border ${cat.color} transition-colors duration-150`}>
                    <CardContent className="py-3 px-4 text-center font-medium">
                      {event.label}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 