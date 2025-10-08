import React from "react";
import Link from "next/link";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, Newspaper, Medal, Users, BookOpen, Star, Twitter, Instagram, Facebook, Youtube } from "lucide-react";

export default function TrackAndFieldPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部' }]} />
      </div>
      <AnimatedPageHeader
        title="日本体育大学 陸上競技部"
        subtitle="今年で100年目を迎える伝統ある部活動"
      />
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* スケジュール */}
          <Link href="/track-and-field/schedule" className="block h-full group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <CalendarDays className="w-8 h-8 text-sky-600 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">スケジュール</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">大会日程を掲載</CardContent>
            </Card>
          </Link>
          {/* ニュース */}
          <Link href="/track-and-field/news" className="block h-full group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Newspaper className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">ニュース</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">最新の活動・大会情報</CardContent>
            </Card>
          </Link>
          {/* 日体大競技会 */}
          <Link href="/track-and-field/competition" className="block h-full group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Medal className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">日体大競技会</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">主催競技会の情報</CardContent>
            </Card>
          </Link>
          {/* 歴代記録 */}
          <Link href="/track-and-field/records" className="block h-full group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <BookOpen className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">歴代記録</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">種目別の歴代トップ記録</CardContent>
            </Card>
          </Link>
          {/* メンバー・ブロック紹介 */}
          <Link href="/track-and-field/members" className="block h-full group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Users className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">メンバー,ブロック紹介</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">各ブロックの選手紹介</CardContent>
            </Card>
          </Link>
          {/* OB・OGの皆様へ */}
          <Link href="/track-and-field/supporters" className="block h-full group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-col items-center pb-2">
                <Star className="w-8 h-8 text-yellow-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">OB,OGの皆様へ</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600 text-sm">卒業生,関係者向けのご案内</CardContent>
            </Card>
          </Link>
        </div>
      </section>
      {/* SNS欄 */}
      <section className="mt-10 mb-8">
        <div className="bg-sky-50 rounded-xl p-6 shadow-sm">
          <h4 className="text-base font-bold mb-3 text-sky-800">公式SNS</h4>
          <div className="flex items-center space-x-6">
            <a href="https://x.com/nittait_f" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-sky-700 hover:text-sky-500 transition-colors">
              <Twitter className="h-7 w-7" />
            </a>
            <a href="https://www.instagram.com/nittaidai_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-sky-700 hover:text-sky-500 transition-colors">
              <Instagram className="h-7 w-7" />
            </a>
            <a href="https://www.facebook.com/nittaidai.1891/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-sky-700 hover:text-sky-500 transition-colors">
              <Facebook className="h-7 w-7" />
            </a>
            <a href="https://www.youtube.com/@NipponTaiikuDaigaku" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="text-sky-700 hover:text-sky-500 transition-colors">
              <Youtube className="h-7 w-7" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 