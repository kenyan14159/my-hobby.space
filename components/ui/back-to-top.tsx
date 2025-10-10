"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // 末尾スラッシュを吸収して正規化
  const path = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }, [pathname]);

  // 対象ページのみ有効化(要件ベース)
  const enabled = useMemo(() => {
    return (
      path === "/" ||
      path === "/records" ||
      path.startsWith("/ekiden") ||
      path.startsWith("/limited-content/records") ||
      path.startsWith("/topics/results") ||
      path.startsWith("/topics/news") ||
      path.startsWith("/track-and-field/members") ||
      path === "/track-and-field/competition" ||
      path === "/track-and-field/recruitment" ||
      path === "/track-and-field/schedule"
    );
  }, [path]);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      // 画面サイズに応じてしきい値を可変化（PCでも表示されやすく）
      const dynamicThreshold = Math.max(120, Math.min(300, Math.floor(window.innerHeight * 0.3)));
      setVisible(y > dynamicThreshold);
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


