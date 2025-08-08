"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lock, Key, Trophy, Star, Target, Rocket, Calendar, Users, Flag, Route, Clock, ChevronRight, ArrowRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import LetterGlitch from "./LetterGlitch";

// --- パスワードフォームコンポーネント ---
const PasswordForm = ({ onAuthenticate }: { onAuthenticate: (isCorrect: boolean) => void }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const CORRECT_PASSWORD = "1010";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setError("");
            onAuthenticate(true);
        } else {
            setError("パスワードが間違っています");
            onAuthenticate(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            {/* 背景アニメーション */}
            <div className="absolute inset-0 -z-10">
                <LetterGlitch glitchSpeed={50} centerVignette outerVignette={false} smooth />
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4">
                            <Lock className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">限定コンテンツ</h1>
                        <p className="text-slate-300 text-sm">関係者のみ閲覧可能です</p>
                </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                                placeholder="パスワードを入力"
                                className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                        />
                    </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}
                        <Button 
                            type="submit" 
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200"
                        >
                            認証
                        </Button>
                </form>
                </div>
            </motion.div>
        </div>
    );
};

// --- リーダーカードコンポーネント ---
const LeaderCard = ({ role, name, school, imgSrc }: { role: string; name: string; school: string; imgSrc: string; }) => (
    <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group"
    >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="relative w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden cursor-pointer ring-2 ring-slate-100 group-hover:ring-blue-200 transition-all duration-300">
                        <Image src={imgSrc} alt={name} fill className="object-cover" sizes="64px" />
                    </div>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 max-w-lg">
                    <DialogTitle className="sr-only">{name}</DialogTitle>
                    <Image src={imgSrc} alt={name} width={600} height={800} className="rounded-xl" sizes="(max-width: 768px) 90vw, 600px" />
                </DialogContent>
            </Dialog>
            <div className="text-center space-y-1">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">{role}</p>
                <p className="text-lg font-semibold text-slate-900">{name}</p>
                <p className="text-sm text-slate-500">{school}</p>
            </div>
        </div>
    </motion.div>
);

