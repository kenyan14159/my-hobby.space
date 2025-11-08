"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase, Post } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { Loader2, MessageSquare, Flag } from "lucide-react";

interface PostsListProps {
  refreshTrigger: number;
  onOpenReport: (postId: number, postNumber: number) => void;
  onOpenImage: (src: string) => void;
}

export function PostsList({ refreshTrigger, onOpenReport, onOpenImage }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 100;

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      
      // ページネーション設定
      const offset = (currentPage - 1) * postsPerPage;
      
      // Supabaseから投稿を取得（最新順）
      const { data, error, count } = await supabase
        .from('posts')
        .select('id, author, content, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + postsPerPage - 1);

      if (error) {
        logger.error('Supabase取得エラー:', error);
        throw error;
      }
      
      setPosts(data || []);
      setTotalPosts(count || 0);
    } catch (error) {
      logger.error('投稿の読み込みエラー:', error);
      // エラー時は空の状態を表示
      setPosts([]);
      setTotalPosts(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadPosts();
  }, [refreshTrigger, loadPosts]);

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateId = (id: number): string => {
    return id.toString(36).slice(-6).toUpperCase();
  };

  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const addReply = (postNumber: number) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value += `>>${postNumber}\n`;
      textarea.focus();
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // コンテンツを安全にレンダリングするための関数
  const renderContent = (content: string) => {
    // 改行で分割（エスケープ前）
    const lines = content.split('\n');
    
    return lines.map((line, lineIndex) => {
      // 返信リンク（>>数字）を検出してスタイリング（エスケープ前のテキストで検出）
      const parts: (string | JSX.Element)[] = [];
      const replyPattern = />>(\d+)/g;
      let lastIndex = 0;
      let match;
      let matchCount = 0;
      
      while ((match = replyPattern.exec(line)) !== null) {
        // マッチ前のテキストをエスケープ
        if (match.index > lastIndex) {
          parts.push(escapeHtml(line.substring(lastIndex, match.index)));
        }
        // 返信リンク部分（数字部分のみエスケープ）
        parts.push(
          <span key={`reply-${lineIndex}-${matchCount}`} className="text-blue-500 font-medium">
            &gt;&gt;{escapeHtml(match[1])}
          </span>
        );
        lastIndex = match.index + match[0].length;
        matchCount++;
      }
      
      // 残りのテキストをエスケープ
      if (lastIndex < line.length) {
        parts.push(escapeHtml(line.substring(lastIndex)));
      }
      
      // マッチがない場合は全体をエスケープ
      if (parts.length === 0) {
        parts.push(escapeHtml(line));
      }
      
      return (
        <React.Fragment key={`line-${lineIndex}`}>
          {parts}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-sky-600" />
        <p className="text-gray-600">投稿を読み込み中...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="p-8 text-center bg-white">
        <p className="text-gray-600">まだ投稿がありません。最初の投稿をしてみましょう！</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 text-sm text-gray-500 bg-white rounded-t-lg">
        <div>ページ {currentPage}</div>
        <div>全 {totalPosts} 件</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="p-5 border-b border-gray-100 last:border-b-0 hover:bg-sky-50 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              <span className="font-bold text-sky-700">{post.id}</span>
              <strong className="text-green-600 font-bold">{post.author}</strong>
              <span className="text-gray-400 text-xs">{formatDate(post.created_at)}</span>
              <span className="text-gray-400 text-xs">ID:{generateId(post.id)}</span>
            </div>
            
            <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
              {renderContent(post.content)}
            </div>
            
            <div className="flex gap-4 text-sm">
              <button
                onClick={() => addReply(post.id)}
                className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                返信する
              </button>
              <button
                onClick={() => onOpenReport(post.id, post.id)}
                className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1"
              >
                <Flag className="w-3 h-3" />
                通報
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="text-sm"
          >
            前へ
          </Button>
          <span className="text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="text-sm"
          >
            次へ
          </Button>
        </div>
      )}
    </div>
  );
} 