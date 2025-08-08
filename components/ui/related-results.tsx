"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getAllResults, ResultMeta } from "@/lib/results";

export function RelatedResults() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const slug = `${segments[segments.length - 2]}/${segments[segments.length - 1]}`;

  const items = useMemo<ResultMeta[]>(() => {
    const all = getAllResults();
    return all.filter((n) => n.slug !== slug).slice(0, 6);
  }, [slug]);

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold text-gray-800 mb-4">他の大会結果</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link key={item.slug} href={`/topics/results/${item.slug}`} className="block">
            <div
              className="relative h-40 rounded-lg overflow-hidden shadow border bg-center bg-cover"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 p-3 flex flex-col justify-end">
                <h4 className="text-white text-sm font-semibold drop-shadow">
                  {item.title}
                </h4>
                <p className="text-white/80 text-xs">
                  {typeof item.date === 'string' ? item.date : item.date.toISOString().split('T')[0]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


