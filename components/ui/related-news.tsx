"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NewsGrid from "@/components/news-grid";
import { getAllNews, NewsMeta } from "@/lib/news";

export function RelatedNews() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const slug = `${segments[segments.length - 2]}/${segments[segments.length - 1]}`;

  const items = useMemo<NewsMeta[]>(() => {
    const all = getAllNews();
    return all.filter((n) => n.slug !== slug).slice(0, 3);
  }, [slug]);

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold text-gray-800 mb-4">他のニュース</h3>
      <NewsGrid items={items} />
    </div>
  );
}


