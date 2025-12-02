"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"; // Assuming these are correctly imported from your project
import { Menu, X, ChevronDown, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming this is correctly imported from your project
import { SearchButton } from "@/components/ui/search-dialog";
import type { MenuItem, MenuSection, SubmenuSection } from "@/types/navigation";
import { cn } from "@/lib/utils";

// --- shadcn/ui Components ---
// 実運用ではモックを使用せず、Radix ベースの shadcn/ui コンポーネントに直接依存します
const NavigationMenuComponent = NavigationMenu;
const NavigationMenuContentComponent = NavigationMenuContent;
const NavigationMenuItemComponent = NavigationMenuItem;
const NavigationMenuLinkComponent = NavigationMenuLink;
const NavigationMenuListComponent = NavigationMenuList;
const NavigationMenuTriggerComponent = NavigationMenuTrigger;
const navigationMenuTriggerStyleFunc = navigationMenuTriggerStyle;
const ButtonComponent = Button;
// --- End Components ---

// メニュー構造の定義
const menuStructure: MenuSection[] = [
  {
    title: "メンバー紹介",
    href: "/members"
  },
  {
    title: "トピックス",
    href: "/topics",
    submenu: [
      {
        title: "",
        items: [
          { title: "スケジュール", href: "/topics/schedule" },
          { title: "リザルト", href: "/topics/results" },
          { title: "ニュース", href: "/topics/news" },
        ]
      }
    ]
  },
  {
    title: "歴代記録",
    href: "/records"
  },
  {
    title: "駅伝の歴史",
    href: "/ekiden",
    submenu: [
      {
        title: "",
        items: [
          { title: "箱根駅伝", href: "/ekiden/hakone" },
          { title: "全日本大学駅伝", href: "/ekiden/all-japan" },
          { title: "出雲駅伝", href: "/ekiden/izumo" },
          { title: "全日本大学女子駅伝", href: "/ekiden/womens-all-japan" },
          { title: "富士山女子駅伝", href: "/ekiden/fujisan" },
          { title: "男女混合駅伝", href: "/ekiden/mixed" },
        ]
      },
    ]
  },
  {
    title: "チーム情報",
    href: "/information",
    submenu: [
      {
        title: "",
        items: [
          { title: "サポーターの皆様", href: "/information/supporters" },
          { title: "応援してくださる皆様へ", href: "/information/for-fans" },
          { title: "ホームページについて", href: "/information/about" },
          { title: "お問い合わせ", href: "/information/contact" },
        ]
      }
    ]
  },
  {
    title: "限定コンテンツ",
    href: "/limited-content",
    submenu: [
       {
        title: "",
        items: [
          { title: "限定コンテンツ", href: "/limited-content/content" },
          { title: "アルバム", href: "/limited-content/album" },
          { title: "駅伝掲示板", href: "/board" },
        ]
      }
    ]
  },
  {
    title: "Webサイト",
    href: "/web",
    submenu: [
      {
        title: "",
        items: [
          { title: "陸上競技部 非公式", href: "/track-and-field" },
          { title: "駅伝リザルト", href: "https://www.ekiden-results.com/" },
          { title: "スコアリングテーブル", href: "https://ekiden-results.com/information/scoring-table/" },
        ]
      }
    ]
  },
  {
    title: "日体大記録会",
    href: "/competition"
  },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenuAndReset = () => setMobileMenuOpen(false);

  // モバイルメニューが開いている時にスクロールを無効にし、ESCキーで閉じる
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMobileMenuAndReset();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-full bg-white border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" onClick={closeMobileMenuAndReset}>
            <div className="relative h-8 w-16 flex-shrink-0">
              <Image
                src="https://nssu-ekiden.works/wp-content/uploads/2025/02/nssu.jpeg"
                alt="日本体育大学陸上競技部男子駅伝ブロック 公式ロゴ"
                fill
                className="object-contain"
                sizes="64px"
                priority
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/64x32/e0f2fe/0c4a6e?text=Logo';
                    target.alt = 'ロゴのプレースホルダー';
                }}
              />
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <DesktopNavigation />
            <div className="flex items-center gap-1 ml-2 border-l border-gray-200 pl-3">
              <SearchButton />
            </div>
          </div>

          {/* モバイル メニューボタン */}
          <div className="lg:hidden flex items-center gap-1">
            <SearchButton />
            <ButtonComponent
              variant="ghost"
              size="icon"
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              className="text-gray-900 hover:text-sky-700 hover:bg-sky-50 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </ButtonComponent>
            
            {/* モバイルメニューオーバーレイ */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="fixed inset-0 bg-black/50" 
                  onClick={closeMobileMenuAndReset}
                  role="presentation"
                />
                <div className="fixed inset-0 bg-white" role="dialog" aria-modal="true" aria-label="ナビゲーションメニュー">
                  <MobileNavigation closeMobileMenu={closeMobileMenuAndReset} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// デスクトップナビゲーションコンポーネント
function DesktopNavigation() {
  const pathname = usePathname();
  
  // 現在のパスがメニュー項目と一致するかチェック
  const isActiveSection = (section: MenuSection) => {
    if (pathname === section.href) return true;
    
    // サブメニューがある場合、サブメニューのいずれかが現在のパスと一致するかチェック
    if (section.submenu) {
      return section.submenu.some(submenu => 
        submenu.items.some(item => pathname === item.href)
      );
    }
    
    return false;
  };

  return (
    <div className="relative">
      <NavigationMenuComponent className="relative">
        <NavigationMenuListComponent>
          {menuStructure.map((section, index) => (
            <NavigationMenuItemComponent key={index} className="relative">
              {section.submenu ? (
                <>
                  <NavigationMenuTriggerComponent className={cn(
                    "text-gray-900 hover:text-sky-700 hover:bg-sky-50",
                    isActiveSection(section) && "bg-sky-100 text-sky-800"
                  )}>
                    {section.href ? (
                      <Link
                        href={section.href}
                        className="inline-flex items-center justify-center w-full"
                      >
                        {section.title}
                      </Link>
                    ) : (
                      section.title
                    )}
                  </NavigationMenuTriggerComponent>
                  <NavigationMenuContentComponent>
                    <div className="w-64 p-2 bg-white shadow-lg border border-gray-200 rounded-md">
                      {/* 親ページリンク */}
                      {section.href && (
                        <ul className="space-y-1 mb-2 border-b border-sky-100 pb-2">
                          <DesktopMenuItem item={{ title: `${section.title}トップ`, href: section.href }} />
                        </ul>
                      )}
                      {section.submenu?.map((submenu, subIndex) => (
                        <ul key={subIndex} className="space-y-1">
                          {submenu.items.map((item, itemIndex) => (
                            <DesktopMenuItem key={itemIndex} item={item} />
                          ))}
                        </ul>
                      ))}
                    </div>
                  </NavigationMenuContentComponent>
                </>
              ) : (
                <NavigationMenuLinkComponent asChild>
                  <Link href={section.href!} className={cn(
                    navigationMenuTriggerStyleFunc(),
                    "text-gray-900 hover:text-sky-700 hover:bg-sky-50",
                    isActiveSection(section) && "bg-sky-100 text-sky-800"
                  )}>
                    {section.title}
                  </Link>
                </NavigationMenuLinkComponent>
              )}
            </NavigationMenuItemComponent>
          ))}
        </NavigationMenuListComponent>
      </NavigationMenuComponent>
    </div>
  );
}

// 外部リンクかどうかを判定する関数
const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://');
};

