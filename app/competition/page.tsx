"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, MapPin, Download, ExternalLink, AlertCircle, Info, Twitter, Mail, ChevronRight, Award } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// スケジュールデータを配列として定義
const competitionSchedule = [
  { month: "3月", dates: "29日(土) - 30日(日)", title: "第319回 日本体育大学長距離競技会" },
  { month: "4月", dates: "26日(土) - 27日(日)", title: "第320回 日本体育大学長距離競技会 兼 第14回NCG", isNCG: true },
  { month: "5月", dates: "31日(土) - 6月1日(日)", title: "第321回 日本体育大学長距離競技会 兼 第15回NCG", isNCG: true },
  { month: "6月", dates: "14日(土) - 15日(日)", title: "第322回 日本体育大学長距離競技会 兼 第16回NCG", isNCG: true, note: "※改修工事の関係で日程変更(4/1)" },
  { month: "10月", dates: "5日(日)", title: "第323回 日本体育大学長距離競技会 兼 第17回NCG", isNCG: true, venue: "慶應義塾大学日吉陸上競技場", specialNote: "競技場改修工事に伴い会場変更。駐車場なし。" },
  { month: "11月", dates: "15日(土) - 16日(日)", title: "第324回 日本体育大学長距離競技会 兼 第18回NCG", isNCG: true },
  { month: "11月", dates: "29日(土) - 30日(日)", title: "第325回 日本体育大学長距離競技会 兼 第19回NCG", isNCG: true },
  { month: "12月", dates: "20日(土)", title: "第26回 女子長距離競技会" },
];

