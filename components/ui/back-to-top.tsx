"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // 対象ページのみ有効化
  // 表示対象（重複防止のため、ページ側で独自ボタンを持つパスは除外）
  const enabled =
    pathname === "/" ||
    pathname === "/ekiden" ||
    pathname.startsWith("/track-and-field/records");

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <button
      type="button"
      aria-label="ページトップへ戻る"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 flex items-center justify-center"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}


