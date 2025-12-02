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
  { title: "5000m", stats: ["藤本 珠輝", "13:32.58", "2021年"] },
  { title: "10000m", stats: ["平島 龍斗", "27:56.84", "2025年"] },
  { title: "ハーフマラソン", stats: ["富永 椋太", "1:00:56", "2025年"] },
  { title: "1500m", stats: ["石井 隆士", "3:38.4", "1976年"] },
  { title: "3000mSC", stats: ["新宅 雅也", "8:25.88", "1979年"] },
  { title: "800m", stats: ["長沢 匠人", "1:47.40", "2025年"] }
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
  const [hakoneTimeLeft, setHakoneTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isPassed: false
  });
  
  // 進行度を計算（アニメーション用）
  const [hakoneProgress, setHakoneProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const hakoneDate = new Date("2026-01-02T08:00:00"); // 2026年箱根駅伝 8時スタート
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      
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
        {/* 箱根駅伝本大会カウントダウン */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <CountdownSection
            title="第102回箱根駅伝まで"
            subtitle="Road to Hakone 2026 - 2026.01.02 8:00 Start"
            timeLeft={hakoneTimeLeft}
            progress={hakoneProgress}
            description1="78年連続出場の伝統を力に、更なる高みを目指します。"
            description2="チーム全員で箱根路を駆け抜ける日を目指して。"
            startLabel="2026年スタート"
            endLabel="2026.01.02 本戦"
            backgroundImage="https://nssu-ekiden.works/wp-content/uploads/2025/06/saya-img7.jpg"
            colorTheme="blue"
          />
        </motion.div>

        {/* 歴代記録 - 超かっこいいデザイン */}
        <div className="mb-16 relative">
          {/* 背景装飾 */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 blur-[120px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-700/30 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10 p-6 md:p-10">
            {/* ヘッダー */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-3 tracking-tight">
                最高記録
              </h2>
              <p className="text-cyan-200/70 text-sm md:text-base max-w-3xl mx-auto">
                日体大駅伝部・陸上競技部の歴代最高記録
              </p>
            </motion.div>
            
            {/* レコードグリッド */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {records.map((record, index) => {
                const isEkiden = record.title === "箱根駅伝" || record.title === "全日本大学駅伝";
                const isRecent = record.stats[2] === "2025年";
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full border-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group relative">
                      {/* 輝きエフェクト */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      {/* 上部アクセント */}
                      <div className={`h-1 ${isEkiden ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400' : isRecent ? 'bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400' : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400'}`} />
                      
                      {/* ヘッダー */}
                      <div className="p-3 md:p-4 pb-2 relative">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-bold text-sm md:text-base tracking-tight">{record.title}</h3>
                          {isRecent && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-400/40 rounded text-emerald-300 text-[10px] font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        
                        {/* 選手名(駅伝以外) */}
                        {!isEkiden && (
                          <div className="text-white/90 font-medium text-xs md:text-sm mb-1.5">
                            {record.stats[0]}
                          </div>
                        )}
                        
                        {/* メイン記録 */}
                        <div className={`font-bold leading-tight ${
                          isEkiden ? 'text-lg md:text-xl lg:text-2xl text-transparent bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text' :
                          'text-xl md:text-2xl lg:text-3xl font-mono text-transparent bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text'
                        }`}>
                          {isEkiden ? record.stats[0] : record.stats[1]}
                        </div>
                      </div>
                      
                      {/* ディテール */}
                      <div className="px-3 md:px-4 pb-3 md:pb-4 space-y-1">
                        {(isEkiden ? record.stats.slice(1) : [record.stats[2]]).map((stat, statIndex) => (
                          <div key={statIndex} className="text-xs md:text-sm">
                            <span className={isEkiden && statIndex === 0 ? "text-white/90 font-medium" : "text-slate-300/80"}>
                              {stat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
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
          src={backgroundImage || "https://nssu-ekiden.works/wp-content/uploads/2025/02/favorite145.jpg"}
          alt={`${title}${subtitle ? ` - ${subtitle}` : ''} - 日本体育大学駅伝部`}
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