export default function LongDistancePage() {
  useEffect(() => {
    // Twitter widgets スクリプトの読み込み
    const loadTwitterWidget = () => {
      // 既存のスクリプトを確認
      const existingScript = document.getElementById('twitter-wjs');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'twitter-wjs';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
      } else {
        // 既にスクリプトが存在する場合は再レンダリング
        // @ts-ignore
        if (window.twttr?.widgets) {
          // @ts-ignore
          window.twttr.widgets.load();
        }
      }
    };

    // 少し遅延させて確実に読み込む
    const timer = setTimeout(() => {
      loadTwitterWidget();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-sky-50 min-h-screen">
      <motion.div 
        className="container mx-auto px-4 py-20 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '日本体育大学長距離競技会' }]} />
          </div>
          <AnimatedPageHeader 
            title="日体大長距離競技会"
            subtitle="Nippon Sports Science University Long-Distance Running Competition"
            titleClassName="text-4xl md:text-5xl font-bold text-sky-900 mb-2 tracking-tight"
            subtitleClassName="text-lg text-sky-700"
            underlineWidth="250px"
          />

          <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite258.jpg"
                alt="日体大長距離競技会"
                fill
                priority
                quality={85}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-sky-700/60 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">2025年度 日本体育大学長距離競技会</h2>
                  <p className="text-xl mb-6 text-sky-100">年間8回開催</p>
                  <Button size="lg" className="bg-white text-sky-800 hover:bg-sky-100" asChild>
                    <a href="http://games.nssu-athletic.com/ld.html" target="_blank" rel="noopener noreferrer">
                      公式サイトへ <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </AspectRatio>
          </div>

          <div className="mb-10">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 mr-2 text-sky-600" />
              <h2 className="text-2xl font-bold text-sky-800">2025年度の競技会の日程</h2>
            </div>
            <Card className="overflow-hidden border-sky-100 shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-sky-100">
                  {competitionSchedule.map((item, index) => (
                    <ScheduleItem
                      key={index}
                      month={item.month}
                      dates={item.dates}
                      title={item.title}
                      note={item.note}
                      venue={item.venue}
                      specialNote={item.specialNote}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Alert className="mt-6 border-amber-600 bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <p className="mb-2">NCGはWRk申請対象となります。NCGと長距離競技会は別大会です。</p>
                <p>第322回、第323回大会については競技場改修工事の関係で変更になる可能性があります。</p>
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <InfoCard
              icon={<MapPin className="h-5 w-5 text-sky-600" />}
              title="開催場所"
              content={
                <>
                  <p className="font-semibold">日本体育大学 健志台キャンパス</p>
                  <p className="text-sm">陸上競技場</p>
                  <p className="text-sm text-gray-500 mt-2">
                    〒227-0033<br />
                    神奈川県横浜市青葉区鴨志田町1221-1
                  </p>
                </>
              }
            />

            <InfoCard
              icon={<Info className="h-5 w-5 text-sky-600" />}
              title="事務局"
              content={
                <>
                  <p className="text-sm font-semibold mb-1">長距離競技会事務局</p>
                  <p className="text-sm text-gray-600 mt-2">
                    〒227-0035<br />
                    神奈川県横浜市青葉区<br />
                    すみよし台30-14
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>TEL:</strong> 045-962-0520
                  </p>
                </>
              }
            />

            <InfoCard
              icon={<Twitter className="h-5 w-5 text-sky-600" />}
              title="速報"
              content={
                <>
                  <p className="mb-3">長距離競技会の速報は公式Xアカウントでご確認いただけます。</p>
                  <Button className="w-full bg-sky-600 hover:bg-sky-700" asChild>
                    <a href="https://x.com/nittai_e" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4 mr-2" />
                      公式Xアカウント
                    </a>
                  </Button>
                </>
              }
            />

            <InfoCard
              icon={<Download className="h-5 w-5 text-sky-600" />}
              title="競技会資料"
              content={
                <div className="space-y-2">
                  <DocumentLink 
                    href="https://nssu-ekiden.com/wp-content/uploads/2025/03/長距離注意事項.pdf"
                    title="競技会注意事項"
                  />
                  <DocumentLink 
                    href="https://nssu-ekiden.com/wp-content/uploads/2025/03/長距離開催予定種目.pdf"
                    title="開催予定種目"
                  />
                  <DocumentLink 
                    href="https://nssu-ekiden.com/wp-content/uploads/2025/03/長距離振り込みに関して.pdf"
                    title="お振込みに関して"
                  />
                </div>
              }
            />
          </div>

          <div className="space-y-10">
            {/* Xタイムライン埋め込み */}
            <Section 
              id="twitter-timeline"
              title="最新情報（X / Twitter）"
              icon={<Twitter className="h-6 w-6 text-sky-600" />}
              content={
                <div className="bg-white p-6 rounded-xl border border-sky-200 shadow-sm">
                  <div className="flex justify-center">
                    <a 
                      className="twitter-timeline" 
                      data-width="100%"
                      data-height="600" 
                      data-theme="light"
                      data-chrome="noheader nofooter noborders"
                      data-link-color="#0284c7"
                      href="https://twitter.com/nittai_e?ref_src=twsrc%5Etfw"
                    >
                      Tweets by @nittai_e
                    </a>
                  </div>
                </div>
              }
            />

            <Section 
              id="official-site"
              title="公式サイト"
              icon={<ExternalLink className="h-6 w-6 text-sky-600" />}
              content={
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl border border-sky-200">
                    <h3 className="font-bold text-lg mb-4 text-sky-900">長距離競技会 公式サイト</h3>
                    <p className="mb-4 text-gray-700">
                      大会情報、結果速報、各種資料は公式サイトでご確認ください。
                    </p>
                    <Button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700" size="lg" asChild>
                      <a href="http://games.nssu-athletic.com/ld.html" target="_blank" rel="noopener noreferrer">
                        公式サイトへ <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              }
            />

            <Section 
              id="entry"
              title="団体登録・エントリー"
              icon={<ExternalLink className="h-6 w-6 text-sky-600" />}
              content={
                <div className="space-y-6">
                  <Alert className="border-sky-200 bg-sky-50">
                    <Info className="h-5 w-5 text-sky-600" />
                    <AlertDescription className="text-sky-800">
                      団体登録やエントリーは専用サイトから行ってください。
                    </AlertDescription>
                  </Alert>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="font-bold text-lg mb-4 text-green-900">団体登録・エントリーサイト</h3>
                    <p className="mb-4 text-gray-700">
                      団体登録およびエントリーは以下のサイトから行ってください。
                    </p>
                    <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700" size="lg" asChild>
                      <a href="http://ld.nssu-athletic.com/" target="_blank" rel="noopener noreferrer">
                        エントリーサイトへ <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              }
            />

            <Section 
              title="取材申請について"
              icon={<Award className="h-6 w-6 text-sky-600" />}
              content={
                <>
                  <p className="mb-4">
                    取材を希望される方は、以下の資料をご確認の上、申請をお願いいたします。
                  </p>
                  <div className="space-y-4">
                    <DocumentLink 
                      href="https://nssu-ekiden.com/wp-content/uploads/2025/02/取材申請につきまして.pdf"
                      title="取材申請について"
                    />
                    <DocumentLink 
                      href="https://nssu-ekiden.com/wp-content/uploads/2025/02/取材申請.xlsx"
                      title="取材申請ファイル"
                    />
                  </div>
                </>
              }
            />

            <Section 
              title="お問い合わせ"
              icon={<Mail className="h-6 w-6 text-sky-600" />}
              content={
                <>
                  <p className="mb-4">
                    日体大長距離競技会に関するお問い合わせは、以下の連絡先までお願いいたします。
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">メールアドレス:</span>{" "}
                      <a href="mailto:nittaidai-ekiden@outlook.jp" className="text-sky-600 hover:underline">
                        nittaidai-ekiden@outlook.jp
                      </a>
                    </p>
                  </div>
                </>
              }
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- 再利用可能なコンポーネント群 ---

// スケジュール項目コンポーネント
interface ScheduleItemProps {
  month: string;
  dates: string;
  title: string;
  note?: string;
  venue?: string;
  specialNote?: string;
}

function ScheduleItem({ month, dates, title, note, venue, specialNote }: ScheduleItemProps) {
  return (
    <div className="p-4 hover:bg-sky-50 transition-colors flex flex-col sm:flex-row items-start">
      <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
        <span className="font-bold text-sky-800 text-lg w-12">{month}</span>
        <span className="text-gray-600 w-36">{dates}</span>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-sky-900">{title}</h3>
        {venue && (
          <p className="text-sm text-blue-600 mt-1 flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {venue}
          </p>
        )}
        {specialNote && (
          <p className="text-sm text-amber-600 mt-1 font-medium">{specialNote}</p>
        )}
        {note && (
          <p className="text-sm text-gray-500 mt-1">{note}</p>
        )}
      </div>
    </div>
  );
}

// 情報カードコンポーネント
interface InfoCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

function InfoCard({ icon, title, content }: InfoCardProps) {
  return (
    <Card className="overflow-hidden border-sky-100 shadow-sm h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {content}
      </CardContent>
    </Card>
  );
}

// ドキュメントリンクコンポーネント
interface DocumentLinkProps {
  href: string;
  title: string;
}

function DocumentLink({ href, title }: DocumentLinkProps) {
  return (
    <Button variant="outline" className="w-full justify-start border-sky-100 hover:bg-sky-50 hover:border-sky-200" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Download className="h-4 w-4 mr-2 text-sky-600" />
        {title}
      </a>
    </Button>
  );
}

// セクションコンポーネント
interface SectionProps {
  id?: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

function Section({ id, title, icon, content }: SectionProps) {
  return (
    <section id={id} className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-hidden">
      <div className="flex items-center p-4 border-b border-sky-100 bg-sky-50">
        {icon}
        <h2 className="text-xl font-bold text-sky-800 ml-2">{title}</h2>
      </div>
      <div className="p-6">
        {content}
      </div>
    </section>
  );
}