// デスクトップメニュー項目コンポーネント
const DesktopMenuItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { item: MenuItem }
>(({ item, className, ...props }, ref) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const external = isExternalLink(item.href);
  
  const linkClassName = cn(
    "block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900",
    "text-sm",
    isActive && "bg-sky-100 text-sky-800 font-medium",
    className
  );
  
  return (
    <li>
      {external ? (
        <NavigationMenuLinkComponent asChild>
          <a
            href={item.href}
            ref={ref}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            {...props}
          >
            <div className="leading-none">
              {item.title}
            </div>
            {item.description && (
              <p className="line-clamp-2 text-xs leading-snug text-gray-500 mt-1">
                {item.description}
              </p>
            )}
          </a>
        </NavigationMenuLinkComponent>
      ) : (
        <NavigationMenuLinkComponent asChild>
          <Link
            href={item.href}
            ref={ref}
            className={linkClassName}
            {...props}
          >
            <div className="leading-none">
              {item.title}
            </div>
            {item.description && (
              <p className="line-clamp-2 text-xs leading-snug text-gray-500 mt-1">
                {item.description}
              </p>
            )}
          </Link>
        </NavigationMenuLinkComponent>
      )}
    </li>
  );
});
DesktopMenuItem.displayName = "DesktopMenuItem";

