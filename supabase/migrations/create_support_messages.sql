-- 応援メッセージテーブルの作成

-- 既存のテーブルを削除（必要な場合のみ）
-- DROP TABLE IF EXISTS support_messages;

-- テーブル作成
CREATE TABLE IF NOT EXISTS support_messages (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('在校生', '卒業生', '駅伝部関係者', 'ファン', '家族', 'その他')),
  region TEXT NOT NULL CHECK (region IN ('北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州', '国外')),
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- インデックスの作成（パフォーマンス向上のため）
CREATE INDEX IF NOT EXISTS idx_support_messages_created_at ON support_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_messages_approved ON support_messages(is_approved);
CREATE INDEX IF NOT EXISTS idx_support_messages_sender_type ON support_messages(sender_type);
CREATE INDEX IF NOT EXISTS idx_support_messages_region ON support_messages(region);

-- Row Level Security (RLS) の有効化
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- ポリシーの作成
-- 誰でも承認済みのメッセージを読める
CREATE POLICY "Anyone can read approved messages"
ON support_messages FOR SELECT
USING (is_approved = true);

-- 誰でもメッセージを投稿できる
CREATE POLICY "Anyone can insert messages"
ON support_messages FOR INSERT
WITH CHECK (true);

-- コメント追加
COMMENT ON TABLE support_messages IS '応援メッセージテーブル';
COMMENT ON COLUMN support_messages.message IS 'メッセージ本文';
COMMENT ON COLUMN support_messages.sender_type IS '送信者タイプ（在校生、卒業生、駅伝部関係者、ファン、家族、その他）';
COMMENT ON COLUMN support_messages.region IS '地域（北海道、東北、関東、中部、近畿、中国、四国、九州、国外）';
COMMENT ON COLUMN support_messages.is_approved IS '承認済みフラグ（trueの場合のみ表示）';
COMMENT ON COLUMN support_messages.created_at IS '作成日時';
