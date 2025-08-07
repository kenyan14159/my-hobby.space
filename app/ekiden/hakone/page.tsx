"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, Award, Medal, Search, Trophy, X, Star, Scale } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { EkidenNavigation } from "@/components/ui/ekiden-navigation";

// --- 型定義 ---
interface Runner {
    section: number;
    name: string;
    rank: number | string;
    time: string;
    isSectionRecord?: boolean;
}

interface HistoryEntry {
    kai: number;
    year: number;
    rank: number | string;
    totalTime: string;
    isTournamentRecord?: boolean;
    outbound: { rank: number; time: string; };
    inbound: { rank: number; time: string; };
    runners: Runner[];
}

// --- データ読み込み ---
const loadHakoneHistory = async (): Promise<HistoryEntry[]> => {
    try {
        const response = await fetch('/data/ekiden/hakone-history.json');
        const data = await response.json();
        return data['hakone-history'];
    } catch (error) {
        console.error('Failed to load hakone-history data:', error);
        return [];
    }
};

// --- ヘルパー関数 ---
const timeToSeconds = (timeStr: string): number => {
    if (!timeStr || typeof timeStr !== 'string' || timeStr.includes('--')) return Infinity;
    const parts = timeStr.split(':').map(part => parseInt(part, 10));
    return parts.reduce((acc, val) => acc * 60 + val, 0);
};

const secondsToTime = (totalSeconds: number): string => {
    if (!isFinite(totalSeconds)) return "--:--:--";
    const isNegative = totalSeconds < 0;
    totalSeconds = Math.abs(totalSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const sign = isNegative ? "-" : "";

    let timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (hours > 0) {
        timeString = `${String(hours)}:${timeString}`;
    }
    return sign + timeString;
};

// --- コンポーネント ---

const RankIcon = ({ rank }: { rank: number | string }) => {
    const rankNum = typeof rank === 'string' ? parseInt(rank, 10) : rank;
    if (isNaN(rankNum)) return null;
    if (rankNum === 1) return <Trophy className="h-4 w-4 text-amber-400 fill-amber-400 inline-block ml-1" />;
    if (rankNum === 2) return <Medal className="h-4 w-4 text-slate-400 fill-slate-400 inline-block ml-1" />;
    if (rankNum === 3) return <Award className="h-4 w-4 text-orange-600 fill-orange-600 inline-block ml-1" />;
    return null;
};

const HighlightedText = ({ text, highlight }: { text: string, highlight: string }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={i} className="bg-yellow-200 font-bold rounded">{part}</span>
                ) : (
                    part
                )
            )}
        </span>
    );
};