// モバイルナビゲーションコンポーネント
function MobileNavigation({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const handleLinkClick = () => {
    closeMobileMenu();
    setOpenSections({});
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* ヘッダー部分 - 通常のヘッダーと同じレイアウト */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sky-100 bg-white">
        <Link href="/" onClick={handleLinkClick} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="relative h-8 w-16 flex-shrink-0">
            <Image
              src="https://nssu-ekiden.works/wp-content/uploads/2025/02/nssu.jpeg"
              alt="日本体育大学駅伝部"
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
        </Link>
        <button
          onClick={closeMobileMenu}
          className="p-2 hover:bg-sky-50 rounded-md transition-colors"
          aria-label="メニューを閉じる"
        >
          <X size={24} className="text-gray-900" />
        </button>
      </div>

      {/* メニューコンテンツ - スクロール可能 */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
        <div className="space-y-2">
          {menuStructure.map((section, index) => (
            <div key={index} className="border-b border-sky-50 pb-2">
              {section.href ? (
                <div className="flex items-center">
                  <Link
                    href={section.href}
                    className="flex-1 py-3 text-gray-900 font-semibold text-base hover:text-sky-600 transition-colors"
                    onClick={handleLinkClick}
                  >
                    {section.title}
                  </Link>
                  {section.submenu && (
                    <button
                      className="p-3 text-gray-600 hover:text-sky-600 transition-colors"
                      onClick={() => toggleSection(section.title)}
                      aria-expanded={openSections[section.title] || false}
                      aria-label={`${section.title}のサブメニューを${openSections[section.title] ? '閉じる' : '開く'}`}
                    >
                      <ChevronDown
                        size={20}
                        className={cn(
                          "transition-transform duration-200",
                          openSections[section.title] ? "transform rotate-180" : ""
                        )}
                      />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className="flex w-full justify-between items-center py-3 text-gray-900 font-semibold text-base hover:text-sky-600 transition-colors text-left"
                  onClick={() => toggleSection(section.title)}
                  aria-expanded={openSections[section.title] || false}
                  aria-label={`${section.title}のメニューを${openSections[section.title] ? '閉じる' : '開く'}`}
                >
                  {section.title}
                  <ChevronDown
                    size={20}
                    className={cn(
                      "transition-transform duration-200 flex-shrink-0",
                      openSections[section.title] ? "transform rotate-180" : ""
                    )}
                  />
                </button>
              )}
              {openSections[section.title] && section.submenu && (
                <div className="pl-4 pb-2 space-y-1 bg-sky-50/50 rounded-lg mt-1 py-2">
                  {section.submenu.flatMap(submenu => submenu.items).map((item, itemIndex) => {
                    const external = isExternalLink(item.href);
                    return external ? (
                      <a
                        key={itemIndex}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2.5 px-3 text-gray-700 hover:text-sky-700 hover:bg-white rounded transition-colors text-sm"
                        onClick={handleLinkClick}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="block py-2.5 px-3 text-gray-700 hover:text-sky-700 hover:bg-white rounded transition-colors text-sm"
                        onClick={handleLinkClick}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SNSアイコン */}
      <div className="px-6 py-4 border-t border-sky-100 bg-sky-50/30">
        <h4 className="text-xs font-semibold mb-3 text-gray-600 uppercase tracking-wider">SNS</h4>
        <div className="flex items-center space-x-4">
          <a 
            href="https://x.com/nssu_ekiden" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="X(旧Twitter)" 
            className="p-2 text-gray-700 hover:text-sky-600 hover:bg-white rounded-full transition-colors"
          >
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153zm-1.65 19.54h2.6l-11.2-12.612H7.23l11.2 12.612z"/>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/nssu_ekiden?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="p-2 text-gray-700 hover:text-sky-600 hover:bg-white rounded-full transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a 
            href="https://line.me/R/ti/p/@001cfrru?oat_content=url&ts=02151453" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LINE" 
            className="p-2 text-gray-700 hover:text-sky-600 hover:bg-white rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" role="img" className="h-5 w-5 fill-current">
              <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 25 10 C 16.297049 10 9 15.678331 9 22.947266 C 9 29.432462 14.784063 34.70004 22.335938 35.712891 C 22.335938 35.712891 22.337891 35.712891 22.337891 35.712891 C 22.536678 35.755374 22.765454 35.823119 22.900391 35.886719 C 22.927968 35.899717 22.92499 35.900858 22.939453 35.910156 C 22.936808 35.992303 22.962381 36.370293 22.923828 36.660156 C 22.914328 36.716266 22.750575 37.685545 22.716797 37.876953 L 22.716797 37.878906 C 22.670157 38.145846 22.493944 38.683413 22.949219 39.369141 C 23.176856 39.712004 23.648332 39.989421 24.089844 40.027344 C 24.531355 40.065264 24.936512 39.956154 25.388672 39.765625 C 26.423745 39.336822 28.490518 38.115392 30.876953 36.482422 C 33.261295 34.850883 35.83616 32.871381 37.521484 30.970703 C 39.813508 28.503964 41 25.843504 41 22.947266 C 41 15.679227 33.703032 10 25 10 z M 25 12 C 32.838968 12 39 17.041304 39 22.947266 C 39 25.319988 38.105988 27.408105 36.052734 29.615234 L 36.042969 29.625 L 36.035156 29.634766 C 34.573278 31.286637 32.063988 33.245345 29.748047 34.830078 C 27.492074 36.373777 25.386061 37.559635 24.75 37.839844 C 24.81529 37.455902 24.900391 36.957031 24.900391 36.957031 L 24.904297 36.939453 L 24.90625 36.921875 C 24.96188 36.503517 25.111583 35.868916 24.792969 35.083984 L 24.792969 35.082031 L 24.792969 35.080078 C 24.555561 34.50218 24.11359 34.248575 23.751953 34.078125 C 23.390316 33.907675 23.042681 33.819356 22.753906 33.757812 L 22.714844 33.748047 L 22.673828 33.744141 C 15.849442 32.857984 11 28.250827 11 22.947266 C 11 17.040201 17.160951 12 25 12 z M 23.992188 18.998047 C 23.488379 19.007393 23 19.391875 23 20 L 23 26 C 23 26.552 23.448 27 24 27 C 24.552 27 25 26.552 25 26 L 25 23.121094 L 27.185547 26.580078 C 27.751547 27.372078 29 26.973 29 26 L 29 20 C 29 19.448 28.552 19 28 19 C 27.448 19 27 19.448 27 20 L 27 23 L 24.814453 19.419922 C 24.602203 19.122922 24.294473 18.992439 23.992188 18.998047 z M 15 19 C 14.448 19 14 19.448 14 20 L 14 26 C 14 26.552 14.448 27 15 27 L 18 27 C 18.552 27 19 26.552 19 26 C 19 25.448 18.552 25 18 25 L 16 25 L 16 20 C 16 19.448 15.552 19 15 19 z M 21 19 C 20.448 19 20 19.448 20 20 L 20 26 C 20 26.552 20.448 27 21 27 C 21.552 27 22 26.552 22 26 L 22 20 C 22 19.448 21.552 19 21 19 z M 31 19 C 30.448 19 30 19.448 30 20 L 30 26 C 30 26.552 30.448 27 31 27 L 34 27 C 34.552 27 35 26.552 35 26 C 35 25.448 34.552 25 34 25 L 32 25 L 32 24 L 34 24 C 34.553 24 35 23.552 35 23 C 35 22.448 34.553 22 34 22 L 32 22 L 32 21 L 34 21 C 34.552 21 35 20.552 35 20 C 35 19.448 34.552 19 34 19 L 31 19 z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}


