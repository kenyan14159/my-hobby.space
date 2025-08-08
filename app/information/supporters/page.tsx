"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Heart, Link as LinkIcon, Instagram, Facebook, Twitter, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { InfoQuickAccess } from "@/components/info-quick-access";
import { ImageModal } from "@/components/bulletin-board";
import { useState } from "react";

// --- データ定義 ---

const itoSupporter = {
  name: "伊藤 智章",
  furigana: "いとう ともあき",
  catchphrase: "日体大駅伝部の心強い味方！「ゴッドハンド」伊藤さん",
  image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/itotomoaki.jpg",
  rating: 5,
  description: "数々の駅伝チーム、実業団を支える「ゴッドハンド」。選手たちのコンディションを劇的に向上させ、勝利に貢献。監督やコーチにも言えない悩みも打ち明けられる、選手からの信頼も厚い存在です。",
  bookingInfo: "超一流の施術は予約困難！ご予約はお早めに。",
  profile: [
    { label: "勤務先", value: "ライラック治療院" },
    { label: "居住地", value: "神奈川県横浜市" },
    { label: "出身地", value: "静岡県浜松市 (うなぎパワー！)" },
    { label: "高校", value: "浜松日体高校 駅伝部" },
    { label: "大学", value: "関東学院大学経営学部 駅伝部" },
    { label: "専門学校", value: "呉竹鍼灸柔整専門学校 鍼灸あん摩マッサージ指圧科" },
  ],
  message: "鍼灸師の伊藤さんは、ライラック治療院にて施術を通して選手たちのコンディショニングをサポート。豊富な経験と確かな技術、親しみやすい人柄で、チームに貢献いただいています。伊藤さんの施術は一般の方も受診可能です。心身のケアにご興味のある方は、ライラック治療院へご相談ください。",
  clinic: {
    name: "ライラック治療院",
    address: "神奈川県横浜市",
    tel: "045-504-0399",
    website: "http://lilac-namamugi.com",
  },
  sns: [
    { name: "Instagram", url: "https://www.instagram.com/tomo.icoco", icon: <Instagram className="h-6 w-6" /> },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100007170611509", icon: <Facebook className="h-6 w-6" /> },
    { name: "X", url: "https://x.com/tomo_i_coco", icon: <Twitter className="h-6 w-6" /> },
    { name: "Threads", url: "https://www.threads.net/@tomo.icoco", icon: <Image src="https://nssu-ekiden.com/wp-content/uploads/2025/02/threads-logo-black-01.png" alt="Threads" width={24} height={24} className="h-6 w-6" /> },
  ]
};

