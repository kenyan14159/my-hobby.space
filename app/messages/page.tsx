"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, TrendingUp, Send, ArrowLeft } from "lucide-react";
import { supabase, SupportMessage } from "@/lib/supabase";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const senderTypes = ['在校生', '卒業生', '駅伝部関係者', 'ファン', '家族', 'その他'] as const;

const senderTypeColors = {
  '在校生': 'bg-blue-100 text-blue-800 border-blue-200',
  '卒業生': 'bg-sky-100 text-sky-800 border-sky-200',
  '駅伝部関係者': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'ファン': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  '家族': 'bg-teal-100 text-teal-800 border-teal-200',
  'その他': 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function AllMessagesPage() {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState<typeof senderTypes[number]>('ファン');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    total: 0
  });

  // 全件数を取得
  const fetchTotalCount = useCallback(async () => {
    try {
      const { count, error } = await supabase
        .from('support_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', true);

      if (error) throw error;

      if (count !== null) {
        setStats({ total: count });
      }
    } catch (error) {
      console.error('件数の取得に失敗:', error);
    }
  }, []);

  // 全メッセージを取得
  const fetchMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setMessages(data);
        fetchTotalCount();
      }
    } catch (error) {
      console.error('メッセージの取得に失敗:', error);
    }
  }, [fetchTotalCount]);

  useEffect(() => {
    fetchMessages();

    // リアルタイム更新
    const channel = supabase
      .channel('support_messages_all')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'support_messages' },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages]);

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
          region: '関東',
          is_approved: true
        });

      if (error) throw error;

      setNewMessage('');
      setShowForm(false);
      alert('メッセージを送信しました！');
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // タイムスタンプをフォーマット (YYYY.MM.DD HH:mm形式)
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              トップページに戻る
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  応援メッセージ一覧
                </h1>
              </div>
              {stats.total > 0 && (
                <Badge variant="secondary" className="px-3 py-1 text-lg">
                  {stats.total}件
                </Badge>
              )}
            </div>

            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white w-full md:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              メッセージを送る
            </Button>
          </div>
        </div>

        {/* メッセージフォーム */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="border-2 border-blue-200">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-2">
                        メッセージ
                      </label>
                      <Textarea
                        id="message-input"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="選手への応援メッセージを入力してください..."
                        className="min-h-[120px]"
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
                        className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500"
                      >
                        {isSubmitting ? '送信中...' : '送信する'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
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

        {/* メッセージ一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card className="h-full border-2 hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <CardContent className="pt-6">
                    <p className="text-gray-800 mb-4 leading-relaxed break-words">
                      {msg.message}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge className={senderTypeColors[msg.sender_type]}>
                        {msg.sender_type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(msg.created_at)}
                      </span>
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
      </div>
    </div>
  );
}
