"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Calendar, Users, Trophy, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchItem {
  title: string;
  href: string;
  category: string;
  icon: React.ReactNode;
}

// 検索可能なページリスト
const searchablePages: SearchItem[] = [
  // メンバー
  { title: "メンバー紹介", href: "/members", category: "チーム", icon: <Users className="h-4 w-4" /> },
  
  // トピックス
  { title: "スケジュール", href: "/topics/schedule", category: "トピックス", icon: <Calendar className="h-4 w-4" /> },
  { title: "リザルト", href: "/topics/results", category: "トピックス", icon: <Trophy className="h-4 w-4" /> },
  { title: "ニュース", href: "/topics/news", category: "トピックス", icon: <FileText className="h-4 w-4" /> },
  
  // 駅伝の歴史
  { title: "箱根駅伝", href: "/ekiden/hakone", category: "駅伝の歴史", icon: <Trophy className="h-4 w-4" /> },
  { title: "全日本大学駅伝", href: "/ekiden/all-japan", category: "駅伝の歴史", icon: <Trophy className="h-4 w-4" /> },
  { title: "出雲駅伝", href: "/ekiden/izumo", category: "駅伝の歴史", icon: <Trophy className="h-4 w-4" /> },
  { title: "全日本大学女子駅伝", href: "/ekiden/womens-all-japan", category: "駅伝の歴史", icon: <Trophy className="h-4 w-4" /> },
  { title: "富士山女子駅伝", href: "/ekiden/fujisan", category: "駅伝の歴史", icon: <Trophy className="h-4 w-4" /> },
  { title: "男女混合駅伝", href: "/ekiden/mixed", category: "駅伝の歴史", icon: <Trophy className="h-4 w-4" /> },
  
  // 記録
  { title: "歴代記録", href: "/records", category: "記録", icon: <Trophy className="h-4 w-4" /> },
  { title: "日体大記録会", href: "/competition", category: "記録", icon: <Calendar className="h-4 w-4" /> },
  
  // チーム情報
  { title: "サポーターの皆様", href: "/information/supporters", category: "チーム情報", icon: <Users className="h-4 w-4" /> },
  { title: "応援してくださる皆様へ", href: "/information/for-fans", category: "チーム情報", icon: <FileText className="h-4 w-4" /> },
  { title: "ホームページについて", href: "/information/about", category: "チーム情報", icon: <FileText className="h-4 w-4" /> },
  { title: "お問い合わせ", href: "/information/contact", category: "チーム情報", icon: <FileText className="h-4 w-4" /> },
  
  // 限定コンテンツ
  { title: "限定コンテンツ", href: "/limited-content/content", category: "限定コンテンツ", icon: <FileText className="h-4 w-4" /> },
  { title: "アルバム", href: "/limited-content/album", category: "限定コンテンツ", icon: <FileText className="h-4 w-4" /> },
  { title: "駅伝掲示板", href: "/board", category: "限定コンテンツ", icon: <FileText className="h-4 w-4" /> },
  
  // 陸上競技部
  { title: "陸上競技部 非公式", href: "/track-and-field", category: "Webサイト", icon: <Users className="h-4 w-4" /> },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredPages = React.useMemo(() => {
    if (!query.trim()) return searchablePages.slice(0, 8);
    
    const lowerQuery = query.toLowerCase();
    return searchablePages.filter(
      (page) =>
        page.title.toLowerCase().includes(lowerQuery) ||
        page.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredPages.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : filteredPages.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredPages[selectedIndex]) {
          router.push(filteredPages[selectedIndex].href);
          onOpenChange(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        onOpenChange(false);
        break;
    }
  };

  const handleSelect = (href: string) => {
    router.push(href);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>サイト内検索</DialogTitle>
        </DialogHeader>
        
        {/* 検索入力 */}
        <div className="flex items-center border-b px-4 py-3">
          <Search className="mr-3 h-5 w-5 shrink-0 text-gray-400" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ページを検索..."
            className="flex-1 border-0 bg-transparent p-0 text-base placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="検索キーワードを入力"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuery("")}
              aria-label="検索をクリア"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* 検索結果 */}
        <div className="max-h-[400px] overflow-y-auto p-2" role="listbox">
          {filteredPages.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Search className="mx-auto mb-3 h-8 w-8 opacity-50" />
              <p>「{query}」に一致するページが見つかりませんでした</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredPages.map((page, index) => (
                <button
                  key={page.href}
                  onClick={() => handleSelect(page.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    selectedIndex === index
                      ? "bg-sky-50 text-sky-900"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <span className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                    selectedIndex === index
                      ? "bg-sky-100 text-sky-700"
                      : "bg-gray-100 text-gray-500"
                  )}>
                    {page.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{page.title}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {page.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="border-t px-4 py-2.5 text-xs text-gray-500 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border bg-gray-50 px-1.5 font-mono text-[10px]">↑</kbd>
            <kbd className="inline-flex h-5 items-center rounded border bg-gray-50 px-1.5 font-mono text-[10px]">↓</kbd>
            で移動
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border bg-gray-50 px-1.5 font-mono text-[10px]">Enter</kbd>
            で選択
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border bg-gray-50 px-1.5 font-mono text-[10px]">Esc</kbd>
            で閉じる
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 検索ボタンコンポーネント
export function SearchButton() {
  const [open, setOpen] = React.useState(false);

  // キーボードショートカット（Cmd/Ctrl + K）
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-gray-700 hover:text-sky-700 hover:bg-sky-50"
        onClick={() => setOpen(true)}
        aria-label="サイト内検索を開く（⌘K）"
      >
        <Search className="h-4 w-4" />
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
