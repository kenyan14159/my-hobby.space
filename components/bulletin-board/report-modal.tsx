"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNotification } from "@/lib/hooks/use-notification";
import { supabase } from "@/lib/supabase";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  postInfo: { id: number; number: number } | null;
  onClose: () => void;
}

export function ReportModal({ isOpen, postInfo, onClose }: ReportModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      showNotification('通報理由を入力してください。', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Supabaseに通報を保存
      const { data, error } = await supabase
        .from('reports')
        .insert([
          {
            post_id: postInfo?.id,
            post_number: postInfo?.number,
            reason: reason.trim(),
            reported_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase通報エラー:', error);
        throw error;
      }
      
      showNotification('通報を受け付けました。適切に対応いたします。', 'success');
      setReason("");
      onClose();
    } catch (error) {
      console.error('通報エラー:', error);
      const errorMessage = error instanceof Error ? error.message : '通報の送信に失敗しました';
      showNotification(`通報エラー: ${errorMessage}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setReason("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            投稿を通報する
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600">
            {postInfo && `投稿番号 ${postInfo.number} の内容が不適切ですか？`}
            理由を記入して送信してください。
          </p>

          <div className="space-y-2">
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="通報理由を詳しく記入してください...&#10;&#10;例：&#10;・誹謗中傷や人格攻撃が含まれている&#10;・差別的な表現が使用されている&#10;・個人情報が含まれている&#10;・スパムや広告である"
              className="min-h-[120px] resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-700"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !reason.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  送信中...
                </>
              ) : (
                '通報する'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 