"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllNews, NewsMeta } from "@/lib/news";
import { getAllResults, ResultMeta } from "@/lib/results";

type ContentType = "news" | "result";

interface PrevNextNavProps {
  type: ContentType;
  className?: string;
}

export function PrevNextNav({ type, className }: PrevNextNavProps) {
  const pathname = usePathname();

  // 現在の slug を year/slug 形式で取得（例: 2025/03-15-new-system）
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const year = segments[segments.length - 2];
  const current = `${year}/${last}`;

  const list: Array<NewsMeta | ResultMeta> =
    type === "news" ? getAllNews() : getAllResults();

  const index = list.findIndex((item) => item.slug === current);
  if (index === -1) return null;

  const prev = index > 0 ? list[index - 1] : undefined;
  const next = index < list.length - 1 ? list[index + 1] : undefined;

  const base = type === "news" ? "/topics/news" : "/topics/results";

  return (
    <div className={className}>
      <div className="flex justify-between items-center gap-3">
        <div className="min-w-0">
          {next ? (
            <Link
              href={`${base}/${next.slug}`}
              className="inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-900"
              aria-label="一つ前（古い）"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="truncate">{next.title}</span>
            </Link>
          ) : (
            <span className="text-sm text-gray-400">これより前はありません</span>
          )}
        </div>
        <div className="min-w-0 text-right">
          {prev ? (
            <Link
              href={`${base}/${prev.slug}`}
              className="inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-900"
              aria-label="一つ次（新しい）"
            >
              <span className="truncate">{prev.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-sm text-gray-400">これより新しい記事はありません</span>
          )}
        </div>
      </div>
    </div>
  );
}


