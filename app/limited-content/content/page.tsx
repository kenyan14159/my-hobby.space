"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lock, Key, Trophy, Target, Calendar, Users, Flag, Route, Clock, CheckCircle2, XCircle, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
// シンプル化のため背景アニメーションは廃止

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md"
            >
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-3">
                            <Lock className="w-7 h-7 text-blue-600" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 mb-1">限定コンテンツ</h1>
                        <p className="text-gray-500 text-sm">関係者のみ閲覧可能です</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="パスワードを入力"
                                className="pl-10 h-11"
                            />
                        </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}
                        <Button type="submit" className="w-full h-11">
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
    <div className="text-center">
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full overflow-hidden cursor-pointer ring-2 ring-slate-200 hover:ring-slate-400 transition-all">
                    <Image src={imgSrc} alt={name} fill className="object-cover" sizes="80px" />
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 border-0 max-w-lg">
                <DialogTitle className="sr-only">{name}</DialogTitle>
                <Image src={imgSrc} alt={name} width={600} height={800} className="rounded-xl" sizes="(max-width: 768px) 90vw, 600px" />
            </DialogContent>
        </Dialog>
        <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">{role}</p>
        <p className="text-sm sm:text-base font-semibold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{school}</p>
    </div>
);

// --- 限定コンテンツ本体 ---
const LimitedContent = () => {
    const linkItems = [
        { href: "/limited-content/records/", label: "PBランキング", icon: Trophy },
        { href: "/limited-content/album", label: "アルバム", icon: Calendar },
        { href: "/limited-content/analysis/", label: "箱根駅伝区間分析", icon: Route },
    ];

    // 目標データ
    const goals = [
        { label: "関東インカレ", target: "7点獲得", achieved: true, result: "達成" },
        { label: "全日本大学駅伝予選会", target: "7位以内で突破", achieved: true, result: "達成" },
        { label: "箱根駅伝予選会", target: "10位以内で突破", achieved: true, result: "達成" },
        { label: "全日本大学駅伝", target: "8位以内でシード権", achieved: false, result: "11位" },
        { label: "PB更新目標", target: "115回更新", achieved: true, result: "達成" },
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
            { date: "12月7日(日)～9日(火)", event: "箱根富津合宿" },
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
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 pt-12 pb-4">
                <div className="mb-6">
                    <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '限定コンテンツ', href: '/limited-content' }, { label: 'チーム目標' }]} />
                </div>
                <AnimatedPageHeader
                    title="NSSU 男子駅伝"
                    subtitle="Team Goals 2025"
                    underlineColor="bg-slate-800"
                    largeSubtitle={true}
                    titleClassName="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                />
            </div>

            {/* クイックリンク */}
            <div className="container mx-auto px-4 sm:px-6 pb-8 max-w-4xl">
                <div className="flex flex-wrap gap-2 justify-center">
                    {linkItems.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href}>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all">
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 pb-16 max-w-4xl">
                <div className="space-y-6">

                    {/* スローガン - 最大目標 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-800 rounded-2xl p-6 sm:p-8 text-white">
                            {/* 背景装飾 */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                            
                            <div className="relative text-center">
                                {/* スローガン - メイン */}
                                <div className="mb-6">
                                    <p className="text-xs sm:text-sm text-zinc-500 tracking-[0.3em] uppercase mb-2">Slogan</p>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
                                        <span className="bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent">
                                            體進
                                        </span>
                                    </h2>
                                    <p className="text-sm sm:text-base text-zinc-400 mt-2 tracking-wider">
                                        〜継承を力に、越境を恐れず〜
                                    </p>
                                </div>

                                {/* 区切り線 */}
                                <div className="w-16 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mx-auto mb-6" />

                                {/* FINAL GOAL */}
                                <div>
                                    <p className="text-[10px] sm:text-xs text-zinc-500 tracking-[0.2em] uppercase mb-2">Final Goal</p>
                                    <p className="text-base sm:text-lg font-medium text-zinc-200">
                                        第102回 箱根駅伝 ─ 総合10位以内 シード権獲得
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 目標達成状況 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-slate-600" />
                                    2025年度 目標達成状況
                                </h3>
                                <span className="text-sm text-slate-500">4/5 達成</span>
                            </div>
                            <div className="space-y-3">
                                {goals.map((goal, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                                            goal.achieved 
                                                ? 'bg-emerald-50 border border-emerald-100' 
                                                : 'bg-slate-50 border border-slate-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {goal.achieved ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className={`font-medium text-sm ${goal.achieved ? 'text-emerald-900' : 'text-slate-700'}`}>
                                                    {goal.label}
                                                </p>
                                                <p className={`text-xs ${goal.achieved ? 'text-emerald-600' : 'text-slate-500'}`}>
                                                    {goal.target}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                            goal.achieved 
                                                ? 'bg-emerald-500 text-white' 
                                                : 'bg-slate-200 text-slate-600'
                                        }`}>
                                            {goal.result}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 幹部紹介 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-5">
                                <Users className="w-5 h-5 text-slate-600" />
                                2025年度 幹部
                            </h3>
                            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                <LeaderCard role="主将" name="浦上 和樹" school="九州学院" imgSrc="https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers54.jpeg" />
                                <LeaderCard role="主務" name="黒葛原 佑真" school="清風高校" imgSrc="https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers7.jpeg" />
                                <LeaderCard role="副主将" name="犬童 慧真" school="熊本工業" imgSrc="https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers2.jpeg" />
                            </div>
                        </div>
                    </motion.div>

                    {/* 箱根駅伝目標タイム */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-5">
                                <Clock className="w-5 h-5 text-slate-600" />
                                箱根駅伝 目標タイム
                            </h3>
                            
                            <div className="text-center mb-6">
                                <div className="inline-block bg-slate-900 text-white rounded-xl px-6 py-4">
                                    <p className="text-xs text-slate-400 mb-1">総合目標</p>
                                    <p className="text-3xl sm:text-4xl font-bold font-mono">10:53:59</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Route className="w-4 h-4 text-slate-600"/>
                                            <span className="font-semibold text-slate-900">往路</span>
                                        </div>
                                        <span className="font-mono text-sm font-semibold text-slate-700">5:25:19</span>
                                    </div>
                                    <div className="space-y-1.5 text-sm font-mono text-slate-600">
                                        <div className="flex justify-between"><span>1区</span><span>1:02:00</span></div>
                                        <div className="flex justify-between"><span>2区</span><span>1:07:14</span></div>
                                        <div className="flex justify-between"><span>3区</span><span>1:02:55</span></div>
                                        <div className="flex justify-between"><span>4区</span><span>1:02:10</span></div>
                                        <div className="flex justify-between"><span>5区</span><span>1:11:00</span></div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Flag className="w-4 h-4 text-slate-600"/>
                                            <span className="font-semibold text-slate-900">復路</span>
                                        </div>
                                        <span className="font-mono text-sm font-semibold text-slate-700">5:28:40</span>
                                    </div>
                                    <div className="space-y-1.5 text-sm font-mono text-slate-600">
                                        <div className="flex justify-between"><span>6区</span><span>0:58:50</span></div>
                                        <div className="flex justify-between"><span>7区</span><span>1:03:15</span></div>
                                        <div className="flex justify-between"><span>8区</span><span>1:06:00</span></div>
                                        <div className="flex justify-between"><span>9区</span><span>1:10:20</span></div>
                                        <div className="flex justify-between"><span>10区</span><span>1:10:15</span></div>
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
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-5">
                                <Calendar className="w-5 h-5 text-slate-600" />
                                合宿予定
                            </h3>
                            <Accordion type="single" collapsible className="space-y-2">
                                {Object.entries(campSchedule).map(([month, items], index) => (
                                    <AccordionItem key={month} value={`item-${index + 1}`} className="border border-slate-200 rounded-xl overflow-hidden">
                                        <AccordionTrigger className="text-sm font-semibold px-4 py-3 hover:bg-slate-50 transition-colors">
                                            {month}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4 pb-4">
                                            <div className="space-y-2">
                                                {items.map((item, itemIndex) => (
                                                    <div key={`${item.event}-${itemIndex}`} className="bg-slate-50 rounded-lg p-3">
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                            <span className="text-xs text-slate-500">{item.date}</span>
                                                            <span className="text-sm font-medium text-slate-900">{item.event}</span>
                                                        </div>
                                                        {item.sub && (
                                                            <div className="mt-2 pl-2 space-y-0.5">
                                                                {item.sub.map((s, subIndex) => (
                                                                    <div key={`${s}-${subIndex}`} className="text-xs text-slate-500">• {s}</div>
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