const corporateSupporters = [
  { name: "アリナミン製薬", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/07/arinamin.png", website: "https://alinamin-pharma.co.jp/" },
  { name: "MIZUNO", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/MIZUNO.png", website: "https://jpn.mizuno.com/" },
  { name: "Phiten", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/phiten.jpg", website: "https://www.phiten-store.com/" },
  { name: "日体大クリニック・アレックス東京", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/日本体育大学クリニック・アレックス東京.jpg", website: "https://www.nittai.ac.jp/about/facility/clinic/" },
  { name: "日本体育大学NASS サポート", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/NASS.jpg", website: "https://www.nittai.ac.jp/about/approach/nass.html" },
  { name: "SPORTS EPA", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/SPORTS-EPA.png", website: "https://www.sportsepa.jp/" },
  { name: "TOPRUNNER", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/TOPRUNNER.jpg", website: "https://top-runner.net" },
  { name: "超速RECOVER", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/超速RECOVER.jpeg", website: "https://www.ichibiki.co.jp/brand/recover/" },
  { name: "サンアクティブ", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/サンアクティブ.jpg", website: "https://www.taiyo-labo.jp/LDP/sunactivefe/" },
  { name: "スキンストレッチ", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/skinstretch.jpg", website: "https://skinstretch.info/" },
  { name: "LOFE アーチサポート&インソール", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/LOFE-アーチサポートインソール.jpg", website: "https://joy-life.co.jp/lofe-archsupport" },
  { name: "空間清浄化システム SterilizAir（ステライザ）", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/空間清浄化システム-SterilizAir（ステライザ）.jpg", website: "https://www.efbalance.com/sterilizair/" },
  { name: "長野県飯綱町三水丸山農園", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/20201021.jpg", website: "http://www.ngn.janis.or.jp/~samizumarunou/" }
];

const facilitySupporters = [
    { name: "富士見高原 ジュネス八ヶ岳", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/ジュネス.jpg", address: "長野県諏訪郡富士見町境12067", tel: "0266-66-2931", email: "info@junes-yatsugatake.jp", website: "https://junes-yatsugatake.jp/" },
    { name: "野尻湖畔の宿 藤屋旅館", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/藤屋.jpg", address: "長野県上水内郡信濃町野尻258-5", tel: "026-258-2514", fax: "026-258-2580", website: "https://fujiyaryokan.net/" },
    { name: "ホテル若月", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/若月.jpg", address: "長野県上水内郡信濃町野尻2014-2", tel: "026-255-2577 (10:00～21:00)", fax: "026-255-4777", website: "https://hotelwakatsuki.com/" },
    { name: "国民宿舎杉久保ハウス", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/杉久保ハウス.jpg", address: "長野県上水内郡信濃町野尻29-8", tel: "026-258-2550", fax: "026-258-3933", website: "https://www.sugikubo.com/" },
    { name: "信州 菅平高原つばくら館", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/つばくら館.jpg", address: "長野県上田市菅平高原1223-2910", tel: "0268-74-2073", fax: "0268-74-3866", website: "http://www.sugadaira.ne.jp/~tsubakurakan/" },
    { name: "菅平高原 ホテル柄澤", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/ホテル柄澤.jpg", address: "長野県上田市菅平高原1278", tel: "0268-74-2555", fax: "0268-74-2380", email: "info@hotel-karasawa.co.jp", website: "http://www.hotel-karasawa.co.jp" },
    { name: "仙流荘", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/仙流荘.jpg", address: "伊那市長谷黒河内1847-2", tel: "0265-98-2312", fax: "0265-98-2048", website: "https://www.ina-city-kankou.co.jp/senryuso/" },
    { name: "富津味覚の宿 志ら井", logo: "https://nssu-ekiden.com/wp-content/uploads/2025/06/志ら井.jpg", address: "千葉県富津市富津26-1", tel: "0120-87-2914", fax: "0439-87-3393", website: "http://www.yado-shirai.com/index.html" }
];


// --- コンポーネント定義 ---

// セクションコンポーネント
const Section = ({ title, children, icon: Icon }: { title: string, children: ReactNode, icon: React.ElementType }) => (
  <section className="mb-16">
    <div className="flex items-center mb-6">
      <Icon className="h-8 w-8 text-sky-600" />
      <h2 className="text-3xl font-bold text-sky-800 ml-3">{title}</h2>
    </div>
    {children}
  </section>
);

// サポータープロフィール
const SupporterProfile = ({ supporter, onImageClick }: { supporter: typeof itoSupporter, onImageClick: () => void }) => (
  <Card className="bg-gradient-to-br from-sky-50/50 via-white to-blue-50/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-sky-100">
    <div className="flex flex-col lg:flex-row gap-8">
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="lg:w-1/3 flex-shrink-0 cursor-pointer"
        onClick={onImageClick}
        tabIndex={0}
        role="button"
        aria-label="サポーター画像を拡大"
      >
          <AspectRatio ratio={3 / 4} className="rounded-xl overflow-hidden shadow-md">
          <Image src={supporter.image} alt={supporter.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
        </AspectRatio>
      </motion.div>
      <div className="lg:w-2/3">
        <h3 className="text-3xl font-bold text-sky-900">
          {supporter.name} <span className="text-lg font-normal text-gray-500 ml-2">{supporter.furigana}</span>
        </h3>
        
        {/* ★★★ 修正箇所 ★★★ */}
        {/* catchphraseをそのまま表示し、不要なダブルクォートを削除 */}
        <p className="text-lg text-sky-700 italic mt-2 mb-4">
          {supporter.catchphrase}
        </p>
        
        <div className="flex items-center mb-4">
          <span className="text-gray-600 mr-2">選手評価:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < supporter.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="ml-2 font-semibold text-gray-700">({supporter.rating})</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">{supporter.description}</p>
        <p className="text-sm font-semibold text-sky-800">{supporter.bookingInfo}</p>
      </div>
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/80 p-6 rounded-lg border border-gray-100">
        <h4 className="font-bold text-xl text-sky-800 mb-3">プロフィール</h4>
        <dl className="space-y-2 text-sm">
          {supporter.profile.map(item => (
            <div key={item.label} className="flex">
              <dt className="w-24 font-semibold text-gray-600 flex-shrink-0">{item.label}</dt>
              <dd className="text-gray-800">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="bg-white/80 p-6 rounded-lg border border-gray-100">
        <h4 className="font-bold text-xl text-sky-800 mb-3">ライラック治療院</h4>
        
        {/* ライラック治療院の画像 */}
        <div className="mb-4">
          <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden shadow-sm">
            <Image 
              src="https://nssu-ekiden.com/wp-content/uploads/2025/07/rairakku.jpg" 
              alt="ライラック治療院" 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </AspectRatio>
        </div>
        
        <p className="text-gray-700 text-sm mb-4">{supporter.message}</p>
        <div className="space-y-2 text-sm">
            <p><span className="font-semibold">住所:</span> {supporter.clinic.address}</p>
            <p><span className="font-semibold">電話:</span> {supporter.clinic.tel} (予約優先)</p>
            <Button variant="outline" className="w-full mt-3" asChild>
                <a href={supporter.clinic.website} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4 mr-2"/> ウェブサイト
                </a>
            </Button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
             <p className="text-sm text-center text-gray-600 mb-2">伊藤さんの活動はSNSでもご覧いただけます</p>
            <div className="flex justify-center gap-4">
                {supporter.sns.map(social => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-600 transition-colors">
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
      </div>
    </div>
  </Card>
);

// 企業・施設サポーターカード
const SupporterCard = ({ supporter }: { supporter: { name: string, logo: string, website: string, address?: string, tel?: string, fax?: string, email?: string }}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col"
    >
        <AspectRatio ratio={16 / 9} className="bg-gray-50">
            <Image src={supporter.logo} alt={supporter.name} fill className="object-contain p-4" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px" />
        </AspectRatio>
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg text-sky-900 flex-grow">{supporter.name}</h3>
            {supporter.address && <p className="text-xs text-gray-500 mt-2">{supporter.address}</p>}
            {supporter.tel && <p className="text-xs text-gray-500 mt-1">TEL: {supporter.tel}</p>}
            {supporter.fax && <p className="text-xs text-gray-500 mt-1">FAX: {supporter.fax}</p>}
            {supporter.email && <p className="text-xs text-gray-500 mt-1">Email: {supporter.email}</p>}
            <Button variant="ghost" size="sm" className="w-full mt-3 justify-start text-sky-600 hover:bg-sky-50" asChild>
                <a href={supporter.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2"/>
                    ウェブサイトへ
                </a>
            </Button>
        </div>
    </motion.div>
);

// --- メインページコンポーネント ---
export default function SupportersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedPageHeader 
            title="サポーターの皆様"
            subtitle="日頃からの温かいご支援、心より感謝申し上げます。"
            titleClassName="text-5xl font-extrabold text-sky-900 mb-3 tracking-tight"
            subtitleClassName="text-lg text-gray-600"
            underlineWidth="300px"
          />
          
          {/* クイックアクセスボタン */}
          <InfoQuickAccess />
          
          <Section title="サポーター紹介" icon={Heart}>
            <SupporterProfile supporter={itoSupporter} onImageClick={() => setModalOpen(true)} />
            <ImageModal src={itoSupporter.image} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          </Section>

          <Section title="応援企業" icon={Heart}>
            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
              皆様のご支援のお陰で私たちはパフォーマンスを最大限発揮できています。今後ともご支援をよろしくお願いいたします。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {corporateSupporters.map((supporter, index) => (
                <SupporterCard key={index} supporter={supporter} />
              ))}
            </div>
          </Section>

          <Section title="応援施設" icon={Heart}>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {facilitySupporters.map((supporter, index) => (
                <SupporterCard key={index} supporter={supporter} />
              ))}
            </div>
          </Section>
        </div>
      </motion.div>
    </div>
  );
}