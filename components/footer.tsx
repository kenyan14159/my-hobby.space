"use client";

import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- フッター用にメニューを再構成 ---
// メインコンテンツをバランスよく表示
const footerLinkGroups = [
  {
    title: "チーム",
    items: [
      { title: "メンバー紹介", href: "/members" },
      { title: "スケジュール", href: "/topics/schedule" },
      { title: "リザルト", href: "/topics/results" },
      { title: "ニュース", href: "/topics/news" },
    ]
  },
  {
    title: "駅伝の歴史",
    items: [
      { title: "箱根駅伝", href: "/ekiden/hakone" },
      { title: "全日本大学駅伝", href: "/ekiden/all-japan" },
      { title: "出雲駅伝", href: "/ekiden/izumo" },
      { title: "全日本大学女子駅伝", href: "/ekiden/womens-all-japan" },
      { title: "富士山女子駅伝", href: "/ekiden/fujisan" },
      { title: "男女混合駅伝", href: "/ekiden/mixed" },
    ]
  },
  {
    title: "記録・情報",
    items: [
      { title: "歴代記録", href: "/records" },
      { title: "日体大記録会", href: "/competition" },
      { title: "サポーターの皆様", href: "/information/supporters" },
      { title: "応援してくださる皆様へ", href: "/information/for-fans" },
    ]
  },
  {
    title: "限定コンテンツ",
    items: [
      { title: "限定コンテンツ", href: "/limited-content/content" },
      { title: "アルバム", href: "/limited-content/album" },
      { title: "駅伝掲示板", href: "/board" },
    ]
  },
  {
    title: "Webサイト", 
    items: [
        { title: "陸上競技部 非公式", href: "/track-and-field" },
        { title: "駅伝リザルト", href: "https://www.ekiden-results.com/" },
        { title: "スコアリングテーブル", href: "https://ekiden-results.com/information/scoring-table/" }
    ]
  },
  {
    title: "お問い合わせ",
    items: [
      { title: "お問い合わせ", href: "/information/contact" },
      { title: "ホームページについて", href: "/information/about" },
    ]
  },
];


