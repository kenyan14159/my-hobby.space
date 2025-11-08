"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/lib/hooks/use-notification";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { Loader2 } from "lucide-react";

interface BulletinBoardFormProps {
  onPostSubmitted: () => void;
  onShowTerms: () => void;
}

export function BulletinBoardForm({ onPostSubmitted, onShowTerms }: BulletinBoardFormProps) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPostTime, setLastPostTime] = useState(0);
  const { showNotification } = useNotification();

  const postCooldown = 20000; // 20秒
  const MAX_AUTHOR_LENGTH = 50;
  const MAX_CONTENT_LENGTH = 2000;
  
  // NGワードリスト（より包括的で、部分一致を防ぐ）
  const ngWords = [
    'バカ', 'ばか', 'アホ', 'あほ', 'クズ', 'くず', 'ゴミ', 'ごみ', 
    '死ね', 'しね', '殺す', 'ころす', 'うざい', 'ウザい', 'きもい', 'キモい',
    '消えろ', 'きえろ', 'やめろ', 'ダメ', 'だめ', '最悪', '最低', 
    '下手', 'へた', 'ヘタ', '弱い', 'よわい', '遅い', 'おそい', 
    '才能ない', '向いてない', 'むいてない', 'やる気ない', 'やるきない'
  ];

  // NGワードフィルター（より堅牢な実装）
  const filterNGWords = (text: string): string => {
    if (!text || text.trim().length === 0) {
      return text;
    }
    
    let filteredText = text;
    
    // 各NGワードをチェック（部分一致を防ぐため、単語境界を考慮）
    ngWords.forEach(word => {
      // 単語全体にマッチする正規表現（より厳密）
      // 日本語の場合は前後に空白や句読点、行頭/行末をチェック
      const patterns = [
        new RegExp(`^${word}`, 'gi'), // 行頭
        new RegExp(`${word}$`, 'gi'), // 行末
        new RegExp(`\\s${word}\\s`, 'gi'), // 前後に空白
        new RegExp(`\\s${word}`, 'gi'), // 前に空白
        new RegExp(`${word}\\s`, 'gi'), // 後に空白
        new RegExp(`[。、，．]${word}`, 'gi'), // 句読点の後
        new RegExp(`${word}[。、，．]`, 'gi'), // 句読点の前
      ];
      
      patterns.forEach(pattern => {
        filteredText = filteredText.replace(pattern, (match) => {
          return match.replace(word, '***');
        });
      });
      
      // 単独で存在する場合（前後が空白や句読点、または行頭/行末）
      const standalonePattern = new RegExp(`(^|\\s|[。、，．])${word}(\\s|[。、，．]|$)`, 'gi');
      filteredText = filteredText.replace(standalonePattern, (match) => {
        return match.replace(word, '***');
      });
    });
    
    return filteredText;
  };
  
  // 入力値のサニタイゼーション（追加のセキュリティ対策）
  const sanitizeInput = (text: string): string => {
    // 制御文字を除去
    return text
      .replace(/[\x00-\x1F\x7F]/g, '') // 制御文字
      .replace(/\u200B/g, '') // ゼロ幅スペース
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastPostTime < postCooldown) {
      showNotification('連続投稿は20秒間隔でお願いします。', 'error');
      return;
    }

    // 入力値のサニタイゼーション
    const sanitizedAuthor = sanitizeInput(author);
    const sanitizedContent = sanitizeInput(content);
    
    if (!sanitizedContent) {
      showNotification('コメントを入力してください。', 'error');
      return;
    }

    // 文字数バリデーション（サニタイズ後）
    if (sanitizedAuthor.length > MAX_AUTHOR_LENGTH) {
      showNotification(`お名前は${MAX_AUTHOR_LENGTH}文字以内で入力してください。`, 'error');
      return;
    }
    if (sanitizedContent.length > MAX_CONTENT_LENGTH) {
      showNotification(`コメントは${MAX_CONTENT_LENGTH}文字以内で入力してください。`, 'error');
      return;
    }

    // NGワードフィルター適用
    const filteredAuthor = filterNGWords(sanitizedAuthor) || '日体駅伝さん';
    const filteredContent = filterNGWords(sanitizedContent);

    setIsSubmitting(true);

    try {
      // Supabaseに投稿を保存
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            author: filteredAuthor,
            content: filteredContent
          }
        ])
        .select();

      if (error) {
        logger.error('Supabase投稿エラー:', error);
        throw error;
      }
      
      setLastPostTime(now);
      setAuthor("");
      setContent("");
      onPostSubmitted();
      showNotification('投稿しました！', 'success');
    } catch (error) {
      logger.error('投稿エラー:', error);
      const errorMessage = error instanceof Error ? error.message : '投稿の送信に失敗しました';
      showNotification(`投稿エラー: ${errorMessage}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8 shadow-lg border-0 bg-white">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium text-gray-600">
              お名前
            </Label>
            <Input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="日体駅伝さん"
              className="border-gray-300 focus:border-sky-600 focus:ring-sky-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-600">
              コメント
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="応援メッセージをどうぞ！"
              required
              className="min-h-[100px] border-gray-300 focus:border-sky-600 focus:ring-sky-100 resize-vertical"
            />
          </div>

          <div className="flex flex-wrap justify-end items-center gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onShowTerms}
              className="text-gray-700 border-gray-200 hover:bg-gray-50"
            >
              利用規約
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  投稿中...
                </>
              ) : (
                '投稿する'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 