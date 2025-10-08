"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NewsGrid from "@/components/news-grid";
import { getAllNews, NewsMeta } from "@/lib/news";

/**
 * 関連記事ウィジェット
 * SEO最適化: キーワードマッチング、カテゴリ分析で関連度の高い記事を表示
 */
export function RelatedNews() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const slug = `${segments[segments.length - 2]}/${segments[segments.length - 1]}`;

  const items = useMemo<NewsMeta[]>(() => {
    const all = getAllNews();
    const current = all.find((n) => n.slug === slug);
    
    if (!current) {
      // 現在の記事が見つからない場合は最新3件
      return all.filter((n) => n.slug !== slug).slice(0, 3);
    }

    // 関連度スコアを計算
    const scored = all
      .filter((n) => n.slug !== slug)
      .map((article) => {
        let score = 0;
        
        // キーワードマッチング
        const currentTitle = current.title.toLowerCase();
        const articleTitle = article.title.toLowerCase();
        
        // 重要キーワードのマッチング（SEO効果が高い）
        const keywords = [
          '箱根駅伝', '予選会', 'メンバー', 'エントリー',
          '全日本', '出雲', '駅伝', '合宿', '夏合宿',
          '差し入れ', 'スポンサー', '新入生', '目標'
        ];
        
        keywords.forEach((keyword) => {
          if (currentTitle.includes(keyword) && articleTitle.includes(keyword)) {
            score += 10; // 同じ重要キーワードを含む
          }
        });
        
        // 日付が近い記事（時系列的な関連性）
        const currentDate = new Date(current.date);
        const articleDate = new Date(article.date);
        const daysDiff = Math.abs((currentDate.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 30) {
          score += 5; // 1ヶ月以内
        } else if (daysDiff < 90) {
          score += 2; // 3ヶ月以内
        }
        
        // 年度が同じ（季節的な関連性）
        if (current.slug.startsWith(article.slug.substring(0, 4))) {
          score += 3;
        }
        
        return { article, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.article);

    return scored.length > 0 ? scored : all.filter((n) => n.slug !== slug).slice(0, 3);
  }, [slug]);

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        関連記事
      </h3>
      <NewsGrid items={items} />
    </div>
  );
}



