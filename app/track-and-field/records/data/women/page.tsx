"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface RecordEntry {
  name: string;
  time: string;
  year: string | number | null;
  recordYear: string;
  school: string;
}

interface RecordsData {
  [eventName: string]: RecordEntry[];
}

// 種目名の英語→日本語マッピング
const eventNameMap: { [key: string]: string } = {
  "100m": "100m",
  "200m": "200m",
  "400m": "400m",
  "800m": "800m",
  "1500m": "1500m",
  "5000m": "5000m",
  "10000m": "10000m",
  "100mh": "100mH",
  "400mh": "400mH",
  "3000msc": "3000m障害",
  "10000mwalk": "10000m競歩",
  "halfmarathon": "ハーフマラソン",
  "marathon": "マラソン",
  "high-jump": "走高跳",
  "pole-vault": "棒高跳",
  "long-jump": "走幅跳",
  "triple-jump": "三段跳",
  "shot-put": "砲丸投",
  "discus-throw": "円盤投",
  "hammer-throw": "ハンマー投",
  "javelin-throw": "やり投",
  "heptathlon": "七種競技",
  "pro-100m": "社会人100m"
};

const isNewRecord = (record: RecordEntry) => {
  return record.recordYear?.includes('2025');
};

const RecordsTable = ({ records, eventName }: { records: RecordEntry[]; eventName?: string }) => (
  <>
    <div className="sm:hidden space-y-2">
      {records.map((record, index) => (
        <div
          key={index}
          className={`flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-white/70 ${
            isNewRecord(record) ? 'ring-2 ring-pink-200' : ''
          }`}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {index + 1}. {record.name}
            </p>
            <p className="text-[11px] text-gray-500 truncate">
              {record.school}
              {record.year && ` / ${record.year}`}
              {record.recordYear && ` / ${record.recordYear}`}
            </p>
          </div>
          <p className="ml-2 text-xs font-mono font-semibold whitespace-nowrap">
            {record.time}
          </p>
        </div>
      ))}
    </div>

    <div className="hidden sm:block overflow-x-auto bg-white/60 border border-gray-100/80 rounded-xl">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-pink-100 text-pink-700">
          <tr>
            <th className="px-4 py-2">順位</th>
            <th className="px-4 py-2">氏名</th>
            <th className="px-4 py-2">所属 / 学年</th>
            <th className="px-4 py-2">年</th>
            <th className="px-4 py-2">記録</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record, index) => (
            <tr key={index} className={isNewRecord(record) ? 'bg-pink-50' : ''}>
              <td className="px-4 py-2 font-mono">{index + 1}</td>
              <td className="px-4 py-2">{record.name}</td>
              <td className="px-4 py-2">{record.school}{record.year && ` / ${record.year}`}</td>
              <td className="px-4 py-2">{record.recordYear}</td>
              <td className="px-4 py-2 font-mono font-semibold">{record.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

const GenderRecordsView = ({ recordsData }: { recordsData: RecordsData }) => {
    const eventsOrder = useMemo(() => {
        const eventKeys = Object.keys(recordsData);
        const japaneseNames = eventKeys.map(key => eventNameMap[key] || key);
        return ["全種目", ...japaneseNames];
    }, [recordsData]);
    
    const [selectedEvent, setSelectedEvent] = useState("全種目");
    
    const renderContent = (event: string) => {
        if (event === "全種目") {
            return (
                <div className="space-y-10">
                    {Object.keys(recordsData).map((eventKey) => {
                        const records = recordsData[eventKey] || [];
                        const japaneseName = eventNameMap[eventKey] || eventKey;
                        
                        return (
                            <div key={eventKey} className="space-y-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-3 mb-6">
                                    {japaneseName}
                                </h3>
                                <RecordsTable records={records} eventName={japaneseName} />
                            </div>
                        );
                    })}
                </div>
            );
        }

        // 選択された日本語名から英語キーを逆引き
        const eventKey = Object.keys(eventNameMap).find(key => eventNameMap[key] === event);
        const records = eventKey ? (recordsData[eventKey] || []) : [];
        
        return (
            <div>
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-left sm:text-center border-b-2 border-slate-200 pb-4 mb-6">
                        {event}
                    </h2>
                </div>
                <RecordsTable records={records} eventName={event} />
            </div>
        );
    };

    return (
        <div>
            <div className="mb-12">
                <Tabs value={selectedEvent} onValueChange={setSelectedEvent}>
                    <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent p-2 mb-8 h-auto">
                        {eventsOrder.map((event) => (
                            <TabsTrigger 
                                key={event} 
                                value={event} 
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border-2 transition-all duration-200
                                    border-pink-200 data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:border-pink-500 hover:bg-pink-50 hover:border-pink-300
                                    data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700
                                    shadow-sm hover:shadow-md whitespace-nowrap"
                            >
                                {event}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <div>
                <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0">
                        {renderContent(selectedEvent)}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
          aria-label="ページの上部に戻る"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function WomenRecordsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recordsData, setRecordsData] = useState<RecordsData>({});

    const loadRecordsData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const eventFiles = [
                '100m', '200m', '400m', '800m', '1500m',
                '5000m', '10000m', '100mh', '400mh', '3000msc',
                '10000mwalk', 'halfmarathon', 'marathon',
                'high-jump', 'pole-vault', 'long-jump', 'triple-jump',
                'shot-put', 'discus-throw', 'hammer-throw', 'javelin-throw',
                'heptathlon', 'pro-100m'
            ];

            const results: RecordsData = {};
            
            for (const eventFile of eventFiles) {
                try {
                    const response = await fetch(`/data/track-field-records/women/${eventFile}.json`);
                    if (response.ok) {
                        const data = await response.json();
                        const eventKey = Object.keys(data)[0];
                        if (eventKey && data[eventKey]) {
                            results[eventKey] = data[eventKey];
                        }
                    }
                } catch (err) {
                    console.warn(`Failed to load ${eventFile}:`, err);
                }
            }

            setRecordsData(results);

        } catch (err) {
            console.error('Error loading records data:', err);
            setError('記録データの読み込みに失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRecordsData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
                    <p className="text-gray-600">記録データを読み込み中...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={loadRecordsData}
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                    >
                        再読み込み
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-6">
                <Breadcrumbs items={[
                    { label: 'ホーム', href: '/' },
                    { label: '陸上競技部', href: '/track-and-field' },
                    { label: '歴代記録', href: '/track-and-field/records' },
                    { label: '女子' }
                ]} />
            </div>
            
            <AnimatedPageHeader
                title="女子 歴代記録"
                subtitle="日本体育大学陸上競技部 女子の歴代トップ記録"
            />

            <div className="max-w-6xl mx-auto mt-8">
                <GenderRecordsView recordsData={recordsData} />
            </div>

            <ScrollToTopButton />
        </div>
    );
}
