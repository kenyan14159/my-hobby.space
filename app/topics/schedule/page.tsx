"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock, Info, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TopicsQuickAccess } from "@/components/topics-quick-access";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// イベントの型定義
interface Event {
  date: string;
  title: string;
  location: string;
  important?: boolean;
}

// 全てのスケジュールデータ
const allEvents: Event[] = [
  {
    date: "2025.07.12",
    title: "ホクレンディスタンスチャレンジ千歳大会",
    location: "千歳市青葉陸上競技場"
  },
  {
    date: "2025.07.12-13",
    title: "第109回日本陸上競技選手権大会・混成競技 第41回U20日本陸上競技選手権大会・混成競技",
    location: "岐阜・岐阜メモリアルセンター長良川競技場",
    important: true
  },
  {
    date: "2025.07.16",
    title: "ホクレンディスタンスチャレンジ北見大会",
    location: "北見市東陵公園陸上競技場"
  },
  {
    date: "2025.07.19",
    title: "ホクレンディスタンスチャレンジ網走大会",
    location: "網走市営陸上競技場"
  },
  {
    date: "2025.07.20",
    title: "関東学生網走夏季記録挑戦競技会",
    location: "網走市営陸上競技場",
    important: true
  },
  {
    date: "2025.09.28",
    title: "第240回東海大学長距離競技会",
    location: "東海大学湘南校舎陸上競技場",
  },
  {
    date: "2025.10.04-05",
    title: "第323回日本体育大学長距離競技会・第17回NCG",
    location: "慶應義塾大学日吉キャンパス"
  },
  {
    date: "2025.10.18",
    title: "第102回東京箱根間往復大学駅伝競走予選会",
    location: "陸上自衛隊立川駐屯地～立川市街地～国営昭和記念公園",
    important: true
  },
  {
    date: "2025.10.26",
    title: "第241回東海大学長距離競技会 ",
    location: "東海大学湘南校舎陸上競技場",
  },
  {
    date: "2025.11.02",
    title: "第57回全日本大学駅伝対校選手権大会",
    location: "愛知・三重",
    important: true
  },
  {
    date: "2025.11.09",
    title: "第20回世田谷246ハーフマラソン",
    location: "駒沢オリンピック公園陸上競技場"
  },
  {
    date: "2025.11.15-16",
    title: "第324回日本体育大学長距離競技会・第18回NCG",
    location: "健志台キャンパス陸上競技場"
  },
  {
    date: "2025.11.16",
    title: "第38回2025上尾シティハーフマラソン",
    location: "公道（川越上尾線）スタート・フィニッシュの上尾市内折り返しコース",
  },
  {
    date: "2025.11.22",
    title: "第242回東海大学長距離競技会",
    location: "東海大学湘南校舎陸上競技場",
  },
  {
    date: "2025.11.29-30",
    title: "第325回日本体育大学長距離競技会・第19回NCG",
    location: "健志台キャンパス陸上競技場"
  },
  {
    date: "2025.12.07",
    title: "第243回東海大学長距離競技会",
    location: "東海大学湘南校舎陸上競技場",
  },
  {
    date: "2025.12.20",
    title: "第26回日本体育大学女子長距離競技会",
    location: "健志台キャンパス陸上競技場"
  },
  {
    date: "2025.12.31",
    title: "第244回東海大学長距離競技会",
    location: "東海大学湘南校舎陸上競技場"
  },
  {
    date: "2026.01.02-03",
    title: "第102回東京箱根間往復大学駅伝競走",
    location: "大手町読売新聞社前～箱根町芦ノ湖駐車場入口",
    important: true
  },
  {
    date: "2026.01.18",
    title: "天皇盃 第31回全国都道府県対抗男子駅伝競走大会",
    location: "広島",
    important: true
  },
  {
    date: "2026.01.25",
    title: "2026大阪ハーフマラソン",
    location: "大阪"
  },
  {
    date: "2026.02.01",
    title: "第78回香川丸亀国際ハーフマラソン",
    location: "香川",
    important: true
  },
  {
    date: "2026.02.??",
    title: "第76回大澤駅伝競走大会",
    location: "栃木県"
  },
  {
    date: "2026.02.15",
    title: "第6回全国大学対校男女混合駅伝競走大会",
    location: "ヤンマースタジアム長居"
  },
  {
    date: "2026.03.08",
    title: "立川シティハーフマラソン2026",
    location: "陸上自衛隊立川駐屯地、国営昭和記念公園及びその周辺道路"
  }
];