export function Footer() {
  return (
    <footer className="text-sky-900 mt-12">
      {/* コンパクトなフォトグラファープロフィール */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 py-3 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white">
              <Image
                src="https://nssu-ekiden.works/wp-content/uploads/2025/02/photo194-300x300-1.jpg"
                alt="スポーツカメラマン saya - 日体大駅伝部写真提供"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="text-sm font-medium">写真提供: saya</span>
            <a
              href="https://www.instagram.com/saya_sports_films?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-white text-pink-600 hover:bg-gray-100 transition-colors px-2 py-1 rounded-full text-xs"
            >
              <Instagram className="h-3 w-3" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* メインフッターコンテンツ */}
      <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {/* 連絡先 */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-sm lg:text-base font-bold mb-3 text-sky-800">連絡先</h3>
            <div className="space-y-2 text-xs lg:text-sm text-sky-700">
              <div className="flex items-start">
                <MapPin className="h-3 w-3 lg:h-4 lg:w-4 mr-1 mt-0.5 flex-shrink-0" />
                <p>神奈川県横浜市青葉区すみよし台21-7</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-3 w-3 lg:h-4 lg:w-4 mr-1 flex-shrink-0" />
                <p>045-961-6080</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-3 w-3 lg:h-4 lg:w-4 mr-1 flex-shrink-0" />
                <a href="mailto:info@nssuekiden.com" className="hover:text-sky-500 transition-colors break-all">
                info@nssuekiden.com
                </a>
              </div>
            </div>
            {/* SNSリンク */}
            <div className="mt-4">
              <h4 className="text-xs lg:text-sm font-bold mb-2 text-sky-800">SNS</h4>
              <div className="flex items-center space-x-3">
                 <a href="https://x.com/nssu_ekiden" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-sky-700 hover:text-sky-500 transition-colors">
                   <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 fill-current"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153zm-1.65 19.54h2.6l-11.2-12.612H7.23l11.2 12.612z"/></svg>
                 </a>
                 <a href="https://www.instagram.com/nssu_ekiden?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-sky-700 hover:text-sky-500 transition-colors">
                   <Instagram className="h-4 w-4 lg:h-5 lg:w-5" />
                 </a>
                 <a href="https://line.me/R/ti/p/@001cfrru?oat_content=url&ts=02151453" target="_blank" rel="noopener noreferrer" aria-label="LINE" className="text-sky-700 hover:text-sky-500 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" role="img" className="h-4 w-4 lg:h-5 lg:w-5 fill-current">
                     <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 25 10 C 16.297049 10 9 15.678331 9 22.947266 C 9 29.432462 14.784063 34.70004 22.335938 35.712891 C 22.335938 35.712891 22.337891 35.712891 22.337891 35.712891 C 22.536678 35.755374 22.765454 35.823119 22.900391 35.886719 C 22.927968 35.899717 22.92499 35.900858 22.939453 35.910156 C 22.936808 35.992303 22.962381 36.370293 22.923828 36.660156 C 22.914328 36.716266 22.750575 37.685545 22.716797 37.876953 L 22.716797 37.878906 C 22.670157 38.145846 22.493944 38.683413 22.949219 39.369141 C 23.176856 39.712004 23.648332 39.989421 24.089844 40.027344 C 24.531355 40.065264 24.936512 39.956154 25.388672 39.765625 C 26.423745 39.336822 28.490518 38.115392 30.876953 36.482422 C 33.261295 34.850883 35.83616 32.871381 37.521484 30.970703 C 39.813508 28.503964 41 25.843504 41 22.947266 C 41 15.679227 33.703032 10 25 10 z M 25 12 C 32.838968 12 39 17.041304 39 22.947266 C 39 25.319988 38.105988 27.408105 36.052734 29.615234 L 36.042969 29.625 L 36.035156 29.634766 C 34.573278 31.286637 32.063988 33.245345 29.748047 34.830078 C 27.492074 36.373777 25.386061 37.559635 24.75 37.839844 C 24.81529 37.455902 24.900391 36.957031 24.900391 36.957031 L 24.904297 36.939453 L 24.90625 36.921875 C 24.96188 36.503517 25.111583 35.868916 24.792969 35.083984 L 24.792969 35.082031 L 24.792969 35.080078 C 24.555561 34.50218 24.11359 34.248575 23.751953 34.078125 C 23.390316 33.907675 23.042681 33.819356 22.753906 33.757812 L 22.714844 33.748047 L 22.673828 33.744141 C 15.849442 32.857984 11 28.250827 11 22.947266 C 11 17.040201 17.160951 12 25 12 z M 23.992188 18.998047 C 23.488379 19.007393 23 19.391875 23 20 L 23 26 C 23 26.552 23.448 27 24 27 C 24.552 27 25 26.552 25 26 L 25 23.121094 L 27.185547 26.580078 C 27.751547 27.372078 29 26.973 29 26 L 29 20 C 29 19.448 28.552 19 28 19 C 27.448 19 27 19.448 27 20 L 27 23 L 24.814453 19.419922 C 24.602203 19.122922 24.294473 18.992439 23.992188 18.998047 z M 15 19 C 14.448 19 14 19.448 14 20 L 14 26 C 14 26.552 14.448 27 15 27 L 18 27 C 18.552 27 19 26.552 19 26 C 19 25.448 18.552 25 18 25 L 16 25 L 16 20 C 16 19.448 15.552 19 15 19 z M 21 19 C 20.448 19 20 19.448 20 20 L 20 26 C 20 26.552 20.448 27 21 27 C 21.552 27 22 26.552 22 26 L 22 20 C 22 19.448 21.552 19 21 19 z M 31 19 C 30.448 19 30 19.448 30 20 L 30 26 C 30 26.552 30.448 27 31 27 L 34 27 C 34.552 27 35 26.552 35 26 C 35 25.448 34.552 25 34 25 L 32 25 L 32 24 L 34 24 C 34.553 24 35 23.552 35 23 C 35 22.448 34.553 22 34 22 L 32 22 L 32 21 L 34 21 C 34.552 21 35 20.552 35 20 C 35 19.448 34.552 19 34 19 L 31 19 z"></path>
                   </svg>
                 </a>
              </div>
            </div>
          </div>

          {/* フッターメニュー - すべての代表的コンテンツを表示 */}
          {footerLinkGroups.map((group, index) => (
            <div key={index}>
              <h4 className="text-sm lg:text-base font-bold mb-3 text-sky-800">{group.title}</h4>
              <ul className="space-y-1">
                {group.items.map((item, itemIndex) => {
                  const isExternal = item.href.startsWith('http://') || item.href.startsWith('https://');
                  return (
                    <li key={itemIndex}>
                      {isExternal ? (
                        <a 
                          href={item.href} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs lg:text-sm text-sky-600 hover:text-sky-800 transition-colors"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link href={item.href} className="text-xs lg:text-sm text-sky-600 hover:text-sky-800 transition-colors">
                          {item.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* コピーライト */}
        <div className="border-t border-sky-100 mt-6 pt-4 text-center">
          <p className="text-xs text-sky-600">
            © {new Date().getFullYear()} 日本体育大学 陸上競技部 男子駅伝ブロック All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}