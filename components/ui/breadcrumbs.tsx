"use client";

import Link from "next/link";
import Script from "next/script";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // BreadcrumbList 構造化データ（SEO最適化）
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .filter(item => item.href) // hrefがある項目のみ
      .map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `https://nssu-ekiden.com${item.href}`
      }))
  };

  return (
    <>
      {/* BreadcrumbList 構造化データ */}
      {items.length > 1 && (
        <Script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      
      <nav aria-label="パンくずリスト" className={className}>
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-sky-700 text-gray-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-800 font-medium" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="mx-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}



