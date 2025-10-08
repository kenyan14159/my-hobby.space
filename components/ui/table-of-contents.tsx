"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * 目次（Table of Contents）自動生成コンポーネント
 * SEO最適化: 構造化された見出しでクローラビリティ向上
 * ユーザビリティ: スムーズスクロール、現在位置ハイライト
 */

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** コンテンツ領域のセレクタ（デフォルト: 'main'） */
  containerSelector?: string;
  /** 表示する見出しレベル（デフォルト: ['H2', 'H3']） */
  headingLevels?: string[];
  /** 固定表示（デフォルト: false） */
  sticky?: boolean;
  /** タイトル */
  title?: string;
}

export function TableOfContents({
  containerSelector = 'main',
  headingLevels = ['H2', 'H3'],
  sticky = false,
  title = '目次'
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 見出し要素を取得してIDを付与
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headingElements = Array.from(
      container.querySelectorAll(headingLevels.join(', '))
    ) as HTMLElement[];

    const items: TocItem[] = headingElements
      .filter(el => el.textContent && el.textContent.trim().length > 0)
      .map((element, index) => {
        // IDがない場合は自動生成
        if (!element.id) {
          const text = element.textContent || '';
          const id = `heading-${index}-${text
            .toLowerCase()
            .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, '-')
            .slice(0, 50)}`;
          element.id = id;
        }

        return {
          id: element.id,
          text: element.textContent || '',
          level: parseInt(element.tagName.charAt(1))
        };
      });

    setHeadings(items);
    setIsVisible(items.length >= 3); // 見出しが3つ以上ある場合のみ表示

    // Intersection Observer でアクティブな見出しを追跡
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0
      }
    );

    headingElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [containerSelector, headingLevels]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // ヘッダー分のオフセット
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!isVisible || headings.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={sticky ? 'sticky top-24' : ''}
      >
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <List className="w-5 h-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
            </div>
            <nav aria-label="目次">
              <ul className="space-y-2">
                {headings.map((heading) => {
                  const isActive = activeId === heading.id;
                  const indentClass = heading.level === 3 ? 'ml-4' : '';
                  
                  return (
                    <li key={heading.id} className={indentClass}>
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`
                          w-full text-left flex items-start gap-2 py-2 px-3 rounded-lg
                          transition-all duration-200 group text-sm sm:text-base
                          ${isActive 
                            ? 'bg-blue-100 text-blue-700 font-semibold' 
                            : 'text-gray-700 hover:bg-white hover:text-blue-600'
                          }
                        `}
                        aria-current={isActive ? 'location' : undefined}
                      >
                        <ChevronRight 
                          className={`
                            w-4 h-4 flex-shrink-0 mt-0.5 transition-transform
                            ${isActive ? 'text-blue-600 translate-x-1' : 'text-gray-400 group-hover:translate-x-1'}
                          `}
                        />
                        <span className="line-clamp-2 break-words">{heading.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * モバイル対応のコンパクト版目次
 */
export function CompactTableOfContents(props: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-900">目次を表示</span>
        </div>
        <ChevronRight 
          className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2">
              <TableOfContents {...props} sticky={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
