"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Link as LinkIcon } from "lucide-react";

/**
 * 内部リンクウィジェット
 * SEO最適化: 関連性の高いページへの内部リンクを自動生成
 * クローラビリティ向上、ページランク分散、ユーザー回遊率向上
 */

interface InternalLink {
  href: string;
  title: string;
  description: string;
  category: 'ekiden' | 'members' | 'records' | 'news' | 'topics';
}

interface InternalLinksProps {
  /** 現在のページカテゴリ */
  currentCategory?: 'ekiden' | 'members' | 'records' | 'news' | 'topics';
  /** キーワードベースでリンクをフィルタリング */
  keywords?: string[];
  /** 表示するリンク数（デフォルト: 5） */
  maxLinks?: number;
  /** カスタムリンクを追加 */
  customLinks?: InternalLink[];
}

// 主要な内部リンクのマスターリスト（SEO効果が高いページ）
const MASTER_LINKS: InternalLink[] = [
  // 駅伝カテゴリ
  {
    href: '/ekiden/hakone',
    title: '箱根駅伝の歴史と記録',
    description: '日体大の箱根駅伝出場歴、区間記録、チーム成績を掲載',
    category: 'ekiden'
  },
  {
    href: '/ekiden/all-japan',
    title: '全日本大学駅伝の情報',
    description: '全日本大学駅伝の出場記録と結果',
    category: 'ekiden'
  },
  {
    href: '/ekiden/izumo',
    title: '出雲駅伝の記録',
    description: '出雲駅伝の歴史と日体大の挑戦',
    category: 'ekiden'
  },
  
  // メンバーカテゴリ
  {
    href: '/members',
    title: '日体大駅伝部メンバー一覧',
    description: '全選手のプロフィール、自己ベスト記録を掲載',
    category: 'members'
  },
  {
    href: '/track-and-field/members',
    title: '陸上競技部メンバー',
    description: 'ブロック別の選手紹介',
    category: 'members'
  },
  
  // 記録カテゴリ
  {
    href: '/records',
    title: '日体大駅伝部の記録',
    description: '駅伝、トラック、ロードの歴代記録データベース',
    category: 'records'
  },
  {
    href: '/track-and-field/records',
    title: '陸上競技部の記録',
    description: '種目別の歴代トップ記録',
    category: 'records'
  },
  {
    href: '/track-and-field/records/data/men',
    title: '男子記録一覧',
    description: '男子陸上競技の全種目記録',
    category: 'records'
  },
  {
    href: '/track-and-field/records/data/women',
    title: '女子記録一覧',
    description: '女子陸上競技の全種目記録',
    category: 'records'
  },
  
  // ニュース・トピックス
  {
    href: '/topics/news',
    title: '最新ニュース',
    description: '日体大駅伝部の最新情報をチェック',
    category: 'news'
  },
  {
    href: '/topics/results',
    title: '試合結果',
    description: '各大会の結果速報',
    category: 'topics'
  },
  {
    href: '/topics/schedule',
    title: '大会スケジュール',
    description: '今後の試合予定',
    category: 'topics'
  },
  
  // その他重要ページ
  {
    href: '/information/about',
    title: 'チームについて',
    description: '日体大駅伝部の理念と歴史',
    category: 'topics'
  },
  {
    href: '/information/supporters',
    title: 'サポーター情報',
    description: '応援方法とサポーター特典',
    category: 'topics'
  }
];

export function InternalLinks({ 
  currentCategory,
  keywords = [],
  maxLinks = 5,
  customLinks = []
}: InternalLinksProps) {
  // キーワードと現在のカテゴリに基づいてリンクをフィルタリング・スコアリング
  const filteredLinks = [...MASTER_LINKS, ...customLinks]
    .map((link) => {
      let score = 0;
      
      // カテゴリが異なる場合はスコアを加算（内部リンクの多様性）
      if (currentCategory && link.category !== currentCategory) {
        score += 5;
      }
      
      // キーワードマッチング
      keywords.forEach((keyword) => {
        const lowerKeyword = keyword.toLowerCase();
        if (link.title.toLowerCase().includes(lowerKeyword)) {
          score += 10;
        }
        if (link.description.toLowerCase().includes(lowerKeyword)) {
          score += 5;
        }
      });
      
      // 重要ページへのリンクは優先
      if (link.href === '/members' || link.href === '/records' || link.href === '/ekiden/hakone') {
        score += 3;
      }
      
      return { ...link, score };
    })
    .filter(link => link.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLinks);

  // スコアがない場合はランダムに選択
  const displayLinks = filteredLinks.length > 0 
    ? filteredLinks 
    : MASTER_LINKS
        .filter(link => !currentCategory || link.category !== currentCategory)
        .slice(0, maxLinks);

  if (displayLinks.length === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-blue-600" />
          あわせて読みたい
        </h3>
        <div className="space-y-3">
          {displayLinks.map((link, index) => (
            <Link
              key={`${link.href}-${index}`}
              href={link.href}
              className="block p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                    {link.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-1">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * ページ下部用の簡易版内部リンク
 */
export function InternalLinksFooter({ 
  currentCategory,
  keywords = []
}: Omit<InternalLinksProps, 'maxLinks' | 'customLinks'>) {
  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <InternalLinks 
        currentCategory={currentCategory}
        keywords={keywords}
        maxLinks={6}
      />
    </div>
  );
}