const HistoryCard = ({ entry, searchTerm }: { entry: HistoryEntry, searchTerm: string }) => {
    const getRankBorderClass = (rank: number | string) => {
        const rankNum = typeof rank === 'string' ? parseInt(rank, 10) : rank;
        if (rankNum === 1) return 'border-l-4 border-amber-400';
        if (rankNum === 2) return 'border-l-4 border-slate-400';
        if (rankNum === 3) return 'border-l-4 border-orange-600';
        return 'border-l-4 border-gray-200';
    };

    return (
        <Card className={`overflow-hidden transition-shadow hover:shadow-lg ${getRankBorderClass(entry.rank)}`}>
            <Accordion type="single" collapsible>
                <AccordionItem value={`item-${entry.kai}`} className="border-b-0">
                    <AccordionTrigger className="p-4 hover:bg-gray-50/50">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <span className="text-2xl font-bold text-red-800 w-16 text-center">{entry.rank}位</span>
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        第{entry.kai}回 ({entry.year}年)
                                        {entry.isTournamentRecord && (
                                            <span title="大会記録" className="inline-flex items-center bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full ml-2">
                                                <Star className="h-4 w-4 mr-1" />
                                                大会記録
                                            </span>
                                        )}
                                    </h3>
                                </div>
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-sm text-gray-500">総合タイム</p>
                                <p className="text-xl font-bold font-mono text-red-900">{entry.totalTime}</p>
                                <div className="text-xs text-gray-500 mt-1">
                                    <span>往路: {entry.outbound.rank}位 {entry.outbound.time}</span>
                                    <br />
                                    <span>復路: {entry.inbound.rank}位 {entry.inbound.time}</span>
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-50/70 p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16 text-center">区間</TableHead>
                                    <TableHead>選手名</TableHead>
                                    <TableHead className="text-center">区間順位</TableHead>
                                    <TableHead className="text-right">タイム</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entry.runners.map(runner => (
                                    <TableRow key={runner.section}>
                                        <TableCell className="font-medium text-center">{runner.section}区</TableCell>
                                        <TableCell><HighlightedText text={runner.name} highlight={searchTerm} /></TableCell>
                                        <TableCell className="text-center">{runner.rank}位<RankIcon rank={runner.rank} /></TableCell>
                                        <TableCell className="text-right font-mono">
                                            {runner.time}
                                            {runner.isSectionRecord && <span title="区間記録"><Star className="h-4 w-4 text-red-500 fill-red-500 inline-block ml-1" /></span>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};

export default function HakoneHistoryPage() {
    const [hakoneHistory, setHakoneHistory] = useState<HistoryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [compareA, setCompareA] = useState<string>("");
    const [compareB, setCompareB] = useState<string>("");
    const [comparisonResult, setComparisonResult] = useState<any>(null);
    const [showScroll, setShowScroll] = useState(false);

    // データ読み込み
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await loadHakoneHistory();
            setHakoneHistory(data);
            if (data.length > 0) {
                setCompareA(String(data[0].kai));
                setCompareB(String(data[1]?.kai || data[0].kai));
            }
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);
    
    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 400) {
                setShowScroll(false);
            }
        };
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    const handleCompare = () => {
        const dataA = hakoneHistory.find(entry => entry.kai === parseInt(compareA));
        const dataB = hakoneHistory.find(entry => entry.kai === parseInt(compareB));
        if (dataA && dataB) {
            setComparisonResult({ dataA, dataB });
        }
    };

    const clearComparison = () => {
        setComparisonResult(null);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredHistory = useMemo(() => {
        if (!hakoneHistory || hakoneHistory.length === 0) return [];
        if (!debouncedSearchTerm) return hakoneHistory;
        return hakoneHistory.filter(entry =>
            entry.runners && entry.runners.some(runner =>
                runner.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            )
        );
    }, [debouncedSearchTerm, hakoneHistory]);

    const validEntries = useMemo(() => {
        if (!hakoneHistory || hakoneHistory.length === 0) return [];
        return hakoneHistory.filter(entry => entry && entry.kai);
    }, [hakoneHistory]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">データを読み込み中...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-white to-red-50"
        >
            <div className="container mx-auto px-4 py-8">
                <AnimatedPageHeader
                    title="箱根駅伝"
                    subtitle="男子駅伝ブロック"
                    underlineColor="bg-red-500"
                    largeSubtitle={true}
                />

                <EkidenNavigation />

                {comparisonResult && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-red-800">比較結果</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ComparisonResultView result={comparisonResult} />
                        </CardContent>
                    </Card>
                )}

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-red-800 flex items-center gap-2">
                            <Search className="h-6 w-6" />
                            検索・比較
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="選手名で検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-red-50 rounded-lg">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-red-700">比較対象A</label>
                                <Select value={compareA} onValueChange={setCompareA}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="回を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {validEntries.map(entry => (
                                            <SelectItem key={entry.kai} value={String(entry.kai)}>
                                                第{entry.kai}回 ({entry.year}年) - {entry.rank}位
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-red-700">比較対象B</label>
                                <Select value={compareB} onValueChange={setCompareB}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="回を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {validEntries.map(entry => (
                                            <SelectItem key={entry.kai} value={String(entry.kai)}>
                                                第{entry.kai}回 ({entry.year}年) - {entry.rank}位
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col justify-end space-y-2">
                                <Button onClick={handleCompare} className="bg-red-600 hover:bg-red-700">
                                    <Scale className="h-4 w-4 mr-1" />
                                    比較
                                </Button>
                                {comparisonResult && (
                                    <Button onClick={clearComparison} variant="outline">
                                        <X className="h-4 w-4 mr-1" />
                                        クリア
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredHistory.map((entry) => (
                            <motion.div
                                key={entry.kai}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <HistoryCard entry={entry} searchTerm={debouncedSearchTerm} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* スクロールトップボタン */}
                <AnimatePresence>
                    {showScroll && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            onClick={scrollToTop}
                            className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
                        >
                            <ArrowUp className="h-5 w-5" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function ComparisonResultView({ result }: { result: { dataA: HistoryEntry, dataB: HistoryEntry }}) {
    const { dataA, dataB } = result;
    const timeA = timeToSeconds(dataA.totalTime);
    const timeB = timeToSeconds(dataB.totalTime);
    const diff = timeA - timeB;
    const winner = isFinite(diff) ? (diff <= 0 ? dataA : dataB) : null;

    return (
        <div className="border-t pt-4">
            <p className="text-center font-semibold text-lg mb-2">
                {winner ? `第${winner.kai}回が ${secondsToTime(Math.abs(diff))} 速い` : 'タイム比較結果'}
            </p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>項目</TableHead>
                        <TableHead className="text-right">第{dataA.kai}回</TableHead>
                        <TableHead className="text-right">第{dataB.kai}回</TableHead>
                        <TableHead className="text-right">差</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">総合タイム</TableCell>
                        <TableCell className={`text-right ${isFinite(diff) && diff <= 0 ? 'font-bold text-red-600' : ''}`}>{dataA.totalTime}</TableCell>
                        <TableCell className={`text-right ${isFinite(diff) && diff > 0 ? 'font-bold text-red-600' : ''}`}>{dataB.totalTime}</TableCell>
                        <TableCell className="text-right font-mono">{isFinite(diff) ? `${diff > 0 ? '+' : ''}${secondsToTime(diff)}` : 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">往路</TableCell>
                        <TableCell className="text-right">{dataA.outbound.rank}位 {dataA.outbound.time}</TableCell>
                        <TableCell className="text-right">{dataB.outbound.rank}位 {dataB.outbound.time}</TableCell>
                        <TableCell className="text-right font-mono">
                            {(() => {
                                const outboundA = timeToSeconds(dataA.outbound.time);
                                const outboundB = timeToSeconds(dataB.outbound.time);
                                const outboundDiff = outboundA - outboundB;
                                return isFinite(outboundDiff) ? `${outboundDiff > 0 ? '+' : ''}${secondsToTime(outboundDiff)}` : 'N/A';
                            })()}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">復路</TableCell>
                        <TableCell className="text-right">{dataA.inbound.rank}位 {dataA.inbound.time}</TableCell>
                        <TableCell className="text-right">{dataB.inbound.rank}位 {dataB.inbound.time}</TableCell>
                        <TableCell className="text-right font-mono">
                            {(() => {
                                const inboundA = timeToSeconds(dataA.inbound.time);
                                const inboundB = timeToSeconds(dataB.inbound.time);
                                const inboundDiff = inboundA - inboundB;
                                return isFinite(inboundDiff) ? `${inboundDiff > 0 ? '+' : ''}${secondsToTime(inboundDiff)}` : 'N/A';
                            })()}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
             <Accordion type="single" collapsible className="w-full mt-2" defaultValue="details">
                <AccordionItem value="details">
                    <AccordionTrigger className="text-sm">区間タイム比較</AccordionTrigger>
                    <AccordionContent>
                        <Table>
                           <TableHeader>
                                <TableRow>
                                    <TableHead>区間</TableHead>
                                    <TableHead>第{dataA.kai}回</TableHead>
                                    <TableHead>第{dataB.kai}回</TableHead>
                                    <TableHead className="text-right">差</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataA.runners.map((rA, i) => {
                                    const rB = dataB.runners.find(r => r.section === rA.section);
                                    if (!rB) return null; // 対応する区間がない場合はスキップ

                                    const tA = timeToSeconds(rA.time);
                                    const tB = timeToSeconds(rB.time);
                                    const tDiff = tA - tB;
                                    return (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{rA.section}区</TableCell>
                                            <TableCell className={`${isFinite(tDiff) && tDiff <= 0 ? 'font-bold text-red-600' : ''}`}>{rA.name}<br/><span className="text-xs text-gray-500">{rA.time}</span></TableCell>
                                            <TableCell className={`${isFinite(tDiff) && tDiff > 0 ? 'font-bold text-red-600' : ''}`}>{rB.name}<br/><span className="text-xs text-gray-500">{rB.time}</span></TableCell>
                                            <TableCell className="text-right font-mono">{isFinite(tDiff) ? `${tDiff > 0 ? '+' : ''}${secondsToTime(tDiff)}` : 'N/A'}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}