// シーズン区分ごとの月範囲
const seasons = [
  { name: "春季", months: [3, 4, 5], color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { name: "夏季", months: [6, 7, 8], color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "秋季", months: [9, 10, 11], color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "冬季", months: [12, 1, 2], color: "bg-sky-50 text-sky-700 border-sky-200" }
];

// 日付からシーズンを判定する関数
function getSeasonByDate(dateString: string): string {
  // ??.??の場合は未定とする
  if (dateString.includes("??")) return "未定";
  
  // 日付文字列から月を抽出
  const month = parseInt(dateString.split('.')[1]);
  
  // 対応するシーズンを返す
  const season = seasons.find(s => s.months.includes(month));
  return season ? season.name : "未定";
}

// シーズンの色を取得する関数
function getSeasonColor(seasonName: string): string {
  const season = seasons.find(s => s.name === seasonName);
  return season ? season.color : "bg-gray-100 text-gray-700 border-gray-200";
}

// 日付の表示形式を整える関数
function formatDate(dateString: string): string {
  return dateString.replace("??", "--");
}

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3
    }
  }
};

export default function Schedule() {
  const [filter, setFilter] = useState<string>("全て");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);
  const [activeYear, setActiveYear] = useState<string>("2025");
  
  // フィルターとアクティブ年に基づいてイベントをフィルタリング
  useEffect(() => {
    let events = [...allEvents];
    
    // 年でフィルター
    if (activeYear !== "全て") {
      events = events.filter(event => event.date.startsWith(activeYear));
    }
    
    // シーズンでフィルター
    if (filter !== "全て") {
      events = events.filter(event => getSeasonByDate(event.date) === filter);
    }
    
    // 日付でソート
    events.sort((a, b) => {
      // ??を含む場合は後ろに
      if (a.date.includes("??") && !b.date.includes("??")) return 1;
      if (!a.date.includes("??") && b.date.includes("??")) return -1;
      return a.date.localeCompare(b.date);
    });
    
    setFilteredEvents(events);
  }, [filter, activeYear]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <AnimatedPageHeader 
          title="スケジュール"
          subtitle="男子駅伝部の今後のスケジュールです"
        />
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'トピックス', href: '/topics' }, { label: 'スケジュール' }]} />
        </div>

        {/* クイックアクセスボタン */}
        <TopicsQuickAccess />

        {/* フィルターコントロール */}
        <div className="mb-8 space-y-4">
          {/* 年選択 */}
          <div className="flex justify-center">
            <div className="border border-sky-100 rounded-lg overflow-hidden shadow-sm flex">
              <button 
                onClick={() => setActiveYear("2025")}
                className={`px-4 py-2 text-sm font-medium ${activeYear === "2025" ? "bg-sky-600 text-white" : "bg-white text-sky-600 hover:bg-sky-50"}`}
              >
                2025年
              </button>
              <button 
                onClick={() => setActiveYear("2026")}
                className={`px-4 py-2 text-sm font-medium ${activeYear === "2026" ? "bg-sky-600 text-white" : "bg-white text-sky-600 hover:bg-sky-50"}`}
              >
                2026年
              </button>
            </div>
          </div>
          
          {/* シーズン選択 - モバイルでは1列、デスクトップでは横並び */}
          <div className="grid grid-cols-1 sm:flex sm:flex-row sm:flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setFilter("全て")}
              className={`px-4 py-2 text-sm font-medium rounded-full border ${filter === "全て" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-sky-600 border-sky-100 hover:bg-sky-50"}`}
            >
              全て
            </button>
            {seasons.map(season => (
              <button 
                key={season.name}
                onClick={() => setFilter(season.name)}
                className={`px-4 py-2 text-sm font-medium rounded-full border ${filter === season.name ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-sky-100 hover:bg-sky-50"}`}
              >
                {season.name}
              </button>
            ))}
          </div>
        </div>

        {/* スケジュール一覧 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-5"
        >
          {filteredEvents.map((event, index) => {
            const seasonName = getSeasonByDate(event.date);
            const seasonColor = getSeasonColor(seasonName);
            
            return (
              <motion.div
                key={`${event.title}-${index}`}
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="overflow-hidden border border-sky-100 hover:border-sky-200 shadow-sm bg-white">
                  <div className="flex flex-col md:flex-row">
                    {/* 日付部分 */}
                    <div className="w-full md:w-48 lg:w-56 shrink-0 bg-sky-50 p-5 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-sky-100">
                      <Badge className={`mb-2 ${seasonColor}`}>
                        {seasonName}
                      </Badge>
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-sky-900">{formatDate(event.date)}</h3>
                      </div>
                    </div>
                    
                    {/* イベント詳細 */}
                    <div className="flex-grow p-5">
                      <CardHeader className="p-0 pb-2">
                        <CardTitle className="text-xl text-sky-900 line-clamp-2">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-2">
                        <div className="flex items-start mt-2">
                          <MapPin className="h-4 w-4 text-sky-600 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-700">{event.location}</p>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* 結果が0件の場合 */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">該当するスケジュールがありません</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}