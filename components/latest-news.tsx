"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Timer, Medal, TrendingUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { CardImage } from "@/components/ui/card-image";

const records = [
  { title: "箱根駅伝", stats: ["77年連続77回出場", "優勝10回", "5連覇"] },
  { title: "全日本大学駅伝", stats: ["44回出場", "優勝11回", "3連覇"] },
  { title: "5000m", stats: ["13'32″58", "藤本 珠輝", "2021年"] },
  { title: "10000m", stats: ["27'58″52", "池田 燿平", "2020年"] },
  { title: "ハーフマラソン", stats: ["1:00'56", "富永 椋太", "2025年"] },
  { title: "1500m", stats: ["3'38″4", "石井 隆士", "1976年"] },
  { title: "3000mSC", stats: ["8'25″88", "新宅 雅也", "1979年"] },
  { title: "800m", stats: ["1'47″40", "長沢 匠人", "2025年"] }
];

// シンプルなアニメーション変数
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export function LatestNews() {
  // カウントダウン関連の状態
  const [yosenTimeLeft, setYosenTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isPassed: false
  });
  
  const [hakoneTimeLeft, setHakoneTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isPassed: false
  });
  
  // 進行度を計算（アニメーション用）
  const [yosenProgress, setYosenProgress] = useState(0);
  const [hakoneProgress, setHakoneProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const hakoneDate = new Date("2026-01-02T08:00:00"); // 2026年箱根駅伝 8時スタート
    const yosenDate = new Date("2025-10-18T08:30:00"); // 予選会 8時30分スタート
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      
      // 予選会のカウントダウン計算
      const yosenDiffTime = yosenDate.getTime() - now.getTime();
      const yosenTotalDuration = yosenDate.getTime() - new Date("2025-01-01T00:00:00").getTime();
      
      if (yosenDiffTime <= 0) {
        setYosenTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPassed: true });
        setYosenProgress(100);
      } else {
        const yosenDays = Math.floor(yosenDiffTime / (1000 * 60 * 60 * 24));
        const yosenHours = Math.floor((yosenDiffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const yosenMinutes = Math.floor((yosenDiffTime % (1000 * 60 * 60)) / (1000 * 60));
        const yosenSeconds = Math.floor((yosenDiffTime % (1000 * 60)) / 1000);
        const yosenTotalSeconds = Math.floor(yosenDiffTime / 1000);
        
        const yosenElapsed = new Date().getTime() - new Date("2025-01-01T00:00:00").getTime();
        const yosenNewProgress = Math.min(100, Math.max(0, (yosenElapsed / yosenTotalDuration) * 100));
        
        setYosenTimeLeft({ days: yosenDays, hours: yosenHours, minutes: yosenMinutes, seconds: yosenSeconds, totalSeconds: yosenTotalSeconds, isPassed: false });
        setYosenProgress(yosenNewProgress);
      }
      
      // 箱根駅伝のカウントダウン計算
      const hakoneDiffTime = hakoneDate.getTime() - now.getTime();
      const hakoneTotalDuration = hakoneDate.getTime() - new Date("2025-01-01T00:00:00").getTime();
      
      if (hakoneDiffTime <= 0) {
        setHakoneTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPassed: true });
        setHakoneProgress(100);
      } else {
        const hakoneDays = Math.floor(hakoneDiffTime / (1000 * 60 * 60 * 24));
        const hakoneHours = Math.floor((hakoneDiffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const hakoneMinutes = Math.floor((hakoneDiffTime % (1000 * 60 * 60)) / (1000 * 60));
        const hakoneSeconds = Math.floor((hakoneDiffTime % (1000 * 60)) / 1000);
        const hakoneTotalSeconds = Math.floor(hakoneDiffTime / 1000);
        
        const hakoneElapsed = new Date().getTime() - new Date("2025-01-01T00:00:00").getTime();
        const hakoneNewProgress = Math.min(100, Math.max(0, (hakoneElapsed / hakoneTotalDuration) * 100));
        
        setHakoneTimeLeft({ days: hakoneDays, hours: hakoneHours, minutes: hakoneMinutes, seconds: hakoneSeconds, totalSeconds: hakoneTotalSeconds, isPassed: false });
        setHakoneProgress(hakoneNewProgress);
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 箱根駅伝予選会カウントダウン */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <CountdownSection
            title="第102回箱根駅伝予選会まで"
            subtitle="Qualifying Race - 2025.10.18 8:30 Start"
            timeLeft={yosenTimeLeft}
            progress={yosenProgress}
            description1="第102回箱根駅伝出場権獲得に向けて、予選会突破を目指します。"
            description2="全選手が一丸となって、箱根駅伝本大会への切符を掴みます。"
            startLabel="2025年スタート"
            endLabel="2025.10.18 予選会"
            backgroundImage="https://nssu-ekiden.com/wp-content/uploads/2025/06/saya-img19.jpg"
            colorTheme="amber"
          />
        </motion.div>

        {/* 箱根駅伝本大会カウントダウン */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CountdownSection
            title="第102回箱根駅伝まで"
            subtitle="Road to Hakone 2026 - 2026.01.02 8:00 Start"
            timeLeft={hakoneTimeLeft}
            progress={hakoneProgress}
            description1="伝統の箱根駅伝に向けて、日体大駅伝部は新たな歴史を刻む準備を進めています。"
            description2="77年連続出場の誇りを胸に、チーム一丸となって目標達成を目指します。"
            startLabel="2025年スタート"
            endLabel="2026.01.02 本戦"
            backgroundImage="https://nssu-ekiden.com/wp-content/uploads/2025/06/saya-img7.jpg"
            colorTheme="blue"
          />
        </motion.div>

        {/* 歴代記録 - AnimatedPageHeader使用 */}
        <div className="mb-16">
          <AnimatedPageHeader
            title="最高記録"
            subtitle="100年の歴史が刻んだ輝かしい軌跡。伝統と革新が織りなす日体大の誇り"
            underlineColor="bg-gray-500"
            titleClassName="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight mb-3"
            subtitleClassName="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mt-6"
          />
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {records.map((record, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="h-full border-0 rounded-2xl shadow-lg bg-white overflow-hidden">
                  {/* ヘッダー部分 */}
                  <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col justify-center ${
                    record.title === "ハーフマラソン" ? "h-40 sm:h-36" : "h-36"
                  }`}>
                    {/* トップアクセント */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-500" />
                    
                    <h3 className="text-gray-800 font-bold text-xl mb-3 tracking-tight">{record.title}</h3>
                    <div className={`font-bold text-gray-800 tracking-tight leading-tight ${
                      record.title === "ハーフマラソン" ? "text-lg sm:text-xl md:text-2xl font-mono" :
                      record.stats[0].includes("'") || record.stats[0].includes("″") || record.stats[0].includes(":") 
                        ? "text-xl sm:text-2xl md:text-3xl tracking-wider font-mono" 
                        : "text-2xl sm:text-2xl md:text-3xl"
                    }`}>
                      {record.stats[0]}
                    </div>
                  </div>
                  
                  {/* コンテンツ部分 */}
                  <div className="p-6 bg-white">
                    <div className="space-y-4">
                      {record.stats.slice(1).map((stat, statIndex) => (
                        <div key={statIndex} className={`flex items-center ${statIndex === 0 ? "pb-3 border-b border-gray-100" : ""}`}>
                          {statIndex === 0 ? (
                            <div className="flex mr-4 bg-amber-100 rounded-xl p-2">
                              <Medal className="h-4 w-4 text-amber-600 flex-shrink-0" />
                            </div>
                          ) : (
                            <div className="flex mr-4 bg-slate-100 rounded-xl p-2">
                              <TrendingUp className="h-4 w-4 text-slate-600 flex-shrink-0" />
                            </div>
                          )}
                          {statIndex === 0 ? (
                            <span className="text-gray-800 font-bold">{stat}</span>
                          ) : (
                            <span className="text-gray-700">{stat}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// カウントダウンセクション用の型定義
interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPassed: boolean;
}

interface CountdownSectionProps {
  title: string;
  subtitle: string;
  timeLeft: CountdownTimeLeft;
  progress: number;
  description1: string;
  description2: string;
  startLabel: string;
  endLabel: string;
  backgroundImage?: string;
  colorTheme?: "amber" | "blue";
}

// カウントダウンセクションコンポーネント
function CountdownSection({
  title,
  subtitle,
  timeLeft,
  progress,
  description1,
  description2,
  startLabel,
  endLabel,
  backgroundImage,
  colorTheme = "amber"
}: CountdownSectionProps) {
  // カラーテーマに基づいて色を設定
  const progressColor = colorTheme === "amber" ? "bg-amber-500" : "bg-blue-500";
  const accentColor = colorTheme === "amber" ? "text-amber-400" : "text-blue-400";
  const primaryBgColor = colorTheme === "amber" ? "bg-amber-500/20" : "bg-blue-500/20";
  
  return (
    <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-lg">
      {/* 背景画像とオーバーレイ */}
      <div className="absolute inset-0">
        <CardImage
          src={backgroundImage || "https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite145.jpg"}
          alt="背景画像"
          sizes="100vw"
          overlayClassName="bg-neutral-900/80"
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-10">
        {/* タイトルエリア - モバイルでは中央揃え */}
        <div className="text-center lg:text-left mb-4 sm:mb-6">
          <div className="flex items-center justify-center lg:justify-start">
            <div className="p-2 bg-neutral-800 rounded-lg mr-3 sm:mr-4">
              <Timer className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${accentColor}`} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                {title}
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 text-white">
          {/* 左側テキスト */}
          <div className="w-full lg:max-w-xl order-2 lg:order-1">
            {/* プログレスバー */}
            <motion.div
              className="w-full mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="relative h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${progressColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-neutral-400">
                <span>{startLabel}</span>
                <span>{endLabel}</span>
              </div>
            </motion.div>

            {/* 説明文 - モバイルでは中央揃え */}
            <motion.div
              className="text-center lg:text-left space-y-2 mb-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="text-neutral-200 text-xs sm:text-sm md:text-base leading-relaxed">
                {description1}
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
                {description2}
              </p>
            </motion.div>
          </div>

          {/* カウントダウン数字 */}
          <div className="w-full lg:w-auto order-1 lg:order-2 mb-4 lg:mb-0">
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-3"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TimeUnit value={timeLeft.days} label="日" primary colorTheme={colorTheme} />
                <TimeUnit value={timeLeft.hours} label="時間" colorTheme={colorTheme} />
                <TimeUnit value={timeLeft.minutes} label="分" colorTheme={colorTheme} />
                <TimeUnit value={timeLeft.seconds} label="秒" colorTheme={colorTheme} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// カウントダウン数字表示コンポーネント
interface TimeUnitProps {
  value: number;
  label: string;
  primary?: boolean;
  colorTheme?: "amber" | "blue";
}

function TimeUnit({ value, label, primary = false, colorTheme = "amber" }: TimeUnitProps) {
  // モバイル表示用に短いラベルを設定
  const shortLabel = label === "時間" ? "時" : label;
  
  // カラーテーマに基づいて色を設定
  const textColor = colorTheme === "amber" ? "text-amber-400" : "text-blue-400";
  const bgColor = colorTheme === "amber" ? "bg-amber-500/20" : "bg-blue-500/20";
  
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`flex items-center justify-center w-[52px] h-[52px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] lg:w-[85px] lg:h-[85px] rounded-lg sm:rounded-xl ${primary ? bgColor : 'bg-neutral-800'}`}
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold ${primary ? textColor : 'text-white'}`}>
          {value.toString().padStart(2, '0')}
        </span>
      </motion.div>
      <span className="mt-1 text-[10px] sm:text-xs md:text-sm text-neutral-400">
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    </div>
  );
}