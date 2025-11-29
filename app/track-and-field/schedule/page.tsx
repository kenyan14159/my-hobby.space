import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackFieldQuickAccess } from "@/components/track-field-quick-access";
import { BackToTop } from "@/components/ui/back-to-top";
import { Calendar } from "lucide-react";

// 2025年度 長距離競技会（今後の大会のみ）
const longDistanceCompetitions = [
  {
    number: "第26回",
    date: "12月20日(土)",
    title: "女子長距離競技会",
  },
];

// 2025年度大会日程データ（今後の大会のみ）
const scheduleItems = [
  {
    id: 1,
    title: "2025全日本大学女子選抜駅伝競走",
    date: "2025年12月30日(火)",
    location: "富士宮市～富士市",
    season: "秋",
  },
  {
    id: 2,
    title: "第102回東京箱根間往復大学駅伝競走",
    date: "2026年1月2日(金)～3日(土)",
    location: "大手町読売新聞社前～ 箱根町芦ノ湖駐車場入口",
    season: "冬",
  },
  {
    id: 3,
    title: "第29回日本学生ハーフマラソン選手権大会",
    date: "2026年 開催日未定",
    location: "丸亀市",
    season: "冬",
  },
  {
    id: 4,
    title: "第29回日本学生女子ハーフマラソン選手権大会",
    date: "2026年 開催日未定",
    location: "松江市",
    season: "冬",
  },
  {
    id: 5,
    title: "第20回日本学生競歩選手権大会",
    date: "2026年 開催日未定",
    location: "能美市",
    season: "冬",
  },
];

// シーズンごとの色分け
const seasonStyle: Record<string, string> = {
  春: "border-l-4 border-pink-400 bg-pink-50",
  夏: "border-l-4 border-yellow-300 bg-yellow-50",
  秋: "border-l-4 border-orange-400 bg-orange-50",
  冬: "border-l-4 border-blue-400 bg-blue-50",
};

export default function TrackAndFieldSchedulePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: '大会日程' }]} />
      </div>
      <AnimatedPageHeader
        title="2025年度 大会日程"
        subtitle="Competition Schedule"
      />
      
      {/* クイックアクセスボタン */}
      <TrackFieldQuickAccess />
      
      <div className="max-w-5xl mx-auto">

        {/* 長距離競技会 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-600" />
            長距離競技会
          </h2>
          <div className="space-y-3">
            {longDistanceCompetitions.map((comp, index) => (
              <Card key={index} className="border-l-4 border-green-500 bg-green-50/50">
                <CardContent className="py-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">{comp.number}</Badge>
                        <span className="text-sm font-semibold text-gray-700">{comp.date}</span>
                      </div>
                      <h3 className="text-sm text-gray-800">{comp.title}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 主要大会 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            主要大会
          </h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl border">
              <TabsTrigger value="all" className="text-xs md:text-sm">全て</TabsTrigger>
              <TabsTrigger value="winter" className="text-xs md:text-sm">冬春</TabsTrigger>
              <TabsTrigger value="ekiden" className="text-xs md:text-sm">駅伝</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScheduleGrid items={scheduleItems} />
            </TabsContent>
            <TabsContent value="winter">
              <ScheduleGrid items={scheduleItems.filter(item => item.season === "冬")} />
            </TabsContent>
            <TabsContent value="ekiden">
              <ScheduleGrid items={scheduleItems.filter(item => item.title.includes("駅伝"))} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <BackToTop />
    </div>
  );
}

function ScheduleGrid({ items }: { items: typeof scheduleItems }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">この期間のスケジュールはありません。</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <ScheduleCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function ScheduleCard({ item }: { item: typeof scheduleItems[0] }) {
  const style = seasonStyle[item.season] || "border-l-4 border-gray-200 bg-gray-50";
  return (
    <Card className={`hover:shadow-md transition-shadow ${style} border border-gray-100`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900 mb-1">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm text-gray-700 mb-1 font-medium">{item.date}</div>
        <div className="text-sm text-gray-500 mb-2">{item.location}</div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{item.season}</Badge>
        </div>
      </CardContent>
    </Card>
  );
} 