import React from "react";
import Link from "next/link";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, Newspaper, Medal, Users, BookOpen, Star, Twitter, Instagram, Facebook, Youtube, UserPlus, ExternalLink, Info, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日本体育大学陸上競技部 | 創部100周年 箱根駅伝・関東インカレ・日本インカレ",
  description: "日本体育大学陸上競技部の公式情報サイト。1925年創部、2025年で創部100周年を迎える伝統ある陸上競技部。箱根駅伝、関東インカレ、日本インカレなど主要大会に出場。最新ニュース、大会日程、歴代記録、メンバー紹介、入部案内を掲載。",
  keywords: [
    "日本体育大学",
    "日体大",
    "陸上競技部",
    "陸上部",
    "箱根駅伝",
    "関東インカレ",
    "日本インカレ",
    "駅伝",
    "長距離",
    "短距離",
    "中距離",
    "跳躍",
    "投擲",
    "混成",
    "トラック競技",
    "フィールド競技",
    "大学陸上",
    "学生陸上",
    "創部100周年",
    "日体大記録会",
    "健志台キャンパス",
    "横浜",
    "入部案内",
  ],
  openGraph: {
    title: "日本体育大学陸上競技部 | 創部100周年",
    description: "1925年創部、創部100周年を迎える日本体育大学陸上競技部。箱根駅伝をはじめとする主要大会に出場。最新情報、大会日程、記録、メンバー紹介を掲載。",
    type: "website",
    locale: "ja_JP",
    siteName: "日本体育大学陸上競技部",
  },
  twitter: {
    card: "summary_large_image",
    title: "日本体育大学陸上競技部 | 創部100周年",
    description: "1925年創部、創部100周年を迎える日本体育大学陸上競技部。箱根駅伝をはじめとする主要大会に出場。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/track-and-field",
  },
};

