"use client";

import { useState, useMemo, useEffect } from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, FileX, Loader2, Eye, EyeOff } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import React from "react";

// --- 型定義 ---
interface RawRunner {
    名前: string;
    学年: string;
    タイム: string;
    学校: string;
    大会名: string;
    場所: string;
    期日: string;
}

interface Runner {
    name: string;
    grade: number;
    time: string | null;
    timeInSeconds: number;
    school: string | null;
    event: string | null;
    location: string | null;
    date: string | null;
}

interface EventData {
    id: string;
    name: string;
    fileName: string;
    data: RawRunner[];
    isLoaded: boolean;
    hasError: boolean;
}

// --- 種目設定 ---
const EVENTS: Omit<EventData, 'data' | 'isLoaded' | 'hasError'>[] = [
    { id: '1500m', name: '1500m', fileName: '1500m.json' },
    { id: '3000msc', name: '3000mSC', fileName: '3000msc.json' },
    { id: '5000m', name: '5000m', fileName: '5000m.json' },
    { id: '10000m', name: '10000m', fileName: '10000m.json' },
    { id: 'half-marathon', name: 'ハーフマラソン', fileName: 'half-marathon.json' },
];

// 追加のナビゲーション項目
const ADDITIONAL_NAV_ITEMS = [
    { id: 'limited-content', name: '限定コンテンツ', href: '/limited-content/content?from=limited-content' },
    { id: 'album', name: 'アルバム', href: '/limited-content/album' },
    { id: 'hakone-analysis', name: '箱根駅伝区間分析', href: '/limited-content/analysis' },
];

// --- ヘルパー関数 ---
const timeToSeconds = (timeStr: string | null): number => {
    if (!timeStr) return Infinity;
    
    // ハーフマラソンの時間形式 (H:MM'SS) に対応
    if (timeStr.includes("'") && timeStr.includes(":")) {
        const timeAndMinutes = timeStr.split("'")[0]; // "1:08"
        const seconds = parseFloat(timeStr.split("'")[1]); // "13"
        
        const timeParts = timeAndMinutes.split(":");
        if (timeParts.length === 2) {
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            
            if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return Infinity;
            return hours * 3600 + minutes * 60 + seconds;
        }
    }
    
    // 10000mの時間形式 (M'SS.ss) に対応
    if (timeStr.includes("'") && !timeStr.includes(":")) {
        const parts = timeStr.split("'");
        const minutes = parseInt(parts[0], 10);
        const seconds = parseFloat(parts[1]);
        
        if (isNaN(minutes) || isNaN(seconds)) return Infinity;
        return minutes * 60 + seconds;
    }
    
    // 通常の時間形式 (H:MM:SS または M:SS.ss) に対応
    const parts = timeStr.split(':');
    
    if (parts.length === 3) {
        // H:MM:SS 形式
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseFloat(parts[2]);
        
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return Infinity;
        return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
        // M:SS.ss または MM:SS.ss 形式
        const minutes = parseInt(parts[0], 10);
        const seconds = parseFloat(parts[1]);
        
        if (isNaN(minutes) || isNaN(seconds)) return Infinity;
        return minutes * 60 + seconds;
    }
    
    return Infinity;
};

