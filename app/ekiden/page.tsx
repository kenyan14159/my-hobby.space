"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, CalendarClock, Flag, Milestone, Trophy, Users, Zap, X } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EkidenNavigation } from "@/components/ui/ekiden-navigation";

// --- データ定義 (ご指定の内容に更新) ---

const keyStats = [
  { icon: Trophy, value: "10回", label: "箱根駅伝 総合優勝", description: "5連覇の偉業を含む" },
  { icon: Award, value: "11回", label: "全日本大学駅伝 優勝", description: "3連覇2回" },
  { icon: Flag, value: "77年", label: "箱根駅伝 連続出場", description: "歴代2位の継続記録" },
  { icon: Users, value: "多数", label: "世界的ランナー輩出", description: "谷口浩美選手など" },
];

const historyTimeline = [
  { year: "1925年", title: "陸上競技部 創設", description: "陸上競技部が創設され、翌1926年に駅伝部として正式に活動を開始する。", icon: Milestone },
  { year: "1949年", title: "箱根駅伝 初出場", description: "第25回大会で初出場。以来、連続出場記録を更新し続ける。", icon: CalendarClock },
  { year: "1969-1973年", title: "黄金時代 - 箱根5連覇", description: "中央大学に次ぐ歴代2位の5年連続総合優勝という不滅の金字塔を打ち立てる。", icon: Zap },
  { year: "1970-1988年", title: "全日本大学駅伝 3連覇2度達成", description: "3連覇を2度達成し、通算11回の優勝を誇る。", icon: Award },
  { year: "現在", title: "名門復活への挑戦", description: "伝統を胸に、シード権獲得と未来の栄光を目指す。", icon: BookOpen },
];

interface Alumnus {
  name: string;
  reading: string;
  achievement: string;
  image: string;
}

const notableAlumni: Alumnus[] = [
  {
    name: "谷口 浩美",
    reading: "たにぐち ひろみ",
    achievement:
      "1991年世界陸上マラソン金メダリスト。バルセロナ・アトランタ五輪代表。箱根駅伝では『山下りのスペシャリスト』として名を馳せた。",
    image: "",
  },
  {
    name: "池田 耀平",
    reading: "いけだ ようへい",
    achievement:
      "箱根駅伝2区3位など学生時代から活躍。実業団・kaoではマラソンで日本人歴代2位の好記録を樹立。現役トップランナーとして世界を目指す。",
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/06/yohei-ikeda.jpg",
  },
  {
    name: "采谷 義秋",
    reading: "うねたに よしあき",
    achievement:
      "1972年ミュンヘン五輪マラソン代表として活躍。1970年代のチームの黄金期を支えたレジェンドの一人。",
    image: "",
  },
];

// --- アニメーション設定 ---
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };


// --- メインコンポーネント ---
export default function EkidenHistoryPage() {
    const [selectedAlumnus, setSelectedAlumnus] = useState<Alumnus | null>(null);

    return (
        <div className="bg-gradient-to-br from-white to-sky-50">
            <motion.div 
                className="container mx-auto px-4 py-12 md:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-6">
                    <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '駅伝の歴史' }]} />
                </div>
                <AnimatedPageHeader 
                    title="駅伝の歴史"
                    subtitle={"創部1925年。日本の大学駅伝界を牽引してきた名門の、栄光と伝統の軌跡"}
                />

                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" variants={containerVariants} initial="hidden" animate="visible">
                    {keyStats.map((stat, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="text-center h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <stat.icon className="mx-auto h-12 w-12 text-sky-600 mb-4" />
                                    <p className="text-3xl font-bold text-sky-700">{stat.value}</p>
                                    <p className="text-md font-semibold text-gray-800 mt-1">{stat.label}</p>
                                    <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mb-20">
                    <motion.h2 className="text-3xl font-bold text-center mb-12 text-gray-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        栄光への道のり
                    </motion.h2>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-sky-200" aria-hidden="true"></div>
                        {historyTimeline.map((item, index) => (
                            <motion.div key={index} className="relative mb-8 flex items-center" initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 order-2 text-left'}`}>
                                    <p className="font-bold text-sky-700 text-lg">{item.year}</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 bg-sky-600 text-white rounded-full h-10 w-10 flex items-center justify-center z-10">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 order-1 text-right'}`}>
                                    <Card className="shadow-md">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                 <div className="mb-16">
                    <motion.h2 className="text-3xl font-bold text-center mb-12 text-gray-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        世界へ羽ばたいたレジェンド
                    </motion.h2>
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {notableAlumni.map((alumnus) => (
                            <motion.div
                                key={alumnus.name}
                                variants={itemVariants}
                                onClick={() => alumnus.image && setSelectedAlumnus(alumnus)}
                                className={alumnus.image ? "cursor-pointer" : ""}
                            >
                                <Card className="overflow-hidden text-center h-full flex flex-col">
                                    <CardHeader className="p-0">
                                        <div className="relative h-56 w-full">
                                            {alumnus.image ? (
                                                <Image
                                                    src={alumnus.image}
                                                    alt={`${alumnus.name}選手`}
                                                    fill
                                                    className="object-cover"
                                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full w-full bg-sky-100 text-sky-600 text-sm">No Image</div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold">{alumnus.name}</h3>
                                        <p className="text-sm text-sky-700 mt-1">{alumnus.reading}</p>
                                        <p className="text-sm text-gray-600 mt-3 leading-relaxed flex-grow">{alumnus.achievement}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* 駅伝成績関連のクイックアクセス */}
                <div className="mt-20">
                    <EkidenNavigation />
                </div>

                {/* 画像モーダル */}
                {selectedAlumnus && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedAlumnus(null)} />
                        <div className="relative z-10 bg-white rounded-lg overflow-hidden max-w-lg w-full">
                            <button
                                onClick={() => setSelectedAlumnus(null)}
                                className="absolute right-4 top-4 z-20 bg-white/80 rounded-full p-1 hover:bg-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <Image
                                src={selectedAlumnus.image}
                                alt={selectedAlumnus.name}
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain"
                                unoptimized
                            />
                            <div className="p-4 text-center space-y-1">
                                <h3 className="text-xl font-bold">{selectedAlumnus.name}</h3>
                                <p className="text-sm text-sky-700">{selectedAlumnus.reading}</p>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}