export default function TrackAndFieldPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部' }]} />
      </div>
      
      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            "name": "日本体育大学陸上競技部",
            "sport": "陸上競技",
            "foundingDate": "1925",
            "memberOf": {
              "@type": "Organization",
              "name": "日本体育大学",
            },
            "description": "1925年創部、2025年で創部100周年を迎える日本体育大学陸上競技部。箱根駅伝、関東インカレ、日本インカレなど主要大会に出場。",
            "url": "https://nssu-ekiden.com/track-and-field",
            "sameAs": [
              "https://x.com/nittait_f",
              "https://www.instagram.com/nittaidai_official",
              "https://www.facebook.com/nittaidai.1891/",
              "https://www.youtube.com/@NipponTaiikuDaigaku",
            ],
          }),
        }}
      />
      
      <AnimatedPageHeader
        title="日本体育大学 陸上競技部"
        subtitle="Track and Field Club"
      />
      
      {/* SEO用の説明文（視覚的には隠す） */}
      <div className="sr-only">
        <h2>日本体育大学陸上競技部について</h2>
        <p>
          日本体育大学陸上競技部は1925年（大正14年）に創部され、2025年で創部100周年を迎える伝統ある陸上競技部です。
          箱根駅伝、全日本大学駅伝、出雲駅伝の三大駅伝をはじめ、関東学生陸上競技対校選手権大会（関東インカレ）、
          日本学生陸上競技対校選手権大会（日本インカレ）など、数多くの主要大会に出場しています。
        </p>
        <p>
          短距離、中距離、長距離、駅伝、跳躍、投擲、混成、パラ陸上など、全ての種目において日本一の部員数を誇り、
          健志台キャンパスの陸上競技場で日々トレーニングに励んでいます。初心者から日本代表レベルまで幅広い競技力の選手が在籍し、
          それぞれの目標に向かって切磋琢磨しています。
        </p>
      </div>
      
      <section className="mb-12" aria-label="コンテンツメニュー">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* スケジュール */}
          <Link href="/track-and-field/schedule" className="block h-full group" aria-label="2025年度大会スケジュールを見る">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <CalendarDays className="w-8 h-8 text-sky-600 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <CardTitle className="text-lg">スケジュール</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">大会日程を掲載</CardContent>
            </Card>
          </Link>
          {/* ニュース */}
          <Link href="/track-and-field/news" className="block h-full group" aria-label="最新ニュースと活動報告を見る">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Newspaper className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <CardTitle className="text-lg">ニュース</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">最新の活動・大会情報</CardContent>
            </Card>
          </Link>
          {/* 日体大競技会 */}
          <Link href="/track-and-field/competition" className="block h-full group" aria-label="日体大主催競技会の情報を見る">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Medal className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <CardTitle className="text-lg">日体大競技会</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">主催競技会の情報</CardContent>
            </Card>
          </Link>
          {/* 歴代記録 */}
          <Link href="/track-and-field/records" className="block h-full group" aria-label="歴代記録とランキングを見る">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <BookOpen className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <CardTitle className="text-lg">歴代記録</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">種目別の歴代トップ記録</CardContent>
            </Card>
          </Link>
          {/* メンバー・ブロック紹介 */}
          <Link href="/track-and-field/members" className="block h-full group" aria-label="陸上競技部メンバーとブロック紹介を見る">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Users className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <CardTitle className="text-lg">メンバー,ブロック紹介</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">各ブロックの選手紹介</CardContent>
            </Card>
          </Link>
          {/* 入部案内 */}
          <Link href="/track-and-field/recruitment" className="block h-full group" aria-label="入部案内と募集要項を見る">
            <Card className="hover:shadow-lg transition-shadow h-full bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="flex flex-col items-center pb-2">
                <UserPlus className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <CardTitle className="text-lg">入部案内</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">入部希望者向け情報</CardContent>
            </Card>
          </Link>
          {/* OB・OGの皆様へ */}
          <Link href="/track-and-field/supporters" className="block h-full group" aria-label="OB・OGと卒業生向け情報を見る">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Star className="w-8 h-8 text-yellow-500 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <CardTitle className="text-lg">OB,OGの皆様へ</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">卒業生,関係者向けのご案内</CardContent>
            </Card>
          </Link>
        </div>
      </section>
      
      {/* SNS欄 */}
      <section className="mt-10 mb-8" aria-label="公式SNSアカウント">
        <div className="bg-sky-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-bold mb-3 text-sky-800">公式SNS</h2>
          <p className="text-xs text-gray-600 mb-3">日本体育大学陸上競技部の最新情報をSNSで発信しています</p>
          <nav aria-label="SNSリンク">
            <div className="flex items-center space-x-6">
              <a 
                href="https://x.com/nittait_f" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="X（旧Twitter）で最新情報をチェック" 
                className="text-sky-700 hover:text-sky-500 transition-colors"
              >
                <Twitter className="h-7 w-7" aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/nittaidai_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagramで写真や動画をチェック" 
                className="text-sky-700 hover:text-sky-500 transition-colors"
              >
                <Instagram className="h-7 w-7" aria-hidden="true" />
              </a>
              <a 
                href="https://www.facebook.com/nittaidai.1891/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebookで活動報告をチェック" 
                className="text-sky-700 hover:text-sky-500 transition-colors"
              >
                <Facebook className="h-7 w-7" aria-hidden="true" />
              </a>
              <a 
                href="https://www.youtube.com/@NipponTaiikuDaigaku" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTubeで動画をチェック" 
                className="text-sky-700 hover:text-sky-500 transition-colors"
              >
                <Youtube className="h-7 w-7" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      </section>
      
      {/* 公式サイト案内 */}
      <section className="mt-8 mb-6" aria-label="公式サイト案内">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-semibold text-blue-900 mb-2 text-sm">公式サイトのご案内</h2>
              <p className="text-xs text-gray-700 mb-3">
                日本体育大学陸上競技部の公式サイトは下記URLです。<br />
                最新の公式情報は公式サイトをご確認ください。
              </p>
              <a 
                href="https://nssu-athletic.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="日本体育大学陸上競技部公式サイトを見る"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-1" aria-hidden="true" />
                https://nssu-athletic.com/
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 非公式サイト注意書き */}
      <section className="mt-6" aria-label="非公式サイトに関する注意事項">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4" role="note">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-semibold text-amber-900 mb-2 text-sm">非公式サイトについて</h2>
              <p className="text-xs text-gray-700">
                このサイトは、日本体育大学陸上競技部の活動を応援するファンが趣味で運営している<strong>非公式サイト</strong>です。<br />
                公式な情報や正確な記録は、必ず<a href="https://nssu-athletic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" aria-label="公式サイトで正確な情報を確認">公式サイト</a>をご確認ください。<br />
                サイト内の情報に誤りがある可能性があります。予めご了承ください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 