const formatTime = (seconds: number, isLongDistance: boolean = false, eventId?: string): string => {
    if (!isFinite(seconds)) return "記録なし";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0 || isLongDistance) {
        // 1時間以上または長距離種目の場合
        if (isLongDistance && eventId === 'half-marathon') {
            // ハーフマラソンの場合: H:MM:SS（0を削除）
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(Math.floor(remainingSeconds)).padStart(2, '0')}`;
        } else if (eventId === '10000m') {
            // 10000mの場合: MM:SS.ss（最初の00:を削除）
            return `${minutes}:${remainingSeconds.toFixed(2).padStart(5, '0')}`;
        } else {
            // その他の長距離種目の場合: H:MM:SS.ss
            return `${hours}:${String(minutes).padStart(2, '0')}:${remainingSeconds.toFixed(2).padStart(5, '0')}`;
        }
    } else {
        // 1時間未満の短距離種目の場合: MM:SS.ss（0を削除）
        return `${minutes}:${remainingSeconds.toFixed(2).padStart(5, '0')}`;
    }
};

const isNewRecord = (dateStr: string | null): boolean => {
    return !!dateStr && dateStr.startsWith("2025");
};

const isLongDistanceEvent = (eventId: string): boolean => {
    return ['10000m', 'half-marathon', 'marathon'].includes(eventId);
};

// --- メインコンポーネント ---
export default function RecordsPage() {
    const [activeEvent, setActiveEvent] = useState('1500m');
    const [sortBy, setSortBy] = useState<'time' | 'grade'>('time');
    const [eventsData, setEventsData] = useState<Record<string, EventData>>({});
    const [showMobileDetails, setShowMobileDetails] = useState(false);

    // データ読み込み関数
    const loadEventData = async (eventId: string, fileName: string) => {
        try {
            setEventsData(prev => ({
                ...prev,
                [eventId]: {
                    ...prev[eventId],
                    isLoaded: false,
                    hasError: false
                }
            }));

            const response = await fetch(`/data/limited-content/${fileName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${fileName}`);
            }
            
            const data = await response.json();
            const runners = Array.isArray(data) ? data : [];
            
            setEventsData(prev => ({
                ...prev,
                [eventId]: {
                    id: eventId,
                    name: EVENTS.find(e => e.id === eventId)?.name || eventId,
                    fileName,
                    data: runners,
                    isLoaded: true,
                    hasError: false
                }
            }));
        } catch (error) {
            console.error(`Error loading ${fileName}:`, error);
            setEventsData(prev => ({
                ...prev,
                [eventId]: {
                    id: eventId,
                    name: EVENTS.find(e => e.id === eventId)?.name || eventId,
                    fileName,
                    data: [],
                    isLoaded: true,
                    hasError: true
                }
            }));
        }
    };

    // 初期データ読み込み
    useEffect(() => {
        EVENTS.forEach(event => {
            loadEventData(event.id, event.fileName);
        });
    }, []);

    // データ処理
    const processedRunners = useMemo((): Runner[] => {
        const currentEventData = eventsData[activeEvent];
        if (!currentEventData?.data) return [];

        return currentEventData.data.map(r => ({
            name: r.名前,
            grade: parseInt(r.学年, 10),
            time: r.タイム,
            timeInSeconds: timeToSeconds(r.タイム),
            school: r.学校,
            event: r.大会名,
            location: r.場所,
            date: r.期日,
        }));
    }, [eventsData, activeEvent]);

    const sortedRunners = useMemo(() => {
        const data = [...processedRunners];
        if (sortBy === 'grade') {
            return data.sort((a, b) => {
                if (a.grade !== b.grade) return a.grade - b.grade;
                return a.timeInSeconds - b.timeInSeconds;
            });
        }
        return data.sort((a, b) => a.timeInSeconds - b.timeInSeconds);
    }, [processedRunners, sortBy]);

    const averageTimes = useMemo(() => {
        const byGrade: Record<number, number[]> = { 1: [], 2: [], 3: [], 4: [] };
        processedRunners.forEach(runner => {
            if (isFinite(runner.timeInSeconds)) {
                if (byGrade[runner.grade]) {
                    byGrade[runner.grade].push(runner.timeInSeconds);
                }
            }
        });

        const calcAvg = (times: number[]) => times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
        const validTimes = processedRunners.map(r => r.timeInSeconds).filter(isFinite);

        return {
            overall: calcAvg(validTimes),
            grade1: calcAvg(byGrade[1]),
            grade2: calcAvg(byGrade[2]),
            grade3: calcAvg(byGrade[3]),
            grade4: calcAvg(byGrade[4]),
        };
    }, [processedRunners]);

    const renderGradeHeader = (grade: number, eventId: string) => {
        const avgTime = averageTimes[`grade${grade}` as keyof typeof averageTimes];
        const isLongDistance = isLongDistanceEvent(eventId);
        return (
            <TableRow key={`header-${grade}`} className="bg-gray-100 hover:bg-gray-100">
                <TableCell colSpan={8} className="text-center text-gray-700">
                    {grade}年生 (平均: {avgTime > 0 ? formatTime(avgTime, isLongDistance, eventId) : 'N/A'})
                </TableCell>
            </TableRow>
        );
    };

    const renderEventContent = (eventId: string) => {
        const eventData = eventsData[eventId];
        const isLongDistance = isLongDistanceEvent(eventId);

        if (!eventData?.isLoaded) {
            return (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-600">データを読み込み中...</span>
                </div>
            );
        }

        if (eventData.hasError || !eventData.data || eventData.data.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <FileX className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">データがありません</h3>
                    <p className="text-sm">
                        {eventData.hasError ? "データの読み込みに失敗しました" : "まだデータが登録されていません"}
                    </p>
                </div>
            );
        }

        return (
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle className="flex items-center text-2xl">
                            <Trophy className="mr-3 text-amber-500" />
                            {eventData.name} ランキング
                            <Badge variant="secondary" className="ml-2">
                                {eventData.data.length}名
                            </Badge>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant={sortBy === 'time' ? 'default' : 'outline'} 
                                onClick={() => setSortBy('time')}
                                size="sm"
                            >
                                タイム順
                            </Button>
                            <Button 
                                variant={sortBy === 'grade' ? 'default' : 'outline'} 
                                onClick={() => setSortBy('grade')}
                                size="sm"
                            >
                                学年順
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">全体平均</p>
                            <p className="text-lg font-mono text-blue-900">
                                {averageTimes.overall > 0 ? formatTime(averageTimes.overall, isLongDistance, eventId) : 'N/A'}
                            </p>
                        </div>
                        {[1, 2, 3, 4].map(grade => {
                            const avgTime = averageTimes[`grade${grade}` as keyof typeof averageTimes];
                            return (
                                <div key={grade} className="p-3 bg-gray-100 rounded-lg">
                                    <p className="text-sm text-gray-700">{grade}年平均</p>
                                    <p className="text-lg font-mono text-gray-800">
                                        {avgTime > 0 ? formatTime(avgTime, isLongDistance, eventId) : 'N/A'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12 sm:w-20 text-center">順位</TableHead>
                                    <TableHead className="min-w-[6rem] sm:min-w-[8rem]">名前</TableHead>
                                    <TableHead className="w-12 sm:w-20 text-center">学年</TableHead>
                                    <TableHead className="w-24 sm:w-48">出身校</TableHead>
                                    <TableHead className="w-16 sm:w-24 text-center">タイム</TableHead>
                                    <TableHead className="min-w-[10rem] hidden md:table-cell">大会名</TableHead>
                                    <TableHead className="w-24 hidden md:table-cell">場所</TableHead>
                                    <TableHead className="w-28 hidden md:table-cell">期日</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedRunners.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                            データがありません
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sortedRunners.map((runner, index, array) => {
                                        const rank = sortBy === 'grade' 
                                            ? array.slice(0, index).filter(r => r.grade === runner.grade).length + 1
                                            : index + 1;
                                        
                                        const showHeader = sortBy === 'grade' && (index === 0 || runner.grade !== array[index - 1].grade);
                                        
                                        return (
                                            <React.Fragment key={`${runner.name}-${runner.time}-${index}`}>
                                                {showHeader && renderGradeHeader(runner.grade, eventId)}
                                                <TableRow className={isNewRecord(runner.date) ? "bg-sky-50" : ""}>
                                                    <TableCell className="text-center">{rank}</TableCell>
                                                    <TableCell>{runner.name}</TableCell>
                                                    <TableCell className="text-center">{runner.grade}</TableCell>
                                                    <TableCell>
                                                        <div className="whitespace-normal sm:whitespace-nowrap overflow-hidden text-ellipsis max-w-[8rem] sm:max-w-[12rem]">
                                                            {runner.school || 'N/A'}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-center">
                                                        {formatTime(runner.timeInSeconds, isLongDistance, eventId)}
                                                    </TableCell>
                                                    <TableCell className="text-xs hidden md:table-cell">{runner.event || 'N/A'}</TableCell>
                                                    <TableCell className="text-xs hidden md:table-cell">{runner.location || 'N/A'}</TableCell>
                                                    <TableCell className="text-xs hidden md:table-cell">{runner.date || 'N/A'}</TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                        
                        {/* モバイル用詳細表示ボタン */}
                        <div className="md:hidden mt-4 text-center">
                            <Button
                                variant="outline"
                                onClick={() => setShowMobileDetails(!showMobileDetails)}
                                className="w-full"
                            >
                                {showMobileDetails ? (
                                    <>
                                        <EyeOff className="h-4 w-4 mr-2" />
                                        詳細を隠す
                                    </>
                                ) : (
                                    <>
                                        <Eye className="h-4 w-4 mr-2" />
                                        詳細を表示
                                    </>
                                )}
                            </Button>
                        </div>
                        
                        {/* モバイル用詳細表示 */}
                        {showMobileDetails && (
                            <div className="md:hidden mt-4">
                                <div className="space-y-4">
                                    {sortedRunners.map((runner, index, array) => {
                                        const rank = sortBy === 'grade' 
                                            ? array.slice(0, index).filter(r => r.grade === runner.grade).length + 1
                                            : index + 1;
                                        
                                        return (
                                            <div key={`mobile-${runner.name}-${runner.time}-${index}`} 
                                                 className={`p-4 rounded-lg border ${isNewRecord(runner.date) ? "bg-sky-50" : "bg-white"}`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold">{rank}位</span>
                                                    <span className="text-sm text-gray-600">{runner.grade}年</span>
                                                </div>
                                                <div className="font-semibold text-lg mb-2">{runner.name}</div>
                                                <div className="text-sm text-gray-600 mb-2">
                                                    出身校: {runner.school || 'N/A'}
                                                </div>
                                                <div className="font-mono text-lg mb-2">
                                                    {formatTime(runner.timeInSeconds, isLongDistance, eventId)}
                                                </div>
                                                <div className="text-xs text-gray-500 space-y-1">
                                                    <div>大会名: {runner.event || 'N/A'}</div>
                                                    <div>場所: {runner.location || 'N/A'}</div>
                                                    <div>期日: {runner.date || 'N/A'}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-6">
                    <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '限定コンテンツ', href: '/limited-content' }, { label: '学内PBランキング' }]} />
                </div>
                <AnimatedPageHeader 
                    title="学内PBランキング"
                    subtitle="各種目の学内PBランキングを確認できます"
                />

                <Tabs value={activeEvent} onValueChange={setActiveEvent} className="w-full">
                    {/* 種目選択ボタン */}
                    <div className="mb-6 md:mb-8">
                        <TabsList className="flex flex-wrap gap-2 sm:gap-3 bg-transparent p-0 justify-center">
                            {EVENTS.map((event) => (
                                <TabsTrigger 
                                    key={event.id} 
                                    value={event.id}
                                    className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-full border-2 transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 data-[state=inactive]:border-gray-200 hover:data-[state=inactive]:bg-gray-50 hover:data-[state=inactive]:border-gray-300 whitespace-nowrap flex-shrink-0"
                                >
                                    {event.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* 追加ナビゲーション項目 */}
                    <div className="flex flex-wrap gap-3 mb-6 md:mb-8 justify-center">
                        {ADDITIONAL_NAV_ITEMS.map((item) => (
                            <Link key={item.id} href={item.href}>
                                <div className="px-3 py-2 text-xs sm:text-sm font-medium rounded-full border-2 transition-all duration-200 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer">
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {EVENTS.map((event) => (
                        <TabsContent key={event.id} value={event.id}>
                            {renderEventContent(event.id)}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}