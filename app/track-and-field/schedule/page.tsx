import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Calendar } from "lucide-react";

// 2025年度 日本体育大学陸上競技会
const nittaiCompetitions = [
  {
    number: "第148回",
    date: "2025年3月22日（土）・23日（日）",
    hasInfo: true,
  },
  {
    number: "第149回",
    date: "2025年4月19日（土）・20日（日）",
    hasInfo: false,
  },
  {
    number: "第150回",
    date: "2025年5月17日（土）・18日（日）",
    hasInfo: false,
  },
  {
    number: "第151回",
    date: "2025年6月21日（土）・22日（日）",
    hasInfo: false,
  },
  {
    number: "第152回",
    date: "2025年9月27日（土）・28日（日）",
    note: "※日程と場所を変更して実施する場合があります",
  },
  {
    number: "第153回",
    date: "2025年10月18日（土）・19日（日）",
    note: "※日程と場所を変更して実施する場合があります",
  },
  {
    number: "2025年度日体大選手権",
    date: "2025年11月1日（土）・2日（日）",
    note: "※日程と場所を変更して実施する場合があります",
  },
];

// 2025年度 長距離競技会
const longDistanceCompetitions = [
  {
    number: "第319回",
    date: "3月29日(土) - 30日(日)",
    title: "日本体育大学長距離競技会",
  },
  {
    number: "第320回",
    date: "4月26日(土) - 27日(日)",
    title: "日本体育大学長距離競技会 兼 第14回NCG",
  },
  {
    number: "第321回",
    date: "5月31日(土) - 6月1日(日)",
    title: "日本体育大学長距離競技会 兼 第15回NCG",
  },
  {
    number: "第322回",
    date: "6月14日(土) - 15日(日)",
    title: "日本体育大学長距離競技会 兼 第16回NCG",
    note: "※改修工事の関係で日程変更(4/1)",
  },
  {
    number: "第323回",
    date: "10月5日(日)",
    title: "日本体育大学長距離競技会 兼 第17回NCG",
    location: "慶應義塾大学日吉陸上競技場",
    locationNote: "競技場改修工事に伴い会場変更。駐車場なし。",
  },
  {
    number: "第324回",
    date: "11月15日(土) - 16日(日)",
    title: "日本体育大学長距離競技会 兼 第18回NCG",
  },
  {
    number: "第325回",
    date: "11月29日(土) - 30日(日)",
    title: "日本体育大学長距離競技会 兼 第19回NCG",
  },
  {
    number: "第26回",
    date: "12月20日(土)",
    title: "女子長距離競技会",
  },
];

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
    title: "天皇賜杯第94回日本学生陸上競技対校選手権大会 (日本インカレ)",
    date: "2025年6月5日(木)～8日(日)",
    location: "JFE晴れの国スタジアム（岡山）",
    season: "夏",
  },
  {
    id: 5,
    title: "関東学生網走夏季記録挑戦競技会",
    date: "2025年7月20日(日)",
    location: "網走市営陸上競技場",
    season: "夏",
  },
  {
    id: 6,
    title: "秩父宮賜杯第65回実業団・学生対抗陸上競技大会 (オールスターナイト陸上)",
    date: "2025年8月9日(土)",
    location: "レモンガススタジアム平塚",
    season: "夏",
  },
  {
    id: 7,
    title: "第20回トワイライトゲームス",
    date: "2025年8月20日(水)",
    location: "日産スタジアム",
    season: "夏",
  },
  // 秋冬シーズン (8月～12月)
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
    title: "第37回出雲市全日本大学選抜駅伝競走",
    date: "2025年10月13日(月)",
    location: "出雲市",
    season: "秋",
  },
  {
    id: 11,
    title: "第102回東京箱根間往復大学駅伝競走予選会",
    date: "2025年10月18日(土)",
    location: "陸上自衛隊立川駐屯地～立川市街地～国営昭和記念公園",
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
      />
      <div className="max-w-5xl mx-auto">
        
        {/* 日本体育大学陸上競技会 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            日本体育大学陸上競技会
          </h2>
          <div className="space-y-3">
            {nittaiCompetitions.map((comp, index) => (
              <Card key={index} className="border-l-4 border-blue-500 bg-blue-50/50">
                <CardContent className="py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">{comp.number}</h3>
                      <p className="text-sm text-gray-700">{comp.date}</p>
                      {comp.note && (
                        <p className="text-xs text-orange-600 mt-1">{comp.note}</p>
                      )}
                    </div>
                    {comp.hasInfo && (
                      <Badge variant="outline" className="text-xs">
                        大会要項
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">{comp.number}</Badge>
                          <span className="text-sm font-semibold text-gray-700">{comp.date}</span>
                        </div>
                        <h3 className="text-sm text-gray-800">{comp.title}</h3>
                        {comp.location && (
                          <p className="text-xs text-blue-600 mt-1">会場：{comp.location}</p>
                        )}
                      </div>
                    </div>
                    {comp.note && (
                      <p className="text-xs text-orange-600">{comp.note}</p>
                    )}
                    {comp.locationNote && (
                      <p className="text-xs text-red-600">{comp.locationNote}</p>
                    )}
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
            <TabsList className="grid w-full grid-cols-5 bg-white rounded-xl border">
              <TabsTrigger value="all" className="text-xs md:text-sm">全て</TabsTrigger>
              <TabsTrigger value="spring" className="text-xs md:text-sm">春夏</TabsTrigger>
              <TabsTrigger value="autumn" className="text-xs md:text-sm">秋</TabsTrigger>
              <TabsTrigger value="winter" className="text-xs md:text-sm">冬春</TabsTrigger>
              <TabsTrigger value="ekiden" className="text-xs md:text-sm">駅伝</TabsTrigger>
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
        </section>
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