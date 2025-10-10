"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { MessageCircle, Send, Users, TrendingUp, Megaphone } from "lucide-react";
import { supabase, SupportMessage } from "@/lib/supabase";

const senderTypes = ['在校生', '卒業生', '駅伝部関係者', 'ファン', '家族', 'その他'] as const;

const senderTypeColors = {
  '在校生': 'bg-blue-100 text-blue-800 border-blue-200',
  '卒業生': 'bg-sky-100 text-sky-800 border-sky-200',
  '駅伝部関係者': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'ファン': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  '家族': 'bg-teal-100 text-teal-800 border-teal-200',
  'その他': 'bg-gray-100 text-gray-800 border-gray-200',
};

export function SupportMessages() {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState<typeof senderTypes[number]>('ファン');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [stats, setStats] = useState({
    senderTypes: {} as Record<string, number>,
    total: 0
  });
  
  // 初期表示は3件のみ
  const initialDisplayLimit = 3;

  // 統計情報を計算する関数（useCallbackでメモ化）
  const calculateStats = useCallback((data: SupportMessage[]) => {
    const senderTypeCounts: Record<string, number> = {};

    data.forEach((msg) => {
      senderTypeCounts[msg.sender_type] = (senderTypeCounts[msg.sender_type] || 0) + 1;
    });

    setStats({
      senderTypes: senderTypeCounts,
      total: data.length
    });
  }, []);

  // メッセージを取得する関数（useCallbackでメモ化）
  const fetchMessages = useCallback(async (limit?: number) => {
    try {
      let query = supabase
        .from('support_messages')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      // limitが指定されている場合のみ制限
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        setMessages(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('メッセージの取得に失敗:', error);
    }
  }, [calculateStats]);

  // メッセージを取得
  useEffect(() => {
    // 初期表示は3件のみ取得
    const limit = showAllMessages ? undefined : initialDisplayLimit;
    fetchMessages(limit);
    
    // リアルタイム更新を設定
    const channel = supabase
      .channel('support_messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'support_messages' },
        () => {
          const currentLimit = showAllMessages ? undefined : initialDisplayLimit;
          fetchMessages(currentLimit);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [showAllMessages, fetchMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('support_messages')
        .insert({
          message: newMessage.trim(),
          sender_type: senderType,
          region: '関東', // デフォルト値として設定
          is_approved: true
        });

      if (error) throw error;

      setNewMessage('');
      setShowForm(false);
      alert('応援メッセージを送信しました!');
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Megaphone className="h-8 w-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">
              選手たちに、応援メッセージを送ろう!
            </h2>
            <Megaphone className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-lg text-gray-600">
            あなたの声援を、選手たちに届けよう!
          </p>
        </motion.div>

        {/* アクションボタン */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Send className="mr-2 h-5 w-5" />
            応援メッセージを送る
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              const element = document.getElementById('messages-list');
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="px-8 py-6 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            メッセージを見る
          </Button>
        </div>

        {/* 送信フォーム */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50">
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-blue-600" />
                    応援メッセージを送る
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-2">
                        メッセージ
                      </label>
                      <Textarea
                        id="message-input"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="選手への応援メッセージを入力してください..."
                        className="min-h-[120px] resize-none"
                        maxLength={200}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {newMessage.length}/200文字
                      </p>
                    </div>

                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-2">
                        あなたは？
                      </div>
                      <Select value={senderType} onValueChange={(value: any) => setSenderType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {senderTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !newMessage.trim()}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                      >
                        {isSubmitting ? '送信中...' : '応援メッセージを送る'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowForm(false);
                          setNewMessage('');
                        }}
                      >
                        キャンセル
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 統計情報 - トップページでは非表示 */}
        {/* メッセージ一覧(最新3件) */}
        <div id="messages-list">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">
              選手たちに届いたみんなのメッセージ
            </h3>
            {stats.total > 0 && (
              <Badge variant="secondary" className="px-3 py-1 text-lg">
                {stats.total}+
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full border-2 hover:shadow-lg hover:scale-105 transition-all duration-200">
                    <CardContent className="pt-6">
                      <p className="text-gray-800 mb-4 leading-relaxed">
                        {msg.message}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={senderTypeColors[msg.sender_type]}>
                          {msg.sender_type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {messages.length === 0 && (
            <Card className="border-2 border-dashed">
              <CardContent className="py-12 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  まだ応援メッセージがありません。<br />
                  最初のメッセージを送りましょう!
                </p>
              </CardContent>
            </Card>
          )}

          {/* もっと見るボタン */}
          {!showAllMessages && stats.total > initialDisplayLimit && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setShowAllMessages(true)}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                もっと見る ({stats.total - initialDisplayLimit}件)
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
