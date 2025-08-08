import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// 2025年度大会日程データ
const scheduleItems = [
  // 春夏シーズン (4月～7月)
  {
    id: 1,
    title: "日本学生陸上競技個人選手権大会",
    date: "2025年4月25日(金)～27日(日)",
    location: "レモンガススタジアム平塚・東海大学湘南校舎陸上競技場",
    season: "春",
  },
  {
    id: 2,
    title: "第104回関東学生陸上競技対校選手権大会 (関東インカレ)",
    date: "2025年5月8日(木)～11日(日)",
    location: "相模原ギオンスタジアム",
    season: "春",
  },
  {
    id: 3,
    title: "秩父宮賜杯第57回全日本大学駅伝対校選手権大会関東学生陸上競技連盟推薦校選考会",
    date: "2025年5月24日(土)",
    location: "レモンガススタジアム平塚",
    season: "夏",
  },
  {
    id: 4,
    title: "関東学生網走夏季記録挑戦競技会",
    date: "2025年7月20日(日)",
    location: "網走市営陸上競技場",
    season: "夏",
  },
  {
    id: 5,
    title: "第20回トワイライトゲームス",
    date: "2025年 開催日未定",
    location: "会場未定",
    season: "夏",
  },
  // 秋冬シーズン (8月～12月)
  {
    id: 6,
    title: "天皇賜杯第94回日本学生陸上競技対校選手権大会 (日本インカレ)",
    date: "2025年6月5日(木)～8日(日)",
    location: "JFE晴れの国スタジアム（岡山）",
    season: "秋",
  },
  {
    id: 7,
    title: "秩父宮賜杯第65回実業団・学生対抗陸上競技大会 (オールスターナイト陸上)",
    date: "2025年8月9日(土)",
    location: "レモンガススタジアム平塚",
    season: "秋",
  },
  {
    id: 8,
    title: "第36回関東学生新人陸上競技選手権大会 兼関東学生リレー競技会",
    date: "2025年9月26日(金)～28日(日)",
    location: "相模原ギオンスタジアム",
    season: "秋",
  },
  {
    id: 9,
    title: "第31回関東大学女子駅伝対校選手権大会",
    date: "2025年10月4日(土)",
    location: "印西市千葉ニュータウン周回コース",
    season: "秋",
  },
  {
    id: 10,
    title: "第102回東京箱根間往復大学駅伝競走予選会",
    date: "2025年 開催日未定",
    location: "陸上自衛隊立川駐屯地～立川市街地～国営昭和記念公園",
    season: "秋",
  },
  {
    id: 11,
    title: "第37回出雲市全日本大学選抜駅伝競走",
    date: "2025年10月13日(月)",
    location: "出雲市",
    season: "秋",
  },
  {
    id: 12,
    title: "第43回全日本大学女子駅伝対校選手権大会",
    date: "2025年10月26日(日)",
    location: "仙台市",
    season: "秋",
  },
  {
    id: 13,
    title: "秩父宮賜杯第57回全日本大学駅伝対校選手権大会",
    date: "2025年11月2日(日)",
    location: "名古屋市～伊勢市",
    season: "秋",
  },
  {
    id: 14,
    title: "2025全日本大学女子選抜駅伝競走",
    date: "2025年12月30日(火)",
    location: "富士宮市～富士市",
    season: "秋",
  },
  // 冬春シーズン (2026年1月～3月)
  {
    id: 15,
    title: "第102回東京箱根間往復大学駅伝競走",
    date: "2026年1月2日(金)～3日(土)",
    location: "大手町読売新聞社前～ 箱根町芦ノ湖駐車場入口",
    season: "冬",
  },
  {
    id: 16,
    title: "第29回日本学生ハーフマラソン選手権大会",
    date: "2026年 開催日未定",
    location: "丸亀市",
    season: "冬",
  },
  {
    id: 17,
    title: "第29回日本学生女子ハーフマラソン選手権大会",
    date: "2026年 開催日未定",
    location: "松江市",
    season: "冬",
  },
  {
    id: 18,
    title: "第20回日本学生20km競歩選手権大会",
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
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: '大会日程' }]} />
      </div>
      <AnimatedPageHeader
        title="2025年度 大会日程"
        subtitle="日本体育大学陸上競技部の大会スケジュール"
      />
      <div className="max-w-4xl mx-auto">
        <Separator className="mb-8" />
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5 bg-white rounded-xl border">
            <TabsTrigger value="all" className="font-bold">全て</TabsTrigger>
            <TabsTrigger value="spring" className="font-bold">春夏</TabsTrigger>
            <TabsTrigger value="autumn" className="font-bold">秋</TabsTrigger>
            <TabsTrigger value="winter" className="font-bold">冬春</TabsTrigger>
            <TabsTrigger value="ekiden" className="font-bold">駅伝</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScheduleGrid items={scheduleItems} />
          </TabsContent>
          <TabsContent value="spring">
            <ScheduleGrid items={scheduleItems.filter(item => item.season === "春" || item.season === "夏")} />
          </TabsContent>
          <TabsContent value="autumn">
            <ScheduleGrid items={scheduleItems.filter(item => item.season === "秋")} />
          </TabsContent>
          <TabsContent value="winter">
            <ScheduleGrid items={scheduleItems.filter(item => item.season === "冬")} />
          </TabsContent>
          <TabsContent value="ekiden">
            <ScheduleGrid items={scheduleItems.filter(item => item.title.includes("駅伝"))} />
          </TabsContent>
        </Tabs>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-blue-600">2025年度 大会日程について</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              このページでは、日本体育大学陸上競技部の2025年度大会日程を掲載しています。
              多くの大会は現時点で開催日や会場が未定です。決定次第、随時更新いたします。
            </p>
          </CardContent>
        </Card>
      </div>
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