// --- 限定コンテンツ本体 ---
const LimitedContent = () => {
    const linkItems = [
        { href: "/limited-content/records/", label: "PBランキング", icon: Trophy },
        { href: "/limited-content/album", label: "アルバム", icon: ImageIcon },
        { href: "/limited-content/analysis/", label: "箱根駅伝区間分析", icon: Route },
    ];

    interface CampItem {
        date: string;
        event: string;
        sub?: string[];
    }

    const campSchedule: Record<string, CampItem[]> = {
        "2025年7月": [
            { date: "7月11日(土)～16日(月)", event: "富士見合宿（選抜）" },
            { date: "7月25日(金)～8月2日(土)", event: "富士見合宿（選抜）" },
            { date: "7月25日(金)", event: "授業終了" },
        ],
        "2025年8月": [
            { date: "8月2日(土)～13日(水)", event: "信濃町黒姫合宿", sub: ["選抜A: 藤屋", "選抜B: 杉久保ハウス", "総合: 若月"] },
            { date: "8月13日(水)～18日(月)", event: "帰省" },
            { date: "8月13日(水)～19日(火)", event: "伊那合宿（希望者）" },
            { date: "8月19日(火)～31日(日)", event: "横浜総合合宿" },
            { date: "8月19日(火)～31日(日)", event: "菅平合宿（選抜）" },
            { date: "8月31日(日)～9月7日(日)", event: "富士見全体合宿" },
        ],
        "2025年9月": [
            { date: "9月7日(日)～18日(木)", event: "横浜総合合宿" },
            { date: "9月7日(月)～18日(木)", event: "菅平選抜合宿" },
            { date: "9月18日(木)～22日(月)", event: "富士見選抜合宿" },
            { date: "9月19日(金)", event: "授業開始" },
        ],
        "2025年12月": [
            { date: "12月5日(金)～8日(月)", event: "富津箱根合宿" },
            { date: "12月21日(日)～24日(水)", event: "箱根富津合宿" },
            { date: "12月24日(水)～1月1日(木)", event: "箱根体制" },
        ],
        "2026年1月": [ { date: "1月4日(日)～8日(木)", event: "帰省" } ],
        "2026年2月": [
            { date: "2月20日(金)～26日(木)", event: "神戸全体合宿" },
            { date: "2月26日(木)～3月5日(木)", event: "宮崎合宿" },
        ],
        "2026年3月": [ { date: "3月24日(火)～27日(金)", event: "新入生富津合宿" } ],
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
            <div className="container mx-auto px-6 pt-16">
                <div className="mb-6">
                    <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '限定コンテンツ', href: '/limited-content' }, { label: 'NSSU 男子駅伝ブロック' }]} />
                </div>
                <AnimatedPageHeader
                    title="NSSU 男子駅伝ブロック"
                    subtitle="Team Goals & Schedule 2025"
                    underlineColor="bg-blue-500"
                    largeSubtitle={true}
                    titleClassName="text-5xl md:text-7xl font-black text-slate-900 mb-3 tracking-tight"
                />
            </div>

            {/* コンテンツリンク */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="container mx-auto px-6 pt-8 max-w-7xl"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {linkItems.map(({ href, label, icon: Icon }) => (
                        <a
                            key={href}
                            href={href}
                            className="flex items-center gap-3 px-5 py-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                        >
                            <Icon className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
                        </a>
                    ))}
                </div>
            </motion.div>

            <div className="container mx-auto px-6 py-16 max-w-7xl">
                <div className="space-y-8">

                    {/* 幹部紹介（リンク下に移動） */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                            <div className="flex items-center mb-6">
                                <Users className="w-6 h-6 mr-3 text-slate-700" />
                                <h2 className="text-2xl font-bold text-slate-900">2025年度 幹部紹介</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <LeaderCard role="主将" name="浦上 和樹" school="(九州学院)" imgSrc="https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers54.jpeg" />
                                <LeaderCard role="主務" name="黒葛原 佑真" school="(清風高校)" imgSrc="https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers7.jpeg" />
                                <LeaderCard role="副主将" name="犬童 慧真" school="(熊本工業)" imgSrc="https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers2.jpeg" />
                            </div>
                        </div>
                    </motion.div>

                    {/* メインコンテンツ */}
                    <div className="space-y-8">
                         {/* 目標セクション */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-slate-700 p-8 text-white">
                                    <div className="flex items-center mb-4">
                                        <Rocket className="w-8 h-8 mr-3 text-amber-500" />
                                        <h2 className="text-3xl font-bold">チーム目標 2025</h2>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                                        <div className="flex items-center mb-2 opacity-90">
                                            <Trophy className="h-5 w-5 text-amber-300 mr-2" />
                                            <h3 className="text-lg font-medium">最大目標</h3>
                                        </div>
                                        <p className="text-2xl font-bold">第102回箱根駅伝 総合10位以内 シード権獲得</p>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">「體進〜継承を力に、越境を恐れず〜」</h3>
                                        <p className="opacity-90">心身ともに成長し、伝統を活かしながら新たな可能性に挑戦する</p>
                                    </div>
                                </div>
                                
                                <div className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-slate-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-lg mb-4 flex items-center text-slate-900">
                                                <Target className="h-5 w-5 mr-2 text-blue-600" /> 前期目標
                                            </h4>
                                            <div className="space-y-2 text-slate-700">
                                                <p><span className="font-medium">関東インカレ:</span> 7点獲得</p>
                                                <p><span className="font-medium">全日本大学駅伝予選会:</span> 7位以内で突破</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-lg mb-4 flex items-center text-slate-900">
                                                <Target className="h-5 w-5 mr-2 text-blue-600" /> 後期目標
                                            </h4>
                                            <div className="space-y-2 text-slate-700">
                                                <p><span className="font-medium">箱根駅伝予選会:</span> 10位以内で突破</p>
                                                <p><span className="font-medium">全日本大学駅伝:</span> 8位以内でシード権獲得</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                                            <h3 className="font-medium text-blue-700 mb-1">PB更新目標</h3>
                                            <p className="text-2xl font-bold text-blue-900">115回 更新</p>
                                        </div>
                                        <div className="text-center p-4 bg-slate-50 rounded-xl">
                                            <h3 className="font-medium text-slate-700 mb-1">現在の総PB</h3>
                                            <p className="text-2xl font-bold text-slate-900">??回</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* 箱根駅伝目標タイム */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                                <div className="flex items-center mb-6">
                                    <Clock className="w-8 h-8 mr-3 text-slate-700" />
                                    <h2 className="text-3xl font-bold text-slate-900">箱根駅伝 目標タイム</h2>
                                </div>
                                
                                <div className="text-center mb-8">
                                    <div className="inline-block w-full max-w-sm bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-2xl p-6">
                                        <h3 className="text-lg font-medium mb-2 opacity-90">総合目標</h3>
                                        <p className="text-4xl font-black font-mono">10:53:59</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 rounded-2xl p-6">
                                        <h4 className="font-bold text-xl mb-4 flex items-center text-slate-900">
                                            <Route className="mr-2 h-6 w-6"/>
                                            往路
                                            <span className="font-mono ml-auto text-2xl">5:25:19</span>
                                        </h4>
                                        <div className="space-y-2 font-mono text-slate-700">
                                            <div className="flex justify-between py-1">
                                                <span>1区</span><span className="font-semibold">1:02:00</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>2区</span><span className="font-semibold">1:07:14</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>3区</span><span className="font-semibold">1:02:55</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>4区</span><span className="font-semibold">1:02:10</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>5区</span><span className="font-semibold">1:11:00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6">
                                        <h4 className="font-bold text-xl mb-4 flex items-center text-slate-900">
                                            <Flag className="mr-2 h-6 w-6"/>
                                            復路
                                            <span className="font-mono ml-auto text-2xl">5:28:40</span>
                                        </h4>
                                        <div className="space-y-2 font-mono text-slate-700">
                                            <div className="flex justify-between py-1">
                                                <span>6区</span><span className="font-semibold">0:58:50</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>7区</span><span className="font-semibold">1:03:15</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>8区</span><span className="font-semibold">1:06:00</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>9区</span><span className="font-semibold">1:10:20</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>10区</span><span className="font-semibold">1:10:15</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 合宿予定 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                                <div className="flex items-center mb-6">
                                    <Calendar className="w-8 h-8 mr-3 text-slate-700" />
                                    <h2 className="text-3xl font-bold text-slate-900">合宿予定</h2>
                                </div>
                                <Accordion type="single" collapsible className="space-y-4">
                                    {Object.entries(campSchedule).map(([month, items], index) => (
                                        <AccordionItem key={month} value={`item-${index + 1}`} className="border border-slate-100 rounded-2xl overflow-hidden">
                                            <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:bg-slate-50 transition-colors">
                                                {month}
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-4">
                                                <div className="space-y-4">
                                                    {items.map((item, itemIndex) => (
                                                        <div key={`${item.event}-${itemIndex}`} className="bg-slate-50 rounded-xl p-4">
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                                <span className="font-medium text-slate-600 text-sm min-w-fit">{item.date}</span>
                                                                <span className="font-semibold text-slate-900">{item.event}</span>
                                                            </div>
                                                            {item.sub && (
                                                                <div className="mt-2 pl-4 space-y-1">
                                                                    {item.sub.map((s, subIndex) => (
                                                                        <div key={`${s}-${subIndex}`} className="text-sm text-slate-600">• {s}</div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ページ全体コンポーネント ---
export default function LimitedContentPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // URLパラメータをチェックして、/limited-content/内からのアクセスの場合は認証をスキップ
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fromLimitedContent = urlParams.get('from') === 'limited-content';
        if (fromLimitedContent) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div>
            {!isAuthenticated && <PasswordForm onAuthenticate={setIsAuthenticated} />}
            <AnimatePresence>
                {isAuthenticated && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <LimitedContent />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}